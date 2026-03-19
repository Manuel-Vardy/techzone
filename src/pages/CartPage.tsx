import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal;

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <Header />
      <main className="container py-12 md:py-20">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Your Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl mb-4">Your cart is empty.</p>
            <Button asChild>
              <Link to="/">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-lg bg-card">
                  <div className="w-full sm:w-24 h-48 sm:h-24 flex items-center justify-center bg-secondary rounded-md overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <div className="flex-1 w-full space-y-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-muted-foreground text-sm">Price: GH₵{item.price.toFixed(2)}</p>
                    <div className="flex items-center justify-between sm:justify-start gap-4 mt-3">
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => {
                            if (item.quantity <= 1) {
                              removeFromCart(item.id);
                              return;
                            }
                            updateQuantity(item.id, item.quantity - 1);
                          }}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-medium w-6 text-center">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-4 sm:ml-auto">
                        <div className="text-right">
                          <p className="font-bold text-lg">GH₵{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-muted-foreground hover:text-destructive shrink-0"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="p-6 border rounded-lg sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>GH₵{subtotal.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>GH₵{total.toFixed(2)}</span>
                  </div>
                </div>
                <Button asChild className="w-full mt-6 h-12 text-base">
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
