import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { Logos3 } from "@/components/blocks/logos3";
import { ProductsSection } from "@/components/ProductsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";

const Index = () => {
  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <Logos3 heading="Partner Brands" />
        <ProductsSection />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};

export default Index;
