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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setProfile((prev) => ({
      ...prev,
      photo: file ? URL.createObjectURL(file) : null,
    }));
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
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
        <div className="flex items-center gap-4 p-4">
          <button
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 h-40">
              <button
                onClick={toggleEditMode}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
              >
                {isEditing ? (
                  <Save className="w-5 h-5 text-white" />
                ) : (
                  <Edit className="w-5 h-5 text-white" />
                )}
              </button>
            </div>

            <div className="p-6 -mt-16">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src={profile.photo || "/api/placeholder/120/120"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-white object-cover"
                  />
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-green-500 p-2 rounded-full cursor-pointer">
                      <Upload className="w-4 h-4 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                    </label>
                  )}
                </div>

                <div className="mt-6 w-full grid md:grid-cols-2 gap-4">
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
                    { icon: Building, name: "city", label: "City", type: "text" },
                    { icon: Building, name: "state", label: "State", type: "text" },
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
                    <div key={name} className="flex flex-col">
                      <div className="flex items-center space-x-3 mb-2">
                        <Icon className="w-5 h-5 text-green-500" />
                        <label className="text-sm font-medium text-gray-600">
                          {label}
                        </label>
                      </div>
                      {isEditing ? (
                        type === "select" ? (
                          <select
                            name={name}
                            value={profile[name]}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                          >
                            <option value="">Select Donor Type</option>
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
                            className="w-full p-2 border rounded"
                          />
                        )
                      ) : (
                        <p className="text-gray-700">
                          {profile[name] || `Enter ${label}`}
                        </p>
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
