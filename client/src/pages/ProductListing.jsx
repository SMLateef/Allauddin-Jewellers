import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

// --- 6 UNIQUE BACKUP PRODUCTS WITH DISTINCT IMAGES ---
const BACKUP_PRODUCTS = [
  { 
    _id: 'b1', 
    name: 'Royal Solitaire', 
    category: 'Gold', 
    purity: '18k Yellow Gold', 
    image: 'https://parashabora.com/cdn/shop/files/DSC07910.jpg?v=1718973102&width=1445' 
  },
  { 
    _id: 'b2', 
    name: 'Heritage Emerald', 
    category: 'Gold', 
    purity: 'Yellow Gold & Gem', 
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000' 
  },
  { 
    _id: 'b3', 
    name: 'Diamond Tennis', 
    category: 'Diamond', 
    purity: 'Platinum', 
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000' 
  },
  { 
    _id: 'b4', 
    name: 'Sapphire Studs', 
    category: 'Diamond', 
    purity: 'White Gold & Gem', 
    image: 'https://www.tilottamahandloom.in/wp-content/uploads/2024/04/TJ0106-chatai-gold-plated-bridal-necklace-set.jpg' 
  },
  { 
    _id: 'b5', 
    name: 'Bespoke Band', 
    category: 'Gold', 
    purity: 'Rose Gold', 
    image: 'https://jecyjewels.com/wp-content/uploads/2025/05/Untitled-design-45.png' 
  },
  { 
    _id: 'b6', 
    name: 'Pear-Cut Pendant', 
    category: 'Gold', 
    purity: '18k Gold', 
    image: 'https://d25g9z9s77rn4i.cloudfront.net/uploads/product/480/1750518566_057cb093d5647b8af1cf.png' 
  },
];
const Hero = () => (
  <section className="relative h-screen w-full overflow-hidden bg-[#0a0a0a]">
    <motion.img 
      initial={{ scale: 1.15 }}
      animate={{ scale: 1 }}
      transition={{ duration: 15, ease: "easeOut" }}
      src="https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&q=80&w=2000" 
      className="absolute inset-0 w-full h-full object-cover opacity-50"
      alt="Luxury Jewelry Background"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-white"></div>
    <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <span className="text-[#D4AF37] uppercase tracking-[0.6em] text-[10px] md:text-xs mb-8 block font-semibold">
          Handcrafted Legacies Since 1995
        </span>
        <h2 className="font-serif text-5xl md:text-9xl text-white mb-12 tracking-tighter leading-[0.9]">
          Allauddin <br /> <span className="italic font-light text-white/80">Heritage</span>
        </h2>
        <button className="group relative px-12 py-5 bg-transparent border border-white/20 text-white uppercase tracking-[0.3em] text-[10px] overflow-hidden transition-all duration-700 hover:border-[#D4AF37]">
          <span className="relative z-10 group-hover:text-black transition-colors duration-500">Discover the Collection</span>
          <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
        </button>
      </motion.div>
    </div>
  </section>
);

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  // Default image for items added via terminal that don't have a URL yet


  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await axios.get('http://localhost:5050/api/inventory/all');
        
        if (res.data && res.data.length > 0) {
          // Attach a default image to items that don't have one
          const sanitizedData = res.data.map(item => ({
            ...item,
            image: item.image || DEFAULT_IMAGE
          }));
          setProducts(sanitizedData);
        } else {
          setProducts(BACKUP_PRODUCTS);
        }
      } catch (err) {
        console.error("Vault Connection Error:", err);
        setProducts(BACKUP_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };
    fetchStock();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      filter === 'All' || p.category === filter
    );
  }, [filter, products]);

  return (
    <div className="bg-white min-h-screen">
      <Hero />
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 pb-32">
        <div className="flex flex-col md:flex-row justify-between items-end py-24 gap-8">
          <div>
            <h4 className="font-serif text-4xl md:text-6xl text-gray-900 tracking-tighter">The Vault</h4>
            <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 mt-4">
              {products.length === BACKUP_PRODUCTS.length ? "Featured Collection" : "Live Stock from the Cloud Vault"}
            </p>
          </div>
        </div>

        {/* Categories matching your Database: Gold, Silver, Diamond */}
        <div className="flex gap-10 text-[10px] uppercase tracking-[0.3em] font-medium overflow-x-auto no-scrollbar border-b border-gray-100 mb-20">
          {['All', 'Gold', 'Silver', 'Diamond'].map((cat) => (
            <button 
              key={cat} 
              onClick={() => setFilter(cat)} 
              className={`relative transition-all duration-500 pb-6 whitespace-nowrap ${filter === cat ? 'text-[#D4AF37]' : 'text-gray-400 hover:text-black'}`}
            >
              {cat}
              {filter === cat && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]" />}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] animate-pulse">Consulting the Ledger...</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            <AnimatePresence mode='popLayout'>
              {filteredProducts.map(product => (
                <motion.div 
                  key={product._id} 
                  layout 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, scale: 0.95 }} 
                  transition={{ duration: 0.6 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <section className="bg-black py-32 text-center">
        <h5 className="font-serif text-3xl md:text-5xl text-white mb-8 tracking-tight">Craft your own masterpiece.</h5>
        <button className="bg-[#D4AF37] text-black px-12 py-5 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-white transition-colors">Request Consultation</button>
      </section>
    </div>
  );
};

export default ProductListing;