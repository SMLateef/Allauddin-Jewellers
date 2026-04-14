import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartSidebar = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, addToCart, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <>
      {/* 1. DARK OVERLAY - Only visible when isOpen is true */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* 2. SIDEBAR PANEL - Uses transform to slide out of view */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[1000] shadow-[ -10px_0_50px_rgba(0,0,0,0.1)] transform transition-transform duration-500 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          
          {/* Header */}
          <div className="flex items-center justify-between p-8 border-b border-gray-100">
            <h2 className="font-serif text-2xl tracking-tight text-gray-900 uppercase">Your Selection</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-[#D4AF37] transition-all">
              <X size={24} strokeWidth={1} />
            </button>
          </div>

          {/* Dynamic Item List */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
            {cartItems.length > 0 ? cartItems.map((item) => (
              <div key={item.id} className="flex gap-6 animate-fade-in">
                <div className="w-24 h-32 bg-gray-50 flex-shrink-0">
                  <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-serif text-sm uppercase tracking-widest text-gray-800">{item.name}</h3>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-400">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <p className="text-[10px] text-[#D4AF37] uppercase tracking-[0.2em] mt-2 font-bold">{item.material}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center border border-gray-100 rounded-full px-3 py-1 gap-4 bg-gray-50">
                      <button onClick={() => {/* logic */}} className="text-gray-400"><Minus size={12} /></button>
                      <span className="text-[11px] font-medium">{item.quantity}</span>
                      <button onClick={() => addToCart(item)} className="text-gray-400"><Plus size={12} /></button>
                    </div>
                    <p className="text-sm font-light tracking-wider">${(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )) : (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <ShoppingBag size={48} strokeWidth={0.5} className="mb-6 text-gray-200" />
                <p className="uppercase tracking-[0.3em] text-[10px] text-gray-400">Your bag is currently empty</p>
                <button onClick={onClose} className="mt-8 text-[10px] text-[#D4AF37] border-b border-[#D4AF37] pb-1 uppercase tracking-widest">
                  Continue Browsing
                </button>
              </div>
            )}
          </div>

          {/* Checkout Footer */}
          {cartItems.length > 0 && (
            <div className="p-8 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between mb-8">
                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-medium">Subtotal</span>
                <span className="font-serif text-2xl text-gray-900">${cartTotal.toLocaleString()}</span>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-black text-white py-6 uppercase tracking-[0.4em] text-[10px] font-bold hover:bg-[#D4AF37] transition-all"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;