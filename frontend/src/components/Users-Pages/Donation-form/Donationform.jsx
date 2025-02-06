import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Truck,
  Home,
  Package,
  Menu,
} from "lucide-react";
import Sidebar from "../UserSidebar/UserSidebar";
import axios from "axios";
const FoodDonationForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [formData, setFormData] = useState({
    foodType: "",
    foodCategory: "",
    noOfDishes: "",  // Changed from numberOfDishes
    preparationDate: "",
    expiryDate: "",
    address: "",  // Changed from pickupLocation
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const steps = [
    { number: 1, title: "Food Information", icon: Package },
    { number: 2, title: "Delivery Details", icon: Truck },
  ];

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 2));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const renderFormField = (label, name, type = "text", options = null) => (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {options ? (
        <select
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#61cf73] focus:border-transparent"
          required
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((opt) => (
            <option key={opt} value={opt.toLowerCase()}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#61cf73] focus:border-transparent"
          required
        />
      )}
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            {renderFormField("Food Type", "foodType", "text", [
              "Vegetarian",
              "Non-Vegetarian",
            ])}
            {renderFormField("Food Category", "foodCategory", "text", [
              "Dinner",
              "Lunch",
              "breackfast",
            ])}
            {renderFormField("Number of Dishes", "noOfDishes", "number")}
            {renderFormField("Preparation Date", "preparationDate", "date")}
            {renderFormField("Expiry Date", "expiryDate", "date")}
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Delivery Method
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() =>
                    handleInputChange({
                      target: { name: "deliveryMethod", value: "pickup" },
                    })
                  }
                  className={`p-6 border rounded-lg flex flex-col items-center gap-3 transition-all ${
                    formData.deliveryMethod === "pickup"
                      ? "border-[#61cf73] bg-green-50 shadow-md"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <Truck className="h-8 w-8 text-[#61cf73]" />
                  <span className="font-medium">Pickup from location</span>
                  <span className="text-sm text-gray-500">
                    We'll collect from your address
                  </span>
                </button>
                {/* <button
                  type="button"
                  onClick={() =>
                    handleInputChange({
                      target: { name: "deliveryMethod", value: "delivery" },
                    })
                  }
                  className={`p-6 border rounded-lg flex flex-col items-center gap-3 transition-all ${
                    formData.deliveryMethod === "delivery"
                      ? "border-[#61cf73] bg-green-50 shadow-md"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <Home className="h-8 w-8 text-[#61cf73]" />
                  <span className="font-medium">Delivery to location</span>
                  <span className="text-sm text-gray-500">
                    We'll deliver to a local charity
                  </span>
                </button> */}
              </div>
            </div>

            {formData.deliveryMethod === "pickup" && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Pickup Location
                </h3>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#61cf73] focus:border-transparent"
                    placeholder="Your address for pickup"
                  />
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    try {
     
      const response = await axios.post(
        "http://localhost:3000/api/donors/addFood",
        {
          foodType: formData.foodType,
          foodCategory: formData.foodCategory,
          noOfDishes: formData.noOfDishes, // Fixed property name
          preparationDate: formData.preparationDate,
          expiryDate: formData.expiryDate,
          address: formData.address, // Fixed property name
        },
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // Ensures cookies are sent
        }
      );
  
      if (response.data.success) {
        alert("Food details added successfully!");
        navigate("/user-donation-history", { state: { donationData: formData } });
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      console.error("Error submitting form:", error);
      alert("Failed to add food. Please try again.");
    }
  };
  
  return (
    <div className="min-h-screen flex bg-white-300">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex-1">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-8">
          <button
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-medium">Food Donation Form</h1>
        </header>
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            {steps.map((stepObj) => (
              <div
                key={stepObj.number}
                className={`flex items-center gap-2 ${
                  step === stepObj.number
                    ? "text-[#61cf73] font-semibold"
                    : "text-gray-500"
                }`}
              >
                <stepObj.icon className="w-6 h-6" />
                <span>{stepObj.title}</span>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            {renderStep()}
          </div>

          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              disabled={step === 1}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 disabled:opacity-50"
            >
              <ArrowLeft className="inline-block mr-2" /> Previous
            </button>

            {step !== 2 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-[#61cf73] text-white rounded-md hover:bg-[#55c16e]"
              >
                Next <ArrowRight className="inline-block ml-2" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-[#61cf73] text-white rounded-md hover:bg-[#55c16e]"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDonationForm;
