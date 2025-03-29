import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Calendar,
  Package,
  CheckCircle,
  XCircle,
  Menu,
  Clock,
  Building,
  MapPin,
  History,
} from "lucide-react";
import Sidebar from "../UserSidebar/UserSidebar";

const DonorRequestHistory = () => {
  const [requestHistory, setRequestHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Fetch NGO request history
  const fetchNGORequestHistory = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/donors/getallNGOrequest",
        { withCredentials: true }
      );
      if (response.data.success) {
        setRequestHistory(response.data.data);
      } else {
        throw new Error(
          response.data.message || "Failed to fetch request history"
        );
      }
    } catch (err) {
      setError(
        err.message || "An error occurred while fetching request history"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch request history on component mount
  useEffect(() => {
    fetchNGORequestHistory();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get status badge based on request status
  const getStatusBadge = (status) => {
    if (status === "ACCEPTED") {
      return (
        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Accepted
        </div>
      );
    } else if (status === "REJECTED") {
      return (
        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <XCircle className="w-3 h-3 mr-1" />
          Rejected
        </div>
      );
    } else {
      return (
        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <Clock className="w-3 h-3 mr-1" />
          Pending
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50">
      <div className="fixed inset-y-0 left-0 z-50">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      <div className={`flex-1 ${isSidebarOpen ? "lg:ml-64" : ""}`}>
        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="lg:hidden text-gray-500 hover:text-gray-700 m-4 focus:outline-none focus:ring-2 focus:ring-[#61cf73]/50 rounded"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="max-w-7xl mx-auto">
          <div className="p-6">
            <h1 className="text-3xl font-semibold text-gray-800">
              Donation Request History
            </h1>
            <p className="text-gray-600 mt-2">
              View your past and current NGO donation requests
            </p>
          </div>

          {error && (
            <div className="mx-6 p-4 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-6 p-6">
            {isLoading ? (
              <div className="text-center text-gray-600">
                Loading request history...
              </div>
            ) : requestHistory.length === 0 ? (
              <div className="text-center p-10 bg-white rounded-lg shadow-sm">
                <History className="w-12 h-12 text-emerald-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-800">
                  No request history
                </h3>
                <p className="text-gray-600 mt-2">
                  You don't have any NGO donation request history yet.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-emerald-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          NGO
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Location
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Quantity
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {requestHistory.map((request) => (
                        <tr
                          key={request.id}
                          className="hover:bg-emerald-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                <Building className="h-5 w-5 text-emerald-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {request.NGO.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                              <div className="text-sm text-gray-900">
                                {request.NGO.address}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                              <div className="text-sm text-gray-900">
                                {formatDate(request.Date)}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Package className="h-4 w-4 text-gray-400 mr-2" />
                              <div className="text-sm text-gray-900">
                                {request.quantity} kg
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {request.status
                              ? getStatusBadge(request.status)
                              : getStatusBadge("pending")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorRequestHistory;
