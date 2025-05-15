import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeaturedProducts, searchProducts } from '../store/thunks/productThunks';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/product/ProductCard';
import Pagination from '../components/common/Pagination';
import Loader from '../components/common/Loader';
import SidebarFilter from '../components/product/SidebarFilter.jsx';
import { addItemToCart } from '../store/thunks/cartThunks.js';
import { toast } from 'react-toastify';
import PageHero from "../components/common/Hero.jsx";

export default function Products() {
    const dispatch = useDispatch();
    const {
        products = [],
        featuredProducts = [],
        total = 0,
        loading,
        error,
    } = useSelector((state) => state.product);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(9);

    const [filters, setFilters] = useState({
        keyword: '',
        category: '',
        subcategory: '',
        minPrice: '',
        maxPrice: '',
        sortBy: '',
        featuredOnly: false,
    });

    const categories = ['cricket', 'football', 'hockey', 'table-tennis', 'badminton'];
    const subcategories = ['bats', 'balls', 'shoes', 'rackets', 'jerseys', 'kits'];

    useEffect(() => {
        dispatch(getFeaturedProducts());
    }, [dispatch]);

    useEffect(() => {
        dispatch(
            searchProducts({
                ...filters,
                page: page + 1,
                limit: rowsPerPage,
            })
        );
    }, [filters, page, rowsPerPage, dispatch]);

    const handleFilterChange = (updatedFilters) => {
        setFilters(updatedFilters);
        setPage(0);
    };

    const handleAddToCart = useCallback(
        async (productId) => {
            try {
                await dispatch(addItemToCart({ productId, quantity: 1 })).unwrap();
                toast.success('Item added to cart!');
            } catch (err) {
                toast.error(err || 'Failed to add to cart');
            }
        },
        [dispatch]
    );

    const displayProducts = filters.featuredOnly ? featuredProducts : products;

    return (
        <div className="dark:bg-gray-900">
            {/* Hero Section */}
            <PageHero
                title="Explore Products"
                description="Discover the latest gear for cricket, football, badminton, and more. Built for performance, trusted by pros."
                breadcrumbs={[
                    { label: 'Products', path: '/products' },
                ]}
                imageSrc="/images/products/sports-hero.png"
                backgroundPattern="waves"
            />

            {/* Content Section */}
            <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 md:px-10 py-6">
                {/* Sidebar */}
                <div className="w-full lg:max-w-xs lg:min-w-[250px] lg:w-[300px]">
                    <SidebarFilter
                        onFilterChange={handleFilterChange}
                        categories={categories}
                        subcategories={subcategories}
                    />
                </div>

                {/* Product Listing */}
                <div className="flex-1 w-full lg:w-3/4">
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <p className="text-center text-red-600 dark:text-red-400">{error}</p>
                    ) : (
                        <>
                            <section className="mb-10">
                                <h2 className="text-xl sm:text-2xl font-bold mb-6 text-black dark:text-white">
                                    {filters.featuredOnly ? 'Featured Products' : 'All Products'}
                                </h2>
                                {displayProducts.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {displayProducts.map((product) => (
                                            <ProductCard
                                                key={product._id}
                                                product={product}
                                                onAddToCart={handleAddToCart}
                                                featured={filters.featuredOnly || featuredProducts.some(fp => fp._id === product._id)}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-gray-500 dark:text-gray-400">No products found.</p>
                                )}
                            </section>

                            {/* Pagination */}
                            <div className="mt-8">
                                <Pagination
                                    currentPage={page}
                                    totalItems={filters.featuredOnly ? featuredProducts.length : total}
                                    itemsPerPage={rowsPerPage}
                                    onPageChange={setPage}
                                    onRowsPerPageChange={setRowsPerPage}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
