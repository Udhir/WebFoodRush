import {
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import { useState } from "react";
import { Toaster } from "react-hot-toast";

import "./App.css";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminOrders from "./components/AdminOrders";

// Customer pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FoodDetails from "./pages/FoodDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import OtpVerification from "./pages/OtpVerification";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";
import DemoPayment from "./pages/DemoPayment";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminDashboard from "./pages/AdminDashboard";
import ManageFood from "./pages/ManageFood";
import AddFood from "./pages/AddFood";
import EditFood from "./pages/EditFood";
import ManageUsers from "./pages/ManageUsers";
import ManageCategories from "./pages/ManageCategories";
import AddCategory from "./pages/AddCategory";
import EditCategory from "./pages/EditCategory";
import ManageContacts from "./pages/ManageContacts";

// Customer route protection
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Administrator route protection
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (!token || !storedUser) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(storedUser);

    if (user.role !== "admin") {
      return <Navigate to="/" replace />;
    }

    return children;
  } catch {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return <Navigate to="/login" replace />;
  }
};

function App() {
  const location = useLocation();
  const [search, setSearch] = useState("");

  const adminRoutes = [
    "/admin",
    "/manage-food",
    "/add-food",
    "/edit-food",
    "/manage-orders",
    "/manage-users",
    "/manage-categories",
    "/add-category",
    "/edit-category",
    "/manage-contacts",
  ];

  const isAdminPage = adminRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <div className="app-layout">
      <Toaster position="top-right" />

      {/* Navbar is hidden on administrator pages */}
      {!isAdminPage && (
        <Navbar
          search={search}
          setSearch={setSearch}
        />
      )}

      <main className="app-content">
        <Routes>
          {/* Public customer routes */}
          <Route
            path="/"
            element={
              <Home
                search={search}
                setSearch={setSearch}
              />
            }
          />

          <Route
            path="/menu"
            element={<Home search={search} />}
          />

          <Route path="/about" element={<About />} />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/food/:id"
            element={<FoodDetails />}
          />

          <Route path="/login" element={<Login />} />

          <Route
            path="/signup"
            element={<Signup />}
          />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="/otp-verification"
            element={<OtpVerification />}
          />

          <Route
            path="/payment-success"
            element={<PaymentSuccess />}
          />

          <Route
            path="/payment-failure"
            element={<PaymentFailure />}
          />

          <Route
            path="/demo-payment"
            element={<DemoPayment />}
          />

          <Route
            path="/favorites"
            element={<Favorites />}
          />

          {/* Protected customer routes */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          {/* Protected administrator routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/manage-food"
            element={
              <AdminRoute>
                <ManageFood />
              </AdminRoute>
            }
          />

          <Route
            path="/add-food"
            element={
              <AdminRoute>
                <AddFood />
              </AdminRoute>
            }
          />

          <Route
            path="/edit-food/:id"
            element={
              <AdminRoute>
                <EditFood />
              </AdminRoute>
            }
          />

          <Route
            path="/manage-orders"
            element={
              <AdminRoute>
                <AdminOrders />
              </AdminRoute>
            }
          />

          <Route
            path="/manage-users"
            element={
              <AdminRoute>
                <ManageUsers />
              </AdminRoute>
            }
          />

          <Route
            path="/manage-categories"
            element={
              <AdminRoute>
                <ManageCategories />
              </AdminRoute>
            }
          />

          <Route
            path="/add-category"
            element={
              <AdminRoute>
                <AddCategory />
              </AdminRoute>
            }
          />

          <Route
            path="/edit-category/:id"
            element={
              <AdminRoute>
                <EditCategory />
              </AdminRoute>
            }
          />

          <Route
            path="/manage-contacts"
            element={
              <AdminRoute>
                <ManageContacts />
              </AdminRoute>
            }
          />

          {/* Page not found */}
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </main>

      {/* Footer is hidden on administrator pages */}
      {!isAdminPage && <Footer />}
    </div>
  );
}

export default App;