// context/RecentlyViewedContext.tsx
import { createContext } from "preact";
import { useContext, useEffect, useLayoutEffect } from "preact/hooks";
import { Signal, signal } from "@preact/signals";
import { Product } from "../types.ts";

interface RecentlyViewedContextType {
  viewedProducts: Signal<Product[]>;
  addToRecentlyViewed: (product: Product) => void;
}

export const RecentlyViewedContext = createContext<RecentlyViewedContextType>({
  viewedProducts: signal([]),
  addToRecentlyViewed: () => {},
});

export const useRecentlyViewed = () => useContext(RecentlyViewedContext);

export function RecentlyViewedProvider({ children }: { children: preact.ComponentChildren }) {
  const viewedProducts = signal<Product[]>([]);
  
  useLayoutEffect(() => {
    const saved = localStorage.getItem("recentlyViewed");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          viewedProducts.value = parsed;
        }
      } catch (e) {
        console.error("Error loading recently viewed:", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("recentlyViewed", JSON.stringify(viewedProducts.value));
  }, [viewedProducts.value]);

  const addToRecentlyViewed = (product: Product) => {
    const updated = [
      product,
      ...viewedProducts.value.filter(p => p.id !== product.id)
    ].slice(0, 5);
    
    viewedProducts.value = updated;
  };

  return (
    <RecentlyViewedContext.Provider value={{ viewedProducts, addToRecentlyViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}