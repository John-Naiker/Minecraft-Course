import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import favicon from '../assets/RocketHour Favicon.svg';

export default function Setup() {
  const [copySuccess, setCopySuccess] = useState(false);
  const serverAddress = 'ws://13.244.107.70:8081';
  const navigate = useNavigate();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(serverAddress);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div style={{ width: '600px' }} className="mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <img src={favicon} alt="RocketHour" className="h-8 w-8" />
        </div>

        {/* Main Content */}
        <div className="bg-[#03041A]/80 backdrop-blur-sm rounded-2xl p-8 border border-[#B95DCD]/10">
          <div className="space-y-12">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-[#F1F2F0] text-2xl font-medium mb-2">
                Let's Get Set Up
              </h2>
              <p className="text-[#F1F2F0]/60">
                Follow these steps to prepare for your Minecraft session
              </p>
            </div>

            {/* Setup Steps */}
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-[#B95DCD] to-[#748DF4] text-white font-medium">
                    1
                  </span>
                  <h3 className="text-[#F1F2F0] text-lg font-medium">
                    Access Minecraft
                  </h3>
                </div>
                <div className="ml-11 space-y-3">
                  <p className="text-[#F1F2F0]/80">Launch Minecraft using this link:</p>
                  <a
                    href="http://rockethour.s3.af-south-1.amazonaws.com/manual_uploads/EF_1.8_Offline_42.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-[#B95DCD] via-[#9B6BE1] to-[#748DF4] text-white font-medium rounded-lg px-6 py-3 text-base transition-all duration-200 hover:opacity-90 hover:scale-[1.02] relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#B95DCD] before:via-[#9B6BE1] before:to-[#748DF4] before:rounded-lg before:-z-10 before:blur-[2px]"
                  >
                    Open Minecraft
                  </a>
                  <div className="mt-3 flex items-center text-[#F1F2F0]/80">
                    <span className="text-[#C9E74C] mr-2">•</span>
                    When the EaglerForge Mod Manager appears, click "Done"
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-[#B95DCD] to-[#748DF4] text-white font-medium">
                    2
                  </span>
                  <h3 className="text-[#F1F2F0] text-lg font-medium">
                    Set Up Your Profile
                  </h3>
                </div>
                <div className="ml-11 space-y-2 text-[#F1F2F0]/80">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="text-[#C9E74C] mr-2">•</span>
                      Set your username to your real name (e.g., "John")
                    </li>
                    <li className="flex items-center">
                      <span className="text-[#C9E74C] mr-2">•</span>
                      Choose your preferred Minecraft skin
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 3 */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-[#B95DCD] to-[#748DF4] text-white font-medium">
                    3
                  </span>
                  <h3 className="text-[#F1F2F0] text-lg font-medium">
                    Optimize Settings
                  </h3>
                </div>
                <div className="ml-11 space-y-3 text-[#F1F2F0]/80">
                  <p>Options → Video Settings</p>
                  <div className="grid grid-cols-2 gap-x-6">
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <span className="text-[#C9E74C] mr-2">•</span>
                        Graphics: Fast
                      </li>
                      <li className="flex items-center">
                        <span className="text-[#C9E74C] mr-2">•</span>
                        Particles: Minimal
                      </li>
                      <li className="flex items-center">
                        <span className="text-[#C9E74C] mr-2">•</span>
                        Clouds: OFF
                      </li>
                    </ul>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <span className="text-[#C9E74C] mr-2">•</span>
                        Max FPS: 40
                      </li>
                      <li className="flex items-center">
                        <span className="text-[#C9E74C] mr-2">•</span>
                        Shadows: OFF
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-[#B95DCD] to-[#748DF4] text-white font-medium">
                    4
                  </span>
                  <h3 className="text-[#F1F2F0] text-lg font-medium">
                    Join Server
                  </h3>
                </div>
                <div className="ml-11 space-y-3 text-[#F1F2F0]/80">
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-[#C9E74C]">Quick Connect:</span>
                    <span>Multiplayer → Direct Connection</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <code className="flex-1 bg-[#03041A] border border-[#F1F2F0]/10 rounded-lg p-3 font-mono text-[#C9E74C]">
                      {serverAddress}
                    </code>
                    <button
                      onClick={handleCopy}
                      className="px-4 py-3 bg-[#03041A] border border-[#F1F2F0]/10 rounded-lg text-[#F1F2F0] hover:bg-[#F1F2F0]/10 transition-all duration-200 relative group"
                    >
                      {copySuccess ? (
                        <span className="text-[#C9E74C]">Copied!</span>
                      ) : (
                        "Copy"
                      )}
                      {copySuccess && (
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                          className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-[#C9E74C] text-sm whitespace-nowrap"
                        >
                          Copied!
                        </motion.div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Ready Button */}
            <button
              onClick={() => navigate('/instructions')}
              className="w-full bg-gradient-to-r from-[#B95DCD] via-[#9B6BE1] to-[#748DF4] text-white font-medium rounded-lg py-4 text-lg transition-all duration-200 hover:opacity-90 hover:scale-[1.02] relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#B95DCD] before:via-[#9B6BE1] before:to-[#748DF4] before:rounded-lg before:-z-10 before:blur-[2px]"
            >
              I'm Ready to Begin
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
