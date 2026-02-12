import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Home, BookMarked, PlusCircle, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const scrollingUp = currentY < lastScrollY.current;
      const nearTop = currentY < 24;

      setIsVisible(scrollingUp || nearTop);
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home, show: true },
    { name: 'Books', path: '/books', icon: BookOpen, show: true },
    { name: 'My Issues', path: '/my-issues', icon: BookMarked, show: !isAdmin() },
    { name: 'Add Book', path: '/add-book', icon: PlusCircle, show: isAdmin() },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -96 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="glass-effect sticky top-0 z-50 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl flex items-center justify-center"
            >
              <BookOpen className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-2xl font-display font-bold gradient-text text-white">
              BookVerse
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.filter(item => item.show).map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative px-4 py-2 rounded-lg transition-colors group"
                >
                  <div className="flex items-center space-x-2">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-primary-400' : 'text-gray-400 group-hover:text-white'}`} />
                    <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                      {item.name}
                    </span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-purple-600"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="hidden md:flex items-center space-x-3 px-4 py-2 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{user?.name}</p>
                <p className="text-xs text-gray-400">{user?.role}</p>
              </div>
            </button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="p-2 hover:bg-red-500/10 rounded-lg transition-colors group"
            >
              <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
