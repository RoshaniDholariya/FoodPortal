import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Shield,
  Lock,
  Mail,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const SuperAdminSignIn = () => {
  const { loginAdmin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();
  const [adminCredentials, setAdminCredentials] = useState({
    username: "",
    password: "",
  });

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (
      adminCredentials.username === "admin@gmail.com" &&
      adminCredentials.password === "admin123"
    ) {
      loginAdmin(adminCredentials.username, adminCredentials.password);
      showToast("Login successful! Redirecting to dashboard...", "success");

      setTimeout(() => {
        navigate("/Admin-dashboard");
      }, 3000);
    } else {
      setError("Invalid credentials");
      showToast("Login failed. Please check your credentials.", "error");

      setTimeout(() => {
        setToast({ show: false });
      }, 1000);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-50">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-full h-full bg-emerald-50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 max-w-md animate-fade-in-down">
          <div
            className={`flex items-center p-4 mb-4 rounded-lg shadow-lg ${
              toast.type === "success"
                ? "bg-white border-l-4 border-l-[#61cf73]"
                : "bg-white border-l-4 border-l-red-500"
            }`}
          >
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg">
              {toast.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-[#61cf73]" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-500" />
              )}
            </div>
            <div className="ml-3 text-sm font-normal">{toast.message}</div>
          </div>
        </div>
      )}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-[#61cf73] rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-[#61cf73]/30">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Super Admin Access
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Secure authentication required
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl shadow-[#61cf73]/10 p-8">
            {error && (
              <div className="mb-6 flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={adminCredentials.username}
                    onChange={(e) =>
                      setAdminCredentials({
                        ...adminCredentials,
                        username: e.target.value,
                      })
                    }
                    className="block w-full rounded-lg border border-gray-200 px-4 py-3 pl-11 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#61cf73] focus:border-[#61cf73] transition-colors duration-200"
                    placeholder="admin@example.com"
                  />
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={adminCredentials.password}
                    onChange={(e) =>
                      setAdminCredentials({
                        ...adminCredentials,
                        password: e.target.value,
                      })
                    }
                    className="block w-full rounded-lg border border-gray-200 px-4 py-3 pl-11 pr-11 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#61cf73] focus:border-[#61cf73] transition-colors duration-200"
                    placeholder="••••••••••••"
                  />
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative w-full rounded-lg bg-[#61cf73] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#50b862] focus:ring-2 focus:ring-offset-2 focus:ring-[#61cf73] transition-all duration-200 disabled:opacity-70"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
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
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Protected by enhanced security measures.
                <br />
                Unauthorized access attempts will be logged.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminSignIn;
