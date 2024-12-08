import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Layout({ children, centered = true }) {
  return (
    // Full screen container with professional dark background
    <div className="fixed inset-0 bg-[#03041A] overflow-auto">
      {/* Subtle professional gradient background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(185,93,205,0.03)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(116,141,244,0.03)_0%,transparent_50%)]" />
      </div>

      {/* Content - absolute center */}
      <div className={`min-h-screen w-screen flex flex-col ${centered ? 'items-center justify-center' : ''}`}>
        <main className={`flex-1 ${centered ? 'flex items-center justify-center' : ''}`}>
          <div className={`w-full ${centered ? 'max-w-md mx-auto px-4' : 'max-w-7xl mx-auto px-6 py-8'}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {children || <Outlet />}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
