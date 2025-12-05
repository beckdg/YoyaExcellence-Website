import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Bell,
  Star,
  UserCog,
  LogOut,
  GraduationCap,
  UserRoundSearch,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const TutorLayout: React.FC = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: "Dashboard", path: "/tutor/dashboard", icon: LayoutDashboard },
    { name: "See other Tutors", path: "/tutors", icon: UserRoundSearch },
    { name: "Notifications", path: "/tutor/notifications", icon: Bell },
    { name: "Recent Reviews", path: "/tutor/reviews", icon: Star },
    { name: "Edit Profile", path: "/tutor/profile", icon: UserCog },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col md:flex-row">
      {/* Sidebar / Mobile Header */}
      <aside className="bg-white dark:bg-gray-800 w-full md:w-64 flex-shrink-0 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-700">
          <Link to="/" className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary-600" />
            <span className="font-bold text-xl text-gray-900 dark:text-white">
              TutorPortal
            </span>
          </Link>
          <button onClick={toggleTheme} className="md:hidden text-gray-500">
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                isActive(item.path)
                  ? "bg-primary-50 text-primary-600 dark:bg-gray-700 dark:text-primary-400"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900"
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-4 py-2">
            <button
              onClick={toggleTheme}
              className="hidden md:block text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <Link
              to="/login"
              className="flex items-center text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Sign Out
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default TutorLayout;
