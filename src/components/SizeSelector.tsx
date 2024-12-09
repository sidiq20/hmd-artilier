import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { useState } from 'react';

interface SizeSelectorProps {
  selectedSize: string;
  onChange: (size: string) => void;
  onCustomSize?: (size: string) => void;
}

export default function SizeSelector({ selectedSize, onChange, onCustomSize }: SizeSelectorProps) {
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [customSize, setCustomSize] = useState('');

  const standardSizes = Array.from({ length: 10 }, (_, i) => (36 + i).toString());

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-lg font-medium text-brown-100">Select Size</label>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowSizeGuide(!showSizeGuide)}
          className="flex items-center space-x-1 text-brown-400 hover:text-brown-200"
        >
          <Info className="w-4 h-4" />
          <span className="text-sm">Size Guide</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {standardSizes.map((size) => (
          <motion.button
            key={size}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(size)}
            className={`py-2 rounded-lg border-2 ${
              selectedSize === size
                ? 'border-brown-500 bg-brown-500 text-white'
                : 'border-brown-700 bg-white text-black hover:border-brown-500'
            } font-medium transition-colors`}
          >
            {size}
          </motion.button>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Custom size"
          value={customSize}
          onChange={(e) => {
            setCustomSize(e.target.value);
            if (onCustomSize) {
              onCustomSize(e.target.value);
            }
          }}
          className="flex-1 px-3 py-2 rounded-lg border-2 border-brown-700 bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-brown-500 focus:border-brown-500"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange('custom')}
          className={`px-4 py-2 rounded-lg ${
            selectedSize === 'custom'
              ? 'bg-brown-500 text-white'
              : 'bg-brown-700 text-brown-100 hover:bg-brown-600'
          }`}
        >
          Use Custom
        </motion.button>
      </div>

      {showSizeGuide && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-brown-800 rounded-lg"
        >
          <h4 className="font-medium text-brown-100 mb-2">Size Guide</h4>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-brown-300">
                <th className="py-2">EU</th>
                <th className="py-2">UK</th>
                <th className="py-2">US (Men)</th>
                <th className="py-2">US (Women)</th>
              </tr>
            </thead>
            <tbody className="text-brown-100">
              <tr>
                <td className="py-1 text-center">36</td>
                <td className="py-1 text-center">3.5</td>
                <td className="py-1 text-center">4</td>
                <td className="py-1 text-center">5.5</td>
              </tr>
              <tr>
                <td className="py-1 text-center">37</td>
                <td className="py-1 text-center">4.5</td>
                <td className="py-1 text-center">5</td>
                <td className="py-1 text-center">6.5</td>
              </tr>
              {/* Add more size conversions as needed */}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}