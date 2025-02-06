import React from "react";
import {
  ThumbsUp,
  Truck,
  CheckCircle,
  Heart,
  Share2,
  Users,
} from "lucide-react";
import Navbar from "../Navbar/Navbar";

const HowItWorks = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-10 px-6">
        <div className="w-full max-w-3xl text-center mb-12">
          <Heart className="w-16 h-16 text-[#8beb7f] mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-800">How It Works</h2>
          <p className="text-gray-600 mt-2 text-lg">
            Join us in reducing food wastage and making a positive impact.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-10">
          {/* Step 1: Food Donation */}
          <div className="flex flex-col items-center space-y-6 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 bg-gray-50 rounded-xl p-6 w-80">
            <ThumbsUp className="w-16 h-16 text-[#8beb7f]" />
            <h3 className="text-2xl font-semibold text-gray-800">
              Step 1: Donate Food
            </h3>
            <p className="text-gray-600 text-center">
              Share surplus food from your home, restaurant, or bakery. Every
              little bit helps in reducing food waste.
            </p>
          </div>

          {/* Step 2: Pickup */}
          <div className="flex flex-col items-center space-y-6 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 bg-gray-50 rounded-xl p-6 w-80">
            <Truck className="w-16 h-16 text-[#8beb7f]" />
            <h3 className="text-2xl font-semibold text-gray-800">
              Step 2: Pickup Service
            </h3>
            <p className="text-gray-600 text-center">
              We arrange for a pickup service at your convenience, making it
              easier for you to donate without hassle.
            </p>
          </div>

          {/* Step 3: Distribution */}
          <div className="flex flex-col items-center space-y-6 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 bg-gray-50 rounded-xl p-6 w-80">
            <CheckCircle className="w-16 h-16 text-[#8beb7f]" />
            <h3 className="text-2xl font-semibold text-gray-800">
              Step 3: Food Distribution
            </h3>
            <p className="text-gray-600 text-center">
              The donated food is distributed to local food banks, shelters, and
              individuals in need to reduce food wastage.
            </p>
          </div>

          {/* Step 4: Track Impact */}
          <div className="flex flex-col items-center space-y-6 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 bg-gray-50 rounded-xl p-6 w-80">
            <Heart className="w-16 h-16 text-[#8beb7f]" />
            <h3 className="text-2xl font-semibold text-gray-800">
              Step 4: Track Your Impact
            </h3>
            <p className="text-gray-600 text-center">
              Easily track the amount of food you've donated and the positive
              impact you've made in your community.
            </p>
          </div>

          {/* Step 5: Share Your Story */}
          <div className="flex flex-col items-center space-y-6 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 bg-gray-50 rounded-xl p-6 w-80">
            <Share2 className="w-16 h-16 text-[#8beb7f]" />
            <h3 className="text-2xl font-semibold text-gray-800">
              Step 5: Share Your Story
            </h3>
            <p className="text-gray-600 text-center">
              Share your donation story with us and inspire others to contribute
              to the cause.
            </p>
          </div>

          {/* Step 6: Community Involvement */}
          <div className="flex flex-col items-center space-y-6 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 bg-gray-50 rounded-xl p-6 w-80">
            <Users className="w-16 h-16 text-[#8beb7f]" />
            <h3 className="text-2xl font-semibold text-gray-800">
              Step 6: Community Involvement
            </h3>
            <p className="text-gray-600 text-center">
              Join our community events and help spread awareness about reducing
              food waste.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
