import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  SquareCheckBig,
  ReceiptText,
  Locate,
  User,
  LogOut,
  BookOpenCheck,
  X,
  MailCheck,
} from "lucide-react";
import logo from "../../../assets/logo.jpg";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();

  const navigationItems = [
    { title: "Dashboard", icon: LayoutDashboard, path: "/NGO-dashboard" },
    { title: "Donations", icon: SquareCheckBig, path: "/NGO-donationpage" },
    {
      title: "Accepted Donations",
      icon: BookOpenCheck,
      path: "/NGO-accepted-donationpage",
    },
    {
      title: "Doner Details",
      icon: ReceiptText,
      path: "/NGO-Doner-detailspage",
    },
    { title: "Donor Request", icon: MailCheck, path: "/NGO-donor-request" },
    { title: "Profile", icon: User, path: "/NGO-Profilepage" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-64 bg-white backdrop-blur-md z-50 border-r border-emerald-100 transform transition-transform duration-200 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <img src={logo} alt="" className="h-50 w-50" />
        </div>
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.title}
                to={item.path}
                className={`flex items-center space-x-3 rounded-lg p-3 transition-all group
                  ${
                    isActive
                      ? "bg-emerald-100 text-emerald-900"
                      : "text-emerald-600 hover:text-emerald-900 hover:bg-emerald-50"
                  }`}
              >
                <item.icon
                  className={`h-5 w-5 ${
                    isActive
                      ? "text-emerald-900"
                      : "group-hover:text-emerald-700"
                  }`}
                />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
        <nav className="border-t border-emerald-100 pt-4 mt-4">
          <a
            href="/NGO-login"
            className="flex items-center space-x-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg p-3 transition-all group"
          >
            <LogOut className="h-5 w-5 group-hover:text-emerald-700" />
            <span>Logout</span>
          </a>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
