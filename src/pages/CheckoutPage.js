import React from 'react';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const { cartItems, getCartTotal } = useCart();

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Finalizar Compra</h1>
      
      <div style={{ margin: '20px 0' }}>
        <h3>Resumen del pedido:</h3>
        {cartItems.map(item => (
          <div key={item.id} style={{ margin: '10px 0' }}>
            <p>{item.name} x {item.quantity} - </p>
          </div>
        ))}
        
        <h3 style={{ marginTop: '20px' }}>
          Total: 
        </h3>
      </div>
      
      <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
        <h3>Información de envío</h3>
        <input type="text" placeholder="Nombre completo" style={{ width: '100%', padding: '10px', margin: '10px 0' }} />
        <input type="email" placeholder="Correo electrónico" style={{ width: '100%', padding: '10px', margin: '10px 0' }} />
        <input type="text" placeholder="Dirección" style={{ width: '100%', padding: '10px', margin: '10px 0' }} />
        
        <button style={{
          background: '#2ecc71',
          color: 'white',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1.1rem',
          width: '100%',
          marginTop: '20px'
        }}>
          Confirmar pedido
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
