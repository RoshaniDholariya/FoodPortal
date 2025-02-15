import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const StatCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
    <div className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <h3 className="text-2xl font-bold mt-2 text-gray-900">{value}</h3>
        </div>
        <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-3 rounded-xl">
          <Icon className="h-6 w-6 text-teal-600" />
        </div>
      </div>
      <div className="mt-4 flex items-center">
        {trend > 0 ? (
          <ArrowUpRight className="h-4 w-4 text-emerald-500" />
        ) : (
          <ArrowDownRight className="h-4 w-4 text-rose-500" />
        )}
        <span
          className={`text-sm ml-1 font-medium ${
            trend > 0 ? "text-emerald-500" : "text-rose-500"
          }`}
        >
          {Math.abs(trend)}% from last month
        </span>
      </div>
    </div>
    <div
      className={`h-1 w-full ${trend > 0 ? "bg-emerald-500" : "bg-rose-500"}`}
    />
  </div>
);

const StatisticsGrid = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatisticsGrid;
