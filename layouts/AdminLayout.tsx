import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Users, Megaphone, LogOut, ShieldCheck } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: 'Tutor Applications', path: '/admin/applications', icon: Users },
    { name: 'Send Announcements', path: '/admin/announcements', icon: Megaphone },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navbar for Admin */}
      <header className="bg-gray-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/admin" className="flex items-center gap-2">
                 <ShieldCheck className="h-8 w-8 text-primary-400" />
                 <span className="font-bold text-xl">Admin Console</span>
              </Link>
              <nav className="ml-10 flex space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center">
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.name}
                    </div>
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={toggleTheme} className="text-gray-300 hover:text-white">
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <Link to="/login" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
         <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;