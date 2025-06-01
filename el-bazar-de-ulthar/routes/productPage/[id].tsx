// routes/productPage/[id].tsx
import { Handlers, PageProps } from "$fresh/server.ts";
import Header from "../../components/Header.tsx";
import { Product } from "../../types.ts";
import { asset } from "$fresh/runtime.ts";
import AddToCart from "../../islands/AddToCart.tsx";
import RecentlyViewed from "../../components/RecentlyViewed.tsx";
import { useRecentlyViewed } from "../../context/RecentlyViewedContext.tsx";
import { products } from "../api/products.ts";

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
  
  if (!data) {
    return (
      <div>
        <Header />
        <div class="error-message">Producto maldito no encontrado...</div>
      </div>
    );
  }
  
  // Añadir producto a los recientemente vistos
  addToRecentlyViewed(data);

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
            <AddToCart product={data} />
          </div>
        </div>
        
        {/* Componente de productos recientemente vistos */}
        <RecentlyViewed />
      </main>
    </>
  );
}