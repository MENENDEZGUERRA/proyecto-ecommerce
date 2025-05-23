import { createContext, useMemo, useRef } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const cartItems = useRef([]);
  const history = useRef([]);
  
  const value = useMemo(() => ({
    // ...[AQUÍ YA VOY A PONER LA LÓGICO]
  }), [cartItems.current, history.current]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}