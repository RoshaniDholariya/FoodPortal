import React, { useState, useEffect } from "react";
import {
  User,
  Calendar,
  Package,
  Send,
  Clock,
  Menu,
  Building,
  Check,
  X,
  Info,
} from "lucide-react";
import axios from "axios";
import Sidebar from "../NGOsidebar";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router

const NGOConnectRequest = () => {
  const [donors, setDonors] = useState([]);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [activeTab, setActiveTab] = useState("request"); // "request" or "history"
  const [requestHistory, setRequestHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch donors for NGO
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

  // Fetch request history when tab changes to history
  useEffect(() => {
    if (activeTab === "history") {
      fetchRequestHistory();
    }
  }, [activeTab]);

  const fetchRequestHistory = async () => {
    try {
      setHistoryLoading(true);
      // Get NGO ID from user profile or context
      const currentUser = await axios.get(
        "http://localhost:3000/api/ngo/getngoDetails",
        {
          withCredentials: true,
        }
      );

      const ngoId = currentUser.data.ngo.id;
      console.log(ngoId);

      const response = await axios.get(
        `http://localhost:3000/api/ngo/getNgoConnectDetails/${ngoId}`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setRequestHistory(response.data.data);
      } else {
        throw new Error(
          response.data.message || "Failed to fetch request history"
        );
      }
    } catch (error) {
      console.error("Error fetching request history:", error);
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDonor || !quantity || !date) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      const sd = parseInt(selectedDonor);
      const q = parseInt(quantity);

      console.log(typeof sd);
      console.log(typeof q);

      const response = await axios.post(
        "http://localhost:3000/api/ngo/ngoconnectdetails",
        {
          donorId: parseInt(selectedDonor),
          quantity: parseInt(quantity),
          Date: new Date(date).toISOString(),
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      if (response.data.success) {
        setSuccessMessage("Request sent successfully to the donor");
        // Reset form
        setSelectedDonor(null);
        setQuantity("");
        setDate("");

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);

        // Refresh request history if we're viewing it
        if (activeTab === "history") {
          fetchRequestHistory();
        }
      } else {
        throw new Error(response.data.message || "Failed to send request");
      }
    } catch (error) {
      setError(error.message || "Failed to send request");
      console.error("Error sending donation request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "ACCEPTED":
        return "text-green-600";
      case "REJECTED":
        return "text-red-600";
      case "PENDING":
      default:
        return "text-yellow-600";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "ACCEPTED":
        return <Check className="w-4 h-4" />;
      case "REJECTED":
        return <X className="w-4 h-4" />;
      case "PENDING":
      default:
        return <Clock className="w-4 h-4" />;
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

        <div className="max-w-7xl mx-auto">
          <div className="p-6">
            <h1 className="text-3xl font-semibold text-gray-800">
              Donation Request
            </h1>
            <p className="text-gray-600 mt-2">
              Request donations from registered donors
            </p>
          </div>

          <div className="px-6 pb-4">
            <div className="flex border-b border-gray-200">
              <button
                className={`py-2 px-4 ${
                  activeTab === "request"
                    ? "text-emerald-600 border-b-2 border-emerald-600 font-medium"
                    : "text-gray-600 hover:text-emerald-600"
                }`}
                onClick={() => setActiveTab("request")}
              >
                New Request
              </button>
              <button
                className={`py-2 px-4 ${
                  activeTab === "history"
                    ? "text-emerald-600 border-b-2 border-emerald-600 font-medium"
                    : "text-gray-600 hover:text-emerald-600"
                }`}
                onClick={() => setActiveTab("history")}
              >
                Request History
              </button>
            </div>
          </div>

          {successMessage && (
            <div className="mx-6 p-4 bg-green-100 text-green-700 rounded-md">
              {successMessage}
            </div>
          )}

          {error && (
            <div className="mx-6 p-4 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {activeTab === "request" ? (
            <div className="p-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {isLoading ? (
                  <div className="text-center text-gray-600">
                    Loading donors...
                  </div>
                ) : donors.length === 0 ? (
                  <div className="text-center">
                    <Info className="w-12 h-12 text-emerald-300 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-800">
                      No donors available
                    </h3>
                    <p className="text-gray-600 mt-2">
                      There are no registered donors available at the moment.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Select Donor
                      </label>
                      <select
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        value={selectedDonor || ""}
                        onChange={(e) => setSelectedDonor(e.target.value)}
                        required
                      >
                        <option value="">-- Select a Donor --</option>
                        {donors.map((donor) => (
                          <option key={donor.id} value={donor.id}>
                            {donor.name}{" "}
                            {donor.restaurantName
                              ? `(${donor.restaurantName})`
                              : ""}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Quantity (in kg)
                      </label>
                      <input
                        type="number"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Enter quantity in kilograms"
                        min="1"
                        required
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Requested Date
                      </label>
                      <input
                        type="date"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-emerald-600 text-white py-3 rounded-md hover:bg-emerald-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Sending Request..."
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Request
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Donation Request History
                </h2>

                {historyLoading ? (
                  <div className="text-center text-gray-600">
                    Loading history...
                  </div>
                ) : requestHistory.length === 0 ? (
                  <div className="text-center p-8">
                    <Info className="w-12 h-12 text-emerald-300 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-800">
                      No request history
                    </h3>
                    <p className="text-gray-600 mt-2">
                      You haven't made any donation requests yet.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Donor
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantity
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {requestHistory.map((request) => (
                          <tr key={request.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                  <Building className="h-5 w-5 text-emerald-600" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {request.donorId}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {formatDate(request.Date)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {request.quantity} kg
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                  request.status
                                )} bg-opacity-10`}
                              >
                                {getStatusIcon(request.status)}
                                <span className="ml-1">
                                  {request.status || "PENDING"}
                                </span>
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NGOConnectRequest;
