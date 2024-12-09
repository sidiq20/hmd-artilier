import { Minus, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  max?: number;
}

export default function QuantitySelector({ quantity, onChange, max = 10 }: QuantitySelectorProps) {
  const handleIncrement = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onChange(quantity - 1);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleDecrement}
        disabled={quantity <= 1}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-brown-700 text-brown-100 hover:bg-brown-600 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Decrease quantity"
      >
        <Minus className="w-4 h-4" />
      </motion.button>

      <input
        type="number"
        min="1"
        max={max}
        value={quantity}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          if (value >= 1 && value <= max) {
            onChange(value);
          }
        }}
        className="w-16 text-center rounded-md border-2 border-brown-700 bg-white text-black font-medium text-lg py-1 focus:ring-2 focus:ring-brown-500 focus:border-brown-500"
        aria-label="Quantity"
      />

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleIncrement}
        disabled={quantity >= max}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-brown-700 text-brown-100 hover:bg-brown-600 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4" />
      </motion.button>
    </div>
  );
}