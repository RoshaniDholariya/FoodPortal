import React from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Check,
  X,
  User,
  Phone,
  Package,
} from "lucide-react";

const DonationModal = ({ donation, onClose, onAccept }) => {
  if (!donation) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="bg-emerald-600 px-6 py-4 sticky top-0">
          <div className="flex justify-between items-center">
            <h2 className="text-white font-semibold text-xl">
              Donation #{donation.id}
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-emerald-100"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Donor Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-sm text-gray-500">Donor Name</p>
                  <p className="text-gray-700">{donation.donor.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-sm text-gray-500">Contact Number</p>
                  <p className="text-gray-700">{donation.donor.phone}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Food Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-sm text-gray-500">Food Type</p>
                  <p className="text-gray-700">{donation.foodType}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="text-gray-700">{donation.foodCategory}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Number of Dishes</p>
                <p className="text-gray-700">{donation.noOfDishes} servings</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Important Dates
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start space-x-2">
                <Clock className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-sm text-gray-500">Preparation Date</p>
                  <p className="text-gray-700">
                    {" "}
                    {new Date(donation.preparationDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-sm text-gray-500">Expiry Date</p>
                  <p className="text-gray-700">
                    {new Date(donation.expiryDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              {donation.deliveryType === "pickup"
                ? "Pickup Details"
                : "Delivery Information"}
            </h3>
            <div className="flex items-start space-x-2">
              <MapPin className="w-5 h-5 text-emerald-600 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="text-gray-700">{donation.address}</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              onClick={() => onAccept(donation.id)}
              disabled={donation.status === "accepted"}
              className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg ${
                donation.status === "accepted"
                  ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
              }`}
            >
              {donation.status === "accepted" ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Accepted
                </>
              ) : (
                "Accept Donation"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;
