import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

const CartPage = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div style={{ 
        padding: '60px 20px', 
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <div style={{
          fontSize: '4rem',
          marginBottom: '20px',
          color: '#ddd'
        }}>
          🛒
        </div>
        <h2 style={{ 
          color: '#2c3e50', 
          marginBottom: '15px'
        }}>
          Tu carrito está vacío
        </h2>
        <p style={{ 
          color: '#7f8c8d', 
          marginBottom: '30px',
          fontSize: '1.1rem'
        }}>
          Agrega algunos productos desde nuestra tienda
        </p>
        <Link to="/">
          <button style={{
            background: 'linear-gradient(135deg, #3498db, #2980b9)',
            color: 'white',
            padding: '15px 35px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            transition: 'transform 0.3s'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            ← Volver a la tienda
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '30px', 
      maxWidth: '1200px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ 
        color: '#2c3e50', 
        marginBottom: '10px',
        fontSize: '2.2rem'
      }}>
        🛒 Tu Carrito de Compras
      </h1>
      <p style={{ 
        color: '#7f8c8d', 
        marginBottom: '30px',
        fontSize: '1.1rem'
      }}>
        {cartItems.length} producto{cartItems.length > 1 ? 's' : ''} en el carrito
      </p>
      
      {/* ENCABEZADO DE LA TABLA */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '15px 20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        marginBottom: '15px',
        fontWeight: 'bold',
        color: '#2c3e50',
        borderBottom: '2px solid #e0e0e0'
      }}>
        <div style={{ flex: 3 }}>Producto</div>
        <div style={{ flex: 2, textAlign: 'center' }}>Cantidad</div>
        <div style={{ flex: 1, textAlign: 'center' }}>Precio Unitario</div>
        <div style={{ flex: 1, textAlign: 'center' }}>Subtotal</div>
        <div style={{ flex: 0.5, textAlign: 'center' }}>Acciones</div>
      </div>
      
      {/* LISTA DE PRODUCTOS */}
      <div style={{ marginBottom: '30px' }}>
        {cartItems.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      
      {/* RESUMEN Y TOTAL */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '30px',
        flexWrap: 'wrap'
      }}>
        {/* BOTONES DE ACCIÓN */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '25px', 
            borderRadius: '10px'
          }}>
            <h3 style={{ 
              color: '#2c3e50', 
              marginBottom: '20px',
              fontSize: '1.3rem'
            }}>
              Opciones del carrito
            </h3>
            
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Link to="/" style={{ textDecoration: 'none', flex: 1 }}>
                <button style={{
                  background: '#95a5a6',
                  color: 'white',
                  padding: '15px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  width: '100%',
                  fontWeight: 'bold',
                  transition: 'background 0.3s'
                }}
                onMouseOver={(e) => e.target.style.background = '#7f8c8d'}
                onMouseOut={(e) => e.target.style.background = '#95a5a6'}
                >
                  ← Seguir comprando
                </button>
              </Link>
              
              <button 
                onClick={() => {
                  if (window.confirm('¿Vaciar todo el carrito?')) {
                    clearCart();
                  }
                }}
                style={{
                  background: '#e74c3c',
                  color: 'white',
                  padding: '15px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  flex: 1,
                  fontWeight: 'bold',
                  transition: 'background 0.3s'
                }}
                onMouseOver={(e) => e.target.style.background = '#c0392b'}
                onMouseOut={(e) => e.target.style.background = '#e74c3c'}
              >
                🗑️ Vaciar carrito
              </button>
            </div>
          </div>
        </div>
        
        {/* RESUMEN DEL TOTAL */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <div style={{ 
            backgroundColor: '#e8f4fc', 
            padding: '30px', 
            borderRadius: '10px',
            border: '2px solid #3498db'
          }}>
            <h3 style={{ 
              color: '#2c3e50', 
              marginBottom: '25px',
              fontSize: '1.5rem'
            }}>
              Resumen del pedido
            </h3>
            
            <div style={{ marginBottom: '20px' }}>
              {cartItems.map(item => (
                <div key={item.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                  paddingBottom: '10px',
                  borderBottom: '1px dashed #ccc'
                }}>
                  <span style={{ color: '#666', fontSize: '0.95rem' }}>
                    {item.name} x{item.quantity}
                  </span>
                  <span style={{ fontWeight: 'bold', color: '#2c3e50' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            
            <div style={{ 
              borderTop: '2px solid #3498db', 
              paddingTop: '20px',
              marginTop: '20px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px'
              }}>
                <span style={{ 
                  fontSize: '1.3rem', 
                  color: '#2c3e50',
                  fontWeight: 'bold'
                }}>
                  Total a pagar:
                </span>
                <span style={{ 
                  fontSize: '2.5rem', 
                  color: '#e74c3c', 
                  fontWeight: 'bold'
                }}>
                  ${getCartTotal().toFixed(2)}
                  <span style={{ 
                    fontSize: '1rem', 
                    color: '#666',
                    marginLeft: '5px'
                  }}>
                    MXN
                  </span>
                </span>
              </div>
              
              <Link to="/checkout" style={{ textDecoration: 'none', display: 'block' }}>
                <button style={{
                  background: 'linear-gradient(135deg, #2ecc71, #27ae60)',
                  color: 'white',
                  padding: '18px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  width: '100%',
                  fontWeight: 'bold',
                  marginTop: '10px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 6px rgba(46, 204, 113, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 12px rgba(46, 204, 113, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 6px rgba(46, 204, 113, 0.3)';
                }}
                >
                  ✅ Proceder al pago (${getCartTotal().toFixed(2)})
                </button>
              </Link>
              
              <p style={{ 
                textAlign: 'center', 
                marginTop: '15px', 
                color: '#27ae60',
                fontSize: '0.9rem'
              }}>
                💰 Pago seguro • Envío gratis • Garantía incluida
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;