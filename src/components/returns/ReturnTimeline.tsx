import { motion } from 'framer-motion';
import { Package, RefreshCw, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Package,
    title: "Initiate Return",
    description: "Contact our support team or use the return portal"
  },
  {
    icon: RefreshCw,
    title: "Process Return",
    description: "Pack items in original packaging with return label"
  },
  {
    icon: CheckCircle,
    title: "Receive Refund",
    description: "Refund processed within 7-14 days of receipt"
  }
];

export default function ReturnTimeline() {
  return (
    <div className="bg-brown-800/50 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold text-brown-100 mb-6">Return Process</h2>
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-brown-700" />
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="relative flex items-start mb-8 last:mb-0"
          >
            <div className="absolute left-0 w-16 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-brown-700 flex items-center justify-center">
                <step.icon className="w-4 h-4 text-brown-300" />
              </div>
            </div>
            <div className="ml-20">
              <h3 className="text-lg font-semibold text-brown-100 mb-1">
                {step.title}
              </h3>
              <p className="text-brown-300">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}