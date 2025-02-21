import React from "react";
import { ArrowBigLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OurMotive = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 via-white to-green-100 flex flex-col items-center py-10 px-6 md:px-16 lg:px-32">
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 flex items-center gap-2 text-emerald-600 text-lg font-medium hover:text-emerald-500 transition duration-300"
      >
        <ArrowBigLeft className="w-6 h-6" />
        Back
      </button>
      <br />
      <div className="w-full max-w-7xl bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-green-700 text-white text-center py-10 px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Our Motive: Reducing Food Wastage
          </h1>
          <p className="text-lg md:text-xl font-light">
            Together, we can make a difference by ensuring no food goes to
            waste.
          </p>
        </div>

        <div className="p-8 md:p-12 flex flex-col lg:flex-row items-start">
          <div className="lg:w-1/2 pr-0 lg:pr-8 mb-8 lg:mb-0">
            <h2 className="text-3xl font-bold text-green-700 mb-6">
              Why We Shouldn’t Waste Food
            </h2>
            <p className="text-gray-700 text-lg mb-4">
              Food wastage is a global issue impacting both people and the
              planet. When food is wasted, the resources used to produce it,
              such as water, energy, and labor, are also wasted.
            </p>
            <p className="text-gray-700 text-lg mb-4">
              At the same time, millions of people worldwide suffer from hunger.
              Reducing food waste helps us redirect surplus food to those in
              need and minimizes our environmental footprint.
            </p>
            <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
              <li>Preserve natural resources by minimizing waste</li>
              <li>Combat hunger by redistributing excess food</li>
              <li>Reduce greenhouse gas emissions from food decomposition</li>
            </ul>
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-green-700 mb-6">
              How to Handle Surplus Food
            </h2>
            <p className="text-gray-700 text-lg mb-4">
              Instead of throwing away surplus food, you can take meaningful
              actions to ensure it reaches those who need it the most.
            </p>
            <ol className="list-decimal list-inside text-gray-700 text-lg space-y-2">
              <li>
                <strong>Donate to NGOs:</strong> Many organizations collect
                surplus food and distribute it to underprivileged communities
                and shelters.
              </li>
              <li>
                <strong>Share with Kids in Need:</strong> Schools, orphanages,
                and local communities often accept food donations to support
                children.
              </li>
              <li>
                <strong>Support Food Banks:</strong> Food banks store and
                redistribute donated food to families and individuals facing
                food insecurity.
              </li>
              <li>
                <strong>Composting:</strong> If the food is no longer edible,
                composting is a great way to recycle nutrients back into the
                soil.
              </li>
            </ol>
          </div>
        </div>

        <div className="bg-green-50 text-center py-10 px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">
            Join Our Mission
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            Be a part of the change by spreading awareness, donating surplus
            food, and supporting initiatives to reduce food waste.
          </p>
          <button className="bg-green-700 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-green-800 transition focus:outline-none focus:ring-4 focus:ring-green-300">
            Learn More & Get Involved
          </button>
        </div>
      </div>
    </div>
  );
};

export default OurMotive;
