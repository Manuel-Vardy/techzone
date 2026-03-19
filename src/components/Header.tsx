import { Search, ShoppingCart, Menu, User, Heart, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
  PopoverBody,
  PopoverFooter
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/#products" },
  { name: "Services", href: "/#services" },
  { name: "Reviews", href: "/#testimonials" },
  { name: "Contact", href: "/#contact" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      {/* Promo Banner */}
      <div className="hero-gradient py-2 overflow-hidden w-full">
        <div className="container flex items-center justify-center gap-2 whitespace-nowrap">
          <span className="text-xs md:text-sm font-medium text-primary-foreground truncate px-4">
            🚀 Free Shipping Worldwide on Orders Above GH₵500 • Limited Time Offer!
          </span>
        </div>
      </div>

      {/* Main Header */}
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/logo.png"
            alt="Tech Zone Logo"
            className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Search Bar - Desktop */}
        <div className="hidden flex-1 max-w-xl md:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search laptops, brands..."
              className="w-full pl-10 pr-4 bg-secondary border-0 focus-visible:ring-primary"
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {user ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="h-10 w-10 rounded-full p-0 overflow-hidden ring-offset-background focus-visible:ring-2 focus-visible:ring-primary/20">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL || undefined} />
                    <AvatarFallback className="bg-primary/5 text-primary uppercase">
                      {user.email?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64" align="end" sideOffset={8}>
                <PopoverHeader>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10 shadow-sm border border-border/50">
                      <AvatarImage src={user.photoURL || undefined} />
                      <AvatarFallback className="bg-secondary text-primary uppercase font-bold text-base">
                        {user.email?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="overflow-hidden">
                      <PopoverTitle className="truncate">Your Account</PopoverTitle>
                      <PopoverDescription className="text-xs truncate text-muted-foreground">
                        {user.email}
                      </PopoverDescription>
                    </div>
                  </div>
                </PopoverHeader>
                <PopoverBody className="space-y-1 px-2 py-1">
                  <Button variant="ghost" className="w-full justify-start h-9 text-muted-foreground hover:text-foreground font-medium" size="sm" onClick={() => { navigate("/#profile"); setIsOpen(false); }}>
                    <User className="mr-2 h-4 w-4 text-muted-foreground/70" />
                    Profile
                  </Button>
                  <Button variant="ghost" className="w-full justify-start h-9 text-muted-foreground hover:text-foreground font-medium" size="sm" onClick={() => { navigate("/#wishlist"); setIsOpen(false); }}>
                    <Heart className="mr-2 h-4 w-4 text-muted-foreground/70" />
                    Wishlist
                  </Button>
                  <Button variant="ghost" className="w-full justify-start h-9 text-muted-foreground hover:text-foreground font-medium" size="sm" onClick={() => { navigate("/#settings"); setIsOpen(false); }}>
                    <Settings className="mr-2 h-4 w-4 text-muted-foreground/70" />
                    Settings
                  </Button>
                </PopoverBody>
                <PopoverFooter className="border-t p-2 bg-muted/30">
                  <Button
                    variant="ghost"
                    className="w-full h-9 text-destructive hover:text-destructive hover:bg-destructive/10 justify-start px-3 font-semibold"
                    size="sm"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-accent-foreground shadow-sm">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-6 mt-6">
                {/* Mobile Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    className="w-full pl-10 bg-secondary border-0 ring-offset-background"
                  />
                </div>

                {/* Mobile Nav Links */}
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-semibold text-foreground hover:text-primary transition-all flex items-center justify-between group"
                    >
                      {link.name}
                      <span className="h-px w-0 bg-primary transition-all group-hover:w-8" />
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
