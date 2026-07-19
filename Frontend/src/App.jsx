import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import FoodDetails from "./pages/FoodDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";
import DemoPayment from "./pages/DemoPayment";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import ManageFood from "./pages/ManageFood";
import AddFood from "./pages/AddFood";
import EditFood from "./pages/EditFood";
import AdminOrders from "./components/AdminOrders";
import ManageUsers from "./pages/ManageUsers";


// --- Define Route Protections Here ---
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;
  return children;
};

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role !== "admin") return <Navigate to="/" />;
  return children;
};
// -------------------------------------


function App() {
  const location = useLocation();
  const [search, setSearch] = useState("");


  // Hide Navbar/Footer if the path starts with any of these admin routes
  const adminRoutes = [
    "/admin",
    "/manage-food",
    "/add-food",
    "/edit-food",
    "/manage-orders",
    "/manage-users"
  ];
  const isAdminPage = adminRoutes.some((route) => location.pathname.startsWith(route));

  return (
    <>
      <Toaster position="top-right" />
      {/* Show Navbar on all pages EXCEPT admin pages */}
      {!isAdminPage && <Navbar search={search} setSearch={setSearch} />}

      <Routes>
        <Route path="/" element={<Home search={search} setSearch={setSearch} />} />
        <Route path="/menu" element={<Home search={search} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/food/:id" element={<FoodDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failure" element={<PaymentFailure />} />
        <Route path="/demo-payment" element={<DemoPayment />} />
        <Route path="/favorites" element={<Favorites />} />
        {/* Protected Routes */}
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/manage-food" element={<AdminRoute><ManageFood /></AdminRoute>} />
        <Route path="/add-food" element={<AdminRoute><AddFood /></AdminRoute>} />
        <Route path="/edit-food/:id" element={<AdminRoute><EditFood /></AdminRoute>} />
        <Route path="/manage-orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
        <Route path="/manage-users" element={<AdminRoute><ManageUsers /></AdminRoute>} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Show Footer on all pages EXCEPT admin pages */}
      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;