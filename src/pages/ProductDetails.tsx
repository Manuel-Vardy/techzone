import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { laptops } from "@/data/laptops";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { LaptopCard } from "@/components/LaptopCard";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const laptop = laptops.find((l) => l.id === id);
  const [currentImage, setCurrentImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!laptop) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % laptop.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + laptop.images.length) % laptop.images.length);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: laptop.id,
        name: laptop.name,
        image: laptop.images[0] ?? "",
        price: laptop.price,
      });
    }
    toast.success(`${quantity} x ${laptop.name} added to cart!`);
  };

  const relatedProducts = laptops.filter((l) => l.id !== laptop.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 w-full overflow-x-hidden">
      <Header />

      <main className="container py-6 md:py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link to="/#products" className="hover:text-foreground transition-colors">Products</Link>
          <span>/</span>
          <span className="text-foreground">{laptop.name}</span>
        </nav>

        {/* Product Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-secondary rounded-2xl overflow-hidden">
              {laptop.badge && (
                <Badge className="absolute top-4 left-4 z-10 bg-accent text-accent-foreground">
                  {laptop.badge}
                </Badge>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-card/80 backdrop-blur hover:bg-card"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart
                  className={`h-5 w-5 transition-colors ${isLiked ? "fill-accent text-accent" : "text-muted-foreground"
                    }`}
                />
              </Button>

              {laptop.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${laptop.name} view ${index + 1}`}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${index === currentImage ? "opacity-100" : "opacity-0"
                    }`}
                />
              ))}

              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur hover:bg-card"
                onClick={prevImage}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur hover:bg-card"
                onClick={nextImage}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3">
              {laptop.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${index === currentImage
                      ? "border-primary"
                      : "border-transparent hover:border-muted-foreground/50"
                    }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand & Name */}
            <div>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                {laptop.brand}
              </p>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-1">
                {laptop.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(laptop.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                      }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{laptop.rating}</span>
              <span className="text-sm text-muted-foreground">({laptop.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-price">GH₵{laptop.price}</span>
              {laptop.originalPrice && (
                <>
                  <span className="text-xl text-price-old line-through">
                    GH₵{laptop.originalPrice}
                  </span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Save GH₵{laptop.originalPrice - laptop.price}
                  </Badge>
                </>
              )}
            </div>

            <Separator />

            {/* Specifications */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/50 rounded-lg p-3">
                  <span className="text-xs text-muted-foreground block mb-1">Processor</span>
                  <span className="text-sm font-medium">{laptop.specs.processor}</span>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <span className="text-xs text-muted-foreground block mb-1">RAM</span>
                  <span className="text-sm font-medium">{laptop.specs.ram}</span>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <span className="text-xs text-muted-foreground block mb-1">Storage</span>
                  <span className="text-sm font-medium">{laptop.specs.storage}</span>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <span className="text-xs text-muted-foreground block mb-1">Display</span>
                  <span className="text-sm font-medium">{laptop.specs.display}</span>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3 col-span-2">
                  <span className="text-xs text-muted-foreground block mb-1">Graphics</span>
                  <span className="text-sm font-medium">{laptop.specs.graphics}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1 h-12 text-base bg-primary hover:bg-primary/90"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" className="h-12 px-6">
                  Buy Now
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">2 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <RotateCcw className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">30 Day Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <LaptopCard key={product.id} laptop={product} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
};

export default ProductDetails;
