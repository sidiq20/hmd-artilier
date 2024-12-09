import { motion } from 'framer-motion';
import { Truck, RefreshCw, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brown-900 to-brown-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Brand Story */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h1 className="text-4xl font-bold text-brown-100 text-center mb-8">About HMD ARTILER</h1>
          <div className="prose prose-lg max-w-none text-brown-200">
            <p className="mb-6">
              HMD ARTILER was founded with a singular vision: to create exceptional footwear that combines traditional craftsmanship with contemporary design. Our journey began with a deep appreciation for the art of shoemaking and a commitment to quality that remains unwavering to this day.
            </p>
            <p className="mb-6">
              Each pair of HMD ARTILER shoes is a testament to our dedication to excellence. Our artisans combine time-honored techniques with modern innovation to create footwear that's not just worn, but experienced.
            </p>
          </div>
        </motion.section>

        {/* Values */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-brown-100 mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-brown-800/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-brown-100 mb-4">Quality</h3>
              <p className="text-brown-200">
                We never compromise on materials or craftsmanship, ensuring each pair meets our exacting standards.
              </p>
            </div>
            <div className="bg-brown-800/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-brown-100 mb-4">Innovation</h3>
              <p className="text-brown-200">
                Constantly pushing boundaries to create footwear that combines style with cutting-edge comfort.
              </p>
            </div>
            <div className="bg-brown-800/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-brown-100 mb-4">Sustainability</h3>
              <p className="text-brown-200">
                Committed to responsible practices that minimize our environmental impact.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Customer Support */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-brown-100 mb-8">Customer Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              to="/returns"
              className="bg-brown-800/50 p-6 rounded-lg hover:bg-brown-700/50 transition-colors"
            >
              <RefreshCw className="w-8 h-8 text-brown-300 mb-4" />
              <h3 className="text-xl font-semibold text-brown-100 mb-2">Returns & Exchanges</h3>
              <p className="text-brown-200">
                Learn about our hassle-free return and exchange policies.
              </p>
            </Link>
            <div className="bg-brown-800/50 p-6 rounded-lg">
              <HelpCircle className="w-8 h-8 text-brown-300 mb-4" />
              <h3 className="text-xl font-semibold text-brown-100 mb-2">FAQ</h3>
              <p className="text-brown-200">
                Find answers to commonly asked questions about our products and services.
              </p>
            </div>
            <div className="bg-brown-800/50 p-6 rounded-lg">
              <Truck className="w-8 h-8 text-brown-300 mb-4" />
              <h3 className="text-xl font-semibold text-brown-100 mb-2">Shipping</h3>
              <p className="text-brown-200">
                Information about delivery times and shipping methods.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Contact Information */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-brown-100 mb-8">Visit Us</h2>
          <div className="bg-brown-800/50 p-6 rounded-lg">
            <p className="text-brown-200 mb-2">
              <strong className="text-brown-100">Address:</strong><br />
              123 Fashion Avenue<br />
              Lagos, Nigeria
            </p>
            <p className="text-brown-200 mb-2">
              <strong className="text-brown-100">Hours:</strong><br />
              Monday - Saturday: 9:00 AM - 8:00 PM<br />
              Sunday: 10:00 AM - 6:00 PM
            </p>
            <p className="text-brown-200">
              <strong className="text-brown-100">Contact:</strong><br />
              Phone: +234 XXX XXX XXXX<br />
              Email: support@hmdartiler.com
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
}