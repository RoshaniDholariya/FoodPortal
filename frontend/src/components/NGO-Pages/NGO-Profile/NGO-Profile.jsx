// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Edit2,
//   Save,
//   X,
//   Building2,
//   Mail,
//   Phone,
//   Clock,
//   MapPin,
//   Menu,
//   Globe2,
//   ChevronRight,
// } from "lucide-react";
// import Sidebar from "../NGOsidebar";

// const EditableNGOProfile = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [profile, setProfile] = useState({
//     name: "",
//     address: "",
//     description:"",
//     email: "",
//     phoneNumber: "",
//     city: "",
//     pincode: "",
//     contactTime:"",
//   });

//   const [editedProfile, setEditedProfile] = useState(profile);
//   const [activeSection, setActiveSection] = useState(null);

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//   const handleEdit = () => {
//     setIsEditing(true);
//     setEditedProfile(profile);
//   };

//   // const handleSave = () => {
//   //   setProfile(editedProfile);
//   //   setIsEditing(false);
//   // };

//   const handleCancel = () => {
//     setIsEditing(false);
//     setEditedProfile(profile);
//   };

//   useEffect(() => {
//     axios.defaults.withCredentials = true;
//     const fetchNGOData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/ngo/getngoDetails",{
//           withCredentials:true,}
//         );
//         if (response.data.success) {
//           setProfile(response.data.ngo);
//         } else {
//           console.error("Failed to fetch Donor Data:", response.data.message);
//         }
//       } catch (err) {
//         console.error("Error fetching Donor Data:", err);
//       }
//     };

//     fetchNGOData();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditedProfile((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSave = async () => {
//     try {
//       // console.log("Edited Profile:", editedProfile);
//       // console.log("Profile:", profile);

//       const response = await axios.put("http://localhost:3000/api/ngo/updatengoDetails",editedProfile,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true, // Ensures cookies are sent
//         }
//       );
//       if (response.data.success) {
//         setIsEditing(false);
//         console.log("Profile updated successfully!");
//       } else {
//         console.error("Failed to update profile:", response.data.message);
//       }
//     } catch (err) {
//       console.error("Error updating profile:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-50">
//       <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
//           onClick={toggleSidebar}
//         />
//       )}

