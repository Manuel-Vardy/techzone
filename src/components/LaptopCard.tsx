import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Star, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Laptop } from "@/data/laptops";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface LaptopCardProps {
  laptop: Laptop;
}

export const LaptopCard = ({ laptop }: LaptopCardProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: laptop.id,
      name: laptop.name,
      image: laptop.images[0] ?? "",
      price: laptop.price,
    });
    toast.success(`${laptop.name} added to cart!`);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % laptop.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + laptop.images.length) % laptop.images.length);
  };

  return (
    <div className="group bg-card rounded-xl card-shadow hover:card-shadow-hover transition-all duration-300 overflow-hidden">
      {/* Image Carousel */}
      <div className="relative aspect-[4/3] bg-secondary overflow-hidden">
        {/* Badge */}
        {laptop.badge && (
          <Badge className="absolute top-3 left-3 z-10 bg-accent text-accent-foreground">
            {laptop.badge}
          </Badge>
        )}

        {/* Like Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 z-10 bg-card/80 backdrop-blur hover:bg-card"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart
            className={`h-5 w-5 transition-colors ${isLiked ? "fill-accent text-accent" : "text-muted-foreground"
              }`}
          />
        </Button>

        {/* Images */}
        <div className="relative h-full w-full">
          {laptop.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${laptop.name} view ${index + 1}`}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${index === currentImage ? "opacity-100" : "opacity-0"
                }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur hover:bg-card opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={prevImage}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur hover:bg-card opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={nextImage}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Dots Indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {laptop.images.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${index === currentImage
                  ? "bg-primary w-4"
                  : "bg-card/60 hover:bg-card"
                }`}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Brand & Name */}
        <div>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
            {laptop.brand}
          </p>
          <h3 className="font-display text-lg font-semibold text-foreground line-clamp-1">
            {laptop.name}
          </h3>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{laptop.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({laptop.reviews} reviews)</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-price">GH₵{laptop.price}</span>
          {laptop.originalPrice && (
            <span className="text-sm text-price-old line-through">
              GH₵{laptop.originalPrice}
            </span>
          )}
        </div>

        {/* Specs */}
        <div className="pt-3 border-t border-border space-y-2">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
            <div>
              <span className="spec-label">Processor</span>
              <p className="spec-value line-clamp-1">{laptop.specs.processor}</p>
            </div>
            <div>
              <span className="spec-label">RAM</span>
              <p className="spec-value">{laptop.specs.ram}</p>
            </div>
            <div>
              <span className="spec-label">Storage</span>
              <p className="spec-value">{laptop.specs.storage}</p>
            </div>
            <div>
              <span className="spec-label">Display</span>
              <p className="spec-value line-clamp-1">{laptop.specs.display}</p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-2">
          <Link to={`/product/${laptop.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
          <Button
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};
