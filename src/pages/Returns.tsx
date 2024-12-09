import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Truck, RefreshCw, HelpCircle } from 'lucide-react';
import ReturnTimeline from '../components/returns/ReturnTimeline';
import PolicySection from '../components/returns/PolicySection';
import FAQSection from '../components/returns/FAQSection';
import SupportChat from '../components/returns/SupportChat';
import ShippingCalculator from '../components/ShippingCalculator';
import ReturnRequestForm from '../components/returns/ReturnRequestForm';
import Navbar from '../components/Navbar';

export default function Returns() {
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const { scrollY } = useScroll();
  const lastScrollY = useState(0);

  useEffect(() => {
    return scrollY.onChange(latest => {
      const currentScroll = latest;
      setIsHeaderVisible(currentScroll <= lastScrollY[0] || currentScroll <= 100);
      setIsHeaderCompact(currentScroll > 100);
      lastScrollY[0] = currentScroll;
    });
  }, [scrollY, lastScrollY]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brown-900 to-brown-800">
      <Navbar />
      <motion.header
        className="fixed top-16 left-0 right-0 z-40 transition-all duration-300"
        animate={{
          height: isHeaderCompact ? '64px' : '200px',
          backgroundColor: isHeaderCompact ? 'rgb(67, 48, 43)' : 'transparent',
          transform: isHeaderVisible ? 'translateY(0)' : 'translateY(-100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <motion.h1 
            className="text-brown-100 font-bold"
            animate={{
              fontSize: isHeaderCompact ? '1.5rem' : '2.5rem',
            }}
          >
            Returns & Exchanges
          </motion.h1>
          <motion.div
            animate={{ opacity: isHeaderCompact ? 0 : 1 }}
            className="text-brown-200"
          >
            Easy returns within 30 days
          </motion.div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-48 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <PolicyCard
            icon={<Truck className="w-8 h-8" />}
            title="Distance-Based Shipping"
            description="Transparent shipping rates based on your location"
          />
          <PolicyCard
            icon={<RefreshCw className="w-8 h-8" />}
            title="30-Day Returns"
            description="Hassle-free returns within 30 days"
          />
          <PolicyCard
            icon={<HelpCircle className="w-8 h-8" />}
            title="24/7 Support"
            description="We're here to help anytime"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ReturnRequestForm />
            <PolicySection
              title="Return Policy"
              content={[
                "Items must be unworn and in original condition",
                "Original packaging required",
                "Proof of purchase necessary",
                "Distance-based shipping fees apply",
                "International returns may incur additional fees"
              ]}
            />

            <PolicySection
              title="Exchange Policy"
              content={[
                "Size exchanges available",
                "Different style exchanges welcome",
                "Price differences will be adjusted",
                "Exchange for store credit available",
                "Multiple exchanges allowed within return window"
              ]}
            />

            <PolicySection
              title="Shipping Policy"
              content={[
                "Base rate ₦3,000 for up to 5km",
                "Additional ₦500 per km beyond 5km",
                "Same-day delivery for orders before 2 PM",
                "Real-time tracking available",
                "Estimated delivery time based on distance"
              ]}
            />

            <ReturnTimeline />
          </div>

          <div className="space-y-8">
            <ShippingCalculator onAddressSelect={(address, fee) => {
              console.log('Selected address:', address, 'Fee:', fee);
            }} />
            <FAQSection />
            <SupportChat />
          </div>
        </div>
      </main>
    </div>
  );
}

function PolicyCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-brown-800/50 p-6 rounded-lg"
    >
      <div className="text-brown-300 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-brown-100 mb-2">{title}</h3>
      <p className="text-brown-300">{description}</p>
    </motion.div>
  );
}