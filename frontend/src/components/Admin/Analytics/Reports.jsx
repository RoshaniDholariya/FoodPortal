import React, { useState, useEffect } from "react";
import { Menu, Eye } from "lucide-react";
import Sidebar from "../AdminSidebar";
import DonorDetails from "./DonorDetail";

const FadeIn = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-opacity duration-1000 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
};

const DonorReportsTrackingPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [activeTab, setActiveTab] = useState("reported-donors");
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const donorsWithReports = [
    {
      id: 1,
      name: "Fresh Foods Restaurant",
      totalDonations: 42,
      totalReports: 5,
      reportRatio: 11.9,
      lastReported: "2025-03-01",
      status: "flagged",
      qualityRatings: [
        { rating: 5, count: 10 },
        { rating: 4, count: 15 },
        { rating: 3, count: 12 },
        { rating: 2, count: 4 },
        { rating: 1, count: 1 },
      ],
      donationStatus: {
        completed: 35,
        expired: 4,
        pending: 3,
      },
      reports: [
        {
          id: 101,
          date: "2025-03-01",
          ngoName: "Community Helpers",
          issue: "Expired dairy products",
          status: "pending",
          severity: "high",
        },
        {
          id: 87,
          date: "2025-02-15",
          ngoName: "Food for All",
          issue: "Spoiled vegetables",
          status: "resolved",
          severity: "medium",
        },
        {
          id: 65,
          date: "2025-01-28",
          ngoName: "Helping Hands",
          issue: "Incorrect storage temperature",
          status: "resolved",
          severity: "medium",
        },
        {
          id: 43,
          date: "2025-01-10",
          ngoName: "Food for All",
          issue: "Unhygienic packaging",
          status: "resolved",
          severity: "high",
        },
        {
          id: 22,
          date: "2024-12-05",
          ngoName: "Community Helpers",
          issue: "Contaminated food items",
          status: "resolved",
          severity: "critical",
        },
      ],
      donationHistory: [
        {
          id: 3201,
          date: "2025-03-05",
          items: "Mixed vegetables, bread",
          quantity: "15 kg",
          status: "accepted",
        },
        {
          id: 3152,
          date: "2025-03-01",
          items: "Dairy products, pastries",
          quantity: "8 kg",
          status: "reported",
          issue: "Expired dairy products",
        },
        {
          id: 3087,
          date: "2025-02-22",
          items: "Canned goods, pasta",
          quantity: "12 kg",
          status: "accepted",
        },
        {
          id: 3001,
          date: "2025-02-15",
          items: "Fresh vegetables, fruits",
          quantity: "10 kg",
          status: "reported",
          issue: "Spoiled vegetables",
        },
      ],
    },
    {
      id: 2,
      name: "Green Grocers Co-op",
      totalDonations: 68,
      totalReports: 2,
      reportRatio: 2.9,
      lastReported: "2025-02-28",
      status: "monitored",
      qualityRatings: [
        { rating: 5, count: 30 },
        { rating: 4, count: 25 },
        { rating: 3, count: 10 },
        { rating: 2, count: 2 },
        { rating: 1, count: 1 },
      ],
      donationStatus: {
        completed: 62,
        expired: 2,
        pending: 4,
      },
      reports: [
        {
          id: 98,
          date: "2025-02-28",
          ngoName: "Helping Hands",
          issue: "Moldy bread products",
          status: "resolved",
          severity: "medium",
        },
        {
          id: 54,
          date: "2025-01-12",
          ngoName: "Food Relief",
          issue: "Insect infestation in grains",
          status: "resolved",
          severity: "high",
        },
      ],
      donationHistory: [
        {
          id: 3245,
          date: "2025-03-07",
          items: "Fresh fruits, breads",
          quantity: "22 kg",
          status: "accepted",
        },
        {
          id: 3198,
          date: "2025-02-28",
          items: "Bakery products, grains",
          quantity: "15 kg",
          status: "reported",
          issue: "Moldy bread products",
        },
        {
          id: 3156,
          date: "2025-02-21",
          items: "Fresh produce",
          quantity: "18 kg",
          status: "accepted",
        },
      ],
    },
    {
      id: 3,
      name: "City Supermarket",
      totalDonations: 105,
      totalReports: 8,
      reportRatio: 7.6,
      lastReported: "2025-03-04",
      status: "suspended",
      qualityRatings: [
        { rating: 5, count: 20 },
        { rating: 4, count: 35 },
        { rating: 3, count: 32 },
        { rating: 2, count: 12 },
        { rating: 1, count: 6 },
      ],
      donationStatus: {
        completed: 85,
        expired: 10,
        pending: 10,
      },
      reports: [
        {
          id: 105,
          date: "2025-03-04",
          ngoName: "Food for All",
          issue: "Contaminated meat products",
          status: "pending",
          severity: "critical",
        },
        {
          id: 99,
          date: "2025-02-25",
          ngoName: "Community Helpers",
          issue: "Unhygienic packaging",
          status: "resolved",
          severity: "medium",
        },
        {
          id: 92,
          date: "2025-02-18",
          ngoName: "Helping Hands",
          issue: "Chemical contamination",
          status: "resolved",
          severity: "critical",
        },
      ],
      donationHistory: [
        {
          id: 3250,
          date: "2025-03-04",
          items: "Mixed grocery items",
          quantity: "25 kg",
          status: "reported",
          issue: "Contaminated meat products",
        },
        {
          id: 3210,
          date: "2025-02-25",
          items: "Canned goods, packaged foods",
          quantity: "30 kg",
          status: "reported",
          issue: "Unhygienic packaging",
        },
        {
          id: 3175,
          date: "2025-02-18",
          items: "Fresh produce, dairy",
          quantity: "28 kg",
          status: "reported",
          issue: "Chemical contamination",
        },
      ],
    },
  ];

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

  const filteredDonors = donorsWithReports.filter((donor) => {
    const matchesSearch = donor.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || donor.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const tabs = [
    { id: "reported-donors", name: "Reported Donors" },
    { id: "donor-details", name: "Donor Details", disabled: !selectedDonor },
  ];

  return (
    <div className="min-h-screen bg-white-300">
      <Sidebar
        isMobile={isMobile}
        showMobileSidebar={showMobileSidebar}
        onCloseSidebar={() => setShowMobileSidebar(false)}
      />

      <main className="lg:pl-72">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            {isMobile && (
              <button
                onClick={() => setShowMobileSidebar(true)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Food Quality Reports
              </h1>
              <p className="text-sm text-gray-500">
                Track and manage food quality issues reported by NGOs
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm mb-0">
            <div className="border-b border-gray-100 px-4">
              <nav className="flex -mb-px">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      if (!tab.disabled) {
                        setActiveTab(tab.id);
                      }
                    }}
                    disabled={tab.disabled}
                    className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? "border-teal-500 text-teal-600"
                        : tab.disabled
                        ? "border-transparent text-gray-300 cursor-not-allowed"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {activeTab === "reported-donors" && (
            <>
              <FadeIn delay={200}>
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex flex-col md:flex-row justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 md:mb-0">
                      Donors with Quality Reports
                    </h3>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Donor
                          </th>

                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Total Reports
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Report Ratio
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Last Reported
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredDonors.map((donor) => (
                          <tr
                            key={donor.id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="text-sm font-medium text-gray-900">
                                  {donor.name}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {donor.totalReports} / {donor.totalDonations}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span
                                className={
                                  donor.reportRatio > 10
                                    ? "text-red-600 font-medium"
                                    : donor.reportRatio > 5
                                    ? "text-orange-600 font-medium"
                                    : "text-gray-500"
                                }
                              >
                                {donor.reportRatio.toFixed(1)}%
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(
                                donor.lastReported
                              ).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => {
                                  setSelectedDonor(donor);
                                  setActiveTab("donor-details");
                                }}
                                className="text-teal-600 hover:text-teal-900 flex items-center gap-1"
                              >
                                <Eye className="h-4 w-4" />
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                        {filteredDonors.length === 0 && (
                          <tr>
                            <td
                              colSpan="6"
                              className="px-6 py-12 text-center text-gray-500"
                            >
                              No donors match your filters
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </FadeIn>
            </>
          )}

          {activeTab === "donor-details" && selectedDonor && (
            <DonorDetails donor={selectedDonor} />
          )}
        </div>
      </main>
    </div>
  );
};

export default DonorReportsTrackingPage;
