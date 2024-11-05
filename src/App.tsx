import { HashRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Footer from "./components/Footer";
import Preloader from "./components/PreLoader";
import NotFound from "./pages/NotFound";

export default function App() {
  const [loading, setLoading] = useState(true);
  const tokenRef = useRef<string | null>(null);

  useEffect(() => {
    tokenRef.current = localStorage.getItem("token");

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <HashRouter>
      <AuthProvider>
        <CartProvider>
          {loading && <Preloader />}
          <div
            className={`min-h-screen bg-gray-50 flex flex-col transition-opacity duration-500 ${
              loading ? "opacity-0" : "opacity-100"
            }`}
          >
            <Navbar />
            <div className="pt-16">
              <Routes>
                <Route path="/shop" element={<Shop />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                {tokenRef.current && (
                  <>
                    <Route path="/home/profile" element={<Profile />} />
                    <Route path="/home/orders" element={<Orders />} />
                  </>
                )}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </HashRouter>
  );
}
