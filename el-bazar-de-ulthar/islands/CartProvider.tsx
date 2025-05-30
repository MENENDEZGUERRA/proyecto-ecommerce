// islands/CartProvider.tsx
import { useSignal } from "@preact/signals";
import { CartContext } from "../context/CartContext.tsx";
import { CartItem } from "../context/CartContext.tsx";
import { Product } from "../types.ts";
import { JSX } from "preact";

interface CartProviderProps {
  children: JSX.Element | JSX.Element[];
}

export default function CartProvider({ children }: CartProviderProps) {
  const cart = useSignal<CartItem[]>([]);

  const addToCart = (product: Product, quantity: number) => {
    const currentCart = [...cart.value];
    const existingItemIndex = currentCart.findIndex(
      (item) => item.product.id === product.id
    );
    
    if (existingItemIndex !== -1) {
      currentCart[existingItemIndex] = {
        ...currentCart[existingItemIndex],
        quantity: currentCart[existingItemIndex].quantity + quantity,
      };
    } else {
      currentCart.push({ product, quantity });
    }
    
    cart.value = currentCart;
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    cart.value = cart.value.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
  };

  const removeFromCart = (productId: number) => {
    cart.value = cart.value.filter((item) => item.product.id !== productId);
  };

  const clearCart = () => {
    cart.value = [];
  };

  // Crear objeto de contexto
  const contextValue = {
    cart: cart.value,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}