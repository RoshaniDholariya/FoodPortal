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
    <div className="bg-white rounded-lg p-6 shadow hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{stat.label}</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
          <p className="text-sm text-gray-500 mt-2">{stat.description}</p>
        </div>
        <div className="p-3 bg-green-50 rounded-full">
          <stat.icon className="w-6 h-6 text-green-600" />
        </div>
      </div>
    </div>
  );

  const DonationCard = ({ donation }) => (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg text-gray-900">
            {donation.name}
          </h3>
          <p className="text-sm text-gray-500">{donation.type}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            donation.status === "Available"
              ? "bg-green-100 text-green-800"
              : donation.status === "Scheduled"
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {donation.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <Clock className="w-4 h-4 text-gray-400 mr-2" />
          <span className="text-sm text-gray-600">{donation.pickupTime}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="w-4 h-4 text-gray-400 mr-2" />
          <span className="text-sm text-gray-600">{donation.location}</span>
        </div>
        <div className="flex items-center">
          <Package className="w-4 h-4 text-gray-400 mr-2" />
          <span className="text-sm text-gray-600">
            {donation.portions} portions
          </span>
        </div>
        <div className="flex items-center">
          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
          <span className="text-sm text-gray-600">
            Expires: {donation.expiryDate}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed inset-y-0 left-0 z-50">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      <div className={`${isSidebarOpen ? "lg:ml-64" : ""}`}>
        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="lg:hidden text-gray-500 hover:text-gray-700"
          aria-label="Open sidebar"
        >
          <Menu className="h-6 w-6 m-5" />
        </button>

        <main className="pt-16 p-4 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recent Donations
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {donations.map((donation) => (
                <DonationCard key={donation.id} donation={donation} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DonorDashboard;
