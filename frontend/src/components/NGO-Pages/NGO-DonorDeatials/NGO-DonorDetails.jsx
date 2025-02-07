// import React, { useState } from "react";
// import {
//   User,
//   Phone,
//   Mail,
//   MapPin,
//   Package,
//   Calendar,
//   Search,
//   Building,
//   Clock,
//   Menu,
// } from "lucide-react";
// import Sidebar from "../NGOsidebar";

// const DonorCard = ({ donor }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   return (
//     <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-emerald-100">
//       <div className="p-6">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
//           <div className="flex items-center space-x-4 mb-4 md:mb-0">
//             <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
//               <User className="w-6 h-6 text-emerald-600" />
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900">
//                 {donor.name}
//               </h3>
//               <p className="text-sm text-emerald-600">{donor.organization}</p>
//             </div>
//           </div>
//           <div className="flex items-center space-x-4">
//             <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
//               {donor.totalDonations} Donations
//             </span>
//             <button
//               onClick={() => setIsExpanded(!isExpanded)}
//               className="text-emerald-600 hover:text-emerald-800 text-sm font-medium"
//             >
//               {isExpanded ? "Show Less" : "Show More"}
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//           <div className="flex items-center space-x-3">
//             <Phone className="w-5 h-5 text-emerald-600" />
//             <span className="text-gray-700">{donor.phone}</span>
//           </div>
//           <div className="flex items-center space-x-3">
//             <Mail className="w-5 h-5 text-emerald-600" />
//             <span className="text-gray-700">{donor.email}</span>
//           </div>
//           <div className="flex items-center space-x-3">
//             <Building className="w-5 h-5 text-emerald-600" />
//             <span className="text-gray-700">{donor.type}</span>
//           </div>
//           <div className="flex items-center space-x-3">
//             <MapPin className="w-5 h-5 text-emerald-600" />
//             <span className="text-gray-700">{donor.address}</span>
//           </div>
//         </div>

//         {isExpanded && (
//           <div className="mt-6 border-t border-gray-100 pt-6">
//             <h4 className="text-lg font-medium text-gray-900 mb-4">
//               Recent Donations
//             </h4>
//             <div className="space-y-4">
//               {donor.recentDonations.map((donation, index) => (
//                 <div
//                   key={index}
//                   className="bg-gray-50 rounded-lg p-4 space-y-3"
//                 >
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm font-medium text-emerald-600">
//                       #{donation.id}
//                     </span>
//                     <span className="text-sm text-gray-600">
//                       {donation.status}
//                     </span>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                     <div className="flex items-center space-x-2">
//                       <Package className="w-4 h-4 text-emerald-600" />
//                       <span className="text-sm text-gray-700">
//                         {donation.foodType}
//                       </span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Clock className="w-4 h-4 text-emerald-600" />
//                       <span className="text-sm text-gray-700">
//                         {donation.quantity} dishes
//                       </span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Calendar className="w-4 h-4 text-emerald-600" />
//                       <span className="text-sm text-gray-700">
//                         {donation.date}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const NGODonorDetails = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(null);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const donors = [
//     {
//       name: "John Smith",
//       organization: "Smith's Restaurant",
//       type: "Restaurant",
//       phone: "+1 234-567-8900",
//       email: "john@smithsrestaurant.com",
//       address: "123 Park Street, Downtown Area",
//       totalDonations: 15,
//       recentDonations: [
//         {
//           id: "DON-001",
//           foodType: "Vegetarian Main Course",
//           quantity: 25,
//           date: "2025-01-07",
//           status: "Completed",
//         },
//         {
//           id: "DON-005",
//           foodType: "Mixed Appetizers",
//           quantity: 40,
//           date: "2025-01-05",
//           status: "Completed",
//         },
//       ],
//     },
//     {
//       name: "Sarah Johnson",
//       organization: "Fresh Bake Bakery",
//       type: "Bakery",
//       phone: "+1 234-567-8901",
//       email: "sarah@freshbake.com",
//       address: "456 Oak Avenue, Uptown",
//       totalDonations: 23,
//       recentDonations: [
//         {
//           id: "DON-002",
//           foodType: "Fresh Pastries",
//           quantity: 50,
//           date: "2025-01-07",
//           status: "Completed",
//         },
//         {
//           id: "DON-006",
//           foodType: "Bread and Rolls",
//           quantity: 30,
//           date: "2025-01-06",
//           status: "Completed",
//         },
//       ],
//     },
//     {
//       name: "David Brown",
//       organization: "Green Catering Co.",
//       type: "Catering Service",
//       phone: "+1 234-567-8903",
//       email: "david@greencatering.com",
//       address: "789 Pine Road, Midtown",
//       totalDonations: 18,
//       recentDonations: [
//         {
//           id: "DON-003",
//           foodType: "Vegan Meals",
//           quantity: 35,
//           date: "2025-01-06",
//           status: "Completed",
//         },
//         {
//           id: "DON-007",
//           foodType: "Salads and Sides",
//           quantity: 45,
//           date: "2025-01-04",
//           status: "Completed",
//         },
//       ],
//     },
//   ];

