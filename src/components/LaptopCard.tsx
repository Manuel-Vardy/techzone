import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Heart, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Laptop } from "@/data/laptops";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface LaptopCardProps {
  laptop: Laptop;
}

export const LaptopCard = ({ laptop }: LaptopCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart } = useCart();
  
  // Create variety in timing and direction based on the product ID
  const idHash = laptop.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const randomDelay = 3000 + (idHash % 4) * 1000; // 3000, 4000, 5000, 6000
  const randomDirection = idHash % 2 === 0 ? 'ltr' : 'rtl';
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      direction: randomDirection as 'ltr' | 'rtl' 
    }, 
    [ Autoplay({ delay: randomDelay, stopOnInteraction: false }) ]
  );
  
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );

  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const handleAddToCart = () => {
    addToCart({
      id: laptop.id,
      name: laptop.name,
      image: laptop.images[0] ?? "",
      price: laptop.price,
    });
    toast.success(`${laptop.name} added to cart!`);
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
        <button
          className="absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-card/80 backdrop-blur hover:bg-card transition-colors shadow-sm"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart
            className={`h-5 w-5 transition-colors ${isLiked ? "fill-accent text-accent" : "text-muted-foreground"
              }`}
          />
        </button>

        {/* Carousel Viewport */}
        <div className="h-full w-full overflow-hidden" ref={emblaRef}>
          <div className="flex h-full">
            {laptop.images.map((image, index) => (
              <div key={index} className="relative flex-[0_0_100%] min-w-0 h-full">
                <img
                  src={image}
                  alt={`${laptop.name} view ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows - Desktop Only */}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-8 w-8 items-center justify-center rounded-full bg-card/80 backdrop-blur hover:bg-card transition-all opacity-0 group-hover:opacity-100 shadow-sm"
          onClick={scrollPrev}
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-8 w-8 items-center justify-center rounded-full bg-card/80 backdrop-blur hover:bg-card transition-all opacity-0 group-hover:opacity-100 shadow-sm"
          onClick={scrollNext}
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5 text-foreground" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 px-2 py-1 rounded-full">
          {laptop.images.map((_, index) => (
            <button
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${index === selectedIndex
                  ? "bg-primary w-4 shadow-sm"
                  : "bg-primary/20 hover:bg-primary/40 w-1.5"
                }`}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
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
