import { useRecentlyViewed } from "../context/RecentlyViewedContext.tsx";
import ProductCard from "../components/ProductCard.tsx";

export default function RecentlyViewed() {
  const { recentlyViewed } = useRecentlyViewed();
  
  // If no recently viewed products, don't render anything
  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <div class="recently-viewed-section">
      <h2 class="recently-viewed-title">Recientemente Vistos</h2>
      <div class="recently-viewed-products">
        {recentlyViewed.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}