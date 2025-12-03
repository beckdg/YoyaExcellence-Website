import React from 'react';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8 mt-auto transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">TutorConnect</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Empowering education by connecting students with expert tutors right at home.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="#" className="hover:text-primary-600">Browse Tutors</a></li>
              <li><a href="#" className="hover:text-primary-600">How it Works</a></li>
              <li><a href="#" className="hover:text-primary-600">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="#" className="hover:text-primary-600">About Us</a></li>
              <li><a href="#" className="hover:text-primary-600">Careers</a></li>
              <li><a href="#" className="hover:text-primary-600">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Connect</h4>
            <div className="flex space-x-4 text-gray-400">
              <a href="#" className="hover:text-primary-600"><Facebook size={20} /></a>
              <a href="#" className="hover:text-primary-600"><Twitter size={20} /></a>
              <a href="#" className="hover:text-primary-600"><Instagram size={20} /></a>
              <a href="#" className="hover:text-primary-600"><Mail size={20} /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} TutorConnect. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
