import React, { useState, useEffect, useRef } from "react";
import { Building, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OTPVerify = () => {
  const [timer, setTimer] = useState(60);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef([...Array(6)].map(() => React.createRef()));
  const navigate = useNavigate();

  useEffect(() => {
    const countdown =
      timer > 0 && setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/donors/verify-otp",
        {
          email: localStorage.getItem("email"),
          otp: otp.join(""),
        }
      );

      console.log(response);

      if (response.data.success) {
        console.log("OTP Verified Successfully!");
        navigate("/donor-registration", {
          state: { donorId: response.data.donor.id },
        });
      } else {
        alert(response.data.message || "Invalid OTP! Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert(
        error.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resendOTP = () => {
    // setTimer(15);
    setOtp(Array(6).fill(""));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Building className="w-16 h-16 text-[#8beb7f]" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Verify OTP</h2>
            <p className="text-gray-600 mt-2">
              Enter the 6-digit code sent to your device
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between space-x-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={inputRefs.current[idx]}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-12 h-12 text-center text-xl font-bold bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8beb7f] focus:border-transparent"
                />
              ))}
            </div>

            <div className="text-center">
              {timer > 0 ? (
                <p className="text-gray-600">
                  Resend code in <span className="font-bold">15 min</span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={resendOTP}
                  className="text-[#8beb7f] hover:text-[#78d86e]"
                >
                  Resend OTP
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={otp.includes("") || isSubmitting}
              onClick={isSubmitting}
              className={`w-full py-3 rounded-xl transition-all duration-300 transform ${
                !otp.includes("") && !isSubmitting
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
                  Verifying...
                </span>
              ) : (
                "Verify OTP"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTPVerify;
