import { ShoppingCart, Heart, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { useStore } from '../store/useStore';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const cart = useStore((state) => state.cart);
  const wishlist = useStore((state) => state.wishlist);
  const location = useLocation();
  const { scrollY } = useScroll();

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 0);
    });
  }, [scrollY]);

  return (
    <motion.nav
      className="fixed w-full z-50 top-0 transition-colors duration-300"
      animate={{
        backgroundColor: isScrolled ? 'transparent' : 'rgb(67, 48, 43)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-brown-100">HMD ATELIER</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/shop" 
              className="text-brown-200 hover:text-brown-100 transition-colors"
            >
              Shop
            </Link>
            <Link 
              to="/about" 
              className="text-brown-200 hover:text-brown-100 transition-colors"
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-brown-200 hover:text-brown-100 transition-colors"
            >
              Contact
            </Link>
            <Link to="/wishlist" className="text-brown-200 hover:text-brown-100 relative">
              <Heart className="h-6 w-6" />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-brown-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="text-brown-200 hover:text-brown-100 relative">
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brown-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-brown-200 hover:text-brown-100 hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brown-500"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-brown-800"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/shop"
              className="block px-3 py-2 rounded-md text-base font-medium text-brown-200 hover:text-brown-100 hover:bg-brown-700"
              onClick={() => setIsOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-brown-200 hover:text-brown-100 hover:bg-brown-700"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-brown-200 hover:text-brown-100 hover:bg-brown-700"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/wishlist"
              className="block px-3 py-2 rounded-md text-base font-medium text-brown-200 hover:text-brown-100 hover:bg-brown-700"
              onClick={() => setIsOpen(false)}
            >
              Wishlist ({wishlist.length})
            </Link>
            <Link
              to="/cart"
              className="block px-3 py-2 rounded-md text-base font-medium text-brown-200 hover:text-brown-100 hover:bg-brown-700"
              onClick={() => setIsOpen(false)}
            >
              Cart ({cartItemsCount})
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}