//       <div className="lg:ml-72 min-h-screen">
//         <div className="relative overflow-hidden">
//           <div className="absolute inset-0 backdrop-blur-xl" />
//           <div className="relative px-6 py-8">
//             <div className="max-w-7xl mx-auto">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   <button
//                     onClick={toggleSidebar}
//                     className="text-emerald-600 hover:text-emerald-700 lg:hidden"
//                   >
//                     <Menu className="h-6 w-6" />
//                   </button>
//                   <div className="flex items-center gap-3">
//                     <div className="relative">
//                       <div className="absolute inset-0 rounded-full animate-pulse" />
//                       <Globe2 className="h-10 w-10 text-emerald-600 relative" />
//                     </div>
//                     <div>
//                       <h1 className="text-2xl font-bold text-emerald-900">
//                         NGO Profile
//                       </h1>
//                       <p className="text-emerald-600 text-sm">
//                         Manage your organization details
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {!isEditing ? (
//                   <button
//                     onClick={handleEdit}
//                     className="group flex items-center px-3 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200 shadow-lg shadow-emerald-600/20"
//                   >
//                     <Edit2 className="w-4 h-4 mr-2" />
//                     <span>Edit Profile</span>
//                     <ChevronRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
//                   </button>
//                 ) : (
//                   <div className="flex gap-3">
//                     <button
//                       onClick={handleCancel}
//                       className="flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-lg hover:bg-white/90 transition-all duration-200"
//                     >
//                       <X className="w-4 h-4 mr-2" />
//                       <span>Cancel</span>
//                     </button>
//                     <button
//                       onClick={handleSave}
//                       className="group flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200 shadow-lg shadow-emerald-600/20"
//                     >
//                       <Save className="w-4 h-4 mr-2" />
//                       <span>Save Changes</span>
//                       <ChevronRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto px-6 py-2">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="space-y-8">
//               <div
//                 className="group bg-white/70 backdrop-blur-sm rounded-2xl border border-emerald-100 overflow-hidden hover:shadow-xl hover:shadow-emerald-600/10 transition-all duration-300"
//                 onMouseEnter={() => setActiveSection("org")}
//                 onMouseLeave={() => setActiveSection(null)}
//               >
//                 <div className="p-6">
//                   <div className="flex items-center gap-3 mb-6">
//                     <Building2 className="w-5 h-5 text-emerald-600" />
//                     <h2 className="text-lg font-semibold text-emerald-900">
//                       Organization Details
//                     </h2>
//                   </div>
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-emerald-700 mb-2">
//                         NGO Name
//                       </label>
//                       {isEditing ? (
//                         <input
//                           type="text"
//                           name="name"
//                           value={editedProfile.name}
//                           onChange={handleChange}
//                           className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white/50 transition-all duration-200"
//                         />
//                       ) : (
//                         <div className="px-4 py-3 bg-emerald-50/50 rounded-lg border border-emerald-100 text-emerald-900">
//                           {profile.name}
//                         </div>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-emerald-700 mb-2">
//                         Description
//                       </label>
//                       {isEditing ? (
//                         <textarea
//                           name="description"
//                           value={editedProfile.description}
//                           onChange={handleChange}
//                           rows={4}
//                           className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white/50 transition-all duration-200"
//                         />
//                       ) : (
//                         <div className="px-4 py-3 bg-emerald-50/50 rounded-lg border border-emerald-100 text-emerald-900">
//                           {profile.description}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div
//                 className="group bg-white/70 backdrop-blur-sm rounded-2xl border border-emerald-100 overflow-hidden hover:shadow-xl hover:shadow-emerald-600/10 transition-all duration-300"
//                 onMouseEnter={() => setActiveSection("contact")}
//                 onMouseLeave={() => setActiveSection(null)}
//               >
//                 <div className="p-6">
//                   <div className="flex items-center gap-3 mb-6">
//                     <Mail className="w-5 h-5 text-emerald-600" />
//                     <h2 className="text-lg font-semibold text-emerald-900">
//                       Contact Information
//                     </h2>
//                   </div>
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-emerald-700 mb-2">
//                         Email
//                       </label>
//                       {isEditing ? (
//                         <input
//                           type="email"
//                           name="email"
//                           value={editedProfile.email}
//                           onChange={handleChange}
//                           className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white/50 transition-all duration-200"
//                         />
//                       ) : (
//                         <div className="px-4 py-3 bg-emerald-50/50 rounded-lg border border-emerald-100 text-emerald-900">
//                           {profile.email}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-8">
//               <div
//                 className="group bg-white/70 backdrop-blur-sm rounded-2xl border border-emerald-100 overflow-hidden hover:shadow-xl hover:shadow-emerald-600/10 transition-all duration-300"
//                 onMouseEnter={() => setActiveSection("phoneNumber")}
//                 onMouseLeave={() => setActiveSection(null)}
//               >
//                 <div className="p-6">
//                   <div className="flex items-center gap-3 mb-6">
//                     <Phone className="w-5 h-5 text-emerald-600" />
//                     <h2 className="text-lg font-semibold text-emerald-900">
//                       Phone Details
//                     </h2>
//                   </div>
//                   <div className="space-y-4">
//                     {isEditing ? (
//                       <>
//                         <input
//                           type="text"
//                           name="phoneNumber"
//                           value={editedProfile.phoneNumber}
//                           onChange={handleChange}
//                           className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white/50 transition-all duration-200"
//                         />
//                         <input
//                           type="text"
//                           name="contactTime"
//                           value={editedProfile.contactTime}
//                           onChange={handleChange}
//                           className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white/50 transition-all duration-200"
//                         />
//                       </>
//                     ) : (
//                       <div className="space-y-3">
//                         <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50/50 rounded-lg border border-emerald-100 text-emerald-900">
//                           <Phone className="w-4 h-4 text-emerald-600" />
//                           {profile.phoneNumber}
//                         </div>
//                         <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50/50 rounded-lg border border-emerald-100 text-emerald-900">
//                           <Clock className="w-4 h-4 text-emerald-600" />
//                           {profile.contactTime}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div
//                 className="group bg-white/70 backdrop-blur-sm rounded-2xl border border-emerald-100 overflow-hidden hover:shadow-xl hover:shadow-emerald-600/10 transition-all duration-300"
//                 onMouseEnter={() => setActiveSection("location")}
//                 onMouseLeave={() => setActiveSection(null)}
//               >
//                 <div className="p-6">
//                   <div className="flex items-center gap-3 mb-6">
//                     <MapPin className="w-5 h-5 text-emerald-600" />
//                     <h2 className="text-lg font-semibold text-emerald-900">
//                       Location
//                     </h2>
//                   </div>
//                   <div className="space-y-4">
//                     {isEditing ? (
//                       <>
//                         <input
//                           type="text"
//                           name="address"
//                           value={editedProfile.address}
//                           onChange={handleChange}
//                           className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white/50 transition-all duration-200"
//                         />
//                         <div className="grid grid-cols-2 gap-4">
//                           <input
//                             type="text"
//                             name="city"
//                             value={editedProfile.city}
//                             onChange={handleChange}
//                             className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white/50 transition-all duration-200"
//                           />
//                           <input
//                             type="text"
//                             name="pincode"
//                             value={editedProfile.pincode}
//                             onChange={handleChange}
//                             className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white/50 transition-all duration-200"
//                           />
//                         </div>
//                       </>
//                     ) : (
//                       <div className="space-y-3">
//                         <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50/50 rounded-lg border border-emerald-100 text-emerald-900">
//                           <MapPin className="w-4 h-4 text-emerald-600" />
//                           {profile.address}
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                           <div className="px-4 py-3 bg-emerald-50/50 rounded-lg border border-emerald-100 text-emerald-900">
//                             {profile.city}
//                           </div>
//                           <div className="px-4 py-3 bg-emerald-50/50 rounded-lg border border-emerald-100 text-emerald-900">
//                             {profile.pincode}
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
//             <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
//             <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
//             <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const style = `
// @keyframes blob {
//   0% {
//     transform: translate(0px, 0px) scale(1);
//   }
//   33% {
//     transform: translate(30px, -50px) scale(1.1);
//   }
//   66% {
//     transform: translate(-20px, 20px) scale(0.9);
//   }
//   100% {
//     transform: translate(0px, 0px) scale(1);
//   }
// }

// .animation-delay-2000 {
//   animation-delay: 2s;
// }

// .animation-delay-4000 {
//   animation-delay: 4s;
// }

// .animate-blob {
//   animation: blob 7s infinite;
// }
// `;

// export default EditableNGOProfile;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Edit2,
  Save,
  X,
  Building2,
  Mail,
  Phone,
  Clock,
  MapPin,
  Menu,
  Globe2,
  ChevronRight,
  User,
} from "lucide-react";
import Sidebar from "../NGOsidebar";

const EditableNGOProfile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    address: "",
    description: "",
    email: "",
    phoneNumber: "",
    city: "",
    pincode: "",
    contactTime: "",
  });

  const [editedProfile, setEditedProfile] = useState(profile);
  const [activeSection, setActiveSection] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile);
  };

  useEffect(() => {
    axios.defaults.withCredentials = true;
    const fetchNGOData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/ngo/getngoDetails",
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          setProfile(response.data.ngo);
        } else {
          console.error("Failed to fetch NGO Data:", response.data.message);
        }
      } catch (err) {
        console.error("Error fetching NGO Data:", err);
      }
    };

    fetchNGOData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/ngo/updatengoDetails",
        editedProfile,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setIsEditing(false);
        setProfile(editedProfile);
        console.log("Profile updated successfully!");
      } else {
        console.error("Failed to update profile:", response.data.message);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div className="lg:ml-72 min-h-screen">
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-emerald-100">
          <div className="px-4 sm:px-6 py-4 sm:py-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-4">
                  <button
                    onClick={toggleSidebar}
                    className="text-emerald-600 hover:text-emerald-700 lg:hidden p-2"
                  >
                    <Menu className="h-6 w-6" />
                  </button>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <div className="relative hidden sm:block">
                      <div className="absolute inset-0 bg-emerald-100 rounded-2xl animate-pulse" />
                      <div className="relative bg-emerald-600 text-white p-3 rounded-2xl shadow-lg shadow-emerald-600/20">
                        <Globe2 className="h-6 w-6 sm:h-8 sm:w-8" />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <h1 className="text-lg sm:text-2xl font-bold text-emerald-900 truncate">
                        NGO Profile
                      </h1>
                      <p className="text-emerald-600 text-xs sm:text-sm truncate">
                        Manage your organization details
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0">
                  {!isEditing ? (
                    <button
                      onClick={handleEdit}
                      className="group flex items-center px-3 sm:px-4 py-2 sm:py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-200 shadow-lg shadow-emerald-600/20"
                    >
                      <Edit2 className="w-5 h-5" />
                      <span className="hidden sm:inline ml-2">
                        Edit Profile
                      </span>
                      <ChevronRight className="hidden sm:block w-5 h-5 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </button>
                  ) : (
                    <div className="flex gap-2 sm:gap-3">
                      <button
                        onClick={handleCancel}
                        className="flex items-center px-3 sm:px-6 py-2 sm:py-3 bg-white border border-emerald-200 rounded-xl hover:bg-emerald-50 transition-all duration-200"
                      >
                        <X className="w-5 h-5 text-emerald-600" />
                        <span className="hidden sm:inline ml-2 text-emerald-600">
                          Cancel
                        </span>
                      </button>
                      <button
                        onClick={handleSave}
                        className="group flex items-center px-3 sm:px-6 py-2 sm:py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-200 shadow-lg shadow-emerald-600/20"
                      >
                        <Save className="w-5 h-5" />
                        <span className="hidden sm:inline ml-2">
                          Save Changes
                        </span>
                        <ChevronRight className="hidden sm:block w-5 h-5 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div
                className={`group bg-white rounded-2xl border border-emerald-100 overflow-hidden transition-all duration-300 ${
                  activeSection === "org"
                    ? "shadow-xl shadow-emerald-600/10 scale-[1.02]"
                    : "hover:shadow-xl hover:shadow-emerald-600/10 hover:scale-[1.01]"
                }`}
                onMouseEnter={() => setActiveSection("org")}
                onMouseLeave={() => setActiveSection(null)}
              >
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-emerald-100 rounded-xl">
                      <Building2 className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-emerald-900">
                      Organization Details
                    </h2>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-emerald-700 mb-2">
                        NGO Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={editedProfile.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white transition-all duration-200"
                          placeholder="Enter NGO name"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-900">
                          {profile.name || "Not specified"}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-emerald-700 mb-2">
                        Description
                      </label>
                      {isEditing ? (
                        <textarea
                          name="description"
                          value={editedProfile.description}
                          onChange={handleChange}
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white transition-all duration-200"
                          placeholder="Describe your organization"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-900">
                          {profile.description || "No description available"}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`group bg-white rounded-2xl border border-emerald-100 overflow-hidden transition-all duration-300 ${
                  activeSection === "contact"
                    ? "shadow-xl shadow-emerald-600/10 scale-[1.02]"
                    : "hover:shadow-xl hover:shadow-emerald-600/10 hover:scale-[1.01]"
                }`}
                onMouseEnter={() => setActiveSection("contact")}
                onMouseLeave={() => setActiveSection(null)}
              >
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-emerald-100 rounded-xl">
                      <Mail className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-emerald-900">
                      Contact Information
                    </h2>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-2">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={editedProfile.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white transition-all duration-200"
                        placeholder="Enter email address"
                      />
                    ) : (
                      <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-900">
                        <Mail className="w-5 h-5 text-emerald-600" />
                        {profile.email || "No email provided"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div
                className={`group bg-white rounded-2xl border border-emerald-100 overflow-hidden transition-all duration-300 ${
                  activeSection === "phone"
                    ? "shadow-xl shadow-emerald-600/10 scale-[1.02]"
                    : "hover:shadow-xl hover:shadow-emerald-600/10 hover:scale-[1.01]"
                }`}
                onMouseEnter={() => setActiveSection("phone")}
                onMouseLeave={() => setActiveSection(null)}
              >
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-emerald-100 rounded-xl">
                      <Phone className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-emerald-900">
                      Phone Details
                    </h2>
                  </div>
                  <div className="space-y-6">
                    {isEditing ? (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-emerald-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            name="phoneNumber"
                            value={editedProfile.phoneNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white transition-all duration-200"
                            placeholder="Enter phone number"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-emerald-700 mb-2">
                            Contact Hours
                          </label>
                          <input
                            type="text"
                            name="contactTime"
                            value={editedProfile.contactTime}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white transition-all duration-200"
                            placeholder="e.g., 9 AM - 5 PM"
                          />
                        </div>
                      </>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-900">
                          <Phone className="w-5 h-5 text-emerald-600" />
                          {profile.phoneNumber || "No phone number provided"}
                        </div>
                        <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-900">
                          <Clock className="w-5 h-5 text-emerald-600" />
                          {profile.contactTime || "No contact hours specified"}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div
                className={`group bg-white rounded-2xl border border-emerald-100 overflow-hidden transition-all duration-300 ${
                  activeSection === "location"
                    ? "shadow-xl shadow-emerald-600/10 scale-[1.02]"
                    : "hover:shadow-xl hover:shadow-emerald-600/10 hover:scale-[1.01]"
                }`}
                onMouseEnter={() => setActiveSection("location")}
                onMouseLeave={() => setActiveSection(null)}
              >
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-emerald-100 rounded-xl">
                      <MapPin className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-emerald-900">
                      Location Details
                    </h2>
                  </div>
                  <div className="space-y-6">
                    {isEditing ? (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-emerald-700 mb-2">
                            Address
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={editedProfile.address}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white transition-all duration-200"
                            placeholder="Enter full address"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-emerald-700 mb-2">
                              City
                            </label>
                            <input
                              type="text"
                              name="city"
                              value={editedProfile.city}
                              onChange={handleChange}
                              className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white transition-all duration-200"
                              placeholder="Enter city"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-emerald-700 mb-2">
                              Pincode
                            </label>
                            <input
                              type="text"
                              name="pincode"
                              value={editedProfile.pincode}
                              onChange={handleChange}
                              className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white transition-all duration-200"
                              placeholder="Enter pincode"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-900">
                          <MapPin className="w-5 h-5 text-emerald-600" />
                          {profile.address || "No address provided"}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-900">
                            <Building2 className="w-5 h-5 text-emerald-600" />
                            {profile.city || "No city specified"}
                          </div>
                          <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-900">
                            <MapPin className="w-5 h-5 text-emerald-600" />
                            {profile.pincode || "No pincode provided"}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
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

export default EditableNGOProfile;
