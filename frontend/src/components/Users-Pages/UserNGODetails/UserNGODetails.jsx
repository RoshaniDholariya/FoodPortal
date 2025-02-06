import React, { useState, useEffect } from "react";
import { Menu, MapPin, Phone, Mail, Clock, Star, Search } from "lucide-react";
import Sidebar from "../UserSidebar/UserSidebar";

const NGODetails = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const ngos = [
    {
      id: 1,
      name: "Food For All Foundation",
      logo: "/api/placeholder/80/80",
      location: "Bangalore, Karnataka",
      rating: 4.8,
      description:
        "Fighting hunger through sustainable food distribution networks.",
      phone: "+91 98765 43210",
      email: "contact@foodforall.org",
      address: "123 Charity Lane, Bangalore",
      hours: "Mon-Sat: 9:00 AM - 6:00 PM",
      impact: { meals: "15,000", donors: "1,200", served: "50,000+" },
      tags: ["Food Security", "Community Support", "Sustainable Development"],
    },
    {
      id: 2,
      name: "Helping Hands NGO",
      logo: "/api/placeholder/80/80",
      location: "Mumbai, Maharashtra",
      rating: 4.6,
      description: "Providing food security to underprivileged communities.",
      phone: "+91 98765 43211",
      email: "help@helpinghands.org",
      address: "456 Hope Street, Mumbai",
      hours: "Mon-Fri: 8:00 AM - 5:00 PM",
      impact: { meals: "12,000", donors: "900", served: "40,000+" },
      tags: ["Education", "Healthcare", "Poverty Alleviation"],
    },
  ];

  return (
    <div className="flex min-h-screen bg-white-300">
      <div className="fixed inset-y-0 left-0 z-50">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
      <div className={`${isSidebarOpen ? "lg:ml-64" : ""}`}>
        <div className="flex items-center justify-between px-4 lg:px-8 h-16">
          <button
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {ngos.map((ngo) => (
                <div
                  key={ngo.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                              {ngo.name}
                            </h3>
                            <div className="flex items-center text-gray-500 text-sm mt-1">
                              <MapPin className="w-4 h-4 mr-1" />
                              {ngo.location}
                            </div>
                          </div>
                          <div className="flex items-center bg-gray-50 px-2 py-1 rounded"></div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        {ngo.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {ngo.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        {ngo.address}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2 text-gray-400" />
                        {ngo.hours}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NGODetails;
