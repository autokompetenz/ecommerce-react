import { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { CartProvider, useCart } from "./context/CartContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartSidebar from "./components/CartSidebar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Blog from "./pages/Blog";
import SingleBlog from "./pages/SingleBlog";
import RegularPage from "./pages/RegularPage";
import Contact from "./pages/Contact";
import Tracking from "./pages/Tracking";
import LegalPage from "./pages/LegalPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import Orders from "./pages/admin/Orders";
import Products from "./pages/admin/Products";
import Settings from "./pages/admin/Settings";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return children;
}

function SiteLayout() {
  const [cartOpen, setCartOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const location = useLocation();
  const { count } = useCart();

  useEffect(() => { setCartOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return (
    <>
      <Header cartCount={count} onCartToggle={() => setCartOpen(!cartOpen)} theme={theme} onToggleTheme={toggleTheme} />
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
        <Route path="/regular-page" element={<RegularPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/legal/:type" element={<LegalPage />} />
      </Routes>
      <Footer />
    </>
  );
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="add" element={<AddProduct />} />
        <Route path="edit/:id" element={<EditProduct />} />
        <Route path="orders" element={<Orders />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="*" element={<SiteLayout />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}
