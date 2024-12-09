import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Product } from '../types';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

interface WishlistButtonProps {
  product: Product;
  className?: string;
}

export default function WishlistButton({ product, className = '' }: WishlistButtonProps) {
  const wishlist = useStore((state) => state.wishlist);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'w' && !event.ctrlKey && !event.metaKey) {
        toggleWishlist(product);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [product, toggleWishlist]);

  const handleToggle = () => {
    toggleWishlist(product);
    toast.success(
      isInWishlist ? 'Removed from wishlist' : 'Added to wishlist',
      {
        icon: isInWishlist ? '💔' : '❤️',
        duration: 2000,
        className: 'bg-brown-50 text-brown-900',
      }
    );
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleToggle}
      className={`p-2 hover:bg-brown-700/50 rounded-full focus:outline-none focus:ring-2 focus:ring-brown-500 focus:ring-offset-2 ${className}`}
      aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <motion.div
        initial={false}
        animate={isInWishlist ? { scale: [1, 1.2, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Heart
          className={`h-6 w-6 transition-colors ${
            isInWishlist ? 'fill-brown-500 stroke-brown-500' : 'stroke-brown-400'
          }`}
        />
      </motion.div>
    </motion.button>
  );
}