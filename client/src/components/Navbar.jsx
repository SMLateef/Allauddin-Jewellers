import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, Heart, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = ({ onCartClick }) => {
  const { cartCount } = useCart(); // Access the live count from the context
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger scroll effect a bit earlier for a smoother transition
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ease-in-out ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-lg py-1 shadow-sm' 
        : 'bg-white py-3'
    }`}>
      {/* Main Wrapper */}
      <div className="relative max-w-[1600px] mx-auto h-16 md:h-20 flex items-center justify-between px-6 md:px-12">
        
        {/* Hook 1: Left Section (Menu & Search) */}
        <div className="flex items-center gap-4 md:gap-8 w-1/3">
          <button className="text-gray-900 hover:text-[#D4AF37] transition-all duration-300">
            <Menu size={22} strokeWidth={1.2} />
          </button>
          <button className="hidden sm:block text-gray-900 hover:text-[#D4AF37] transition-all duration-300">
            <Search size={20} strokeWidth={1.2} />
          </button>
        </div>

        {/* Hook 2: Center Section (Brand Logo) */}
        <Link 
          to="/" 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-max group"
        >
          <h1 className="font-serif text-xl sm:text-2xl md:text-3xl tracking-[0.2em] uppercase text-gray-900 leading-none transition-all duration-700 group-hover:tracking-[0.25em]">
            Allauddin 
            <span className="block text-[9px] md:text-[11px] tracking-[0.5em] mt-2 font-sans text-[#D4AF37] font-semibold uppercase">
              Jewellers
            </span>
          </h1>
        </Link>

        {/* Hook 3: Right Section (Icons) */}
        <div className="flex items-center justify-end gap-4 md:gap-8 w-1/3">
          <button className="hidden md:block text-gray-900 hover:text-[#D4AF37] transition-all duration-300">
            <User size={20} strokeWidth={1.2} />
          </button>
          <button className="hidden md:block text-gray-900 hover:text-[#D4AF37] transition-all duration-300">
            <Heart size={20} strokeWidth={1.2} />
          </button>
          
          {/* CART TRIGGER: Displays dynamic count from context */}
          <button 
            onClick={onCartClick}
            className="relative text-gray-900 hover:text-[#D4AF37] transition-all duration-300 focus:outline-none group"
          >
            <ShoppingBag size={21} strokeWidth={1.2} className="group-hover:scale-110 transition-transform" />
            
            {/* Dynamic Gold Badge: Only shows if items > 0 */}
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#D4AF37] text-white text-[8px] md:text-[9px] w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center font-bold animate-fade-in border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Luxury Border Hook: Scales width based on scroll */}
      <div className={`h-[1px] bg-[#D4AF37]/20 transition-all duration-1000 ease-in-out ${
        isScrolled ? 'w-full' : 'w-[90%] mx-auto'
      }`}></div>
    </nav>
  );
};

export default Navbar;