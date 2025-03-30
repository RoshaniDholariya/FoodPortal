import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AlertTriangle,
  User,
  Package,
  Calendar,
  AlertCircle,
  X,
  Menu,
  Filter,
} from "lucide-react";
import Sidebar from "../NGOsidebar";

const ReportDonationModal = ({ donation, onClose, onSubmit }) => {
  const [reportMessage, setReportMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(donation.id, donation.donor.id, reportMessage);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 m-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-6 h-6 text-amber-500" />
            <h3 className="text-xl font-semibold text-gray-900">
              Report Donation
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-5 p-3 bg-amber-50 rounded-lg border border-amber-200">
          <div className="flex items-center space-x-3 mb-2">
            <User className="w-4 h-4 text-emerald-600" />
            <span className="text-gray-700">{donation.donor.name}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Package className="w-4 h-4 text-emerald-600" />
            <span className="text-gray-700">
              {donation.foodType} - {donation.foodCategory}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="report"
            >
              Report Message
            </label>
            <textarea
              id="report"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              rows="4"
              placeholder="Describe the issue with this donation..."
              value={reportMessage}
              onChange={(e) => setReportMessage(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="text-sm text-gray-600 mb-4">
            <AlertCircle className="w-4 h-4 inline-block mr-1 text-amber-500" />
            This will add a warning to the donor's account. Three warnings will
            result in a 2-week account suspension.
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DonationItem = ({ donation, onReport }) => (
  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-emerald-100 p-4">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
      <div className="flex items-center space-x-4">
        <span className="text-emerald-600 font-semibold">#{donation.id}</span>
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-emerald-600" />
          <span className="text-gray-700">{donation.donor.name}</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
        <div className="flex items-center space-x-2">
          <Package className="w-4 h-4 text-emerald-600" />
          <span className="text-gray-600">{donation.foodType}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-emerald-600" />
          <span className="text-gray-600">
            {new Date(donation.expiryDate).toLocaleDateString()}
          </span>
        </div>

        {!donation.report && (
          <button
            onClick={() => onReport(donation)}
            className="mt-2 md:mt-0 px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded flex items-center space-x-1 transition-colors"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Report</span>
          </button>
        )}
      </div>
    </div>

    {donation.report && (
      <div className="mt-3 p-2 bg-red-50 rounded text-sm text-red-800 border border-red-200">
        <strong>Previously Reported:</strong> {donation.report}
      </div>
    )}
  </div>
);

const FilterButton = ({ label, isActive, onClick, count }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
      isActive
        ? "bg-emerald-600 text-white"
        : "bg-white text-gray-700 hover:bg-emerald-50"
    }`}
  >
    <span>{label}</span>
    {count !== undefined && (
      <span className={`text-xs px-2 py-1 rounded-full ${
        isActive ? "bg-white text-emerald-600" : "bg-emerald-100 text-emerald-800"
      }`}>
        {count}
      </span>
    )}
  </button>
);

const Reports = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [acceptedDonations, setAcceptedDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchAcceptedDonations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/ngo/getacceptedFood",
          { withCredentials: true }
        );

        if (response.data.success) {
          setAcceptedDonations(response.data.acceptedFood);
          setFilteredDonations(response.data.acceptedFood);
        } else {
          setErrorMessage(
            "Failed to fetch donations: " + response.data.message
          );
        }
      } catch (error) {
        setErrorMessage("Error fetching accepted donations");
        console.error("Error fetching accepted donations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedDonations();
  }, []);

  const handleOpenReportModal = (donation) => {
    setSelectedDonation(donation);
    setReportModalOpen(true);
  };

  const handleCloseReportModal = () => {
    setReportModalOpen(false);
    setSelectedDonation(null);
  };

  const handleSubmitReport = async (donationId, donorId, reportMessage) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/ngo/report-donation",
        {
          donationId,
          donorId,
          report: reportMessage,
          ngoId: "your-ngo-id", // You might need to get this from your auth context
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        // Update the local state to show the report
        const updatedDonations = acceptedDonations.map((donation) =>
          donation.id === donationId
            ? { ...donation, report: reportMessage }
            : donation
        );
        
        setAcceptedDonations(updatedDonations);
        applyFilter(activeFilter, updatedDonations);

        setSuccessMessage(
          "Donation reported successfully. The donor has been notified."
        );
        handleCloseReportModal();

        // Clear success message after 5 seconds
        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        setErrorMessage(response.data.error || "Failed to report donation");
      }
    } catch (error) {
      setErrorMessage("Error reporting donation");
      console.error("Error reporting donation:", error);
    }
  };

  const applyFilter = (filter, donations = acceptedDonations) => {
    setActiveFilter(filter);
    
    if (filter === "all") {
      setFilteredDonations(donations);
    } else if (filter === "reported") {
      setFilteredDonations(donations.filter(donation => donation.report));
    } else if (filter === "unreported") {
      setFilteredDonations(donations.filter(donation => !donation.report));
    }
  };

  const reportedCount = acceptedDonations.filter(d => d.report).length;
  const unreportedCount = acceptedDonations.filter(d => !d.report).length;

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
          <button
            onClick={toggleSidebar}
            className="text-emerald-600 hover:text-emerald-900 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <div className="max-w-7xl mx-auto">
          <main className="p-6">
            <h1 className="text-3xl font-semibold text-gray-800">
              Report Donations
            </h1>
            <p className="text-gray-600 mt-2 mb-6">
              Report issues with accepted donations to warn donors about quality
              problems
            </p>

            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center space-x-1 text-emerald-800">
                <Filter className="w-4 h-4" />
                <span className="font-medium">Filter:</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <FilterButton 
                  label="All Donations" 
                  isActive={activeFilter === "all"} 
                  onClick={() => applyFilter("all")}
                  count={acceptedDonations.length}
                />
                <FilterButton 
                  label="Reported" 
                  isActive={activeFilter === "reported"} 
                  onClick={() => applyFilter("reported")}
                  count={reportedCount}
                />
                <FilterButton 
                  label="Unreported" 
                  isActive={activeFilter === "unreported"} 
                  onClick={() => applyFilter("unreported")}
                  count={unreportedCount}
                />
              </div>
            </div>

            {successMessage && (
              <div className="mt-4 p-3 bg-green-100 border border-green-200 text-green-800 rounded-lg">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="mt-4 p-3 bg-red-100 border border-red-200 text-red-800 rounded-lg">
                {errorMessage}
              </div>
            )}
          </main>
        </div>

        {loading ? (
          <div className="flex justify-center items-center mt-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div>
          </div>
        ) : (
          <div className="space-y-4 m-5">
            {filteredDonations.length > 0 ? (
              filteredDonations.map((donation) => (
                <DonationItem
                  key={donation.id}
                  donation={donation}
                  onReport={handleOpenReportModal}
                />
              ))
            ) : (
              <p className="text-center text-gray-600 p-6 bg-white rounded-lg shadow-sm">
                {activeFilter === "all" 
                  ? "No accepted donations available." 
                  : activeFilter === "reported" 
                    ? "No reported donations found."
                    : "No unreported donations found."}
              </p>
            )}
          </div>
        )}
      </div>

      {reportModalOpen && selectedDonation && (
        <ReportDonationModal
          donation={selectedDonation}
          onClose={handleCloseReportModal}
          onSubmit={handleSubmitReport}
        />
      )}
    </div>
  );
};

export default Reports;