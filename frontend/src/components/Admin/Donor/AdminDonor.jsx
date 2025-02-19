import React from "react";
import { useState, useEffect } from "react";
import { Menu, Eye, ArrowUpDown } from "lucide-react";
import Sidebar from "../AdminSidebar";
import { useNavigate } from "react-router-dom";

const AdminDonor = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

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

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await fetch("http://localhost:3000/admin/alldonor", {
          withCredential: true,
        });
        if (!response.ok) {
          throw new Error("Failed to fetch donors");
        }
        const data = await response.json();
        if (data.success) {
          setDonors(data.data);
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedDonors = [...donors].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setDonors(sortedDonors);
  };

  const handleRowClick = (donorId) => {
    navigate(`/admin-donor-detail`);
  };

  const SortButton = ({ column }) => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleSort(column);
      }}
      className="inline-flex items-center hover:text-emerald-600"
    >
      <ArrowUpDown className="ml-1 h-4 w-4" />
    </button>
  );

  const DonorCard = ({ donor }) => (
    <div
      className="bg-white p-4 rounded-lg shadow mb-4 cursor-pointer hover:bg-gray-50"
      onClick={() => handleRowClick(donor.id)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-medium text-gray-900">{donor.name}</h3>
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
          {donor.donorType}
        </span>
      </div>
      <div className="space-y-2 text-sm text-gray-500">
        <p className="flex justify-between">
          <span className="font-medium">Donations:</span> {donor.donations}
        </p>
        <p className="flex justify-between">
          <span className="font-medium">Contact:</span> {donor.phone}
        </p>
        <p className="flex justify-between">
          <span className="font-medium">Email:</span> {donor.email}
        </p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
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
            <h1 className="text-2xl font-bold text-gray-800">Donors List</h1>
          </div>

          {/* Mobile View */}
          <div className="block md:hidden">
            {donors.map((donor) => (
              <DonorCard key={donor.id} donor={donor} />
            ))}
          </div>

          {/* Desktop View */}
          <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Donor Name <SortButton column="name" />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type <SortButton column="type" />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Donations <SortButton column="donations" />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {donors.map((donor) => (
                    <tr
                      key={donor.id}
                      className="hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                      onClick={() => handleRowClick(donor.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {donor.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                          {donor.donorType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {donor.donations}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {donor.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {donor.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Eye className="h-5 w-5 text-emerald-600 hover:text-emerald-700" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDonor;
