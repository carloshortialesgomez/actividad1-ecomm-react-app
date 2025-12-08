import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </main>
          <div style={{
            background: "#2c3e50",
            color: "white",
            padding: "25px",
            textAlign: "center",
            marginTop: "auto",
            width: "100%"
          }}>
            <h3>TechStore Ecommerce</h3>
            <p>Proyecto React con carrito funcional</p>
            <p style={{ fontSize: "0.9rem", color: "#bdc3c7" }}>
              © 2024 - 8 productos • Buscador • Carrito
            </p>
          </div>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
