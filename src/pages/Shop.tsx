import { useState } from 'react';
import { Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const categories = ['All', 'Casual', 'Formal', 'belt'];
const genders = ['All', 'Male', 'Female', 'Unisex'];

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' ||
      product.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesGender =
      selectedGender === 'All' ||
      product.gender.toLowerCase() === selectedGender.toLowerCase();

    return matchesSearch && matchesCategory && matchesGender;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search shoes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-brown-300 focus:outline-none focus:ring-2 focus:ring-brown-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-brown-400" />
        </div>

        <div className="mt-4 space-y-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === category
                    ? 'bg-brown-600 text-white'
                    : 'bg-brown-100 text-brown-700 hover:bg-brown-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {genders.map((gender) => (
              <button
                key={gender}
                onClick={() => setSelectedGender(gender)}
                className={`px-4 py-2 rounded-full ${
                  selectedGender === gender
                    ? 'bg-brown-600 text-white'
                    : 'bg-brown-100 text-brown-700 hover:bg-brown-200'
                }`}
              >
                {gender}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}