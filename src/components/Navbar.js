import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import useProducts from '../hooks/useProducts';

const Navbar = () => {
  const { cartItems, getItemCount } = useCart();
  const { products } = useProducts();
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Cerrar resultados al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Función de búsqueda mejorada
  const performSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsLoading(true);
    
    // Filtrar productos por nombre, SKU o descripción
    const filtered = products.filter(product => {
      const searchLower = searchTerm.toLowerCase();
      
      // Buscar en nombre
      if (product.name.toLowerCase().includes(searchLower)) return true;
      
      // Buscar en SKU (exacto o parcial)
      if (product.sku.toLowerCase().includes(searchLower)) return true;
      
      // Buscar en descripción si existe
      if (product.description && product.description.toLowerCase().includes(searchLower)) return true;
      
      // Buscar en categoría
      if (product.category.toLowerCase().includes(searchLower)) return true;
      
      return false;
    });

    // Ordenar resultados: primero coincidencias exactas en nombre, luego SKU, luego otros
    const sortedResults = filtered.sort((a, b) => {
      const searchLower = searchTerm.toLowerCase();
      
      // Puntuación para cada producto
      const scoreA = getSearchScore(a, searchLower);
      const scoreB = getSearchScore(b, searchLower);
      
      return scoreB - scoreA; // Orden descendente
    });

    setSearchResults(sortedResults.slice(0, 8)); // Mostrar máximo 8 resultados
    setShowResults(true);
    setIsLoading(false);
  };

  // Función para calcular puntuación de búsqueda
  const getSearchScore = (product, searchTerm) => {
    let score = 0;
    
    // Coincidencia exacta en nombre (máxima prioridad)
    if (product.name.toLowerCase() === searchTerm) score += 100;
    
    // Coincidencia parcial en nombre
    if (product.name.toLowerCase().includes(searchTerm)) {
      score += 50;
      // Bonus si la coincidencia está al inicio del nombre
      if (product.name.toLowerCase().startsWith(searchTerm)) score += 20;
    }
    
    // Coincidencia exacta en SKU
    if (product.sku.toLowerCase() === searchTerm) score += 80;
    
    // Coincidencia parcial en SKU
    if (product.sku.toLowerCase().includes(searchTerm)) score += 40;
    
    // Coincidencia en descripción
    if (product.description && product.description.toLowerCase().includes(searchTerm)) score += 10;
    
    // Coincidencia en categoría
    if (product.category.toLowerCase().includes(searchTerm)) score += 5;
    
    return score;
  };

  // Manejar cambio en el buscador con debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(search);
    }, 300); // Debounce de 300ms

    return () => clearTimeout(timer);
  }, [search]);

  // Manejar selección de producto
  const handleProductSelect = (productId) => {
    navigate(`/product/${productId}`);
    setSearch('');
    setShowResults(false);
  };

  // Manejar búsqueda con Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      if (searchResults.length > 0) {
        handleProductSelect(searchResults[0].id);
      }
      e.preventDefault();
    }
  };

  // Manejar envío del formulario
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim() && searchResults.length > 0) {
      handleProductSelect(searchResults[0].id);
    }
  };

  return (
    <nav style={{
      background: '#2c3e50',
      color: 'white',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      {/* LOGO */}
      <Link to="/" style={{ 
        color: 'white', 
        textDecoration: 'none', 
        fontSize: '1.5rem', 
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <span style={{ fontSize: '1.8rem' }}>🛍️</span>
        <span>TechStore</span>
      </Link>
      
      {/* BUSCADOR */}
      <div ref={searchRef} style={{ position: 'relative', flex: 1, maxWidth: '500px', margin: '0 30px' }}>
        <form onSubmit={handleSearchSubmit}>
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Buscar por nombre, SKU o descripción..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => search && setShowResults(true)}
              onKeyPress={handleKeyPress}
              style={{ 
                padding: '12px 45px 12px 15px',
                borderRadius: '25px',
                border: 'none',
                width: '100%',
                fontSize: '1rem',
                backgroundColor: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease'
              }}
            />
            
            {/* Ícono de búsqueda */}
            <button 
              type="submit"
              style={{
                position: 'absolute',
                right: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.2rem',
                color: '#666'
              }}
            >
              🔍
            </button>
            
            {/* Loading indicator */}
            {isLoading && (
              <div style={{
                position: 'absolute',
                right: '45px',
                top: '50%',
                transform: 'translateY(-50%)'
              }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid #f3f3f3',
                  borderTop: '2px solid #3498db',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
              </div>
            )}
          </div>
        </form>
        
        {/* RESULTADOS DE BÚSQUEDA */}
        {showResults && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.15)',
            zIndex: 1000,
            marginTop: '8px',
            maxHeight: '400px',
            overflowY: 'auto',
            border: '1px solid #e0e0e0'
          }}>
            {/* Encabezado */}
            <div style={{
              padding: '12px 15px',
              borderBottom: '2px solid #f8f9fa',
              backgroundColor: '#f8f9fa',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ 
                color: '#2c3e50', 
                fontWeight: 'bold',
                fontSize: '0.9rem'
              }}>
                Resultados de búsqueda
              </span>
              <span style={{ 
                color: '#666', 
                fontSize: '0.8rem',
                backgroundColor: '#e8f4fc',
                padding: '2px 8px',
                borderRadius: '10px'
              }}>
                {searchResults.length} encontrados
              </span>
            </div>
            
            {/* Lista de resultados */}
            {searchResults.length > 0 ? (
              searchResults.map(product => (
                <div
                  key={product.id}
                  onClick={() => handleProductSelect(product.id)}
                  style={{
                    padding: '15px',
                    borderBottom: '1px solid #f0f0f0',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  {/* Imagen del producto */}
                  <div style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    flexShrink: 0
                  }}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      style={{ 
                        width: '100%', 
                        height: '100%',
                        objectFit: 'contain',
                        padding: '5px'
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://via.placeholder.com/50x50/cccccc/666666?text=${encodeURIComponent(product.name.substring(0, 2))}`;
                      }}
                    />
                  </div>
                  
                  {/* Información del producto */}
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      fontWeight: 'bold', 
                      color: '#2c3e50',
                      marginBottom: '4px',
                      fontSize: '1rem'
                    }}>
                      {product.name}
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      gap: '15px',
                      fontSize: '0.85rem',
                      color: '#666'
                    }}>
                      <span style={{ 
                        backgroundColor: '#e8f4fc',
                        color: '#3498db',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        fontWeight: 'bold'
                      }}>
                        {product.sku}
                      </span>
                      <span style={{ 
                        backgroundColor: '#f0f8ff',
                        color: '#666',
                        padding: '2px 8px',
                        borderRadius: '10px'
                      }}>
                        {product.category}
                      </span>
                    </div>
                    <div style={{ 
                      color: '#e74c3c', 
                      fontWeight: 'bold',
                      marginTop: '6px',
                      fontSize: '1.1rem'
                    }}>
                      ${product.price.toFixed(2)}
                    </div>
                  </div>
                  
                  {/* Flecha */}
                  <span style={{ 
                    color: '#3498db', 
                    fontSize: '1.2rem',
                    opacity: 0.7
                  }}>
                    →
                  </span>
                </div>
              ))
            ) : search.trim() ? (
              // Sin resultados
              <div style={{ 
                padding: '30px 20px', 
                textAlign: 'center',
                color: '#666'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🔍</div>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                  No se encontraron productos
                </div>
                <div style={{ fontSize: '0.9rem' }}>
                  No hay resultados para "<strong>{search}</strong>"
                </div>
                <div style={{ 
                  fontSize: '0.8rem', 
                  color: '#999',
                  marginTop: '10px'
                }}>
                  Intenta con otras palabras o SKU
                </div>
              </div>
            ) : null}
            
            {/* Footer de resultados */}
            {searchResults.length > 0 && (
              <div style={{
                padding: '10px 15px',
                borderTop: '1px solid #f0f0f0',
                backgroundColor: '#f8f9fa',
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px',
                textAlign: 'center',
                fontSize: '0.8rem',
                color: '#666'
              }}>
                <span>Presiona </span>
                <span style={{ 
                  backgroundColor: '#e0e0e0',
                  padding: '1px 6px',
                  borderRadius: '3px',
                  fontWeight: 'bold',
                  margin: '0 2px'
                }}>
                  Enter
                </span>
                <span> para seleccionar el primero</span>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* NAVEGACIÓN */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
        <Link to="/" style={{ 
          color: 'white', 
          textDecoration: 'none',
          fontSize: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 15px',
          borderRadius: '5px',
          transition: 'background 0.3s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <span style={{ fontSize: '1.2rem' }}>🏠</span>
          <span>Inicio</span>
        </Link>
        
        <Link to="/cart" style={{ 
          color: 'white', 
          textDecoration: 'none',
          fontSize: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 15px',
          borderRadius: '5px',
          transition: 'background 0.3s',
          position: 'relative'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <span style={{ fontSize: '1.3rem' }}>🛒</span>
          <span>Carrito</span>
          
          {/* Badge de cantidad */}
          {getItemCount() > 0 && (
            <span style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              backgroundColor: '#e74c3c',
              color: 'white',
              borderRadius: '50%',
              minWidth: '22px',
              height: '22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              padding: '0 5px'
            }}>
              {getItemCount()}
            </span>
          )}
        </Link>
      </div>

      {/* Estilos CSS para animación de loading */}
      <style>
        {`
          @keyframes spin {
            0% { transform: translateY(-50%) rotate(0deg); }
            100% { transform: translateY(-50%) rotate(360deg); }
          }
          
          /* Scrollbar personalizada para resultados */
          div::-webkit-scrollbar {
            width: 8px;
          }
          div::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 0 10px 10px 0;
          }
          div::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 4px;
          }
          div::-webkit-scrollbar-thumb:hover {
            background: #a8a8a8;
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;