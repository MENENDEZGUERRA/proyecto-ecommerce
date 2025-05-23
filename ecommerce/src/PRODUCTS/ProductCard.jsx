export default function ProductCard({ product }) {
    const { addToCart } = useContext(CartContext);
    
    return (
      <article>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>${product.price}</p>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      </article>
    );
  }