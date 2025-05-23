import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../CART/CartContext.jsx";
import products from "./products.mock.js";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const product = products.find(p => p.id === Number(id));

  return (
    <div>
      <button onClick={() => history.back()}>Back</button>
      <img src={product.image} alt={product.name} />
      <h1>{product.name}</h1>
      <p>Price: ${product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}