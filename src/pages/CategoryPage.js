import React from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import useProducts from '../hooks/useProducts';

const CategoryPage = () => {
  const { category } = useParams();
  const { getProductsByCategory } = useProducts();
  
  const products = getProductsByCategory(category);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Categoría: {category}</h1>
      <p>{products.length} productos encontrados</p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
