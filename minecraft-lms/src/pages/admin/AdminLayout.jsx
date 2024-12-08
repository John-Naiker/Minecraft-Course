import { Link, Outlet, useLocation } from 'react-router-dom';
import favicon from '../../assets/RocketHour Favicon.svg';

export default function AdminLayout() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-[#03041A] text-[#F1F2F0]">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-[#03041A]/80 backdrop-blur-sm border-r border-[#B95DCD]/10">
        <div className="flex items-center space-x-3 px-6 py-4 border-b border-[#B95DCD]/10">
          <img src={favicon} alt="RocketHour" className="h-8 w-8" />
          <span className="text-lg font-semibold">Admin Panel</span>
        </div>
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin/classes"
                className={`block px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive('/admin/classes')
                    ? 'bg-gradient-to-r from-[#B95DCD] to-[#748DF4] text-white'
                    : 'text-[#F1F2F0]/60 hover:text-[#F1F2F0] hover:bg-white/[0.12]'
                }`}
              >
                Classes
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className={`block px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive('/admin/users')
                    ? 'bg-gradient-to-r from-[#B95DCD] to-[#748DF4] text-white'
                    : 'text-[#F1F2F0]/60 hover:text-[#F1F2F0] hover:bg-white/[0.12]'
                }`}
              >
                Users
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 min-h-screen">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
