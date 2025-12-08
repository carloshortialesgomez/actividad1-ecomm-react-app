import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartItems } = useCart();
  const [search, setSearch] = useState('');

  return (
    <nav style={{
      background: '#2c3e50',
      color: 'white',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>
        🛒 TechStore
      </Link>
      
      <input 
        type="text" 
        placeholder="Buscar productos..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ 
          padding: '8px 15px',
          borderRadius: '4px',
          border: 'none',
          width: '300px'
        }}
      />
      
      <div>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>
          Inicio
        </Link>
        <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>
          Carrito ({cartItems.length})
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
