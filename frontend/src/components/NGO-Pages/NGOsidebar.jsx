import React from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  SquareCheckBig,
  ReceiptText,
  Locate,
  User,
  LogOut,
  BookOpenCheck,
  X,
} from "lucide-react";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
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
      path: "/NGO-Donar-detailspage",
    },
    // { title: "Nearest Donar", icon: Locate, path: "/NGO-nearest-donar" },
    { title: "Profile", icon: User, path: "/NGO-Profilepage" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-64 bg-white/80 backdrop-blur-md z-50 border-r border-emerald-100 transform transition-transform duration-200 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-emerald-900">NGO Panel</h1>
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-emerald-600 hover:text-emerald-900"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              className="flex items-center space-x-3 text-emerald-600 hover:text-emerald-900 hover:bg-emerald-50 rounded-lg p-3 transition-all group"
            >
              <item.icon className="h-5 w-5 group-hover:text-emerald-700" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
        <nav className="border-t border-emerald-100 pt-4">
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
