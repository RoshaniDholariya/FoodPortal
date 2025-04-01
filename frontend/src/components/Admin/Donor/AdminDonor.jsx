import React, { useState, useEffect } from "react";
import {
  Menu,
  Eye,
  X,
  MapPin,
  Phone,
  Building,
  User,
  Search,
} from "lucide-react";
import Sidebar from "../AdminSidebar";
import axios from "axios";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import DonorDetailsDialog from "./DonorDialog";

const AdminDonor = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(true);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setShowMobileSidebar(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/admin/alldonor",
          {
            withCredentials: true, // Fixed typo from 'withCredential'
          }
        );
        if (response.data && response.data.success) {
          setDonors(response.data.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  const handleViewDonor = (donor) => {
    setSelectedDonor(donor);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
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

  if (error) {
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
            <p className="text-red-500 font-semibold">
              Error loading donors: {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const DonorCard = ({ donor }) => (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-medium text-gray-900">
          {donor.name || "No Name"}
        </h3>
        <button
          onClick={() => handleViewDonor(donor)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Eye className="h-5 w-5 text-emerald-600" />
        </button>
      </div>
      <div className="space-y-2 text-sm text-gray-500">
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
          {donor.donorType || "Unknown"}
        </span>
        {donor.organizationName && (
          <p className="flex items-center gap-2 mt-2">
            <Building className="h-4 w-4" />
            <span>{donor.organizationName}</span>
          </p>
        )}
        <p className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          <span>{donor.phone || "No Phone"}</span>
        </p>
        {donor.city && donor.state && (
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>
              {donor.city}, {donor.state}
            </span>
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen">
      <div className="fixed inset-y-0 left-0 z-50">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
      <main
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "lg:pl-64" : "lg:pl-20"
        } bg-gradient-to-b from-emerald-50 to-teal-50`}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <h1 className="text-2xl font-bold text-gray-800">Donors List</h1>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                placeholder="Search donors..."
              />
            </div>
          </div>

          {/* Mobile view */}
          <div className="block md:hidden">
            {donors.length > 0 ? (
              donors.map((donor) => <DonorCard key={donor.id} donor={donor} />)
            ) : (
              <p className="text-center py-8 text-gray-500">No donors found</p>
            )}
          </div>

          {/* Desktop view */}
          <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Full Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Donations
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {donors.length > 0 ? (
                    donors.map((donor) => (
                      <tr
                        key={donor.id}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {donor.name || "No Name"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                            {donor.donorType || "Unknown"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                            {donor.donations || 0}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {donor.phone || "No Phone"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button onClick={() => handleViewDonor(donor)}>
                            <Eye className="h-5 w-5 text-emerald-600 hover:text-emerald-700 cursor-pointer" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No donors found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <DonorDetailsDialog
        donor={selectedDonor}
        isOpen={isDialogOpen}
        onClose={closeDialog}
      />
    </div>
  );
};

export default AdminDonor;
