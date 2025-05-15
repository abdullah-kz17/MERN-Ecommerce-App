import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import PrivateRoute from "./components/protectedRoutes/PrivateRoute";
import AdminRoute from "./components/protectedRoutes/AdminRoute";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Loader from "./components/common/Loader";
import UpdateProfile from "./pages/UpdateProfile";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const CartPage = lazy(() => import("./pages/Cart"));
const Orders = lazy(() => import("./pages/Orders"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Profile = lazy(() => import("./pages/Profile"));

// Admin pages
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const ProductManagement = lazy(() => import("./pages/admin/adminControls/ProductManagement"));
const OrderManagement = lazy(() => import("./pages/admin/adminControls/OrderManagement"));
const UserManagement = lazy(() => import("./pages/admin/adminControls/UserManagement"));
const ProductForm = lazy(() => import("./pages/AddProduct"));
const EditProduct = lazy(() => import("./pages/EditProduct"));

function App() {
  return (
    <Router>
       <div className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
      <Header />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader /></div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products-detail/:id" element={<ProductDetail />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />

          {/* Authenticated User Routes */}
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
            <Route path="/cart" element={<PrivateRoute><CartPage /></PrivateRoute>} />
            <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
            <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
            <Route path="/order-success/:orderId" element={<PrivateRoute><OrderSuccess /></PrivateRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/products" element={<AdminRoute><ProductManagement /></AdminRoute>} />
          <Route path="/admin/orders" element={<AdminRoute><OrderManagement /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><UserManagement /></AdminRoute>} />
          <Route path="/admin/add-product" element={<AdminRoute><ProductForm /></AdminRoute>} />
          <Route path="/admin/edit-product/:id" element={<AdminRoute><EditProduct /></AdminRoute>} />
        </Routes>
      </Suspense>
      <Footer />
      </div>
    </Router>
  );
}

export default App;
