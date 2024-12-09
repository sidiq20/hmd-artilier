import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';
import MapSelector from '../components/MapSelector';
import BackButton from '../components/BackButton';
import OrderConfirmation from '../components/OrderConfirmation';
import ShippingCalculator from '../components/ShippingCalculator';

interface CheckoutFormData {
  name: string;
  phone: string;
  address: string;
}

export default function Checkout() {
  const navigate = useNavigate();
  const cart = useStore((state) => state.cart);
  const clearCart = useStore((state) => state.clearCart);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [shippingFee, setShippingFee] = useState(0);
  const total = subtotal + shippingFee;

  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '',
    phone: '',
    address: '',
  });

  const [showMap, setShowMap] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isPickup, setIsPickup] = useState(false);

  const handleAddressSelect = (address: string, fee: number) => {
    setFormData({ ...formData, address });
    setShippingFee(fee);
    setShowMap(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirmOrder = () => {
    const message = `New Order:\n\n` +
      `Customer Details:\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      `Address: ${formData.address}\n` +
      `Delivery Method: ${isPickup ? 'Pickup' : 'Delivery'}\n\n` +
      `Order Details:\n` +
      cart.map(item => 
        `${item.name} - Size: ${item.selectedSize} - Quantity: ${item.quantity} - ₦${(item.price * item.quantity).toFixed(2)}`
      ).join('\n') +
      `\n\nSubtotal: ₦${subtotal.toFixed(2)}` +
      `\nShipping Fee: ₦${shippingFee.toFixed(2)}` +
      `\nTotal: ₦${total.toFixed(2)}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/YOUR_PHONE_NUMBER?text=${encodedMessage}`;

    clearCart();
    window.open(whatsappUrl, '_blank');
    navigate('/');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16"
    >
      <BackButton />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        <div>
          <h2 className="text-2xl font-bold text-brown-100 mb-6">Delivery Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brown-200">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-brown-700 bg-brown-800/50 text-brown-100 shadow-sm focus:border-brown-500 focus:ring-brown-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brown-200">
                Phone
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1 block w-full rounded-md border-brown-700 bg-brown-800/50 text-brown-100 shadow-sm focus:border-brown-500 focus:ring-brown-500"
              />
            </div>

            <ShippingCalculator onAddressSelect={handleAddressSelect} />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-brown-600 text-white py-3 px-4 rounded-md hover:bg-brown-500 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:ring-offset-2"
            >
              Review Order
            </motion.button>
          </form>
        </div>

        <div className="bg-gradient-to-br from-brown-900 to-brown-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-brown-100 mb-4">Order Summary</h3>
          <div className="space-y-4">
            {cart.map((item) => (
              <motion.div
                key={`${item.id}-${item.selectedSize}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 py-4 border-b border-brown-700"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h4 className="font-medium text-brown-100">{item.name}</h4>
                  <p className="text-sm text-brown-300">
                    Size: {item.selectedSize} | Quantity: {item.quantity}
                  </p>
                  <p className="text-sm font-medium text-brown-200">
                    ₦{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </motion.div>
            ))}
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-brown-200">
                <span>Subtotal</span>
                <span>₦{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-brown-200">
                <span>Shipping</span>
                <span>₦{shippingFee.toFixed(2)}</span>
              </div>
              <div className="border-t border-brown-700 pt-2 mt-2">
                <div className="flex justify-between font-semibold text-brown-100">
                  <span>Total</span>
                  <span>₦{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showConfirmation && (
        <OrderConfirmation
          formData={formData}
          cart={cart}
          total={total}
          shippingFee={shippingFee}
          onConfirm={handleConfirmOrder}
          onEdit={() => setShowConfirmation(false)}
        />
      )}
    </motion.div>
  );
}