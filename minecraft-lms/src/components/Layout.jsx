import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    // Full screen container with professional dark background
    <div className="fixed inset-0 bg-[#03041A] overflow-auto">
      {/* Subtle professional gradient background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(185,93,205,0.03)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(116,141,244,0.03)_0%,transparent_50%)]" />
      </div>

      {/* Content - absolute center */}
      <div className="min-h-screen w-screen flex items-center justify-center">
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
