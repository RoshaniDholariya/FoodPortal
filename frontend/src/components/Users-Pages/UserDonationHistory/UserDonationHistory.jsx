// import React, { useState, useEffect } from "react";
// import Sidebar from "../UserSidebar/UserSidebar";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { Calendar, Utensils, MapPin, Package, Tag, Menu } from "lucide-react";

// const UserDonationHistory = () => {
//   const { state } = useLocation();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [donations, setDonations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const handleResize = () => {
//       setIsSidebarOpen(window.innerWidth >= 1024);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     const fetchDonations = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/api/donors/getDonorFood",
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//             withCredentials: true,
//           }
//         );
//         console.log(response.data);
//         if (response.data.success) {
//           setDonations(response.data.foodList);
//         } else {
//           setError("Failed to fetch donation history.");
//         }
//       } catch (err) {
//         setError("Error fetching data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDonations();
//   }, []);

//   const StatusBadge = ({ status }) => {
//     const colors = {
//       Completed: "bg-green-100 text-green-800",
//       "In Progress": "bg-yellow-100 text-yellow-800",
//       Pending: "bg-orange-100 text-orange-800",
//     };

//     return (
//       <span
//         className={`px-3 py-1 rounded-full text-sm font-medium ${
//           colors[status] || "bg-gray-100 text-gray-800"
//         }`}
//       >
//         {status}
//       </span>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-30 flex">
//       <div className="fixed inset-y-0 left-0 z-50">
//         <Sidebar
//           isSidebarOpen={isSidebarOpen}
//           setIsSidebarOpen={setIsSidebarOpen}
//         />
//       </div>
//       <div className={`flex-1 ${isSidebarOpen ? "lg:ml-64" : ""}`}>
//         <button
//           onClick={() => setIsSidebarOpen((prev) => !prev)}
//           className="lg:hidden text-gray-500 hover:text-gray-700 m-4"
//           aria-label="Toggle sidebar"
//         >
//           <Menu className="h-6 w-6" />
//         </button>

//         <main className="p-4 lg:p-8">
//           <div className="max-w-5xl mx-auto">
//             {loading ? (
//               <div className="flex justify-center items-center h-64">
//                 <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-[#61cf73]"></div>
//               </div>
//             ) : error ? (
//               <div className="text-center bg-red-100 text-red-600 p-4 rounded-lg">
//                 {error}
//               </div>
//             ) : donations.length === 0 ? (
//               <div className="text-center bg-blue-50 text-blue-600 p-8 rounded-lg">
//                 <Utensils className="mx-auto h-12 w-12 mb-4 text-blue-500" />
//                 <p className="text-lg">No donation history found.</p>
//                 <p className="text-sm text-blue-400">
//                   Start your first donation today!
//                 </p>
//               </div>
//             ) : (
//               <>
//                 <div className="flex flex-col md:flex-row items-center justify-between mb-6">
//                   <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-0">
//                     Donation History
//                   </h1>
//                   <div className="bg-[#61cf73]/10 text-[#61cf73] px-4 py-2 rounded-full text-sm font-medium">
//                     Total Donations: {donations.length}
//                   </div>
//                 </div>

//                 <div className="grid gap-6">
//                   {donations.map((donation) => (
//                     <div
//                       key={donation.id}
//                       className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden"
//                     >
//                       <div className="border-b border-gray-100 bg-gray-50 p-4 md:p-6">
//                         <div className="flex flex-wrap items-center justify-between gap-4">
//                           <div className="flex items-center space-x-3">
//                             <div className="p-2 bg-[#61cf73]/10 rounded-lg">
//                               <Utensils className="w-5 h-5 text-[#61cf73]" />
//                             </div>
//                             <div>
//                               <h3 className="text-lg font-semibold text-gray-900">
//                                 {donation.foodType}
//                               </h3>
//                               <p className="text-sm text-gray-500">
//                                 {donation.foodCategory}
//                               </p>
//                             </div>
//                           </div>
//                           <StatusBadge status={donation.status} />
//                         </div>
//                       </div>

//                       <div className="p-4 md:p-6">
//                         <div className="grid md:grid-cols-2 gap-6">
//                           <div className="space-y-4">
//                             <div className="flex items-center space-x-3">
//                               <MapPin className="w-5 h-5 text-gray-400" />
//                               <div>
//                                 <p className="text-sm text-gray-500">
//                                   Pickup Location
//                                 </p>
//                                 <p className="text-gray-700">
//                                   {donation.address}
//                                 </p>
//                               </div>
//                             </div>

//                             <div className="flex items-center space-x-3">
//                               <Calendar className="w-5 h-5 text-gray-400" />
//                               <div>
//                                 <p className="text-sm text-gray-500">Dates</p>
//                                 <p className="text-gray-700">
//                                   {donation.preparationDate} -{" "}
//                                   {donation.expiryDate}
//                                 </p>
//                               </div>
//                             </div>
//                           </div>

