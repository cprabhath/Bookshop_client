import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { useState, useEffect, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Preloader from "./components/PreLoader";
import NotFound from "./pages/NotFound";

const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Register = lazy(() => import("./pages/Register"));
const Profile = lazy(() => import("./pages/Profile"));
const Orders = lazy(() => import("./pages/Orders"));
const PaymentCompleted = lazy(() => import("./pages/PaymentCompleted"));
const PaymentCancelled = lazy(() => import("./pages/PaymentCancelled"));
const ChatSupport = lazy(() => import("./components/ChatSupport"));

export default function App() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    setToken(localStorage.getItem("token"));
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [setToken]);

  return (
    <HashRouter>
      <Suspense fallback={<Preloader />}>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <div className="pt-16">
              <Routes>
                <Route path="/shop" element={<Shop />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                {token ? (
                  <>
                    <Route path="/home/profile" element={<Profile />} />
                    <Route path="/home/orders" element={<Orders />} />
                    <Route
                      path="/payment/complete"
                      element={<PaymentCompleted />}
                    />
                    <Route
                      path="/payment/cancelled"
                      element={<PaymentCancelled />}
                    />
                  </>
                ) : (
                  <Route
                    path="/home/*"
                    element={<Navigate to="/home" replace />}
                  />
                )}
                <Route path="/" element={<Navigate to="/home" replace />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
            <ChatSupport />
          </CartProvider>
        </AuthProvider>
      </Suspense>
    </HashRouter>
  );
}
