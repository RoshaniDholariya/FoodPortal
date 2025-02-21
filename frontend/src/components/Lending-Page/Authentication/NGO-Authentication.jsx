import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  FileText,
  Building,
  User,
  ArrowBigLeft,
  Info,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const NGOAuthentication = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    city: "",
    pincode: "",
    address: "",
    certificate: null,
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isValid = Object.entries(formData).every(([key, value]) => {
      if (key === "certificate") return value !== null;
      return value.trim() !== "";
    });
    setIsFormValid(isValid);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "certificate") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("pincode", formData.pincode);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("certificate", formData.certificate);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/ngo/submit",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        alert("NGO registered successfully! Await admin approval.");
        navigate("/data-register");
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 bg-gray-50">
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 flex items-center gap-2 text-emerald-600 text-lg font-medium hover:text-emerald-500 transition duration-300"
      >
        <ArrowBigLeft className="w-6 h-6" />
        Back
      </button>
      <br />
      <div className="w-full max-w-4xl h-full max-h-[800px] flex items-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <Building className="w-10 h-10 text-[#8beb7f]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              NGO Registration
            </h2>
            <p className="text-gray-600 mt-1 text-sm">
              Join us in making a difference
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8beb7f] focus:border-transparent"
                  placeholder="NGO Name"
                  required
                />
              </div>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8beb7f] focus:border-transparent"
                  placeholder="Email"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8beb7f] focus:border-transparent"
                placeholder="Phone Number"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8beb7f] focus:border-transparent"
                  placeholder="City"
                  required
                />
              </div>
              <div className="relative">
                <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8beb7f] focus:border-transparent"
                  placeholder="Pincode"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-8 -translate-y-1/2" />
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 h-16 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8beb7f] focus:border-transparent"
                placeholder="Full Address"
                required
              />
            </div>

            <div className="relative">
              <FileText className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="file"
                name="certificate"
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8beb7f] focus:border-transparent file:mr-4 file:py-1.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:bg-[#8beb7f] file:text-white hover:file:bg-[#78d86e]"
                accept=".pdf,.doc,.docx"
                required
              />
            </div>

            <div className="bg-blue-50 rounded-xl p-4 flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-700">
                After registration, Admin will approve your application and you
                will receive an email containing your login credentials and
                dashboard access link. Use these credentials to access your NGO
                dashboard.
              </p>
            </div>

            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              onClick={isSubmitting}
              className={`w-full py-2.5 rounded-xl transition-all duration-300 transform ${
                isFormValid && !isSubmitting
                  ? "bg-[#8beb7f] hover:bg-[#78d86e] hover:scale-[1.02] hover:shadow-lg"
                  : "bg-gray-300 cursor-not-allowed"
              } text-white`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Register NGO"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NGOAuthentication;
