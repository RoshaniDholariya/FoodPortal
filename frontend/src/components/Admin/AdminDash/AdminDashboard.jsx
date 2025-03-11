import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Menu,
  ShoppingBag,
  Building,
  Users,
  AlertTriangle,
} from "lucide-react";
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import Sidebar from "../AdminSidebar";

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
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [activeTab, setActiveTab] = useState("donors-ngos");

  const [analytics, setAnalytics] = useState(null);
  const [donationTrends, setDonationTrends] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load dashboard data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

    return donationTrends.map((item, index) => {
      const monthDate = new Date(item.month + "-01");
      const monthName = monthDate.toLocaleString("default", { month: "short" });

      if (index === 0) {
        return {
          month: monthName,
          wastageReduction: 0,
        };
      }

      const previousRatio = donationTrends[index - 1].expiredRatio;
      const currentRatio = item.expiredRatio;
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

  const calculateWastageRatio = () => {
    if (!analytics) return 0;
    return parseFloat(analytics.expiredFoodRatio);
  };

  const calculateTotalWastageReduction = () => {
    if (!donationTrends || donationTrends.length < 2) return 0;

    const firstMonth = donationTrends[0];
    const lastMonth = donationTrends[donationTrends.length - 1];

    if (firstMonth.expiredRatio === 0) return 0;

    return (
      ((firstMonth.expiredRatio - lastMonth.expiredRatio) /
        firstMonth.expiredRatio) *
      100
    );
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
    { name: "Donated Food", value: cumulativeData.donated, color: "#10b981" },
    { name: "Wasted Food", value: cumulativeData.wasted, color: "#f43f5e" },
  ];

  const stats = analytics
    ? [
        {
          title: "Current Donors",
          value: analytics.totalDonors,
          icon: Users,
          trend:
            donationTrends && donationTrends.length > 1
              ? (
                  ((analytics.totalDonors - analytics.totalDonors * 0.9) /
                    (analytics.totalDonors * 0.9)) *
                  100
                ).toFixed(1)
              : 0,
        },
        {
          title: "Active NGOs",
          value: analytics.totalNgos,
          icon: Building,
          trend:
            donationTrends && donationTrends.length > 1
              ? (
                  ((analytics.totalNgos - analytics.totalNgos * 0.9) /
                    (analytics.totalNgos * 0.9)) *
                  100
                ).toFixed(1)
              : 0,
        },
        {
          title: "Food Donated",
          value: (analytics.donationStats?.completed || 0) + " items",
          icon: ShoppingBag,
          trend: 12.5,
        },
        {
          title: "Wastage Reduced",
          value: totalWastageReduction.toFixed(1) + "%",
          icon: AlertTriangle,
          trend:
            donationTrends && donationTrends.length > 0
              ? wastageReductionData[wastageReductionData.length - 1]
                  ?.wastageReduction || 0
              : 0,
        },
      ]
    : [
        { title: "Current Donors", value: 0, icon: Users, trend: 0 },
        { title: "Active NGOs", value: 0, icon: Building, trend: 0 },
        {
          title: "Food Donated",
          value: "0 items",
          icon: ShoppingBag,
          trend: 0,
        },
        {
          title: "Wastage Reduced",
          value: "0%",
          icon: AlertTriangle,
          trend: 0,
        },
      ];

  const tabs = [
    { id: "donors-ngos", name: "Donors vs NGOs" },
    { id: "food-status", name: "Donated vs Wasted Food" },
    { id: "wastage-reduction", name: "Wastage Reduction Tracking" },
  ];

  const StatisticsGrid = ({ stats }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <FadeIn key={stat.title} delay={index * 100}>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-500">
                <stat.icon className="h-6 w-6" />
              </div>
              <span className="ml-auto text-xs font-medium inline-flex items-center rounded-full px-2 py-1 transition-colors">
                {stat.trend > 0 ? (
                  <span className="text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    +{stat.trend}%
                  </span>
                ) : (
                  <span className="text-red-600 bg-red-50 px-2 py-1 rounded-full">
                    {stat.trend}%
                  </span>
                )}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {stat.value}
            </p>
          </div>
        </FadeIn>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-center mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-gray-600 text-center">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 w-full bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white-300">
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
              <h1 className="text-2xl font-bold text-gray-900">
                Food Donation Analytics
              </h1>
              <p className="text-sm text-gray-500">
                Track donations, wastage reduction and impact
              </p>
            </div>
          </div>

          <div className="mb-8">
            <StatisticsGrid stats={stats} />
          </div>
          <div className="bg-white rounded-xl shadow-sm mb-0">
            <div className="border-b border-gray-100 px-4">
              <nav className="flex -mb-px">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      if (!tab.disabled) {
                        setActiveTab(tab.id);
                      }
                    }}
                    disabled={tab.disabled}
                    className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? "border-teal-500 text-teal-600"
                        : tab.disabled
                        ? "border-transparent text-gray-300 cursor-not-allowed"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {activeTab === "donors-ngos" && (
            <FadeIn delay={100}>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Donors vs NGOs Comparison
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={donorNgoData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="donors"
                        fill="#6366f1"
                        name="Number of Donors"
                      />
                      <Bar
                        dataKey="ngos"
                        fill="#10b981"
                        name="Number of NGOs"
                      />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-700">Key Insights:</h4>
                  <ul className="mt-2 space-y-2 text-sm text-gray-600">
                    <li>
                      • Total registered donors:{" "}
                      <span className="font-bold text-teal-600">
                        {analytics?.totalDonors || 0}
                      </span>
                    </li>
                    <li>
                      • Total active NGOs:{" "}
                      <span className="font-bold text-teal-600">
                        {analytics?.totalNgos || 0}
                      </span>
                    </li>
                    <li>
                      • Current donor-to-NGO ratio:{" "}
                      <span className="font-bold text-teal-600">
                        {analytics?.totalNgos > 0
                          ? (
                              analytics.totalDonors / analytics.totalNgos
                            ).toFixed(1)
                          : "N/A"}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </FadeIn>
          )}

          {activeTab === "food-status" && (
            <div className="space-y-8">
              <FadeIn delay={100}>
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Donated vs Wasted Food Over Time
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={foodStatusData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient
                            id="colorDonated"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#10b981"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#10b981"
                              stopOpacity={0}
                            />
                          </linearGradient>
                          <linearGradient
                            id="colorWasted"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#f43f5e"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#f43f5e"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="donated"
                          name="Donated Food (items)"
                          stroke="#10b981"
                          fillOpacity={1}
                          fill="url(#colorDonated)"
                        />
                        <Area
                          type="monotone"
                          dataKey="wasted"
                          name="Wasted Food (items)"
                          stroke="#f43f5e"
                          fillOpacity={1}
                          fill="url(#colorWasted)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </FadeIn>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <FadeIn delay={200}>
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Overall Food Distribution
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            label={({ name, percent }) =>
                              `${name} ${(percent * 100).toFixed(1)}%`
                            }
                          >
                            {pieChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `${value} items`} />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </FadeIn>

                <FadeIn delay={300}>
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Key Food Distribution Metrics
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-medium text-green-800">
                          Total Food Donated
                        </h4>
                        <p className="text-2xl font-bold text-green-600 mt-1">
                          {analytics?.donationStats?.completed?.toLocaleString() ||
                            0}{" "}
                          items
                        </p>
                        <p className="text-sm text-green-700 mt-1">
                          {cumulativeData.donated + cumulativeData.wasted > 0
                            ? (
                                (cumulativeData.donated /
                                  (cumulativeData.donated +
                                    cumulativeData.wasted)) *
                                100
                              ).toFixed(1)
                            : 0}
                          % of total food
                        </p>
                      </div>

                      <div className="p-4 bg-red-50 rounded-lg">
                        <h4 className="font-medium text-red-800">
                          Total Food Wasted
                        </h4>
                        <p className="text-2xl font-bold text-red-600 mt-1">
                          {analytics?.expiredFoodCount?.toLocaleString() || 0}{" "}
                          items
                        </p>
                        <p className="text-sm text-red-700 mt-1">
                          {cumulativeData.donated + cumulativeData.wasted > 0
                            ? (
                                (cumulativeData.wasted /
                                  (cumulativeData.donated +
                                    cumulativeData.wasted)) *
                                100
                              ).toFixed(1)
                            : 0}
                          % of total food
                        </p>
                      </div>

                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-800">
                          Current Efficiency
                        </h4>
                        <p className="text-2xl font-bold text-blue-600 mt-1">
                          {(100 - wastageRatio).toFixed(1)}%
                        </p>
                        <p className="text-sm text-blue-700 mt-1">
                          {donationTrends && donationTrends.length > 1
                            ? `Up from ${(
                                100 - donationTrends[0].expiredRatio
                              ).toFixed(1)}% in ${new Date(
                                donationTrends[0].month + "-01"
                              ).toLocaleString("default", { month: "long" })}`
                            : "No historical data available"}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          )}

          {activeTab === "wastage-reduction" && (
            <FadeIn delay={100}>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Food Wastage Reduction Tracking
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={wastageReductionData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 25]} />
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="wastageReduction"
                        name="Wastage Reduction (%)"
                        stroke="#10b981"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </main>
    </div>
  );
};

export default FoodDonationDashboard;
