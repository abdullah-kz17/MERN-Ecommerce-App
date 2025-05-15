import React from 'react';
import {
    FaShippingFast,
    FaLock,
    FaUndoAlt,
    FaHeadset,
    FaMedal,
    FaTags
} from 'react-icons/fa';

const Services = () => {
    const services = [
        {
            title: 'Fast Delivery',
            description: 'Express shipping on all orders with real-time tracking. Get your gear in 24-48 hours.',
            icon: <FaShippingFast className="text-3xl" />,
            color: 'bg-blue-500 dark:bg-blue-600',
            highlight: 'Free shipping on orders over $75'
        },
        {
            title: 'Secure Payments',
            description: 'Multiple payment options with bank-level encryption to keep your information safe.',
            icon: <FaLock className="text-3xl" />,
            color: 'bg-purple-500 dark:bg-purple-600',
            highlight: '100% secure transactions'
        },
        {
            title: 'Easy Returns',
            description: 'No-questions-asked 30-day return policy if you are not completely satisfied.',
            icon: <FaUndoAlt className="text-3xl" />,
            color: 'bg-red-500 dark:bg-red-600',
            highlight: '30-day money back guarantee'
        },
        {
            title: '24/7 Support',
            description: 'Our expert team is available around the clock to answer your questions and concerns.',
            icon: <FaHeadset className="text-3xl" />,
            color: 'bg-green-500 dark:bg-green-600',
            highlight: 'Live chat available'
        },
        {
            title: 'Quality Guarantee',
            description: 'All products are carefully selected and tested to ensure professional-grade quality.',
            icon: <FaMedal className="text-3xl" />,
            color: 'bg-amber-500 dark:bg-amber-600',
            highlight: 'Pro athlete approved'
        },
        {
            title: 'Price Match',
            description: 'Found it cheaper elsewhere? We will match the price and give you an extra 5% off.',
            icon: <FaTags className="text-3xl" />,
            color: 'bg-indigo-500 dark:bg-indigo-600',
            highlight: 'Lowest price guaranteed'
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Section Heading with enhanced design */}
                <div className="text-center mb-16 relative">
                    <div className="inline-block relative">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 relative z-10">
                            The Athlete's Choice
                        </h2>
                        <div className="absolute -bottom-3 left-0 right-0 h-3 bg-blue-500/20 dark:bg-blue-600/20 rounded-full"></div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg mt-6">
                        Experience premium service with every purchase. Here's why athletes and sports enthusiasts trust us.
                    </p>
                </div>

                {/* Enhanced Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                        >
                            {/* Colored header with icon */}
                            <div className={`${service.color} p-6 flex justify-between items-center`}>
                                <div className="text-white font-semibold text-xl">{service.title}</div>
                                <div className="bg-white/20 p-3 rounded-lg text-white">
                                    {service.icon}
                                </div>
                            </div>

                            {/* Content area */}
                            <div className="p-6">
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    {service.description}
                                </p>

                                {/* Highlight feature */}
                                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <p className="text-sm font-medium flex items-center">
                                        <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 mr-2"></span>
                                        {service.highlight}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Added testimonial banner */}
                <div className="mt-16 bg-blue-600 dark:bg-blue-800 rounded-2xl p-8 text-white text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-400/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
                    </div>

                    <div className="relative z-10">
                        <p className="text-xl md:text-2xl font-medium italic mb-4">
                            "The quality of service is unmatched. Fast delivery and excellent customer support make this my go-to sports shop."
                        </p>
                        <div className="flex items-center justify-center space-x-2">
                            <div className="w-10 h-10 bg-white/30 rounded-full overflow-hidden">
                                <img src="/images/person.avif" alt="Customer" className="w-full h-full object-cover" />
                            </div>
                            <div className="text-left">
                                <p className="font-semibold">Michael Johnson</p>
                                <p className="text-sm text-blue-100">Professional Athlete</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;