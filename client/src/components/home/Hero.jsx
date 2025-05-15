import React, {useState} from 'react';
import {Search, ShoppingCart, ChevronRight, Star} from 'lucide-react';
import {Link, useNavigate} from "react-router-dom";

const Hero = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    return (
        <section className="relative bg-white dark:bg-gray-900 min-h-screen overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Dynamic gradient background */}
                <div className="absolute top-0 right-0 w-3/4 h-full
                    bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-purple-500/20
                    dark:from-blue-900/30 dark:via-indigo-900/20 dark:to-purple-900/30
                    rounded-bl-full opacity-80"></div>

                {/* Decorative sports elements */}
                <div
                    className="absolute top-16 right-16 w-24 h-24 rounded-full border-4 border-red-500 dark:border-red-600 opacity-20 animate-pulse"></div>
                <div
                    className="absolute bottom-32 right-48 w-16 h-16 bg-yellow-400 dark:bg-yellow-600 rounded-full opacity-20"></div>
                <div
                    className="absolute top-48 left-3/4 w-12 h-12 bg-indigo-500 dark:bg-indigo-700 rounded-lg transform rotate-12 opacity-20"></div>
            </div>

            {/* Main content */}
            <div className="container mx-auto px-4 lg:px-8 relative z-10 h-full py-12 lg:py-0">
                <div className="flex flex-col lg:flex-row items-center h-full">
                    {/* Left Content */}
                    <div className="w-full lg:w-1/2 pt-12 lg:pt-24 pb-12 lg:pb-24 lg:pr-12">
                        {/* Featured label */}
                        <div
                            className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium text-sm mb-6">
                            <Star className="w-4 h-4 mr-1 fill-current"/> New Collection 2025
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                            Elevate Your <span className="text-blue-600 dark:text-blue-400">Game</span> With Pro Gear
                        </h1>

                        <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg max-w-lg">
                            Discover performance sports equipment designed for champions.
                            Premium quality gear that helps you reach your full potential.
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 mb-8">
                            <button
                                onClick={()=>navigate('/products')}
                                className="px-8 py-4 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold transition duration-300 flex items-center justify-center">
                                  Shop Now <ChevronRight className="ml-1 w-5 h-5"/>
                            </button>

                            <button
                                onClick={()=>navigate('/products')}
                                className="px-8 py-4 rounded-lg bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 font-semibold transition duration-300">
                                Explore Collections
                            </button>
                        </div>

                        {/* Featured stats */}
                        <div className="grid grid-cols-3 gap-4 max-w-lg">
                            <div
                                className="text-center p-3 rounded-lg bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-800/30">
                                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">2500+</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Products</p>
                            </div>
                            <div
                                className="text-center p-3 rounded-lg bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-800/30">
                                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">150+</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Brands</p>
                            </div>
                            <div
                                className="text-center p-3 rounded-lg bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-800/30">
                                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">24h</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Shipping</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Product Showcase */}
                    <div className="w-full lg:w-1/2 relative flex justify-center items-center py-8 lg:py-0">
                        {/* Main product image */}
                        <div className="relative z-10">
                            <div
                                className="relative bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-3xl p-3 shadow-xl dark:shadow-gray-900/50 w-full max-w-full">
                                <img
                                    src="/images/adidas-bat.jpg"
                                    alt="Featured Sports Equipment"
                                    loading="lazy"
                                    className="rounded-2xl w-full h-auto object-contain"
                                />

                                {/* Product details overlay */}
                                <div
                                    className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-gray-900/90 rounded-xl p-4 backdrop-blur shadow-md">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white">Adidas Bat</h3>
                                            <div className="flex items-center mt-1">
                                                <div className="flex items-center">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current"/>
                                                    ))}
                                                </div>
                                                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">128 reviews</span>
                                            </div>
                                            <p className="font-bold text-blue-600 dark:text-blue-400 mt-1">$149.99</p>
                                        </div>
                                        <button
                                            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white p-2 rounded-lg">
                                            <ShoppingCart className="w-5 h-5"/>
                                        </button>
                                    </div>
                                </div>
                            </div>


                            {/* Floating mini product cards */}
                            <div
                                className="absolute -bottom-4 -left-16 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg transform -rotate-6 hidden md:block">
                                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                                    <img src="/images/adidas-shoes.jpg"
                                         alt="Sports Product"
                                         loading="lazy"
                                         className="w-full h-full object-cover"/>
                                </div>
                            </div>

                            <div
                                className="absolute -top-8 -right-12 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg transform rotate-6 hidden md:block">
                                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                                    <img src="/images/gray-nicolls-gloves2.jpg"
                                         loading="lazy"
                                         alt="Sports Product"
                                         className="w-full h-full object-cover"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;