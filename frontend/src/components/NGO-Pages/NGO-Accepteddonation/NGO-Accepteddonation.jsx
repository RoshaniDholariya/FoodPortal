import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  User,
  Package,
  Calendar,
  MapPin,
  Phone,
  Clock,
  X,
  Menu,
  ChevronRight,
} from "lucide-react";
import Sidebar from "../NGOsidebar";

const AcceptedDonationRow = ({ donation, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer border border-emerald-100"
  >
    <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
      <div className="flex items-center space-x-4">
        <span className="text-emerald-600 font-semibold">#{donation.id}</span>
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-emerald-600" />
          <span className="text-gray-700">{donation.donor.name}</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Package className="w-4 h-4 text-emerald-600" />
          <span className="text-gray-600">{donation.foodType}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-emerald-600" />
          <span className="text-gray-600">
            {new Date(donation.expiryDate).toLocaleDateString()}
          </span>
        </div>
        <ChevronRight className="w-5 h-5 text-emerald-600" />
      </div>
    </div>
  </div>
);

const DonationDetails = ({ donation, onClose }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 space-y-6 m-5">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          Donation #{donation.id}
        </h3>
        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
          Accepted
        </span>
      </div>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900">Donor Information</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-emerald-600" />
            <span className="text-gray-700">{donation.donor.name}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-emerald-600" />
            <span className="text-gray-700">{donation.donor.email}</span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <span className="text-gray-700">{donation.address}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900">Donation Details</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Package className="w-5 h-5 text-emerald-600" />
            <span className="text-gray-700">
              {donation.foodType} - {donation.foodCategory}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-emerald-600" />
            <span className="text-gray-700">
              Prepared:{" "}
              {new Date(donation.preparationDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <span className="text-gray-700">
              Expires: {new Date(donation.expiryDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const NGOAccepteddonation = () => {
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [acceptedDonations, setAcceptedDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchAcceptedDonations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/ngo/getacceptedFood",
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        if (response.data.success) {
          setAcceptedDonations(response.data.acceptedFood);
        } else {
          console.error("Failed to fetch donations:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching accepted donations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedDonations();
  }, []);

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
          <button
            onClick={toggleSidebar}
            className="text-emerald-600 hover:text-emerald-900 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <div className="max-w-7xl mx-auto">
          <main className="p-6">
            <h1 className="text-3xl font-semibold text-gray-800">
              Accepted Donations
            </h1>
            <p className="text-gray-600 mt-2">
              View and manage all accepted food donations
            </p>
          </main>
        </div>

        {loading ? (
          <p className="text-center text-gray-600 mt-4">Loading...</p>
        ) : selectedDonation ? (
          <DonationDetails
            donation={selectedDonation}
            onClose={() => setSelectedDonation(null)}
          />
        ) : (
          <div className="space-y-4 m-5">
            {acceptedDonations.length > 0 ? (
              acceptedDonations.map((donation) => (
                <AcceptedDonationRow
                  key={donation.id}
                  donation={donation}
                  onClick={() => setSelectedDonation(donation)}
                />
              ))
            ) : (
              <p className="text-center text-gray-600">
                No accepted donations found.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NGOAccepteddonation;
