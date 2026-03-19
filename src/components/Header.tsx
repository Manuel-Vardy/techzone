import { 
  Search, ShoppingCart, Menu, User, Heart, LogOut, Settings, 
  MapPin, Phone, Clock, Mail, Facebook, Twitter, Instagram, Linkedin, LayoutDashboard 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
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
  const location = useLocation();

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
    <header className="w-full relative z-50">
      {/* 1. TOP BAR - Black background */}
      <div className="bg-zinc-950 text-white py-1.5 px-4 hidden md:block">
        <div className="container flex justify-between items-center text-[13px] font-light opacity-90">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-[#FCA311]" />
              300 Pennsylvania Ave NW, Washington, DC 20006, USA
            </span>
            <span className="flex items-center gap-2 border-l border-zinc-700 pl-6 cursor-pointer hover:text-[#FCA311] transition-colors">
              <Phone className="h-3.5 w-3.5 text-[#FCA311]" />
              +233 24 567 8901
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Facebook className="h-3.5 w-3.5 cursor-pointer hover:text-blue-400 transition-colors" />
            <Twitter className="h-3.5 w-3.5 cursor-pointer hover:text-blue-400 transition-colors" />
            <Instagram className="h-3.5 w-3.5 cursor-pointer hover:text-blue-400 transition-colors" />
            <Linkedin className="h-3.5 w-3.5 cursor-pointer hover:text-blue-400 transition-colors" />
          </div>
        </div>
      </div>

      {/* 2. MIDDLE BAR - White background with Logo and Info blocks */}
      <div className="bg-white py-2.5 px-4 border-b border-gray-100 hidden md:block">
        <div className="container flex justify-between items-center">
          {/* Brand Logo with refined Oxford Blue kite background */}
          <div className="relative">
            <div 
              className="absolute -left-14 -right-28 -inset-y-4 bg-[#14213D] z-0 shadow-xl border-r border-white/5"
              style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 40px) 100%, 0% 100%)' }}
            />
            <Link to="/" className="relative z-10 block">
              <img 
                src="/logo.png" 
                alt="Tech Zone" 
                className="h-12 md:h-16 w-auto object-contain hover:opacity-95 transition-opacity" 
              />
            </Link>
          </div>

          {/* Info Blocks */}
          <div className="flex items-center gap-8 lg:gap-12">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 bg-blue-50 flex items-center justify-center rounded-sm text-blue-600 border border-blue-100 italic font-bold">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 leading-none mb-1">Our Location</p>
                <p className="text-[13px] font-bold text-zinc-900 leading-none">Accra, Ghana</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 bg-blue-50 flex items-center justify-center rounded-sm text-blue-600 border border-blue-100">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 leading-none mb-1">Working Hours</p>
                <p className="text-[13px] font-bold text-zinc-900 leading-none">8am - 6pm</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 bg-blue-50 flex items-center justify-center rounded-sm text-blue-600 border border-blue-100">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 leading-none mb-1">Get in Touch</p>
                <p className="text-[13px] font-bold text-zinc-900 leading-none">info@techzone.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. NAVIGATION BAR - Dark Black background */}
      <div className="bg-zinc-900 text-white sticky top-0 md:relative md:top-auto border-t border-zinc-800 shadow-lg">
        <div className="container flex items-center justify-between h-14 md:h-16 px-4">
          
          {/* Mobile View - Logo on Left */}
          <Link to="/" className="md:hidden flex items-center transition-opacity hover:opacity-90">
            <img src="/logo.png" alt="Tech Zone" className="h-10 w-auto object-contain" />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center h-full">
            {navLinks.map((link) => (
              <Link 
                key={link.name} // Added key back for list rendering
                to={link.href} 
                className={cn(
                  "text-[13px] font-black uppercase tracking-wider transition-colors relative group py-2 px-6", // Removed italic
                  location.pathname === link.href
                    ? "text-[#FCA311]" 
                    : "text-white/90 hover:text-[#FCA311]"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FCA311] transition-all duration-300 group-hover:w-full",
                  location.pathname === link.href && "w-full" // Changed link.path to link.href
                )} />
              </Link>
            ))}
          </nav>

          {/* Actions - Desktop & Mobile */}
          <div className="flex items-center">
            {/* Desktop Actions Highlights */}
            <div className="hidden md:flex items-center h-full mr-4 gap-2">
              <Link to="/cart" className="relative p-2.5 text-gray-300 hover:text-yellow-400 transition-colors">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-[10px] text-zinc-950 font-black shadow-sm border-2 border-zinc-900">
                    {cartCount}
                  </span>
                )}
              </Link>
              
              {user ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="h-10 w-10 rounded-full overflow-hidden border-2 border-zinc-700 hover:border-blue-600 transition-all ring-offset-zinc-900 focus-visible:ring-2 focus-visible:ring-blue-600">
                      <Avatar className="h-full w-full">
                        <AvatarImage src={user.photoURL || undefined} />
                        <AvatarFallback className="bg-blue-600 text-white uppercase font-bold text-sm">
                          {user.email?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 bg-zinc-950 border-zinc-800 text-white shadow-2xl" align="end" sideOffset={12}>
                    <PopoverHeader className="border-zinc-800">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10 border border-blue-600 shadow-lg shadow-blue-900/40">
                          <AvatarImage src={user.photoURL || undefined} />
                          <AvatarFallback className="bg-blue-600 text-white uppercase font-bold">
                            {user.email?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="overflow-hidden">
                          <PopoverTitle className="truncate font-bold text-white">Your Hub</PopoverTitle>
                          <PopoverDescription className="text-xs truncate text-blue-300 font-medium">
                            {user.email}
                          </PopoverDescription>
                        </div>
                      </div>
                    </PopoverHeader>
                    <PopoverBody className="space-y-1 px-2 py-3 bg-zinc-900/50">
                      <Button variant="ghost" className="w-full justify-start h-9 text-zinc-400 hover:text-white hover:bg-zinc-800 font-medium border-l-2 border-transparent hover:border-yellow-400 rounded-none transition-all" size="sm" onClick={() => navigate("/#profile")}>
                        <User className="mr-3 h-4 w-4" />
                        Account Settings
                      </Button>
                      <Button variant="ghost" className="w-full justify-start h-9 text-zinc-400 hover:text-white hover:bg-zinc-800 font-medium border-l-2 border-transparent hover:border-yellow-400 rounded-none transition-all" size="sm" onClick={() => navigate("/#orders")}>
                        <ShoppingCart className="mr-3 h-4 w-4" />
                        Purchase History
                      </Button>
                      <Button variant="ghost" className="w-full justify-start h-9 text-zinc-400 hover:text-white hover:bg-zinc-800 font-medium border-l-2 border-transparent hover:border-yellow-400 rounded-none transition-all" size="sm" onClick={() => navigate("/#wishlist")}>
                        <Heart className="mr-3 h-4 w-4" />
                        My Wishlist
                      </Button>
                    </PopoverBody>
                    <PopoverFooter className="border-zinc-800 p-2 bg-black">
                      <Button
                        variant="ghost"
                        className="w-full h-10 text-red-500 hover:text-white hover:bg-red-600 justify-center font-bold uppercase tracking-tighter text-xs"
                        size="sm"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Secure Logout
                      </Button>
                    </PopoverFooter>
                  </PopoverContent>
                </Popover>
              ) : (
                <Link to="/login">
                  <Button variant="ghost" className="text-gray-300 hover:text-yellow-400">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              )}
            </div>

            {/* "Get In Touch" Button - Brand Color Integration */}
            <div className="relative group">
              <div 
                className="absolute inset-y-0 -left-6 -right-12 bg-[#14213D] md:group-hover:bg-[#FCA311] md:group-hover:text-black transition-all duration-300 z-0"
                style={{ clipPath: 'polygon(26px 0, 100% 0, 100% 100%, 0% 100%)' }}
              />
              <Link 
                to="/#contact" 
                className="relative z-10 px-8 md:px-12 h-14 md:h-16 flex items-center justify-center font-black uppercase tracking-tighter text-[#FCA331] group-hover:text-[#14213D] transition-colors duration-300 text-sm md:text-base whitespace-nowrap"
              >
                Get In Touch
              </Link>
            </div>

            {/* Hamburger - Mobile only */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden ml-2 pr-4">
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-zinc-950 border-zinc-900 p-0 overflow-hidden">
                {/* Mobile Menu Top Section */}
                <div className="bg-blue-700 p-4 flex items-center justify-between border-b border-blue-600/50">
                  <div className="flex items-center">
                    <img src="/logo.png" alt="Tech Zone Logo" className="h-14 w-auto object-contain" />
                  </div>
                </div>

                <div className="p-6 flex flex-col gap-8 h-full">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                    <Input
                      placeholder="Search gadgets..."
                      className="w-full pl-10 bg-zinc-900 border-zinc-800 text-white rounded-none h-12 hoveR:bg-zinc-800 transition-colors"
                    />
                  </div>

                  {/* Mobile Nav Links */}
                  <nav className="flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-bold text-zinc-300 hover:text-yellow-400 py-3 border-b border-zinc-900 flex items-center justify-between group uppercase italic tracking-tighter"
                      >
                        {link.name}
                        <div className="h-1 w-0 bg-yellow-400 transition-all group-hover:w-8" />
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile Contact Info */}
                  <div className="mt-auto pb-10 flex flex-col gap-4 text-zinc-500 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-zinc-900 flex items-center justify-center rounded-sm text-blue-500">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <span>Accra, Ghana</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-zinc-900 flex items-center justify-center rounded-sm text-blue-500">
                        <Mail className="h-5 w-5" />
                      </div>
                      <span>info@techzone.com.gh</span>
                    </div>
                    
                    <div className="flex items-center gap-6 mt-6 justify-center">
                      <a href="#" className="text-gray-400 hover:text-[#FCA311] transition-colors"><Facebook className="h-4 w-4" /></a>
                      <a href="#" className="text-gray-400 hover:text-[#FCA311] transition-colors"><Twitter className="h-4 w-4" /></a>
                      <a href="#" className="text-gray-400 hover:text-[#FCA311] transition-colors"><Instagram className="h-4 w-4" /></a>
                      <a href="#" className="text-gray-400 hover:text-[#FCA311] transition-colors"><Linkedin className="h-4 w-4" /></a>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
