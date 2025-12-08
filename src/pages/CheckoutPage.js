import React from 'react';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const { cartItems, getCartTotal } = useCart();

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#2c3e50' }}>Finalizar Compra</h1>
      
      <div style={{ 
        background: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '8px',
        margin: '20px 0'
      }}>
        <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>📋 Resumen del pedido:</h3>
        {cartItems.map(item => (
          <div key={item.id} style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            margin: '10px 0',
            padding: '10px',
            backgroundColor: 'white',
            borderRadius: '5px'
          }}>
            <div>
              <p style={{ margin: '0', fontWeight: 'bold' }}>{item.name}</p>
              <p style={{ margin: '0', fontSize: '0.9rem', color: '#666' }}>
                x{item.quantity} @ ${item.price.toFixed(2)} c/u
              </p>
            </div>
            <div>
              <p style={{ margin: '0', fontWeight: 'bold', color: '#27ae60' }}>
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
        
        <div style={{ 
          borderTop: '2px solid #ddd', 
          marginTop: '20px', 
          paddingTop: '20px',
          textAlign: 'right'
        }}>
          <h3 style={{ margin: '0', color: '#2c3e50' }}>
            Total a pagar: <span style={{ color: '#e74c3c', fontSize: '1.5em' }}>
              ${getCartTotal().toFixed(2)} MXN
            </span>
          </h3>
        </div>
      </div>
      
      <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
        <h3 style={{ color: '#2c3e50' }}>📦 Información de envío</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nombre completo</label>
          <input type="text" placeholder="Ej: Juan Pérez" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Correo electrónico</label>
          <input type="email" placeholder="ejemplo@correo.com" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Dirección de envío</label>
          <textarea placeholder="Calle, número, colonia, ciudad, código postal" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', height: '80px' }} />
        </div>
        
        <button style={{
          background: '#2ecc71',
          color: 'white',
          padding: '15px 30px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1.2rem',
          width: '100%',
          marginTop: '20px',
          fontWeight: 'bold',
          transition: 'background 0.3s'
        }}
        onMouseOver={(e) => e.target.style.background = '#27ae60'}
        onMouseOut={(e) => e.target.style.background = '#2ecc71'}
        >
          ✅ Confirmar pedido por ${getCartTotal().toFixed(2)} MXN
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;