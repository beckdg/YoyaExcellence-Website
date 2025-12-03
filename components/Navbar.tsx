import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Menu, X, Sun, Moon, User, GraduationCap } from "lucide-react";

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Browse Tutors", path: "/tutors" },
    { name: "Apply to Teach", path: "/apply" },
    { name: "Admin", path: "/admin" }, // Visible for demo
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 w-full bg-white dark:bg-gray-800 shadow-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <GraduationCap className="h-10 w-10 text-primary-600 dark:text-primary-500" />

              <div className="flex flex-col leading-tight">
                <span className="font-bold text-xl text-gray-800 dark:text-white tracking-tight">
                  YOYYA
                </span>
                <span className="text-sm font-bold text-gray-100 dark:text-white -mt-1">
                  Excellence
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-gray-700"
                    : "text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="flex items-center space-x-3 ml-4 border-l border-gray-200 dark:border-gray-700 pl-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                aria-label="Toggle Theme"
              >
                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md shadow-sm transition-colors"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-gray-700"
                    : "text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 flex items-center justify-between px-3">
              <button
                onClick={toggleTheme}
                className="flex items-center text-gray-600 dark:text-gray-300"
              >
                {theme === "light" ? (
                  <>
                    <Moon size={20} className="mr-2" /> Dark Mode
                  </>
                ) : (
                  <>
                    <Sun size={20} className="mr-2" /> Light Mode
                  </>
                )}
              </button>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
