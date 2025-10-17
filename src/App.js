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
    // <Router basename="/salenestore">
       <Router >
      <NavbarComponent toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <main className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<AllProductsPage />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginRegister />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;