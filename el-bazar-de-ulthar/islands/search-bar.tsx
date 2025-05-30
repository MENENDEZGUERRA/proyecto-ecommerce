import { useSignal, useComputed } from "@preact/signals";
import { Product } from "../types.ts";

interface SearchBarProps {
  products: Product[];
}

export default function SearchBar({ products }: SearchBarProps) {
  const searchQuery = useSignal("");
  
  const filteredProducts = useComputed(() => {
    console.log("Recalculando lista filtrada...");
    
    if (!searchQuery.value) return products;
    
    const query = searchQuery.value.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query)
    );
  });

  return (
    <div class="search-container">
      <div class="search-bar">
        <div class="search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path fill="#8E1616" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </div>
        <input
          type="text"
          placeholder="Buscar objetos malditos..."
          value={searchQuery.value}
          onInput={(e) => searchQuery.value = (e.target as HTMLInputElement).value}
          class="search-input"
        />
      </div>
      
      <div class="results-info">
        {filteredProducts.value.length === products.length ? (
          <span>Mostrando todos los {products.length} productos</span>
        ) : (
          <span>
            Mostrando {filteredProducts.value.length} de {products.length} productos
          </span>
        )}
      </div>
    </div>
  );
}