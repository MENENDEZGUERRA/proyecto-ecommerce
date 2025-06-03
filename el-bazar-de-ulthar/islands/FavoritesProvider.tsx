import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { FavoritesContext } from "../context/FavoritesContext.tsx";
import { JSX } from "preact";

interface FavoritesProviderProps {
  children: JSX.Element | JSX.Element[];
}

export default function FavoritesProvider({ children }: FavoritesProviderProps) {
  const favorites = useSignal<number[]>([]);

  // Cargar favoritos desde localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      try {
        favorites.value = JSON.parse(savedFavorites);
      } catch (e) {
        console.error("Error loading favorites:", e);
      }
    }
  }, []);

  const toggleFavorite = (productId: number) => {
    const newFavorites = [...favorites.value];
    const index = newFavorites.indexOf(productId);
    
    if (index !== -1) {
      newFavorites.splice(index, 1); // Eliminar
    } else {
      newFavorites.push(productId); // Agregar
    }
    
    favorites.value = newFavorites;
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}