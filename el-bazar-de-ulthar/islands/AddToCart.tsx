import { useState } from "preact/hooks";
import { useCart } from "../context/CartContext.tsx";
import { Product } from "../types.ts";

interface AddToCartProps {
  product: Product;
}

export default function AddToCart({ product }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const formatPrice = (price: number) => `Q.${price.toFixed(2)}`;
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    
    setTimeout(() => setAdded(false), 2000);
  };

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
          onClick={() => setQuantity(q => Math.min(9, q + 1))} // <--- Arreglar aquí si el contador sube de 9
          class="quantity-btn"
          disabled={quantity >= 9} // Deshabilitar cuando se llega al 9
        >
          +
        </button>
      </div>
      
      <button 
        class={`add-to-cart-btn ${added ? 'added' : ''}`}
        onClick={handleAddToCart}
      >
        {added ? "✓ Added to Bag!" : "Add to the Bag"}
      </button>
      
      {added && (
        <div class="added-feedback">
          {quantity} {quantity > 1 ? 'items' : 'item'} added to your bag!
        </div>
      )}
    </div>
  );
}