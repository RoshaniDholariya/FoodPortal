import React from "react";
import { Activity, BarChart3, PieChart } from "lucide-react";

const DashboardTabs = ({ tabs, activeTab, setActiveTab }) => {
  // Map icon strings to actual components
  const getIcon = (iconName) => {
    switch (iconName) {
      case "Activity":
        return <Activity className="h-5 w-5" />;
      case "BarChart3":
        return <BarChart3 className="h-5 w-5" />;
      case "PieChart":
        return <PieChart className="h-5 w-5" />;
      default:
        return <Activity className="h-5 w-5" />;
    }
  };

  return (
    <div className="border-b border-gray-200">
      <div className="px-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <span className="mr-2">{getIcon(tab.icon)}</span>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default DashboardTabs;
