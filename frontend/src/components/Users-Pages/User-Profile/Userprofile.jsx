
import React, { useState, useEffect } from "react";
import axios from "axios";
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
        const response = await axios.get(
          "http://localhost:3000/api/donors/getDonorDetails"
        );
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
      const response = await axios.put(
        "http://localhost:3000/api/donors/updateDonorDetails",
        profile
      );
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
    <div className="min-h-screen flex bg-gray-100">
      <div className="fixed inset-y-0 left-0 z-50">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      <div className={`flex-1 ${isSidebarOpen ? "lg:ml-64" : ""}`}>
        <div className="p-4 lg:p-8">
          <button
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="lg:hidden text-gray-500 hover:text-gray-700 mb-4"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <div className="flex flex-col lg:flex-row">
              {/* Left Section - Photo */}
              <div className="lg:w-1/3 bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 p-8">
                <div className="h-full flex flex-col items-center justify-center space-y-6">
                  <div className="relative group">
                    <div className="w-48 h-48 rounded-full overflow-hidden ring-8 ring-white/30 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:ring-white/50">
                      <img
                        src={profile.photo || "/api/placeholder/192/192"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {isEditing && (
                      <label className="absolute bottom-2 right-2 bg-white p-3 rounded-full cursor-pointer shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl">
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
                  <h3 className="text-white text-xl font-semibold text-center">
                    {profile.name || "Your Name"}
                  </h3>
                  <p className="text-white/80 text-center">
                    {profile.donorType
                      ? profile.donorType.charAt(0).toUpperCase() +
                        profile.donorType.slice(1)
                      : "Donor Type"}
                  </p>
                </div>
              </div>

              {/* Right Section - Details */}
              <div className="lg:w-2/3 p-6 lg:p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
                    Profile Details
                  </h2>
                  <button
                    onClick={() => {
                      if (isEditing) {
                        handleSave();
                      }
                      setIsEditing(!isEditing);
                    }}
                    className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-200 ${
                      isEditing
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {isEditing ? (
                      <>
                        <Save className="w-5 h-5 text-white" />
                        <span className="text-white">Save</span>
                      </>
                    ) : (
                      <>
                        <Edit className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-600">Edit</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="p-2 bg-green-50 rounded-xl">
                          <Icon className="w-5 h-5 text-green-600" />
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
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
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
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                          />
                        )
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 transition-all duration-200 hover:bg-gray-100">
                          <p className="text-gray-700">
                            {profile[name] || `No ${label} provided`}
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
