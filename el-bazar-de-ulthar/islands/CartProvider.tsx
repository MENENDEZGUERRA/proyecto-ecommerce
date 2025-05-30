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
    // Clonar el array actual
    const currentCart = [...cart.value];
    const existingItemIndex = currentCart.findIndex(
      (item) => item.product.id === product.id
    );
    
    if (existingItemIndex !== -1) {
      // Actualizar cantidad si el producto ya está en el carrito
      currentCart[existingItemIndex] = {
        ...currentCart[existingItemIndex],
        quantity: currentCart[existingItemIndex].quantity + quantity,
      };
    } else {
      // Añadir nuevo producto al carrito
      currentCart.push({ 
        product: { ...product }, // Crear copia para evitar mutaciones
        quantity 
      });
    }
    
    // Actualizar la señal
    cart.value = currentCart;
    
    // Guardar en localStorage para persistencia
    localStorage.setItem("cart", JSON.stringify(currentCart));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    cart.value = cart.value.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    
    // Actualizar localStorage
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

  // Cargar carrito desde localStorage al iniciar
  if (typeof window !== "undefined" && !cart.value.length) {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        cart.value = JSON.parse(savedCart);
      } catch (e) {
        console.error("Error loading cart from localStorage:", e);
      }
    }
  }

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