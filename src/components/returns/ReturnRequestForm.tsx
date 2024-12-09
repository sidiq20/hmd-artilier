import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Calendar, MessageSquare, RefreshCw, CreditCard } from 'lucide-react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { generateReturnReference } from '../../utils/reference';

interface ReturnRequest {
  photos: File[];
  receipt: File | null;
  purchaseDate: string;
  orderNumber: string;
  contactMethod: 'whatsapp' | 'email';
  contactValue: string;
  reason: string;
  solution: 'exchange' | 'credit' | 'refund';
}

export default function ReturnRequestForm() {
  const [formData, setFormData] = useState<ReturnRequest>({
    photos: [],
    receipt: null,
    purchaseDate: '',
    orderNumber: '',
    contactMethod: 'whatsapp',
    contactValue: '',
    reason: '',
    solution: 'exchange',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'photos' | 'receipt') => {
    const files = e.target.files;
    if (!files) return;

    if (type === 'photos') {
      setFormData(prev => ({
        ...prev,
        photos: [...Array.from(files)],
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        receipt: files[0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const returnReference = generateReturnReference();
      
      // Convert images to base64
      const photoPromises = formData.photos.map(photo => 
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(photo);
        })
      );

      const receiptPromise = formData.receipt ? 
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(formData.receipt!);
        }) : Promise.resolve(null);

      const [photoBase64s, receiptBase64] = await Promise.all([
        Promise.all(photoPromises),
        receiptPromise
      ]);

      // Send email using EmailJS
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          to_email: formData.contactMethod === 'email' ? formData.contactValue : '',
          return_reference: returnReference,
          order_number: formData.orderNumber,
          purchase_date: formData.purchaseDate,
          reason: formData.reason,
          solution: formData.solution,
          photos: photoBase64s,
          receipt: receiptBase64,
          contact_method: formData.contactMethod,
          contact_value: formData.contactValue
        },
        'YOUR_PUBLIC_KEY'
      );

      toast.success('Return request submitted successfully!');
      // Reset form
      setFormData({
        photos: [],
        receipt: null,
        purchaseDate: '',
        orderNumber: '',
        contactMethod: 'whatsapp',
        contactValue: '',
        reason: '',
        solution: 'exchange',
      });
    } catch (error) {
      toast.error('Failed to submit return request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate if the purchase date is within 14 days
  const isWithinReturnWindow = (date: string) => {
    const purchaseDate = new Date(date);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - purchaseDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 14;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-brown-800/50 p-6 rounded-lg"
    >
      <h2 className="text-2xl font-semibold text-brown-100 mb-6">Return Request Form</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-brown-200 mb-2">
            Product Photos
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-brown-700 border-dashed rounded-lg cursor-pointer bg-brown-800/30 hover:bg-brown-800/50">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-brown-500" />
                <p className="text-sm text-brown-300">
                  Click to upload product photos
                </p>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, 'photos')}
                required
              />
            </label>
          </div>
          {formData.photos.length > 0 && (
            <div className="mt-2 flex gap-2 overflow-x-auto">
              {formData.photos.map((photo, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(photo)}
                  alt={`Product photo ${index + 1}`}
                  className="h-20 w-20 object-cover rounded-lg"
                />
              ))}
            </div>
          )}
        </div>

        {/* Receipt Upload */}
        <div>
          <label className="block text-sm font-medium text-brown-200 mb-2">
            Purchase Receipt
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-brown-700 border-dashed rounded-lg cursor-pointer bg-brown-800/30 hover:bg-brown-800/50">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-brown-500" />
                <p className="text-sm text-brown-300">
                  Click to upload receipt (PDF or Image)
                </p>
              </div>
              <input
                type="file"
                accept=".pdf,image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, 'receipt')}
                required
              />
            </label>
          </div>
          {formData.receipt && (
            <p className="mt-2 text-sm text-brown-300">
              Selected file: {formData.receipt.name}
            </p>
          )}
        </div>

        {/* Purchase Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-brown-200 mb-2">
              Purchase Date
            </label>
            <input
              type="date"
              value={formData.purchaseDate}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                purchaseDate: e.target.value
              }))}
              max={new Date().toISOString().split('T')[0]}
              required
              className="mt-1 block w-full rounded-md border-brown-700 bg-brown-800/50 text-brown-100 shadow-sm focus:border-brown-500 focus:ring-brown-500"
            />
            {formData.purchaseDate && !isWithinReturnWindow(formData.purchaseDate) && (
              <p className="mt-1 text-red-500 text-sm">
                Returns must be requested within 14 days of purchase
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-brown-200 mb-2">
              Order Number
            </label>
            <input
              type="text"
              value={formData.orderNumber}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                orderNumber: e.target.value
              }))}
              required
              placeholder="Found on your receipt"
              className="mt-1 block w-full rounded-md border-brown-700 bg-brown-800/50 text-brown-100 shadow-sm focus:border-brown-500 focus:ring-brown-500"
            />
          </div>
        </div>

        {/* Contact Method */}
        <div>
          <label className="block text-sm font-medium text-brown-200 mb-2">
            Preferred Contact Method
          </label>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button
              type="button"
              onClick={() => setFormData(prev => ({
                ...prev,
                contactMethod: 'whatsapp'
              }))}
              className={`p-3 rounded-lg flex items-center justify-center gap-2 ${
                formData.contactMethod === 'whatsapp'
                  ? 'bg-brown-600 text-white'
                  : 'bg-brown-800/50 text-brown-300'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              WhatsApp
            </button>
            <button
              type="button"
              onClick={() => setFormData(prev => ({
                ...prev,
                contactMethod: 'email'
              }))}
              className={`p-3 rounded-lg flex items-center justify-center gap-2 ${
                formData.contactMethod === 'email'
                  ? 'bg-brown-600 text-white'
                  : 'bg-brown-800/50 text-brown-300'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              Email
            </button>
          </div>
          <input
            type={formData.contactMethod === 'email' ? 'email' : 'tel'}
            value={formData.contactValue}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              contactValue: e.target.value
            }))}
            required
            placeholder={formData.contactMethod === 'email' ? 'Your email address' : 'Your WhatsApp number'}
            className="mt-1 block w-full rounded-md border-brown-700 bg-brown-800/50 text-brown-100 shadow-sm focus:border-brown-500 focus:ring-brown-500"
          />
        </div>

        {/* Return Reason */}
        <div>
          <label className="block text-sm font-medium text-brown-200 mb-2">
            Reason for Return/Exchange
          </label>
          <textarea
            value={formData.reason}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              reason: e.target.value
            }))}
            required
            maxLength={200}
            rows={3}
            className="mt-1 block w-full rounded-md border-brown-700 bg-brown-800/50 text-brown-100 shadow-sm focus:border-brown-500 focus:ring-brown-500"
          />
          <p className="mt-1 text-sm text-brown-300">
            {formData.reason.length}/200 characters
          </p>
        </div>

        {/* Preferred Solution */}
        <div>
          <label className="block text-sm font-medium text-brown-200 mb-2">
            Preferred Solution
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setFormData(prev => ({
                ...prev,
                solution: 'exchange'
              }))}
              className={`p-3 rounded-lg flex items-center justify-center gap-2 ${
                formData.solution === 'exchange'
                  ? 'bg-brown-600 text-white'
                  : 'bg-brown-800/50 text-brown-300'
              }`}
            >
              <RefreshCw className="w-5 h-5" />
              Exchange Item
            </button>
            <button
              type="button"
              onClick={() => setFormData(prev => ({
                ...prev,
                solution: 'credit'
              }))}
              className={`p-3 rounded-lg flex items-center justify-center gap-2 ${
                formData.solution === 'credit'
                  ? 'bg-brown-600 text-white'
                  : 'bg-brown-800/50 text-brown-300'
              }`}
            >
              <CreditCard className="w-5 h-5" />
              Store Credit
            </button>
            <button
              type="button"
              onClick={() => setFormData(prev => ({
                ...prev,
                solution: 'refund'
              }))}
              className={`p-3 rounded-lg flex items-center justify-center gap-2 ${
                formData.solution === 'refund'
                  ? 'bg-brown-600 text-white'
                  : 'bg-brown-800/50 text-brown-300'
              }`}
            >
              <RefreshCw className="w-5 h-5" />
              Refund
            </button>
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting || (formData.purchaseDate && !isWithinReturnWindow(formData.purchaseDate))}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-brown-600 text-white py-3 px-4 rounded-lg hover:bg-brown-500 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Return Request'}
        </motion.button>
      </form>
    </motion.div>
  );
}