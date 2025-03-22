import React, { useState } from "react";
import { Mail, ArrowBigLeft, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRequestCode = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/ngo/forgot-password",
        { email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setMessage({
        text: "Verification code sent! Check your email.",
        type: "success",
      });
      setCodeSent(true);
    } catch (error) {
      console.error("Forgot password error:", error);
      setMessage({
        text:
          error.response?.data?.message ||
          "Failed to send verification code. Try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage({ text: "Passwords do not match!", type: "error" });
      return;
    }

    if (newPassword.length < 8) {
      setMessage({
        text: "Password must be at least 8 characters long",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/ngo/reset-password",
        {
          email,
          code: verificationCode,
          newPassword,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setMessage({
        text: "Password reset successful! You can now login with your new password.",
        type: "success",
      });

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/ngo-login");
      }, 3000);
    } catch (error) {
      console.error("Reset password error:", error);
      setMessage({
        text:
          error.response?.data?.message ||
          "Failed to reset password. Please check your code and try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (codeSent) {
      setCodeSent(false);
      setMessage({ text: "", type: "" });
    } else {
      navigate("/ngo-login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 flex items-center gap-2 text-emerald-600 text-lg font-medium hover:text-emerald-500 transition duration-300"
      >
        <ArrowBigLeft className="w-6 h-6" />
        {codeSent ? "Back to Email Entry" : "Back to Login"}
      </button>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Building className="w-16 h-16 text-[#8beb7f]" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Reset Password</h2>
            <p className="text-gray-600 mt-2">
              {codeSent
                ? "Enter the verification code sent to your email"
                : "We'll send you a verification code to reset your password"}
            </p>
          </div>

          {message.text && (
            <div
              className={`p-4 mb-6 rounded-xl ${
                message.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}

          {!codeSent ? (
            <form onSubmit={handleRequestCode} className="space-y-6">
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8beb7f] focus:border-transparent"
                  placeholder="Your Email"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={!email || isSubmitting}
                className={`w-full py-3 rounded-xl transition-all duration-300 transform ${
                  email && !isSubmitting
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
                    Sending...
                  </span>
                ) : (
                  "Send Verification Code"
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div className="relative">
                <div className="flex justify-center">
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8beb7f] focus:border-transparent text-center text-xl tracking-widest"
                    placeholder="6-digit code"
                    maxLength={6}
                    pattern="\d{6}"
                    required
                  />
                </div>
                <p className="text-center text-sm text-gray-500 mt-2">
                  Enter the 6-digit code sent to {email}
                </p>
              </div>

              <div className="relative">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8beb7f] focus:border-transparent"
                  placeholder="New Password"
                  minLength={8}
                  required
                />
              </div>

              <div className="relative">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8beb7f] focus:border-transparent"
                  placeholder="Confirm New Password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={
                  !verificationCode ||
                  !newPassword ||
                  !confirmPassword ||
                  newPassword !== confirmPassword ||
                  isSubmitting
                }
                className={`w-full py-3 rounded-xl transition-all duration-300 transform ${
                  verificationCode &&
                  newPassword &&
                  confirmPassword &&
                  newPassword === confirmPassword &&
                  !isSubmitting
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
                    Resetting...
                  </span>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
