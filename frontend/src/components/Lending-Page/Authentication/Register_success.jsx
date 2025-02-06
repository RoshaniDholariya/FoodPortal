import React from "react";
import { Building } from "lucide-react";

const RegistrationSuccess = () => {
  return (
    <div className="h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-lg text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <Building className="w-16 h-16 text-[#8beb7f]" />
          </div>

          <div className="flex justify-center mb-6">
            <div className="relative w-20 h-20">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="animate-[dash_1s_ease-in-out_forwards] stroke-[#8beb7f]"
                  fill="none"
                  strokeWidth="4"
                  strokeDasharray="283"
                  strokeDashoffset="283"
                  cx="50"
                  cy="50"
                  r="45"
                />
                <path
                  className="animate-[check_0.5s_ease-in-out_0.9s_forwards] stroke-[#8beb7f]"
                  fill="none"
                  strokeWidth="4"
                  strokeDasharray="80"
                  strokeDashoffset="80"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M30 50 L45 65 L70 35"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Registration Successful!
          </h2>

          <p className="text-gray-600 mb-8">
            Your data has been successfully submitted to the admin. Please wait
            for verification of your data.
          </p>

          <button
            onClick={() => (window.location.href = "/")}
            className="w-full py-2.5 rounded-xl bg-[#8beb7f] hover:bg-[#78d86e] transition-all duration-300 text-white hover:scale-[1.02] hover:shadow-lg"
          >
            Back to Home
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes check {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default RegistrationSuccess;
