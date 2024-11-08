import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Heart,
  Clock,
  Shield,
} from "lucide-react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Customer } from "../types";
import PasswordChange from "../components/PasswordChange";
import CameraUploadButton from "../components/CameraUpload";
import AxiosInstance from "../lib/AxiosInstence";
import { useToast } from "../hooks/use-toast";
import Spinner from "../components/Spinner";

export default function Profile() {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState({
    id: 0,
    image: "",
    name: "",
    email: "",
    mobileNumber: "",
    address: "",
    bio: "",
    booksRead: 0,
    readingGoals: 0,
    orders: { $values: [] },
    favoriteGenres: { $values: [] },
  });

  const [userDetails, setUserDetails] = useState<Customer | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("UserDetails");
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  }, []);

  useEffect(() => {
    if (!userDetails?.id) return;

    setLoading(true);

    const fetchProfile = async () => {
      try {
        const res = await AxiosInstance.get(`/Customer/${userDetails.id}`);
        setProfile((prevProfile) => ({
          ...prevProfile,
          ...res.data,
        }));
      } catch (error) {
        toast({
          title: "Error",
          description: error.message || "Failed to fetch profile data.",
          variant: "destructive",
        });
      }
    };

    const fetchOrders = async () => {
      try {
        const res = await AxiosInstance.get(`/Order/${userDetails.id}`);
        const ordersData = res.data.$values || [];
        setProfile((prevProfile) => ({
          ...prevProfile,
          orders: { $values: ordersData },
          booksRead: ordersData.length,
        }));
      } catch (error) {
        toast({
          title: "Error",
          description: error.message || "Failed to fetch orders.",
          variant: "destructive",
        });
      }
    };

    fetchProfile();
    fetchOrders();
    
    setTimeout(() => {
      setLoading(false);
    }, 1000); 
  }, [userDetails?.id, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setLoading(true);

    try {
      await AxiosInstance.put(`/Customer/${userDetails?.id}`, profile);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully",
        variant: "success",
      });
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to update your profile.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const year = new Date(userDetails?.createAt).getFullYear();
  const stats = [
    {
      icon: BookOpen,
      label: "Books Read",
      value: profile.booksRead > 0 ? profile.booksRead : 0,
    },
    {
      icon: Heart,
      label: "Favorite Genres",
      value: profile.favoriteGenres.$values.length > 0 ? profile.favoriteGenres.$values.length : 0,
    },
    {
      icon: Clock,
      label: "Reading Goal",
      value: `${profile.booksRead}/${profile.readingGoals}`,
    },
  ];
  return (
    <>
      {loading ? (
       <Spinner/>
      ) : (
        <>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
            <div className="flex justify-center items-center mb-6">
              <h2 className="text-4xl text-transparent font-bold bg-clip-text bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 p-2">
                Your Profile
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Profile Card */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl border shadow-md overflow-hidden">
                  <div className="relative h-48">
                    <div className="absolute inset-0">
                      <img
                        src="https://gobookmart.com/wp-content/uploads/2022/05/8-Most-Anticipated-Books-Releasing-in-June-2022-1140x641.jpg"
                        alt=""
                      />
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                      <div className="relative">
                        <img
                          src={profile.image}
                          alt="Profile"
                          className="w-32 h-32 rounded-full border-4 border-white object-cover"
                        />
                        {isEditing && (
                          <CameraUploadButton userID={profile.id} />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-20 pb-8 px-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 uppercase">
                      {profile.name}
                    </h2>
                    <p className="text-gray-500 mt-1">
                      {"Member since " + year}
                    </p>

                    <div className="mt-6 grid grid-cols-3 gap-4 border-t border-gray-100 pt-6">
                      {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                          <div className="flex justify-center mb-2">
                            <stat.icon className="h-6 w-6 text-primary-500" />
                          </div>
                          <div className="text-2xl font-bold text-gray-900">
                            {stat.value}
                          </div>
                          <div className="text-xs text-gray-500">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Security Section */}
                <div className="mt-8 bg-white border rounded-2xl shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <Shield className="h-6 w-6 text-primary-500 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Security
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <button
                      onClick={() => setIsOpen(true)}
                      className="w-full text-left px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column - Profile Details */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl border shadow-md p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Profile Details
                    </h3>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-primary-600 border text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <div className="relative rounded-lg shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <Input
                            type="text"
                            value={profile.name}
                            disabled={!isEditing}
                            onChange={(e) =>
                              setProfile({ ...profile, name: e.target.value })
                            }
                            className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-black"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <div className="relative rounded-lg shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                          </div>
                          <Input
                            type="email"
                            value={profile.email}
                            disabled={true}
                            onChange={(e) =>
                              setProfile({ ...profile, email: e.target.value })
                            }
                            className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-black"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone
                        </label>
                        <div className="relative rounded-lg shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                          </div>
                          <Input
                            type="tel"
                            value={profile.mobileNumber}
                            disabled={!isEditing}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                mobileNumber: e.target.value,
                              })
                            }
                            className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-black"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address
                        </label>
                        <div className="relative rounded-lg shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-gray-400" />
                          </div>
                          <Input
                            type="text"
                            value={profile.address}
                            disabled={!isEditing}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                address: e.target.value,
                              })
                            }
                            className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-black"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                      </label>
                      <Textarea
                        value={profile.bio}
                        disabled={!isEditing}
                        rows={4}
                        onChange={(e) =>
                          setProfile({ ...profile, bio: e.target.value })
                        }
                        className="resize-none block w-full rounded-lg border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-black"
                      />
                    </div>

                    {isEditing && (
                      <div className="flex justify-end space-x-4">
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                        >
                          Save Changes
                        </button>
                      </div>
                    )}
                  </form>
                </div>

                {/* Reading Progress */}
                <div className="mt-8 border bg-white rounded-2xl shadow-md p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Monthly Goal
                  </h3>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-600 bg-primary-100">
                          Progress
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-primary-600">
                          {Math.round(
                            (profile.orders.$values.length /
                              profile.readingGoals) *
                              100
                          )}
                          %
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-primary-100">
                      <div
                        style={{
                          width: `${
                            (profile.orders.$values.length /
                              profile.readingGoals) *
                            100
                          }%`,
                        }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-primary-500 to-secondary-500"
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600">
                      You've ordered {profile.orders.$values.length} out of your{" "}
                      {profile.readingGoals} books goal this year. Keep it up!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <PasswordChange
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            Email={userDetails.email}
          />
        </>
      )}
    </>
  );
}
