// components/RecentlyViewed.tsx
import { useRecentlyViewed } from "../context/RecentlyViewedContext.tsx";
import { Product } from "../types.ts";
import { asset } from "$fresh/runtime.ts";

export default function RecentlyViewed() {
  const { viewedProducts } = useRecentlyViewed();
  
  if (viewedProducts.value.length === 0) return null;
  
  return (
    <div class="recently-viewed">
      <h3 class="section-title">Recently Viewed</h3>
      <div class="product-grid">
        {viewedProducts.value.map((product) => (
          <a href={`/productPage/${product.id}`} class="product-item">
            <div class="image-container">
              <img 
                src={asset(product.imageUrl)} 
                alt={product.name} 
                class="product-image"
              />
            </div>
            <h4 class="product-name">{product.name}</h4>
          </a>
        ))}
      </div>
    </div>
  );
}