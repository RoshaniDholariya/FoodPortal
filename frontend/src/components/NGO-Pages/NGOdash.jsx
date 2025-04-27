// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Menu,
//   User,
//   ClipboardList,
//   CheckCircle,
//   Clock,
//   Users,
//   Bell,
//   ChevronDown,
//   LogOut,
//   PieChart as PieChartIcon,
//   BarChart as BarChartIcon,
// } from "lucide-react";
// import Sidebar from "./NGOsidebar";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
//   PieChart,
//   Pie,
//   Cell,
//   Sector,
// } from "recharts";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// const NGODashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeNotification, setActiveNotification] = useState(false);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [fadeIn, setFadeIn] = useState(false);

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
//   const toggleNotifications = () => setActiveNotification(!activeNotification);

//   const COLORS = ["#10b981", "#6ee7b7", "#f59e0b", "#fbbf24"];

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         setLoading(true);
//         const currentUser = await axios.get(
//           "http://localhost:3000/api/ngo/getngoDetails",
//           {
//             withCredentials: true,
//           }
//         );
//         const ngoId = currentUser.data.ngo.id;
//         console.log(ngoId);

//         const response = await axios.get(
//           `http://localhost:3000/api/ngo/dashboard/${ngoId}`,
//           {
//             withCredentials: true,
//           }
//         );

//         setDashboardData(response.data.data);

//         setTimeout(() => {
//           setFadeIn(true);
//         }, 300);
//       } catch (err) {
//         setError("Failed to fetch dashboard data");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   const onPieEnter = (_, index) => {
//     setActiveIndex(index);
//   };

//   const renderActiveShape = (props) => {
//     const {
//       cx,
//       cy,
//       innerRadius,
//       outerRadius,
//       startAngle,
//       endAngle,
//       fill,
//       payload,
//       percent,
//       value,
//     } = props;

