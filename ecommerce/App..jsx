import { CartProvider } from "./CART/CartContext.jsx";
import { Routes, Route } from "react-router-dom";
import Navigation from "./LAYOUT/Navigation.jsx";
import ProductsPage from "./PRODUCTS/ProductList.jsx";
import ProductDetails from "./PRODUCTS/ProductDetails.jsx";
import CartPage from "./CART/Cart.jsx";

export default function App() {
  return (
    <CartProvider>
      <Navigation />
      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
    </CartProvider>
  );
}