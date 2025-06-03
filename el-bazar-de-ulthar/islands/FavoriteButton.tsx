import { useFavorites } from "../context/FavoritesContext.tsx";
import { Product } from "../types.ts";

interface FavoriteButtonProps {
  product: Product;
}

export default function FavoriteButton({ product }: FavoriteButtonProps) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.value.includes(product.id);

  return (
    <button
      onClick={() => toggleFavorite(product.id)}
      class={`favorite-btn ${isFavorite ? "is-favorite" : ""}`}
    >
      {isFavorite ? (
        <>
          ★ Eliminar de favoritos
        </>
      ) : (
        <>
          ☆ Agregar a favoritos
        </>
      )}
    </button>
  );
}