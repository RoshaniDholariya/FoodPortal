import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  PlusCircle,
  History,
  MessageSquare,
  ChartArea,
  User,
  LogOut,
  X,
  Menu,
  FileBadge2,
  File,
  MailIcon,
  MailOpenIcon,
} from "lucide-react";
import logo from "../../../../assets/logo.jpg";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();

  const menuItems = [
    {
      icon: Home,
      label: "Dashboard",
      id: "dashboard",
      path: "/user-dashboard",
    },
    {
      icon: PlusCircle,
      label: "New Donation",
      id: "new-donation",
      path: "/user-donation-form",
    },
    {
      icon: History,
      label: "Donation History",
      id: "history",
      path: "/user-donation-history",
    },
    {
      icon: MessageSquare,
      label: "NGO Details",
      id: "ngo details",
      path: "/user-ngo-details",
    },
    {
      icon: MailIcon,
      label: "Requested NGO",
      id: "requested ngo",
      path: "/user-ngo-request",
    },
    {
      icon: MailOpenIcon,
      label: "History of request",
      id: "history of request",
      path: "/user-ngo-request-history",
    },
    {
      icon: ChartArea,
      label: "Analytics",
      id: "analysis",
      path: "/chart-analysis",
    },
    {
      icon: FileBadge2,
      label: "Rewards",
      id: "rewards",
      path: "/user-reward",
    },
    {
      icon: File,
      label: "Certificate",
      id: "certifiacte",
      path: "/user-certificate",
    },
    {
      icon: User,
      label: "Profile",
      id: "profile",
      path: "/user-profile",
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-64 bg-white backdrop-blur-md z-50 border-r border-emerald-100 transform transition-transform overflow-hidden overflow-y-auto duration-200 ease-in-out scrollbar-hide ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="flex flex-col h-screen w-64 bg-white backdrop-blur-md border-r border-gray-200 shadow-lg">
        <div className="flex items-center justify-between h-16 px-6 mb-[-10px]">
          <img src={logo} alt="" className="h-50 w-50 mt-5" />
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden text-emerald-600 hover:text-emerald-900"
          >
            {isSidebarOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6">
          <ul className="space-y-2 px-3">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.id}>
                  <Link to={item.path}>
                    <button
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 
                        ${
                          isActive
                            ? "bg-emerald-100 text-emerald-900"
                            : "text-emerald-600 hover:text-emerald-900 hover:bg-emerald-50"
                        }`}
                    >
                      <item.icon
                        className={`h-5 w-5 ${
                          isActive ? "text-emerald-900" : ""
                        }`}
                      />
                      <span
                        className={`font-medium ${
                          isActive ? "text-emerald-900" : ""
                        }`}
                      >
                        {item.label}
                      </span>
                      {isActive && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald" />
                      )}
                    </button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <Link
            to="/login"
            className="group flex items-center space-x-3 px-4 py-3 text-gray-600 
              hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <LogOut className="h-5 w-5 text-red-600 group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-medium text-red-600">Logout</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
