import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Plus,
  Trash2,
  Edit2,
  Loader2,
  LayoutDashboard,
  Package,
  ChevronLeft,
  X,
  Image as ImageIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

// Upload image to ImgBB (free, no Firebase Storage needed)
const uploadToImgBB = async (file: File): Promise<string> => {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
  if (!apiKey || apiKey === "your_imgbb_api_key_here") {
    throw new Error("ImgBB API key not set. Please add VITE_IMGBB_API_KEY to your .env file.");
  }
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error?.message || "ImgBB upload failed");
  return data.data.url as string;
};

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number | null;
  badge?: string;
  rating: number;
  reviews: number;
  images: string[];
  specs: {
    processor: string;
    ram: string;
    storage: string;
    display: string;
    graphics: string;
  };
  updatedAt?: string;
}

const emptyForm = {
  name: "",
  brand: "TechZone",
  price: "",
  originalPrice: "",
  badge: "",
  rating: "4.5",
  reviews: "0",
  specs: {
    processor: "",
    ram: "",
    storage: "",
    display: "",
    graphics: "",
  },
};

export default function AdminCMS() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  // ─── Real-time listener ────────────────────────────────────
  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("updatedAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Product[];
        setProducts(data);
        setLoading(false);
      },
      (err) => {
        console.error("Firestore listener error:", err);
        toast.error(`DB error: ${err.message}`);
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);

  // ─── Image handling ────────────────────────────────────────
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  };

  const removeNewImage = (i: number) => {
    setImageFiles((prev) => prev.filter((_, idx) => idx !== i));
    setImagePreviews((prev) => prev.filter((_, idx) => idx !== i));
  };

  const removeExistingImage = (i: number) => {
    setExistingImages((prev) => prev.filter((_, idx) => idx !== i));
  };

  // ─── Form submit ───────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allImages = [...existingImages, ...imagePreviews];
    if (allImages.length === 0) {
      toast.error("Please add at least one image.");
      return;
    }

    setSaving(true);
    const tid = toast.loading("Saving product…");

    try {
      // Upload new files to ImgBB (free, no Firebase Storage needed)
      const uploadedUrls: string[] = [];
      for (let i = 0; i < imageFiles.length; i++) {
        toast.loading(`Uploading image ${i + 1} / ${imageFiles.length}…`, { id: tid });
        const url = await uploadToImgBB(imageFiles[i]);
        uploadedUrls.push(url);
      }

      const payload = {
        name: form.name.trim(),
        brand: form.brand.trim() || "TechZone",
        price: parseFloat(form.price) || 0,
        originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
        badge: form.badge.trim(),
        rating: parseFloat(form.rating) || 4.5,
        reviews: parseInt(form.reviews) || 0,
        specs: {
          processor: form.specs.processor.trim() || "N/A",
          ram: form.specs.ram.trim() || "N/A",
          storage: form.specs.storage.trim() || "N/A",
          display: form.specs.display.trim() || "N/A",
          graphics: form.specs.graphics.trim() || "N/A",
        },
        images: [...existingImages, ...uploadedUrls],
        updatedAt: new Date().toISOString(),
      };

      toast.loading("Writing to database…", { id: tid });

      if (editingId) {
        await updateDoc(doc(db, "products", editingId), payload);
        toast.success("Product updated!", { id: tid });
      } else {
        await addDoc(collection(db, "products"), payload);
        toast.success(`${payload.name} added!`, { id: tid });
      }

      resetForm();
    } catch (err: any) {
      console.error(err);
      toast.error(`Save failed: ${err.message}`, { id: tid });
    } finally {
      setSaving(false);
    }
  };

  // ─── Delete ────────────────────────────────────────────────
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;
    try {
      await deleteDoc(doc(db, "products", id));
      toast.success(`"${name}" deleted.`);
    } catch (err: any) {
      toast.error(`Delete failed: ${err.message}`);
    }
  };

  // ─── Edit ──────────────────────────────────────────────────
  const handleEdit = (p: Product) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      brand: p.brand,
      price: String(p.price),
      originalPrice: p.originalPrice ? String(p.originalPrice) : "",
      badge: p.badge || "",
      rating: String(p.rating),
      reviews: String(p.reviews),
      specs: { ...p.specs },
    });
    setExistingImages(p.images);
    setImageFiles([]);
    setImagePreviews([]);
    setShowForm(true);
  };

  const resetForm = () => {
    setForm(emptyForm);
    setImageFiles([]);
    setImagePreviews([]);
    setExistingImages([]);
    setEditingId(null);
    setShowForm(false);
  };

  // ─── Spec helper ───────────────────────────────────────────
  const setSpec = (k: keyof typeof form.specs, v: string) =>
    setForm((f) => ({ ...f, specs: { ...f.specs, [k]: v } }));

  // ─── UI ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex font-sans">
      {/* Sidebar */}
      <aside className="w-60 bg-[#14213D] text-white hidden md:flex flex-col shrink-0">
        <div className="p-5 border-b border-white/10 flex items-center gap-2">
          <LayoutDashboard className="h-5 w-5 text-[#FCA331]" />
          <span className="font-bold text-lg">TechZone CMS</span>
        </div>
        <nav className="flex-1 p-4">
          <div className="flex items-center gap-3 px-4 py-3 bg-[#FCA331] text-[#14213D] rounded-lg font-bold">
            <Package className="h-5 w-5" />
            Inventory
          </div>
        </nav>
        <div className="p-4 border-t border-white/10">
          <Link to="/">
            <Button variant="ghost" className="w-full justify-start text-white/60 hover:text-white hover:bg-white/10">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Store
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {/* Header bar */}
        <header className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-black text-[#14213D]">Product Management</h1>
            <p className="text-gray-400 text-xs">{products.length} item(s) in inventory</p>
          </div>
          {!showForm && (
            <Button
              className="bg-[#FCA331] text-[#14213D] font-bold hover:bg-[#FCA331]/90"
              onClick={() => setShowForm(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Laptop
            </Button>
          )}
        </header>

        <div className="p-6">
          {/* ── Add / Edit Form ── */}
          {showForm && (
            <div className="bg-white rounded-xl shadow-md p-6 mb-6 max-w-3xl">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-bold text-[#14213D]">
                  {editingId ? "Edit Product" : "Add New Laptop"}
                </h2>
                <Button variant="ghost" size="icon" onClick={resetForm}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 md:col-span-1">
                    <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">Name *</label>
                    <Input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. ProBook Elite X1"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">Brand</label>
                    <Input
                      value={form.brand}
                      onChange={(e) => setForm({ ...form, brand: e.target.value })}
                      placeholder="TechZone"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">Price (GH₵) *</label>
                    <Input
                      required
                      type="number"
                      min="0"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      placeholder="1299"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">Original Price</label>
                    <Input
                      type="number"
                      min="0"
                      value={form.originalPrice}
                      onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                      placeholder="1599"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">Badge</label>
                    <Input
                      value={form.badge}
                      onChange={(e) => setForm({ ...form, badge: e.target.value })}
                      placeholder="New / Best Seller"
                    />
                  </div>
                </div>

                {/* Specs */}
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400 mb-2 border-b pb-1">Specifications</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {(["processor", "ram", "storage", "display", "graphics"] as const).map((k) => (
                      <div key={k}>
                        <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">{k}</label>
                        <Input
                          value={form.specs[k]}
                          onChange={(e) => setSpec(k, e.target.value)}
                          placeholder={k}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Images */}
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400 mb-2 border-b pb-1">
                    Images * (at least 1)
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {/* Existing images (when editing) */}
                    {existingImages.map((src, i) => (
                      <div key={`ex-${i}`} className="relative w-20 h-20 rounded overflow-hidden group">
                        <img src={src} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeExistingImage(i)}
                          className="absolute top-0.5 right-0.5 h-5 w-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}

                    {/* New image previews */}
                    {imagePreviews.map((src, i) => (
                      <div key={`new-${i}`} className="relative w-20 h-20 rounded overflow-hidden group border-2 border-[#FCA331]">
                        <img src={src} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeNewImage(i)}
                          className="absolute top-0.5 right-0.5 h-5 w-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}

                    {/* Upload button */}
                    <label className="w-20 h-20 border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center cursor-pointer hover:border-[#FCA331] transition-colors">
                      <ImageIcon className="h-6 w-6 text-gray-300 mb-1" />
                      <span className="text-[10px] text-gray-400 font-bold">Upload</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <Button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-[#14213D] text-[#FCA331] font-bold h-11 hover:bg-[#14213D]/90"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving…
                      </>
                    ) : editingId ? (
                      "Update Product"
                    ) : (
                      "Save Product"
                    )}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm} className="h-11">
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* ── Product Table ── */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-5 py-3 text-xs font-bold uppercase text-gray-400">Product</th>
                  <th className="px-5 py-3 text-xs font-bold uppercase text-gray-400">Specs</th>
                  <th className="px-5 py-3 text-xs font-bold uppercase text-gray-400">Price</th>
                  <th className="px-5 py-3 text-xs font-bold uppercase text-gray-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-16 text-center">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#14213D]" />
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-16 text-center text-gray-400">
                      No products yet. Click "Add Laptop" to get started.
                    </td>
                  </tr>
                ) : (
                  products.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded bg-gray-100 overflow-hidden shrink-0">
                            {p.images?.[0] ? (
                              <img src={p.images[0]} className="h-full w-full object-cover" alt={p.name} />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-gray-300">
                                <ImageIcon className="h-5 w-5" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-[#14213D]">{p.name}</div>
                            <div className="text-xs text-gray-400 uppercase">{p.brand}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="secondary" className="text-[10px]">{p.specs?.processor}</Badge>
                          <Badge variant="secondary" className="text-[10px]">{p.specs?.ram}</Badge>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-bold text-green-700">GH₵{p.price}</div>
                        {p.badge && (
                          <Badge className="mt-1 bg-[#FCA331]/20 text-[#FCA331] border-0 text-[10px]">
                            {p.badge}
                          </Badge>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 text-blue-600 border-blue-100 hover:bg-blue-50"
                            onClick={() => handleEdit(p)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 text-red-600 border-red-100 hover:bg-red-50"
                            onClick={() => handleDelete(p.id, p.name)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
