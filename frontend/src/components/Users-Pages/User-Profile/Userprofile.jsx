import React, { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Award,
  Calendar,
  Package,
  Menu,
  Edit,
  Bell,
  ChevronRight,
  Heart,
} from "lucide-react";
import Sidebar from "../UserSidebar/UserSidebar";

const DonorProfile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const donorData = {
    name: "Sarah Johnson",
    organization: "Fresh Foods Market",
    email: "sarah@freshfoods.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, New York, NY 10001",
    totalDonations: 2500,
    joinedDate: "January 2024",
    activeListings: 3,
    impactedLives: 1250,
    rating: 4.9,
  };

  useEffect(() => {
    setIsSidebarOpen(window.innerWidth >= 1024);
    window.addEventListener("resize", () =>
      setIsSidebarOpen(window.innerWidth >= 1024)
    );
    return () =>
      window.removeEventListener("resize", () =>
        setIsSidebarOpen(window.innerWidth >= 1024)
      );
  }, []);

  return (
    <div className="min-h-screen flex  bg-white-300">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex-1">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-black text-xl font-semibold bg-gradient-to-r from-[#61cf73] to-emerald-400 bg-clip-text text-transparent">
              Donor Profile
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Edit className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </header>

        <div className="p-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="h-40 bg-gradient-to-r from-[#61cf73] to-emerald-400"></div>
                <div className="px-6 pb-6 -mt-16">
                  <div className="flex justify-center">
                    <img
                      src="/api/placeholder/120/120"
                      alt="Profile"
                      className="rounded-full border-4 border-white shadow-md w-32 h-32"
                    />
                  </div>
                  <div className="text-center mt-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {donorData.name}
                    </h2>
                    <p className="text-[#61cf73] font-medium">
                      {donorData.organization}
                    </p>
                  </div>
                  <br />
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Mail className="w-5 h-5 text-[#61cf73]" />
                      <span>{donorData.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Phone className="w-5 h-5 text-[#61cf73]" />
                      <span>{donorData.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <MapPin className="w-5 h-5 text-[#61cf73]" />
                      <span>{donorData.address}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-5 h-5 text-[#61cf73]" />
                    <span className="text-sm text-gray-500">
                      Total Donations
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {donorData.totalDonations} kg
                  </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-[#61cf73]" />
                    <span className="text-sm text-gray-500">
                      Active Listings
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {donorData.activeListings}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-5 h-5 text-[#61cf73]" />
                    <span className="text-sm text-gray-500">
                      Lives Impacted
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {donorData.impactedLives}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-[#61cf73]" />
                    <span className="text-sm text-gray-500">Member Since</span>
                  </div>
                  <p className="text-lg font-bold text-gray-800">
                    {donorData.joinedDate}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Create New Listing
                      </h3>
                      <p className="text-gray-500 mt-1">
                        Share your excess food
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#61cf73] group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
                <button className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        View Donation History
                      </h3>
                      <p className="text-gray-500 mt-1">Track your impact</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#61cf73] group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="h-10 w-10 rounded-full bg-[#61cf73]/10 flex items-center justify-center">
                        <Package className="h-5 w-5 text-[#61cf73]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">
                          Donated 25kg of fresh produce
                        </h4>
                        <p className="text-sm text-gray-500">2 hours ago</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorProfile;
