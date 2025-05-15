import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext'; // 👈 Add this

const PageHero = ({
                      title,
                      description,
                      breadcrumbs = [],
                      imageSrc = null,
                      backgroundPattern = 'circuit'
                  }) => {
    const { darkMode } = useTheme(); // 👈 Use theme context

    const getBackgroundPattern = () => {
        switch (backgroundPattern) {
            case 'circuit':
                return `url("data:image/svg+xml,...")`; // (unchanged for brevity)
            case 'dots':
                return `url("data:image/svg+xml,...")`;
            case 'waves':
                return `url("data:image/svg+xml,...")`;
            default:
                return 'none';
        }
    };

    return (
        <div
            className={`relative overflow-hidden transition-colors duration-300 ${
                darkMode
                    ? 'bg-gradient-to-br from-green-900 to-green-800'
                    : 'bg-gradient-to-br from-blue-50 to-blue-100'
            }`}
        >
            {/* Background Pattern */}
            <div
                className={`absolute inset-0 opacity-50 ${darkMode ? 'dark:opacity-10' : ''}`}
                style={{ backgroundImage: getBackgroundPattern() }}
            />

            {/* Side Decoration */}
            <div
                className={`absolute -right-20 top-0 h-full w-40 transform rotate-12 ${
                    darkMode ? 'bg-green-600/20' : 'bg-blue-200/30'
                }`}
            />
            <div
                className={`absolute -left-20 bottom-0 h-full w-40 transform -rotate-12 ${
                    darkMode ? 'bg-green-600/20' : 'bg-blue-200/30'
                }`}
            />

            <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Breadcrumbs */}
                    <nav className="flex mb-6" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3 flex-wrap">
                            <li className="inline-flex items-center">
                                <Link
                                    to="/"
                                    className={`inline-flex items-center text-sm font-medium ${
                                        darkMode
                                            ? 'text-green-400 hover:text-green-300'
                                            : 'text-blue-700 hover:text-blue-900'
                                    }`}
                                >
                                    <Home size={16} className="mr-2" />
                                    Home
                                </Link>
                            </li>

                            {breadcrumbs.map((crumb, index) => (
                                <li key={index} className="flex items-center">
                                    <ChevronRight size={16} className="mx-1 text-gray-500 dark:text-gray-400" />
                                    {index === breadcrumbs.length - 1 ? (
                                        <span
                                            className={`text-sm font-medium ${
                                                darkMode ? 'text-gray-300' : 'text-gray-700'
                                            }`}
                                        >
                      {crumb.label}
                    </span>
                                    ) : (
                                        <Link
                                            to={crumb.path}
                                            className={`text-sm font-medium ${
                                                darkMode
                                                    ? 'text-green-400 hover:text-green-300'
                                                    : 'text-blue-700 hover:text-blue-900'
                                            }`}
                                        >
                                            {crumb.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </nav>

                    {/* Title + Optional Image */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="md:max-w-2xl">
                            <h1
                                className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight ${
                                    darkMode ? 'text-green-300' : 'text-blue-800'
                                }`}
                            >
                                {title}
                            </h1>

                            {description && (
                                <p
                                    className={`text-base sm:text-lg max-w-2xl ${
                                        darkMode ? 'text-gray-300' : 'text-gray-700'
                                    }`}
                                >
                                    {description}
                                </p>
                            )}
                        </div>

                        {imageSrc && (
                            <div className="md:w-1/3 flex justify-center">
                                <img
                                    src={imageSrc}
                                    alt={title}
                                    className="w-full max-w-xs h-auto object-contain rounded-lg shadow-lg"
                                />
                            </div>
                        )}
                    </div>

                    {/* Decorative Gradient Line */}
                    <div
                        className={`absolute bottom-0 left-0 w-full h-1 ${
                            darkMode
                                ? 'bg-gradient-to-r from-green-500 to-teal-600'
                                : 'bg-gradient-to-r from-blue-500 to-indigo-600'
                        }`}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default PageHero;
