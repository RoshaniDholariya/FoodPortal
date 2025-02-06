import React, { useState } from "react";
import {
  Heart,
  ChevronDown,
  Clock,
  MapPin,
  Star,
  ArrowRight,
} from "lucide-react";
import AboutPage from "../Aboutus/Aboutus";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const FoodDonationApp = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userType, setUserType] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen font-['Poppins'] bg-gradient-to-br from-green-600 via-teal-700 to-blue-800">
      <Navbar />

      <main className="relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-48">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 transform hover:scale-[1.02] transition-transform duration-300">
              <span className="text-teal-400 text-lg font-medium">
                Share Food, Share Love
              </span>
              <h1 className="text-white text-5xl md:text-6xl font-bold leading-tight">
                Connect to Share Surplus Food With Those in Need
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-teal-600" />
              <p className="text-gray-200 text-lg leading-relaxed">
                Join our platform to either share your surplus food or connect
                with donors. Real-time updates, easy scheduling, and a
                supportive community working together to reduce food waste and
                hunger.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/want-to-donar"
                  className="px-6 py-3 bg-gradient-to-r from-[#6de882] to-[#61cf73] hover:from-[#61cf73] hover:to-[#6de882] text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  I Want to Donate
                </Link>
                <Link
                  to="/need-food"
                  className="px-6 py-3 bg-white hover:bg-gray-50 text-teal-600 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  I Need Food
                </Link>
              </div>
            </div>

            <div
              className="bg-white rounded-3xl p-8 shadow-2xl transform hover:scale-[1.02] transition-all duration-300 hover:shadow-teal-500/20"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full text-sm font-medium transform hover:scale-105 transition-transform">
                    Available Now
                  </span>
                  <div className="flex items-center text-teal-500">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="ml-1">4.9</span>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                  Fresh Restaurant Surplus
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center text-gray-600 hover:text-teal-500 transition-colors">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>Downtown Restaurant District</span>
                  </div>
                  <div className="flex items-center text-gray-600 hover:text-teal-500 transition-colors">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>Available for next 2 hours</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Available portions:</span>
                    <span className="text-teal-600 font-medium">12 meals</span>
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center space-x-2 hover:text-teal-500 transition-colors">
                      <span className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
                      <span>Fresh pasta with vegetables (8 portions)</span>
                    </li>
                    <li className="flex items-center space-x-2 hover:text-teal-500 transition-colors">
                      <span className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
                      <span>Soup of the day (4 portions)</span>
                    </li>
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#6de882] to-[#61cf73] hover:from-[#61cf73] hover:to-[#6de882] text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                    <span>Schedule Pickup</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 px-6 py-3 rounded-lg border border-[#6de882] text-[#6de882] hover:bg-[#6de882]/10 transition-all duration-300 transform hover:scale-105">
                    <span>Contact Donor</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <AboutPage />
      <Footer />
    </div>
  );
};

const NavLink = ({ children, active, to }) => (
  <Link
    to={to}
    className={`flex items-center space-x-1 ${
      active ? "text-teal-400" : "text-white"
    } hover:text-teal-400 transition-all duration-300 transform hover:scale-105`}
  >
    <span>{children}</span>
  </Link>
);

export default FoodDonationApp;
