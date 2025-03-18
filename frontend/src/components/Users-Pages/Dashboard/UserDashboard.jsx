// import React, { useState, useEffect } from "react";
// import {
//   Bell,
//   X,
//   Heart,
//   Calendar,
//   Clock,
//   Activity,
//   User,
//   MapPin,
//   Phone,
//   Store,
//   PlusCircle,
// } from "lucide-react";
// import Sidebar from "../UserSidebar/UserSidebar";
// import { useLocation } from "react-router-dom";
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

// const NotificationItem = ({ message, onClose }) => {
//   const [progress, setProgress] = useState(100);
//   const [isVisible, setIsVisible] = useState(true);

//   useEffect(() => {
//     const startTime = Date.now();
//     const duration = 1200000;

//     const updateProgress = () => {
//       const elapsed = Date.now() - startTime;
//       const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
//       setProgress(remaining);

//       if (remaining > 0) {
//         requestAnimationFrame(updateProgress);
//       } else {
//         setIsVisible(false);
//         setTimeout(() => onClose(), 300);
//       }
//     };

//     const animationFrame = requestAnimationFrame(updateProgress);

//     return () => {
//       cancelAnimationFrame(animationFrame);
//     };
//   }, [onClose]);

//   if (!isVisible) return null;

//   return (
//     <div
//       className={`
//         bg-white rounded-lg shadow-lg p-4 mb-2 relative overflow-hidden
//         transform transition-all duration-300 ease-in-out
//         ${
//           isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
//         }
//       `}
//     >
//       <div className="flex items-start justify-between">
//         <div className="flex items-start space-x-3">
//           <Bell className="w-5 h-5 text-blue-500 mt-1" />
//           <div>
//             <p className="text-gray-800 font-medium">New Notification</p>
//             <p className="text-gray-600 text-sm mt-1">{message}</p>
//           </div>
//         </div>
//         <button
//           onClick={() => {
//             setIsVisible(false);
//             setTimeout(() => onClose(), 300);
//           }}
//           className="text-gray-400 hover:text-gray-600 transition-colors"
//         >
//           <X className="w-4 h-4" />
//         </button>
//       </div>

//       <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
//         <div
//           className="h-full bg-blue-500 transition-all duration-300"
//           style={{ width: `${progress}%` }}
//         />
//       </div>
//     </div>
//   );
// };

// const NotificationContainer = ({ notifications, onNotificationClose }) => {
//   return (
//     <div className="fixed top-4 right-4 z-50 w-96 space-y-2">
//       {notifications.map((notification) => (
//         <NotificationItem
//           key={notification.id}
//           message={notification}
//           onClose={() => onNotificationClose(notification.id)}
//         />
//       ))}
//     </div>
//   );
// };

// const DonorDashboard = () => {
//   const location = useLocation();

//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [activeNotifications, setActiveNotifications] = useState([]);
//   const [fadeIn, setFadeIn] = useState(false);
//   const [donorDetails, setDonorDetails] = useState({
//     name: "John Doe", // Default values to prevent loading state
//     address: "123 Main St",
//     city: "New York",
//     state: "NY",
//     pincode: "10001",
//     phone: "555-123-4567",
//     donorType: "Restaurant",
//     restaurantName: "John's Kitchen",
//     id: "D12345",
//     photo: null,
//   });

//   useEffect(() => {
//     // Set cross-origin credentials
//     axios.defaults.withCredentials = true;

//     // Fetch donor details using axios
//     const fetchDonorDetails = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/api/donors/getDonorDetails"
//         );

//         if (response.data.success) {
//           setDonorDetails(response.data.donor);
//         } else {
//           console.error("Failed to fetch Donor Data:", response.data.message);
//         }
//       } catch (err) {
//         console.error("Error fetching Donor Data:", err);
//         // Keep using default values in case of error
//       }
//     };

//     fetchDonorDetails();
//   }, []);

//   const fullAddress = [
//     donorDetails.address,
//     donorDetails.city,
//     donorDetails.state,
//     donorDetails.pincode,
//   ]
//     .filter(Boolean)
//     .join(", ");

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 1024) {
//         setIsSidebarOpen(false);
//       } else {
//         setIsSidebarOpen(true);
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);

