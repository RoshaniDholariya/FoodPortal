import React, { useState, useEffect } from "react";
import axios from "axios";

const RecentDonation = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/donors/getDonorFood",
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (response.data.success) {
          setDonations(response.data.foodList);
        } else {
          setError("Failed to fetch donation history.");
        }
      } catch (err) {
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const StatusBadge = ({ status }) => {
    const colors = {
      completed: "text-green-500 ",
      available: "text-blue-500",
      expired: "text-red-500",
    };

    return (
      <span
        className={`text-base font-semibold ${colors[status] || "text-white"}`}
      >
        {status}
      </span>
    );
  };
  const filteredDonations =
    filter === "All"
      ? donations
      : donations.filter((donation) => donation.status === filter);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-white rounded-2xl border border-emerald-100 p-6 shadow-md">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-emerald-100 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-emerald-100 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-emerald-100 rounded"></div>
              <div className="h-4 bg-emerald-100 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl border border-red-100 p-6 shadow-md mb-8">
        <div className="text-center text-red-500 py-4 flex flex-col items-center">
          <svg
            className="w-12 h-12 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-lg font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 p-4 md:p-6 shadow-md mb-8 transition-all duration-500 hover:shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h3 className="text-xl font-bold text-emerald-900 flex items-center">
          <svg
            className="w-6 h-6 mr-2 text-emerald-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Recent Donations
        </h3>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="bg-emerald-50 px-3 py-1 rounded-lg text-sm text-emerald-700 font-medium flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            {donations.length} total donations
          </div>
          <select
            className="bg-white border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="available">Available</option>
            <option value="completed">Completed</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Food Details
                </th>
                <th
                  scope="col"
                  className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Dates
                </th>
                <th
                  scope="col"
                  className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
          </table>

          <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-200 scrollbar-track-gray-100">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDonations.length > 0 ? (
                  filteredDonations.map((donation, index) => (
                    <tr
                      key={index}
                      className="hover:bg-emerald-50 transition-colors"
                    >
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-start">
                          <div className="bg-emerald-100 p-2 rounded-lg mr-3 hidden sm:block">
                            <svg
                              className="w-5 h-5 text-emerald-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                              />
                            </svg>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {donation.foodType}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {donation.foodCategory}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="text-sm text-gray-900 flex items-center">
                            <span className="w-8 inline-block text-xs text-gray-500">
                              Prep:
                            </span>
                            <span className="font-medium">
                              {new Date(
                                donation.preparationDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500 flex items-center mt-1">
                            <span className="w-8 inline-block text-xs text-gray-500">
                              Exp:
                            </span>
                            <span
                              className={`font-medium ${
                                new Date(donation.expiryDate) < new Date()
                                  ? "text-red-600"
                                  : ""
                              }`}
                            >
                              {new Date(
                                donation.expiryDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={donation.status} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <svg
                          className="w-12 h-12 text-gray-300 mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                        <p className="text-gray-500 font-medium">
                          No donations found
                        </p>
                        {filter !== "All" && (
                          <button
                            onClick={() => setFilter("All")}
                            className="mt-3 text-sm text-emerald-600 hover:text-emerald-800"
                          >
                            Show all donations
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentDonation;
