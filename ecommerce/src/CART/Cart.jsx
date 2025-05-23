import { useContext } from "react";
import { CartContext } from "./CartContext.jsx";
import CartItem from "./components/CartItem.jsx";
import CartTotal from "./components/CartTotal.jsx";
import EmptyCart from "./components/EmptyCart.jsx";

export default function CartPage() {
  const { cartItems } = useContext(CartContext);

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.current.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          {cartItems.current.map(item => (
            <CartItem key={item.product.id} item={item} />
          ))}
          <CartTotal />
          <button onClick={() => clearCart()}>Clear Cart</button>
        </>
      )}
    </div>
  );
}