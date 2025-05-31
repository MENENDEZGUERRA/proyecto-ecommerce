// context/RecentlyViewedContext.tsx
import { createContext } from "preact";
import { useContext } from "preact/hooks";
import { Signal, useSignal } from "@preact/signals";
import { Product } from "../types.ts";

interface RecentlyViewedContextType {
  viewedProducts: Signal<Product[]>;
  addToRecentlyViewed: (product: Product) => void;
}

export const RecentlyViewedContext = createContext<RecentlyViewedContextType>({
  viewedProducts: { value: [] } as Signal<Product[]>,
  addToRecentlyViewed: () => {},
});

// Hook personalizado para acceder al contexto
export const useRecentlyViewed = () => useContext(RecentlyViewedContext);

// Proveedor del contexto
export function RecentlyViewedProvider({ children }: { children: preact.ComponentChildren }) {
  const viewedProducts = useSignal<Product[]>([]);
  
  // Cargar productos vistos desde localStorage
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("recentlyViewed");
    if (saved) {
      try {
        viewedProducts.value = JSON.parse(saved);
      } catch (e) {
        console.error("Error loading recently viewed products:", e);
      }
    }
  }

  const addToRecentlyViewed = (product: Product) => {
    // Evitar duplicados
    const updated = viewedProducts.value.filter(p => p.id !== product.id);
    
    // Agregar el nuevo producto al inicio
    updated.unshift(product);
    
    // Mantener solo los últimos 5
    viewedProducts.value = updated.slice(0, 5);
    
    // Guardar en localStorage
    localStorage.setItem("recentlyViewed", JSON.stringify(viewedProducts.value));
  };

  return (
    <RecentlyViewedContext.Provider value={{ viewedProducts, addToRecentlyViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}