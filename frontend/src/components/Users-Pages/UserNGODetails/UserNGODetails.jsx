import React, { useState, useEffect } from "react";
import { Menu, MapPin, Phone, Mail, Clock } from "lucide-react";
import Sidebar from "../UserSidebar/UserSidebar";
import axios from "axios";

const NGODetails = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchNGOs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/donors/approved-ngos",
          {
            withCredentials: true,
          }
        );
        setNgos(response.data.ngos);
      } catch (err) {
        setError("Failed to fetch NGOs");
      } finally {
        setLoading(false);
      }
    };

    fetchNGOs();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="fixed inset-y-0 left-0 z-50">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      <div className={`${isSidebarOpen ? "lg:ml-64" : ""}`}>
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="lg:hidden text-gray-500 hover:text-gray-700 m-4"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>

          {loading ? (
            <p>Loading NGOs...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : ngos.length === 0 ? (
            <p>No approved NGOs found.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6 p-6">
              {ngos.map((ngo) => (
                <div
                  key={ngo.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    {ngo.name}
                  </h3>
                  <div className="text-gray-500 text-sm flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-2" />
                    {ngo.city}, {ngo.pincode}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4 border-t pt-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      {ngo.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      {ngo.phoneNumber}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      Mon-Sat: 9:00 AM - 6:00 PM
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NGODetails;
