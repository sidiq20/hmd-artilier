import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate(-1)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 text-brown-600 hover:text-brown-800 px-4 py-2 rounded-lg"
    >
      <ArrowLeft className="h-5 w-5" />
      <span>Back</span>
    </motion.button>
  );
}