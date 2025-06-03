import { createContext } from "preact";
import { useContext } from "preact/hooks";
import { Product } from "../types.ts";

export interface RecentlyViewedContextType {
  recentlyViewed: Product[];
  addToRecentlyViewed: (product: Product) => void;
}

export const RecentlyViewedContext = createContext<RecentlyViewedContextType>({
  recentlyViewed: [],
  addToRecentlyViewed: () => {},
});

export const useRecentlyViewed = () => useContext(RecentlyViewedContext);