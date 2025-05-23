import { useCallback, useMemo } from "react";

export function useCart(cartItems, history) {
  const addToCart = useCallback((product) => {
    const existing = cartItems.current.find(item => item.product.id === product.id);
    if (existing) {
      if (existing.quantity < 9) existing.quantity++;
    } else {
      cartItems.current.push({ product, quantity: 1 });
    }
  }, []);

  const increment = useCallback((productId) => {
    const item = cartItems.current.find(item => item.product.id === productId);
    if (item && item.quantity < 9) item.quantity++;
  }, []);

  const decrement = useCallback((productId) => {
    const item = cartItems.current.find(item => item.product.id === productId);
    if (item && item.quantity > 1) item.quantity--;
  }, []);

  const clearCart = useCallback(() => {
    cartItems.current = [];
  }, []);

  const total = useMemo(() => 
    cartItems.current.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  , [cartItems.current]);

  return { addToCart, increment, decrement, clearCart, total };
}