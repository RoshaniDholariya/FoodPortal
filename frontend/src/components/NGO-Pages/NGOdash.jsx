import React, { useState } from "react";
import {
  Menu,
  User,
  ClipboardList,
  BookOpenCheck,
  UserRoundX,
} from "lucide-react";
import Sidebar from "./NGOsidebar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const conservationData = [
    { name: "Jan", trees: 400, biodiversity: 80 },
    { name: "Feb", trees: 300, biodiversity: 85 },
    { name: "Mar", trees: 600, biodiversity: 90 },
    { name: "Apr", trees: 800, biodiversity: 88 },
    { name: "May", trees: 500, biodiversity: 92 },
    { name: "Jun", trees: 900, biodiversity: 95 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-50">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div className="lg:ml-64">
        <header className="pt-2 px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <br />
              <h1 className="text-4xl font-bold mb-3 text-emerald-900">
                Serving Hope, One Meal at a Time.
              </h1>
              <p className="text-emerald-600">
                Preserving Earth's lungs, one tree at a time
              </p>
            </div>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <button
                onClick={toggleSidebar}
                className="text-emerald-600 hover:text-emerald-900 lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              {
                title: "Total Donations",
                value: "847,291",
                icon: ClipboardList,
              },
              {
                title: "Accepted Donation",
                value: "1,203",
                icon: BookOpenCheck,
              },
              {
                title: "Available Donations",
                value: "25K tons",
                icon: UserRoundX,
              },
              {
                title: "Total Donors",
                value: "1.2K acres",
                icon: User,
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all cursor-pointer hover:shadow-xl border border-emerald-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-emerald-600">{stat.title}</p>
                    <h3 className="text-3xl font-bold mt-1 text-emerald-900">
                      {stat.value}
                    </h3>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-emerald-100">
            <h2 className="text-2xl font-bold mb-6 text-emerald-900">
              Forest Health Index
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={conservationData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#d1fae5"
                    vertical={false}
                  />
                  <XAxis dataKey="name" stroke="#059669" />
                  <YAxis stroke="#059669" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="trees"
                    stroke="#059669"
                    strokeWidth={3}
                    dot={{ r: 6, fill: "#059669" }}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="biodiversity"
                    stroke="#0d9488"
                    strokeWidth={3}
                    dot={{ r: 6, fill: "#0d9488" }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
