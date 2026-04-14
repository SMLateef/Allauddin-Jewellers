import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// FIX: Added curly braces { } around CartProvider
import { CartProvider } from './context/CartContext'

// This finds the <div id="root"></div> in your index.html 
// and injects your entire Luxury Jewelry App into it.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrapping App in the Provider allows the shopping bag to work site-wide */}
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
)