import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { CartContext } from "../context/CartContext.tsx";
import { CartItem } from "../context/CartContext.tsx";
import { Product } from "../types.ts";
import { JSX } from "preact";

interface CartProviderProps {
  children: JSX.Element | JSX.Element[];
}

export default function CartProvider({ children }: CartProviderProps) {
  const cart = useSignal<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        cart.value = JSON.parse(savedCart);
      } catch (e) {
        console.error("Error loading cart from localStorage:", e);
      }
    }
  }, []);

  const addToCart = (product: Product, quantity: number) => {
    const currentCart = [...cart.value];
    const existingItemIndex = currentCart.findIndex(
      (item) => item.product.id === product.id
    );
    
    if (existingItemIndex !== -1) {
      const newQuantity = currentCart[existingItemIndex].quantity + quantity;
      currentCart[existingItemIndex] = {
        ...currentCart[existingItemIndex],
        quantity: Math.min(9, newQuantity), // MAX 9 unidades
      };
    } else {
      currentCart.push({
        product: { ...product },
        quantity: Math.min(9, quantity), // MAX 9 unidades
      });
    }
    cart.value = currentCart;
    localStorage.setItem("cart", JSON.stringify(currentCart));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    cart.value = cart.value.map((item) =>
      item.product.id === productId 
        ? { ...item, quantity: Math.min(9, quantity) } // MAX 9 unidades
        : item
    );
    localStorage.setItem("cart", JSON.stringify(cart.value));
  };

  const removeFromCart = (productId: number) => {
    cart.value = cart.value.filter((item) => item.product.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart.value));
  };

  const clearCart = () => {
    cart.value = [];
    localStorage.removeItem("cart");
  };

  const contextValue = {
    cart: cart.value,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}