//   const filteredDonors = donors.filter(
//     (donor) =>
//       donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       donor.organization.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-emerald-50">
//       <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
//           onClick={toggleSidebar}
//         />
//       )}

//       <div className="lg:pl-64 min-h-screen">
//         <div className="pt-5 px-6 sticky top-0 z-10 backdrop-blur-md">
//           <div className="flex items-center space-x-6 mt-4 md:mt-0">
//             <button
//               onClick={toggleSidebar}
//               className="text-emerald-600 hover:text-emerald-900 lg:hidden"
//             >
//               <Menu className="h-6 w-6" />
//             </button>
//           </div>
//         </div>
//         <div className="max-w-7xl mx-auto">
//           <div className="p-6">
//             <h1 className="text-3xl font-semibold text-gray-800">
//               Donor Details
//             </h1>
//             <p className="text-gray-600 mt-2">
//               View and manage information about all food donors
//             </p>
//           </div>

//           <div className="p-6">
//             <div className="relative max-w-md">
//               <input
//                 type="text"
//                 placeholder="Search donors..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
//               />
//               <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
//             </div>
//           </div>

//           <div className="space-y-6 p-6">
//             {filteredDonors.map((donor, index) => (
//               <DonorCard key={index} donor={donor} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NGODonorDetails;
import React, { useState, useEffect } from "react";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Package,
  Calendar,
  Search,
  Building,
  Clock,
  Menu,
} from "lucide-react";
import Sidebar from "../NGOsidebar";
import axios from "axios"; // Make sure to install axios

const DonorCard = ({ donor }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-emerald-100">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            {/* <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              {donor.photo ? (
                <img 
                  src={donor.photo} 
                  alt={donor.name} 
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <User className="w-6 h-6 text-emerald-600" />
              )}
            </div> */}
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              {donor.photo ? (
                <img
                  src={
                    donor.photo.startsWith("data:image")
                      ? donor.photo // If already in proper Base64 format
                      : `data:image/png;base64,${donor.photo}` // If it's just a Base64 string
                  }
                  alt={donor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <User className="w-6 h-6 text-emerald-600" />
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {donor.name}
              </h3>
              <p className="text-sm text-emerald-600">
                {donor.restaurantName || donor.donorType}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-emerald-600" />
            <span className="text-gray-700">{donor.phone}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-emerald-600" />
            <span className="text-gray-700">{donor.email}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Building className="w-5 h-5 text-emerald-600" />
            <span className="text-gray-700">{donor.donorType}</span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <span className="text-gray-700">
              {`${donor.address}, ${donor.city}, ${donor.state} - ${donor.pincode}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const NGODonorDetails = () => {
  const [donors, setDonors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "http://localhost:3000/api/ngo/getDonorsForNGO",
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        if (response.data.success) {
          setDonors(response.data.donors);
        } else {
          throw new Error("Failed to fetch donors");
        }
      } catch (error) {
        setError(error.message || "Failed to fetch donors");
        console.error("Error fetching donors:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDonors();
  }, []);

  const filteredDonors = donors.filter(
    (donor) =>
      donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (donor.restaurantName &&
        donor.restaurantName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-emerald-50">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div className="lg:pl-64 min-h-screen">
        <div className="pt-5 px-6 sticky top-0 z-10 backdrop-blur-md">
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <button
              onClick={toggleSidebar}
              className="text-emerald-600 hover:text-emerald-900 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="p-6">
            <h1 className="text-3xl font-semibold text-gray-800">
              Donor Details
            </h1>
            <p className="text-gray-600 mt-2">
              View and manage information about all food donors
            </p>
          </div>

          {/* <div className="p-6">
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search donors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div> */}

          <div className="space-y-6 p-6">
            {isLoading ? (
              <div className="text-center text-gray-600">Loading donors...</div>
            ) : error ? (
              <div className="text-center text-red-600">{error}</div>
            ) : filteredDonors.length === 0 ? (
              <div className="text-center text-gray-600">No donors found</div>
            ) : (
              filteredDonors.map((donor) => (
                <DonorCard key={donor.id} donor={donor} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGODonorDetails;
