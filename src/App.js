import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Catalogue from './Pages/Catalogue';
import Cart from './Pages/Cart';
import CheckoutPage from './Pages/CheckoutPage';
import NavbarComponent from './Component/NavbarComponent';
import Footer from './Component/Footer';
import './App.css';
import AllProductsPage from './Pages/AllProducts';
import ProductPage from './Pages/Product/ProductPage';
import ContactPage from './Pages/ContactPage';
import AboutPage from './Pages/AboutPage';
import LoginRegister from './Pages/LoginRegister';
import OrderHistory from './Pages/OrderHistory';
import UserProfile from './Pages/UserProfile';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './Component/ProtectedRoute';

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
     <AuthProvider>
       <CartProvider>
         <Router basename="/">
           {/* <Route
       r > */}
          <NavbarComponent toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
          <main className="container my-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<AllProductsPage />} />
              <Route path="/catalogue" element={<Catalogue />} />
              <Route path="/product/:slug" element={<ProductPage />} />
              <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
              <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
              <Route path="/order-history" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginRegister />} />
            </Routes>
          </main>
          <Footer />
        </Router>
       </CartProvider>
     </AuthProvider>
  );
};

export default App;