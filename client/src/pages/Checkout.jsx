import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { ShieldCheck, Calendar, Printer, X, Download, CheckCircle2 } from 'lucide-react';

const Checkout = () => {
  const { cartItems, cartTotal } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const invoiceRef = useRef();

  // Jewelry Calculations (3% GST standard)
  const gstAmount = cartTotal * 0.03;
  const grandTotal = cartTotal + gstAmount;

  const handlePrint = () => {
    window.print();
  };

  if (cartItems.length === 0 && !submitted) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
        <p className="font-serif text-xl tracking-[0.3em] text-gray-400 uppercase">The Vault is Empty</p>
        <Link to="/" className="mt-8 text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] border-b border-[#D4AF37] pb-1">Return to Collection</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-[#FAF9F6] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          
          {/* Left: Client Details Form */}
          <div className="lg:col-span-7 space-y-12">
            {!submitted ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.5em] font-bold mb-4 block">Bespoke Inquiry</span>
                <h2 className="font-serif text-4xl text-gray-900 mb-10 tracking-tight">Private Viewing Request</h2>
                
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:col-span-1">
                    <label className="text-[9px] uppercase tracking-[0.3em] text-gray-400 block mb-3 font-bold">Full Name</label>
                    <input required type="text" className="w-full bg-white border-b border-gray-200 py-4 outline-none focus:border-[#D4AF37] transition-colors text-sm font-light tracking-wide" placeholder="Shaik Muddassir" />
                  </div>
                  
                  <div className="md:col-span-1">
                    <label className="text-[9px] uppercase tracking-[0.3em] text-gray-400 block mb-3 font-bold">Email Address</label>
                    <input required type="email" className="w-full bg-white border-b border-gray-200 py-4 outline-none focus:border-[#D4AF37] transition-colors text-sm font-light tracking-wide" placeholder="concierge@allauddin.com" />
                  </div>

                  <div className="md:col-span-1">
                    <label className="text-[9px] uppercase tracking-[0.3em] text-gray-400 block mb-3 font-bold">Preferred Contact</label>
                    <select className="w-full bg-white border-b border-gray-200 py-4 outline-none focus:border-[#D4AF37] text-[10px] uppercase tracking-widest">
                      <option>Email Inquiry</option>
                      <option>Phone Consultation</option>
                      <option>WhatsApp Bespoke</option>
                    </select>
                  </div>

                  <div className="md:col-span-1">
                    <label className="text-[9px] uppercase tracking-[0.3em] text-gray-400 block mb-3 font-bold">Phone Number</label>
                    <input required type="tel" className="w-full bg-white border-b border-gray-200 py-4 outline-none focus:border-[#D4AF37] transition-colors text-sm font-light tracking-wide" />
                  </div>

                  <button type="submit" className="md:col-span-2 w-full bg-black text-white py-6 mt-8 uppercase tracking-[0.5em] text-[10px] font-bold hover:bg-[#D4AF37] transition-all duration-700 shadow-2xl">
                    Confirm Selection & Generate Bill
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <CheckCircle2 size={48} className="text-[#D4AF37]" strokeWidth={1} />
                <h2 className="font-serif text-5xl text-gray-900 tracking-tighter">Your Legacy is Registered</h2>
                <p className="text-gray-500 font-light leading-loose text-sm uppercase tracking-widest">
                  Thank you for your selection. Your digital invoice is ready for your records.
                </p>
                <div className="flex gap-4">
                  <button onClick={() => setShowInvoice(true)} className="px-10 py-4 bg-black text-white text-[10px] uppercase tracking-[0.4em] font-bold">
                    View Digital Bill
                  </button>
                  <Link to="/" className="px-10 py-4 border border-gray-200 text-[10px] uppercase tracking-[0.4em] font-bold">
                    Home
                  </Link>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right: Selection Summary */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 bg-white p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50"
          >
            <h3 className="font-serif text-xl text-gray-900 mb-10 uppercase tracking-widest border-b border-gray-100 pb-6">Vault Summary</h3>
            
            <div className="space-y-8 mb-12 max-h-[400px] overflow-y-auto no-scrollbar">
              {cartItems.map((item) => (
                <div key={item._id} className="flex gap-6 items-center">
                  <div className="w-20 h-24 bg-gray-50 overflow-hidden flex-shrink-0 grayscale">
                    <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-900">{item.name}</h4>
                    <p className="text-[9px] text-[#D4AF37] mt-1 tracking-[0.1em]">{item.purity || item.material}</p>
                    <p className="text-[10px] text-gray-400 mt-2 uppercase">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-100">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400 uppercase tracking-widest">Subtotal</span>
                <span className="font-bold font-mono">₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400 uppercase tracking-widest text-[#D4AF37]">GST (3%)</span>
                <span className="font-bold font-mono">₹{gstAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg border-t pt-4">
                <span className="font-serif uppercase tracking-tighter">Estimated Total</span>
                <span className="font-bold text-[#D4AF37]">₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- INVOICE MODAL --- */}
      <AnimatePresence>
        {showInvoice && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white w-full max-w-2xl shadow-2xl overflow-hidden"
            >
              {/* Toolbar */}
              <div className="bg-gray-50 p-6 flex justify-between items-center print:hidden">
                <p className="text-[10px] uppercase tracking-widest font-bold">Digital Invoice</p>
                <div className="flex gap-4">
                  <button onClick={handlePrint} className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors">
                    <Printer size={16} /> <span className="text-[10px] font-bold uppercase tracking-widest">Print</span>
                  </button>
                  <button onClick={() => setShowInvoice(false)} className="hover:text-red-500 transition-colors">
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Printable Invoice Body */}
              <div id="printable-bill" className="p-12 md:p-20 text-black">
                <div className="text-center mb-16">
                  <h1 className="font-serif text-5xl tracking-tighter mb-4">Allauddin Heritage</h1>
                  <p className="text-[10px] uppercase tracking-[0.5em] text-gray-400">Handcrafted Legacy Since 1995</p>
                </div>

                <div className="flex justify-between text-[10px] uppercase tracking-widest mb-16 border-b border-gray-100 pb-10">
                  <div>
                    <p className="text-gray-400 mb-2">Invoice To</p>
                    <p className="font-bold text-lg tracking-tight">Valued Client</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 mb-2">Date of Issue</p>
                    <p className="font-bold text-lg tracking-tight">{new Date().toLocaleDateString('en-IN')}</p>
                  </div>
                </div>

                <table className="w-full mb-16">
                  <thead className="text-[10px] uppercase tracking-widest text-gray-400 border-b border-gray-100">
                    <tr>
                      <th className="py-4 text-left font-bold">Selection</th>
                      <th className="py-4 text-right font-bold">Weight/Purity</th>
                      <th className="py-4 text-right font-bold">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {cartItems.map((item) => (
                      <tr key={item._id}>
                        <td className="py-6">
                          <p className="font-serif text-lg">{item.name}</p>
                          <p className="text-[9px] uppercase tracking-widest text-gray-400">{item.category}</p>
                        </td>
                        <td className="py-6 text-right font-mono text-sm">{item.weight}g / {item.purity}</td>
                        <td className="py-6 text-right font-mono font-bold">₹{item.totalItemPrice?.toLocaleString() || "Market Rate"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="ml-auto w-full max-w-xs space-y-4 pt-10 border-t-2 border-black">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 uppercase tracking-widest">Subtotal</span>
                    <span className="font-mono">₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 uppercase tracking-widest">GST (3%)</span>
                    <span className="font-mono">₹{gstAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-2xl font-bold border-t border-gray-100 pt-6">
                    <span className="font-serif tracking-tighter uppercase">Total</span>
                    <span className="text-[#D4AF37]">₹{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-32 text-center text-[9px] uppercase tracking-[0.4em] text-gray-300">
                  This is a digitally generated appraisal from Allauddin Heritage Vault.
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body * { visibility: hidden; }
          #printable-bill, #printable-bill * { visibility: visible; }
          #printable-bill { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 100%; 
            padding: 40px !important;
          }
          .print\:hidden { display: none !important; }
        }
      `}} />
    </div>
  );
};

export default Checkout;