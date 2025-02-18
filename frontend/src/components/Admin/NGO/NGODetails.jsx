import React, { useState, useEffect } from "react";
import { ArrowLeft, Eye, FileText, Check, X, Menu } from "lucide-react";
import Sidebar from "../AdminSidebar";

const NGODetailsPage = () => {
  const [ngos, setNgos] = useState([]);
  const [selectedNGO, setSelectedNGO] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchNGOs();

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

  const fetchNGOs = async () => {
    try {
      const response = await fetch("http://localhost:3000/admin/allngo", {
        withCredential: true,
      });
      const data = await response.json();

      if (data.success) {
        setNgos(data.data);
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
        setNgos(
          ngos.map((ngo) =>
            ngo.id === ngoId
              ? { ...ngo, isRejected: false, isApproved: true }
              : ngo
          )
        );

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

  // const handleRejectNGO = async (ngoId) => {
  //   try {
  //     setIsSubmitting(true);
  //     const response = await fetch(
  //       `http://localhost:3000/admin/reject-ngo/${ngoId}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({}),
  //       }
  //     );

  //     const data = await response.json();

  //     if (data.success) {
  //       setNgos(
  //         ngos.map((ngo) =>
  //           ngo.id === ngoId
  //             ? { ...ngo, isRejected: true, isApproved: false }
  //             : ngo
  //         )
  //       );

  //       if (selectedNGO && selectedNGO.id === ngoId) {
  //         setSelectedNGO({
  //           ...selectedNGO,
  //           isRejected: true,
  //           isApproved: false,
  //         });
  //       }
  //     } else {
  //       setError(data.message);
  //     }
  //   } catch (err) {
  //     setError("Failed to reject NGO");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const NGOTable = () => (
    <div className="flex h-screen">
      <Sidebar
        isMobile={isMobile}
        showMobileSidebar={showMobileSidebar}
        onCloseSidebar={() => setShowMobileSidebar(false)}
      />

      <main className="flex-1 lg:pl-60 bg-gradient-to-b from-emerald-50 to-teal-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div className="text-red-600 text-center">{error}</div>
          ) : (
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
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                ngo.isApproved
                                  ? "bg-green-100 text-green-700"
                                  : ngo.isRejected
                                  ? "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {ngo.isApproved
                                ? "Approved"
                                : ngo.isRejected
                                ? "Rejected"
                                : "Pending"}
                            </span>
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
          <div className="bg-white rounded-xl shadow-sm">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <button
                onClick={() => setSelectedNGO(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>

              {!ngo.isApproved && !ngo.isRejected && (
                <div className="flex space-x-3 w-full sm:w-auto">
                  <button
                    onClick={() => handleApproveNGO(ngo.id)}
                    className="flex-1 sm:flex-none px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 flex items-center justify-center space-x-2"
                    disabled={isSubmitting}
                  >
                    <Check className="h-4 w-4" />
                    <span>{isSubmitting ? "Processing..." : "Accept"}</span>
                  </button>
                  <button
                    onClick={() => handleRejectNGO(ngo.id)}
                    className="flex-1 sm:flex-none px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center space-x-2"
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

              {ngo.certificate && (
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
