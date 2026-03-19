import { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of a cart item
export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  stock?: number;
}

// Define the shape of the context
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  cartCount: number;
  clearCart: () => void;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create the provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (itemToAdd: Omit<CartItem, 'quantity'>) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === itemToAdd.id);
      if (existingItem) {
        // If item exists, update quantity, but don't exceed stock
        const maxQuantity = existingItem.stock ?? Number.POSITIVE_INFINITY;
        const newQuantity = Math.min(existingItem.quantity + 1, maxQuantity);
        return prevItems.map((item) =>
          item.id === itemToAdd.id ? { ...item, quantity: newQuantity } : item
        );
      } else {
        // If item doesn't exist, add it with quantity 1
        return [...prevItems, { ...itemToAdd, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setCartItems((prevItems) => {
        const itemToUpdate = prevItems.find(item => item.id === itemId);
        if (!itemToUpdate) return prevItems;

        if (quantity <= 0) {
          return prevItems.filter((item) => item.id !== itemId);
        }

        const maxQuantity = itemToUpdate.stock ?? Number.POSITIVE_INFINITY;
        const newQuantity = Math.max(1, Math.min(quantity, maxQuantity));
        return prevItems.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
    });
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, cartCount, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
