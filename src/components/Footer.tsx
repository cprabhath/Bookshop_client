import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-400" />
              <span className="ml-2 text-xl font-bold text-white">Bookverse</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              Your premier destination for quality books and literary treasures.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-indigo-400 transition-colors">Shop</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-indigo-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-indigo-400 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">Shipping Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">Returns & Refunds</a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Bookverse. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-indigo-400 transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-indigo-400 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-indigo-400 transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}