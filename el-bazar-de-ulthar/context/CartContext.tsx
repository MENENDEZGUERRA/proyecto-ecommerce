import { createContext } from "preact";
import { useContext } from "preact/hooks";
import { Signal } from "@preact/signals";
import { Product } from "../types.ts";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  cart: Signal<CartItem[]>;
  addToCart: (product: Product, quantity: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

// Crear contexto con valor predeterminado
export const CartContext = createContext<CartContextType>({
  cart: { value: [] } as Signal<CartItem[]>,
  addToCart: () => {},
  updateQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

// Hook personalizado para acceder al contexto
export const useCart = () => useContext(CartContext);