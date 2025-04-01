import React, { useState } from "react";
import { X } from "lucide-react";

const Dialog = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-lg w-full max-w-md mx-4 p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  );
};

const DonorDetailsDialog = ({ donor, isOpen, onClose }) => {
  console.log(donor);
  if (!donor) return null;

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <div className="border-b pb-4">
          <h3 className="text-xl font-semibold text-gray-900">{donor.name}</h3>
          <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
            {donor.donorType}
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-500">Email</label>
            <p className="mt-1 text-sm text-gray-900">{donor.email}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Phone</label>
            <p className="mt-1 text-sm text-gray-900">{donor.phone}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">
              Total Donations
            </label>
            <p className="mt-1 text-sm text-gray-900">{donor.donations}</p>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default DonorDetailsDialog;
