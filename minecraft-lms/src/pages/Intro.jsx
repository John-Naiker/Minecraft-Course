import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import favicon from '../assets/RocketHour Favicon.svg';

export default function Intro() {
  const navigate = useNavigate();
  
  // Get the fixed session time from localStorage (format: "YYYY-MM-DD HH:mm")
  const sessionDateTime = localStorage.getItem('sessionStartTime');
  const sessionStartTime = sessionDateTime ? new Date(sessionDateTime).getTime() : Date.now();
  
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSessionStarted, setIsSessionStarted] = useState(false);

  // Format the session start time for display (HH:mm format)
  const sessionTimeDisplay = new Date(sessionStartTime).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });

  // Also display the date if it's not today
  const sessionDateDisplay = new Date(sessionStartTime).toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  useEffect(() => {
    // Calculate initial time left based on fixed session time
    const calculateTimeLeft = () => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((sessionStartTime - now) / 1000));
      return diff;
    };

    // Set initial time left
    setTimeLeft(calculateTimeLeft());

    // Update timer every second
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      
      if (remaining <= 0) {
        setIsSessionStarted(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [sessionStartTime]);

  const formatTime = (totalSeconds) => {
    if (totalSeconds <= 0) return "00:00:00";

    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const parts = [];

    if (days > 0) {
      parts.push(`${days}d`);
    }
    if (days > 0 || hours > 0) {
      parts.push(`${hours.toString().padStart(2, '0')}h`);
    }
    parts.push(`${minutes.toString().padStart(2, '0')}m`);
    parts.push(`${seconds.toString().padStart(2, '0')}s`);

    return parts.join(' ');
  };

  return (
    <div style={{ width: '600px' }} className="mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <img src={favicon} alt="RocketHour" className="h-8 w-8" />
        </div>

        {/* Main Content */}
        <div className="bg-[#03041A]/80 backdrop-blur-sm rounded-2xl p-8 border border-[#B95DCD]/10">
          <div className="space-y-8">
            {/* Timer Section */}
            <div className="text-center">
              <h2 className="text-[#F1F2F0] text-xl font-medium mb-3">
                The session will start on {sessionDateDisplay} at {sessionTimeDisplay}
              </h2>
              <div className="text-5xl font-bold bg-gradient-to-r from-[#B95DCD] to-[#748DF4] bg-clip-text text-transparent">
                {formatTime(timeLeft)}
              </div>
            </div>

            {/* Actions Section */}
            <div className="space-y-4">
              <a
                href="https://meet.google.com/mem-cbhe-pow"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#03041A] border border-[#F1F2F0]/10 text-[#F1F2F0] font-medium rounded-lg py-3 text-center transition-all duration-200 hover:bg-[#F1F2F0]/10"
              >
                Join Google Meet
              </a>

              <AnimatePresence>
                {isSessionStarted ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative"
                  >
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ 
                        scale: [0.95, 1.05, 0.95],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-[#B95DCD] to-[#748DF4] rounded-lg blur-xl"
                    />
                    <motion.button
                      onClick={() => navigate('/setup')}
                      className="relative w-full bg-gradient-to-r from-[#B95DCD] via-[#9B6BE1] to-[#748DF4] text-white font-medium rounded-lg py-4 text-lg transition-all duration-200 hover:opacity-90 hover:scale-105 hover:shadow-lg"
                    >
                      Let's Go!
                    </motion.button>
                  </motion.div>
                ) : (
                  <button
                    disabled
                    className="w-full border border-[#F1F2F0]/10 text-[#F1F2F0]/40 font-medium rounded-lg py-3 cursor-not-allowed"
                  >
                    Waiting until start time...
                  </button>
                )}
              </AnimatePresence>
            </div>

            {/* Checklist Section */}
            <div className="space-y-3">
              <h3 className="text-[#F1F2F0] font-medium">Before we begin:</h3>
              <ul className="space-y-2 text-[#F1F2F0]/80">
                <li className="flex items-center">
                  <span className="text-[#C9E74C] mr-2">•</span>
                  Ensure your webcam and microphone are working
                </li>
                <li className="flex items-center">
                  <span className="text-[#C9E74C] mr-2">•</span>
                  Use Chrome as your browser
                </li>
                <li className="flex items-center">
                  <span className="text-[#C9E74C] mr-2">•</span>
                  Close all unnecessary tabs and applications
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
