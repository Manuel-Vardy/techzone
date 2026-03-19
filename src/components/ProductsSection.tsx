import { useState, useEffect } from "react";
import { laptops as staticLaptops, Laptop } from "@/data/laptops";
import { LaptopCard } from "./LaptopCard";
import { ChevronRight, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { db } from "@/lib/firebase";
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";

export const ProductsSection = () => {
  const [products, setProducts] = useState<Laptop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(
          collection(db, "products"), 
          orderBy("updatedAt", "desc"),
          limit(10)
        );
        const querySnapshot = await getDocs(q);
        const fetchedProducts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Laptop[];
        
        if (fetchedProducts.length > 0) {
          setProducts(fetchedProducts);
        } else {
          setProducts(staticLaptops.slice(0, 10));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts(staticLaptops.slice(0, 10));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
          {loading ? (
            <div className="col-span-full flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            products.map((laptop) => (
              <LaptopCard key={laptop.id} laptop={laptop} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};
