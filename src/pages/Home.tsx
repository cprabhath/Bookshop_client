import { ArrowRight, ShoppingBag, Gift, Percent } from "lucide-react";
import { Link } from "react-router-dom";
import MainSlider from "../components/MainSlider";
import BookSlider from "../components/BookSlider";
import { books } from "../data/books";
import Features from "../components/Features";
import FeedbackSlider from "../components/FeedbackSlider";
import Preloader from "../components/PreLoader";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const featuredBooks = books.slice(0, 6);
  const newArrivals = [...books].reverse().slice(0, 6);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const promotions = [
    {
      title: "Spring Sale",
      description: "Up to 50% off on selected titles",
      image:
        "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=1000",
      color: "from-pink-500 to-rose-500 opacity-60 transition-colors",
    },
    {
      title: "Student Discount",
      description: "20% off with valid student ID",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1000",
      color: "from-blue-500 to-indigo-500 opacity-60 transition-colors",
    },
    {
      title: "Book Bundle Deals",
      description: "Buy 2 get 1 free on fiction",
      image:
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1000",
      color: "from-purple-500 to-violet-500 opacity-60 transition-colors",
    },
  ];

  return (
    <>
      {isLoading && <Preloader/>}
      <main className="flex-grow">
        <MainSlider />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Featured Books Section */}
          <div className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <span className="opacity-0">View All</span>
              <h2 className="text-4xl text-transparent font-bold bg-clip-text bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500">
                Featured Books
              </h2>
              <Link
                to="/shop"
                className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
              >
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <BookSlider books={featuredBooks} />
          </div>

          {/* Promotions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {promotions.map((promo, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-2xl shadow-lg"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r opacity-90 transition-opacity group-hover:opacity-95 ${promo.color}`}
                  style={{
                    backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                  }}
                />
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
                  <div className="flex items-center mb-4">
                    {index === 0 ? (
                      <Percent className="h-8 w-8" />
                    ) : index === 1 ? (
                      <Gift className="h-8 w-8" />
                    ) : (
                      <ShoppingBag className="h-8 w-8" />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-center">
                    {promo.title}
                  </h3>
                  <p className="text-lg opacity-90 mb-4 text-center">
                    {promo.description}
                  </p>
                  <Link
                    to="/shop"
                    className="inline-flex items-center px-6 py-2 bg-white text-gray-900 rounded-full hover:bg-opacity-90 transition-colors"
                  >
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* New Arrivals Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <span className="opacity-0">View All</span>
              <h2 className="text-4xl text-transparent font-bold bg-clip-text bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 ">
                New Arrivals
              </h2>
              <Link
                to="/shop"
                className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
              >
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <BookSlider books={newArrivals} />
          </div>

          {/* Features Section */}
          <div>
            <div className="flex justify-center items-center mb-6">
              <h2 className="text-4xl text-transparent font-bold bg-clip-text bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 p-2">
                Why Choose Us?
              </h2>
            </div>
            <Features />
          </div>

          <div className="mt-8">
            <div className="flex justify-center items-center mb-6">
              <h2 className="text-4xl text-transparent font-bold bg-clip-text bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 p-2">
                Customer Feedbacks
              </h2>
            </div>
            <FeedbackSlider />
          </div>
        </div>
      </main>
    </>
  );
}
