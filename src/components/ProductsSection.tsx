import { laptops } from "@/data/laptops";
import { LaptopCard } from "./LaptopCard";
import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

export const ProductsSection = () => {
  return (
    <section id="products" className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Featured Laptops
            </h2>
            <p className="text-muted-foreground mt-1">
              Top 10 Most Sold This Week, Next Day Delivery
            </p>
          </div>
          <Button variant="ghost" className="gap-1 text-primary">
            View All
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {laptops.map((laptop) => (
            <LaptopCard key={laptop.id} laptop={laptop} />
          ))}
        </div>
      </div>
    </section>
  );
};
