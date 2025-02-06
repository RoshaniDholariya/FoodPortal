// import React, { useState } from "react";
// import DonationModal from "./NGO-DonationModel";
// import { User, Package, Calendar, Menu } from "lucide-react";
// import Sidebar from "../NGOsidebar";

// const DonationCard = ({ donation, onClick }) => (
//   <div
//     className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
//     onClick={onClick}
//   >
//     <div className="p-4">
//       <div className="flex justify-between items-start mb-4">
//         <h3 className="text-lg font-semibold text-gray-900">#{donation.id}</h3>
//         <span
//           className={`px-2 py-1 rounded-full text-xs font-medium ${
//             donation.status === "accepted"
//               ? "bg-emerald-100 text-emerald-800"
//               : "bg-yellow-100 text-yellow-800"
//           }`}
//         >
//           {donation.status === "accepted" ? "Accepted" : "Pending"}
//         </span>
//       </div>

//       <div className="space-y-3">
//         <div className="flex items-center space-x-2">
//           <User className="w-4 h-4 text-emerald-600" />
//           <span className="text-gray-600 text-sm">{donation.donorName}</span>
//         </div>

//         <div className="flex items-center space-x-2">
//           <Package className="w-4 h-4 text-emerald-600" />
//           <span className="text-gray-600 text-sm">
//             {donation.foodType} - {donation.foodCategory}
//           </span>
//         </div>

//         <div className="flex items-center space-x-2">
//           <Calendar className="w-4 h-4 text-emerald-600" />
//           <span className="text-gray-600 text-sm">
//             Expires: {donation.expiryDate}
//           </span>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const DonationGrid = () => {
//   const [selectedDonation, setSelectedDonation] = useState(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(null);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const donations = [
//     {
//       id: "DON-001",
//       donorName: "John Smith",
//       foodType: "Vegetarian",
//       foodCategory: "Main Course",
//       numDishes: 25,
//       prepDate: "2025-01-07",
//       expiryDate: "2025-01-08",
//       deliveryType: "pickup",
//       address: "123 Park Street, Downtown Area",
//       contactNumber: "+1 234-567-8900",
//       status: "pending",
//     },
//     {
//       id: "DON-002",
//       donorName: "Sarah Johnson",
//       foodType: "Non-Vegetarian",
//       foodCategory: "Snacks",
//       numDishes: 40,
//       prepDate: "2025-01-07",
//       expiryDate: "2025-01-09",
//       deliveryType: "delivery",
//       address: "456 Oak Avenue, Uptown",
//       contactNumber: "+1 234-567-8901",
//       status: "accepted",
//     },
//     {
//       id: "DON-003",
//       donorName: "Mike Wilson",
//       foodType: "Vegan",
//       foodCategory: "Dessert",
//       numDishes: 30,
//       prepDate: "2025-01-07",
//       expiryDate: "2025-01-08",
//       deliveryType: "pickup",
//       address: "789 Pine Road, Midtown",
//       contactNumber: "+1 234-567-8902",
//       status: "pending",
//     },
//   ];

//   const handleAccept = (id) => {
//     console.log(`Accepted donation ${id}`);
//   };

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

//         <main className="p-6">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {donations.map((donation) => (
//               <DonationCard
//                 key={donation.id}
//                 donation={donation}
//                 onClick={() => setSelectedDonation(donation)}
//               />
//             ))}
//           </div>
//         </main>

//         <DonationModal
//           donation={selectedDonation}
//           onClose={() => setSelectedDonation(null)}
//           onAccept={handleAccept}
//         />
//       </div>
//     </div>
//   );
// };

// export default DonationGrid;
import React, { useState, useEffect } from "react";
import axios from "axios";
import DonationModal from "./NGO-DonationModel";
import { User, Package, Calendar, Menu } from "lucide-react";
import Sidebar from "../NGOsidebar";

const DonationCard = ({ donation, onClick }) => (
  <div
    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
    onClick={onClick}
  >
    <div className="p-4">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">#{donation.id}</h3>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            donation.status === "available"
              ? "bg-emerald-100 text-emerald-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {donation.status === "available" ? "Available" : "Taken"}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-emerald-600" />
          <span className="text-gray-600 text-sm">{donation.donor.name}</span>
        </div>

        <div className="flex items-center space-x-2">
          <Package className="w-4 h-4 text-emerald-600" />
          <span className="text-gray-600 text-sm">
            {donation.foodType} - {donation.foodCategory}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-emerald-600" />
          <span className="text-gray-600 text-sm">
            Expires: {donation.expiryDate}
          </span>
        </div>
      </div>
    </div>
  </div>
);

const DonationGrid = () => {
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/ngo/getAvailableFood",
        {
          withCredentials:true
        }
      );
      console.log(response.data);
      setDonations(response.data.availableFood);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleAccept = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/ngo/acceptFood",
        { foodId: id },
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
          withCredentials:true
        }
      );
      alert(response.data.message);
      fetchDonations(); // Refresh donations after accepting
      setSelectedDonation(null);
    } catch (error) {
      console.error("Error accepting donation:", error);
    }
  };

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

        <main className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {donations.map((donation) => (
              <DonationCard
                key={donation.id}
                donation={donation}
                onClick={() => setSelectedDonation(donation)}
              />
            ))}
          </div>
        </main>

        {selectedDonation && (
          <DonationModal
            donation={selectedDonation}
            onClose={() => setSelectedDonation(null)}
            onAccept={() => handleAccept(selectedDonation.id)}
          />
        )}
      </div>
    </div>
  );
};

export default DonationGrid;
