// import React, { useState, useEffect } from "react";
// import {
//   User,
//   MapPin,
//   Phone,
//   Building2,
//   Building,
//   Edit,
//   Save,
//   Upload,
//   Menu,
// } from "lucide-react";
// import Sidebar from "../UserSidebar/UserSidebar";

// const DonorProfileEdit = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [profile, setProfile] = useState({
//     name: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//     phone: "",
//     donorType: "",
//     restaurantName: "",
//     photo: null,
//   });

//   useEffect(() => {
//     setIsSidebarOpen(window.innerWidth >= 1024);
//     const handleResize = () => setIsSidebarOpen(window.innerWidth >= 1024);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handlePhotoUpload = (e) => {
//     const file = e.target.files[0];
//     setProfile((prev) => ({
//       ...prev,
//       photo: file ? URL.createObjectURL(file) : null,
//     }));
//   };

//   const toggleEditMode = () => {
//     setIsEditing(!isEditing);
//   };

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       <div className="fixed inset-y-0 left-0 z-50">
//         <Sidebar
//           isSidebarOpen={isSidebarOpen}
//           setIsSidebarOpen={setIsSidebarOpen}
//         />
//       </div>
//       <div className={`flex-1 ${isSidebarOpen ? "lg:ml-64" : ""}`}>
//         <div className="flex items-center gap-4 p-4">
//           <button
//             onClick={() => setIsSidebarOpen((prev) => !prev)}
//             className="lg:hidden text-gray-500 hover:text-gray-700"
//           >
//             <Menu className="h-6 w-6" />
//           </button>
//         </div>

//         <div className="p-6 max-w-7xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//             <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 h-40">
//               <button
//                 onClick={toggleEditMode}
//                 className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
//               >
//                 {isEditing ? (
//                   <Save className="w-5 h-5 text-white" />
//                 ) : (
//                   <Edit className="w-5 h-5 text-white" />
//                 )}
//               </button>
//             </div>

//             <div className="p-6 -mt-16">
//               <div className="flex flex-col items-center">
//                 <div className="relative">
//                   <img
//                     src={profile.photo || "/api/placeholder/120/120"}
//                     alt="Profile"
//                     className="w-32 h-32 rounded-full border-4 border-white object-cover"
//                   />
//                   {isEditing && (
//                     <label className="absolute bottom-0 right-0 bg-green-500 p-2 rounded-full cursor-pointer">
//                       <Upload className="w-4 h-4 text-white" />
//                       <input
//                         type="file"
//                         accept="image/*"
//                         className="hidden"
//                         onChange={handlePhotoUpload}
//                       />
//                     </label>
//                   )}
//                 </div>

//                 <div className="mt-6 w-full grid md:grid-cols-2 gap-4">
//                   {[
//                     {
//                       icon: User,
//                       name: "name",
//                       label: "Full Name",
//                       type: "text",
//                     },
//                     {
//                       icon: Building2,
//                       name: "restaurantName",
//                       label: "Restaurant Name",
//                       type: "text",
//                     },
//                     {
//                       icon: MapPin,
//                       name: "address",
//                       label: "Address",
//                       type: "text",
//                     },
//                     { icon: Building, name: "city", label: "City", type: "text" },
//                     { icon: Building, name: "state", label: "State", type: "text" },
//                     {
//                       icon: MapPin,
//                       name: "pincode",
//                       label: "Pincode",
//                       type: "text",
//                     },
//                     {
//                       icon: Phone,
//                       name: "phone",
//                       label: "Phone Number",
//                       type: "tel",
//                     },
//                     {
//                       icon: Building2,
//                       name: "donorType",
//                       label: "Donor Type",
//                       type: "select",
//                     },
//                   ].map(({ icon: Icon, name, label, type }) => (
//                     <div key={name} className="flex flex-col">
//                       <div className="flex items-center space-x-3 mb-2">
//                         <Icon className="w-5 h-5 text-green-500" />
//                         <label className="text-sm font-medium text-gray-600">
//                           {label}
//                         </label>
//                       </div>
//                       {isEditing ? (
//                         type === "select" ? (
//                           <select
//                             name={name}
//                             value={profile[name]}
//                             onChange={handleInputChange}
//                             className="w-full p-2 border rounded"
//                           >
//                             <option value="">Select Donor Type</option>
//                             <option value="restaurant">Restaurant</option>
//                             <option value="individual">Individual</option>
//                             <option value="corporate">Corporate</option>
//                           </select>
//                         ) : (
//                           <input
//                             type={type}
//                             name={name}
//                             value={profile[name]}
//                             onChange={handleInputChange}
//                             placeholder={`Enter ${label}`}
//                             className="w-full p-2 border rounded"
//                           />
//                         )
//                       ) : (
//                         <p className="text-gray-700">
//                           {profile[name] || `Enter ${label}`}
//                         </p>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DonorProfileEdit;
import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  User,
  MapPin,
  Phone,
  Building2,
  Building,
  Edit,
  Save,
  Upload,
  Menu,
} from "lucide-react";
import Sidebar from "../UserSidebar/UserSidebar";

