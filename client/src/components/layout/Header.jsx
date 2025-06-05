import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { Button } from '../ui/button';
import { Search, MessageCircle, Moon, Sun, Menu } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../store/useUser';

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const user = useUser((state) => state.user);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 bg-white/75 dark:bg-gray-900/75 transition-colors duration-300">
      <div className="container-narrow h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link 
            to="/" 
            className="flex items-center mr-6 font-semibold text-lg text-primary-600 dark:text-primary-400"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            <span className="hidden sm:inline">College Confessions</span>
            <span className="sm:hidden">Confessions</span>
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link 
              to="/" 
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
                location.pathname === "/" ? "text-primary-600 dark:text-primary-400" : "text-gray-700 dark:text-gray-300"
              )}
            >
              Home
            </Link>
            <Link 
              to="/trending" 
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
                location.pathname === "/trending" ? "text-primary-600 dark:text-primary-400" : "text-gray-700 dark:text-gray-300"
              )}
            >
              Trending
            </Link>
            <Link 
              to="/about" 
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
                location.pathname === "/about" ? "text-primary-600 dark:text-primary-400" : "text-gray-700 dark:text-gray-300"
              )}
            >
              About
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-2">
          <div className="hidden sm:flex">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="input pl-9 h-9 w-[180px] lg:w-[240px]"
              />
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>

          {/* if user is logged in then show circle with logged in user's username's first character */}

          {user?.fullname != "" ? <div className='w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center'>{user.fullname.charAt(0)}</div> : <Button
            variant="primary"
            size="sm"
            className="hidden sm:flex"
            onClick={()=> window.location.href = '/auth'
            }
          >
            Log In
          </Button>}
          
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 animate-slide-up">
          <nav className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
                location.pathname === "/" ? "text-primary-600 dark:text-primary-400" : "text-gray-700 dark:text-gray-300"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/trending" 
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
                location.pathname === "/trending" ? "text-primary-600 dark:text-primary-400" : "text-gray-700 dark:text-gray-300"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Trending
            </Link>
            <Link 
              to="/about" 
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
                location.pathname === "/about" ? "text-primary-600 dark:text-primary-400" : "text-gray-700 dark:text-gray-300"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="input pl-9 h-9 w-full"
              />
            </div>
            <Button 
              variant="primary"
              size="sm"
              className="mt-2"
            >
              Log In
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;