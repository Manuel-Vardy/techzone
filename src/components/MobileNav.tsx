import { 
  Home, Search, ShoppingBag, User, Phone, LogOut, Settings, 
  MapPin, Mail, LayoutDashboard, Heart, ChevronRight
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

export const MobileNav = () => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
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

  const navItems = [
    { icon: Home, label: "Home", href: "/", active: location.pathname === "/" },
    { icon: Search, label: "Product", href: "/#products" },
    { icon: Phone, label: "Contact", href: "/#contact" },
    { icon: ShoppingBag, label: "Cart", href: "/cart", badge: cartCount },
  ];

  return (
    <nav className="bottom-nav md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={`flex flex-col items-center gap-1 px-3 py-1 relative transition-colors ${
              item.active ? "text-[#14213D] font-bold" : "text-gray-400 hover:text-[#14213D]"
            }`}
          >
            <div className="relative">
              <item.icon className="h-5 w-5" />
              {(item.badge !== undefined && item.badge > 0) ? (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#FCA331] text-[10px] font-black text-[#14213D] border-2 border-white shadow-sm pointer-events-none">
                  {item.badge}
                </span>
              ) : null}
            </div>
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}

        {/* Profile Section - Integrated with Sheet for Credentials */}
        {user ? (
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center gap-1 px-3 py-1 text-gray-400 hover:text-[#14213D] transition-colors focus:outline-none">
                <div className="relative">
                  <Avatar className="h-5 w-5 border border-gray-200">
                    <AvatarImage src={user.photoURL || undefined} />
                    <AvatarFallback className="bg-[#14213D] text-white text-[10px] font-bold uppercase">
                      {user.email?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-white shadow-sm" />
                </div>
                <span className="text-[10px] font-medium">Profile</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-[32px] bg-[#F8F9FA] p-0 overflow-hidden h-auto max-h-[90vh] border-none shadow-2xl pb-safe">
              <div className="p-5 pb-8 flex flex-col gap-5">
                
                {/* Profile Header */}
                <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                  <div className="relative">
                    <Avatar className="h-16 w-16 shadow-sm border border-gray-100">
                      <AvatarImage src={user.photoURL || undefined} />
                      <AvatarFallback className="bg-gradient-to-br from-[#14213D] to-blue-900 text-white text-xl font-bold uppercase">
                        {user.email?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg text-[#14213D] truncate">
                        {user.displayName || "Tech Explorer"}
                      </h3>
                      <div className="px-2 py-0.5 bg-[#FCA331]/20 text-[#FCA331] text-[9px] font-black uppercase rounded-full">
                        Pro
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>

                {/* Main Menu Items */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col">
                  {/* Settings */}
                  <button 
                    onClick={() => { navigate("/#profile"); }}
                    className="flex items-center gap-4 p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-50"
                  >
                    <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                      <Settings className="h-5 w-5" />
                    </div>
                    <span className="flex-1 text-left font-semibold text-[#14213D]/90">Account Settings</span>
                    <ChevronRight className="h-4 w-4 text-gray-300" />
                  </button>
                  
                  {/* Orders */}
                  <button 
                    onClick={() => { navigate("/#orders"); }}
                    className="flex items-center gap-4 p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-50"
                  >
                    <div className="h-10 w-10 rounded-full bg-[#FCA331]/10 flex items-center justify-center text-[#FCA331] shrink-0">
                      <LayoutDashboard className="h-5 w-5" />
                    </div>
                    <span className="flex-1 text-left font-semibold text-[#14213D]/90">Order History</span>
                    <ChevronRight className="h-4 w-4 text-gray-300" />
                  </button>

                  {/* Wishlist */}
                  <button 
                    onClick={() => { navigate("/#wishlist"); }}
                    className="flex items-center gap-4 p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-50"
                  >
                    <div className="h-10 w-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                      <Heart className="h-5 w-5" />
                    </div>
                    <span className="flex-1 text-left font-semibold text-[#14213D]/90">Wishlist Items</span>
                    <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600">
                      0
                    </div>
                  </button>

                  {/* Support */}
                  <button 
                    onClick={() => { navigate("/#contact"); }}
                    className="flex items-center gap-4 p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors rounded-b-2xl"
                  >
                    <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center text-green-500 shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <span className="flex-1 text-left font-semibold text-[#14213D]/90">Support Desk</span>
                    <ChevronRight className="h-4 w-4 text-gray-300" />
                  </button>
                </div>

                {/* Sign Out */}
                <button 
                   onClick={() => handleLogout()}
                   className="flex items-center justify-center gap-2 p-4 w-full bg-white text-red-500 font-bold rounded-2xl shadow-sm border border-red-50 hover:bg-red-50 active:bg-red-100 transition-all"
                >
                  <LogOut className="h-5 w-5" />
                  Secure Sign Out
                </button>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <Link
            to="/login"
            className="flex flex-col items-center gap-1 px-3 py-1 text-gray-400 hover:text-[#14213D] transition-colors"
          >
            <User className="h-5 w-5" />
            <span className="text-[10px] font-medium">Profile</span>
          </Link>
        )}
      </div>
    </nav>
  );
};
