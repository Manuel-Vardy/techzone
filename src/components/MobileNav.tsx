import { Home, Search, Heart, ShoppingBag, User } from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", href: "/#home", active: true },
  { icon: Search, label: "Search", href: "/#products" },
  { icon: Heart, label: "Favorites", href: "#" },
  { icon: ShoppingBag, label: "Cart", href: "#", badge: 3 },
  { icon: User, label: "Profile", href: "#" },
];

export const MobileNav = () => {
  return (
    <nav className="bottom-nav md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={`flex flex-col items-center gap-1 px-3 py-1 relative ${
              item.active ? "text-accent" : "text-muted-foreground"
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
