import { motion } from 'framer-motion';
import favicon from '../assets/RocketHour Favicon.svg';
import houseDemo from '../minecraft_demos/minecraft_house.webm';
import { useNavigate } from 'react-router-dom';

export default function Instructions() {
  const navigate = useNavigate();
  return (
    <div style={{ width: '800px' }} className="mx-auto px-4">
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
                Build Your First House
              </h2>
              <p className="text-[#F1F2F0]/60">
                Let's start with a simple but elegant house design
              </p>
            </div>

            {/* Video Demo */}
            <div className="relative rounded-xl overflow-hidden bg-[#03041A] border border-[#F1F2F0]/10">
              <video 
                className="w-full aspect-video object-cover"
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source src={houseDemo} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Instructions */}
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-[#B95DCD] to-[#748DF4] text-white font-medium">
                    1
                  </span>
                  <h3 className="text-[#F1F2F0] text-lg font-medium">
                    Find a Location
                  </h3>
                </div>
                <p className="ml-11 text-[#F1F2F0]/80">
                  Look for a flat area in the Minecraft world to build your house
                </p>
              </div>

              {/* Step 2 */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-[#B95DCD] to-[#748DF4] text-white font-medium">
                    2
                  </span>
                  <h3 className="text-[#F1F2F0] text-lg font-medium">
                    Use the following materials
                  </h3>
                </div>
                <div className="ml-11 space-y-2">
                  <p className="text-[#F1F2F0]/80">Since you're in creative mode, you can access these directly:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-[#F1F2F0]/80">
                      <span className="text-[#C9E74C] mr-2">•</span>
                      Birch Wood Planks
                    </li>
                    <li className="flex items-center text-[#F1F2F0]/80">
                      <span className="text-[#C9E74C] mr-2">•</span>
                      Glass Blocks
                    </li>
                    <li className="flex items-center text-[#F1F2F0]/80">
                      <span className="text-[#C9E74C] mr-2">•</span>
                      Spruce Door
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Start Building Button */}
            <button
              onClick={() => navigate('/code-snippets')}
              className="w-full bg-gradient-to-r from-[#B95DCD] via-[#9B6BE1] to-[#748DF4] text-white font-medium rounded-lg py-4 text-lg transition-all duration-200 hover:opacity-90 hover:scale-[1.02] relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#B95DCD] before:via-[#9B6BE1] before:to-[#748DF4] before:rounded-lg before:-z-10 before:blur-[2px]"
            >
              I am complete
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
