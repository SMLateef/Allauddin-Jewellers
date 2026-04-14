import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { IndianRupee, Package, AlertCircle, Plus, RefreshCw, CreditCard, Wallet, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [history, setHistory] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const [newItem, setNewItem] = useState({
    barcode: '', name: '', category: 'Gold', purity: '', weight: '', makingCharges: ''
  });

  // Logout Logic
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      // Use the environment port 5050 as set in your code
      const historyRes = await axios.get('http://localhost:5050/api/billing/history');
      const inventoryRes = await axios.get('http://localhost:5050/api/inventory/all');
      setHistory(historyRes.data);
      setInventory(inventoryRes.data);
    } catch (err) {
      console.error("Dashboard Sync Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5050/api/inventory/add', newItem);
      alert("✨ Item added to Vault!");
      setNewItem({ barcode: '', name: '', category: 'Gold', purity: '', weight: '', makingCharges: '' });
      fetchData(); 
    } catch (err) { alert("❌ Check Barcode uniqueness."); }
  };

  const totalRevenue = history.reduce((sum, inv) => sum + inv.grandTotal, 0);
  const upiSales = history.filter(inv => inv.paymentMethod === 'UPI').reduce((sum, inv) => sum + inv.grandTotal, 0);
  const cardSales = history.filter(inv => inv.paymentMethod === 'Card' || inv.paymentMethod === 'Debit' || inv.paymentMethod === 'Credit').reduce((sum, inv) => sum + inv.grandTotal, 0);
  const totalDue = history.reduce((sum, inv) => sum + (inv.balanceDue || 0), 0);

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-6 lg:p-12">
      <div className="max-w-7xl mx-auto">
        
        <header className="flex justify-between items-start mb-10">
          <div>
            <h1 className="font-serif text-4xl text-gray-900">Allauddin Command Center</h1>
            <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">Real-time Inventory & Ledger</p>
          </div>
          <div className="flex gap-4">
            <button onClick={fetchData} className="p-3 bg-white rounded-full shadow-sm hover:rotate-180 transition-all duration-500 border border-gray-100">
              <RefreshCw size={18} className="text-gray-400" />
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-600 transition-all">
              <LogOut size={14} /> Exit Vault
            </button>
          </div>
        </header>

        {/* --- STATS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} icon={<IndianRupee />} color="bg-black" />
          <StatCard title="Digital (UPI)" value={`₹${upiSales.toLocaleString()}`} icon={<Wallet />} color="bg-indigo-600" />
          <StatCard title="Card Sales" value={`₹${cardSales.toLocaleString()}`} icon={<CreditCard />} color="bg-blue-600" />
          <StatCard title="Pending Due" value={`₹${totalDue.toLocaleString()}`} icon={<AlertCircle />} color="bg-red-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
          {/* --- BARCODE FORM --- */}
          <section className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="font-serif text-2xl mb-8 flex items-center gap-2"><Plus size={20}/> Barcode Entry</h2>
            <form onSubmit={handleAddItem} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="BARCODE (e.g. GOLD001)" className="p-4 bg-gray-50 rounded-xl font-mono text-[#D4AF37] outline-none border-2 border-transparent focus:border-[#D4AF37]" value={newItem.barcode} onChange={(e) => setNewItem({...newItem, barcode: e.target.value.toUpperCase()})} required />
              <input type="text" placeholder="Product Name" className="p-4 bg-gray-50 rounded-xl outline-none" value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} required />
              <select className="p-4 bg-gray-50 rounded-xl outline-none" value={newItem.category} onChange={(e) => setNewItem({...newItem, category: e.target.value})}>
                <option value="Gold">Gold</option><option value="Silver">Silver</option><option value="Diamond">Diamond</option>
              </select>
              <input type="text" placeholder="Purity (22K)" className="p-4 bg-gray-50 rounded-xl outline-none" value={newItem.purity} onChange={(e) => setNewItem({...newItem, purity: e.target.value})} />
              <input type="number" placeholder="Weight (g)" className="p-4 bg-gray-50 rounded-xl outline-none" value={newItem.weight} onChange={(e) => setNewItem({...newItem, weight: e.target.value})} required />
              <input type="number" placeholder="Making Charges" className="p-4 bg-gray-50 rounded-xl outline-none" value={newItem.makingCharges} onChange={(e) => setNewItem({...newItem, makingCharges: e.target.value})} required />
              <button className="md:col-span-2 bg-black text-white py-5 rounded-xl uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-[#D4AF37] transition-all">Register New Stock</button>
            </form>
          </section>

          {/* --- LIVE STOCK --- */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="font-serif text-2xl mb-6">Live Inventory</h2>
            <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
              {inventory.map(item => (
                <div key={item._id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div>
                    <p className="font-mono text-[10px] text-[#D4AF37] font-bold">{item.barcode}</p>
                    <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-900">{item.weight}g</p>
                    <p className="text-[9px] uppercase text-gray-400">{item.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* --- TABLE --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-[10px] uppercase tracking-widest text-gray-400">
              <tr>
                <th className="p-8">Invoice</th>
                <th className="p-8">Customer</th>
                <th className="p-8">Amount</th>
                <th className="p-8">Method</th>
                <th className="p-8">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {history.map((inv) => (
                <tr key={inv._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-8 font-mono text-[11px] text-[#D4AF37] font-bold">{inv.invoiceNumber}</td>
                  <td className="p-8">
                    <p className="font-semibold text-gray-900">{inv.customerName}</p>
                    <p className="text-[10px] text-gray-400">{inv.customerPhone}</p>
                  </td>
                  <td className="p-8 font-bold">₹{inv.grandTotal.toLocaleString()}</td>
                  <td className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-tighter">{inv.paymentMethod}</td>
                  <td className="p-8">
                    <span className={`px-4 py-1 rounded-full text-[9px] font-bold uppercase ${inv.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {inv.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
    <div className={`${color} p-4 rounded-xl text-white shadow-lg`}>{icon}</div>
    <div>
      <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{value}</h3>
    </div>
  </motion.div>
);

export default AdminDashboard;