//                           <div className="space-y-4">
//                             <div className="flex items-center space-x-3">
//                               <Package className="w-5 h-5 text-gray-400" />
//                               <div>
//                                 <p className="text-sm text-gray-500">
//                                   Quantity
//                                 </p>
//                                 <p className="text-gray-700">
//                                   {donation.noOfDishes} dishes
//                                 </p>
//                               </div>
//                             </div>

//                             <div className="flex items-center space-x-3">
//                               <Tag className="w-5 h-5 text-gray-400" />
//                               <div>
//                                 <p className="text-sm text-gray-500">
//                                   Category
//                                 </p>
//                                 <p className="text-gray-700">
//                                   {donation.foodCategory}
//                                 </p>
//                               </div>
//                             </div>

//                             {donation.ngo && (
//                               <div className="flex items-center space-x-3">
//                                 <Utensils className="w-5 h-5 text-gray-400" />
//                                 <div>
//                                   <p className="text-sm text-gray-500">
//                                     Accepted by NGO
//                                   </p>
//                                   <p className="text-gray-700">
//                                     {donation.ngo.name} ({donation.ngo.email})
//                                   </p>
//                                 </div>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}
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
import { Calendar, Utensils, MapPin, Package, Tag, Menu } from "lucide-react";

const UserDonationHistory = () => {
  const { state } = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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
        const response = await axios.get(
          "http://localhost:3000/api/donors/getDonorFood",
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
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
      completed: "text-green-500 ",
      available: "text-blue-500",
    };

    return (
      <span
        className={`text-base font-semibold ${colors[status] || "text-white"}`}
      >
        {status}
      </span>
    );
  };

  const filteredDonations = donations.filter((donation) => {
    if (statusFilter === "all") return true;
    return donation.status === statusFilter;
  });

  const completedDonations = donations.filter(
    (d) => d.status === "completed"
  ).length;

  const availableDonations = donations.filter(
    (d) => d.status === "available"
  ).length;

  return (
    <div className="min-h-screen bg-gray-30 flex">
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
            ) : donations.length === 0 ? (
              <div className="text-center bg-blue-50 text-blue-600 p-8 rounded-lg">
                <Utensils className="mx-auto h-12 w-12 mb-4 text-blue-500" />
                <p className="text-lg">No donation history found.</p>
                <p className="text-sm text-blue-400">
                  Start your first donation today!
                </p>
              </div>
            ) : (
              <>
                <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                  <div className="flex gap-4">
                    <div className="bg-[#61cf73]/10 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                      Total : {donations.length}
                    </div>
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                      Completed : {completedDonations}
                    </div>
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                      Available : {availableDonations}
                    </div>
                  </div>

                  <div className="flex gap-4 justify-end">
                    <button
                      onClick={() => setStatusFilter("all")}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        statusFilter === "all"
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setStatusFilter("completed")}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        statusFilter === "completed"
                          ? "bg-green-500 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      Completed
                    </button>
                    <button
                      onClick={() => setStatusFilter("available")}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        statusFilter === "available"
                          ? "bg-blue-400 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      Available
                    </button>
                  </div>
                </div>

                <div className="grid gap-6">
                  {filteredDonations.map((donation) => (
                    <div
                      key={donation.id}
                      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden"
                    >
                      <div className="border-b border-gray-100 bg-gray-50 p-4 md:p-6">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-[#61cf73]/10 rounded-lg">
                              <Utensils className="w-5 h-5 text-[#61cf73]" />
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
                                <p className="text-sm text-gray-500">
                                  Pickup Location
                                </p>
                                <p className="text-gray-700">
                                  {donation.address}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-3">
                              <Calendar className="w-5 h-5 text-gray-400" />
                              <div>
                                <p className="text-sm text-gray-500">Dates</p>
                                <p className="text-gray-700">
                                  {donation.preparationDate} -{" "}
                                  {donation.expiryDate}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                              <Package className="w-5 h-5 text-gray-400" />
                              <div>
                                <p className="text-sm text-gray-500">
                                  Quantity
                                </p>
                                <p className="text-gray-700">
                                  {donation.noOfDishes} dishes
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-3">
                              <Tag className="w-5 h-5 text-gray-400" />
                              <div>
                                <p className="text-sm text-gray-500">
                                  Category
                                </p>
                                <p className="text-gray-700">
                                  {donation.foodCategory}
                                </p>
                              </div>
                            </div>

                            {donation.ngo && (
                              <div className="flex items-center space-x-3">
                                <Utensils className="w-5 h-5 text-gray-400" />
                                <div>
                                  <p className="text-sm text-gray-500">
                                    Accepted by NGO
                                  </p>
                                  <p className="text-gray-700">
                                    {donation.ngo.name} ({donation.ngo.email})
                                  </p>
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
