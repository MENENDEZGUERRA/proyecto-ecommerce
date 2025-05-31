import { Handlers, PageProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";
import ProductCard from "../components/ProductCard.tsx";

import { Product } from "../types.ts";

export const handler: Handlers<Product[] | null> = {
  async GET(_, ctx) {
    const products: Product[] = JSON.parse(await Deno.readTextFile('./static/data/products.json'));
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