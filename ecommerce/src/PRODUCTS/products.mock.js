// En products.mock.js
const products = Array.from({length: 10}, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: (Math.random() * 100).toFixed(2),
    image: `https://picsum.photos/200?random=${i}`
  }));
  
  export default products;