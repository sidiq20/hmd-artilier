import { motion } from 'framer-motion';

interface PolicySectionProps {
  title: string;
  content: string[];
}

export default function PolicySection({ title, content }: PolicySectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-brown-800/50 p-6 rounded-lg"
    >
      <h2 className="text-3xl font-bold text-brown-100 mb-8">{title}</h2>
      <ul className="space-y-3">
        {content.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center text-brown-200"
          >
            <span className="w-2 h-2 bg-brown-500 rounded-full mr-3" />
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}