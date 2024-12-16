import { useState } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import SocialIcons from '../components/SocialIcons';

// TODO: Replace these with your EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_05anwes';
const EMAILJS_TEMPLATE_ID = 'template_7p6mz8v';
const EMAILJS_PUBLIC_KEY = '7Nzktq5nQu-X4cmOu';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
      <div className="max-w-2xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-8 text-brown-100"
        >
          Contact Us
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-brown-900 to-brown-800 shadow-lg rounded-lg p-6 md:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-brown-200">
                Name
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
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-brown-700 bg-brown-800/50 text-brown-100 shadow-sm focus:border-brown-500 focus:ring-brown-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brown-200">
                Message
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="mt-1 block w-full rounded-md border-brown-700 bg-brown-800/50 text-brown-100 shadow-sm focus:border-brown-500 focus:ring-brown-500"
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-brown-600 text-white py-3 px-4 rounded-md hover:bg-brown-500 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </form>

          <div className="mt-8 border-t border-brown-700 pt-8">
            <h3 className="text-lg font-semibold mb-4 text-brown-200">Other Ways to Reach Us</h3>
            <div className="space-y-4 text-brown-300">
              <div>
                <p className="font-medium text-brown-200">Email</p>
                <p>support@hmdartiler.com</p>
              </div>
              <div>
                <p className="font-medium text-brown-200">Phone</p>
                <p>+234 XXX XXX XXXX</p>
              </div>
              <div>
                <p className="font-medium text-brown-200">Address</p>
                <p>
                  123 Fashion Avenue
                  <br />
                  Lagos, Nigeria
                </p>
              </div>
              <div className="pt-4">
                <p className="font-medium text-brown-200 mb-2">Follow Us</p>
                <SocialIcons />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}