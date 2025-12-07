// Criterio: Utilidad para imágenes de placeholder
export const getPlaceholderImage = (productName) => {
  const imageMap = {
    'laptop': 'https://via.placeholder.com/400x300/3498db/ffffff?text=Laptop',
    'phone': 'https://via.placeholder.com/400x300/2ecc71/ffffff?text=Smartphone',
    'headphones': 'https://via.placeholder.com/400x300/e74c3c/ffffff?text=Auriculares',
    'smartwatch': 'https://via.placeholder.com/400x300/9b59b6/ffffff?text=Smartwatch',
    'tablet': 'https://via.placeholder.com/400x300/34495e/ffffff?text=Tablet',
    'camera': 'https://via.placeholder.com/400x300/f39c12/ffffff?text=Cámara',
    'speaker': 'https://via.placeholder.com/400x300/1abc9c/ffffff?text=Altavoz',
    'monitor': 'https://via.placeholder.com/400x300/95a5a6/ffffff?text=Monitor'
  };

  const key = productName.toLowerCase();
  for (const [imgKey, imgUrl] of Object.entries(imageMap)) {
    if (key.includes(imgKey)) {
      return imgUrl;
    }
  }
  
  return 'https://via.placeholder.com/400x300/7f8c8d/ffffff?text=Producto';
};