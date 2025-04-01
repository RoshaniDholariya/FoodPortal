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
  Filter,
  RefreshCw,
  CalendarDays,
  Download,
  Search,
} from "lucide-react";
import Sidebar from "../UserSidebar/UserSidebar";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const DonorRequestHistory = () => {
  const [requestHistory, setRequestHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [dateFilter, setDateFilter] = useState({
    startDate: "",
    endDate: "",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNGORequestHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/donors/getallNGOrequest",
        { withCredentials: true }
      );
      if (response.data.success) {
        setRequestHistory(response.data.data);
        setFilteredHistory(response.data.data);
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
      setLoading(false);
    }
  };

  // Fetch request history on component mount
  useEffect(() => {
    fetchNGORequestHistory();
  }, []);

  // Apply date filter
  const applyDateFilter = () => {
    if (!dateFilter.startDate && !dateFilter.endDate) {
      setFilteredHistory(requestHistory);
      return;
    }

    const filtered = requestHistory.filter((request) => {
      const requestDate = new Date(request.Date);
      const startDate = dateFilter.startDate
        ? new Date(dateFilter.startDate)
        : null;
      const endDate = dateFilter.endDate ? new Date(dateFilter.endDate) : null;

      if (startDate && endDate) {
        return requestDate >= startDate && requestDate <= endDate;
      } else if (startDate) {
        return requestDate >= startDate;
      } else if (endDate) {
        return requestDate <= endDate;
      }
      return true;
    });

    setFilteredHistory(filtered);
    setIsFilterOpen(false);
  };

  // Reset date filter
  const resetDateFilter = () => {
    setDateFilter({
      startDate: "",
      endDate: "",
    });
    setFilteredHistory(requestHistory);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusMetrics = () => {
    const today = new Date();

    const accepted = filteredHistory.filter(
      (r) => r.status === "ACCEPTED"
    ).length;

    const rejected = filteredHistory.filter(
      (r) =>
        r.status === "REJECTED" ||
        (new Date(r.Date) < today && (!r.status || r.status === "PENDING"))
    ).length;

    const pending = filteredHistory.filter(
      (r) => (!r.status || r.status === "PENDING") && new Date(r.Date) >= today
    ).length;

    const total = filteredHistory.length;

    return { accepted, rejected, pending, total };
  };
  const metrics = getStatusMetrics();

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

  // Get status badge based on request status
  const getStatusBadge = (status, dateString) => {
    const requestDate = new Date(dateString);
    const today = new Date();

    // Check if date is in the past and status is not already set
    if (requestDate < today && (!status || status === "PENDING")) {
      return (
        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <XCircle className="w-3 h-3 mr-1" />
          Rejected (Expired)
        </div>
      );
    }

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
    <div className="min-h-screen bg-white-50">
      <div className="fixed inset-y-0 left-0 z-50">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="lg:hidden text-gray-500 hover:text-gray-700 m-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 rounded"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          {/* Header with actions */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Donation Request History
              </h1>
              <p className="text-gray-600 mt-2">
                View and manage your NGO donation requests
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-emerald-500">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-emerald-100 rounded-md p-3">
                  <CalendarDays className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Total Requests
                  </h3>
                  <p className="text-3xl font-semibold text-gray-900">
                    {metrics.total}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Accepted
                  </h3>
                  <p className="text-3xl font-semibold text-gray-900">
                    {metrics.accepted}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-500">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Rejected
                  </h3>
                  <p className="text-3xl font-semibold text-gray-900">
                    {metrics.rejected}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-500">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Pending</h3>
                  <p className="text-3xl font-semibold text-gray-900">
                    {metrics.pending}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Date Filter Section */}
          {isFilterOpen && (
            <div className="mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="mb-4 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">
                    Filter Requests
                  </h3>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        className="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        value={dateFilter.startDate}
                        onChange={(e) =>
                          setDateFilter({
                            ...dateFilter,
                            startDate: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        className="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        value={dateFilter.endDate}
                        onChange={(e) =>
                          setDateFilter({
                            ...dateFilter,
                            endDate: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex items-end">
                    <button
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md shadow-sm transition-colors mr-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                      onClick={applyDateFilter}
                    >
                      Apply Filter
                    </button>
                    <button
                      className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                      onClick={resetDateFilter}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="space-y-6">
            {error ? (
              <div className="p-4 bg-red-50 border border-red-300 text-red-700 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <XCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Error loading data
                    </h3>
                    <p className="mt-2 text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            ) : filteredHistory.length === 0 ? (
              <div className="text-center p-16 bg-white rounded-lg shadow-sm border border-gray-200">
                <History className="w-16 h-16 text-emerald-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900">
                  No request history
                </h3>
                <p className="mt-2 text-gray-600 max-w-md mx-auto">
                  {requestHistory.length === 0
                    ? "You don't have any NGO donation request history yet."
                    : "No requests match your filter criteria."}
                </p>
                {requestHistory.length > 0 && filteredHistory.length === 0 && (
                  <button
                    onClick={resetDateFilter}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  >
                    Reset Filter
                  </button>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="py-4 px-6 bg-gray-50 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      Donation Requests
                    </h3>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="search"
                        placeholder="Search requests..."
                        className="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
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
                      {filteredHistory.map((request, index) => (
                        <tr
                          key={request.id || index}
                          className="hover:bg-gray-50 transition-colors"
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
                          {/* <td className="px-6 py-4 whitespace-nowrap">
                            {request.status
                              ? getStatusBadge(request.status)
                              : getStatusBadge("pending")}
                          </td> */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(request.status, request.Date)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <div className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">
                      {filteredHistory.length}
                    </span>{" "}
                    results
                  </div>
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