//     setTimeout(() => setFadeIn(true), 100);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const handleNotificationClose = (id) => {
//     setActiveNotifications((prev) =>
//       prev.filter((notification) => notification.id !== id)
//     );
//   };

//   const donations = [
//     {
//       id: 1,
//       name: "Fresh Vegetables",
//       portions: 15,
//       status: "Scheduled",
//       pickupTime: "2:30 PM Today",
//       location: "Main Kitchen",
//       type: "Produce",
//       expiryDate: "Today",
//     },
//     {
//       id: 2,
//       name: "Prepared Meals",
//       portions: 8,
//       status: "Completed",
//       pickupTime: "11:00 AM Today",
//       location: "Side Entrance",
//       type: "Cooked Food",
//       expiryDate: "Today",
//     },
//     {
//       id: 3,
//       name: "Baked Goods",
//       portions: 20,
//       status: "Available",
//       pickupTime: "4:00 PM Today",
//       location: "Front Counter",
//       type: "Bakery",
//       expiryDate: "Tomorrow",
//     },
//   ];

//   const pieData = [
//     {
//       name: "Available",
//       value: donations.filter((d) => d.status === "Available").length,
//     },
//     {
//       name: "Completed",
//       value: donations.filter((d) => d.status === "Completed").length,
//     },
//     {
//       name: "Scheduled",
//       value: donations.filter((d) => d.status === "Scheduled").length,
//     },
//   ];

//   const COLORS = ["#10B981", "#6366F1", "#3B82F6"];

//   const weeklyData = [
//     { name: "Week 1", completed: 12, expired: 3 },
//     { name: "Week 2", completed: 15, expired: 2 },
//     { name: "Week 3", completed: 18, expired: 1 },
//     { name: "Week 4", completed: 20, expired: 4 },
//   ];

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

//   const recentAppointments = [
//     {
//       id: 1,
//       doctor: "Dr. Sarah Smith",
//       specialty: "Cardiologist",
//       date: "February 23, 2025",
//       time: "10:30 AM",
//       status: "Completed",
//       notes: "Regular checkup, blood pressure normal",
//     },
//     {
//       id: 2,
//       doctor: "Dr. Michael Johnson",
//       specialty: "General Physician",
//       date: "January 15, 2025",
//       time: "2:00 PM",
//       status: "Completed",
//       notes: "Flu symptoms, prescribed medication",
//     },
//     {
//       id: 3,
//       doctor: "Dr. Emily Chen",
//       specialty: "Dermatologist",
//       date: "March 15, 2025",
//       time: "10:00 AM",
//       status: "Scheduled",
//       notes: "Annual skin examination",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <NotificationContainer
//         notifications={activeNotifications}
//         onNotificationClose={handleNotificationClose}
//       />

//       <div className="fixed inset-y-0 left-0 z-50">
//         <Sidebar
//           isSidebarOpen={isSidebarOpen}
//           setIsSidebarOpen={setIsSidebarOpen}
//         />
//       </div>

//       <div
//         className={`transition-all duration-300 ${
//           isSidebarOpen ? "lg:ml-64" : ""
//         }`}
//       >
//         <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
//           <div
//             className={`transition-opacity duration-1000 ${
//               fadeIn ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             <div className="bg-emerald-500 rounded-2xl p-6 mb-8 shadow-lg relative overflow-hidden">
//               <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400 rounded-full -mr-32 -mt-32 opacity-30"></div>
//               <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-400 rounded-full -ml-24 -mb-24 opacity-30"></div>

//               {/* Profile section - no loading state */}
//               <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
//                 <div className="bg-white/20 p-4 rounded-full shadow-lg border-2 border-white/30 flex-shrink-0">
//                   {donorDetails.photo ? (
//                     <img
//                       src={donorDetails.photo}
//                       alt={donorDetails.name}
//                       className="rounded-full w-20 h-20 object-cover"
//                     />
//                   ) : (
//                     <div className="rounded-full w-20 h-20 bg-emerald-200 flex items-center justify-center">
//                       <User size={40} className="text-emerald-600" />
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex-1">
//                   <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
//                     <h2 className="text-2xl md:text-3xl font-bold text-white">
//                       {donorDetails.name || "Welcome, Donor"}
//                     </h2>

