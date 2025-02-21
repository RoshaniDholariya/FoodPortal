import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Eye,
  FileText,
  Check,
  X,
  Menu,
  Filter,
  AlertCircle,
} from "lucide-react";
import Sidebar from "../AdminSidebar";

const NGODetailsPage = () => {
  const [ngos, setNgos] = useState([]);
  const [filteredNGOs, setFilteredNGOs] = useState([]);
  const [selectedNGO, setSelectedNGO] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("table");

  useEffect(() => {
    fetchNGOs();

    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setViewMode(width < 768 ? "card" : "table");

      if (width >= 1024) {
        setShowMobileSidebar(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    filterNGOs();
  }, [statusFilter, ngos]);

  const filterNGOs = () => {
    if (statusFilter === "all") {
      setFilteredNGOs(ngos);
    } else {
      const filtered = ngos.filter((ngo) => {
        switch (statusFilter) {
          case "approved":
            return ngo.isApproved;
          case "rejected":
            return ngo.isRejected;
          case "pending":
            return !ngo.isApproved && !ngo.isRejected;
          default:
            return true;
        }
      });
      setFilteredNGOs(filtered);
    }
  };

  const fetchNGOs = async () => {
    try {
      const response = await fetch("http://localhost:3000/admin/allngo", {
        withCredentials: true,
      });
      const data = await response.json();

      if (data.success) {
        setNgos(data.data);
        setFilteredNGOs(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to fetch NGOs");
    } finally {
      setLoading(false);
    }
  };

  const handleApproveNGO = async (ngoId) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `http://localhost:3000/admin/approve-ngo/${ngoId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        const updatedNGOs = ngos.map((ngo) =>
          ngo.id === ngoId
            ? { ...ngo, isRejected: false, isApproved: true }
            : ngo
        );
        setNgos(updatedNGOs);

        if (selectedNGO && selectedNGO.id === ngoId) {
          setSelectedNGO({
            ...selectedNGO,
            isRejected: false,
            isApproved: true,
          });
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to approve NGO");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRejectNGO = async (ngoId) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `http://localhost:3000/admin/reject-ngo/${ngoId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        const updatedNGOs = ngos.map((ngo) =>
          ngo.id === ngoId
            ? { ...ngo, isRejected: true, isApproved: false }
            : ngo
        );
        setNgos(updatedNGOs);

        if (selectedNGO && selectedNGO.id === ngoId) {
          setSelectedNGO({
            ...selectedNGO,
            isRejected: true,
            isApproved: false,
          });
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to reject NGO");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadgeClasses = (ngo) => {
    if (ngo.isApproved) return "bg-green-100 text-green-700";
    if (ngo.isRejected) return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  const getStatusText = (ngo) => {
    if (ngo.isApproved) return "Approved";
    if (ngo.isRejected) return "Rejected";
    return "Pending";
  };

  const FilterDropdown = () => (
    <div className="relative inline-block">
      <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center space-x-2 text-sm hover:border-teal-300 transition-colors">
        <Filter className="h-4 w-4 text-teal-500" />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="appearance-none bg-transparent border-none focus:outline-none focus:ring-0 pr-8 py-1 text-gray-700"
        >
          <option value="all">All NGOs</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="pending">Pending</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="mt-8 flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="rounded-full bg-yellow-50 p-6 mb-4">
        <AlertCircle className="h-10 w-10 text-yellow-500" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No NGOs Found</h3>
      <p className="text-gray-500 max-w-md mb-6">
        There are no NGOs matching your current filter criteria. Try adjusting
        your filters or check back later.
      </p>
      <button
        onClick={() => setStatusFilter("all")}
        className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
      >
        View All NGOs
      </button>
    </div>
  );

  const NGOTable = () => (
    <div className="flex h-screen">
      <Sidebar
        isMobile={isMobile}
        showMobileSidebar={showMobileSidebar}
        onCloseSidebar={() => setShowMobileSidebar(false)}
      />

      <main className="flex-1 lg:pl-60 bg-gradient-to-b from-emerald-50 to-teal-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            {isMobile && (
              <button
                onClick={() => setShowMobileSidebar(true)}
                className="p-2 hover:bg-gray-100 rounded-lg self-start"
              >
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
            )}

            <h1 className="text-xl font-bold text-gray-800">NGO Management</h1>

            <FilterDropdown />
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
              {error}
            </div>
          ) : filteredNGOs.length === 0 ? (
            <EmptyState />
          ) : viewMode === "table" ? (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                        NGO Name
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-center text-sm font-medium text-gray-600">
                        Status
                      </th>
                      <th className="px-6 py-3 text-center text-sm font-medium text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredNGOs.map((ngo) => (
                      <tr key={ngo.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">
                            {ngo.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {ngo.email}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {ngo.phoneNumber}
                          </div>
                          <div className="text-sm text-gray-500">
                            {ngo.city}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClasses(
                                ngo
                              )}`}
                            >
                              {getStatusText(ngo)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={() => setSelectedNGO(ngo)}
                              className="text-teal-600 hover:text-teal-700 transition-colors p-1 hover:bg-teal-50 rounded-full"
                              title="View Details"
                            >
                              <Eye className="h-5 w-5" />
                            </button>
                            {!ngo.isApproved && !ngo.isRejected && (
                              <>
                                <button
                                  onClick={() => handleApproveNGO(ngo.id)}
                                  className="text-green-600 hover:text-green-700 transition-colors p-1 hover:bg-green-50 rounded-full"
                                  disabled={isSubmitting}
                                  title="Approve NGO"
                                >
                                  <Check className="h-5 w-5" />
                                </button>
                                <button
                                  onClick={() => handleRejectNGO(ngo.id)}
                                  className="text-red-600 hover:text-red-700 transition-colors p-1 hover:bg-red-50 rounded-full"
                                  disabled={isSubmitting}
                                  title="Reject NGO"
                                >
                                  <X className="h-5 w-5" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredNGOs.map((ngo) => (
                <div
                  key={ngo.id}
                  className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900">{ngo.name}</h3>
                      <p className="text-sm text-gray-500">{ngo.email}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClasses(
                        ngo
                      )}`}
                    >
                      {getStatusText(ngo)}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <span className="font-medium mr-2">Phone:</span>{" "}
                      {ngo.phoneNumber}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium mr-2">Location:</span>{" "}
                      {ngo.city}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => setSelectedNGO(ngo)}
                      className="flex items-center justify-center px-3 py-2 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors text-sm"
                    >
                      <Eye className="h-4 w-4 mr-1" /> View
                    </button>

                    {!ngo.isApproved && !ngo.isRejected && (
                      <>
                        <button
                          onClick={() => handleApproveNGO(ngo.id)}
                          className="flex items-center justify-center px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm"
                          disabled={isSubmitting}
                        >
                          <Check className="h-4 w-4 mr-1" /> Accept
                        </button>
                        <button
                          onClick={() => handleRejectNGO(ngo.id)}
                          className="flex items-center justify-center px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm"
                          disabled={isSubmitting}
                        >
                          <X className="h-4 w-4 mr-1" /> Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );

  const NGODetails = ({ ngo }) => (
    <div className="flex h-screen bg-gradient-to-b from-emerald-50 to-teal-50">
      <Sidebar
        isMobile={isMobile}
        showMobileSidebar={showMobileSidebar}
        onCloseSidebar={() => setShowMobileSidebar(false)}
      />

      <main className="flex-1 lg:pl-60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            {isMobile && (
              <button
                onClick={() => setShowMobileSidebar(true)}
                className="p-2 hover:bg-gray-100 rounded-lg self-start"
              >
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
            )}

            <button
              onClick={() => setSelectedNGO(null)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span>Back to NGO List</span>
            </button>

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClasses(
                ngo
              )}`}
            >
              {getStatusText(ngo)}
            </span>
          </div>

          <div className="bg-white rounded-xl shadow-sm">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <h2 className="text-xl font-semibold text-gray-900">
                {ngo.name}
              </h2>

              {!ngo.isApproved && !ngo.isRejected && (
                <div className="flex space-x-3 w-full sm:w-auto">
                  <button
                    onClick={() => handleApproveNGO(ngo.id)}
                    className="flex-1 sm:flex-none px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 flex items-center justify-center space-x-2 transition-colors"
                    disabled={isSubmitting}
                  >
                    <Check className="h-4 w-4" />
                    <span>{isSubmitting ? "Processing..." : "Accept"}</span>
                  </button>
                  <button
                    onClick={() => handleRejectNGO(ngo.id)}
                    className="flex-1 sm:flex-none px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center space-x-2 transition-colors"
                    disabled={isSubmitting}
                  >
                    <X className="h-4 w-4" />
                    <span>{isSubmitting ? "Processing..." : "Reject"}</span>
                  </button>
                </div>
              )}
            </div>

            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500 border-b border-gray-200 pb-2 mb-4">
                    Basic Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-500">NGO Name</label>
                      <p className="text-sm font-medium text-gray-900">
                        {ngo.name}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Email</label>
                      <p className="text-sm font-medium text-gray-900">
                        {ngo.email}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">
                        Phone Number
                      </label>
                      <p className="text-sm font-medium text-gray-900">
                        {ngo.phoneNumber}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500 border-b border-gray-200 pb-2 mb-4">
                    Location Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-500">City</label>
                      <p className="text-sm font-medium text-gray-900">
                        {ngo.city}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Pincode</label>
                      <p className="text-sm font-medium text-gray-900">
                        {ngo.pincode}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Address</label>
                      <p className="text-sm font-medium text-gray-900">
                        {ngo.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {ngo.certificate && (
                <div className="mt-6 sm:mt-8">
                  <h3 className="text-sm font-medium text-gray-500 mb-4 border-b border-gray-200 pb-2">
                    Documents
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-teal-100 rounded-lg">
                        <FileText className="h-5 w-5 text-teal-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {ngo.certificate}
                        </p>
                        <p className="text-xs text-gray-500">NGO Certificate</p>
                      </div>
                    </div>
                    <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors">
                      View Document
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-50">
      {selectedNGO ? <NGODetails ngo={selectedNGO} /> : <NGOTable />}
    </div>
  );
};

export default NGODetailsPage;
