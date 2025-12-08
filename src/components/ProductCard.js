import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div style={{
      border: '1px solid #e0e0e0',
      padding: '20px',
      borderRadius: '12px',
      margin: '10px',
      maxWidth: '320px',
      backgroundColor: 'white',
      boxShadow: '0 3px 10px rgba(0,0,0,0.08)',
      transition: 'all 0.3s ease',
      fontFamily: 'Arial, sans-serif'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 3px 10px rgba(0,0,0,0.08)';
    }}
    >
      {/* CONTENEDOR DE IMAGEN */}
      <div style={{
        width: '100%',
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        overflow: 'hidden',
        marginBottom: '15px',
        border: '1px solid #e8e8e8'
      }}>
        <img 
          src={product.image} 
          alt={product.name}
          style={{ 
            width: '100%', 
            height: '100%',
            objectFit: 'contain',
            padding: '15px'
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://via.placeholder.com/280x200/cccccc/666666?text=${encodeURIComponent(product.name)}`;
          }}
        />
      </div>
      
      <h3 style={{ 
        margin: '0 0 8px 0', 
        color: '#2c3e50',
        fontSize: '1.2rem',
        height: '55px',
        overflow: 'hidden',
        lineHeight: '1.3'
      }}>
        {product.name}
      </h3>
      
      {/* CATEGORÍA Y SKU */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
      }}>
        <span style={{
          backgroundColor: '#e8f4fc',
          color: '#3498db',
          padding: '4px 12px',
          borderRadius: '15px',
          fontSize: '0.8rem',
          fontWeight: 'bold'
        }}>
          {product.category}
        </span>
        
        <span style={{
          color: '#7f8c8d',
          fontSize: '0.8rem'
        }}>
          {product.sku}
        </span>
      </div>
      
      {/* PRECIO */}
      <div style={{ 
        textAlign: 'center', 
        margin: '15px 0',
        padding: '10px',
        backgroundColor: '#f9f9f9',
        borderRadius: '6px'
      }}>
        <p style={{
          color: '#e74c3c',
          fontWeight: 'bold',
          fontSize: '1.5rem',
          margin: '5px 0'
        }}>
          ${product.price.toFixed(2)} <span style={{ fontSize: '0.9rem', color: '#666' }}>MXN</span>
        </p>
      </div>
      
      {/* BOTONES */}
      <div style={{ 
        display: 'flex', 
        gap: '10px',
        marginTop: '20px'
      }}>
        <button 
          onClick={() => {
            addToCart(product);
            alert(`✅ "${product.name}" agregado al carrito\nPrecio: $${product.price.toFixed(2)} MXN`);
          }}
          style={{
            background: '#3498db',
            color: 'white',
            border: 'none',
            padding: '12px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            flex: 1,
            fontWeight: 'bold',
            fontSize: '0.95rem',
            transition: 'background 0.3s'
          }}
          onMouseOver={(e) => e.target.style.background = '#2980b9'}
          onMouseOut={(e) => e.target.style.background = '#3498db'}
        >
          🛒 ${product.price.toFixed(2)}
        </button>
        
        <Link 
          to={'/product/' + product.id}
          style={{ 
            flex: 1, 
            textDecoration: 'none' 
          }}
        >
          <button 
            style={{
              background: '#2ecc71',
              color: 'white',
              border: 'none',
              padding: '12px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              width: '100%',
              fontWeight: 'bold',
              fontSize: '0.95rem',
              transition: 'background 0.3s'
            }}
            onMouseOver={(e) => e.target.style.background = '#27ae60'}
            onMouseOut={(e) => e.target.style.background = '#2ecc71'}
          >
            👁️ Detalles
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;