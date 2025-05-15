import React from 'react';
import {ChevronRight} from 'lucide-react';

const BrandsAndTestimonials = () => {
    const brands = [
        {
            name: 'Nike',
            logo: '/images/nike.png',
        },
        {
            name: 'Adidas',
            logo: '/images/adidas.png'
        },
        {
            name: 'Kookaburra',
            logo: '/images/kookaburra.png',
        },
        {
            name: 'SG',
            logo: '/images/sg.webp',
        },
        {
            name: 'Reebok',
            logo: '/images/reebok.jpg',
        },
        {
            name: 'Puma',
            logo: '/images/puma.png',
        }
    ];

    const testimonials = [
        {
            id: 1,
            content: "I've been shopping here for all my running gear for years. The quality and service are consistently excellent, and their fast shipping means I'm never waiting long for what I need.",
            author: "Sarah Johnson",
            role: "Marathon Runner",
            avatar: "/images/female-avatar.jpg",
            rating: 5
        },
        {
            id: 2,
            content: "As a basketball coach, I need reliable equipment for my team. This store has the best selection and their bulk discounts have saved our program thousands over the years.",
            author: "Michael Torres",
            role: "Basketball Coach",
            avatar: "/images/male-avatar.avif",
            rating: 5
        },
        {
            id: 3,
            content: "The customer service here is unmatched. When I received the wrong size cleats before a big game, they overnight shipped me the correct pair at no extra charge.",
            author: "Emma Rodriguez",
            role: "Soccer Player",
            avatar: "/images/male-avatar-2.avif",
            rating: 5
        }
    ];

    return (
        <section className="py-16 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Brands showcase */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Top Sports Brands
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            We partner with the world's leading sports brands to bring you premium quality products
                        </p>
                    </div>

                    {/* Brand logos */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {brands.map((brand, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg p-4 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                            >
                                <img
                                    src={brand.logo}
                                    alt={brand.name}
                                    loading="lazy"
                                    className="max-h-20 object-contain"
                                />
                            </div>

                        ))}
                    </div>
                </div>

                {/* Testimonials section */}
                <div>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                Athletes Trust Us
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
                                See what sports professionals and enthusiasts say about their shopping experience
                            </p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <a href="#"
                               className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                                View all reviews
                                <ChevronRight size={16} className="ml-1"/>
                            </a>
                        </div>
                    </div>

                    {/* Testimonial cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow relative"
                            >
                                {/* Quotation mark */}
                                <div
                                    className="absolute top-6 right-6 text-blue-200 dark:text-blue-900 text-6xl leading-none">"
                                </div>

                                {/* Rating stars */}
                                <div className="flex mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className="w-5 h-5 text-yellow-400 fill-current"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                                        </svg>
                                    ))}
                                </div>

                                {/* Testimonial content */}
                                <p className="text-gray-600 dark:text-gray-300 mb-6 relative z-10">
                                    {testimonial.content}
                                </p>

                                {/* Author info */}
                                <div className="flex items-center">
                                    <div className="mr-4">
                                        <img
                                            src={testimonial.avatar}
                                            alt={testimonial.author}
                                            loading="lazy"
                                            className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">
                                            {testimonial.author}
                                        </h4>
                                        <p className="text-sm text-blue-600 dark:text-blue-400">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Customer satisfaction stats */}
                    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            {value: '10K+', label: 'Happy Athletes'},
                            {value: '4.9', label: 'Average Rating'},
                            {value: '98%', label: 'Satisfaction Rate'},
                            {value: '24h', label: 'Support Response'},
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl"
                            >
                                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                    {stat.value}
                                </div>
                                <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BrandsAndTestimonials;