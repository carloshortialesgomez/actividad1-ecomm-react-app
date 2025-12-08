import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  
  // Agregar producto al carrito
  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { 
                ...item, 
                quantity: item.quantity + quantity,
                price: product.price || item.price
              }
            : item
        );
      } else {
        return [...prevItems, { 
          ...product, 
          quantity,
          price: product.price || 0
        }];
      }
    });
  };

  // Eliminar producto del carrito
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // ✅ NUEVA FUNCIÓN: Actualizar cantidad de un producto
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Calcular el total del carrito
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.price || 0;
      const quantity = item.quantity || 1;
      return total + (price * quantity);
    }, 0);
  };

  // Contar total de items en el carrito
  const getItemCount = () => {
    return cartItems.reduce((count, item) => count + (item.quantity || 1), 0);
  };

  // Vaciar el carrito completamente
  const clearCart = () => {
    setCartItems([]);
  };

  // Obtener un producto específico del carrito
  const getItem = (productId) => {
    return cartItems.find(item => item.id === productId);
  };

  // Valor que se provee a los componentes
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,  // ✅ EXPORTADA
    getCartTotal,
    getItemCount,
    clearCart,
    getItem
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};