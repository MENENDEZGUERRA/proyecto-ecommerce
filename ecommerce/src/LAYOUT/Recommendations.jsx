export default function Recommendations() {
    const { history } = useContext(CartContext);
    const recommendations = useMemo(() => 
      [...history.current].reverse().slice(0, 3)
    , [history.current]);
  
    return (
      <section>
        <h2>Recently Viewed</h2>
        {recommendations.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    );
  }