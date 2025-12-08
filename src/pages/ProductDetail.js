import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import useProducts from '../hooks/useProducts';

const ProductDetail = () => {
  const { id } = useParams();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();
  
  const product = getProductById(id);

  if (!product) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>⚠️ Producto no encontrado</h2>
        <p>El producto que buscas no existe o ha sido removido.</p>
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
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '40px',
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
      }}>
        {/* COLUMNA IZQUIERDA - IMAGEN */}
        <div style={{ 
          flex: '1', 
          minWidth: '350px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '500px',
            height: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8f9fa',
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '20px',
            border: '1px solid #e0e0e0'
          }}>
            <img 
              src={product.image} 
              alt={product.name}
              style={{ 
                width: '100%', 
                height: '100%',
                objectFit: 'contain',
                padding: '20px'
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://via.placeholder.com/500x400/cccccc/666666?text=${encodeURIComponent(product.name)}`;
              }}
            />
          </div>
          
          <div style={{
            display: 'flex',
            gap: '10px',
            marginTop: '10px'
          }}>
            <span style={{
              padding: '5px 15px',
              backgroundColor: '#e8f4fc',
              color: '#3498db',
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: 'bold'
            }}>
              📁 {product.category}
            </span>
            <span style={{
              padding: '5px 15px',
              backgroundColor: '#f0f8ff',
              color: '#666',
              borderRadius: '20px',
              fontSize: '0.9rem'
            }}>
              🏷️ SKU: {product.sku}
            </span>
          </div>
        </div>
        
        {/* COLUMNA DERECHA - INFORMACIÓN */}
        <div style={{ 
          flex: '1', 
          minWidth: '350px',
          padding: '10px'
        }}>
          <h1 style={{ 
            margin: '0 0 15px 0', 
            color: '#2c3e50',
            fontSize: '2.2rem',
            lineHeight: '1.2'
          }}>
            {product.name}
          </h1>
          
          {/* PRECIO */}
          <div style={{ 
            backgroundColor: '#fff8e1', 
            padding: '20px', 
            borderRadius: '10px',
            margin: '25px 0',
            borderLeft: '5px solid #f39c12'
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              <span style={{ 
                fontSize: '3rem', 
                color: '#e74c3c', 
                fontWeight: 'bold' 
              }}>
                ${product.price.toFixed(2)}
              </span>
              <span style={{ 
                fontSize: '1.2rem', 
                color: '#666' 
              }}>
                MXN
              </span>
            </div>
            <p style={{ 
              color: '#27ae60', 
              margin: '8px 0 0 0',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              ✅ <strong>Precio final</strong> - Incluye IVA
            </p>
          </div>
          
          {/* BOTÓN AÑADIR AL CARRITO */}
          <button 
            onClick={() => {
              addToCart(product);
              alert(`✅ "${product.name}" agregado al carrito\nPrecio: $${product.price.toFixed(2)} MXN`);
            }}
            style={{
              background: 'linear-gradient(135deg, #3498db, #2980b9)',
              color: 'white',
              padding: '18px 35px',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '1.3rem',
              margin: '25px 0',
              width: '100%',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px rgba(52, 152, 219, 0.3)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 6px 12px rgba(52, 152, 219, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 6px rgba(52, 152, 219, 0.3)';
            }}
          >
            🛒 Añadir al carrito - ${product.price.toFixed(2)} MXN
          </button>
          
          {/* DESCRIPCIÓN */}
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '25px', 
            borderRadius: '10px',
            marginTop: '35px'
          }}>
            <h3 style={{ 
              margin: '0 0 15px 0', 
              color: '#2c3e50',
              fontSize: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              📋 <span>Descripción del Producto</span>
            </h3>
            <p style={{ 
              lineHeight: '1.6', 
              fontSize: '1.1rem',
              color: '#34495e',
              margin: 0
            }}>
              {product.description || `Este ${product.name} es un producto de alta calidad en la categoría ${product.category}. Perfecto para tus necesidades.`}
            </p>
            
            {/* CARACTERÍSTICAS */}
            <div style={{ marginTop: '25px' }}>
              <h4 style={{ 
                color: '#2c3e50', 
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                ✨ <span>Características principales</span>
              </h4>
              <ul style={{ 
                paddingLeft: '20px', 
                color: '#34495e',
                margin: 0
              }}>
                <li>Garantía de 1 año</li>
                <li>Envío gratis a todo México</li>
                <li>Devolución en 30 días</li>
                <li>Soporte técnico incluido</li>
                <li>Pago seguro con cualquier tarjeta</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;