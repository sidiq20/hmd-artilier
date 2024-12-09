import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const navigate = useNavigate();
  const wishlist = useStore((state) => state.wishlist);

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4 text-brown-800">Your wishlist is empty</h2>
        <button
          onClick={() => navigate('/shop')}
          className="bg-brown-600 text-white px-6 py-2 rounded-lg hover:bg-brown-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
      <h2 className="text-2xl font-bold mb-8 text-brown-800">My Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}