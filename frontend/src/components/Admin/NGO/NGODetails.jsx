import React, { useState, useEffect } from "react";
import { ArrowLeft, Eye, FileText, Check, X, Menu } from "lucide-react";
import Sidebar from "../AdminSidebar";

const NGODetailsPage = () => {
  const [selectedNGO, setSelectedNGO] = useState(null);
  const [actionTaken, setActionTaken] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

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

  const ngos = [
    {
      id: 1,
      name: "Care Foundation",
      email: "care@example.com",
      phoneNumber: "+91 9876543210",
      city: "Mumbai",
      pincode: "400001",
      address: "123 Main Street, Mumbai",
      certificate: "care-foundation.pdf",
      status: "pending",
    },
    {
      id: 2,
      name: "Hope Trust",
      email: "hope@example.com",
      phoneNumber: "+91 9876543211",
      city: "Delhi",
      pincode: "110001",
      address: "456 Park Road, Delhi",
      certificate: "hope-trust.pdf",
      status: "pending",
    },
  ];

  const handleAction = (ngoId, action) => {
    setActionTaken((prev) => ({
      ...prev,
      [ngoId]: action,
    }));
  };

  const NGOTable = () => (
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
          </div>

          <div className="rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
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
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {ngos.map((ngo) => (
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
                            {actionTaken[ngo.id] ? (
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  actionTaken[ngo.id] === "accepted"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {actionTaken[ngo.id].charAt(0).toUpperCase() +
                                  actionTaken[ngo.id].slice(1)}
                              </span>
                            ) : (
                              <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700">
                                Pending
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center">
                            <button
                              onClick={() => setSelectedNGO(ngo)}
                              className="text-teal-600 hover:text-teal-700"
                            >
                              <Eye className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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
          <div className="flex items-center space-x-4">
            {isMobile && (
              <button
                onClick={() => setShowMobileSidebar(true)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}
          </div>
          <div className="bg-white rounded-xl shadow-sm">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <button
                onClick={() => setSelectedNGO(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>

              {!actionTaken[ngo.id] && (
                <div className="flex space-x-3 w-full sm:w-auto">
                  <button
                    onClick={() => handleAction(ngo.id, "accepted")}
                    className="flex-1 sm:flex-none px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center justify-center space-x-2"
                    disabled={actionTaken[ngo.id]}
                  >
                    <Check className="h-4 w-4" />
                    <span>Accept</span>
                  </button>
                  <button
                    onClick={() => handleAction(ngo.id, "rejected")}
                    className="flex-1 sm:flex-none px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center space-x-2"
                    disabled={actionTaken[ngo.id]}
                  >
                    <X className="h-4 w-4" />
                    <span>Reject</span>
                  </button>
                </div>
              )}
            </div>
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-4">
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
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-4">
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

              <div className="mt-6 sm:mt-8">
                <h3 className="text-sm font-medium text-gray-500 mb-4">
                  Documents
                </h3>
                <div className="border border-gray-200 rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <FileText className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {ngo.certificate}
                      </p>
                      <p className="text-xs text-gray-500">NGO Certificate</p>
                    </div>
                  </div>
                  <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-teal-600 hover:text-teal-700 text-center">
                    View PDF
                  </button>
                </div>
              </div>
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
