import { useState, useMemo } from "preact/hooks";
import ProductCard from "../components/ProductCard.tsx";
import { Product } from "../types.ts";

interface ProductSearchProps {
  products: Product[];
}

export default function ProductSearch({ products }: ProductSearchProps) {
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return products;
    return products.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term)
    );
  }, [search, products]);

  return (
    <>
      <div class="search-container">
        <form onSubmit={e => e.preventDefault()} class="search-bar">
          <span class="search-icon">🔍</span>
          <input
            class="search-input"
            type="text"
            placeholder="Buscar productos malditos..."
            value={search}
            onInput={e => setSearch((e.target as HTMLInputElement).value)}
          />
        </form>
      </div>
      <div class="products-container">
        {filteredProducts.length === 0 ? (
          <div class="error-message">No hay productos que coincidan con tu búsqueda.</div>
        ) : (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </>
  );
}