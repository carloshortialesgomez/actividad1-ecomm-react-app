// Criterio: Punto de entrada de la aplicación React
// Este archivo renderiza la aplicación en el DOM
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import App from './App.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);