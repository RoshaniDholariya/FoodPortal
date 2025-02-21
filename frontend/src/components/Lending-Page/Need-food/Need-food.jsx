import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBigLeft } from "lucide-react";

const Needfood = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-white to-green-300 flex flex-col items-center py-10 px-6 md:px-16 lg:px-32">
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 flex items-center gap-2 text-emerald-900 text-lg font-medium hover:text-emerald-900 transition duration-300"
      >
        <ArrowBigLeft className="w-6 h-6" />
        Back
      </button>
      <br />
      <div className="w-full max-w-7xl bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white text-center py-12 px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Steps to Help NGOs Register
          </h1>
          <p className="text-lg md:text-xl font-light">
            Join us in supporting NGOs by helping them get registered and
            facilitate food donations.
          </p>
        </div>

        <div className="p-8 md:p-12 flex flex-col space-y-12">
          <div className="flex flex-col md:flex-row items-center md:space-x-6">
            <div className="text-center md:text-left md:w-1/2 mb-6 md:mb-0">
              <div className="text-green-600 font-bold text-3xl mb-4">
                Step 1
              </div>
              <p className="text-lg text-gray-800">
                <strong>Login or Create an Account:</strong> If you're a new
                user, create a donor account. Existing donors can log in
                directly.
              </p>
            </div>
            <div className="text-center md:text-left md:w-1/2">
              <div className="text-green-600 font-bold text-3xl mb-4">
                Step 2
              </div>
              <p className="text-lg text-gray-800">
                <strong>Access the NGO Registration Section:</strong> Once
                logged in, visit the "NGO Registration" section from your
                dashboard.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:space-x-6">
            <div className="text-center md:text-left md:w-1/2 mb-6 md:mb-0">
              <div className="text-green-600 font-bold text-3xl mb-4">
                Step 3
              </div>
              <p className="text-lg text-gray-800">
                <strong>Provide NGO Details:</strong> Fill in the necessary
                details such as the NGO's name, mission, location, and contact
                information.
              </p>
            </div>
            <div className="text-center md:text-left md:w-1/2">
              <div className="text-green-600 font-bold text-3xl mb-4">
                Step 4
              </div>
              <p className="text-lg text-gray-800">
                <strong>Verify NGO Information:</strong> Make sure that all the
                information provided is correct and complete before submitting.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:space-x-6">
            <div className="text-center md:text-left md:w-1/2 mb-6 md:mb-0">
              <div className="text-green-600 font-bold text-3xl mb-4">
                Step 5
              </div>
              <p className="text-lg text-gray-800">
                <strong>Submit NGO for Review:</strong> Once you are sure all
                details are correct, submit the registration for review.
              </p>
            </div>
            <div className="text-center md:text-left md:w-1/2">
              <div className="text-green-600 font-bold text-3xl mb-4">
                Step 6
              </div>
              <p className="text-lg text-gray-800">
                <strong>Confirmation:</strong> Once the NGO registration is
                approved, you'll receive a notification confirming the
                successful registration.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 text-center py-12 px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-6">
            Ready to Support NGOs?
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Sign in or create your donor account today to start supporting NGOs
            in need.
          </p>
          <button className="bg-gradient-to-r from-green-500 to-green-700 text-white text-lg font-semibold py-4 px-8 rounded-lg shadow-lg hover:from-green-600 hover:to-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 transition">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Needfood;
