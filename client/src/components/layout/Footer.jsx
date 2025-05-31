import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Heart, Shield, Info } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 mt-12">
      <div className="container-narrow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center font-semibold text-lg text-primary-600 dark:text-primary-400 mb-4">
              <MessageCircle className="w-5 h-5 mr-2" />
              <span>College Confessions</span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              A safe space for college students to share their thoughts, confessions, and stories anonymously.
            </p>
          </div>
          
          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/trending" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                    Trending
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/guidelines" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                    Community Guidelines
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/feedback" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                    Submit Feedback
                  </Link>
                </li>
                <li>
                  <Link to="/report" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                    Report an Issue
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-between mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 sm:mb-0">
            © {new Date().getFullYear()} College Confessions. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-gray-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
              <Shield size={16} />
              <span className="sr-only">Privacy</span>
            </Link>
            <Link to="/about" className="text-gray-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
              <Info size={16} />
              <span className="sr-only">About</span>
            </Link>
            <Link to="/about" className="text-gray-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
              <Heart size={16} />
              <span className="sr-only">Support</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;