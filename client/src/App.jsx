import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Login from './pages/login'; // New: Authorization Entrance
import AdminDashboard from './pages/AdminDashboard';

// Components
import Navbar from './components/Navbar';
import CartSidebar from './components/CartSidebar';
import Footer from './components/footer'; 

/**
 * --- PROTECTED ROUTE COMPONENT ---
 * Only allows access to the dashboard if a token exists in LocalStorage
 */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(item => item._id === product._id);
      if (exists) return prev; 
      return [...prev, product];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item._id !== productId));
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white font-sans selection:bg-[#D4AF37] selection:text-white">
        
        <Navbar onCartClick={openCart} cartCount={cartItems.length} />
        
        <CartSidebar 
          isOpen={isCartOpen} 
          onClose={closeCart} 
          items={cartItems} 
          onRemove={removeFromCart}
        />
        
        <main className="flex-grow">
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={<ProductListing onAddToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetail onAddToCart={addToCart} />} />
            <Route path="/checkout" element={<Checkout items={cartItems} />} />
            
            {/* AUTHENTICATION */}
            <Route path="/login" element={<Login />} />
            
            {/* SECURE ROUTES - Only accessible via Login */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>

        <Footer />
        
      </div>
    </Router>
  );
}

export default App;