import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5050/api/auth/login', credentials);
      localStorage.setItem('token', res.data.token); // Save token to browser
      navigate('/admin'); // Enter the vault
    } catch (err) {
      alert("Unauthorized Access: Invalid Credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#0a0a0a] px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl text-white tracking-tighter">Allauddin Heritage</h1>
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] mt-4">Authorized Personnel Only</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <input 
            type="text" placeholder="Username" 
            className="w-full bg-white/5 border border-white/10 p-4 text-white outline-none focus:border-[#D4AF37]"
            onChange={(e) => setCredentials({...credentials, username: e.target.value})}
          />
          <input 
            type="password" placeholder="Passcode" 
            className="w-full bg-white/5 border border-white/10 p-4 text-white outline-none focus:border-[#D4AF37]"
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          />
          <button className="w-full bg-[#D4AF37] py-4 text-black text-[10px] uppercase tracking-[0.4em] font-bold">
            Access Vault
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;