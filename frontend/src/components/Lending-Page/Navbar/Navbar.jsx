import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sun, Moon, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 py-4 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2 transform hover:scale-105 transition-transform">
            <span className="text-2xl font-bold text-white">FoodShare</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/aboutus">About Us</NavLink>
            <NavLink to="/how-it-works">How It Works</NavLink>
            <NavLink to="/contactus">Contact Us</NavLink>
            <NavLink to="/ourmotive">Our Motive</NavLink>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/NGO-register"
              className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 transition-all hover:shadow-md"
            >
              <span className="text-white font-medium mr-1">NGO Register</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>

            <Link
              to="/login"
              className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 transition-all hover:shadow-md"
            >
              <span className="text-white font-medium mr-1">Login</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>
          </div>

          <div className="flex md:hidden items-center space-x-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-white dark:hover:bg-gray-800 transition-colors"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden pt-2 pb-4 border-t border-gray-200">
            <div className="space-y-1 px-2">
              <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </MobileNavLink>
              <MobileNavLink to="/aboutus" onClick={() => setIsMenuOpen(false)}>
                About Us
              </MobileNavLink>
              <MobileNavLink
                to="/how-it-works"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </MobileNavLink>
              <MobileNavLink
                to="/contactus"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </MobileNavLink>
              <MobileNavLink
                to="/ourmotive"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Motive
              </MobileNavLink>

              <div className="pt-4 flex flex-col space-y-3">
                <Link
                  to="/NGO-register"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600"
                >
                  <span className="text-white font-medium mr-1">
                    NGO Register
                  </span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </Link>

                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600"
                >
                  <span className="text-white font-medium mr-1">Login</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ children, to }) => (
  <Link
    to={to}
    className="text-white hover:text-emerald-600  font-medium transition-colors"
  >
    <span>{children}</span>
  </Link>
);

const MobileNavLink = ({ children, to, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-emerald-600 transition-colors"
  >
    {children}
  </Link>
);

export default Navbar;
