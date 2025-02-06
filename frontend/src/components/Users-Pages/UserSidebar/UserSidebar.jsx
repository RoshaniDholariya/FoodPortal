import { Link } from "react-router-dom";
import {
  Home,
  PlusCircle,
  History,
  MessageSquare,
  Locate,
  User,
  LogOut,
  X,
  Menu,
} from "lucide-react";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
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
    // {
    //   icon: Locate,
    //   label: "Nearest NGO",
    //   id: "nearest ngo",
    //   path: "/user-ngo-location",
    // },
    {
      icon: User,
      label: "Profile",
      id: "profile",
      path: "/user-profile",
    },
  ];

  return (
    <div
      className={`${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed lg:relative lg:translate-x-0 z-30 transition-transform duration-300 ease-in-out`}
    >
      <div className="flex flex-col h-screen w-64 bg-white border-r border-gray-200">
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <span className="text-xl font-semibold text-[#61cf73]">
            FoodShare
          </span>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            {isSidebarOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link to={item.path}>
                  <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 text-gray-600 hover:bg-gray-100">
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <Link
            to="/login"
            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <LogOut className="h-5 w-5 text-red-700" />
            <span className="text-red-700">Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
