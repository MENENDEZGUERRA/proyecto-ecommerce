import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../CART/CartContext.jsx";

export default function Navigation() {
  const { cartItems } = useContext(CartContext);
  
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/cart">
        Cart ({cartItems.current.reduce((acc, item) => acc + item.quantity, 0)})
      </Link>
    </nav>
  );
}