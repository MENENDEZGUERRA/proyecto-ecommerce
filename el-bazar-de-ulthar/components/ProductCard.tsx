import { asset } from "$fresh/runtime.ts";

interface Product {
  id: number;
  name: string;
  price: number;
  discountPercentage: number;
  imageUrl: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);
  
  const formatPrice = (price: number) => {
    return `Q.${price.toFixed(2)}`;
  };

  return (
    <a href={`/productPage/${product.id}`} class="product-card">
      <div class="image-container">
        <img 
          src={asset(product.imageUrl)} 
          alt={product.name} 
          class="product-image"
        />
      </div>
      <h3 class="product-title">{product.name}</h3>
      <div class="price-container">
        {product.discountPercentage > 0 && (
          <span class="original-price">
            {formatPrice(product.price)}
          </span>
        )}
        <span class={`discounted-price ${product.discountPercentage > 0 ? 'has-discount' : ''}`}>
          {formatPrice(discountedPrice)}
        </span>
      </div>
    </a>
  );
}