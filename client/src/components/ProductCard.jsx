import React from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext'; 
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  // Fallback image in case the database item has a broken link or no image
  const displayImage = product.image || "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000";

  return (
    <div className="group relative bg-white transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-2 border border-gray-50">
      {/* Use product._id for MongoDB compatibility */}
      <Link to={`/product/${product._id}`} className="block relative aspect-[4/5] overflow-hidden bg-gray-100">
        <img 
          src={displayImage} 
          alt={product.name} 
          className="h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
        />
        
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} 
            className="p-2 bg-white/90 backdrop-blur-md rounded-full shadow-md hover:bg-[#D4AF37] hover:text-white transition-all"
          >
            <Heart size={18} strokeWidth={1.5} />
          </button>
        </div>

        <button 
          onClick={(e) => { 
            e.preventDefault(); 
            e.stopPropagation(); 
            addToCart(product); 
          }} 
          className="absolute bottom-0 w-full bg-black/90 backdrop-blur-md text-white py-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex items-center justify-center gap-3 uppercase tracking-[0.3em] text-[10px] font-semibold hover:bg-[#D4AF37] z-20"
        >
          <ShoppingBag size={14} strokeWidth={2} /> Add to Selection
        </button>
      </Link>
      
      <Link to={`/product/${product._id}`} className="p-6 text-center block">
        {/* Changed product.material to product.purity to match your Vault data */}
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] mb-3 font-semibold">
          {product.purity || product.category}
        </p>
        <h3 className="font-serif text-lg text-gray-900 tracking-wider uppercase leading-snug">
          {product.name}
        </h3>
      </Link>
    </div>
  );
};

export default ProductCard;