import { createContext } from "preact";
import { useContext } from "preact/hooks";
import { Signal } from "@preact/signals";
import { Product } from "../types.ts";

export interface FavoritesContextType {
  favorites: Signal<number[]>; 
  toggleFavorite: (productId: number) => void;
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: { value: [] } as Signal<number[]>,
  toggleFavorite: () => {},
});

export const useFavorites = () => useContext(FavoritesContext);