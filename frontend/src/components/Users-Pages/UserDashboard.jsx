import { useState, useEffect } from "react";
import { Bell, Menu } from "lucide-react";
import Sidebar from "./UserSidebar/UserSidebar";
import StatsGrid from "./UserStatusGrid/UserStatusGrid";
import RecentDonations from "./UserRecentDonation/UserRecentDonation";

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
    { label: "Total Donations", value: "156", icon: "Package" },
    { label: "People Helped", value: "1.2k", icon: "Users" },
    { label: "Success Rate", value: "98%", icon: "BarChart3" },
  ];

  const recentDonations = [
    {
      id: 1,
      name: "Fresh Vegetables",
      portions: 15,
      status: "Scheduled",
      pickupTime: "2:30 PM Today",
      location: "Main Kitchen",
    },
    {
      id: 2,
      name: "Prepared Meals",
      portions: 8,
      status: "Completed",
      pickupTime: "11:00 AM Today",
      location: "Side Entrance",
    },
    {
      id: 3,
      name: "Baked Goods",
      portions: 20,
      status: "Available",
      pickupTime: "4:00 PM Today",
      location: "Front Counter",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex-1">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-8">
          <button
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
            aria-label="Open sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="ml-auto flex items-center space-x-4">
            <div
              className="h-8 w-8 rounded-full bg-[#61cf73] text-white flex items-center justify-center"
              title="Profile"
            >
              <span className="text-sm font-medium">JD</span>
            </div>
            <button
              className="p-2 text-gray-500 hover:text-gray-700"
              aria-label="View notifications"
            >
              <Bell className="h-6 w-6" />
            </button>
          </div>
        </header>
        <main className="p-4 lg:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, John!
            </h1>
            <p className="mt-2 text-gray-600">
              Here's what's happening with your donations today.
            </p>
          </div>
          <StatsGrid stats={stats} />
          <RecentDonations donations={recentDonations} />
        </main>
      </div>
    </div>
  );
};

export default DonorDashboard;
