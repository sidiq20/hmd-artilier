import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send } from 'lucide-react';

export default function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement chat functionality
    setMessage('');
  };

  return (
    <motion.div className="fixed bottom-4 right-4 z-40">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-brown-600 text-white p-4 rounded-full shadow-lg"
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-80 bg-brown-800 rounded-lg shadow-xl overflow-hidden"
          >
            <div className="p-4 bg-brown-700">
              <h3 className="text-lg font-semibold text-brown-100">
                Customer Support
              </h3>
              <p className="text-sm text-brown-300">
                We typically reply within minutes
              </p>
            </div>

            <div className="h-64 p-4 overflow-y-auto">
              {/* Chat messages would go here */}
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t border-brown-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 bg-brown-700 text-brown-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="p-2 bg-brown-600 text-white rounded-lg"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}