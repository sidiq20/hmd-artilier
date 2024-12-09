import { Facebook, Instagram, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SocialIcons() {
  const iconVariants = {
    hover: { scale: 1.2, rotate: 5 },
    tap: { scale: 0.95 }
  };

  return (
    <div className="flex space-x-4">
      <motion.a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        variants={iconVariants}
        whileHover="hover"
        whileTap="tap"
        className="text-brown-600 hover:text-brown-800"
      >
        <Facebook className="h-6 w-6" />
      </motion.a>
      <motion.a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        variants={iconVariants}
        whileHover="hover"
        whileTap="tap"
        className="text-brown-600 hover:text-brown-800"
      >
        <Instagram className="h-6 w-6" />
      </motion.a>
      <motion.a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        variants={iconVariants}
        whileHover="hover"
        whileTap="tap"
        className="text-brown-600 hover:text-brown-800"
      >
        <Twitter className="h-6 w-6" />
      </motion.a>
    </div>
  );
}