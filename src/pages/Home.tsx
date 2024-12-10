import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const slides = [
  {
    image: "assets/home1.jpg",
    title: "Premium Artisan Footwear",
    description: "Handcrafted excellence for the modern individual"
  },
  {
    image: "assets/home31.jpg",
    title: "Exclusive Collections",
    description: "Where style meets craftsmanship"
  },
  {
    image: "assets/home24.jpg",
    title: "Bespoke Designs",
    description: "Your unique style, our expertise"
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="mt-16">
      {/* Hero Carousel */}
      <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl md:text-2xl mb-8">{slide.description}</p>
                <Link
                  to="/shop"
                  className="bg-brown-600 text-white px-8 py-3 rounded-lg hover:bg-brown-700 transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors"
        >
          <ArrowRight className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Featured Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-brown-800">Our Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative h-96 group overflow-hidden rounded-lg">
            <img
              src="assets/home35.jpg"
              alt="Men's Collection"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Link
                to="/shop"
                className="text-white text-2xl font-bold hover:underline"
              >
                Men's Collection
              </Link>
            </div>
          </div>
          <div className="relative h-96 group overflow-hidden rounded-lg">
            <img
              src="assets/home1.jpg"
              alt="Women's Collection"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Link
                to="/shop"
                className="text-white text-2xl font-bold hover:underline"
              >
                Women's Collection
              </Link>
            </div>
          </div>
          <div className="relative h-96 group overflow-hidden rounded-lg">
            <img
              src="assets/home27.jpg"
              alt="Limited Edition"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Link
                to="/shop"
                className="text-white text-2xl font-bold hover:underline"
              >
                Unisex Edition
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}