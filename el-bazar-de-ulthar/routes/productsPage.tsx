import { Handlers, PageProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";
import ProductCard from "../components/ProductCard.tsx";

interface Product {
  id: number;
  name: string;
  price: number;
  discountPercentage: number;
  imageUrl: string;
}

export const handler: Handlers<Product[] | null> = {
  async GET(_, ctx) {
    // Leer datos del JSON
    const products: Product[] = JSON.parse(await Deno.readTextFile('./static/data/products.json'));
    return ctx.render(products);
  },
};

export default function ProductsPage({ data }: PageProps<Product[] | null>) {
  if (!data) {
    return <div>No products found</div>;
  }

  return (
    <>
      <Header />
      <div class="products-container">
        {data.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}