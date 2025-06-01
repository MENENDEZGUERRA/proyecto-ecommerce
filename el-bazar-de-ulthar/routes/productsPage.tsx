import { Handlers, PageProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";
import ProductCard from "../components/ProductCard.tsx";

import { Product } from "../types.ts";

export const handler: Handlers<Product[] | null> = {
  async GET(_, ctx) {
    try {
      const res = await fetch(`${ctx.url.origin}/api/products`);
      const text = await res.text();
      
      if (!res.ok) {
        console.error(`API responded with status ${res.status}: ${text}`);
        return ctx.render(null);
      }

      let products: Product[];
      try {
        products = JSON.parse(text);
      } catch (e) {
        console.error("Failed to parse products:", e);
        return ctx.render(null);
      }

      return ctx.render(products);
    } catch (error) {
      console.error("Error loading products:", error);
      return ctx.render(null);
    }
  },
};

export default function ProductsPage({ data }: PageProps<Product[] | null>) {
  if (!data) {
    return (
      <div>
        <Header />
        <div class="error-message">No se encontraron productos malditos...</div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main class="products-page">
        <div class="products-container">
          {data.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </>
  );
}