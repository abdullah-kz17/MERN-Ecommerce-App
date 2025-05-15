import React, {useState} from 'react';
import {NavLink, Link} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';
import {useSelector} from 'react-redux';
import {
    FaShoppingCart,
    FaUser,
    FaSignOutAlt,
    FaSignInAlt,
    FaUserPlus,
    FaTachometerAlt,
    FaSun,
    FaMoon,
    FaHome,
    FaBars,
    FaTimes,
    FaBoxOpen,
    FaClipboardList
} from 'react-icons/fa';
import {useTheme} from '../../context/ThemeContext';

export default function Header() {
    const {darkMode, toggleTheme} = useTheme();
    const {isLoggedIn, logout, user} = useAuth();
    const {cart} = useSelector((state) => state.cart);
    const cartCount = cart?.items?.length || 0;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    return (
        <header
            className={`sticky top-0 z-50 transition duration-300 ${
                darkMode ? 'bg-gray-900/95' : 'bg-white/95'
            } backdrop-blur-md shadow-md`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-1 font-bold text-blue-600 dark:text-emerald-400 "
                    >
                        <img src="/favicon-2.png" alt="SportCart Logo" className="h-8 w-8 sm:h-10 sm:w-10"/>
                        <span className="tracking-wider text-lg sm:text-2xl dark:text-blue-500 font-extrabold">
                          Sport<span className="text-green-400">Cart</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-5">
                        <HeaderLink to="/" icon={<FaHome/>} label="Home"/>
                        <HeaderLink to="/products" icon={<FaBoxOpen/>} label="Products"/>

                        {isLoggedIn && !user?.isAdmin && (
                            <>
                                <HeaderLink
                                    to="/cart"
                                    icon={<FaShoppingCart/>}
                                    label={
                                        <span className="relative pr-2">
                      Cart
                                            {cartCount > 0 && (
                                                <span
                                                    className="absolute -top-2 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                          {cartCount}
                        </span>
                                            )}
                    </span>
                                    }
                                />
                                <HeaderLink to="/orders" icon={<FaClipboardList/>} label="Orders"/>
                            </>
                        )}

                        {isLoggedIn && user?.isAdmin && (
                            <HeaderLink to="/admin/dashboard" icon={<FaTachometerAlt/>} label="Dashboard"/>
                        )}
                    </nav>

                    {/* Right Side Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        {isLoggedIn ? (
                            <div className="flex items-center gap-4">
                                <HeaderLink to="/profile" icon={<FaUser/>} label="Profile"/>
                                <button
                                    onClick={logout}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700 transition text-sm"
                                >
                                    <FaSignOutAlt/> Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    to="/login"
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition text-sm"
                                >
                                    <FaSignInAlt/> Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-sm"
                                >
                                    <FaUserPlus/> Register
                                </Link>
                            </div>
                        )}

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                            aria-label="Toggle Theme"
                        >
                            {darkMode ? (
                                <FaSun className="text-yellow-400 text-lg"/>
                            ) : (
                                <FaMoon className="text-gray-600 text-lg"/>
                            )}
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center gap-3">
                        {/* Theme Toggle for Mobile */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                            aria-label="Toggle Theme"
                        >
                            {darkMode ? (
                                <FaSun className="text-yellow-400 text-lg"/>
                            ) : (
                                <FaMoon className="text-gray-600 text-lg"/>
                            )}
                        </button>

                        {/* Cart icon with badge for mobile */}
                        {isLoggedIn && !user?.isAdmin && (
                            <Link
                                to="/cart"
                                className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                                <FaShoppingCart className="text-xl"/>
                                {cartCount > 0 && (
                                    <span
                                        className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                                )}
                            </Link>
                        )}

                        <button
                            onClick={toggleMobileMenu}
                            className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                        >
                            {mobileMenuOpen ? (
                                <FaTimes className="text-xl"/>
                            ) : (
                                <FaBars className="text-xl"/>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div
                    className={`md:hidden ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg border-t border-gray-200 dark:border-gray-800`}>
                    <div className="px-4 pt-2 pb-4 space-y-2">
                        <MobileLink to="/" icon={<FaHome/>} label="Home" onClick={toggleMobileMenu}/>
                        <MobileLink to="/products" icon={<FaBoxOpen/>} label="Products" onClick={toggleMobileMenu}/>

                        {isLoggedIn && !user?.isAdmin && (
                            <MobileLink to="/orders" icon={<FaClipboardList/>} label="Orders"
                                        onClick={toggleMobileMenu}/>
                        )}

                        {isLoggedIn && user?.isAdmin && (
                            <MobileLink to="/admin/dashboard" icon={<FaTachometerAlt/>} label="Dashboard"
                                        onClick={toggleMobileMenu}/>
                        )}

                        {isLoggedIn ? (
                            <>
                                <MobileLink to="/profile" icon={<FaUser/>} label="Profile" onClick={toggleMobileMenu}/>
                                <div
                                    onClick={() => {
                                        logout();
                                        toggleMobileMenu();
                                    }}
                                    className="flex items-center gap-3 px-3 py-2 rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer"
                                >
                                    <FaSignOutAlt/>
                                    <span>Logout</span>
                                </div>
                            </>
                        ) : (
                            <>
                                <MobileLink to="/login" icon={<FaSignInAlt/>} label="Login" onClick={toggleMobileMenu}/>
                                <MobileLink to="/register" icon={<FaUserPlus/>} label="Register"
                                            onClick={toggleMobileMenu}/>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}

// Desktop navigation link component
const HeaderLink = ({to, label, icon}) => (
    <NavLink
        to={to}
        className={({isActive}) =>
            `flex items-center gap-2 px-3 py-2 rounded-md transition duration-150 ${
                isActive
                    ? 'text-blue-700 dark:text-emerald-400 font-medium bg-blue-50 dark:bg-emerald-900/20'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`
        }
    >
        {icon && <span className="text-base">{icon}</span>}
        <span>{label}</span>
    </NavLink>
);

// Mobile navigation link component
const MobileLink = ({to, label, icon, onClick}) => (
    <NavLink
        to={to}
        onClick={onClick}
        className={({isActive}) =>
            `flex items-center gap-3 px-3 py-2 rounded-md transition duration-150 ${
                isActive
                    ? 'text-blue-700 dark:text-emerald-400 font-medium bg-blue-50 dark:bg-emerald-900/20'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`
        }
    >
        {icon && <span className="text-base">{icon}</span>}
        <span>{label}</span>
    </NavLink>
);