import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Tu carrito está vacío</h2>
        <Link to="/">
          <button style={{
            background: '#3498db',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px'
          }}>
            Continuar comprando
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#2c3e50' }}>Mi Carrito</h1>
      
      <div style={{ margin: '20px 0' }}>
        {cartItems.map(item => (
          <div key={item.id} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '15px',
            borderBottom: '1px solid #ddd',
            backgroundColor: 'white',
            borderRadius: '5px',
            marginBottom: '10px'
          }}>
            <div>
              <h4 style={{ margin: 0 }}>{item.name}</h4>
              <p style={{ margin: '5px 0', color: '#7f8c8d' }}>
                 x {item.quantity}
              </p>
            </div>
            <div>
              <p style={{ fontWeight: 'bold', color: '#e74c3c' }}>
                Total: 
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{
        background: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <h3>Resumen del pedido</h3>
        <p>Productos en carrito: {cartItems.length}</p>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#e74c3c' }}>
          Total: 
        </p>
        
        <Link to="/checkout">
          <button style={{
            background: '#2ecc71',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1.1rem',
            marginTop: '20px',
            width: '100%'
          }}>
            Proceder al pago
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
