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
  User,
  FileText,
  Calendar,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";
import Sidebar from "../UserSidebar/UserSidebar";
import axios from "axios";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const NGODetails = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNgo, setSelectedNgo] = useState(null);
  const [view, setView] = useState("grid"); // grid or details

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

  const handleViewDetails = (ngo) => {
    setSelectedNgo(ngo);
    setView("details");
  };

  const handleBackToGrid = () => {
    setSelectedNgo(null);
    setView("grid");
  };

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
              Loading NGO data...
            </p>
          </div>
        </div>
      </div>
    );
  }

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
        <br />{" "}
        {view === "details" && (
          <button
            onClick={handleBackToGrid}
            className="flex items-center gap-2 px-4 py-2 text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <ChevronRight className="h-5 w-5 rotate-180" />
            Back to Directory
          </button>
        )}
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {error ? (
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
          ) : view === "grid" ? (
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
                          {ngo.contactTime || "Mon-Sat: 9:00 AM - 6:00 PM"}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleViewDetails(ngo)}
                      className="mt-6 w-full group flex items-center justify-center gap-2 px-4 py-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-colors duration-200"
                    >
                      View Details
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-emerald-100 overflow-hidden shadow-lg">
              <div className="p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-emerald-900 mb-2">
                      {selectedNgo.name}
                    </h2>
                    <div className="flex items-center text-emerald-600 text-sm mb-6">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span>{selectedNgo.address}</span>
                    </div>

                    {selectedNgo.description && (
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-emerald-800 mb-2">
                          About
                        </h3>
                        <p className="text-gray-700">
                          {selectedNgo.description}
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-emerald-800">
                          Contact Information
                        </h3>

                        <div className="flex items-center text-gray-700">
                          <Mail className="w-5 h-5 text-emerald-600 mr-3" />
                          <span>{selectedNgo.email}</span>
                        </div>

                        <div className="flex items-center text-gray-700">
                          <Phone className="w-5 h-5 text-emerald-600 mr-3" />
                          <span>{selectedNgo.phoneNumber}</span>
                        </div>

                        <div className="flex items-center text-gray-700">
                          <MapPin className="w-5 h-5 text-emerald-600 mr-3" />
                          <span>
                            {selectedNgo.city}, {selectedNgo.pincode}
                          </span>
                        </div>

                        <div className="flex items-center text-gray-700">
                          <Clock className="w-5 h-5 text-emerald-600 mr-3" />
                          <span>
                            {selectedNgo.contactTime ||
                              "Mon-Sat: 9:00 AM - 6:00 PM"}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-emerald-800">
                          Registration Details
                        </h3>

                        <div className="flex items-center text-gray-700">
                          <User className="w-5 h-5 text-emerald-600 mr-3" />
                          <span>Username: {selectedNgo.name || "N/A"}</span>
                        </div>

                        <div className="flex items-center text-gray-700">
                          <Calendar className="w-5 h-5 text-emerald-600 mr-3" />
                          <span>
                            Registered: {formatDate(selectedNgo.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default NGODetails;
