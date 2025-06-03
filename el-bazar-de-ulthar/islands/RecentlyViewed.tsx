// islands/RecentlyViewed.tsx
import { useSignal, useComputed } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { useRecentlyViewed } from "../context/RecentlyViewedContext.tsx";
import { Product } from "../types.ts";
import { asset } from "$fresh/runtime.ts";

export default function RecentlyViewed() {
  const { viewedProducts } = useRecentlyViewed();
  const isClient = useSignal(false);
  
  useEffect(() => {
    isClient.value = true;
  }, []);

  const showComponent = useComputed(() => 
    isClient.value && viewedProducts.value.length > 0
  );

  if (!showComponent.value) return null;

  return (
    <div class="recently-viewed">
      <h3 class="section-title">Recently Viewed</h3>
      <div class="product-grid">
        {viewedProducts.value.map((product: Product) => (
          <a key={product.id} href={`/productPage/${product.id}`} class="product-item">
            <div class="image-container">
              <img 
                src={asset(product.imageUrl)} 
                alt={product.name} 
                class="product-image"
                loading="lazy"
              />
            </div>
            <h4 class="product-name">{product.name}</h4>
          </a>
        ))}
      </div>
    </div>
  );
}