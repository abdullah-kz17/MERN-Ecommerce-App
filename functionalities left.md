featured products functionality left *
optimizations left *
light/dark mode to all components *
reviews/ratings *
debounce *
update profile *
searching 
pagination 
skelton **
getState working in redux *
addMatcher *
axiosInstance *
separate thunk and slices *
delete order *
compression middleware

import React, { useState, useEffect } from 'react';
import { Activity, Zap, Clock, Cloud, Sun, Moon } from 'lucide-react';

const Loader = () => {
const [progress, setProgress] = useState(0);
const [currentIcon, setCurrentIcon] = useState(0);

// Icons that will rotate through the animation
const icons = [
<Zap className="text-amber-500 dark:text-amber-400" />,
<Activity className="text-red-500 dark:text-red-400" />,
<Clock className="text-blue-500 dark:text-blue-400" />,
<Cloud className="text-purple-500 dark:text-purple-400" />,
<Sun className="text-yellow-500 dark:text-yellow-400" />,
<Moon className="text-indigo-500 dark:text-indigo-400" />
];

// Animation effects
useEffect(() => {
const timer = setInterval(() => {
setProgress(prevProgress => {
if (prevProgress >= 100) {
return 0;
}
return prevProgress + 1;
});
}, 30);

    const iconTimer = setInterval(() => {
      setCurrentIcon(prev => (prev + 1) % icons.length);
    }, 800);

    return () => {
      clearInterval(timer);
      clearInterval(iconTimer);
    };
}, []);

return (
<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
<div className="relative w-64 h-64">
{/* Orbiting particles */}
<div className="absolute inset-0 flex items-center justify-center">
{[...Array(12)].map((_, i) => (
<div
key={i}
className="absolute w-3 h-3 rounded-full"
style={{
backgroundColor: `hsl(${(i * 30) % 360}, 80%, 60%)`,
transform: `rotate(${i * 30}deg) translateY(-24px)`,
animation: `orbit 3s infinite linear, pulse 2s infinite ease-in-out ${i * 0.1}s`
}}
/>
))}
</div>

          {/* Pulsing center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-24 h-24 rounded-full bg-white dark:bg-gray-700 shadow-xl flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 dark:from-blue-500 dark:to-purple-600 opacity-20 animate-pulse" />

              {/* Progress circle */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                    cx="50%"
                    cy="50%"
                    r="40%"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="text-blue-500 dark:text-blue-400"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
                    style={{ transition: 'stroke-dashoffset 0.3s ease' }}
                />
              </svg>

              <div className="z-10 scale-150">
                {icons[currentIcon]}
              </div>
            </div>
          </div>

          {/* Text elements */}
          <div className="absolute -bottom-16 left-0 right-0 text-center space-y-2">
            <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500">
              Loading Experience
            </h3>
            <div className="flex items-center justify-center space-x-1">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-bounce" style={{ animationDelay: '0s' }}></span>
              <span className="inline-block w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-400 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="inline-block w-2 h-2 rounded-full bg-pink-600 dark:bg-pink-400 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
          </div>
        </div>

        <style jsx>{`
        @keyframes orbit {
          0% { transform: rotate(0deg) translateY(-24px) rotate(0deg); }
          100% { transform: rotate(360deg) translateY(-24px) rotate(-360deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1) rotate(0deg) translateY(-24px); opacity: 0.7; }
          50% { transform: scale(1.5) rotate(0deg) translateY(-24px); opacity: 1; }
        }
      `}</style>
      </div>
);
};

export default Loader;

// extras
// const [customFields, setCustomFields] = useState([]);

  const handleCustomFieldChange = (index, field, value) => {
  const updatedFields = [...customFields];
  updatedFields[index][field] = value;
  setCustomFields(updatedFields);
};

const addCustomField = () => {
  setCustomFields([...customFields, { label: '', value: '' }]);
};

const removeCustomField = (index) => {
  const updatedFields = [...customFields];
  updatedFields.splice(index, 1);
  setCustomFields(updatedFields);
};
data.append('customFields', JSON.stringify(customFields));

       <div>
  <div className="flex justify-between items-center mb-2">
    <label className="block font-medium text-gray-700">Custom Fields</label>
    <button
      type="button"
      onClick={addCustomField}
      className="text-sm text-blue-600 hover:underline"
    >
      + Add Field
    </button>
  </div>
  {customFields.map((field, index) => (
    <div key={index} className="grid grid-cols-5 gap-2 mb-2">
      <input
        type="text"
        placeholder="Label"
        value={field.label}
        onChange={(e) =>
          handleCustomFieldChange(index, 'label', e.target.value)
        }
        className="col-span-2 border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Value"
        value={field.value}
        onChange={(e) =>
          handleCustomFieldChange(index, 'value', e.target.value)
        }
        className="col-span-2 border p-2 rounded"
      />
      <button
        type="button"
        onClick={() => removeCustomField(index)}
        className="text-red-500 hover:text-red-700"
      >
        Remove
      </button>
    </div>
  ))}
</div>

    customFields, // req.body
      customFields, // new product


    customFields: [
  {
        label: { type: String },
        value: { type: String },
        type: { type: String, enum: ['text', 'number', 'select', 'checkbox'], default: 'text' }

  }
    ]
    
import { useState, useEffect } from "react";
import { 
  FiSearch, 
  FiShoppingCart, 
  FiHeart, 
  FiUser, 
  FiMenu, 
  FiTrendingUp, 
  FiAward, 
  FiTruck, 
  FiHeadphones, 
  FiChevronRight, 
  FiChevronLeft, 
  FiStar 
} from "react-icons/fi";

import logo from '/images/logo.png'


// Sample data
const featuredProducts = [
  {
    id: 1,
    name: "Pro Basketball",
    price: 59.99,
    rating: 4.9,
    image: logo,
    category: "Basketball"
  },
  {
    id: 2,
    name: "Trail Running Shoes",
    price: 129.99,
    rating: 4.7,
    image: "/api/placeholder/500/500",
    category: "Running"
  },
  {
    id: 3,
    name: "Tennis Racket Pro",
    price: 189.99,
    rating: 4.8,
    image: "/api/placeholder/500/500",
    category: "Tennis"
  },
  {
    id: 4,
    name: "Cycling Helmet",
    price: 79.99,
    rating: 4.6,
    image: "/api/placeholder/500/500",
    category: "Cycling"
  }
];

const categories = [
  { name: "Basketball", icon: "/api/placeholder/60/60" },
  { name: "Football", icon: "/api/placeholder/60/60" },
  { name: "Tennis", icon: "/api/placeholder/60/60" },
  { name: "Running", icon: "/api/placeholder/60/60" },
  { name: "Cycling", icon: "/api/placeholder/60/60" },
  { name: "Fitness", icon: "/api/placeholder/60/60" }
];

const heroSlides = [
  {
    title: "SUMMER COLLECTION",
    subtitle: "New Arrivals",
    description: "Discover the latest in sports gear and apparel",
    buttonText: "Shop Now",
    image: "/api/placeholder/1200/600"
  },
  {
    title: "RUNNING ESSENTIALS",
    subtitle: "Performance Gear",
    description: "Everything you need for your best run yet",
    buttonText: "Explore",
    image: "/api/placeholder/1200/600"
  },
  {
    title: "TEAM SPORTS",
    subtitle: "Gear Up Together",
    description: "Equipment for every team and every player",
    buttonText: "View Collection",
    image: "/api/placeholder/1200/600"
  }
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      
      <header className="bg-white shadow-sm">
        {/* Top Bar */}
        <div className="bg-blue-800 text-white py-2">
          <div className="container mx-auto px-4 flex justify-center">
            <p className="text-sm">Free shipping on orders over $50 | 30-day returns</p>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <button 
                className="mr-2 block md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <FiMenu size={24} />
              </button>
              <a href="/" className="text-2xl font-bold text-blue-800">
                SportHub
              </a>
            </div>

            {/* Search */}
            <div className="hidden md:flex flex-1 mx-10">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="absolute right-3 top-2.5 text-gray-500">
                  <FiSearch size={20} />
                </button>
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <button className="hidden md:flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <FiHeart size={20} className="text-gray-700" />
              </button>
              <a href="/cart" className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors relative">
                <FiShoppingCart size={20} className="text-gray-700" />
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  3
                </span>
              </a>
              <a href="/account" className="hidden md:flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <FiUser size={20} className="text-gray-700" />
              </a>
            </div>
          </div>

          {/* Mobile Search - Only visible on small screens */}
          <div className="mt-4 md:hidden">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute right-3 top-2.5 text-gray-500">
                <FiSearch size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-white border-t border-gray-200 hidden md:block">
          <div className="container mx-auto px-4">
            <ul className="flex items-center justify-center space-x-8 py-3">
              <li>
                <a href="/" className="text-blue-800 font-medium hover:text-blue-600 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/categories" className="text-gray-700 hover:text-blue-800 transition-colors">
                  Categories
                </a>
              </li>
              <li>
                <a href="/new-arrivals" className="text-gray-700 hover:text-blue-800 transition-colors">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="/deals" className="text-gray-700 hover:text-blue-800 transition-colors">
                  Deals
                </a>
              </li>
              <li>
                <a href="/brands" className="text-gray-700 hover:text-blue-800 transition-colors">
                  Brands
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-700 hover:text-blue-800 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <ul className="border-t border-gray-200 py-2">
              <li>
                <a href="/" className="block px-4 py-2 text-blue-800 font-medium">
                  Home
                </a>
              </li>
              <li>
                <a href="/categories" className="block px-4 py-2 text-gray-700">
                  Categories
                </a>
              </li>
              <li>
                <a href="/new-arrivals" className="block px-4 py-2 text-gray-700">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="/deals" className="block px-4 py-2 text-gray-700">
                  Deals
                </a>
              </li>
              <li>
                <a href="/brands" className="block px-4 py-2 text-gray-700">
                  Brands
                </a>
              </li>
              <li>
                <a href="/contact" className="block px-4 py-2 text-gray-700">
                  Contact
                </a>
              </li>
              <li className="border-t border-gray-200">
                <a href="/wishlist" className="block px-4 py-2 text-gray-700">
                  Wishlist
                </a>
              </li>
              <li>
                <a href="/account" className="block px-4 py-2 text-gray-700">
                  My Account
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>

      <main>
        {/* Hero Slider */}
        <section className="relative overflow-hidden bg-gray-900">
          <div 
            className="h-96 md:h-[500px] relative"
            style={{
              backgroundImage: `url(${heroSlides[currentSlide].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'all 0.5s ease-in-out'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-xl text-white">
                  <p className="text-blue-300 font-semibold mb-2">
                    {heroSlides[currentSlide].subtitle}
                  </p>
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    {heroSlides[currentSlide].title}
                  </h1>
                  <p className="text-lg mb-6 text-gray-100">
                    {heroSlides[currentSlide].description}
                  </p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-colors">
                    {heroSlides[currentSlide].buttonText}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Slider Controls */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-full"
            >
              <FiChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-full"
            >
              <FiChevronRight size={24} />
            </button>
            
            {/* Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentSlide === index ? "bg-white" : "bg-white bg-opacity-50"
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Shop By Category</h2>
              <p className="text-gray-600">Find the perfect gear for your favorite sports</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category, index) => (
                <a 
                  key={index} 
                  href={`/category/${category.name.toLowerCase()}`}
                  className="bg-gray-50 rounded-lg p-4 text-center hover:shadow-md transition-shadow group"
                >
                  <div className="flex justify-center">
                    <img 
                      src={category.icon} 
                      alt={category.name} 
                      className="w-16 h-16 object-contain mb-3"
                    />
                  </div>
                  <h3 className="font-medium text-gray-900 group-hover:text-blue-800 transition-colors">
                    {category.name}
                  </h3>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
                <p className="text-gray-600">Top picks for sports enthusiasts</p>
              </div>
              <a href="/products" className="hidden md:flex items-center text-blue-800 hover:text-blue-600 font-medium">
                View All <FiChevronRight size={16} className="ml-1" />
              </a>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-64 object-contain"
                    />
                    <button className="absolute top-3 right-3 text-gray-700 bg-white p-1.5 rounded-full hover:bg-gray-100">
                      <FiHeart size={18} />
                    </button>
                    <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                      NEW
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-sm text-blue-600 font-medium">{product.category}</span>
                    <h3 className="text-lg font-medium mt-1 mb-2">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        <FiStar size={16} fill="#FACC15" />
                        <FiStar size={16} fill="#FACC15" />
                        <FiStar size={16} fill="#FACC15" />
                        <FiStar size={16} fill="#FACC15" />
                        <FiStar size={16} fill="#FACC15" />
                      </div>
                      <span className="text-sm text-gray-500 ml-1">{product.rating}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">${product.price}</span>
                      <button className="bg-blue-800 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full text-sm font-medium transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8 md:hidden">
              <a href="/products" className="inline-flex items-center text-blue-800 hover:text-blue-600 font-medium">
                View All Products <FiChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex items-start">
                <div className="mr-4 p-3 bg-blue-100 text-blue-800 rounded-full">
                  <FiTruck size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Free Shipping</h3>
                  <p className="text-gray-600">On all orders over $50</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 p-3 bg-blue-100 text-blue-800 rounded-full">
                  <FiAward size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Quality Guarantee</h3>
                  <p className="text-gray-600">100% original products</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 p-3 bg-blue-100 text-blue-800 rounded-full">
                  <FiTrendingUp size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Performance Tested</h3>
                  <p className="text-gray-600">Gear for every level</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 p-3 bg-blue-100 text-blue-800 rounded-full">
                  <FiHeadphones size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
                  <p className="text-gray-600">Dedicated customer service</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-12 bg-blue-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-3">Join Our Newsletter</h2>
              <p className="mb-6">Stay updated with the latest products, exclusive offers and sports news</p>
              <div className="flex flex-col md:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-6 py-3 bg-white text-blue-800 font-medium rounded-full hover:bg-gray-100 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-bold mb-4">SportHub</h3>
              <p className="mb-4">Your one-stop destination for all sports equipment and apparel.</p>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-800 hover:bg-gray-700 h-10 w-10 rounded-full flex items-center justify-center transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                  </svg>
                </a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 h-10 w-10 rounded-full flex items-center justify-center transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 h-10 w-10 rounded-full flex items-center justify-center transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Products</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Basketball</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Football</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tennis</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Running</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fitness</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 mt-1">📍</span>
                  <span>123 Sports Avenue, New York, NY 10001</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">📞</span>
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">✉️</span>
                  <span>support@sporthub.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2025 SportHub. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-4 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


    import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaSearch,
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaBars,
  FaTachometerAlt,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaSun,
  FaMoon,
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import logo from '/images/logo.png';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn, logout, user } = useAuth();
  const { cart } = useSelector((state) => state.cart);
  const { darkMode, toggleTheme } = useTheme();

  const cartCount = cart?.items?.length || 0;

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md text-gray-800 dark:text-white sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-blue-800 text-white py-2 text-sm text-center">
        Free shipping on orders over $50 | 30-day returns
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left: Logo and Mobile Menu Toggle */}
        <div className="flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 dark:text-white md:hidden mr-2"
          >
            <FaBars size={24} />
          </button>
          <Link to="/" className="flex items-center gap-2 font-bold text-indigo-600 dark:text-indigo-400 text-2xl">
            <img src={logo} alt="ShopEase Logo" className="h-10 w-10" />
            ShopEase
          </Link>
        </div>

        {/* Center: Search (desktop only) */}
        <div className="hidden md:flex flex-1 mx-10">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full pl-4 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-full bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-300">
              <FaSearch size={18} />
            </button>
          </div>
        </div>

        {/* Right: Icons and Account */}
        <div className="flex items-center space-x-4">
          <Link to="/wishlist" className="hidden md:flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
            <FaHeart />
          </Link>
          <Link to="/cart" className="relative flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
            <FaShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="text-yellow-400 dark:text-yellow-300">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* Auth Links */}
          {isLoggedIn ? (
            <>
              {user?.isAdmin ? (
                <HeaderLink to="/admin/dashboard" icon={<FaTachometerAlt />} />
              ) : (
                <HeaderLink to="/profile" icon={<FaUser />} />
              )}
              <button
                onClick={logout}
                className="flex items-center gap-1 text-gray-700 dark:text-white hover:text-indigo-600 dark:hover:text-yellow-400 transition"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <>
              <HeaderLink to="/login" icon={<FaSignInAlt />} />
              <HeaderLink to="/register" icon={<FaUserPlus />} />
            </>
          )}
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 mb-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
          />
          <button className="absolute right-3 top-2.5 text-gray-500">
            <FaSearch size={18} />
          </button>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center justify-center space-x-8 py-3 text-gray-700 dark:text-white">
            <HeaderNavLink to="/" label="Home" />
            <HeaderNavLink to="/products" label="Products" />
            <HeaderNavLink to="/new-arrivals" label="New Arrivals" />
            <HeaderNavLink to="/deals" label="Deals" />
            <HeaderNavLink to="/brands" label="Brands" />
            <HeaderNavLink to="/contact" label="Contact" />
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <ul className="py-2 text-gray-700 dark:text-white">
            <MobileNavItem to="/" label="Home" />
            <MobileNavItem to="/products" label="Products" />
            <MobileNavItem to="/new-arrivals" label="New Arrivals" />
            <MobileNavItem to="/deals" label="Deals" />
            <MobileNavItem to="/brands" label="Brands" />
            <MobileNavItem to="/contact" label="Contact" />
            {isLoggedIn && (
              <>
                <MobileNavItem to="/orders" label="My Orders" />
                <MobileNavItem to="/wishlist" label="Wishlist" />
                <MobileNavItem to="/profile" label="My Account" />
                {user?.isAdmin && <MobileNavItem to="/admin/dashboard" label="Admin Dashboard" />}
                <li className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                  <button onClick={logout} className="text-left w-full">
                    Logout
                  </button>
                </li>
              </>
            )}
            {!isLoggedIn && (
              <>
                <MobileNavItem to="/login" label="Login" />
                <MobileNavItem to="/register" label="Register" />
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}

/** Reusable NavLink for Desktop Navigation */
const HeaderNavLink = ({ to, label }) => (
  <li>
    <Link to={to} className="hover:text-blue-600 dark:hover:text-yellow-400 transition">
      {label}
    </Link>
  </li>
);

/** Reusable Icon Link */
const HeaderLink = ({ to, icon }) => (
  <Link
    to={to}
    className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
  >
    {icon}
  </Link>
);

/** Reusable Mobile Nav Item */
const MobileNavItem = ({ to, label }) => (
  <li>
    <Link to={to} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
      {label}
    </Link>
  </li>
);
