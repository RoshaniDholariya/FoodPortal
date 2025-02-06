import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 py-4 backdrop-blur-md bg-black/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 transform hover:scale-105 transition-transform">
            <span className="text-2xl font-bold text-white">FoodShare</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink active to="/">
              Home
            </NavLink>
            <NavLink to="/aboutus">About Us</NavLink>
            <NavLink to="/how-it-works">How It Works</NavLink>
            <NavLink to="/contactus">Contact Us</NavLink>
            <NavLink to="/ourmotive">Our Motive</NavLink>
          </div>

          <Link
            to="/login"
            className="hidden md:flex items-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#6de882] to-[#61cf73] hover:shadow-lg"
          >
            <span className="text-white font-medium">Login</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </Link>

          <button
            className="md:hidden text-white hover:text-teal-500 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-16 6h16"
              />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="mt-4 md:hidden flex flex-col space-y-4">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/aboutus">About Us</NavLink>
            <NavLink to="/how-it-works">How It Works</NavLink>
            <NavLink to="/contactus">Contact Us</NavLink>
            <NavLink to="/ourmotive">Our Motive</NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ children, active, to }) => (
  <Link
    to={to}
    className={`flex items-center space-x-1 ${
      active ? "text-[#6de882]" : "text-white"
    } hover:text-[#61cf73] transition-transform`}
  >
    <span>{children}</span>
  </Link>
);

export default Navbar;
