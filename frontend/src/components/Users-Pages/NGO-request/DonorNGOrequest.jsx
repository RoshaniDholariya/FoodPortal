import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Calendar,
  Package,
  Check,
  X,
  Menu,
  Clock,
  Building,
  MapPin,
} from "lucide-react";
import Sidebar from "../UserSidebar/UserSidebar";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const DonorRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Fetch NGO requests
  const fetchNGORequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/donors/getNGOrequest",
        { withCredentials: true }
      );
      if (response.data.success) {
        setRequests(response.data.data);
      } else {
        throw new Error(response.data.message || "Failed to fetch requests");
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching requests");
    } finally {
      setLoading(false);
    }
  };

  // Respond to NGO request
  const handleRequestResponse = async (requestId, isAccepted) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/donors/sendNGOAcceptence",
        {
          ngoconnectId: requestId,
          response: isAccepted,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        // Remove the processed request from the list
        setRequests((prevRequests) =>
          prevRequests.filter((req) => req.id !== requestId)
        );

        // Show success message
        setSuccessMessage(
          `Request ${isAccepted ? "accepted" : "rejected"} successfully`
        );

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      setError(err.message || "Failed to process request");

      // Clear error after 3 seconds
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  // Auto-reject past date requests
  const autoRejectPastRequests = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset to start of day for accurate comparison

    const pastRequests = requests.filter((request) => {
      const requestDate = new Date(request.Date);
      requestDate.setHours(0, 0, 0, 0); // Reset to start of day for accurate comparison
      return requestDate < today;
    });

    // Auto-reject all past requests
    for (const request of pastRequests) {
      await handleRequestResponse(request.id, false);
    }
  };

  // Fetch requests on component mount and auto-reject past requests
  useEffect(() => {
    const fetchAndProcess = async () => {
      await fetchNGORequests();
      await autoRejectPastRequests();
    };

    fetchAndProcess();
  }, []);

  // Check if date is in the past
  const isDatePast = (dateString) => {
    const requestDate = new Date(dateString);
    requestDate.setHours(0, 0, 0, 0); // Reset to start of day for accurate comparison

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset to start of day for accurate comparison

    return requestDate < today;
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
              NGO Donation Requests
            </h1>
            <p className="text-gray-600 mt-2">
              View and respond to food donation requests from NGOs
            </p>
          </div>

          {successMessage && (
            <div className="mx-6 p-4 bg-green-100 text-green-700 rounded-md">
              {successMessage}
            </div>
          )}

          <div className="space-y-6 p-6">
            {error ? (
              <div className="mx-6 p-4 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            ) : requests.length === 0 ? (
              <div className="text-center p-10 bg-white rounded-lg shadow-sm">
                <Package className="w-12 h-12 text-emerald-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-800">
                  No pending requests
                </h3>
                <p className="text-gray-600 mt-2">
                  You don't have any pending donation requests from NGOs at the
                  moment.
                </p>
              </div>
            ) : (
              requests.map((request) => {
                const isPast = isDatePast(request.Date);

                return (
                  <div
                    key={request.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-emerald-100"
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div className="flex items-center space-x-4 mb-4 md:mb-0">
                          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                            <Building className="w-6 h-6 text-emerald-600" />
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {request.NGO.name}
                            </h3>
                            <p className="text-sm text-emerald-600">
                              NGO Request
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          {isPast ? (
                            <div className="px-4 py-2 bg-gray-300 text-gray-600 rounded-md flex items-center gap-1 cursor-not-allowed">
                              <X className="w-4 h-4" />
                              Auto-Rejected (Past Date)
                            </div>
                          ) : (
                            <>
                              <button
                                onClick={() =>
                                  handleRequestResponse(request.id, true)
                                }
                                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition flex items-center gap-1"
                              >
                                <Check className="w-4 h-4" />
                                Accept
                              </button>
                              <button
                                onClick={() =>
                                  handleRequestResponse(request.id, false)
                                }
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition flex items-center gap-1"
                              >
                                <X className="w-4 h-4" />
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-emerald-600" />
                          <span
                            className={`${
                              isPast
                                ? "text-red-500 font-medium"
                                : "text-gray-700"
                            }`}
                          >
                            Requested for: {formatDate(request.Date)}{" "}
                            {isPast && "(Past date)"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Package className="w-5 h-5 text-emerald-600" />
                          <span className="text-gray-700">
                            Quantity: {request.quantity} kg
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-emerald-600" />
                          <span className="text-gray-700">
                            {request.NGO.address}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Clock className="w-5 h-5 text-emerald-600" />
                          <span className="text-gray-700">
                            Status: {isPast ? "Auto-Rejected" : "Pending"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorRequests;
