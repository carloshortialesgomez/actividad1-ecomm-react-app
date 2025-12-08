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
    return <div style={{ padding: '20px' }}><h2>Producto no encontrado</h2></div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{product.name}</h1>
      <p>Categoría: {product.category}</p>
      <p style={{ fontSize: '2rem', color: '#e74c3c', fontWeight: 'bold' }}>
        
      </p>
      
      <button 
        onClick={() => addToCart(product)}
        style={{
          background: '#3498db',
          color: 'white',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1.1rem',
          margin: '20px 0'
        }}
      >
        Añadir al carrito
      </button>
      
      <div style={{ marginTop: '30px' }}>
        <h3>Descripción</h3>
        <p>Producto de alta calidad con todas las características necesarias.</p>
      </div>
    </div>
  );
};

export default ProductDetail;
