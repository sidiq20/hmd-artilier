import { motion } from 'framer-motion';
import { CartItem } from '../types';

interface OrderConfirmationProps {
  formData: {
    name: string;
    phone: string;
    address: string;
  };
  cart: CartItem[];
  total: number;
  shippingFee: number;
  onConfirm: () => void;
  onEdit: () => void;
}

export default function OrderConfirmation({
  formData,
  cart,
  total,
  shippingFee,
  onConfirm,
  onEdit,
}: OrderConfirmationProps) {
  const subtotal = total - shippingFee;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-gradient-to-br from-brown-900 to-brown-800 text-brown-50 p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold mb-6 text-brown-100">Confirm Your Order</h2>
        
        <div className="space-y-6">
          <div className="bg-brown-800/50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-brown-200">Delivery Details</h3>
            <div className="space-y-2 text-brown-100">
              <p><span className="text-brown-400">Name:</span> {formData.name}</p>
              <p><span className="text-brown-400">Phone:</span> {formData.phone}</p>
              <p><span className="text-brown-400">Address:</span> {formData.address}</p>
            </div>
          </div>

          <div className="bg-brown-800/50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-brown-200">Order Summary</h3>
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between text-brown-100">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-brown-400">
                      Size: {item.selectedSize} × {item.quantity}
                    </p>
                  </div>
                  <p className="text-brown-200">₦{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-brown-700">
              <div className="flex justify-between text-brown-100">
                <span>Subtotal</span>
                <span>₦{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-brown-100">
                <span>Shipping</span>
                <span>₦{shippingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold mt-2 text-brown-50">
                <span>Total</span>
                <span>₦{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onEdit}
            className="flex-1 px-4 py-2 bg-brown-700 text-brown-100 rounded-lg hover:bg-brown-600 transition-colors"
          >
            Edit Order
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-brown-500 text-white rounded-lg hover:bg-brown-400 transition-colors"
          >
            Confirm Order
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}