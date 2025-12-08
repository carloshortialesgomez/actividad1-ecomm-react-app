import React from 'react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { removeFromCart } = useCart();

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px',
      borderBottom: '1px solid #ddd'
    }}>
      <div>
        <h4>{item.name}</h4>
        <p> x {item.quantity}</p>
      </div>
      <div>
        <p>Total: </p>
        <button 
          onClick={() => removeFromCart(item.id)}
          style={{
            background: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default CartItem;