//     return (
//       <g>
//         <text
//           x={cx}
//           y={cy}
//           dy={-20}
//           textAnchor="middle"
//           fill="#333"
//           className="text-lg font-medium"
//         >
//           {payload.name}
//         </text>
//         <text
//           x={cx}
//           y={cy}
//           dy={8}
//           textAnchor="middle"
//           fill="#333"
//           className="text-xl font-bold"
//         >
//           {value}
//         </text>
//         <text
//           x={cx}
//           y={cy}
//           dy={30}
//           textAnchor="middle"
//           fill="#666"
//           className="text-sm"
//         >
//           ({(percent * 100).toFixed(0)}%)
//         </text>
//         <Sector
//           cx={cx}
//           cy={cy}
//           innerRadius={innerRadius}
//           outerRadius={outerRadius + 10}
//           startAngle={startAngle}
//           endAngle={endAngle}
//           fill={fill}
//         />
//         <Sector
//           cx={cx}
//           cy={cy}
//           startAngle={startAngle}
//           endAngle={endAngle}
//           innerRadius={outerRadius + 12}
//           outerRadius={outerRadius + 16}
//           fill={fill}
//         />
//       </g>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="flex">
//         <div className="fixed inset-y-0 left-0 z-50">
//           <Sidebar
//             isSidebarOpen={isSidebarOpen}
//             setIsSidebarOpen={setIsSidebarOpen}
//           />
//         </div>
//         <div
//           className={`flex-1 transition-all duration-300 ${
//             isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
//           } min-h-screen bg-gray-50 flex items-center justify-center`}
//         >
//           <div className="text-center">
//             <div className="w-80 h-80 mx-auto">
//               <DotLottieReact
//                 src="https://lottie.host/5e14278b-11dd-40da-b4d8-99ada5e3fe82/ksmwXmfbTJ.lottie"
//                 loop
//                 autoplay
//               />
//             </div>
//             <p className="mt-4 text-gray-600 font-semibold">
//               Loading dashboard data...
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const donationData = [
//     {
//       name: "Accepted Donations",
//       value: dashboardData?.acceptedFoodDonations || 0,
//     },
//     {
//       name: "Pending Donations",
//       value: dashboardData?.pendingFoodDonations || 0,
//     },
//   ];

//   const barChartData = [
//     {
//       name: "Donations",
//       "Total Donations": dashboardData?.totalFoodDonations || 0,
//       "Accepted Donations": dashboardData?.acceptedFoodDonations || 0,
//       "Pending Donations": dashboardData?.pendingFoodDonations || 0,
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-50">
//       <Sidebar isSidebarOpen={isSidebarOpen} />

//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
//           onClick={toggleSidebar}
//         />
//       )}

//       <div className="lg:ml-64">
//         <header className="pt-4 px-8 sticky top-0 bg-emerald-50/80 backdrop-blur-sm z-10">
//           <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-emerald-200">
//             <div>
//               <h1 className="text-3xl font-bold text-emerald-900">
//                 {dashboardData?.ngo?.name || "NGO Dashboard"}
//               </h1>
//               <p className="text-emerald-600">
//                 Serving hope, one meal at a time
//               </p>
//             </div>
//             <div className="flex items-center space-x-6 mt-4 md:mt-0">
//               <div className="relative">
//                 <button
//                   className="text-emerald-600 hover:text-emerald-900 relative"
//                   onClick={toggleNotifications}
//                 >
//                   <Bell className="h-6 w-6" />
//                   {dashboardData?.notifications?.length > 0 && (
//                     <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
//                       {dashboardData.notifications.length}
//                     </span>
//                   )}
//                 </button>

//                 {activeNotification && (
//                   <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl z-20 border border-emerald-100">
//                     <div className="p-3 border-b border-emerald-100">
//                       <h3 className="font-semibold text-emerald-900">
//                         Notifications
//                       </h3>
//                     </div>
//                     <div className="max-h-80 overflow-y-auto">
//                       {dashboardData?.notifications?.length > 0 ? (
//                         dashboardData.notifications.map((item) => (
//                           <div
//                             key={item.id}
//                             className="p-3 border-b border-emerald-50 hover:bg-emerald-50 cursor-pointer"
//                           >
//                             <p className="text-sm text-emerald-900">
//                               {item.message}
//                             </p>
//                             <p className="text-xs text-emerald-500 mt-1">
//                               {new Date(item.createdAt).toLocaleString()}
//                             </p>
//                           </div>
//                         ))
//                       ) : (
//                         <div className="p-3 text-center text-emerald-500 text-sm">
//                           No new notifications
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="flex items-center space-x-2">
//                 <div className="h-10 w-10 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-800 font-semibold">
//                   NG
//                 </div>
//               </div>

//               <button
//                 onClick={toggleSidebar}
//                 className="text-emerald-600 hover:text-emerald-900 lg:hidden"
//               >
//                 <Menu className="h-6 w-6" />
//               </button>
//             </div>
//           </div>
//         </header>

//         <main className="max-w-7xl mx-auto px-4 md:px-8 py-6">
//           <div
//             className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transition-opacity duration-500 ${
//               fadeIn ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             {[
//               {
//                 title: "Total Food Donations",
//                 value: dashboardData?.totalFoodDonations || 0,
//                 icon: ClipboardList,
//                 color: "emerald",
//               },
//               {
//                 title: "Accepted Donations",
//                 value: dashboardData?.acceptedFoodDonations || 0,
//                 icon: CheckCircle,
//                 color: "emerald",
//               },
//               {
//                 title: "Pending Donations",
//                 value: dashboardData?.pendingFoodDonations || 0,
//                 icon: Clock,
//                 color: "amber",
//               },
//               {
//                 title: "Total Donors Connected",
//                 value: dashboardData?.totalDonorsConnected || 0,
//                 icon: Users,
//                 color: "emerald",
//               },
//             ].map((stat, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-emerald-100 transform hover:-translate-y-1"
//                 style={{
//                   transitionDelay: `${index * 100}ms`,
//                   opacity: fadeIn ? 1 : 0,
//                   transform: fadeIn ? "translateY(0)" : "translateY(20px)",
//                 }}
//               >
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <p className={`text-${stat.color}-600 text-sm`}>
//                       {stat.title}
//                     </p>
//                     <h3 className="text-3xl font-bold mt-1 text-gray-800">
//                       {stat.value.toLocaleString()}
//                     </h3>
//                   </div>
//                   <div
//                     className={`h-12 w-12 rounded-full bg-${stat.color}-100 flex items-center justify-center`}
//                   >
//                     <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Charts Section */}
//           <div
//             className={`grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 transition-opacity duration-700 ${
//               fadeIn ? "opacity-100" : "opacity-0"
//             }`}
//             style={{ transitionDelay: "400ms" }}
//           >
//             {/* Pie Chart */}
//             <div className="bg-white p-6 rounded-xl shadow-md border border-emerald-100">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold text-emerald-900 flex items-center">
//                   <PieChartIcon className="h-5 w-5 mr-2 text-emerald-600" />
//                   Donation Status Distribution
//                 </h3>
//               </div>
//               <div className="h-80">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       activeIndex={activeIndex}
//                       activeShape={renderActiveShape}
//                       data={donationData}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={80}
//                       outerRadius={120}
//                       fill="#8884d8"
//                       dataKey="value"
//                       onMouseEnter={onPieEnter}
//                     >
//                       {donationData.map((entry, index) => (
//                         <Cell
//                           key={`cell-${index}`}
//                           fill={COLORS[index % COLORS.length]}
//                         />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//               <div className="flex justify-center mt-4 space-x-8">
//                 {donationData.map((entry, index) => (
//                   <div key={`legend-${index}`} className="flex items-center">
//                     <div
//                       className="w-3 h-3 rounded-full mr-2"
//                       style={{ backgroundColor: COLORS[index % COLORS.length] }}
//                     />
//                     <span className="text-sm text-gray-600">{entry.name}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Bar Chart */}
//             <div className="bg-white p-6 rounded-xl shadow-md border border-emerald-100">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold text-emerald-900 flex items-center">
//                   <BarChartIcon className="h-5 w-5 mr-2 text-emerald-600" />
//                   Donation Status Overview
//                 </h3>
//               </div>
//               <div className="h-80">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart
//                     data={barChartData}
//                     margin={{
//                       top: 20,
//                       right: 30,
//                       left: 20,
//                       bottom: 5,
//                     }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip
//                       contentStyle={{
//                         backgroundColor: "rgba(255, 255, 255, 0.9)",
//                         borderRadius: "8px",
//                         border: "1px solid #d1fae5",
//                       }}
//                     />
//                     <Legend />
//                     <Bar
//                       dataKey="Total Donations"
//                       fill="#10b981"
//                       radius={[4, 4, 0, 0]}
//                     />
//                     <Bar
//                       dataKey="Accepted Donations"
//                       fill="#6ee7b7"
//                       radius={[4, 4, 0, 0]}
//                     />
//                     <Bar
//                       dataKey="Pending Donations"
//                       fill="#fbbf24"
//                       radius={[4, 4, 0, 0]}
//                     />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default NGODashboard;
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Menu,
  User,
  ClipboardList,
  CheckCircle,
  Users,
  Bell,
  BarChart as BarChartIcon,
  ArrowUp,
  Calendar,
  Shield,
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
} from "recharts";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const NGODashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notificationDropdown, setNotificationDropdown] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleNotifications = () => setNotificationDropdown(!notificationDropdown);

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

        const response = await axios.get(
          `http://localhost:3000/api/ngo/dashboard/${ngoId}`,
          {
            withCredentials: true,
          }
        );

        setDashboardData(response.data.data);

        setTimeout(() => {
          setFadeIn(true);
        }, 300);
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

  const barChartData = [
    {
      name: "Donations",
      "Total Donations": dashboardData?.totalFoodDonations || 0,
      "Accepted Donations": dashboardData?.acceptedFoodDonations || 0,
    },
  ];

  // Format date for notifications
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return diffInHours <= 1 ? '1 hour ago' : `${diffInHours} hours ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

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
        <header className="pt-6 px-8 sticky top-0 bg-emerald-50/80 backdrop-blur-sm z-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-emerald-200">
            <div>
              <h1 className="text-3xl font-bold text-emerald-900">
                Welcome, {dashboardData?.ngo?.name || "Partner"}!
              </h1>
              <p className="text-emerald-600">
                Your impact dashboard at a glance
              </p>
            </div>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <div className="relative">
                <button
                  className="text-emerald-600 hover:text-emerald-900 relative p-2 rounded-full hover:bg-emerald-100"
                  onClick={toggleNotifications}
                >
                  <Bell className="h-6 w-6" />
                  {dashboardData?.notifications?.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                      {dashboardData.notifications.length}
                    </span>
                  )}
                </button>

                {notificationDropdown && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-20 border border-emerald-100">
                    <div className="p-3 border-b border-emerald-100 flex justify-between items-center">
                      <h3 className="font-semibold text-emerald-900">
                        Notifications
                      </h3>
                      <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                        {dashboardData?.notifications?.length || 0} new
                      </span>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {dashboardData?.notifications?.length > 0 ? (
                        dashboardData.notifications.map((item) => (
                          <div
                            key={item.id}
                            className="p-4 border-b border-emerald-50 hover:bg-emerald-50 cursor-pointer transition-colors"
                          >
                            <div className="flex items-start">
                              <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3 text-emerald-600">
                                <Bell className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm text-emerald-900 font-medium">
                                  {item.message}
                                </p>
                                <p className="text-xs text-emerald-500 mt-1">
                                  {formatDate(item.createdAt)}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center">
                          <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-3">
                            <Bell className="h-8 w-8 text-emerald-500" />
                          </div>
                          <p className="text-emerald-900 font-medium">All caught up!</p>
                          <p className="text-emerald-600 text-sm mt-1">No new notifications</p>
                        </div>
                      )}
                    </div>
                    <div className="p-3 border-t border-emerald-50 text-center">
                      <button className="text-emerald-600 hover:text-emerald-900 text-sm font-medium">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-800 font-semibold shadow-sm">
                  {dashboardData?.ngo?.name?.charAt(0) || "N"}
                </div>
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

        <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          {/* Dashboard Stats */}
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 transition-opacity duration-500 ${
              fadeIn ? "opacity-100" : "opacity-0"
            }`}
          >
            {[
              {
                title: "Total Food Donations",
                value: dashboardData?.totalFoodDonations || 0,
                icon: ClipboardList,
                color: "emerald",
                trend: "+12% from last month",
                trendUp: true,
              },
              {
                title: "Accepted Donations",
                value: dashboardData?.acceptedFoodDonations || 0,
                icon: CheckCircle,
                color: "emerald",
                trend: "+8% from last month",
                trendUp: true,
              },
              {
                title: "Connected Donors",
                value: dashboardData?.totalDonorsConnected || 0,
                icon: Users,
                color: "emerald",
                trend: "+5 new this month",
                trendUp: true,
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-emerald-100 transform hover:-translate-y-1"
                style={{
                  transitionDelay: `${index * 100}ms`,
                  opacity: fadeIn ? 1 : 0,
                  transform: fadeIn ? "translateY(0)" : "translateY(20px)",
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-emerald-600 text-sm">
                      {stat.title}
                    </p>
                    <h3 className="text-3xl font-bold mt-1 text-gray-800">
                      {stat.value.toLocaleString()}
                    </h3>
                    <div className="flex items-center mt-2">
                      <span className={`text-xs ${stat.trendUp ? "text-green-600" : "text-red-600"} flex items-center`}>
                        {stat.trendUp ? <ArrowUp className="h-3 w-3 mr-1" /> : null}
                        {stat.trend}
                      </span>
                    </div>
                  </div>
                  <div className="h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center shadow-sm">
                    <stat.icon className="h-7 w-7 text-emerald-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Area */}
          <div 
            className={`grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 transition-opacity duration-700 ${
              fadeIn ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            {/* Bar Chart */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-emerald-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-emerald-900 flex items-center">
                  <BarChartIcon className="h-5 w-5 mr-2 text-emerald-600" />
                  Donation Overview
                </h3>
                <div className="bg-emerald-50 rounded-lg px-3 py-1 text-xs text-emerald-700">
                  Last 30 days
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={barChartData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        borderRadius: "8px",
                        border: "1px solid #d1fae5",
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="Total Donations"
                      fill="#10b981"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="Accepted Donations"
                      fill="#6ee7b7"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Notifications Panel (replacing the pie chart) */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-emerald-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-emerald-900 flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-emerald-600" />
                  Recent Notifications
                </h3>
                <button className="text-xs text-emerald-700 hover:text-emerald-900 bg-emerald-50 rounded-lg px-3 py-1">
                  View all
                </button>
              </div>
              
              <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                {dashboardData?.notifications?.length > 0 ? (
                  dashboardData.notifications.slice(0, 5).map((item, index) => (
                    <div 
                      key={item.id || index} 
                      className="flex items-start p-3 border-l-4 border-emerald-400 bg-emerald-50/50 rounded-r-lg hover:bg-emerald-50 transition-colors"
                    >
                      <div className="mr-3">
                        {index % 3 === 0 && <Users className="h-5 w-5 text-emerald-600" />}
                        {index % 3 === 1 && <CheckCircle className="h-5 w-5 text-emerald-600" />}
                        {index % 3 === 2 && <Calendar className="h-5 w-5 text-emerald-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-emerald-900">{item.message}</p>
                        <span className="text-xs text-emerald-500 mt-1 block">{formatDate(item.createdAt)}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <div className="p-4 bg-emerald-50 rounded-full mb-4">
                      <Bell className="h-8 w-8 text-emerald-400" />
                    </div>
                    <h4 className="text-emerald-900 font-medium mb-1">No new notifications</h4>
                    <p className="text-emerald-600 text-sm">You're all caught up!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Access Cards */}
          <div 
            className={`grid grid-cols-1 md:grid-cols-3 gap-4 transition-opacity duration-700 ${
              fadeIn ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
           
          </div>
        </main>
      </div>
    </div>
  );
};

export default NGODashboard;