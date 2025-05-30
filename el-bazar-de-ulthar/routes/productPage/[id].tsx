// routes/productPage/[id].tsx
import { Handlers, PageProps } from "$fresh/server.ts";
import Header from "../../components/Header.tsx";
import { Product } from "../../types.ts";
import { asset } from "$fresh/runtime.ts";
import AddToCart from "../../islands/AddToCart.tsx"; // Importa el nuevo island

export const handler: Handlers<Product | null> = {
  async GET(_, ctx) {
    const productId = parseInt(ctx.params.id);
    const products: Product[] = JSON.parse(await Deno.readTextFile('./static/data/products.json'));
    const product = products.find(p => p.id === productId);
    return ctx.render(product || null);
  },
};

export default function ProductPage({ data }: PageProps<Product | null>) {
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
            {/* Usa el island para la parte interactiva */}
            <AddToCart product={data} />
          </div>
        </div>
      </main>
    </>
  );
}