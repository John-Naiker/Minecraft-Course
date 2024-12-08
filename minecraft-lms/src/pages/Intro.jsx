import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';

export default function Intro() {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const navigate = useNavigate();
  const { sessionStartTime } = useAuth();

  useEffect(() => {
    if (timeLeft <= 0) {
      navigate('/setup');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#B95DCD] to-[#748DF4] text-transparent bg-clip-text">
            Welcome to RocketHour Minecraft!
          </h1>
          <p className="text-[#F1F2F0]/80 text-lg">
            Get ready to start your coding adventure in Minecraft
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#03041A]/80 backdrop-blur-sm rounded-2xl p-8 border border-[#B95DCD]/10"
        >
          <h2 className="text-2xl font-semibold mb-4">Class Starts In</h2>
          <div className="text-5xl font-bold text-[#B95DCD]">
            {formatTime(timeLeft)}
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6 text-left bg-[#03041A]/80 backdrop-blur-sm rounded-2xl p-8 border border-[#B95DCD]/10"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">While You Wait</h2>
          
          <div className="space-y-4">
            <p className="text-[#F1F2F0]/80">
              Please complete these steps before we begin:
            </p>
            
            <ol className="list-decimal list-inside space-y-4 text-[#F1F2F0]/80">
              <li>
                Open Google Chrome if you haven't already. 
                <a 
                  href="https://www.google.com/chrome" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-2 text-[#748DF4] hover:text-[#748DF4]/80 transition-colors"
                >
                  Download Chrome →
                </a>
              </li>
              <li>Make sure your Minecraft is ready and running</li>
              <li>Have your notebook and pencil ready</li>
              <li>Clear your desk of any distractions</li>
            </ol>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
