
import React, { useState, useEffect } from "react";
import { User, Lock, Building, ArrowBigLeft } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const NGOLogin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    username: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isValid =
      formData.userId.trim() !== "" && formData.password.trim() !== "";
    setIsFormValid(isValid);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/ngo/login",
        {
          email: formData.userId,
          password: formData.password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        navigate("/NGO-dashboard");
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Login failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white-50">
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 flex items-center gap-2 text-emerald-600 text-lg font-medium hover:text-emerald-500 transition duration-300"
      >
        <ArrowBigLeft className="w-6 h-6" />
        Back
      </button>
      <br />
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Building className="w-16 h-16 text-[#8beb7f]" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">NGO Login</h2>
            <p className="text-gray-600 mt-2">Login to your NGO account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8beb7f] focus:border-transparent"
                placeholder="Email"
                required
              />
            </div>

            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8beb7f] focus:border-transparent"
                placeholder="Password"
                required
              />
            </div>

            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-emerald-600 hover:text-emerald-700 text-sm font-medium hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`w-full py-3 rounded-xl transition-all duration-300 transform ${
                isFormValid && !isSubmitting
                  ? "bg-[#8beb7f] hover:bg-[#78d86e] hover:scale-[1.02] hover:shadow-lg"
                  : "bg-gray-300 cursor-not-allowed"
              } text-white font-medium`}
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
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NGOLogin;
