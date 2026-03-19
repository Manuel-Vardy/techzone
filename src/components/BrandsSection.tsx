import { brands } from "@/data/laptops";

export const BrandsSection = () => {
  return (
    <section className="py-12 bg-secondary">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-lg font-semibold text-foreground">
            Popular Brands
          </h3>
          <a href="#" className="text-sm text-primary font-medium hover:underline">
            See all
          </a>
        </div>

        <div className="flex items-center justify-around gap-4 flex-wrap">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card hover:card-shadow transition-shadow cursor-pointer"
            >
              <span className="text-3xl">{brand.logo}</span>
              <span className="text-sm font-medium text-foreground">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
