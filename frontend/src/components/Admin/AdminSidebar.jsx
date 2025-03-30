import React from "react";
import {
  PieChart,
  MessageSquare,
  Users,
  AlertCircle,
  LogOut,
  X,
  Menu,
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import logo from "../../../assets/logo.jpg";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();

  const menuItems = [
    {
      icon: PieChart,
      label: "Dashbaord",
      id: "dashboard",
      path: "/Admin-dashboard",
    },
    {
      icon: MessageSquare,
      label: "NGO Details",
      id: "ngo details",
      path: "/Admin-NGO",
    },
    { icon: Users, label: "Donors", id: "donors", path: "/Admin-Donor" },
  ];
  return (
    <div
      className={`${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed lg:relative lg:translate-x-0 z-30 transition-transform duration-300 ease-in-out`}
    >
      <div className="flex flex-col h-screen w-64 bg-white/80 backdrop-blur-md border-r border-gray-200 shadow-lg">
        <div className="flex items-center justify-between h-30 px-2 mb-[-20px]">
          <img src={logo} alt="" className="h-30 w-50" />
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
            to="/Admin-login"
            className="group flex items-center space-x-3 px-4 py-3 text-gray-600 
              hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <LogOut className="h-5 w-5 text-red-600 group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-medium text-red-600">Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
