import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "How long do I have to return an item?",
    answer: "You have 30 days from the delivery date to return your items. The return process must be initiated within this timeframe."
  },
  {
    question: "Is there a return shipping fee?",
    answer: "Returns within Lagos are free. For locations outside Lagos, shipping fees are calculated based on distance: ₦3,000 base rate for up to 5km, and ₦500 per additional kilometer."
  },
  {
    question: "What condition should returns be in?",
    answer: "Items must be unworn, unwashed, and in original packaging with all tags attached. Any signs of wear, damage, or missing packaging may result in the return being rejected."
  },
  {
    question: "How long until I receive my refund?",
    answer: "Refunds are processed within 7-14 business days of receiving your return. The refund will be issued to the original payment method used for the purchase."
  },
  {
    question: "Can I exchange for a different size?",
    answer: "Yes, size exchanges are free and can be processed immediately. Simply initiate a return and select 'Exchange' as your preferred option. New size availability is subject to stock."
  },
  {
    question: "What is the delivery time estimate?",
    answer: "Delivery time is calculated based on distance. We estimate 1 hour per 10km of distance. For example, a 20km delivery would take approximately 2 hours."
  },
  {
    question: "Do you offer same-day delivery?",
    answer: "Yes, we offer same-day delivery for orders placed before 2 PM within Lagos. Delivery time depends on your location and current order volume."
  },
  {
    question: "How do I track my return?",
    answer: "Once your return is initiated, you'll receive a tracking number via email. You can use this number on our website or contact customer support for status updates."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-brown-800/50 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold text-brown-100 mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full text-left p-4 bg-brown-700/50 rounded-lg hover:bg-brown-700/70 transition-colors"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-brown-100">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-brown-300" />
                </motion.div>
              </div>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-2 text-brown-300 leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}