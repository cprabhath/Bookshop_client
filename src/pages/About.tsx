import { useEffect, useState } from "react";
import { Book, Heart, Globe } from "lucide-react";
import Preloader from "../components/PreLoader";


export default function About() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  
  return (
    <>
      {isLoading && <Preloader />}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 mb-8">
            About Bookverse
          </h1>

          <div className="prose prose-indigo max-w-none">
            <div className="mb-12">
              <img
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=2000"
                alt="Library"
                className="w-full h-64 object-cover rounded-lg mb-8"
              />
              <p className="text-lg text-gray-600 mb-6">
                Welcome to Bookverse, where the love for reading meets the
                convenience of modern shopping. Founded in 2024, we've been
                dedicated to bringing the best literary works to readers
                worldwide.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-4">
                  <Book className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Our Mission</h3>
                <p className="text-gray-600">
                  To make quality literature accessible to everyone, everywhere.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-4">
                  <Heart className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Our Values</h3>
                <p className="text-gray-600">
                  Quality, accessibility, and passion for literature.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-4">
                  <Globe className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Our Reach</h3>
                <p className="text-gray-600">
                  Serving book lovers across the globe.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Our Story
              </h2>
              <p className="text-gray-600 mb-4">
                What started as a small online bookstore has grown into a global
                community of readers. We believe in the power of books to
                inspire, educate, and transform lives.
              </p>
              <p className="text-gray-600">
                Our team of passionate readers and book experts works tirelessly
                to curate the finest collection of books, ensuring that every
                reader finds their perfect match.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
