import React, { useState, useEffect } from "react";
import axios from "axios";
import DonationModal from "./NGO-DonationModel";
import { User, Package, Calendar, Menu, PackageX } from "lucide-react";
import Sidebar from "../NGOsidebar";
import { io } from "socket.io-client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

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
            Expires: {new Date(donation.expiryDate).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-96 rounded-lg shadow-sm">
    <PackageX className="w-16 h-16 text-emerald-600 mb-4" />
    <h3 className="text-xl font-semibold text-gray-900 mb-2">
      No Donations Available
    </h3>
    <p className="text-gray-500 text-center max-w-sm">
      There are currently no food donations available. Please check back later
      for new donations.
    </p>
  </div>
);

const DonationGrid = () => {
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/ngo/getAvailableFood",
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      setDonations(response.data.availableFood);
    } catch (error) {
      console.error("Error fetching donations:", error);
    } finally {
      setLoading(false);
    }
  };


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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const socket = io("http://localhost:3000"); // Adjust backend URL accordingly

  const handleAccept = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/ngo/acceptFood",
        { foodId: id },
        { withCredentials: true }
      );

      // alert(response.data.message);
      fetchDonations();
      setSelectedDonation(null);

      socket.emit("foodAccepted", {
        donorId: response.data.donorId,
        message: `Your food donation (#${id}) has been accepted!`,
      });
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
          {donations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {donations.map((donation) => (
                <DonationCard
                  key={donation.id}
                  donation={donation}
                  onClick={() => setSelectedDonation(donation)}
                />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
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
