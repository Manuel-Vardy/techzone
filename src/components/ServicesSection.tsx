import { Truck, Shield, Headphones, CreditCard, RefreshCw, Award } from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free delivery on orders over GH₵500 worldwide",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure payment with SSL encryption",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated support team available round the clock",
  },
  {
    icon: CreditCard,
    title: "Easy Financing",
    description: "Flexible payment plans with 0% interest",
  },
  {
    icon: RefreshCw,
    title: "30-Day Returns",
    description: "Hassle-free returns within 30 days",
  },
  {
    icon: Award,
    title: "Best Quality",
    description: "Premium products from top brands only",
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-secondary">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Our Services
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            We provide exceptional services to make your shopping experience seamless and enjoyable
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-card p-6 rounded-xl card-shadow hover:card-shadow-hover transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <service.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
