import { Handlers, PageProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";
import ProductCard from "../components/ProductCard.tsx";

import { Product } from "../types.ts";

export const handler: Handlers<Product[] | null> = {
  async GET(_, ctx) {
    // Cambia la ruta para Deno Deploy
    const res = await fetch(`${ctx.url.origin}/data/products.json`);
    if (!res.ok) return ctx.render(null);
    const products: Product[] = await res.json();
    return ctx.render(products);
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