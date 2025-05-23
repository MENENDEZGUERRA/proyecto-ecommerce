import { useContext } from "react";
import ProductCard from "./components/ProductCard.jsx";
import { CartContext } from "../CART/CartContext.jsx";
import Recommendations from "../LAYOUT/Recommendations.jsx";
import products from "./products.mock.js";

export default function ProductsPage() {
  const { trackProduct } = useContext(CartContext);
  
  return (
    <div>
      <h1>Our Products</h1>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product}
            onView={() => trackProduct(product)}
          />
        ))}
      </div>
      <Recommendations />
    </div>
  );
}