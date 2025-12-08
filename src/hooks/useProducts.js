import { useState } from 'react';

const useProducts = () => {
  const [products] = useState([
    { 
      id: 1, 
      name: 'Laptop Gamer Pro', 
      price: 1299.99, 
      category: 'Electrónica', 
      sku: 'LT-001',
      image: '/images/products/Laptoppro.jpg',
      description: 'Laptop gaming de alto rendimiento con procesador i9 y RTX 4070'
    },
    { 
      id: 2, 
      name: 'Smartphone Ultra', 
      price: 899.99, 
      category: 'Electrónica', 
      sku: 'SP-002',
      image: '/images/products/smartphone.jpg',
      description: 'Smartphone con cámara de 108MP, 5G y pantalla AMOLED'
    },
    { 
      id: 3, 
      name: 'Auriculares Bluetooth', 
      price: 199.99, 
      category: 'Audio', 
      sku: 'AU-003',
      image: '/images/products/auriculares.jpg',
      description: 'Auriculares inalámbricos con cancelación activa de ruido'
    },
    { 
      id: 4, 
      name: 'Smartwatch Pro', 
      price: 299.99, 
      category: 'Wearables', 
      sku: 'SW-004',
      image: '/images/products/smartwathc.jpg',
      description: 'Reloj inteligente con monitoreo de salud y GPS integrado'
    },
    { 
      id: 5, 
      name: 'Tablet Deluxe', 
      price: 599.99, 
      category: 'Electrónica', 
      sku: 'TB-005',
      image: '/images/products/tablet.jpg',
      description: 'Tablet con pantalla 2K, lápiz digital y 8GB de RAM'
    },
    { 
      id: 6, 
      name: 'Cámara Mirrorless', 
      price: 1099.99, 
      category: 'Fotografía', 
      sku: 'CM-006',
      image: '/images/products/camara.jpg',
      description: 'Cámara profesional mirrorless con sensor full frame'
    },
    { 
      id: 7, 
      name: 'Altavoz Inteligente', 
      price: 129.99, 
      category: 'Audio', 
      sku: 'AS-007',
      image: '/images/products/altavoz.jpg',
      description: 'Altavoz inteligente con asistente de voz y sonido 360°'
    },
    { 
      id: 8, 
      name: 'Monitor 4K', 
      price: 499.99, 
      category: 'Computación', 
      sku: 'MN-008',
      image: '/images/products/monitor.jpg',
      description: 'Monitor gaming 4K de 27" con 144Hz y HDR'
    }
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