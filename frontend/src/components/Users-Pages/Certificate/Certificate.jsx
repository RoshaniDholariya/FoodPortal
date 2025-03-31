import React, { useState, useEffect } from "react";
import Sidebar from "../UserSidebar/UserSidebar";
import {
  Award,
  Download,
  Share2,
  Menu,
  Clock,
  Eye,
  Calendar,
  FileBadge2,
  BadgeCheck,
  ArrowBigLeft,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Certificate = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    setTimeout(() => {
      setLoading(false);
      setTimeout(() => {
        setFadeIn(true);
      }, 100);
    }, 800);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pastCertificates = [
    {
      id: 1,
      title: "Silver Donor Achievement",
      date: "March 15, 2025",
      type: "Donation",
      donationCount: 10,
      points: 100,
      imageUrl: "/api/placeholder/400/400",
    },
    {
      id: 2,
      title: "First Month Milestone",
      date: "February 10, 2025",
      type: "Milestone",
      donationCount: 5,
      points: 50,
      imageUrl: "/api/placeholder/400/400",
    },
    {
      id: 3,
      title: "Welcome Certificate",
      date: "January 25, 2025",
      type: "Welcome",
      donationCount: 1,
      points: 10,
      imageUrl: "/api/placeholder/400/400",
    },
    {
      id: 4,
      title: "Special Event Participation",
      date: "March 5, 2025",
      type: "Event",
      donationCount: 3,
      points: 75,
      imageUrl: "/api/placeholder/400/400",
    },
  ];

  const getFadeClass = (index = 0) => {
    const baseClass = "transition-all duration-700 ease-in-out";
    if (!fadeIn) {
      return `${baseClass} opacity-0 translate-y-4`;
    }
    return `${baseClass} opacity-100 translate-y-0 delay-${index * 100}`;
  };

  const handleViewCertificate = (certificate) => {
    setSelectedCertificate(certificate);
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
    <div className="min-h-screen bg-white-50 flex">
      <div className="fixed inset-y-0 left-0 z-50">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      <div className={`flex-1 ${isSidebarOpen ? "lg:ml-64" : ""}`}>
        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="lg:hidden text-gray-500 hover:text-gray-700 m-4"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>

        <main className="p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {error ? (
              <div className="bg-red-50 rounded-xl p-6 text-center text-red-600">
                <p>{error}</p>
              </div>
            ) : (
              <>
                <div className={`${getFadeClass(0)}`}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        Your Certificates
                      </h1>
                      <p className="text-gray-500">
                        View and download your achievement certificates
                      </p>
                    </div>
                    {selectedCertificate ? (
                      <button
                        onClick={() => setSelectedCertificate(null)}
                        className="mt-4 md:mt-0 px-4 py-2 text-green-900 rounded-lg flex items-center shadow-sm "
                      >
                        <ArrowBigLeft></ArrowBigLeft>
                      </button>
                    ) : null}
                  </div>
                </div>

                {selectedCertificate ? (
                  <div className={`${getFadeClass(1)}`}>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                      <div className="border-b border-gray-100 bg-gray-50 p-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-[#61cf73]/10 rounded-lg">
                            <FileBadge2 className="w-5 h-5 text-[#61cf73]" />
                          </div>
                          <h2 className="text-lg font-semibold text-gray-900">
                            {selectedCertificate.title}
                          </h2>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-6 relative hover:shadow-inner transition-all duration-300">
                          <div className="absolute inset-0 opacity-5">
                            <div className="w-full h-full bg-[url('/api/placeholder/400/400')] bg-contain bg-center bg-no-repeat opacity-50"></div>
                          </div>

                          <div className="text-center relative">
                            <div className="mb-4">
                              <Award className="h-16 w-16 text-[#61cf73] mx-auto transform hover:scale-110 transition-transform duration-300" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-1">
                              Certificate of Achievement
                            </h3>
                            <p className="text-gray-500 text-sm mb-6">
                              This is to certify that
                            </p>

                            <p className="text-xl font-semibold text-gray-900 mb-4">
                              John Smith
                            </p>

                            <p className="text-gray-500 mb-4">
                              has successfully completed
                            </p>

                            <div className="flex justify-center items-center mb-4">
                              <span className="text-3xl font-bold text-[#61cf73]">
                                {selectedCertificate.donationCount}
                              </span>
                              <span className="text-xl text-gray-700 ml-2">
                                Donations
                              </span>
                            </div>

                            <p className="text-gray-500 mb-6">
                              and has earned the title of
                            </p>

                            <div className="flex justify-center items-center mb-6">
                              <BadgeCheck className="h-6 w-6 text-[#61cf73] mr-2" />
                              <span className="text-2xl font-bold text-gray-800">
                                {selectedCertificate.title}
                              </span>
                            </div>

                            <div className="flex justify-center items-center mb-4">
                              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                              <span className="text-gray-600">
                                {selectedCertificate.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mt-6">
                          <button className="px-4 py-2 bg-[#61cf73] text-white rounded-lg flex items-center justify-center shadow-sm hover:bg-[#61cf73]/90 transition-colors hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300">
                            <Download className="h-4 w-4 mr-2" />
                            Download Certificate
                          </button>
                          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300">
                            <Share2 className="h-4 w-4 mr-2" />
                            Share Certificate
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {pastCertificates.length > 0 ? (
                        pastCertificates.map((certificate, index) => (
                          <div
                            key={certificate.id}
                            className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${getFadeClass(
                              index + 2
                            )}`}
                            onClick={() => handleViewCertificate(certificate)}
                          >
                            <div className="h-40 overflow-hidden relative">
                              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent z-10"></div>
                              <div className="w-full h-full bg-[url('/api/placeholder/400/400')] bg-cover bg-center"></div>
                              <div className="absolute bottom-3 left-3 z-20">
                                <span className="px-2 py-1 bg-white/90 text-sm font-medium text-gray-800 rounded-md">
                                  {certificate.type}
                                </span>
                              </div>
                              <div className="absolute top-3 right-3 z-20">
                                <span className="flex items-center px-2 py-1 bg-[#61cf73]/90 text-sm font-medium text-white rounded-md">
                                  <Award className="h-3 w-3 mr-1" />
                                  {certificate.points} pts
                                </span>
                              </div>
                            </div>

                            <div className="p-4">
                              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                                {certificate.title}
                              </h3>

                              <div className="flex items-center text-gray-500 text-sm mb-3">
                                <Clock className="h-4 w-4 mr-1" />
                                {certificate.date}
                              </div>

                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">
                                  {certificate.donationCount} donations
                                </span>
                                <button className="flex items-center text-[#61cf73] hover:text-[#61cf73]/80 transition-colors text-sm font-medium">
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
                          <div className="text-center">
                            <FileBadge2 className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                            <h3 className="text-lg font-medium text-gray-700">
                              No certificates found
                            </h3>
                            <p className="text-gray-500">
                              Try changing your search or filter criteria
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Certificate;
