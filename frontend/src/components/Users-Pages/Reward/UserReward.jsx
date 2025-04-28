import React, { useState, useEffect } from "react";
import Sidebar from "../UserSidebar/UserSidebar";
import {
  Award,
  Download,
  Share2,
  Gift,
  Trophy,
  Menu,
  Clock,
  Star,
  FileBadge,
  X,
  Camera,
} from "lucide-react";
import axios from "axios";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";

const UserReward = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [activeTab, setActiveTab] = useState("certificate");
  const [error, setError] = useState(null);
  const [userRewards, setUserRewards] = useState({
    name: "",
    totalPoints: 0,
    totalDonations: 0,
    certificatesEarned: 0,
    pointsToNextCertificate: 40,
  });
  const [userId, setUserId] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const fetchUserRewardData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/donors/food-status-counts",
          {
            withCredentials: true,
          }
        );

        if (response.data.success) {
          const { pieData } = response.data;

          const completedCount =
            pieData.find((item) => item.name === "Completed")?.value || 0;

          const userResponse = await axios.get(
            "http://localhost:3000/api/donors/getDonorDetails",
            {
              withCredentials: true,
            }
          );

          if (userResponse.data.success) {
            const userData = userResponse.data.donor;
            setUserId(userData.id);

            const totalPoints = completedCount >= 1 ? completedCount * 10 : 0;
            const certificatesEarned = Math.floor(totalPoints / 100);
            const pointsToNextCertificate = 100 - (totalPoints % 100);

            setUserRewards({
              name: userData.name || "Food Donor",
              totalPoints,
              totalDonations: completedCount,
              certificatesEarned,
              pointsToNextCertificate: Math.max(0, pointsToNextCertificate),
            });
          }
        }
      } catch (error) {
        setError("Failed to fetch Reward");
      } finally {
        setTimeout(() => {
          setLoading(false);
          setTimeout(() => {
            setFadeIn(true);
          }, 100);
        }, 800);
      }
    };

    fetchUserRewardData();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const downloadCertificate = async () => {
    try {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);

      if (!userId) {
        console.error("User ID not available");
        return;
      }

      window.open(
        `http://localhost:3000/api/donors/download-certificate/${userId}`
      );

      showToastNotification("Certificate downloaded successfully!");
    } catch (error) {
      console.error("Error downloading certificate:", error);
      showToastNotification(
        "Failed to download certificate. Please try again."
      );
    }
  };

  const captureAndShare = () => {
    // This would typically use html2canvas or similar
    showToastNotification("Certificate image captured and ready to share!");
    setShowShareModal(true);
  };

  const showToastNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const getFadeClass = (index = 0) => {
    const baseClass = "transition-all duration-700 ease-in-out";
    if (!fadeIn) {
      return `${baseClass} opacity-0 translate-y-4`;
    }
    return `${baseClass} opacity-100 translate-y-0 delay-${index * 100}`;
  };

  const Confetti = () => {
    if (!showConfetti) return null;

    return (
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-confetti"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-5%`,
              animationDelay: `${Math.random() * 3}s`,
              backgroundColor: ["#61cf73", "#ffcc00", "#ff6b6b", "#4dabf7"][
                Math.floor(Math.random() * 4)
              ],
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
            }}
          ></div>
        ))}
      </div>
    );
  };

  const ShareModal = () => {
    if (!showShareModal) return null;

    const shareUrl = "https://foodshare.org/certificate/" + userId;
    const shareTitle = `I've donated ${userRewards.totalDonations} meals and earned ${userRewards.totalPoints} points with FoodShare!`;
    const shareHashtags = ["FoodDonation", "EndHunger", "Community"];
    const shareDescription = `Join me in making a difference. Every donation counts! ${
      userRewards.certificatesEarned > 0
        ? "I've earned " +
          userRewards.certificatesEarned +
          " certificates so far!"
        : ""
    }`;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl w-full max-w-lg mx-4 overflow-hidden shadow-2xl transform transition-all animate-scaleIn">
          <div className="relative">
            <div className="bg-gradient-to-r from-[#61cf73]/10 to-[#4dabf7]/10 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  Share Your Achievement
                </h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              <p className="text-gray-600">
                Let your network know about your contribution to ending hunger!
              </p>
            </div>

            <div className="p-6 flex flex-col space-y-6">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-4 relative">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#61cf73]/10 p-3 rounded-full">
                    <Award className="h-8 w-8 text-[#61cf73]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Certificate Preview
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {userRewards.name} has donated{" "}
                      {userRewards.totalDonations} meals
                    </p>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">
                        {userRewards.totalPoints} Points Earned
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Share to Social Media
                </label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  <TwitterShareButton
                    url={shareUrl}
                    title={shareTitle}
                    hashtags={shareHashtags}
                    className="hover:scale-105 transition-transform focus:outline-none"
                    onShareWindowClose={() =>
                      showToastNotification("Shared to Twitter!")
                    }
                  >
                    <div className="flex flex-col items-center">
                      <div className="bg-blue-50 p-2 rounded-full mb-1">
                        <TwitterIcon size={32} round />
                      </div>
                      <span className="text-xs text-gray-600">Twitter</span>
                    </div>
                  </TwitterShareButton>

                  <FacebookShareButton
                    url={shareUrl}
                    quote={shareTitle}
                    hashtag={`#${shareHashtags[0]}`}
                    className="hover:scale-105 transition-transform focus:outline-none"
                    onShareWindowClose={() =>
                      showToastNotification("Shared to Facebook!")
                    }
                  >
                    <div className="flex flex-col items-center">
                      <div className="bg-blue-50 p-2 rounded-full mb-1">
                        <FacebookIcon size={32} round />
                      </div>
                      <span className="text-xs text-gray-600">Facebook</span>
                    </div>
                  </FacebookShareButton>

                  <WhatsappShareButton
                    url={shareUrl}
                    title={shareTitle}
                    className="hover:scale-105 transition-transform focus:outline-none"
                    onShareWindowClose={() =>
                      showToastNotification("Shared to WhatsApp!")
                    }
                  >
                    <div className="flex flex-col items-center">
                      <div className="bg-green-50 p-2 rounded-full mb-1">
                        <WhatsappIcon size={32} round />
                      </div>
                      <span className="text-xs text-gray-600">WhatsApp</span>
                    </div>
                  </WhatsappShareButton>

                  <LinkedinShareButton
                    url={shareUrl}
                    title="My Food Donation Achievement"
                    summary={shareTitle}
                    source="FoodShare"
                    className="hover:scale-105 transition-transform focus:outline-none"
                    onShareWindowClose={() =>
                      showToastNotification("Shared to LinkedIn!")
                    }
                  >
                    <div className="flex flex-col items-center">
                      <div className="bg-blue-50 p-2 rounded-full mb-1">
                        <LinkedinIcon size={32} round />
                      </div>
                      <span className="text-xs text-gray-600">LinkedIn</span>
                    </div>
                  </LinkedinShareButton>

                  <TelegramShareButton
                    url={shareUrl}
                    title={shareTitle}
                    className="hover:scale-105 transition-transform focus:outline-none"
                    onShareWindowClose={() =>
                      showToastNotification("Shared to Telegram!")
                    }
                  >
                    <div className="flex flex-col items-center">
                      <div className="bg-blue-50 p-2 rounded-full mb-1">
                        <TelegramIcon size={32} round />
                      </div>
                      <span className="text-xs text-gray-600">Telegram</span>
                    </div>
                  </TelegramShareButton>

                  <EmailShareButton
                    url={shareUrl}
                    subject="My Food Donation Achievement"
                    body={`${shareTitle}\n\n${shareDescription}\n\n`}
                    className="hover:scale-105 transition-transform focus:outline-none"
                    onShareWindowClose={() =>
                      showToastNotification("Email created!")
                    }
                  >
                    <div className="flex flex-col items-center">
                      <div className="bg-gray-50 p-2 rounded-full mb-1">
                        <EmailIcon size={32} round />
                      </div>
                      <span className="text-xs text-gray-600">Email</span>
                    </div>
                  </EmailShareButton>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Message (Optional)
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61cf73]/50 focus:border-transparent"
                  rows="2"
                  placeholder="Add a personal message..."
                  defaultValue={shareDescription}
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3 pt-3">
                <button
                  onClick={() => setShowShareModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    showToastNotification("Custom message saved!");
                    setShowShareModal(false);
                  }}
                  className="px-4 py-2 bg-[#61cf73] text-white rounded-lg shadow hover:bg-[#61cf73]/90 transition-colors"
                >
                  Update & Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Toast = () => {
    if (!showToast) return null;

    return (
      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg animate-fadeInUp z-50">
        <div className="flex items-center space-x-2">
          <div className="bg-white bg-opacity-20 p-1 rounded-full">
            <Award className="h-4 w-4" />
          </div>
          <span>{toastMessage}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {showConfetti && <Confetti />}
      <ShareModal />
      <Toast />

      <div className="fixed inset-y-0 left-0 z-40">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        <main className="p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {error ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center text-red-600 shadow-sm">
                <p>{error}</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className={`lg:col-span-2 ${getFadeClass(1)}`}>
                    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200">
                      <div className="border-b border-gray-100">
                        <div className="flex">
                          <button
                            onClick={() => setActiveTab("certificate")}
                            className={`px-6 py-4 font-medium flex items-center space-x-2 transition-colors ${
                              activeTab === "certificate"
                                ? "border-b-2 border-[#61cf73] text-[#61cf73] bg-[#61cf73]/5"
                                : "text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            <FileBadge className="w-5 h-5" />
                            <span>Certificate</span>
                          </button>
                        </div>
                      </div>

                      {activeTab === "certificate" && (
                        <div className="p-6">
                          <div
                            id="certificate"
                            className="bg-white border border-gray-200 rounded-lg p-8 relative hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01]"
                          >
                            <div className="absolute inset-0 bg-[url('/api/placeholder/400/400')] bg-contain bg-center bg-no-repeat opacity-5"></div>
                            <div className="absolute -left-1 -top-1 w-16 h-16">
                              <div className="absolute w-full h-full bg-[#61cf73]/10 rounded-br-full"></div>
                              <div className="absolute w-8 h-8 bg-[#61cf73]/20 rounded-br-full"></div>
                            </div>
                            <div className="absolute -right-1 -bottom-1 w-16 h-16">
                              <div className="absolute w-full h-full bg-[#61cf73]/10 rounded-tl-full"></div>
                              <div className="absolute w-8 h-8 bg-[#61cf73]/20 rounded-tl-full"></div>
                            </div>

                            <div className="text-center relative">
                              <div className="mb-6">
                                <div className="relative inline-block">
                                  <div className="absolute inset-0 rounded-full bg-[#61cf73]/10 animate-ping"></div>
                                  <Award className="h-16 w-16 text-[#61cf73] mx-auto transform hover:rotate-12 transition-transform duration-300" />
                                </div>
                              </div>

                              <div className="border-b border-dashed border-gray-200 pb-4 mb-4">
                                <h3 className="text-2xl font-bold text-gray-800 mb-1">
                                  Certificate of Achievement
                                </h3>
                                <p className="text-gray-500 text-sm">
                                  This is to certify that
                                </p>
                              </div>

                              <p className="text-3xl font-semibold text-gray-900 mb-4 font-serif">
                                {userRewards.name}
                              </p>

                              <p className="text-gray-600 mb-4">
                                has successfully completed
                              </p>

                              <div className="flex justify-center items-center mb-4">
                                <span className="text-5xl font-bold bg-gradient-to-r from-[#61cf73] to-[#61cf73] bg-clip-text text-transparent">
                                  {userRewards.totalDonations}
                                </span>
                                <span className="text-xl text-gray-700 ml-2">
                                  Donations
                                </span>
                              </div>

                              <p className="text-gray-600 mb-4">
                                and has earned
                              </p>

                              <div className="flex justify-center items-center mb-6">
                                <div className="relative">
                                  <div className="absolute inset-0 text-yellow-400 animate-ping opacity-30">
                                    <Star className="h-6 w-6" />
                                  </div>
                                  <Star className="h-6 w-6 text-yellow-500 mr-2" />
                                </div>
                                <span className="text-3xl font-bold text-gray-800">
                                  {userRewards.totalPoints} Points
                                </span>
                              </div>

                              <div className="mt-3 mb-4">
                                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                  Certificates Earned:{" "}
                                  {userRewards.certificatesEarned}
                                </span>
                              </div>

                              {userRewards.certificatesEarned > 0 && (
                                <div className="absolute -right-2 -top-2 transform rotate-12 bg-[#61cf73] text-white px-3 py-1 rounded-md text-xs font-bold shadow-md">
                                  VERIFIED
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-wrap justify-between items-center mt-6 gap-3">
                            <div className="flex space-x-3">
                              <button
                                onClick={downloadCertificate}
                                className={`px-4 py-2.5 bg-[#61cf73] text-white rounded-lg flex items-center shadow-sm hover:bg-[#61cf73]/90 transition-all hover:shadow-md transform hover:-translate-y-1 duration-300 ${
                                  userRewards.certificatesEarned < 1
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                                }`}
                                disabled={userRewards.certificatesEarned < 1}
                              >
                                <Download className="h-5 w-5 mr-2" />
                                <span>Download Certificate</span>
                              </button>

                              <button
                                onClick={captureAndShare}
                                className="px-4 py-2.5 bg-blue-500 text-white rounded-lg flex items-center shadow-sm hover:bg-blue-600 transition-all hover:shadow-md transform hover:-translate-y-1 duration-300"
                              >
                                <Share2 className="h-5 w-5 mr-2" />
                                <span>Share</span>
                              </button>
                            </div>

                            <div className="text-gray-500 text-sm italic flex items-center">
                              <Camera className="h-4 w-4 mr-1 opacity-60" />
                              <span>
                                Share your achievement with your network
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div
                      className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 ${getFadeClass(
                        2
                      )}`}
                    >
                      <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white p-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-[#61cf73]/10 rounded-lg">
                            <Trophy className="w-5 h-5 text-[#61cf73]" />
                          </div>
                          <h2 className="text-lg font-semibold text-gray-900">
                            Your Progress
                          </h2>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="mb-6">
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-600">
                              Next Certificate
                            </span>
                            <span className="text-gray-600 font-medium">
                              {userRewards.totalPoints % 100}/100 points
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-[#61cf73] to-[#61cf73]/70 h-3 rounded-full transition-all duration-1000 ease-out relative"
                              style={{
                                width: fadeIn
                                  ? `${Math.min(
                                      ((userRewards.totalPoints % 100) / 100) *
                                        100,
                                      100
                                    )}%`
                                  : "0%",
                              }}
                            >
                              {fadeIn &&
                                (userRewards.totalPoints % 100) / 100 > 0.1 && (
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white text-xs font-bold drop-shadow-md">
                                      {Math.round(
                                        ((userRewards.totalPoints % 100) /
                                          100) *
                                          100
                                      )}
                                      %
                                    </span>
                                  </div>
                                )}
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mt-2">
                            {userRewards.pointsToNextCertificate > 0
                              ? `${userRewards.pointsToNextCertificate} more points needed for next certificate`
                              : "You've earned a certificate! Download it now."}
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="flex items-center">
                              <Clock className="w-5 h-5 text-[#61cf73] mr-3" />
                              <span className="text-gray-700 font-medium">
                                Current Points
                              </span>
                            </div>
                            <span className="font-bold text-gray-800 text-lg">
                              {userRewards.totalPoints}
                            </span>
                          </div>

                          <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="flex items-center">
                              <Gift className="w-5 h-5 text-[#61cf73] mr-3" />
                              <span className="text-gray-700 font-medium">
                                Total Donations
                              </span>
                            </div>
                            <span className="font-bold text-gray-800 text-lg">
                              {userRewards.totalDonations}
                            </span>
                          </div>

                          <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="flex items-center">
                              <Award className="w-5 h-5 text-[#61cf73] mr-3" />
                              <span className="text-gray-700 font-medium">
                                Certificates
                              </span>
                            </div>
                            <span className="font-bold text-gray-800 text-lg">
                              {userRewards.certificatesEarned}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserReward;
