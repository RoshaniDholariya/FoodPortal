import React, { useState, useEffect } from "react";
import axios from "axios";
import { Menu, AlertTriangle } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Sidebar from "../AdminSidebar";
import DashboardTabs from "./DashTabs";
import TabsContent from "./Tabs";

// Animated container component with fade-in effect
const FadeIn = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-opacity duration-1000 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
};

const FoodDonationDashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const [analytics, setAnalytics] = useState(null);
  const [donationTrends, setDonationTrends] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handle window resize
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

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [analyticsResponse, trendsResponse] = await Promise.all([
          axios.get("http://localhost:3000/admin/analytics"),
          axios.get("http://localhost:3000/admin/donation-trends"),
        ]);

        if (!analyticsResponse.data.success || !trendsResponse.data.success) {
          throw new Error("Failed to fetch data");
        }

        setAnalytics(analyticsResponse.data.data);
        setDonationTrends(trendsResponse.data.data);

        // Simulate longer loading for demo purposes
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load dashboard data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Format data for charts
  const formatDonorNgoData = () => {
    if (!donationTrends) return [];

    return donationTrends.map((item) => {
      const monthDate = new Date(item.month + "-01");
      const monthName = monthDate.toLocaleString("default", { month: "short" });

      return {
        month: monthName,
        donors: analytics?.totalDonors || 0,
        ngos: analytics?.totalNgos || 0,
      };
    });
  };

  const formatFoodStatusData = () => {
    if (!donationTrends) return [];

    return donationTrends.map((item) => {
      const monthDate = new Date(item.month + "-01");
      const monthName = monthDate.toLocaleString("default", { month: "short" });

      return {
        month: monthName,
        donated: item.completed,
        wasted: item.expired,
      };
    });
  };

  const formatWastageReductionData = () => {
    if (!donationTrends || donationTrends.length <= 1) return [];

    // Calculate wastage reduction based on completed donations
    return donationTrends.map((item, index) => {
      const monthDate = new Date(item.month + "-01");
      const monthName = monthDate.toLocaleString("default", { month: "short" });

      if (index === 0) {
        return {
          month: monthName,
          wastageReduction: 0,
        };
      }

      // Calculate reduction using the ratio of expired to completed donations
      const previousCompleted = donationTrends[index - 1].completed || 1;
      const previousExpired = donationTrends[index - 1].expired || 0;
      const previousRatio =
        previousExpired / (previousCompleted + previousExpired);

      const currentCompleted = item.completed || 1;
      const currentExpired = item.expired || 0;
      const currentRatio = currentExpired / (currentCompleted + currentExpired);

      // Calculate percentage reduction
      const reduction =
        previousRatio > 0
          ? ((previousRatio - currentRatio) / previousRatio) * 100
          : 0;

      return {
        month: monthName,
        wastageReduction: parseFloat(reduction.toFixed(1)),
      };
    });
  };

  const donorNgoData = formatDonorNgoData();
  const foodStatusData = formatFoodStatusData();
  const wastageReductionData = formatWastageReductionData();

  // Calculate metrics
  const calculateWastageRatio = () => {
    if (!analytics) return 0;

    const totalDonated = analytics.donationStats?.completed || 1;
    const totalWasted = analytics.expiredFoodCount || 0;
    return (totalWasted / (totalDonated + totalWasted)) * 100;
  };

  const calculateTotalWastageReduction = () => {
    if (!donationTrends || donationTrends.length < 2) return 0;

    const firstMonth = donationTrends[0];
    const lastMonth = donationTrends[donationTrends.length - 1];

    // Use completed donations in calculation
    const firstCompleted = firstMonth.completed || 1;
    const firstExpired = firstMonth.expired || 0;
    const firstRatio = firstExpired / (firstCompleted + firstExpired);

    const lastCompleted = lastMonth.completed || 1;
    const lastExpired = lastMonth.expired || 0;
    const lastRatio = lastExpired / (lastCompleted + lastExpired);

    if (firstRatio === 0) return 0;

    return ((firstRatio - lastRatio) / firstRatio) * 100;
  };

  const calculateCumulativeData = () => {
    if (!analytics) {
      return { donated: 0, wasted: 0 };
    }

    const donated = analytics.donationStats?.completed || 0;
    const wasted = analytics.expiredFoodCount || 0;

    return { donated, wasted };
  };

  const wastageRatio = calculateWastageRatio();
  const totalWastageReduction = calculateTotalWastageReduction();
  const cumulativeData = calculateCumulativeData();

  const pieChartData = [
    { name: "Donated Food", value: cumulativeData.donated, color: "#4ade80" },
    { name: "Wasted Food", value: cumulativeData.wasted, color: "#f87171" },
  ];

  // Dashboard statistics cards
  const stats = analytics
    ? [
        {
          title: "Current Donors",
          value: analytics.totalDonors,
          icon: "Users",
          trend:
            donationTrends && donationTrends.length > 1
              ? ((analytics.totalDonors - analytics.totalDonors * 0.9) /
                  (analytics.totalDonors * 0.9)) *
                100
              : 0,
          color: "#6366f1",
          bgColor: "rgba(99, 102, 241, 0.1)",
        },
        {
          title: "Active NGOs",
          value: analytics.totalNgos,
          icon: "Building",
          trend:
            donationTrends && donationTrends.length > 1
              ? ((analytics.totalNgos - analytics.totalNgos * 0.9) /
                  (analytics.totalNgos * 0.9)) *
                100
              : 0,
          color: "#0ea5e9",
          bgColor: "rgba(14, 165, 233, 0.1)",
        },
        {
          title: "Food Donated",
          value: (analytics.donationStats?.completed || 0) + " items",
          icon: "ShoppingBag",
          trend: 12.5,
          color: "#4ade80",
          bgColor: "rgba(74, 222, 128, 0.1)",
        },
        {
          title: "Wastage Reduced",
          value: totalWastageReduction.toFixed(1) + "%",
          icon: "Share2",
          trend:
            donationTrends && donationTrends.length > 0
              ? wastageReductionData[wastageReductionData.length - 1]
                  ?.wastageReduction || 0
              : 0,
          color: "#f97316",
          bgColor: "rgba(249, 115, 22, 0.1)",
        },
      ]
    : [
        {
          title: "Current Donors",
          value: 0,
          icon: "Users",
          trend: 0,
          color: "#6366f1",
          bgColor: "rgba(99, 102, 241, 0.1)",
        },
        {
          title: "Active NGOs",
          value: 0,
          icon: "Building",
          trend: 0,
          color: "#0ea5e9",
          bgColor: "rgba(14, 165, 233, 0.1)",
        },
        {
          title: "Food Donated",
          value: "0 items",
          icon: "ShoppingBag",
          trend: 0,
          color: "#4ade80",
          bgColor: "rgba(74, 222, 128, 0.1)",
        },
        {
          title: "Wastage Reduced",
          value: "0%",
          icon: "Share2",
          trend: 0,
          color: "#f97316",
          bgColor: "rgba(249, 115, 22, 0.1)",
        },
      ];

  // Dashboard tabs
  const tabs = [
    { id: "overview", name: "Overview", icon: "Activity" },
    { id: "donors-ngos", name: "Donors vs NGOs", icon: "BarChart3" },
    { id: "food-status", name: "Food Status", icon: "PieChart" },
  ];

  // Loading component using the provided Lottie animation
  if (loading) {
    return (
      <div className="flex">
        <div className="fixed inset-y-0 left-0 z-50">
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>

        <div
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
          } min-h-screen bg-gray-50 flex items-center justify-center`}
        >
          <div className="text-center">
            <div className="w-80 h-80 mx-auto">
              <DotLottieReact
                src="https://lottie.host/5e14278b-11dd-40da-b4d8-99ada5e3fe82/ksmwXmfbTJ.lottie"
                loop
                autoplay
              />
            </div>
            <p className="mt-4 text-gray-600 font-semibold">
              Loading dashboard data...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex">
        <div className="fixed inset-y-0 left-0 z-50">
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>

        <div
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
          } min-h-screen bg-gray-50 flex items-center justify-center`}
        >
          <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-md">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Error Loading Dashboard
            </h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white-50 overflow-hidden">
      <div className="fixed inset-y-0 left-0 z-50">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
        } overflow-y-auto`}
      >
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen((prev) => !prev)}
                className="text-gray-500 hover:text-gray-700 mr-4 focus:outline-none"
                aria-label="Toggle sidebar"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-bold text-gray-800">
                Food Donation Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>

          <DashboardTabs
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          <TabsContent
            activeTab={activeTab}
            stats={stats}
            foodStatusData={foodStatusData}
            donorNgoData={donorNgoData}
            wastageReductionData={wastageReductionData}
            cumulativeData={cumulativeData}
            pieChartData={pieChartData}
            totalWastageReduction={totalWastageReduction}
            wastageRatio={wastageRatio}
            analytics={analytics}
            FadeIn={FadeIn}
          />
        </div>
      </div>
    </div>
  );
};

export default FoodDonationDashboard;
