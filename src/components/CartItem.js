import React from 'react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px',
      borderBottom: '1px solid #e0e0e0',
      backgroundColor: 'white',
      marginBottom: '15px',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    }}>
      {/* INFORMACIÓN DEL PRODUCTO */}
      <div style={{ flex: 3, display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div style={{
          width: '80px',
          height: '80px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          <img 
            src={item.image} 
            alt={item.name}
            style={{ 
              width: '100%', 
              height: '100%',
              objectFit: 'contain',
              padding: '8px'
            }}
          />
        </div>
        
        <div>
          <h4 style={{ 
            margin: '0 0 5px 0', 
            color: '#2c3e50',
            fontSize: '1.1rem'
          }}>
            {item.name}
          </h4>
          <p style={{ 
            margin: '0', 
            color: '#7f8c8d', 
            fontSize: '0.9rem'
          }}>
            {item.category} | SKU: {item.sku}
          </p>
        </div>
      </div>
      
      {/* CONTROLES DE CANTIDAD */}
      <div style={{ flex: 2, textAlign: 'center' }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center',
          border: '1px solid #ddd',
          borderRadius: '6px',
          overflow: 'hidden'
        }}>
          <button 
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            style={{
              background: '#f8f9fa',
              color: '#666',
              border: 'none',
              padding: '8px 12px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
          >
            −
          </button>
          
          <span style={{ 
            padding: '8px 15px', 
            minWidth: '40px',
            fontWeight: 'bold',
            backgroundColor: 'white'
          }}>
            {item.quantity}
          </span>
          
          <button 
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            style={{
              background: '#f8f9fa',
              color: '#666',
              border: 'none',
              padding: '8px 12px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
          >
            +
          </button>
        </div>
      </div>
      
      {/* PRECIO UNITARIO */}
      <div style={{ flex: 1, textAlign: 'center' }}>
        <p style={{ 
          margin: '0 0 5px 0', 
          color: '#666',
          fontSize: '0.9rem'
        }}>
          Precio c/u
        </p>
        <p style={{ 
          margin: '0', 
          color: '#e74c3c', 
          fontWeight: 'bold',
          fontSize: '1.1rem'
        }}>
          ${item.price ? item.price.toFixed(2) : '0.00'}
        </p>
      </div>
      
      {/* SUBTOTAL */}
      <div style={{ flex: 1, textAlign: 'center' }}>
        <p style={{ 
          margin: '0 0 5px 0', 
          color: '#666',
          fontSize: '0.9rem'
        }}>
          Subtotal
        </p>
        <p style={{ 
          margin: '0', 
          color: '#27ae60', 
          fontWeight: 'bold',
          fontSize: '1.2rem'
        }}>
          ${item.price ? (item.price * item.quantity).toFixed(2) : '0.00'}
        </p>
      </div>
      
      {/* BOTÓN ELIMINAR */}
      <div style={{ flex: 0.5, textAlign: 'right' }}>
        <button 
          onClick={() => {
            if (window.confirm(`¿Eliminar "${item.name}" del carrito?`)) {
              removeFromCart(item.id);
            }
          }}
          style={{
            background: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '8px 15px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            transition: 'background 0.3s'
          }}
          onMouseOver={(e) => e.target.style.background = '#c0392b'}
          onMouseOut={(e) => e.target.style.background = '#e74c3c'}
        >
          ❌ Eliminar
        </button>
      </div>
    </div>
  );
};

export default CartItem;