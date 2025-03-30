import React from "react";
import { Users, Building, ShoppingBag, Share2 } from "lucide-react";

const StatsGrid = ({ stats, FadeIn }) => {
  // Map icon strings to actual components
  const getIcon = (iconName) => {
    switch (iconName) {
      case "Users":
        return Users;
      case "Building":
        return Building;
      case "ShoppingBag":
        return ShoppingBag;
      case "Share2":
        return Share2;
      default:
        return Users;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const IconComponent = getIcon(stat.icon);

        return (
          <FadeIn key={stat.title} delay={index * 100}>
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-center mb-4">
                <div
                  className="h-12 w-12 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: stat.bgColor,
                    color: stat.color,
                  }}
                >
                  <IconComponent className="h-6 w-6" />
                </div>
                <span className="ml-auto text-xs font-medium inline-flex items-center rounded-full px-2 py-1 transition-colors">
                  {stat.trend > 0 ? (
                    <span
                      className="text-green-600 bg-green-50 px-2 py-1 rounded-full"
                      style={{
                        color: "#4ade80",
                        backgroundColor: "rgba(74, 222, 128, 0.1)",
                      }}
                    >
                      +{stat.trend.toFixed(1)}%
                    </span>
                  ) : (
                    <span className="text-red-600 bg-red-50 px-2 py-1 rounded-full">
                      {stat.trend.toFixed(1)}%
                    </span>
                  )}
                </span>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stat.value}
              </p>
            </div>
          </FadeIn>
        );
      })}
    </div>
  );
};

export default StatsGrid;
