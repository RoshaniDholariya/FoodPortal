
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
