import React from "react";
import { User, Store, MapPin, Phone } from "lucide-react";

const Profile = ({ donorDetails }) => {
  const fullAddress = [
    donorDetails.address,
    donorDetails.city,
    donorDetails.state,
    donorDetails.pincode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="bg-emerald-500 rounded-2xl p-6 mb-8 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400 rounded-full -mr-32 -mt-32 opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-400 rounded-full -ml-24 -mb-24 opacity-30"></div>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
        <div className="bg-white/20 p-4 rounded-full shadow-lg border-2 border-white/30 flex-shrink-0">
          {donorDetails.photo ? (
            <img
              src={donorDetails.photo}
              alt={donorDetails.name}
              className="rounded-full w-20 h-20 object-cover"
            />
          ) : (
            <div className="rounded-full w-20 h-20 bg-emerald-200 flex items-center justify-center">
              <User size={40} className="text-emerald-600" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {donorDetails.name || "Welcome, Donor"}
            </h2>

            <div className="md:self-start">
              <span className="bg-emerald-400/30 text-white px-4 py-1 rounded-full text-sm font-medium border border-white/20 inline-block">
                {donorDetails.donorType || "Donor"}
              </span>
            </div>
          </div>

          {donorDetails.restaurantName && (
            <div className="flex items-center gap-2 mt-2 text-emerald-100">
              <Store size={20} />
              <p className="font-medium">{donorDetails.restaurantName}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
            {fullAddress && (
              <div className="flex items-center gap-2 text-emerald-100">
                <MapPin size={16} className="flex-shrink-0" />
                <p className="truncate">{fullAddress}</p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm">
              ID: {donorDetails.id || "New Donor"}
            </span>{" "}
            <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm">
              <p>{donorDetails.phone}</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
