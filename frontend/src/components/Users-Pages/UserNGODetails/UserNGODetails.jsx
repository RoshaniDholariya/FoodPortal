import React, { useState, useEffect } from "react";
import {
  Menu,
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe2,
  Building2,
  ChevronRight,
} from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="fixed inset-y-0 left-0 z-50">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64" : ""
        }`}
      >
        {/* Header Section */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-emerald-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setIsSidebarOpen((prev) => !prev)}
                className="lg:hidden p-2 text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 rounded-xl p-6 text-center text-red-600">
              <p>{error}</p>
            </div>
          ) : ngos.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 text-center">
              <Building2 className="h-12 w-12 mx-auto text-emerald-600 mb-4" />
              <p className="text-emerald-900 font-medium">
                No approved NGOs found.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ngos.map((ngo) => (
                <div
                  key={ngo.id}
                  className="group bg-white rounded-2xl border border-emerald-100 overflow-hidden hover:shadow-xl hover:shadow-emerald-600/10 hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-emerald-900 mb-2">
                      {ngo.name}
                    </h3>
                    <div className="flex items-center text-emerald-600 text-sm mb-4">
                      <MapPin className="w-4 h-4 mr-2 shrink-0" />
                      <span className="truncate">
                        {ngo.city}, {ngo.pincode}
                      </span>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-emerald-100">
                      <div className="flex items-center text-sm text-emerald-700">
                        <Mail className="w-4 h-4 mr-3 text-emerald-600 shrink-0" />
                        <span className="truncate">{ngo.email}</span>
                      </div>
                      <div className="flex items-center text-sm text-emerald-700">
                        <Phone className="w-4 h-4 mr-3 text-emerald-600 shrink-0" />
                        <span className="truncate">{ngo.phoneNumber}</span>
                      </div>
                      <div className="flex items-center text-sm text-emerald-700">
                        <Clock className="w-4 h-4 mr-3 text-emerald-600 shrink-0" />
                        <span className="truncate">
                          Mon-Sat: 9:00 AM - 6:00 PM
                        </span>
                      </div>
                    </div>

                    {/* <button className="mt-6 w-full group flex items-center justify-center gap-2 px-4 py-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-colors duration-200">
                      View Details
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </button> */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Animated background blobs */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-teal-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </div>
      </div>
    </div>
  );
};

// Animation styles
const style = `
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animate-blob {
  animation: blob 7s infinite;
}
`;

export default NGODetails;
