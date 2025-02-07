import React, { useState } from "react";
import {
  Mail,
  User,
  Phone,
  MapPin,
  Building2,
  Map,
  Home,
  Store,
  Image,
  Loader2,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const DonorRegistrationForm = () => {
  const location = useLocation();
  const donorId = location.state?.donorId;
  const [formData, setFormData] = useState({
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64 = await convertToBase64(file);
        setFormData((prev) => ({
          ...prev,
          photo: base64,
        }));
        setPhotoPreview(URL.createObjectURL(file));
      } catch (error) {
        console.error("Error converting image:", error);
        alert("Error processing image. Please try again.");
      }
    }
  };

  const isFormValid = () => {
    const requiredFields = [
      "name",
      "address",
      "city",
      "state",
      "pincode",
      "phone",
      "donorType",
    ];
    const hasRequiredFields = requiredFields.every(
      (field) => formData[field].trim() !== ""
    );
    const isRestaurantValid =
      formData.donorType !== "RESTAURANT" ||
      (formData.donorType === "RESTAURANT" &&
        formData.restaurantName.trim() !== "");

    return hasRequiredFields && isRestaurantValid && agreeToTerms;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsSubmitting(true);

    const dataToSend = {
      donorId: parseInt(donorId),
      name: formData.name,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      phone: formData.phone,
      donorType: formData.donorType,
      photo: formData.photo || null,
      restaurantName:
        formData.donorType === "RESTAURANT" ? formData.restaurantName : null,
    };

    try {
      console.log(dataToSend);
      const response = await axios.post(
        "http://localhost:3000/api/donors/add-details",
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        alert("Registration successful! Redirecting to dashboard.");
        navigate("/login");
      } else {
        alert(response.data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (file.size > 5 * 1024 * 1024) {
        reject(
          new Error("File size too large. Please choose an image under 5MB")
        );
        return;
      }

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        const base64String = fileReader.result.split(",")[1];
        resolve(base64String);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Store className="w-12 h-12 text-[#8beb7f]" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              Donor Registration
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative">
                <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8beb7f] focus:border-transparent"
                  placeholder="Full Name"
                  required
                />
              </div>

              <div className="relative">
                <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8beb7f] focus:border-transparent"
                  placeholder="Phone Number"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <Store className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <select
                name="donorType"
                value={formData.donorType}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8beb7f] focus:border-transparent"
                required
              >
                <option value="">Select Donor Type</option>
                <option value="INDIVIDUAL">Individual</option>
                <option value="RESTAURANT">Restaurant</option>
                <option value="ORGANIZATION">Organization</option>
              </select>
            </div>

            {formData.donorType === "RESTAURANT" && (
              <div className="relative">
                <Building2 className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="restaurantName"
                  value={formData.restaurantName}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8beb7f] focus:border-transparent"
                  placeholder="Restaurant Name"
                  required
                />
              </div>
            )}

            <div className="relative">
              <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-5" />
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8beb7f] focus:border-transparent h-24"
                placeholder="Full Address"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="relative">
                <Building2 className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8beb7f] focus:border-transparent"
                  placeholder="City"
                  required
                />
              </div>

              <div className="relative">
                <Map className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8beb7f] focus:border-transparent"
                  placeholder="State"
                  required
                />
              </div>

              <div className="relative">
                <Home className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8beb7f] focus:border-transparent"
                  placeholder="Pincode"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center space-x-4">
                <label className="flex-1 cursor-pointer relative">
                  <div className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8beb7f] focus:border-transparent flex items-center">
                    <Image className="w-5 h-5 text-gray-400 absolute left-3" />
                    <span className="text-gray-500">
                      {photoPreview ? "Change Photo" : "Upload Photo"}
                    </span>
                  </div>
                  <input
                    type="file"
                    name="photo"
                    onChange={handlePhotoChange}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
                {photoPreview && (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                )}
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="rounded border-gray-300 text-[#8beb7f] focus:ring-[#8beb7f]"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                I agree to the terms and conditions
              </label>
            </div>

            <button
              type="submit"
              disabled={!isFormValid() || isSubmitting}
              className={`w-full py-3 rounded-xl transition-all duration-300 transform flex items-center justify-center space-x-2 ${
                isFormValid() && !isSubmitting
                  ? "bg-[#8beb7f] hover:bg-[#78d86e] hover:scale-[1.02] hover:shadow-lg text-white"
                  : "bg-gray-300 cursor-not-allowed text-gray-500"
              }`}
            >
              {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
              <span>
                {isSubmitting ? "Registering..." : "Register as Donor"}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonorRegistrationForm;
