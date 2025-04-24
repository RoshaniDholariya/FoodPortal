import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Menu,
  User,
  ClipboardList,
  CheckCircle,
  Clock,
  Users,
  Bell,
  ChevronDown,
  LogOut,
} from "lucide-react";
import Sidebar from "./NGOsidebar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const NGODashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeNotification, setActiveNotification] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleNotifications = () => setActiveNotification(!activeNotification);

  const COLORS = ["#10b981", "#34d399", "#6ee7b7", "#a7f3d0", "#d1fae5"];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const currentUser = await axios.get(
          "http://localhost:3000/api/ngo/getngoDetails",
          {
            withCredentials: true,
          }
        );
        const ngoId = currentUser.data.ngo.id;
        console.log(ngoId);

        const response = await axios.get(
          `http://localhost:3000/api/ngo/dashboard/${ngoId}`,
          {
            withCredentials: true,
          }
        );

        setDashboardData(response.data.data);
      } catch (err) {
        setError("Failed to fetch dashboard data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-emerald-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-50">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p>{error}</p>
          <button
            className="mt-4 bg-emerald-600 text-white py-2 px-4 rounded hover:bg-emerald-700"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-50">
      <Sidebar isSidebarOpen={isSidebarOpen} />

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div className="lg:ml-64">
        <header className="pt-4 px-8 sticky top-0 bg-emerald-50/80 backdrop-blur-sm z-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-emerald-200">
            <div>
              <h1 className="text-3xl font-bold text-emerald-900">
                {dashboardData?.ngo?.name || "NGO Dashboard"}
              </h1>
              <p className="text-emerald-600">
                Serving hope, one meal at a time
              </p>
            </div>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <div className="relative">
                <button
                  className="text-emerald-600 hover:text-emerald-900 relative"
                  onClick={toggleNotifications}
                >
                  <Bell className="h-6 w-6" />
                  {dashboardData?.notifications?.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                      {dashboardData.notifications.length}
                    </span>
                  )}
                </button>

                {activeNotification && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl z-20 border border-emerald-100">
                    <div className="p-3 border-b border-emerald-100">
                      <h3 className="font-semibold text-emerald-900">
                        Notifications
                      </h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {dashboardData?.notifications?.length > 0 ? (
                        dashboardData.notifications.map((item) => (
                          <div
                            key={item.id}
                            className="p-3 border-b border-emerald-50 hover:bg-emerald-50 cursor-pointer"
                          >
                            <p className="text-sm text-emerald-900">
                              {item.message}
                            </p>
                            <p className="text-xs text-emerald-500 mt-1">
                              {new Date(item.createdAt).toLocaleString()}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-center text-emerald-500 text-sm">
                          No new notifications
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-800 font-semibold">
                  NG
                </div>
                <ChevronDown className="h-4 w-4 text-emerald-600" />
              </div>

              <button
                onClick={toggleSidebar}
                className="text-emerald-600 hover:text-emerald-900 lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: "Total Food Donations",
                value: dashboardData?.totalFoodDonations || 0,
                icon: ClipboardList,
                color: "emerald",
              },
              {
                title: "Accepted Donations",
                value: dashboardData?.acceptedFoodDonations || 0,
                icon: CheckCircle,
                color: "emerald",
              },
              {
                title: "Pending Donations",
                value: dashboardData?.pendingFoodDonations || 0,
                icon: Clock,
                color: "amber",
              },
              {
                title: "Total Donors Connected",
                value: dashboardData?.totalDonorsConnected || 0,
                icon: Users,
                color: "emerald",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-emerald-100"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className={`text-${stat.color}-600 text-sm`}>
                      {stat.title}
                    </p>
                    <h3 className="text-3xl font-bold mt-1 text-gray-800">
                      {stat.value.toLocaleString()}
                    </h3>
                  </div>
                  <div
                    className={`h-12 w-12 rounded-full bg-${stat.color}-100 flex items-center justify-center`}
                  >
                    <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 border border-emerald-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Recent Notifications
                </h2>
                <a
                  href="#"
                  className="text-sm text-emerald-600 hover:text-emerald-800"
                >
                  View All
                </a>
              </div>

              <div className="space-y-4">
                {dashboardData?.notifications
                  ?.slice(0, 4)
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className="border-b border-gray-100 pb-4 last:border-0"
                    >
                      <p className="text-gray-800">{notification.message}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-emerald-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Connected Donors
                </h2>
                <a
                  href="#"
                  className="text-sm text-emerald-600 hover:text-emerald-800"
                >
                  View All
                </a>
              </div>

              <div className="space-y-4">
                {dashboardData?.connections?.slice(0, 4).map((connection) => (
                  <div
                    key={connection.id}
                    className="flex items-center space-x-3 border-b border-gray-100 pb-4 last:border-0"
                  >
                    <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-semibold">
                      {connection.Donor.image ? (
                        <img
                          src={connection.Donor.image}
                          alt={connection.Donor.name}
                          className="h-10 w-10 rounded-full"
                        />
                      ) : (
                        connection.Donor.name.charAt(0)
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {connection.Donor.name}
                      </p>
                      <p className="text-sm text-gray-500">Active Donor</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NGODashboard;
