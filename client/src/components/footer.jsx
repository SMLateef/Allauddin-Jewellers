import React from 'react';
import { Instagram, Facebook, Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] text-white pt-24 pb-12">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Column 1: Brand Story */}
          <div className="space-y-8">
            <h2 className="font-serif text-2xl tracking-[0.2em] uppercase">
              Allauddin 
              <span className="block text-[10px] tracking-[0.6em] mt-2 text-[#D4AF37] font-bold">Heritage</span>
            </h2>
            <p className="text-gray-500 text-[11px] leading-loose tracking-widest font-light max-w-sm uppercase">
              Crafting handcrafted legacies since 1995. We specialize in bespoke high-jewelry 
              and ethical diamonds for the most discerning collectors worldwide.
            </p>
            <div className="flex gap-8 text-gray-400">
              <Instagram size={18} className="hover:text-[#D4AF37] cursor-pointer transition-colors duration-500" />
              <Facebook size={18} className="hover:text-[#D4AF37] cursor-pointer transition-colors duration-500" />
              <Mail size={18} className="hover:text-[#D4AF37] cursor-pointer transition-colors duration-500" />
            </div>
          </div>

          {/* Column 2: Client Care */}
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#D4AF37] mb-10">Client Care</h3>
            <ul className="space-y-5 text-[10px] uppercase tracking-[0.3em] text-gray-400 font-medium">
              <li className="hover:text-white transition-colors cursor-pointer">Bespoke Commissions</li>
              <li className="hover:text-white transition-colors cursor-pointer">Sizing & Adjustments</li>
              <li className="hover:text-white transition-colors cursor-pointer">Cleaning & Restoration</li>
              <li className="hover:text-white transition-colors cursor-pointer">Conflict-Free Policy</li>
            </ul>
          </div>

          {/* Column 3: The House */}
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#D4AF37] mb-10">The House</h3>
            <ul className="space-y-5 text-[10px] uppercase tracking-[0.3em] text-gray-400 font-medium">
              <li className="hover:text-white transition-colors cursor-pointer">Our Heritage</li>
              <li className="hover:text-white transition-colors cursor-pointer">Ethical Sourcing</li>
              <li className="hover:text-white transition-colors cursor-pointer">Private Showrooms</li>
              <li className="hover:text-white transition-colors cursor-pointer">Careers</li>
            </ul>
          </div>

          {/* Column 4: Concierge */}
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#D4AF37] mb-10">Concierge</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-gray-400 text-[10px] tracking-widest uppercase leading-relaxed">
                <MapPin size={14} className="text-[#D4AF37] shrink-0" /> 
                Allauddin Atelier, <br/> Luxury District 7
              </li>
              <li className="flex items-center gap-4 text-gray-400 text-[10px] tracking-widest uppercase">
                <Phone size={14} className="text-[#D4AF37] shrink-0" /> 
                +1 (800) ALLAUDDIN
              </li>
              <li className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 border border-white/10 rounded-full">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                   <span className="text-[8px] uppercase tracking-widest text-gray-400 font-bold">Online Inquiry Active</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Legal & Certifications */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[9px] uppercase tracking-[0.4em] text-gray-600 font-bold">
            © {currentYear} Allauddin Jewellers. All Rights Reserved.
          </p>
          <div className="flex items-center gap-10">
             <div className="flex items-center gap-2">
                <ShieldCheck size={12} className="text-gray-700" />
                <span className="text-[9px] uppercase tracking-[0.3em] text-gray-600">GIA Certified Masterpieces</span>
             </div>
             <span className="text-[9px] uppercase tracking-[0.3em] text-gray-600">Privacy Sanctuary</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;