//                     <div className="md:self-start">
//                       <span className="bg-emerald-400/30 text-white px-4 py-1 rounded-full text-sm font-medium border border-white/20 inline-block">
//                         {donorDetails.donorType || "Donor"}
//                       </span>
//                     </div>
//                   </div>

//                   {donorDetails.restaurantName && (
//                     <div className="flex items-center gap-2 mt-2 text-emerald-100">
//                       <Store size={20} />
//                       <p className="font-medium">
//                         {donorDetails.restaurantName}
//                       </p>
//                     </div>
//                   )}

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
//                     {fullAddress && (
//                       <div className="flex items-center gap-2 text-emerald-100">
//                         <MapPin size={16} className="flex-shrink-0" />
//                         <p className="truncate">{fullAddress}</p>
//                       </div>
//                     )}

//                     {donorDetails.phone && (
//                       <div className="flex items-center gap-2 text-emerald-100">
//                         <Phone size={16} className="flex-shrink-0" />
//                         <p>{donorDetails.phone}</p>
//                       </div>
//                     )}
//                   </div>

//                   <div className="flex flex-wrap gap-2 mt-4">
//                     <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm">
//                       ID: {donorDetails.id || "New Donor"}
//                     </span>
//                     <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm">
//                       Active Donations:
//                     </span>
//                     <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm">
//                       Total Donated:
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div
//               className={`bg-white rounded-2xl border border-emerald-100 p-6 shadow-md mb-8 transition-all duration-500 ${
//                 fadeIn ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
//               }`}
//               style={{ transitionDelay: "200ms" }}
//             >
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-lg font-semibold text-emerald-900">
//                   Recent Appointments
//                 </h3>
//               </div>

