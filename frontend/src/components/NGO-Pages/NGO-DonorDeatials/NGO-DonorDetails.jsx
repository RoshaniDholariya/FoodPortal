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
import axios from "axios";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const DonorCard = ({ donor }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-emerald-100">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              {donor.photo ? (
                <img
                  src={
                    donor.photo.startsWith("data:image")
                      ? donor.photo
                      : `data:image/png;base64,${donor.photo}`
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        setLoading(true);
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
        setLoading(false);
      }
    };

    fetchDonors();
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

          <div className="space-y-6 p-6">
            {filteredDonors.length === 0 ? (
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
