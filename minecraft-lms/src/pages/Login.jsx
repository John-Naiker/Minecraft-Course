import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import favicon from '../assets/RocketHour Favicon.svg';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === 'user' && password === 'password') {
      // Get timestamp from URL or use current time
      const startTime = searchParams.get('startTime') || Date.now().toString();
      
      // Store the start time in localStorage for use across the app
      localStorage.setItem('sessionStartTime', startTime);
      
      navigate('/intro');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <Layout centered>
      <div className="bg-[#03041A]/80 backdrop-blur-sm rounded-2xl p-8 border border-[#B95DCD]/10">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <img src={favicon} alt="RocketHour" className="h-8 w-8" />
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#F1F2F0] text-2xl font-medium mb-2"
          >
            Welcome to Discovery
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[#F1F2F0]/60"
          >
            Sign in to start your journey
          </motion.p>
        </div>

        {/* Form */}
        <motion.form 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onSubmit={handleSubmit} 
          className="space-y-6"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[#F1F2F0]/80 mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="w-full px-4 py-3 bg-[#03041A] border border-[#F1F2F0]/10 rounded-lg focus:outline-none focus:border-[#B95DCD] transition-all duration-200 text-[#F1F2F0]"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#F1F2F0]/80 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 bg-[#03041A] border border-[#F1F2F0]/10 rounded-lg focus:outline-none focus:border-[#B95DCD] transition-all duration-200 text-[#F1F2F0]"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#DA5A33] text-sm text-center bg-[#DA5A33]/10 py-2 rounded-lg"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#B95DCD] via-[#9B6BE1] to-[#748DF4] text-white font-medium rounded-lg py-4 text-lg transition-all duration-200 hover:opacity-90 hover:scale-[1.02] relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#B95DCD] before:via-[#9B6BE1] before:to-[#748DF4] before:rounded-lg before:-z-10 before:blur-[2px]"
          >
            Sign in
          </button>
        </motion.form>
      </div>
    </Layout>
  );
}
