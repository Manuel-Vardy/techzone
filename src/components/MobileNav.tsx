import { Home, Search, Heart, ShoppingBag, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";

export const MobileNav = () => {
  const { cartCount } = useCart();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", href: "/", active: location.pathname === "/" },
    { icon: Search, label: "Products", href: "/#products" },
    { icon: Heart, label: "Wishlist", href: "/#wishlist" },
    { icon: ShoppingBag, label: "Cart", href: "/cart", badge: cartCount },
    { icon: User, label: "Profile", href: "/#profile" },
  ];
  return (
    <nav className="bottom-nav md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={`flex flex-col items-center gap-1 px-3 py-1 relative transition-colors ${
              item.active ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <div className="relative">
              <item.icon className="h-5 w-5" />
              {item.badge && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};
