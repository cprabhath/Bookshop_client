import React, { useState } from "react";
import {
  Mail,
  Lock,
  User,
  Phone,
  BookOpen,
  Library,
  Bookmark,
  GraduationCap,
  LocateFixed,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import useBooks from "../data/books";
import { useToast } from "../hooks/use-toast";
import AxiosInstance from "../lib/AxiosInstence";

export default function Register() {
  const { toast } = useToast();
  const books = useBooks();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    MobileNumber: "",
    password: "",
    confirmPassword: "",
    address: "",
    favoriteGenres: [] as string[],
    ReadingGoals: "casual",
  });

  const readingGoals = [
    {
      value: "10",
      label: "Casual Reader",
      description: "1-2 books per month",
    },
    { value: "20", label: "Avid Reader", description: "3-5 books per month" },
    { value: "35", label: "Bookworm", description: "6+ books per month" },
    {
      value: "50",
      label: "Book Dragon",
      description: "10+ books per month",
    },
    {
      value: "75",
      label: "Book Master",
      description: "15+ books per month",
    },
    {
      value: "100",
      label: "Book God",
      description: "20+ books per month",
    },
  ];

  const uniqueCategories = new Set<string>();
  const uniqueBooks = books.filter((book) => {
    if (book.category?.name && !uniqueCategories.has(book.category.name)) {
      uniqueCategories.add(book.category.name);
      return true;
    }
    return false;
  });

  // Customer Register
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Password and confirm password does not matched!",
        variant: "destructive",
      });
      return;
    }

    await AxiosInstance.post("/Auth/customer-register", formData)
      .then(() => {
        toast({
          title: "Account created successfully!",
          description: "You can now login to your account.",
          variant: "success",
        });
        setFormData({
          name: "",
          email: "",
          MobileNumber: "",
          password: "",
          confirmPassword: "",
          address: "",
          favoriteGenres: [],
          ReadingGoals: "casual",
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data) {
          err.response.data.$values
            .map(
              (x: { errorMessage: string; description: string }) =>
                x.errorMessage || x.description
            )
            .forEach((error: string) => {
              toast({
                title: "Uh oh! Something went wrong.",
                description: error,
                variant: "destructive",
              });
            });
        }
      });
  };

  const handleGenreToggle = (genre: string) => {
    setFormData((prev) => ({
      ...prev,
      favoriteGenres: prev.favoriteGenres.includes(genre)
        ? prev.favoriteGenres.filter((g) => g !== genre)
        : [...prev.favoriteGenres, genre],
    }));
  };

  return (
    <main className="min-h-screen pt-16 pb-12 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Side - Form */}
          <div className="flex-1 bg-white rounded-2xl shadow-xl p-8 border">
            <div className="flex items-center justify-center mb-10 flex-col">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 mb-2">
                Unlock the World of Books
              </h1>
              <p>Join the community and start your reading journey today.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Enter your full name"
                        className="pl-10 w-full rounded-lg border-gray-300 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        required
                      />
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="Enter your email address"
                        className="pl-10 w-full rounded-lg border-gray-300 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        required
                      />
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Input
                        type="tel"
                        value={formData.MobileNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            MobileNumber: e.target.value,
                          })
                        }
                        placeholder="Enter your phone number"
                        className="pl-10 w-full rounded-lg border-gray-300 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        required
                      />
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        placeholder="Enter your password"
                        className="pl-10 w-full rounded-lg border-gray-300 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        required
                      />
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                        placeholder="Confirm your password"
                        className="pl-10 w-full rounded-lg border-gray-300 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        required
                      />
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <div className="relative">
                      <Textarea
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            address: e.target.value,
                          })
                        }
                        placeholder="Enter your address"
                        className="resize-none pl-10 w-full rounded-lg border-gray-300 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        required
                      />
                      <LocateFixed className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Reading Preferences */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Favorite Genres
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {uniqueBooks.slice(0, 5).map((book, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => {
                            if (book.category?.name) {
                              handleGenreToggle(book.category.name);
                            }
                          }}
                          className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            formData.favoriteGenres.includes(
                              book.category?.name || ""
                            )
                              ? "bg-primary-100 text-primary-700 ring-2 ring-primary-500"
                              : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          <Bookmark className="h-4 w-4 mr-2" />
                          {book.category?.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Reading Goal
                    </label>
                    <div className="space-y-3">
                      {readingGoals.map((goal) => (
                        <label
                          key={goal.value}
                          className={`flex items-center p-4 rounded-lg cursor-pointer transition-all ${
                            formData.ReadingGoals === goal.value
                              ? "bg-primary-50 ring-2 ring-primary-500"
                              : "bg-gray-50 hover:bg-gray-100"
                          }`}
                        >
                          <input
                            type="radio"
                            name="readingGoal"
                            value={goal.value}
                            checked={formData.ReadingGoals === goal.value}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                ReadingGoals: e.target.value,
                              })
                            }
                            className="hidden"
                          />
                          <GraduationCap
                            className={`h-5 w-5 mr-3 ${
                              formData.ReadingGoals === goal.value
                                ? "text-primary-600"
                                : "text-gray-400"
                            }`}
                          />
                          <div>
                            <div className="font-medium text-gray-900">
                              {goal.label}
                            </div>
                            <div className="text-sm text-gray-500">
                              {goal.description}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                >
                  <Library className="h-5 w-5 mr-2" />
                  Join with us
                </button>
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Back to Login
              </Link>
            </p>
          </div>

          {/* Right Side - Benefits */}
          <div className="lg:w-96 space-y-8">
            <div className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-5 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
              <span className="absolute top-5 z-0 h-[60px] w-[60px] rounded-full bg-sky-500 transition-all duration-300 group-hover:scale-[20]"></span>
              <div className="relative z-10 mx-auto max-w-md">
                <span className="grid h-[60px] w-[60px] place-items-center rounded-full bg-sky-500 transition-all duration-300 group-hover:bg-sky-400">
                  <BookOpen className="h-6 w-6 text-white" />
                </span>
                <div className="space-y-2 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                  <h3 className="text-lg font-semibold">
                    Personalized Experience
                  </h3>
                  <p>
                    Get book recommendations tailored to your reading
                    preferences and interests.
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-5 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
              <span className="absolute top-5 z-0 h-[60px] w-[60px] rounded-full bg-secondary-500 transition-all duration-300 group-hover:scale-[20]"></span>
              <div className="relative z-10 mx-auto max-w-md">
                <span className="grid h-[60px] w-[60px] place-items-center rounded-full bg-secondary-500 transition-all duration-300 group-hover:bg-secondary-400">
                  <Library className="h-6 w-6 text-white" />
                </span>
                <div className="space-y-2 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                  <h3 className="text-lg font-semibold">Track Your Progress</h3>
                  <p>
                    Set reading goals and track your progress with our intuitive
                    tools.
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-5 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
              <span className="absolute top-5 z-0 h-[60px] w-[60px] rounded-full bg-accent-500 transition-all duration-300 group-hover:scale-[20]"></span>
              <div className="relative z-10 mx-auto max-w-md">
                <span className="grid h-[60px] w-[60px] place-items-center rounded-full bg-accent-500 transition-all duration-300 group-hover:bg-accent-400">
                  <Bookmark className="h-6 w-6 text-white" />
                </span>
                <div className="space-y-2 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                  <h3 className="text-lg font-semibold">Join the Community</h3>
                  <p>
                    Connect with fellow readers, share reviews, and participate
                    in book discussions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
