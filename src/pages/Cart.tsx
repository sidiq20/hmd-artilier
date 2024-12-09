import { Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

export default function Cart() {
  const navigate = useNavigate();
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const updateQuantity = useStore((state) => state.updateQuantity);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4 text-brown-800">Your cart is empty</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/shop')}
          className="bg-brown-600 text-white px-6 py-2 rounded-lg hover:bg-brown-700"
        >
          Continue Shopping
        </motion.button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
      <h2 className="text-2xl font-bold mb-8 text-brown-100">Shopping Cart</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cart.map((item) => (
            <motion.div
              key={`${item.id}-${item.selectedSize}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center gap-4 p-4 bg-brown-800/50 rounded-lg mb-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-brown-100">{item.name}</h3>
                <p className="text-brown-300">Size: {item.selectedSize}</p>
                <p className="text-brown-300">₦{item.price.toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(
                        item.id,
                        item.selectedSize,
                        parseInt(e.target.value)
                      )
                    }
                    className="bg-brown-700 border border-brown-600 text-brown-100 rounded p-1 focus:ring-brown-500 focus:border-brown-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFromCart(item.id, item.selectedSize)}
                    className="text-brown-400 hover:text-brown-200"
                  >
                    <Trash2 className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-brown-800/50 p-6 rounded-lg h-fit">
          <h3 className="text-xl font-semibold mb-4 text-brown-100">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-brown-200">
              <span>Subtotal</span>
              <span>₦{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-brown-200">
              <span>Shipping</span>
              <span className="text-brown-300">Calculated at checkout</span>
            </div>
            <div className="border-t border-brown-700 pt-2 mt-2">
              <div className="flex justify-between font-semibold text-brown-100">
                <span>Subtotal</span>
                <span>₦{subtotal.toFixed(2)}</span>
              </div>
              <p className="text-sm text-brown-300 mt-1">
                Shipping fee will be calculated based on your delivery location
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/checkout')}
            className="w-full bg-brown-600 text-white py-3 rounded-lg mt-6 hover:bg-brown-500"
          >
            Proceed to Checkout
          </motion.button>
        </div>
      </div>
    </div>
  );
}