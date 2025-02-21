import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBigLeft } from "lucide-react";

const WantToDonate = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-white to-green-200 flex flex-col items-center py-10 px-6 md:px-16 lg:px-32">
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 flex items-center gap-2 text-emerald-600 text-lg font-medium hover:text-emerald-500 transition duration-300"
      >
        <ArrowBigLeft className="w-6 h-6" />
        Back
      </button>
      <br />
      <div className="w-full max-w-7xl bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="bg-green-700 text-white text-center py-10 px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Steps to Donate Food
          </h1>
          <p className="text-lg md:text-xl font-light">
            Join hands to fight food wastage and feed the needy by following
            these simple steps.
          </p>
        </div>

        <div className="p-8 md:p-12 flex flex-col space-y-12">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
            <div className="flex-shrink-0 text-center md:text-left md:w-1/2">
              <div className="text-green-500 font-bold text-3xl mb-4">
                Step 1
              </div>
              <p className="text-lg text-gray-800">
                <strong>Login or Create an Account:</strong> If you’re a
                first-time donor, create an account as a donor. Existing donors
                can simply log in.
              </p>
            </div>
            <div className="flex-shrink-0 text-center md:text-left md:w-1/2">
              <div className="text-green-500 font-bold text-3xl mb-4">
                Step 2
              </div>
              <p className="text-lg text-gray-800">
                <strong>Register Your Details:</strong> Once logged in, register
                your details to access the donor dashboard.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
            <div className="flex-shrink-0 text-center md:text-left md:w-1/2">
              <div className="text-green-500 font-bold text-3xl mb-4">
                Step 3
              </div>
              <p className="text-lg text-gray-800">
                <strong>Access the Donor Dashboard:</strong> The dashboard
                provides you with information about all available NGOs and their
                locations.
              </p>
            </div>
            <div className="flex-shrink-0 text-center md:text-left md:w-1/2">
              <div className="text-green-500 font-bold text-3xl mb-4">
                Step 4
              </div>
              <p className="text-lg text-gray-800">
                <strong>Find Nearest NGOs:</strong> Use the dashboard to find
                the nearest NGOs to your location.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
            <div className="flex-shrink-0 text-center md:text-left md:w-1/2">
              <div className="text-green-500 font-bold text-3xl mb-4">
                Step 5
              </div>
              <p className="text-lg text-gray-800">
                <strong>Donate Food to a Specific NGO:</strong> Visit the NGO
                card in the dashboard and send a food donation request. If the
                NGO accepts your request, you can proceed with the donation.
              </p>
            </div>
            <div className="flex-shrink-0 text-center md:text-left md:w-1/2">
              <div className="text-green-500 font-bold text-3xl mb-4">
                Step 6
              </div>
              <p className="text-lg text-gray-800">
                <strong>Add Food for General Availability:</strong> You can list
                surplus food on the website. All NGOs can view this listing, and
                if an NGO accepts, you’ll receive a notification to proceed with
                the donation.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-green-100 text-center py-12 px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Sign in or create your donor account today to start helping those in
            need.
          </p>
          <button className="bg-gradient-to-r from-green-500 to-green-700 text-white text-lg font-semibold py-4 px-8 rounded-lg shadow-lg hover:from-green-600 hover:to-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 transition">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default WantToDonate;
