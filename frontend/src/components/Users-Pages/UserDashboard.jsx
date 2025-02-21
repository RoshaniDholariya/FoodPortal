import React, { useState, useEffect } from "react";
import {
  Bell,
  Menu,
  Package,
  Users,
  BarChart3,
  MapPin,
  Clock,
  Calendar,
  Globe2,
  ChevronRight,
} from "lucide-react";
import Sidebar from "./UserSidebar/UserSidebar";

const DonorDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const stats = [
    {
      label: "Total Donations",
      value: "156",
      description: "14% increase from last month",
      icon: Package,
    },
    {
      label: "People Helped",
      value: "1.2k",
      description: "12% increase from last month",
      icon: Users,
    },
    {
      label: "Success Rate",
      value: "98%",
      description: "2% increase from last month",
      icon: BarChart3,
    },
  ];

  const donations = [
    {
      id: 1,
      name: "Fresh Vegetables",
      portions: 15,
      status: "Scheduled",
      pickupTime: "2:30 PM Today",
      location: "Main Kitchen",
      type: "Produce",
      expiryDate: "Today",
    },
    {
      id: 2,
      name: "Prepared Meals",
      portions: 8,
      status: "Completed",
      pickupTime: "11:00 AM Today",
      location: "Side Entrance",
      type: "Cooked Food",
      expiryDate: "Today",
    },
    {
      id: 3,
      name: "Baked Goods",
      portions: 20,
      status: "Available",
      pickupTime: "4:00 PM Today",
      location: "Front Counter",
      type: "Bakery",
      expiryDate: "Tomorrow",
    },
  ];

  const StatCard = ({ stat }) => (
    <div className="group bg-white rounded-2xl border border-emerald-100 overflow-hidden hover:shadow-xl hover:shadow-emerald-600/10 hover:scale-[1.02] transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-emerald-900">
              {stat.label}
            </h3>
            <p className="text-3xl font-bold text-emerald-800 mt-2">
              {stat.value}
            </p>
            <p className="text-sm text-emerald-600 mt-2">{stat.description}</p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-100 rounded-2xl animate-pulse" />
            <div className="relative p-4 bg-emerald-600 text-white rounded-2xl shadow-lg shadow-emerald-600/20">
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const DonationCard = ({ donation }) => (
    <div className="group bg-white rounded-2xl border border-emerald-100 overflow-hidden hover:shadow-xl hover:shadow-emerald-600/10 hover:scale-[1.02] transition-all duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="font-semibold text-lg text-emerald-900">
              {donation.name}
            </h3>
            <p className="text-sm text-emerald-600">{donation.type}</p>
          </div>
          <span
            className={`px-4 py-1.5 rounded-full text-sm font-medium ${
              donation.status === "Available"
                ? "bg-emerald-100 text-emerald-800"
                : donation.status === "Scheduled"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {donation.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 px-4 py-3 bg-emerald-50 rounded-xl">
            <Clock className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-emerald-700">
              {donation.pickupTime}
            </span>
          </div>
          <div className="flex items-center space-x-3 px-4 py-3 bg-emerald-50 rounded-xl">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-emerald-700">
              {donation.location}
            </span>
          </div>
          <div className="flex items-center space-x-3 px-4 py-3 bg-emerald-50 rounded-xl">
            <Package className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-emerald-700">
              {donation.portions} portions
            </span>
          </div>
          <div className="flex items-center space-x-3 px-4 py-3 bg-emerald-50 rounded-xl">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-emerald-700">
              Expires: {donation.expiryDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="fixed inset-y-0 left-0 z-50">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64" : ""
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-emerald-100">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-4">
                <button
                  onClick={() => setIsSidebarOpen((prev) => !prev)}
                  className="lg:hidden p-2 text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-emerald-900 mb-6">
              Recent Donations
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {donations.map((donation) => (
                <DonationCard key={donation.id} donation={donation} />
              ))}
            </div>
          </div>
        </main>

        {/* Animated background blobs */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-teal-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </div>
      </div>
    </div>
  );
};

// Animation styles
const style = `
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animate-blob {
  animation: blob 7s infinite;
}
`;

export default DonorDashboard;
