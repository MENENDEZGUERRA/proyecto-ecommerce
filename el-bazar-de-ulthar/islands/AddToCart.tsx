// islands/AddToCart.tsx
// islands/AddToCart.tsx
import { useState } from "preact/hooks";
import { useCart } from "../context/CartContext.tsx"; // Importación corregida
import { Product } from "../types.ts";


interface AddToCartProps {
  product: Product;
}

export default function AddToCart({ product }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const formatPrice = (price: number) => `Q.${price.toFixed(2)}`;
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <div class="add-to-cart-section">
      <div class="product-prices">
        {product.discountPercentage > 0 && (
          <span class="original-price">{formatPrice(product.price)}</span>
        )}
        <span class="discounted-price">{formatPrice(discountedPrice)}</span>
      </div>
      <div class="quantity-selector">
        <button 
          onClick={() => setQuantity(q => Math.max(1, q - 1))}
          class="quantity-btn"
        >
          -
        </button>
        <span class="quantity-value">{quantity}</span>
        <button 
          onClick={() => setQuantity(q => q + 1)}
          class="quantity-btn"
        >
          +
        </button>
      </div>
      <button 
        class="add-to-cart-btn"
        onClick={() => addToCart(product, quantity)}
      >
        Add to the Bag
      </button>
    </div>
  );
}