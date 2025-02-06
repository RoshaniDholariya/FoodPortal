// import React, { useState, useEffect } from "react";
// import Sidebar from "../UserSidebar/UserSidebar";
// import { useLocation } from "react-router-dom";
// import {
//   Calendar,
//   Utensils,
//   MapPin,
//   Package,
//   Tag,
//   Menu,
// } from "lucide-react";

// const UserDonationHistory = () => {
//   const { state } = useLocation();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const mockDonations = [
//     {
//       id: 1,
//       foodType: "Homemade Meals",
//       pickupLocation: "123 Main Street, City Center",
//       preparationDate: "2025-01-01",
//       expiryDate: "2025-01-02",
//       numberOfDishes: 30,
//       category: "Cooked Food",
//       status: "Completed",
//     },
//     {
//       id: 2,
//       foodType: "Packaged Snacks",
//       pickupLocation: "456 Park Avenue, Downtown",
//       preparationDate: "2025-01-03",
//       expiryDate: "2025-01-10",
//       numberOfDishes: 50,
//       category: "Dry Food",
//       status: "In Progress",
//     },
//   ];

//   const StatusBadge = ({ status }) => {
//     const colors = {
//       Completed: "bg-green-100 text-green-800",
//       "In Progress": "bg-yellow-100 text-yellow-800",
//     };
//     return (
//       <span
//         className={`px-3 py-1 rounded-full text-sm font-medium ${colors[status]}`}
//       >
//         {status}
//       </span>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-white-300 flex">
//       <Sidebar
//         isSidebarOpen={isSidebarOpen}
//         setIsSidebarOpen={setIsSidebarOpen}
//       />

//       <div className="flex-1">
//         <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-8">
//           <button
//             onClick={() => setIsSidebarOpen((prev) => !prev)}
//             className="lg:hidden text-gray-500 hover:text-gray-700"
//             aria-label="Toggle sidebar"
//           >
//             <Menu className="h-6 w-6" />
//           </button>
//           <h1 className="text-xl font-bold text-gray-900">Donation History</h1>
//         </header>

//         <main className="p-4 lg:p-8">
//           <div className="max-w-5xl mx-auto">
//             <div className="flex items-center justify-between mb-6">
//               <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                
//               </h1>
//               <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
//                 Total Donations: {mockDonations.length}
//               </div>
//             </div>

//             <div className="grid gap-6">
//               {mockDonations.map((donation) => (
//                 <div
//                   key={donation.id}
//                   className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden"
//                 >
//                   <div className="border-b border-gray-100 bg-gray-50 p-4 md:p-6">
//                     <div className="flex flex-wrap items-center justify-between gap-4">
//                       <div className="flex items-center space-x-3">
//                         <div className="p-2 bg-green-100 rounded-lg">
//                           <Utensils className="w-5 h-5 text-green-600" />
//                         </div>
//                         <div>
//                           <h3 className="text-lg font-semibold text-gray-900">
//                             {donation.foodType}
//                           </h3>
//                           <p className="text-sm text-gray-500">
//                             {donation.category}
//                           </p>
//                         </div>
//                       </div>
//                       <StatusBadge status={donation.status} />
//                     </div>
//                   </div>

//                   <div className="p-4 md:p-6">
//                     <div className="grid md:grid-cols-2 gap-6">
//                       <div className="space-y-4">
//                         <div className="flex items-center space-x-3">
//                           <MapPin className="w-5 h-5 text-gray-400" />
//                           <div>
//                             <p className="text-sm text-gray-500">
//                               Pickup Location
//                             </p>
//                             <p className="text-gray-700">
//                               {donation.pickupLocation}
//                             </p>
//                           </div>
//                         </div>

