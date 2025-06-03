import { useCart } from "../context/CartContext.tsx";
import { Product } from "../types.ts";
import { asset } from "$fresh/runtime.ts";

export default function BagPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  
  const formatPrice = (price: number) => `Q.${price.toFixed(2)}`;
  
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const discountedPrice = item.product.price * (1 - item.product.discountPercentage / 100);
      return total + (discountedPrice * item.quantity);
    }, 0);
  };
  
  const calculateItemTotal = (item: { product: Product; quantity: number; }) => {
    const discountedPrice = item.product.price * (1 - item.product.discountPercentage / 100);
    return discountedPrice * item.quantity;
  };

  const total = calculateTotal();
  const exceedsLimit = total > 7799.922; // Verificar si excede el límite

  return (
    <div class="bag-page">
      <h1 class="bag-title">Your Bag of Cursed Items</h1>
      
      {cart.length === 0 ? (
        <div class="empty-bag">
          <p>Your bag is empty. Add some cursed treasures!</p>
          <a href="/productsPage" class="continue-shopping">Continue Shopping</a>
        </div>
      ) : (
        <>
          <div class="bag-items">
            {cart.map((item) => (
              <div class="bag-item" key={item.product.id}>
                <div class="item-image-container">
                  <img 
                    src={asset(item.product.imageUrl)} 
                    alt={item.product.name} 
                    class="item-image"
                  />
                </div>
                <div class="item-details">
                  <h2 class="item-name">{item.product.name}</h2>
                  <div class="item-prices">
                    {item.product.discountPercentage > 0 && (
                      <span class="original-price">
                        {formatPrice(item.product.price)}
                      </span>
                    )}
                    <span class="discounted-price">
                      {formatPrice(item.product.price * (1 - item.product.discountPercentage / 100))}
                    </span>
                  </div>
                  <div class="item-quantity">
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      class="quantity-btn"
                    >
                      -
                    </button>
                    <span class="quantity-value">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.product.id, Math.min(9, item.quantity + 1))} // Máximo 9 unidades
                      class="quantity-btn"
                      disabled={item.quantity >= 9} // Deshabilitar cuando se alcanza el máximo
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.product.id)}
                    class="remove-btn"
                  >
                    Remove
                  </button>
                </div>
                <div class="item-total">
                  {formatPrice(calculateItemTotal(item))}
                </div>
              </div>
            ))}
          </div>
          
          <div class="bag-summary">
            <div class="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div class="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div class={`summary-row total ${exceedsLimit ? 'error' : ''}`}>
              <span>Total</span>
              <span>
                {exceedsLimit ? "ERROR" : formatPrice(total)}
              </span>
            </div>
            
            {exceedsLimit && (
              <div class="error-message">
                Total exceeds Q.7799.922
              </div>
            )}
            
            <div class="bag-actions">
              <button 
                onClick={clearCart}
                class="clear-btn"
              >
                Clear Bag
              </button>
              <button class="checkout-btn" disabled={exceedsLimit}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}