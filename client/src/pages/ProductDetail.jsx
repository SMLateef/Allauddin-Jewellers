import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ShoppingBag, ShieldCheck, Truck, Star, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';

// Ensure this matches your DUMMY_PRODUCTS in ProductListing.jsx
const DUMMY_PRODUCTS = [
  { id: 1, name: 'Solitaire Diamond Ring', price: 1500, material: '18k Gold', category: 'Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3f4ad?auto=format&fit=crop&q=80' },
  { id: 2, name: 'Tennis Bracelet', price: 4200, material: 'Diamond', category: 'Bracelets', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80' },
  { id: 3, name: 'Eternal Gold Necklace', price: 850, material: '24k Gold', category: 'Necklaces', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80' },
  { id: 4, name: 'Sapphire Studs', price: 1200, material: 'Sterling Silver', category: 'Earrings', image: 'https://images.unsplash.com/photo-1635767790474-ca27e1fe3d69?auto=format&fit=crop&q=80' },
];

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  // Find the piece using the ID from the URL
  const product = DUMMY_PRODUCTS.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white">
        <p className="font-serif text-xl tracking-widest text-gray-400 uppercase">Masterpiece Not Found</p>
        <Link to="/" className="mt-8 text-[10px] uppercase tracking-[0.4em] border-b border-black pb-1">Return to Vault</Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 bg-white min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Navigation Link */}
        <Link to="/" className="inline-flex items-center gap-3 text-gray-400 hover:text-black transition-all mb-16 group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] uppercase tracking-[0.4em]">Back to Collection</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 xl:gap-32 items-start">
          
          {/* Left: High-Impact Image Container */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="aspect-[4/5] bg-gray-50 overflow-hidden border border-gray-100 group shadow-sm"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" 
            />
          </motion.div>

          {/* Right: Bespoke Details Content */}
          <div className="flex flex-col">
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-8">
                <span className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] font-bold">
                  The Heritage Selection
                </span>
                <div className="h-[1px] w-8 bg-[#D4AF37]/30"></div>
              </div>

              <h1 className="font-serif text-5xl md:text-7xl text-gray-900 mb-6 tracking-tighter leading-[0.9]">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-6 mb-12">
                <p className="text-3xl font-light text-gray-400 tracking-tight">
                  ${product.price.toLocaleString()}
                </p>
                <div className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-full flex items-center gap-2">
                  <Star size={10} className="text-[#D4AF37]" fill="currentColor" />
                  <span className="text-[8px] uppercase tracking-widest font-bold text-gray-500">Certified Authentic</span>
                </div>
              </div>

              <div className="h-[1px] bg-gray-100 w-full mb-12"></div>

              <div className="space-y-6 mb-12">
                <p className="text-gray-500 leading-relaxed font-light tracking-wide italic">
                  Crafted in {product.material}, this piece represents the pinnacle of 1995 artistry. 
                  Every stone is ethically sourced and hand-set to capture light from every conceivable angle.
                </p>
                <div className="flex items-start gap-3 text-gray-400">
                  <Info size={14} className="mt-1" />
                  <p className="text-[10px] leading-relaxed uppercase tracking-widest">
                    Complimentary sizing and personalization available upon request.
                  </p>
                </div>
              </div>

              {/* The Action Button */}
              <button 
                onClick={() => addToCart(product)}
                className="w-full bg-black text-white py-6 uppercase tracking-[0.4em] text-[10px] font-bold hover:bg-[#D4AF37] transition-all duration-700 shadow-2xl active:scale-95 flex items-center justify-center gap-4 group"
              >
                <ShoppingBag size={16} className="group-hover:animate-bounce" />
                Add to Selection
              </button>

              {/* Trust & Logistics */}
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-10 border-t border-gray-50 pt-12">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
                    <Truck size={18} strokeWidth={1} className="text-[#D4AF37]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-900">White Glove Delivery</span>
                    <span className="text-[9px] uppercase tracking-widest text-gray-400 mt-1">Insured Worldwide</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
                    <ShieldCheck size={18} strokeWidth={1} className="text-[#D4AF37]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-900">Lifetime Warranty</span>
                    <span className="text-[9px] uppercase tracking-widest text-gray-400 mt-1">Allauddin Guarantee</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;