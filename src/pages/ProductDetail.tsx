import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useStore } from '../store/useStore';
import { products } from '../data/products';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import BackButton from '../components/BackButton';
import SizeSelector from '../components/SizeSelector';
import QuantitySelector from '../components/QuantitySelector';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [customSize, setCustomSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  
  const product = products.find((p) => p.id === Number(id));
  const addToCart = useStore((state) => state.addToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const wishlist = useStore((state) => state.wishlist);

  if (!product) {
    return <div>Product not found</div>;
  }

  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    const size = selectedSize === 'custom' ? customSize : selectedSize;
    if (!size) {
      toast.error('Please select a size');
      return;
    }
    
    for (let i = 0; i < quantity; i++) {
      addToCart(product, size);
    }
    toast.success('Added to cart!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
      <BackButton />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-brown-100">{product.name}</h1>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleWishlist(product)}
              className="p-2 hover:bg-brown-700/50 rounded-full"
            >
              <Heart
                className={`h-6 w-6 ${
                  isInWishlist ? 'fill-brown-500 stroke-brown-500' : 'stroke-brown-400'
                }`}
              />
            </motion.button>
          </div>

          <p className="mt-4 text-2xl text-brown-200">₦{product.price.toFixed(2)}</p>

          <div className="mt-8">
            <SizeSelector
              selectedSize={selectedSize}
              onChange={setSelectedSize}
              onCustomSize={setCustomSize}
            />
          </div>

          <div className="mt-8">
            <label className="block text-lg font-medium text-brown-100 mb-4">
              Quantity
            </label>
            <QuantitySelector
              quantity={quantity}
              onChange={setQuantity}
            />
          </div>

          {/* <div className="mt-8">
            <h2 className="text-lg font-medium text-brown-100 mb-2">Description</h2>
            <p className="text-brown-300">{product.description}</p>
          </div> */}

          <div className="mt-8 space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="w-full bg-brown-600 text-white py-3 px-8 rounded-lg hover:bg-brown-500 transition-colors"
            >
              Add to Cart
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/cart')}
              className="w-full bg-brown-800 text-white py-3 px-8 rounded-lg hover:bg-brown-700 transition-colors"
            >
              Go to Cart
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}