//                         <div className="flex items-center space-x-3">
//                           <Calendar className="w-5 h-5 text-gray-400" />
//                           <div>
//                             <p className="text-sm text-gray-500">Dates</p>
//                             <p className="text-gray-700">
//                               {donation.preparationDate} - {donation.expiryDate}
//                             </p>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="space-y-4">
//                         <div className="flex items-center space-x-3">
//                           <Package className="w-5 h-5 text-gray-400" />
//                           <div>
//                             <p className="text-sm text-gray-500">Quantity</p>
//                             <p className="text-gray-700">
//                               {donation.numberOfDishes} dishes
//                             </p>
//                           </div>
//                         </div>

//                         <div className="flex items-center space-x-3">
//                           <Tag className="w-5 h-5 text-gray-400" />
//                           <div>
//                             <p className="text-sm text-gray-500">Category</p>
//                             <p className="text-gray-700">{donation.category}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default UserDonationHistory;
import React, { useState, useEffect } from "react";
import Sidebar from "../UserSidebar/UserSidebar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  Calendar,
  Utensils,
  MapPin,
  Package,
  Tag,
  Menu,
} from "lucide-react";

const UserDonationHistory = () => {
  const { state } = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        // Assuming you store the token
        const response = await axios.get("http://localhost:3000/api/donors/getDonorFood", {
          headers: {
            "Content-Type": "application/json",
            
          },
          withCredentials:true
        });
       console.log(response.data);
        if (response.data.success) {
          setDonations(response.data.foodList);
        } else {
          setError("Failed to fetch donation history.");
        }
      } catch (err) {
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const StatusBadge = ({ status }) => {
    const colors = {
      Completed: "bg-green-100 text-green-800",
      "In Progress": "bg-yellow-100 text-yellow-800",
      Pending: "bg-orange-100 text-orange-800",
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[status] || "bg-gray-100 text-gray-800"}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-white-300 flex">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div className="flex-1">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-8">
          <button
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Donation History</h1>
        </header>

        <main className="p-4 lg:p-8">
          <div className="max-w-5xl mx-auto">
            {loading ? (
              <p className="text-center text-gray-600">Loading...</p>
            ) : error ? (
              <p className="text-center text-red-600">{error}</p>
            ) : donations.length === 0 ? (
              <p className="text-center text-gray-600">No donation history found.</p>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900"></h1>
                  <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                    Total Donations: {donations.length}
                  </div>
                </div>

                <div className="grid gap-6">
                  {donations.map((donation) => (
                    <div
                      key={donation.id}
                      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden"
                    >
                      <div className="border-b border-gray-100 bg-gray-50 p-4 md:p-6">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                              <Utensils className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                {donation.foodType}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {donation.foodCategory}
                              </p>
                            </div>
                          </div>
                          <StatusBadge status={donation.status} />
                        </div>
                      </div>

                      <div className="p-4 md:p-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                              <MapPin className="w-5 h-5 text-gray-400" />
                              <div>
                                <p className="text-sm text-gray-500">Pickup Location</p>
                                <p className="text-gray-700">{donation.address}</p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-3">
                              <Calendar className="w-5 h-5 text-gray-400" />
                              <div>
                                <p className="text-sm text-gray-500">Dates</p>
                                <p className="text-gray-700">
                                  {donation.preparationDate} - {donation.expiryDate}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                              <Package className="w-5 h-5 text-gray-400" />
                              <div>
                                <p className="text-sm text-gray-500">Quantity</p>
                                <p className="text-gray-700">{donation.noOfDishes} dishes</p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-3">
                              <Tag className="w-5 h-5 text-gray-400" />
                              <div>
                                <p className="text-sm text-gray-500">Category</p>
                                <p className="text-gray-700">{donation.foodCategory}</p>
                              </div>
                            </div>

                            {donation.ngo && (
                              <div className="flex items-center space-x-3">
                                <Utensils className="w-5 h-5 text-gray-400" />
                                <div>
                                  <p className="text-sm text-gray-500">Accepted by NGO</p>
                                  <p className="text-gray-700">{donation.ngo.name} ({donation.ngo.email})</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDonationHistory;