const DonorProfileEdit = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    donorType: "",
    restaurantName: "",
    photo: null,
  });

  useEffect(() => {
        setIsSidebarOpen(window.innerWidth >= 1024);
        const handleResize = () => setIsSidebarOpen(window.innerWidth >= 1024);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);
    
      useEffect(() => {
        axios.defaults.withCredentials = true;
        const fetchDonorData = async () => {
          try {
            const response = await axios.get("http://localhost:3000/api/donors/getDonorDetails");
            if (response.data.success) {
              setProfile(response.data.donor);
            } else {
              console.error("Failed to fetch Donor Data:", response.data.message);
            }
          } catch (err) {
            console.error("Error fetching Donor Data:", err);
          }
        };
    
        fetchDonorData();
      }, []);
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
      };
    
      const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        setProfile((prev) => ({
          ...prev,
          photo: file ? URL.createObjectURL(file) : null,
        }));
      };
    
      const handleSave = async () => {
        try {
          const response = await axios.put("http://localhost:3000/api/donors/updateDonorDetails", profile);
          if (response.data.success) {
            setIsEditing(false);
            console.log("Profile updated successfully!");
          } else {
            console.error("Failed to update profile:", response.data.message);
          }
        } catch (err) {
          console.error("Error updating profile:", err);
        }
      };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="fixed inset-y-0 left-0 z-50">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      <div className={`flex-1 ${isSidebarOpen ? "lg:ml-64" : ""}`}>
        {" "}
        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="lg:hidden text-gray-500 hover:text-gray-700"
          aria-label="Open sidebar"
        >
          <Menu className="h-6 w-6 m-5" />
        </button>
        <div className="p-10 mt-5">
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/3 bg-gradient-to-br from-green-400 via-emerald-500 to-green-600">
                <div className="p-8 h-full flex flex-col items-center justify-center relative">
                  <div className="relative group">
                    <div className="w-48 h-48 rounded-2xl overflow-hidden ring-4 ring-white/50 shadow-xl transform transition-transform duration-300 hover:scale-105">
                      <img
                        src={profile.photo || "/api/placeholder/192/192"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {isEditing && (
                      <label className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl cursor-pointer shadow-lg transform transition-transform duration-300 hover:scale-110">
                        <Upload className="w-5 h-5 text-green-600" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handlePhotoUpload}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:w-2/3 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Profile Details
                  </h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-xl transition-colors duration-200"
                  >
                    {isEditing ? (
                      <Save className="w-5 h-5" />
                    ) : (
                      <Edit className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: User,
                      name: "name",
                      label: "Full Name",
                      type: "text",
                    },
                    {
                      icon: Building2,
                      name: "restaurantName",
                      label: "Restaurant Name",
                      type: "text",
                    },
                    {
                      icon: MapPin,
                      name: "address",
                      label: "Address",
                      type: "text",
                    },
                    {
                      icon: Building,
                      name: "city",
                      label: "City",
                      type: "text",
                    },
                    {
                      icon: Building,
                      name: "state",
                      label: "State",
                      type: "text",
                    },
                    {
                      icon: MapPin,
                      name: "pincode",
                      label: "Pincode",
                      type: "text",
                    },
                    {
                      icon: Phone,
                      name: "phone",
                      label: "Phone Number",
                      type: "tel",
                    },
                    {
                      icon: Building2,
                      name: "donorType",
                      label: "Donor Type",
                      type: "select",
                    },
                  ].map(({ icon: Icon, name, label, type }) => (
                    <div key={name} className="relative group">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="p-1.5 bg-green-50 rounded-lg">
                          <Icon className="w-4 h-4 text-green-600" />
                        </div>
                        <label className="text-sm font-medium text-gray-700">
                          {label}
                        </label>
                      </div>
                      {isEditing ? (
                        type === "select" ? (
                          <select
                            name={name}
                            value={profile[name]}
                            onChange={handleInputChange}
                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                          >
                            <option value="">Select Type</option>
                            <option value="restaurant">Restaurant</option>
                            <option value="individual">Individual</option>
                            <option value="corporate">Corporate</option>
                          </select>
                        ) : (
                          <input
                            type={type}
                            name={name}
                            value={profile[name]}
                            onChange={handleInputChange}
                            placeholder={`Enter ${label}`}
                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                          />
                        )
                      ) : (
                        <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                          <p className="text-gray-700">
                            {profile[name] || `Enter ${label}`}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorProfileEdit;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   User,
//   MapPin,
//   Phone,
//   Building2,
//   Building,
//   Edit,
//   Save,
//   Upload,
//   Menu,
// } from "lucide-react";
// import Sidebar from "../UserSidebar/UserSidebar";

// const DonorProfileEdit = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [profile, setProfile] = useState({
//     name: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//     phone: "",
//     donorType: "",
//     restaurantName: "",
//     photo: null,
//   });

//   useEffect(() => {
//     setIsSidebarOpen(window.innerWidth >= 1024);
//     const handleResize = () => setIsSidebarOpen(window.innerWidth >= 1024);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     axios.defaults.withCredentials = true;
//     const fetchDonorData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/donors/getDonorDetails");
//         if (response.data.success) {
//           setProfile(response.data.donor);
//         } else {
//           console.error("Failed to fetch Donor Data:", response.data.message);
//         }
//       } catch (err) {
//         console.error("Error fetching Donor Data:", err);
//       }
//     };

//     fetchDonorData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((prev) => ({ ...prev, [name]: value }));
//   };

//   const handlePhotoUpload = (e) => {
//     const file = e.target.files[0];
//     setProfile((prev) => ({
//       ...prev,
//       photo: file ? URL.createObjectURL(file) : null,
//     }));
//   };

//   const handleSave = async () => {
//     try {
//       const response = await axios.put("http://localhost:3000/api/donors/updateDonorDetails", profile);
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
//     <div className="min-h-screen flex bg-gray-50">
//       <div className="fixed inset-y-0 left-0 z-50">
//         <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
//       </div>

//       <div className={`flex-1 ${isSidebarOpen ? "lg:ml-64" : ""}`}>
//         <button onClick={() => setIsSidebarOpen((prev) => !prev)} className="lg:hidden text-gray-500 hover:text-gray-700">
//           <Menu className="h-6 w-6 m-5" />
//         </button>
//         <div className="p-10 mt-5">
//           <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
//             <div className="flex flex-col lg:flex-row">
//               <div className="lg:w-1/3 bg-gradient-to-br from-green-400 via-emerald-500 to-green-600">
//                 <div className="p-8 h-full flex flex-col items-center justify-center relative">
//                   <div className="relative group">
//                     <div className="w-48 h-48 rounded-2xl overflow-hidden ring-4 ring-white/50 shadow-xl">
//                       <img src={profile.photo || "/placeholder.jpg"} alt="Profile" className="w-full h-full object-cover" />
//                     </div>
//                     {isEditing && (
//                       <label className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl cursor-pointer shadow-lg">
//                         <Upload className="w-5 h-5 text-green-600" />
//                         <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
//                       </label>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div className="lg:w-2/3 p-6">
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-2xl font-bold text-gray-800">Profile Details</h2>
//                   <button onClick={isEditing ? handleSave : () => setIsEditing(true)} className="bg-green-500 text-white p-2 rounded-xl">
//                     {isEditing ? <Save className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {["name", "restaurantName", "address", "city", "state", "pincode", "phone", "donorType"].map((field) => (
//                     <div key={field} className="relative group">
//                       <label className="text-sm font-medium text-gray-700">{field.replace(/([A-Z])/g, " $1").trim()}</label>
//                       <input
//                         type="text"
//                         name={field}
//                         value={profile[field] || ""}
//                         onChange={handleInputChange}
//                         className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl"
//                         disabled={!isEditing}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DonorProfileEdit;
