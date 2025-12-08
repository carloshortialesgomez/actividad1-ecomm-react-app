import { useState } from 'react';

const useProducts = () => {
  const [products] = useState([
    { id: 1, name: 'Laptop Gamer Pro', price: 1299.99, category: 'Electrónica', sku: 'LT-001' },
    { id: 2, name: 'Smartphone Ultra', price: 899.99, category: 'Electrónica', sku: 'SP-002' },
    { id: 3, name: 'Auriculares Bluetooth', price: 199.99, category: 'Audio', sku: 'AU-003' },
    { id: 4, name: 'Smartwatch Pro', price: 299.99, category: 'Wearables', sku: 'SW-004' },
    { id: 5, name: 'Tablet Deluxe', price: 599.99, category: 'Electrónica', sku: 'TB-005' },
    { id: 6, name: 'Cámara Mirrorless', price: 1099.99, category: 'Fotografía', sku: 'CM-006' },
    { id: 7, name: 'Altavoz Inteligente', price: 129.99, category: 'Audio', sku: 'AS-007' },
    { id: 8, name: 'Monitor 4K', price: 499.99, category: 'Computación', sku: 'MN-008' }
  ]);

  const getProductById = (id) => {
    return products.find(p => p.id === parseInt(id));
  };

  const getProductsByCategory = (category) => {
    return products.filter(p => p.category === category);
  };

  return {
    products,
    getProductById,
    getProductsByCategory
  };
};

export default useProducts;
