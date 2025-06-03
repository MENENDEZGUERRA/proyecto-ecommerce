import { useState, useEffect } from "preact/hooks";
import { RecentlyViewedContext } from "../context/RecentlyViewedContext.tsx";
import { Product } from "../types.ts";
import { JSX } from "preact";

interface RecentlyViewedProviderProps {
  children: JSX.Element | JSX.Element[];
}
// NO RENDERIZA ¿POR QUÉ NO RENDERIZA?
export default function RecentlyViewedProvider({ children }: RecentlyViewedProviderProps) {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("recentlyViewed");
    if (saved) {
      try {
        setRecentlyViewed(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading recently viewed:", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const addToRecentlyViewed = (product: Product) => {
    setRecentlyViewed(prev => {
      const newList = prev.filter(p => p.id !== product.id);
      
      newList.unshift(product);
      
      return newList.slice(0, 5);
    });
  };

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, addToRecentlyViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}