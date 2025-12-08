import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '15px',
      borderRadius: '8px',
      margin: '10px',
      maxWidth: '300px',
      backgroundColor: 'white',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ 
        marginTop: 0, 
        marginBottom: '10px',
        color: '#2c3e50'
      }}>
        {product.name}
      </h3>
      
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '5px 10px',
        borderRadius: '4px',
        display: 'inline-block',
        marginBottom: '10px'
      }}>
        <span style={{
          color: '#3498db',
          fontSize: '0.9rem',
          fontWeight: 'bold'
        }}>
          {product.category}
        </span>
      </div>
      
      <div style={{ margin: '15px 0' }}>
        <p style={{
          color: '#7f8c8d',
          fontSize: '0.9rem',
          marginBottom: '5px'
        }}>
          SKU: {product.sku}
        </p>
        
        <p style={{
          color: '#e74c3c',
          fontWeight: 'bold',
          fontSize: '1.3rem',
          margin: '10px 0'
        }}>
          
        </p>
      </div>
      
      <div style={{ 
        display: 'flex', 
        gap: '10px',
        marginTop: '15px'
      }}>
        <button 
          onClick={() => addToCart(product)}
          style={{
            background: '#3498db',
            color: 'white',
            border: 'none',
            padding: '10px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            flex: 1,
            fontWeight: 'bold'
          }}
        >
          Añadir al carrito
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
              padding: '10px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              width: '100%',
              fontWeight: 'bold'
            }}
          >
            Ver detalles
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
