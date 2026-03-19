import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";

const footerLinks = {
  shop: [
    { name: "All Laptops", href: "/#products" },
    { name: "Gaming Laptops", href: "/#products" },
    { name: "Business Laptops", href: "/#products" },
    { name: "Student Laptops", href: "/#products" },
    { name: "Accessories", href: "/#products" },
  ],
  support: [
    { name: "Help Center", href: "/#contact" },
    { name: "Track Order", href: "/#contact" },
    { name: "Shipping Info", href: "/#services" },
    { name: "Returns & Refunds", href: "/#services" },
    { name: "Warranty Policy", href: "/#services" },
  ],
  company: [
    { name: "About TechZone", href: "/#home" },
    { name: "Our Services", href: "/#services" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "Contact Us", href: "/#contact" },
    { name: "Careers", href: "/#home" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Subscribed successfully! Welcome to TechZone.");
    setEmail("");
  };
  return (
    <footer className="bg-foreground text-primary-foreground py-12 pb-24 md:pb-12">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand & Newsletter */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group w-fit">
              <img
                src="/logo.png"
                alt="Tech Zone Logo"
                className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="text-primary-foreground/70 text-sm mb-4 max-w-xs">
              Your one-stop destination for the latest laptops and tech gadgets.
              Quality products, competitive prices, exceptional service.
            </p>

            {/* Newsletter */}
            <form className="space-y-2" onSubmit={handleSubscribe}>
              <p className="text-sm font-medium">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                  />
                </div>
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0">
                  Subscribe
                </Button>
              </div>
            </form>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/70">
            © 2025 Tech Zone. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground/70 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
