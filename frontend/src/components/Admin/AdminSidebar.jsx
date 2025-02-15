import React from "react";
import {
  PieChart,
  MessageSquare,
  Users,
  AlertCircle,
  LogOut,
  X,
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const MenuItem = ({ icon: Icon, label, path, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Link
      to={path}
      onClick={onClick}
      className={`
        w-full flex items-center px-4 py-2.5 rounded-lg transition-all duration-200
        ${
          isActive
            ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/30"
            : "text-gray-600 hover:bg-teal-50 hover:text-teal-600"
        }
      `}
    >
      <Icon
        className={`h-5 w-5 flex-shrink-0 ${
          isActive ? "text-white" : "text-current"
        }`}
      />
      <span className="ml-3 font-medium truncate">{label}</span>
    </Link>
  );
};

const Sidebar = ({ isMobile, showMobileSidebar, onCloseSidebar }) => {
  const menuItems = [
    { icon: PieChart, label: "Overview", path: "/Admin-dashboard" },
    { icon: MessageSquare, label: "NGO Details", path: "/Admin-NGO" },
    { icon: Users, label: "Donors", path: "/Admin-Donor" },
    { icon: AlertCircle, label: "Reports", path: "/Admin-reports" },
    { icon: LogOut, label: "Logout", path: "/Admin-login" },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full max-h-screen">
      {/* Header */}
      <div className="flex-shrink-0 p-5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent">
              FoodSaver
            </h1>
          </div>
          {isMobile && (
            <button
              onClick={onCloseSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Profile Section */}
      <div className="flex-shrink-0 p-4">
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 flex items-center justify-center shadow-md">
              <span className="text-white font-medium">JS</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                John Smith
              </h3>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2">
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              {...item}
              onClick={isMobile ? onCloseSidebar : undefined}
            />
          ))}
        </div>
      </nav>

      {/* Help Section */}
      <div className="flex-shrink-0 p-4 mt-auto">
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl p-4">
          <h4 className="text-sm font-medium text-teal-700 mb-1">Need Help?</h4>
          <p className="text-xs text-teal-600 mb-3">
            Our support team is here to assist you
          </p>
          <button className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-lg">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block fixed top-0 left-0 w-72 bg-white border-r border-gray-100 h-screen">
        {sidebarContent}
      </aside>

      {isMobile && showMobileSidebar && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
            onClick={onCloseSidebar}
          />
          <aside className="fixed left-0 top-0 w-72 bg-white shadow-2xl h-screen">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
