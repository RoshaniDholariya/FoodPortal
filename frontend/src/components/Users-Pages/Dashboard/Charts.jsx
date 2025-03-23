// import React, { useState, useEffect } from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import axios from "axios";

// const Charts = ({ fadeIn }) => {
//   const [pieData, setPieData] = useState([]);
//   const [weeklyData, setWeeklyData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const COLORS = ["#10B981", "#6366F1", "#3B82F6"];

//   useEffect(() => {
//     const fetchChartData = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           "http://localhost:3000/api/donors/food-status-counts",
//           {
//             withCredentials: true,
//           }
//         );

//         if (response.data.success) {
//           setPieData(response.data.pieData);
//           setWeeklyData(response.data.weeklyData);
//         } else {
//           setError("Failed to load chart data");
//         }
//       } catch (err) {
//         console.error("Error fetching chart data:", err);
//         setError("An error occurred while fetching chart data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChartData();
//   }, []);

//   const CustomTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
//           <p className="font-medium text-gray-800">{`${payload[0].name}: ${payload[0].value}`}</p>
//         </div>
//       );
//     }
//     return null;
//   };

//   if (loading) {
//     return (
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         <div className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-md h-80 flex items-center justify-center">
//           <p className="text-gray-500">Loading chart data...</p>
//         </div>
//         <div className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-md h-80 flex items-center justify-center">
//           <p className="text-gray-500">Loading chart data...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         <div className="bg-white rounded-2xl border border-red-100 p-6 shadow-md h-80 flex items-center justify-center">
//           <p className="text-red-500">{error}</p>
//         </div>
//         <div className="bg-white rounded-2xl border border-red-100 p-6 shadow-md h-80 flex items-center justify-center">
//           <p className="text-red-500">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//       <div
//         className={`bg-white rounded-2xl border border-emerald-100 p-6 shadow-md transition-all duration-500 ${
//           fadeIn ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
//         }`}
//         style={{ transitionDelay: "300ms" }}
//       >
//         <h3 className="text-lg font-semibold text-emerald-900 mb-4">
//           Donation Status Distribution
//         </h3>
//         <div className="h-64">
//           {pieData.length > 0 ? (
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={pieData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="value"
//                   label={({ name, percent }) =>
//                     `${name} ${(percent * 100).toFixed(0)}%`
//                   }
//                 >
//                   {pieData.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip content={<CustomTooltip />} />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           ) : (
//             <div className="h-full flex items-center justify-center">
//               <p className="text-gray-500">No donation data available</p>
//             </div>
//           )}
//         </div>
//       </div>

//       <div
//         className={`bg-white rounded-2xl border border-emerald-100 p-6 shadow-md transition-all duration-500 ${
//           fadeIn ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
//         }`}
//         style={{ transitionDelay: "600ms" }}
//       >
//         <h3 className="text-lg font-semibold text-emerald-900 mb-4">
//           Weekly Donation Records
//         </h3>
//         <div className="h-64">
//           {weeklyData.length > 0 ? (
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={weeklyData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="completed" name="Completed" fill="#10B981" />
//                 <Bar dataKey="expired" name="Expired" fill="#EF4444" />
//               </BarChart>
//             </ResponsiveContainer>
//           ) : (
//             <div className="h-full flex items-center justify-center">
//               <p className="text-gray-500">No weekly donation data available</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Charts;
import React, { useState, useEffect } from "react";
import Sidebar from "../UserSidebar/UserSidebar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Menu, ChartPie, BarChart2, TrendingUp } from "lucide-react";

const Charts = () => {
  const { state } = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [pieData, setPieData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartView, setChartView] = useState("all");

  const COLORS = ["#6366F1", "#EF4444", "#10B981"];

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3000/api/donors/food-status-counts",
          {
            withCredentials: true,
          }
        );

        if (response.data.success) {
          setPieData(response.data.pieData);
          setWeeklyData(response.data.weeklyData);
        } else {
          setError("Failed to load chart data");
        }
      } catch (err) {
        console.error("Error fetching chart data:", err);
        setError("An error occurred while fetching chart data");
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
          <p className="font-medium text-gray-800">{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  const completedDonations =
    pieData.find((item) => item.name === "Completed")?.value || 0;
  const availableDonations =
    pieData.find((item) => item.name === "Available")?.value || 0;
  const expiredDonations =
    pieData.find((item) => item.name === "Expired")?.value || 0;
  const totalDonations =
    completedDonations + availableDonations + expiredDonations;

  return (
    <div className="min-h-screen bg-white-300 flex">
      <div className="fixed inset-y-0 left-0 z-50">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
      <div className={`flex-1 ${isSidebarOpen ? "lg:ml-64" : ""}`}>
        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="lg:hidden text-gray-500 hover:text-gray-700 m-4"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>

        <main className="p-4 lg:p-8">
          <div className="max-w-5xl mx-auto">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-[#61cf73]"></div>
              </div>
            ) : error ? (
              <div className="text-center bg-red-100 text-red-600 p-4 rounded-lg">
                {error}
              </div>
            ) : (
              <>
                <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                  <div className="flex gap-4 flex-wrap">
                    <div className="bg-[#61cf73]/10 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                      Total : {totalDonations}
                    </div>
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                      Completed : {completedDonations}
                    </div>
                    <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                      Available : {availableDonations}
                    </div>
                    <div className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium">
                      Expired : {expiredDonations}
                    </div>
                  </div>

                  <div className="flex gap-4 justify-end mt-4 md:mt-0">
                    <button
                      onClick={() => setChartView("all")}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                        chartView === "all"
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <TrendingUp className="w-4 h-4" />
                      All Charts
                    </button>
                    <button
                      onClick={() => setChartView("pie")}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                        chartView === "pie"
                          ? "bg-indigo-500 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <ChartPie className="w-4 h-4" />
                      Status
                    </button>
                    <button
                      onClick={() => setChartView("bar")}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                        chartView === "bar"
                          ? "bg-emerald-500 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <BarChart2 className="w-4 h-4" />
                      Weekly
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {(chartView === "all" || chartView === "pie") && (
                    <div className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-md">
                      <h3 className="text-lg font-semibold text-emerald-900 mb-4">
                        Donation Status Distribution
                      </h3>
                      <div className="h-64">
                        {pieData.length > 0 ? (
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) =>
                                  `${name} ${(percent * 100).toFixed(0)}%`
                                }
                              >
                                {pieData.map((entry, index) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                  />
                                ))}
                              </Pie>
                              <Tooltip content={<CustomTooltip />} />
                              <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        ) : (
                          <div className="h-full flex items-center justify-center">
                            <p className="text-gray-500">
                              No donation data available
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {(chartView === "all" || chartView === "bar") && (
                    <div className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-md">
                      <h3 className="text-lg font-semibold text-emerald-900 mb-4">
                        Weekly Donation Records
                      </h3>
                      <div className="h-64">
                        {weeklyData.length > 0 ? (
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={weeklyData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar
                                dataKey="completed"
                                name="Completed"
                                fill="#10B981"
                              />
                              <Bar
                                dataKey="expired"
                                name="Expired"
                                fill="#EF4444"
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        ) : (
                          <div className="h-full flex items-center justify-center">
                            <p className="text-gray-500">
                              No weekly donation data available
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {chartView === "all" && (
                  <div className="mt-6 bg-white rounded-2xl border border-emerald-100 p-6 shadow-md">
                    <h3 className="text-lg font-semibold text-emerald-900 mb-4">
                      Donation Metrics
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-emerald-50 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-emerald-600">
                              Completed Rate
                            </p>
                            <p className="text-2xl font-bold text-emerald-700">
                              {totalDonations
                                ? (
                                    (completedDonations / totalDonations) *
                                    100
                                  ).toFixed(1)
                                : 0}
                              %
                            </p>
                          </div>
                          <div className="p-3 rounded-full bg-emerald-100">
                            <ChartPie className="w-5 h-5 text-emerald-600" />
                          </div>
                        </div>
                        <p className="text-xs text-emerald-600 mt-2">
                          {completedDonations} out of {totalDonations} donations
                          completed
                        </p>
                      </div>

                      <div className="bg-blue-50 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-blue-600">
                              Available Rate
                            </p>
                            <p className="text-2xl font-bold text-blue-700">
                              {totalDonations
                                ? (
                                    (availableDonations / totalDonations) *
                                    100
                                  ).toFixed(1)
                                : 0}
                              %
                            </p>
                          </div>
                          <div className="p-3 rounded-full bg-blue-100">
                            <ChartPie className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                        <p className="text-xs text-blue-600 mt-2">
                          {availableDonations} out of {totalDonations} donations
                          available
                        </p>
                      </div>

                      <div className="bg-red-50 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-red-600">Expired Rate</p>
                            <p className="text-2xl font-bold text-red-700">
                              {totalDonations
                                ? (
                                    (expiredDonations / totalDonations) *
                                    100
                                  ).toFixed(1)
                                : 0}
                              %
                            </p>
                          </div>
                          <div className="p-3 rounded-full bg-red-100">
                            <ChartPie className="w-5 h-5 text-red-600" />
                          </div>
                        </div>
                        <p className="text-xs text-red-600 mt-2">
                          {expiredDonations} out of {totalDonations} donations
                          expired
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Charts;
