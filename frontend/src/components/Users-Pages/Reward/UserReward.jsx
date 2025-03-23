// import React, { useState, useEffect } from "react";
// import Sidebar from "../UserSidebar/UserSidebar";
// import {
//   Award,
//   Download,
//   Share2,
//   Gift,
//   Trophy,
//   Menu,
//   Clock,
//   Star,
//   FileBadge,
//   Shield,
//   Target,
//   ChevronRight,
//   Medal,
// } from "lucide-react";
// import axios from "axios";

// const UserReward = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [loading, setLoading] = useState(true);
//   const [fadeIn, setFadeIn] = useState(false);
//   const [activeTab, setActiveTab] = useState("certificate");
//   const [userRewards, setUserRewards] = useState({
//     name: "",
//     totalPoints: 0,
//     totalDonations: 0,
//     certificatesEarned: 0,
//     pointsToNextCertificate: 40,
//   });
//   const [userId, setUserId] = useState(null);
//   const [showConfetti, setShowConfetti] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsSidebarOpen(window.innerWidth >= 1024);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);

//     const fetchUserRewardData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/api/donors/food-status-counts",
//           {
//             withCredentials: true,
//           }
//         );

//         if (response.data.success) {
//           const { pieData } = response.data;

//           const completedCount =
//             pieData.find((item) => item.name === "Completed")?.value || 0;

//           const userResponse = await axios.get(
//             "http://localhost:3000/api/donors/getDonorDetails",
//             {
//               withCredentials: true,
//             }
//           );

//           if (userResponse.data.success) {
//             const userData = userResponse.data.donor;
//             setUserId(userData.id);

//             const totalPoints = completedCount >= 1 ? completedCount * 10 : 0;
//             const certificatesEarned = Math.floor(totalPoints / 40);
//             const pointsToNextCertificate = 40 - (totalPoints % 40);

//             setUserRewards({
//               name: userData.name || "Food Donor",
//               totalPoints,
//               totalDonations: completedCount,
//               certificatesEarned,
//               pointsToNextCertificate: Math.max(0, pointsToNextCertificate),
//             });
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching user reward data:", error);
//       } finally {
//         setTimeout(() => {
//           setLoading(false);
//           setTimeout(() => {
//             setFadeIn(true);
//           }, 100);
//         }, 800);
//       }
//     };

