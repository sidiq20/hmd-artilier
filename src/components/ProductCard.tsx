import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import WishlistButton from './WishlistButton';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileHover={{ y: -5 }}
      className="bg-gradient-to-br from-brown-900 to-brown-800 rounded-lg shadow-md overflow-hidden"
    >
      <Link to={`/product/${product.id}`} className="block relative">
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={product.image}
            // alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute top-2 left-2 bg-brown-600 text-white px-2 py-1 rounded-full text-xs">
            Only {product.stock} left
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs">
            Out of Stock
          </span>
        )}
      </Link>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            {/* <h3 className="text-lg font-semibold text-brown-100 line-clamp-2">
              {product.name}
            </h3> */}
            <p className="text-brown-300">₦{product.price.toFixed(2)}</p>
          </div>
          <WishlistButton product={product} />
        </div>

        <div className="mt-4">
          <Link
            to={`/product/${product.id}`}
            className="w-full bg-brown-600 text-white py-2 rounded-lg hover:bg-brown-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>View Details</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}