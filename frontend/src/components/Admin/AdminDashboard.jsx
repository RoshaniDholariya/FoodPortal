import React, { useState, useEffect } from "react";
import {
  PieChart,
  MessageSquare,
  Users,
  AlertCircle,
  LogOut,
  ShoppingBag,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Menu,
  X,
  Building,
} from "lucide-react";

const StatCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
    <div className="flex justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <h3 className="text-2xl font-bold mt-2">{value}</h3>
      </div>
      <div className="bg-teal-50 p-3 rounded-lg">
        <Icon className="h-6 w-6 text-teal-600" />
      </div>
    </div>
    <div className="mt-4 flex items-center">
      {trend > 0 ? (
        <ArrowUpRight className="h-4 w-4 text-green-500" />
      ) : (
        <ArrowDownRight className="h-4 w-4 text-red-500" />
      )}
      <span
        className={`text-sm ml-1 ${
          trend > 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        {Math.abs(trend)}% from last month
      </span>
    </div>
  </div>
);

const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setShowMobileSidebar(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { icon: PieChart, label: "Dashboard", active: true },
    { icon: MessageSquare, label: "NGO Details" },
    { icon: Users, label: "Donors Details" },
    { icon: AlertCircle, label: "Reports" },
    { icon: LogOut, label: "Logout" },
  ];

  const recentActivities = [
    {
      title: "New Restaurant Partner",
      description: "Golden Spoon Restaurant joined the network",
      time: "10 mins ago",
    },
    {
      title: "Food Pickup Completed",
      description: "25kg food collected from Hotel Sunshine",
      time: "1 hour ago",
    },
    {
      title: "NGO Distribution",
      description: "Food distributed to 100 people",
      time: "2 hours ago",
    },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-b from-emerald-50 to-teal-50">
      <aside className="hidden lg:block w-64 border-r bg-white">
        <div className="p-6">
          <h1 className="text-xl font-bold text-teal-600">FoodSaver</h1>
        </div>
        <nav className="mt-6 px-3">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center px-4 py-3 my-1 rounded-lg transition-colors
                ${
                  item.active
                    ? "bg-teal-50 text-teal-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="ml-3">{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>

      {isMobile && showMobileSidebar && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setShowMobileSidebar(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg">
            <div className="p-6 flex justify-between items-center">
              <h1 className="text-xl font-bold text-teal-600">FoodSaver</h1>
              <button
                onClick={() => setShowMobileSidebar(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="mt-6 px-3">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className={`flex items-center px-4 py-3 my-1 rounded-lg transition-colors
                    ${
                      item.active
                        ? "bg-teal-50 text-teal-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="ml-3">{item.label}</span>
                </a>
              ))}
            </nav>
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-6">
            {isMobile && (
              <button
                onClick={() => setShowMobileSidebar(true)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Dashboard Overview
              </h2>
              <p className="text-gray-600 mt-1">Welcome back, Admin</p>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard
              title="Total Food Saved"
              value="2,540 kg"
              icon={ShoppingBag}
              trend={12.5}
            />
            <StatCard
              title="Active NGOs"
              value="48"
              icon={Building}
              trend={8.2}
            />
            <StatCard
              title="Monthly Pickups"
              value="186"
              icon={Calendar}
              trend={-3.1}
            />
            <StatCard
              title="Active Donors"
              value="124"
              icon={Users}
              trend={5.7}
            />
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Recent Activities
            </h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="h-2 w-2 mt-2 rounded-full bg-teal-500 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {activity.description}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
