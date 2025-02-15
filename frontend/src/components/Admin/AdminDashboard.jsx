import React, { useState, useEffect } from "react";
import { Menu, ShoppingBag, Building, Calendar, Users } from "lucide-react";
import Sidebar from "./AdminSidebar";
import StatisticsGrid from "./AdminGrid";

const RecentActivity = ({ activity }) => (
  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
    <div className="h-2 w-2 mt-2 rounded-full bg-teal-500 flex-shrink-0" />
    <div className="flex-1 min-w-0">
      <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
      <p className="text-sm text-gray-500">{activity.description}</p>
    </div>
    <span className="text-xs text-gray-400 flex-shrink-0">{activity.time}</span>
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

  const stats = [
    {
      title: "Total Food Saved",
      value: "2,540 kg",
      icon: ShoppingBag,
      trend: 12.5,
    },
    {
      title: "Active NGOs",
      value: "48",
      icon: Building,
      trend: 8.2,
    },
    {
      title: "Monthly Pickups",
      value: "186",
      icon: Calendar,
      trend: -3.1,
    },
    {
      title: "Active Donors",
      value: "124",
      icon: Users,
      trend: 5.7,
    },
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
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        isMobile={isMobile}
        showMobileSidebar={showMobileSidebar}
        onCloseSidebar={() => setShowMobileSidebar(false)}
      />

      <main className="lg:pl-72">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            {isMobile && (
              <button
                onClick={() => setShowMobileSidebar(true)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome back, John Smith</p>
            </div>
          </div>

          <div className="mb-8">
            <StatisticsGrid stats={stats} />
          </div>

          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">
                Recent Activities
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <RecentActivity key={index} activity={activity} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