//     fetchUserRewardData();

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const downloadCertificate = async () => {
//     try {
//       setShowConfetti(true);
//       setTimeout(() => setShowConfetti(false), 3000);

//       if (!userId) {
//         console.error("User ID not available");
//         return;
//       }

//       const response = await axios.get(
//         `http://localhost:3000/api/donors/download-certificate/${userId}`,
//         {
//           responseType: "blob",
//           withCredentials: true,
//         }
//       );

//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "donation_certificate.pdf");
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (error) {
//       console.error("Error downloading certificate:", error);
//     }
//   };

//   const getFadeClass = (index = 0) => {
//     const baseClass = "transition-all duration-700 ease-in-out";
//     if (!fadeIn) {
//       return `${baseClass} opacity-0 translate-y-4`;
//     }
//     return `${baseClass} opacity-100 translate-y-0 delay-${index * 100}`;
//   };

//   const Confetti = () => {
//     if (!showConfetti) return null;

//     return (
//       <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
//         {[...Array(100)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute animate-confetti"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `-5%`,
//               animationDelay: `${Math.random() * 3}s`,
//               backgroundColor: ["#61cf73", "#ffcc00", "#ff6b6b", "#4dabf7"][
//                 Math.floor(Math.random() * 4)
//               ],
//               width: `${Math.random() * 10 + 5}px`,
//               height: `${Math.random() * 10 + 5}px`,
//             }}
//           ></div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-white-50 flex">
//       {showConfetti && <Confetti />}

//       <div className="fixed inset-y-0 left-0 z-50">
//         <Sidebar
//           isSidebarOpen={isSidebarOpen}
//           setIsSidebarOpen={setIsSidebarOpen}
//         />
//       </div>

//       <div className={`flex-1 ${isSidebarOpen ? "lg:ml-64" : ""}`}>
//         <button
//           onClick={() => setIsSidebarOpen((prev) => !prev)}
//           className="lg:hidden text-gray-500 hover:text-gray-700 m-4 focus:outline-none focus:ring-2 focus:ring-[#61cf73]/50 rounded"
//           aria-label="Toggle sidebar"
//         >
//           <Menu className="h-6 w-6" />
//         </button>

//         <main className="p-4 lg:p-8">
//           <div className="max-w-5xl mx-auto">
//             {loading ? (
//               <div className="flex flex-col justify-center items-center h-64">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#61cf73]"></div>
//                 <p className="mt-4 text-gray-500 animate-pulse">
//                   Loading your achievements...
//                 </p>
//               </div>
//             ) : (
//               <>
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                   <div className={`lg:col-span-2 ${getFadeClass(1)}`}>
//                     <div className="bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200">
//                       <div className="border-b border-gray-100">
//                         <div className="flex">
//                           <button
//                             onClick={() => setActiveTab("certificate")}
//                             className={`px-6 py-4 font-medium flex items-center space-x-2 transition-colors ${
//                               activeTab === "certificate"
//                                 ? "border-b-2 border-[#61cf73] text-[#61cf73]"
//                                 : "text-gray-600 hover:bg-gray-50"
//                             }`}
//                           >
//                             <FileBadge className="w-5 h-5" />
//                             <span>Certificate</span>
//                           </button>
//                           <button
//                             onClick={() => setActiveTab("badges")}
//                             className={`px-6 py-4 font-medium flex items-center space-x-2 transition-colors ${
//                               activeTab === "badges"
//                                 ? "border-b-2 border-[#61cf73] text-[#61cf73]"
//                                 : "text-gray-600 hover:bg-gray-50"
//                             }`}
//                           >
//                             <Medal className="w-5 h-5" />
//                             <span>Badges</span>
//                           </button>
//                         </div>
//                       </div>

//                       {activeTab === "certificate" && (
//                         <div className="p-6">
//                           <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-6 relative hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01]">
//                             <div className="absolute inset-0 opacity-5">
//                               <div className="w-full h-full bg-[url('/api/placeholder/400/400')] bg-contain bg-center bg-no-repeat opacity-50"></div>
//                             </div>

//                             <div className="text-center relative">
//                               <div className="mb-6">
//                                 <div className="relative inline-block">
//                                   <div className="absolute inset-0 rounded-full bg-[#61cf73]/10 animate-ping"></div>
//                                   <Award className="h-16 w-16 text-[#61cf73] mx-auto transform hover:rotate-12 transition-transform duration-300" />
//                                 </div>
//                               </div>

//                               <div className="border-b border-dashed border-gray-200 pb-4 mb-4">
//                                 <h3 className="text-2xl font-bold text-gray-800 mb-1">
//                                   Certificate of Achievement
//                                 </h3>
//                                 <p className="text-gray-500 text-sm">
//                                   This is to certify that
//                                 </p>
//                               </div>

//                               <p className="text-2xl font-semibold text-gray-900 mb-4 font-serif">
//                                 {userRewards.name}
//                               </p>

//                               <p className="text-gray-500 mb-4">
//                                 has successfully completed
//                               </p>

//                               <div className="flex justify-center items-center mb-4">
//                                 <span className="text-4xl font-bold text-[#61cf73]">
//                                   {userRewards.totalDonations}
//                                 </span>
//                                 <span className="text-xl text-gray-700 ml-2">
//                                   Donations
//                                 </span>
//                               </div>

//                               <p className="text-gray-500 mb-4">
//                                 and has earned
//                               </p>

//                               <div className="flex justify-center items-center mb-6">
//                                 <div className="relative">
//                                   <div className="absolute inset-0 text-yellow-400 animate-ping opacity-30">
//                                     <Star className="h-6 w-6" />
//                                   </div>
//                                   <Star className="h-6 w-6 text-yellow-500 mr-2" />
//                                 </div>
//                                 <span className="text-3xl font-bold text-gray-800">
//                                   {userRewards.totalPoints} Points
//                                 </span>
//                               </div>

//                               <div className="mt-3 mb-4">
//                                 <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//                                   Certificates Earned:{" "}
//                                   {userRewards.certificatesEarned}
//                                 </span>
//                               </div>

//                               {userRewards.certificatesEarned > 0 && (
//                                 <div className="absolute -right-2 -top-2 transform rotate-12 bg-[#61cf73] text-white px-3 py-1 rounded-md text-xs font-bold shadow-md">
//                                   VERIFIED
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                           <div className="flex justify-between mt-4">
//                             <button
//                               onClick={downloadCertificate}
//                               className={`px-4 py-2 bg-[#61cf73] text-white rounded-lg flex items-center shadow-sm hover:bg-[#61cf73]/90 transition-all hover:shadow-md transform hover:-translate-y-1 duration-300 ${
//                                 userRewards.certificatesEarned < 1
//                                   ? "opacity-50 cursor-not-allowed"
//                                   : ""
//                               }`}
//                               disabled={userRewards.certificatesEarned < 1}
//                             >
//                               <Download className="h-5 w-5 mr-2" />
//                               Download Certificate
//                             </button>
//                           </div>
//                         </div>
//                       )}

//                       {activeTab === "badges" && (
//                         <div className="p-6">
//                           <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                             <div
//                               className={`text-center p-4 border border-gray-200 rounded-lg ${
//                                 userRewards.totalDonations >= 1
//                                   ? "bg-gray-50"
//                                   : "bg-gray-100 opacity-50"
//                               }`}
//                             >
//                               <Gift
//                                 className={`mx-auto h-10 w-10 mb-2 ${
//                                   userRewards.totalDonations >= 1
//                                     ? "text-[#61cf73]"
//                                     : "text-gray-400"
//                                 }`}
//                               />
//                               <h4 className="font-semibold">First Donation</h4>
//                               <p className="text-xs text-gray-500">
//                                 1 donation
//                               </p>
//                             </div>
//                             <div
//                               className={`text-center p-4 border border-gray-200 rounded-lg ${
//                                 userRewards.totalDonations >= 5
//                                   ? "bg-gray-50"
//                                   : "bg-gray-100 opacity-50"
//                               }`}
//                             >
//                               <Trophy
//                                 className={`mx-auto h-10 w-10 mb-2 ${
//                                   userRewards.totalDonations >= 5
//                                     ? "text-[#61cf73]"
//                                     : "text-gray-400"
//                                 }`}
//                               />
//                               <h4 className="font-semibold">Regular Donor</h4>
//                               <p className="text-xs text-gray-500">
//                                 5 donations
//                               </p>
//                             </div>
//                             <div
//                               className={`text-center p-4 border border-gray-200 rounded-lg ${
//                                 userRewards.totalDonations >= 10
//                                   ? "bg-gray-50"
//                                   : "bg-gray-100 opacity-50"
//                               }`}
//                             >
//                               <Star
//                                 className={`mx-auto h-10 w-10 mb-2 ${
//                                   userRewards.totalDonations >= 10
//                                     ? "text-[#61cf73]"
//                                     : "text-gray-400"
//                                 }`}
//                               />
//                               <h4 className="font-semibold">Super Donor</h4>
//                               <p className="text-xs text-gray-500">
//                                 10 donations
//                               </p>
//                             </div>
//                             <div
//                               className={`text-center p-4 border border-gray-200 rounded-lg ${
//                                 userRewards.totalDonations >= 20
//                                   ? "bg-gray-50"
//                                   : "bg-gray-100 opacity-50"
//                               }`}
//                             >
//                               <Shield
//                                 className={`mx-auto h-10 w-10 mb-2 ${
//                                   userRewards.totalDonations >= 20
//                                     ? "text-[#61cf73]"
//                                     : "text-gray-400"
//                                 }`}
//                               />
//                               <h4 className="font-semibold">Hero Donor</h4>
//                               <p className="text-xs text-gray-500">
//                                 20 donations
//                               </p>
//                             </div>
//                             <div
//                               className={`text-center p-4 border border-gray-200 rounded-lg ${
//                                 userRewards.certificatesEarned >= 1
//                                   ? "bg-gray-50"
//                                   : "bg-gray-100 opacity-50"
//                               }`}
//                             >
//                               <Award
//                                 className={`mx-auto h-10 w-10 mb-2 ${
//                                   userRewards.certificatesEarned >= 1
//                                     ? "text-[#61cf73]"
//                                     : "text-gray-400"
//                                 }`}
//                               />
//                               <h4 className="font-semibold">Certified Donor</h4>
//                               <p className="text-xs text-gray-500">
//                                 1 certificate
//                               </p>
//                             </div>
//                             <div
//                               className={`text-center p-4 border border-gray-200 rounded-lg opacity-50 bg-gray-100`}
//                             >
//                               <Target className="mx-auto h-10 w-10 mb-2 text-gray-400" />
//                               <h4 className="font-semibold">Legendary</h4>
//                               <p className="text-xs text-gray-500">
//                                 50 donations
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <div className="space-y-6">
//                     <div
//                       className={`bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 ${getFadeClass(
//                         2
//                       )}`}
//                     >
//                       <div className="border-b border-gray-100 bg-gray-50 p-4">
//                         <div className="flex items-center space-x-3">
//                           <div className="p-2 bg-[#61cf73]/10 rounded-lg">
//                             <Trophy className="w-5 h-5 text-[#61cf73]" />
//                           </div>
//                           <h2 className="text-lg font-semibold text-gray-900">
//                             Your Progress
//                           </h2>
//                         </div>
//                       </div>

//                       <div className="p-6">
//                         <div className="mb-6">
//                           <div className="flex justify-between mb-2">
//                             <span className="text-gray-600">
//                               Next Certificate
//                             </span>
//                             <span className="text-gray-600 font-medium">
//                               {userRewards.totalPoints % 40}/40 points
//                             </span>
//                           </div>
//                           <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
//                             <div
//                               className="bg-[#61cf73] h-3 rounded-full transition-all duration-1000 ease-out relative"
//                               style={{
//                                 width: fadeIn
//                                   ? `${Math.min(
//                                       ((userRewards.totalPoints % 40) / 40) *
//                                         100,
//                                       100
//                                     )}%`
//                                   : "0%",
//                               }}
//                             >
//                               {fadeIn &&
//                                 (userRewards.totalPoints % 40) / 40 > 0.1 && (
//                                   <div className="absolute inset-0 flex items-center justify-center">
//                                     <span className="text-white text-xs font-bold drop-shadow-md">
//                                       {Math.round(
//                                         ((userRewards.totalPoints % 40) / 40) *
//                                           100
//                                       )}
//                                       %
//                                     </span>
//                                   </div>
//                                 )}
//                             </div>
//                           </div>
//                           <p className="text-sm text-gray-500 mt-2">
//                             {userRewards.pointsToNextCertificate > 0
//                               ? `${userRewards.pointsToNextCertificate} more points needed for next certificate`
//                               : "You've earned a certificate! Download it now."}
//                           </p>
//                         </div>

//                         <div className="space-y-4">
//                           <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
//                             <div className="flex items-center">
//                               <Clock className="w-5 h-5 text-[#61cf73] mr-3" />
//                               <span className="text-gray-700 font-medium">
//                                 Current Points
//                               </span>
//                             </div>
//                             <span className="font-bold text-gray-800 text-lg">
//                               {userRewards.totalPoints}
//                             </span>
//                           </div>

//                           <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
//                             <div className="flex items-center">
//                               <Gift className="w-5 h-5 text-[#61cf73] mr-3" />
//                               <span className="text-gray-700 font-medium">
//                                 Total Donations
//                               </span>
//                             </div>
//                             <span className="font-bold text-gray-800 text-lg">
//                               {userRewards.totalDonations}
//                             </span>
//                           </div>

//                           <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
//                             <div className="flex items-center">
//                               <Award className="w-5 h-5 text-[#61cf73] mr-3" />
//                               <span className="text-gray-700 font-medium">
//                                 Certificates
//                               </span>
//                             </div>
//                             <span className="font-bold text-gray-800 text-lg">
//                               {userRewards.certificatesEarned}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div
//                       className={`bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 ${getFadeClass(
//                         3
//                       )}`}
//                     >
//                       <div className="border-b border-gray-100 bg-gray-50 p-4">
//                         <div className="flex items-center space-x-3">
//                           <div className="p-2 bg-[#61cf73]/10 rounded-lg">
//                             <Target className="w-5 h-5 text-[#61cf73]" />
//                           </div>
//                           <h2 className="text-lg font-semibold text-gray-900">
//                             Points Milestone
//                           </h2>
//                         </div>
//                       </div>

//                       <div className="p-6">
//                         <div className="mb-6">
//                           <div className="flex justify-between mb-2">
//                             <span className="text-gray-600">
//                               Achievement Goal
//                             </span>
//                             <span className="text-gray-600 font-medium">
//                               {userRewards.totalPoints}/500 points
//                             </span>
//                           </div>
//                           <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
//                             <div
//                               className="bg-gradient-to-r from-[#61cf73] to-[#3eb055] h-3 rounded-full transition-all duration-1000 ease-out"
//                               style={{
//                                 width: fadeIn
//                                   ? `${Math.min(
//                                       (userRewards.totalPoints / 500) * 100,
//                                       100
//                                     )}%`
//                                   : "0%",
//                               }}
//                             ></div>
//                           </div>
//                           <p className="text-sm text-gray-500 mt-2">
//                             {500 - userRewards.totalPoints > 0
//                               ? `${
//                                   500 - userRewards.totalPoints
//                                 } more points to reach Master Donor status`
//                               : "Congratulations! You've reached Master Donor status!"}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <style jsx global>{`
//                   @keyframes confetti {
//                     0% {
//                       transform: translateY(0) rotate(0deg);
//                     }
//                     100% {
//                       transform: translateY(100vh) rotate(720deg);
//                     }
//                   }
//                   .animate-confetti {
//                     animation: confetti 5s ease-in-out forwards;
//                   }
//                 `}</style>
//               </>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default UserReward;

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
  Shield,
  Target,
  ChevronRight,
  Medal,
} from "lucide-react";
import axios from "axios";

const UserReward = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [activeTab, setActiveTab] = useState("certificate");
  const [userRewards, setUserRewards] = useState({
    name: "",
    totalPoints: 0,
    totalDonations: 0,
    certificatesEarned: 0,
    pointsToNextCertificate: 40,
  });
  const [userId, setUserId] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

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
        console.error("Error fetching user reward data:", error);
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

  const downloadCertificate = async () => {
    try {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);

      if (!userId) {
        console.error("User ID not available");
        return;
      }

      const response = await axios.get(
        `http://localhost:3000/api/donors/download-certificate/${userId}`,
        {
          responseType: "blob",
          withCredentials: true,
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "donation_certificate.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading certificate:", error);
    }
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

  // Badge configuration with dynamic information
  const badges = [
    {
      name: "First Donation",
      icon: Gift,
      threshold: 1,
      description: `${
        userRewards.totalDonations >= 1 ? userRewards.totalDonations : 0
      }/${1} donation${userRewards.totalDonations !== 1 ? "s" : ""}`,
      achieved: userRewards.totalDonations >= 1,
    },
    {
      name: "Regular Donor",
      icon: Trophy,
      threshold: 5,
      description: `${Math.min(userRewards.totalDonations, 5)}/${5} donations`,
      achieved: userRewards.totalDonations >= 5,
    },
    {
      name: "Super Donor",
      icon: Star,
      threshold: 10,
      description: `${Math.min(
        userRewards.totalDonations,
        10
      )}/${10} donations`,
      achieved: userRewards.totalDonations >= 10,
    },
    {
      name: "Hero Donor",
      icon: Shield,
      threshold: 20,
      description: `${Math.min(
        userRewards.totalDonations,
        20
      )}/${20} donations`,
      achieved: userRewards.totalDonations >= 20,
    },
    {
      name: "Certified Donor",
      icon: Award,
      threshold: 4, // 40 points = 4 donations
      description: `${userRewards.certificatesEarned}/${1} certificate${
        userRewards.certificatesEarned !== 1 ? "s" : ""
      }`,
      achieved: userRewards.certificatesEarned >= 1,
    },
    {
      name: "Legendary",
      icon: Target,
      threshold: 50,
      description: `${Math.min(
        userRewards.totalDonations,
        50
      )}/${50} donations`,
      achieved: userRewards.totalDonations >= 50,
    },
  ];

  return (
    <div className="min-h-screen bg-white-50 flex">
      {showConfetti && <Confetti />}

      <div className="fixed inset-y-0 left-0 z-50">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      <div className={`flex-1 ${isSidebarOpen ? "lg:ml-64" : ""}`}>
        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="lg:hidden text-gray-500 hover:text-gray-700 m-4 focus:outline-none focus:ring-2 focus:ring-[#61cf73]/50 rounded"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>

        <main className="p-4 lg:p-8">
          <div className="max-w-5xl mx-auto">
            {loading ? (
              <div className="flex flex-col justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#61cf73]"></div>
                <p className="mt-4 text-gray-500 animate-pulse">
                  Loading your achievements...
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className={`lg:col-span-2 ${getFadeClass(1)}`}>
                    <div className="bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200">
                      <div className="border-b border-gray-100">
                        <div className="flex">
                          <button
                            onClick={() => setActiveTab("certificate")}
                            className={`px-6 py-4 font-medium flex items-center space-x-2 transition-colors ${
                              activeTab === "certificate"
                                ? "border-b-2 border-[#61cf73] text-[#61cf73]"
                                : "text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            <FileBadge className="w-5 h-5" />
                            <span>Certificate</span>
                          </button>
                          <button
                            onClick={() => setActiveTab("badges")}
                            className={`px-6 py-4 font-medium flex items-center space-x-2 transition-colors ${
                              activeTab === "badges"
                                ? "border-b-2 border-[#61cf73] text-[#61cf73]"
                                : "text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            <Medal className="w-5 h-5" />
                            <span>Badges</span>
                          </button>
                        </div>
                      </div>

                      {activeTab === "certificate" && (
                        <div className="p-6">
                          <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-6 relative hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01]">
                            <div className="absolute inset-0 opacity-5">
                              <div className="w-full h-full bg-[url('/api/placeholder/400/400')] bg-contain bg-center bg-no-repeat opacity-50"></div>
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

                              <p className="text-2xl font-semibold text-gray-900 mb-4 font-serif">
                                {userRewards.name}
                              </p>

                              <p className="text-gray-500 mb-4">
                                has successfully completed
                              </p>

                              <div className="flex justify-center items-center mb-4">
                                <span className="text-4xl font-bold text-[#61cf73]">
                                  {userRewards.totalDonations}
                                </span>
                                <span className="text-xl text-gray-700 ml-2">
                                  Donations
                                </span>
                              </div>

                              <p className="text-gray-500 mb-4">
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
                          <div className="flex justify-between mt-4">
                            <button
                              onClick={downloadCertificate}
                              className={`px-4 py-2 bg-[#61cf73] text-white rounded-lg flex items-center shadow-sm hover:bg-[#61cf73]/90 transition-all hover:shadow-md transform hover:-translate-y-1 duration-300 ${
                                userRewards.certificatesEarned < 1
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                              disabled={userRewards.certificatesEarned < 1}
                            >
                              <Download className="h-5 w-5 mr-2" />
                              Download Certificate
                            </button>
                          </div>
                        </div>
                      )}

                      {activeTab === "badges" && (
                        <div className="p-6">
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {badges.map((badge, index) => (
                              <div
                                key={index}
                                className={`text-center p-4 border border-gray-200 rounded-lg ${
                                  badge.achieved
                                    ? "bg-gray-50"
                                    : "bg-gray-100 opacity-50"
                                }`}
                              >
                                <badge.icon
                                  className={`mx-auto h-10 w-10 mb-2 ${
                                    badge.achieved
                                      ? "text-[#61cf73]"
                                      : "text-gray-400"
                                  }`}
                                />
                                <h4 className="font-semibold">{badge.name}</h4>
                                <p className="text-xs text-gray-500">
                                  {badge.description}
                                </p>
                                {!badge.achieved && (
                                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                    <div
                                      className="bg-[#61cf73] h-2 rounded-full transition-all duration-1000 ease-out"
                                      style={{
                                        width: fadeIn
                                          ? `${Math.min(
                                              (userRewards.totalDonations /
                                                badge.threshold) *
                                                100,
                                              100
                                            )}%`
                                          : "0%",
                                      }}
                                    ></div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div
                      className={`bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 ${getFadeClass(
                        2
                      )}`}
                    >
                      <div className="border-b border-gray-100 bg-gray-50 p-4">
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
                              className="bg-[#61cf73] h-3 rounded-full transition-all duration-1000 ease-out relative"
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
                                (userRewards.totalPoints % 40) / 40 > 0.1 && (
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white text-xs font-bold drop-shadow-md">
                                      {Math.round(
                                        ((userRewards.totalPoints % 40) / 40) *
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

                    <div
                      className={`bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 ${getFadeClass(
                        3
                      )}`}
                    >
                      <div className="border-b border-gray-100 bg-gray-50 p-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-[#61cf73]/10 rounded-lg">
                            <Target className="w-5 h-5 text-[#61cf73]" />
                          </div>
                          <h2 className="text-lg font-semibold text-gray-900">
                            Points Milestone
                          </h2>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="mb-6">
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-600">
                              Achievement Goal
                            </span>
                            <span className="text-gray-600 font-medium">
                              {userRewards.totalPoints}/500 points
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-[#61cf73] to-[#3eb055] h-3 rounded-full transition-all duration-1000 ease-out"
                              style={{
                                width: fadeIn
                                  ? `${Math.min(
                                      (userRewards.totalPoints / 500) * 100,
                                      100
                                    )}%`
                                  : "0%",
                              }}
                            ></div>
                          </div>
                          <p className="text-sm text-gray-500 mt-2">
                            {500 - userRewards.totalPoints > 0
                              ? `${
                                  500 - userRewards.totalPoints
                                } more points to reach Master Donor status`
                              : "Congratulations! You've reached Master Donor status!"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <style jsx global>{`
                  @keyframes confetti {
                    0% {
                      transform: translateY(0) rotate(0deg);
                    }
                    100% {
                      transform: translateY(100vh) rotate(720deg);
                    }
                  }
                  .animate-confetti {
                    animation: confetti 5s ease-in-out forwards;
                  }
                `}</style>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserReward;
