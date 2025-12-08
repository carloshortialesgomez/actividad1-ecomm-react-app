import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ProductDetail from './pages/ProductDetail';
import CheckoutPage from './pages/CheckoutPage';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content" style={{ minHeight: 'calc(100vh - 80px)', padding: '20px' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="*" element={<NotFoundPage />} /> {/* Página 404 */}
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

// Página 404 simple
const NotFoundPage = () => (
  <div style={{ 
    padding: '60px 20px', 
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 auto'
  }}>
    <h1 style={{ color: '#2c3e50', fontSize: '4rem', marginBottom: '20px' }}>404</h1>
    <h2 style={{ color: '#7f8c8d', marginBottom: '20px' }}>Página no encontrada</h2>
    <p style={{ color: '#95a5a6', marginBottom: '30px' }}>
      La página que buscas no existe o ha sido movida.
    </p>
    <a href="/" style={{
      background: '#3498db',
      color: 'white',
      padding: '12px 24px',
      textDecoration: 'none',
      borderRadius: '5px',
      display: 'inline-block'
    }}>
      Volver al inicio
    </a>
  </div>
);

export default App;