//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         Doctor
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         Date & Time
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         Status
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         Notes
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {recentAppointments.map((appointment) => (
//                       <tr
//                         key={appointment.id}
//                         className="hover:bg-gray-50 transition-colors"
//                       >
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm font-medium text-gray-900">
//                             {appointment.doctor}
//                           </div>
//                           <div className="text-sm text-gray-500">
//                             {appointment.specialty}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900">
//                             {appointment.date}
//                           </div>
//                           <div className="text-sm text-gray-500">
//                             {appointment.time}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span
//                             className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                               appointment.status === "Completed"
//                                 ? "bg-green-100 text-green-800"
//                                 : "bg-blue-100 text-blue-800"
//                             }`}
//                           >
//                             {appointment.status}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {appointment.notes}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//               <div
//                 className={`bg-white rounded-2xl border border-emerald-100 p-6 shadow-md transition-all duration-500 ${
//                   fadeIn
//                     ? "translate-y-0 opacity-100"
//                     : "translate-y-4 opacity-0"
//                 }`}
//                 style={{ transitionDelay: "300ms" }}
//               >
//                 <h3 className="text-lg font-semibold text-emerald-900 mb-4">
//                   Donation Status Distribution
//                 </h3>
//                 <div className="h-64">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <PieChart>
//                       <Pie
//                         data={pieData}
//                         cx="50%"
//                         cy="50%"
//                         labelLine={false}
//                         outerRadius={80}
//                         fill="#8884d8"
//                         dataKey="value"
//                         label={({ name, percent }) =>
//                           `${name} ${(percent * 100).toFixed(0)}%`
//                         }
//                       >
//                         {pieData.map((entry, index) => (
//                           <Cell
//                             key={`cell-${index}`}
//                             fill={COLORS[index % COLORS.length]}
//                           />
//                         ))}
//                       </Pie>
//                       <Tooltip content={<CustomTooltip />} />
//                       <Legend />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>

//               <div
//                 className={`bg-white rounded-2xl border border-emerald-100 p-6 shadow-md transition-all duration-500 ${
//                   fadeIn
//                     ? "translate-y-0 opacity-100"
//                     : "translate-y-4 opacity-0"
//                 }`}
//                 style={{ transitionDelay: "600ms" }}
//               >
//                 <h3 className="text-lg font-semibold text-emerald-900 mb-4">
//                   Weekly Donation Records
//                 </h3>
//                 <div className="h-64">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <BarChart data={weeklyData}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <Tooltip />
//                       <Legend />
//                       <Bar
//                         dataKey="completed"
//                         name="Completed"
//                         fill="#10B981"
//                       />
//                       <Bar dataKey="expired" name="Expired" fill="#EF4444" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>

//         <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
//           <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
//           <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
//           <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-teal-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DonorDashboard;

// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../UserSidebar/UserSidebar";
// import Profile from "./Profile";
// import RecentDonations from "./RecentDonations";
// import Charts from "./Charts";
// import { NotificationContainer } from "./Notifications";
// import { Menu } from "lucide-react";
// import { io } from "socket.io-client";
// const DonorDashboard = () => {
//   const location = useLocation();

//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [activeNotifications, setActiveNotifications] = useState([]);
//   const [fadeIn, setFadeIn] = useState(false);
//   const [donorDetails, setDonorDetails] = useState({
//     name: "John Doe",
//     address: "123 Main St",
//     city: "New York",
//     state: "NY",
//     pincode: "10001",
//     phone: "555-123-4567",
//     donorType: "Restaurant",
//     restaurantName: "John's Kitchen",
//     id: "D12345",
//     photo: null,
//   });
  

//   const socket = io("http://localhost:3000");
  
//   useEffect(() => {
//     socket.on("foodAccepted", (data) => {
//       if (data.donorId === donorDetails.id) {
//         setActiveNotifications((prev) => [
//           ...prev,
//           { id: Date.now(), message: data.message },
//         ]);
//       }
//     });
  
//     return () => {
//       socket.off("foodAccepted");
//     };
//   }, [donorDetails.id]);
  
//   useEffect(() => {
//     axios.defaults.withCredentials = true;

//     const fetchDonorDetails = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/api/donors/getDonorDetails"
//         );

//         if (response.data.success) {
//           setDonorDetails(response.data.donor);
//         } else {
//           console.error("Failed to fetch Donor Data:", response.data.message);
//         }
//       } catch (err) {
//         console.error("Error fetching Donor Data:", err);
//       }
//     };

//     fetchDonorDetails();
//   }, []);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 1024) {
//         setIsSidebarOpen(false);
//       } else {
//         setIsSidebarOpen(true);
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);

//     setTimeout(() => setFadeIn(true), 100);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const handleNotificationClose = (id) => {
//     setActiveNotifications((prev) =>
//       prev.filter((notification) => notification.id !== id)
//     );
//   };
//   const donations = [
//     {
//       id: 1,
//       name: "Fresh Vegetables",
//       portions: 15,
//       status: "Scheduled",
//       pickupTime: "2:30 PM Today",
//       location: "Main Kitchen",
//       type: "Produce",
//       expiryDate: "Today",
//     },
//     {
//       id: 2,
//       name: "Prepared Meals",
//       portions: 8,
//       status: "Completed",
//       pickupTime: "11:00 AM Today",
//       location: "Side Entrance",
//       type: "Cooked Food",
//       expiryDate: "Today",
//     },
//     {
//       id: 3,
//       name: "Baked Goods",
//       portions: 20,
//       status: "Available",
//       pickupTime: "4:00 PM Today",
//       location: "Front Counter",
//       type: "Bakery",
//       expiryDate: "Tomorrow",
//     },
//   ];

//   // const pieData = [
//   //   {
//   //     name: "Available",
//   //     value: donations.filter((d) => d.status === "Available").length,
//   //   },
//   //   {
//   //     name: "Completed",
//   //     value: donations.filter((d) => d.status === "Completed").length,
//   //   },
//   //   {
//   //     name: "Scheduled",
//   //     value: donations.filter((d) => d.status === "Scheduled").length,
//   //   },
//   // ];

//   // const weeklyData = [
//   //   { name: "Week 1", completed: 12, expired: 3 },
//   //   { name: "Week 2", completed: 15, expired: 2 },
//   //   { name: "Week 3", completed: 18, expired: 1 },
//   //   { name: "Week 4", completed: 20, expired: 4 },
//   // ];

//   // const recentAppointments = [
//   //   {
//   //     id: 1,
//   //     doctor: "Dr. Sarah Smith",
//   //     specialty: "Cardiologist",
//   //     date: "February 23, 2025",
//   //     time: "10:30 AM",
//   //     status: "Completed",
//   //     notes: "Regular checkup, blood pressure normal",
//   //   },
//   //   {
//   //     id: 2,
//   //     doctor: "Dr. Michael Johnson",
//   //     specialty: "General Physician",
//   //     date: "January 15, 2025",
//   //     time: "2:00 PM",
//   //     status: "Completed",
//   //     notes: "Flu symptoms, prescribed medication",
//   //   },
//   //   {
//   //     id: 3,
//   //     doctor: "Dr. Emily Chen",
//   //     specialty: "Dermatologist",
//   //     date: "March 15, 2025",
//   //     time: "10:00 AM",
//   //     status: "Scheduled",
//   //     notes: "Annual skin examination",
//   //   },
//   // ];

//   return (
//     <div className="min-h-screen bg-white-300">
//       <NotificationContainer
//         notifications={activeNotifications}
//         onNotificationClose={handleNotificationClose}
//       />

//       <div className="fixed inset-y-0 left-0 z-50">
//         <Sidebar
//           isSidebarOpen={isSidebarOpen}
//           setIsSidebarOpen={setIsSidebarOpen}
//         />
//       </div>

//       <div className={`${isSidebarOpen ? "lg:ml-64" : ""}`}>
//         <button
//           onClick={() => setIsSidebarOpen((prev) => !prev)}
//           className="lg:hidden text-gray-500 hover:text-gray-700"
//           aria-label="Toggle sidebar"
//         >
//           <Menu className="h-6 w-6 m-5" />
//         </button>
//         <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
//           <div
//             className={`transition-opacity duration-1000 ${
//               fadeIn ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             <Profile donorDetails={donorDetails} />
//             {/* <Charts pieData={pieData} weeklyData={weeklyData} fadeIn={fadeIn} /> */}
//             <RecentDonations fadeIn={fadeIn} />
//           </div>
//         </main>

//         <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
//           <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
//           <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
//           <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-teal-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DonorDashboard;
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Sidebar from "../UserSidebar/UserSidebar";
import Profile from "./Profile";
import RecentDonations from "./RecentDonations";
import Charts from "./Charts";
import { NotificationContainer } from "./Notifications";
import { Menu, Bell } from "lucide-react";
import { io } from "socket.io-client";

const DonorDashboard = () => {
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeNotifications, setActiveNotifications] = useState([]);
  const [fadeIn, setFadeIn] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [donorDetails, setDonorDetails] = useState({
    name: "John Doe",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    pincode: "10001",
    phone: "555-123-4567",
    donorType: "Restaurant",
    restaurantName: "John's Kitchen",
    id: "D12345",
    photo: null,
  });

  const socket = io("http://localhost:3000");

  useEffect(() => {
    socket.on("foodAccepted", (data) => {
      if (data.donorId === donorDetails.id) {
        setActiveNotifications((prev) => [
          ...prev,
          { id: Date.now(), message: data.message },
        ]);
      }
    });

    return () => {
      socket.off("foodAccepted");
    };
  }, [donorDetails.id]);

  useEffect(() => {
    axios.defaults.withCredentials = true;

    const fetchDonorDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/donors/getDonorDetails"
        );

        if (response.data.success) {
          setDonorDetails(response.data.donor);
        } else {
          console.error("Failed to fetch Donor Data:", response.data.message);
        }
      } catch (err) {
        console.error("Error fetching Donor Data:", err);
      }
    };

    fetchDonorDetails();
  }, []);

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

    setTimeout(() => setFadeIn(true), 100);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNotificationClose = (id) => {
    setActiveNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-white-300">
      <div className="fixed top-4 right-6 z-50 flex items-center space-x-4">
        <button
          onClick={() => setShowNotifications((prev) => !prev)}
          className="text-gray-500 hover:text-gray-700 relative"
          aria-label="Toggle notifications"
        >
          <Bell className="h-6 w-6" />
          {activeNotifications.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {activeNotifications.length}
            </span>
          )}
        </button>
      </div>
      {showNotifications && (
        <NotificationContainer
          notifications={activeNotifications}
          onNotificationClose={handleNotificationClose}
        />
      )}

      <div className="fixed inset-y-0 left-0 z-50">
        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      </div>

      <div className={`${isSidebarOpen ? "lg:ml-64" : ""}`}>
        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="lg:hidden text-gray-500 hover:text-gray-700"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-6 w-6 m-5" />
        </button>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className={`transition-opacity duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
            <Profile donorDetails={donorDetails} />
            <RecentDonations fadeIn={fadeIn} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DonorDashboard;
