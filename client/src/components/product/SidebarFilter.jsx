import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Tag, ChevronDown, ArrowUpDown } from 'lucide-react';

const SidebarFilter = ({ onFilterChange, categories, subcategories }) => {
    const [filters, setFilters] = useState({
        keyword: '',
        category: '',
        subcategory: '',
        minPrice: '',
        maxPrice: '',
        sortBy: '',
        featuredOnly: false,
    });

    const [isOpen, setIsOpen] = useState({
        categories: true,
        price: true,
        sort: true,
        featured: true,
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const toggleSection = (section) => {
        setIsOpen(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const clearFilters = () => {
        setFilters({
            keyword: '',
            category: '',
            subcategory: '',
            minPrice: '',
            maxPrice: '',
            sortBy: '',
            featuredOnly: false,
        });
    };

    useEffect(() => {
        onFilterChange(filters);
    }, [filters, onFilterChange]);

    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 rounded-lg overflow-hidden w-full">
            {/* Search Bar */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        name="keyword"
                        value={filters.keyword}
                        onChange={handleInputChange}
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                    />
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Active Filters Summary */}
                {(filters.category || filters.subcategory || filters.minPrice || filters.maxPrice || filters.sortBy || filters.featuredOnly) && (
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Filters</span>
                            <button
                                onClick={clearFilters}
                                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                Clear All
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {filters.category && (
                                <span className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full flex items-center">
                                    {filters.category}
                                    <button
                                        onClick={() => setFilters(prev => ({ ...prev, category: '' }))}
                                        className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800"
                                    >
                                        ×
                                    </button>
                                </span>
                            )}
                            {filters.subcategory && (
                                <span className="text-xs bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 px-2 py-1 rounded-full flex items-center">
                                    {filters.subcategory}
                                    <button
                                        onClick={() => setFilters(prev => ({ ...prev, subcategory: '' }))}
                                        className="ml-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800"
                                    >
                                        ×
                                    </button>
                                </span>
                            )}
                            {filters.minPrice && filters.maxPrice && (
                                <span className="text-xs bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 px-2 py-1 rounded-full flex items-center">
                                    ${filters.minPrice} - ${filters.maxPrice}
                                    <button
                                        onClick={() => setFilters(prev => ({ ...prev, minPrice: '', maxPrice: '' }))}
                                        className="ml-1 text-green-600 dark:text-green-400 hover:text-green-800"
                                    >
                                        ×
                                    </button>
                                </span>
                            )}
                            {filters.sortBy && (
                                <span className="text-xs bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 px-2 py-1 rounded-full flex items-center">
                                    {filters.sortBy === 'priceAsc' ? 'Price: Low to High' :
                                        filters.sortBy === 'priceDesc' ? 'Price: High to Low' :
                                            filters.sortBy === 'rating' ? 'Top Rated' : 'Newest'}
                                    <button
                                        onClick={() => setFilters(prev => ({ ...prev, sortBy: '' }))}
                                        className="ml-1 text-purple-600 dark:text-purple-400 hover:text-purple-800"
                                    >
                                        ×
                                    </button>
                                </span>
                            )}
                            {filters.featuredOnly && (
                                <span className="text-xs bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded-full flex items-center">
                                    Featured Only
                                    <button
                                        onClick={() => setFilters(prev => ({ ...prev, featuredOnly: false }))}
                                        className="ml-1 text-yellow-600 dark:text-yellow-400 hover:text-yellow-800"
                                    >
                                        ×
                                    </button>
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Categories Section */}
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    <button
                        onClick={() => toggleSection('categories')}
                        className="flex items-center justify-between w-full mb-2 text-gray-800 dark:text-gray-200 font-medium"
                    >
                        <span className="flex items-center gap-2">
                            <Tag size={16} />
                            Categories
                        </span>
                        <ChevronDown
                            size={16}
                            className={`transform transition-transform ${isOpen.categories ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {isOpen.categories && (
                        <div className="mt-3 space-y-2">
                            <div className="grid grid-cols-1 gap-2">
                                {categories.map((cat) => (
                                    <label key={cat} className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-300">
                                        <input
                                            type="radio"
                                            name="category"
                                            value={cat}
                                            checked={filters.category === cat}
                                            onChange={handleInputChange}
                                            className="w-4 h-4 text-blue-600 dark:text-blue-400 border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400"
                                        />
                                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                    </label>
                                ))}
                            </div>

                            {filters.category && (
                                <div className="mt-4">
                                    <p className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">Subcategories</p>
                                    <div className="grid grid-cols-1 gap-2">
                                        {subcategories.map((subcat) => (
                                            <label key={subcat} className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-300">
                                                <input
                                                    type="radio"
                                                    name="subcategory"
                                                    value={subcat}
                                                    checked={filters.subcategory === subcat}
                                                    onChange={handleInputChange}
                                                    className="w-4 h-4 text-indigo-600 dark:text-indigo-400 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                                                />
                                                {subcat.charAt(0).toUpperCase() + subcat.slice(1)}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Price Range Section */}
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    <button
                        onClick={() => toggleSection('price')}
                        className="flex items-center justify-between w-full mb-2 text-gray-800 dark:text-gray-200 font-medium"
                    >
                        <span className="flex items-center gap-2">
                            <SlidersHorizontal size={16} />
                            Price Range
                        </span>
                        <ChevronDown
                            size={16}
                            className={`transform transition-transform ${isOpen.price ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {isOpen.price && (
                        <div className="mt-3 space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs text-gray-600 dark:text-gray-400">Min Price</label>
                                    <div className="relative mt-1">
                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                        <input
                                            type="number"
                                            name="minPrice"
                                            value={filters.minPrice}
                                            onChange={handleInputChange}
                                            placeholder="0"
                                            className="w-full pl-7 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-600 dark:text-gray-400">Max Price</label>
                                    <div className="relative mt-1">
                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                        <input
                                            type="number"
                                            name="maxPrice"
                                            value={filters.maxPrice}
                                            onChange={handleInputChange}
                                            placeholder="1000"
                                            className="w-full pl-7 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sort By Section */}
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    <button
                        onClick={() => toggleSection('sort')}
                        className="flex items-center justify-between w-full mb-2 text-gray-800 dark:text-gray-200 font-medium"
                    >
                        <span className="flex items-center gap-2">
                            <ArrowUpDown size={16} />
                            Sort By
                        </span>
                        <ChevronDown
                            size={16}
                            className={`transform transition-transform ${isOpen.sort ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {isOpen.sort && (
                        <div className="mt-3 space-y-2">
                            {['priceAsc', 'priceDesc', 'newest', 'rating'].map((option) => {
                                const labels = {
                                    priceAsc: 'Price: Low to High',
                                    priceDesc: 'Price: High to Low',
                                    newest: 'Newest First',
                                    rating: 'Top Rated'
                                };

                                return (
                                    <label key={option} className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-300">
                                        <input
                                            type="radio"
                                            name="sortBy"
                                            value={option}
                                            checked={filters.sortBy === option}
                                            onChange={handleInputChange}
                                            className="w-4 h-4 text-purple-600 dark:text-purple-400 border-gray-300 dark:border-gray-600 focus:ring-purple-500 dark:focus:ring-purple-400"
                                        />
                                        {labels[option]}
                                    </label>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Featured Only Toggle */}
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    <button
                        onClick={() => toggleSection('featured')}
                        className="flex items-center justify-between w-full mb-2 text-gray-800 dark:text-gray-200 font-medium"
                    >
                        <span className="flex items-center gap-2">
                            <Tag size={16} />
                            Featured Products
                        </span>
                        <ChevronDown
                            size={16}
                            className={`transform transition-transform ${isOpen.featured ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {isOpen.featured && (
                        <div className="mt-3">
                            <label className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-300">
                                <input
                                    type="checkbox"
                                    name="featuredOnly"
                                    checked={filters.featuredOnly}
                                    onChange={handleInputChange}
                                    className="w-4 h-4 text-yellow-600 dark:text-yellow-400 border-gray-300 dark:border-gray-600 focus:ring-yellow-500 dark:focus:ring-yellow-400"
                                />
                                Show Featured Products Only
                            </label>
                        </div>
                    )}
                </div>

                {/* Apply Filters Button */}
                <button
                    onClick={() => onFilterChange(filters)}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium transition-colors duration-300 flex items-center justify-center gap-2"
                >
                    <SlidersHorizontal size={16} />
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default SidebarFilter;