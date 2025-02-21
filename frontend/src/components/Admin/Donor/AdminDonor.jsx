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

const AdminDonor = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDonor, setSelectedDonor] = useState(null);

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
            withCredential: true,
          }
        );
        if (response.data) {
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

  const DonorDetails = ({ donor, onClose }) => (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-6 bg-emerald-50 border-b border-emerald-100 flex justify-between items-start">
        <div className="flex items-center gap-3">
          <User className="h-8 w-8 text-emerald-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Donor Details</h2>
            <span className="px-3 py-1 text-sm font-semibold rounded-full bg-emerald-100 text-emerald-800">
              {donor.donorType}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-emerald-100 rounded-full transition-colors"
        >
          <X className="h-6 w-6 text-gray-500" />
        </button>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-emerald-600" />
                Personal Information
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Full Name</p>
                  <p className="text-gray-900">Saloni Patel</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Restaurant Name
                  </p>
                  <p className="text-gray-900">Social Service</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Phone Number
                  </p>
                  <p className="text-gray-900">9327411550</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Donor Type
                  </p>
                  <p className="text-gray-900">{donor.donorType}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-emerald-600" />
                Address Details
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  <p className="text-gray-900">
                    Shantinagar street 4, Janta Society Opposite CHARANAAT
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">City</p>
                  <p className="text-gray-900">Jamnagar</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">State</p>
                  <p className="text-gray-900">Gujrat</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Pincode</p>
                  <p className="text-gray-900">361006</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const DonorCard = ({ donor }) => (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-medium text-gray-900">Saloni Patel</h3>
        <button
          onClick={() => setSelectedDonor(donor)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Eye className="h-5 w-5 text-emerald-600" />
        </button>
      </div>
      <div className="space-y-2 text-sm text-gray-500">
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
          {donor.donorType}
        </span>
        <p className="flex items-center gap-2 mt-2">
          <Building className="h-4 w-4" />
          <span>Social Service</span>
        </p>
        <p className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          <span>9327411550</span>
        </p>
        <p className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>Jamnagar, Gujrat</span>
        </p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar
        isMobile={isMobile}
        showMobileSidebar={showMobileSidebar}
        onCloseSidebar={() => setShowMobileSidebar(false)}
      />

      <main className="flex-1 lg:pl-60 bg-gradient-to-b from-emerald-50 to-teal-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between mb-6">
            {isMobile && (
              <button
                onClick={() => setShowMobileSidebar(true)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}
            <h1 className="text-2xl font-bold text-gray-800">Donors List</h1>
          </div>

          {selectedDonor && (
            <div className="mb-8">
              <DonorDetails
                donor={selectedDonor}
                onClose={() => setSelectedDonor(null)}
              />
            </div>
          )}

          <div className="block md:hidden">
            {donors.map((donor) => (
              <DonorCard key={donor.id} donor={donor} />
            ))}
          </div>

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
                  {donors.map((donor) => (
                    <tr
                      key={donor.id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          Saloni Patel
                        </div>
                      </td>{" "}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                          {donor.donorType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                          {donor.donations}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold ">
                          {donor.phone}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Eye
                          className="h-5 w-5 text-emerald-600 hover:text-emerald-700 cursor-pointer"
                          onClick={() => setSelectedDonor(donor)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDonor;
