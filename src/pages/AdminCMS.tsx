import { useState, useEffect } from "react";
import { db, storage } from "@/lib/firebase";
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  updateDoc, 
  query, 
  orderBy 
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Laptop } from "@/data/laptops";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Image as ImageIcon, 
  Loader2, 
  LayoutDashboard, 
  Package, 
  LogOut,
  ChevronLeft,
  X
} from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function AdminCMS() {
  const [products, setProducts] = useState<Laptop[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
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
      graphics: ""
    }
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "products"), orderBy("updatedAt", "desc"));
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Laptop[];
      setProducts(items);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(prev => [...prev, ...files]);
      
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0 && !editingId) {
      toast.error("Please add at least one image");
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading("Starting product save...");
    
    try {
      // 1. Upload Images
      const imageUrls: string[] = [];
      if (images.length > 0) {
        toast.loading(`Uploading ${images.length} image(s)...`, { id: toastId });
        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          const storageRef = ref(storage, `products/${Date.now()}_${image.name}`);
          const snapshot = await uploadBytes(storageRef, image);
          const url = await getDownloadURL(snapshot.ref);
          imageUrls.push(url);
          toast.loading(`Uploaded image ${i + 1} of ${images.length}`, { id: toastId });
        }
      }

      // 2. Prepare Data
      toast.loading("Preparing product data...", { id: toastId });
      const parsedPrice = parseFloat(formData.price);
      const parsedRating = parseFloat(formData.rating);
      const parsedReviews = parseInt(formData.reviews);

      if (isNaN(parsedPrice)) throw new Error("Invalid Price value");

      const productData = {
        name: formData.name,
        brand: formData.brand,
        price: parsedPrice,
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        badge: formData.badge || "",
        rating: isNaN(parsedRating) ? 4.5 : parsedRating,
        reviews: isNaN(parsedReviews) ? 0 : parsedReviews,
        specs: {
          processor: formData.specs.processor || "N/A",
          ram: formData.specs.ram || "N/A",
          storage: formData.specs.storage || "N/A",
          display: formData.specs.display || "N/A",
          graphics: formData.specs.graphics || "N/A"
        },
        images: editingId 
          ? [...(products.find(p => p.id === editingId)?.images || []), ...imageUrls] 
          : imageUrls,
        updatedAt: new Date().toISOString()
      };

      // 3. Save to Firestore
      toast.loading("Writing to database...", { id: toastId });
      if (editingId) {
        await updateDoc(doc(db, "products", editingId), productData);
        toast.success("Product updated successfully!", { id: toastId });
      } else {
        await addDoc(collection(db, "products"), productData);
        toast.success(`${productData.name} added to inventory!`, { id: toastId });
      }

      resetForm();
      fetchProducts();
    } catch (error: any) {
      console.error("Error saving product:", error);
      let message = error.message || "Unknown error";
      
      if (error.code === 'permission-denied') {
        message = "Permission denied. Check Firestore rules.";
      } else if (error.code === 'storage/unauthorized') {
        message = "Storage permission denied. Check Storage rules.";
      }
      
      toast.error(`Save failed: ${message}`, { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, "products", id));
        toast.success("Product deleted");
        fetchProducts();
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  const resetForm = () => {
    setFormData({
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
        graphics: ""
      }
    });
    setImages([]);
    setImagePreviews([]);
    setEditingId(null);
    setIsAdding(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#14213D] text-white flex flex-col hidden md:flex">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
            <LayoutDashboard className="h-6 w-6 text-[#FCA331]" />
            TechZone CMS
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#FCA331] text-[#14213D] rounded-lg font-bold transition-all">
            <Package className="h-5 w-5" />
            Inventory
          </button>
        </nav>
        <div className="p-4 border-t border-white/10">
          <Link to="/">
            <Button variant="ghost" className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Store
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-black text-[#14213D]">Product Management</h1>
            <p className="text-gray-500 text-sm">Add and manage your TechZone inventory</p>
          </div>
          <Button 
            className="bg-[#FCA331] text-[#14213D] font-bold hover:bg-[#FCA331]/90"
            onClick={() => setIsAdding(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Laptop
          </Button>
        </header>

        <div className="p-8">
          {isAdding ? (
            <Card className="max-w-3xl border-none shadow-xl overflow-hidden p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#14213D]">{editingId ? 'Edit Product' : 'Add New Laptop'}</h2>
                <Button variant="ghost" size="icon" onClick={resetForm}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Laptop Name</label>
                    <Input 
                      required 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. ProBook Elite X1"
                      className="border-gray-200 focus:border-[#FCA331] ring-0 focus-visible:ring-[#FCA331]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Brand</label>
                    <Input 
                      required 
                      value={formData.brand}
                      onChange={e => setFormData({...formData, brand: e.target.value})}
                      placeholder="TechZone"
                      className="border-gray-200 focus:border-[#FCA331]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Price (GH₵)</label>
                    <Input 
                      required 
                      type="number"
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: e.target.value})}
                      placeholder="1299"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Original Price (optional)</label>
                    <Input 
                      type="number"
                      value={formData.originalPrice}
                      onChange={e => setFormData({...formData, originalPrice: e.target.value})}
                      placeholder="1599"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-[#14213D] border-b pb-2">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input 
                      required 
                      placeholder="Processor"
                      value={formData.specs.processor}
                      onChange={e => setFormData({...formData, specs: {...formData.specs, processor: e.target.value}})}
                    />
                    <Input 
                      required 
                      placeholder="RAM" 
                      value={formData.specs.ram}
                      onChange={e => setFormData({...formData, specs: {...formData.specs, ram: e.target.value}})}
                    />
                    <Input 
                      required 
                      placeholder="Storage" 
                      value={formData.specs.storage}
                      onChange={e => setFormData({...formData, specs: {...formData.specs, storage: e.target.value}})}
                    />
                    <Input 
                      required 
                      placeholder="Display" 
                      value={formData.specs.display}
                      onChange={e => setFormData({...formData, specs: {...formData.specs, display: e.target.value}})}
                    />
                    <Input 
                      required 
                      placeholder="Graphics" 
                      value={formData.specs.graphics}
                      onChange={e => setFormData({...formData, specs: {...formData.specs, graphics: e.target.value}})}
                    />
                    <Input 
                      placeholder="Badge (e.g. New)" 
                      value={formData.badge}
                      onChange={e => setFormData({...formData, badge: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-[#14213D] border-b pb-2">Images</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {imagePreviews.map((src, i) => (
                      <div key={i} className="relative aspect-square rounded-lg overflow-hidden group">
                        <img src={src} className="h-full w-full object-cover" />
                        <button 
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute top-1 right-1 h-6 w-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    <label className="aspect-square border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center hover:border-[#FCA331] hover:bg-[#FCA331]/5 cursor-pointer transition-all">
                      <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Upload</span>
                      <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button 
                    type="submit" 
                    disabled={isUploading}
                    className="flex-1 bg-[#14213D] text-[#FCA331] font-bold h-12"
                  >
                    {isUploading ? (
                      <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Saving...</>
                    ) : (
                      editingId ? 'Update Product' : 'Save Product'
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={resetForm}
                    className="h-12 border-gray-200"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Product</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Specs</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Price</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#14213D]" />
                      </td>
                    </tr>
                  ) : products.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                        No products found. Start by adding one!
                      </td>
                    </tr>
                  ) : products.map(product => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded bg-gray-100 overflow-hidden">
                            <img src={product.images[0]} className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <div className="font-bold text-[#14213D]">{product.name}</div>
                            <div className="text-xs text-gray-500 uppercase">{product.brand}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="secondary" className="text-[10px] font-normal">{product.specs.processor}</Badge>
                          <Badge variant="secondary" className="text-[10px] font-normal">{product.specs.ram}</Badge>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-price">GH₵{product.price}</div>
                        {product.badge && <Badge className="mt-1 bg-[#FCA331] text-[#14213D] h-4 text-[10px] px-1">{product.badge}</Badge>}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 text-blue-600 border-blue-100 hover:bg-blue-50"
                            onClick={() => {
                              setEditingId(product.id);
                              setFormData({
                                name: product.name,
                                brand: product.brand,
                                price: product.price.toString(),
                                originalPrice: product.originalPrice?.toString() || "",
                                badge: product.badge || "",
                                rating: product.rating.toString(),
                                reviews: product.reviews.toString(),
                                specs: product.specs
                              });
                              setImagePreviews(product.images);
                              setIsAdding(true);
                            }}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 text-red-600 border-red-100 hover:bg-red-50"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
