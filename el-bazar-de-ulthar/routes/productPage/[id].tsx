import { Handlers, PageProps } from "$fresh/server.ts";
import { useEffect } from "preact/hooks";
import Header from "../../components/Header.tsx";
import { Product } from "../../types.ts";
import { asset } from "$fresh/runtime.ts";
import AddToCart from "../../islands/AddToCart.tsx";
import { useRecentlyViewed } from "../../context/RecentlyViewedContext.tsx";
import { products } from "../api/products.ts";
import FavoriteButton from "../../islands/FavoriteButton.tsx";
import ProductComments from "../../islands/ProductComments.tsx";
import RecentlyViewed from "../../islands/RecentlyViewed.tsx";

export const handler: Handlers<Product | null> = {
  async GET(_req, ctx) {
    const productId = parseInt(ctx.params.id);
    const product = products.find(p => p.id === productId);
    
    if (!product) {
      console.error(`Product ${productId} not found`);
    }
    
    return ctx.render(product || null);
  },
};

export default function ProductPage({ data }: PageProps<Product | null>) {
  const { addToRecentlyViewed } = useRecentlyViewed();
  
  useEffect(() => {
    if (data) {
      addToRecentlyViewed(data);
    }
  }, [data]);

  if (!data) {
    return (
      <div>
        <Header />
        <div class="error-message">Producto maldito no encontrado...</div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main class="product-detail">
        <div class="product-container">
          <div class="product-image-container">
            <img 
              src={asset(data.imageUrl)} 
              alt={data.name} 
              class="product-detail-image" 
            />
          </div>
          <div class="product-info">
            <h1 class="product-title">{data.name}</h1>
            <p class="product-description">{data.description}</p>
            
            <FavoriteButton product={data} />
            
            <AddToCart product={data} />
          </div>
        </div>
        <ProductComments productId={data.id} />
        <RecentlyViewed />
      </main>
    </>
  );
}