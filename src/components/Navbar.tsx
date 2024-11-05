import React, { useEffect, useState  } from "react";
import {
  ShoppingCart,
  BookOpen,
  Menu,
  X,
  User,
  LogOut,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link, useLocation } from "react-router-dom";
import CartModal from "./CartModal";
import LoginModal from "./LoginModal";
import SearchBox from "./SearchBox";
import { useAuth } from "../context/AuthContext";
import LogoutConfirmation from "./Logout";
import { useToast } from "../hooks/use-toast";

const Navbar: React.FC = () => {
  const { cartItems } = useCart();
  const { toast } = useToast();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLogoutDialogOpen, setLogoutDialogOpen] = useState(false); 
  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const navLinks = [
    { path: "/home", label: "Home" },
    { path: "/shop", label: "Shop" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  const profileLinks = [
    { icon: User, label: "Manage Profile", path: "/home/profile" },
    { icon: ShoppingBag, label: "My Orders", path: "/home/orders" },
    { icon: LogOut, label: "Logout", action: () => setLogoutDialogOpen(true) },
  ];

  useEffect(() => {
    const welcome = localStorage.getItem("token");
    if (welcome) {
      toast({
        title: "Welcome to Bookverse! 📚",
        description: "You journey will continue from where you left off",
        variant: "success",
      });
    }
  }, [toast]);

  return (
    <>
      <nav className="bg-white shadow-lg fixed w-full top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/home" className="flex items-center">
                <BookOpen className="h-8 w-8 text-primary-600" />
                <span className="ml-2 text-xl font-bold text-gray-800">
                  Bookverse
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <SearchBox />

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={` font-medium ${
                    location.pathname === link.path
                      ? "text-primary-600"
                      : "text-gray-500 hover:text-primary-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                        alt="Profile"
                        className="h-8 w-8 rounded-full ring-2 ring-primary-500"
                      />
                      <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                      {profileLinks.map((item, index) =>
                        item.path ? (
                          <Link
                            key={index}
                            to={item.path}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <item.icon className="h-4 w-4 mr-3 text-gray-400" />
                            {item.label}
                          </Link>
                        ) : (
                          <button
                            key={index}
                            onClick={() => {
                              item.action?.();
                              setIsProfileOpen(false);
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <item.icon className="h-4 w-4 mr-3 text-gray-400" />
                            {item.label}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className="font-medium text-gray-500 hover:text-primary-600"
                  >
                    Login
                  </button>
                  <Link
                    to="/register"
                    className="font-medium rounded-full text-white bg-primary-600 px-4 py-2 hover:bg-primary-700"
                  >
                    Register
                  </Link>
                </div>
              )}

              {isLoggedIn && (
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-primary-600" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <SearchBox />
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === link.path
                      ? "text-primary-600 bg-primary-50"
                      : "text-gray-500 hover:text-primary-600 hover:bg-primary-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {!isLoggedIn && (
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setIsLoginOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-primary-600 hover:bg-primary-50"
                  >
                    Login
                  </button>
                  <Link
                    to="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      <LogoutConfirmation
        onLogout={logout}
        isOpen={isLogoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
      />

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}

export default Navbar;