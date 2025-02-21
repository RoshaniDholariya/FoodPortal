import React from "react";
import {
  Heart,
  Check,
  ArrowRight,
  Users,
  GanttChart,
  Trophy,
} from "lucide-react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative w-full py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-4">
              <StatItem
                number="50K+"
                label="Meals Shared"
                icon={<Heart className="w-8 h-8 text-[#61cf73]" />}
              />
              <StatItem
                number="10K+"
                label="Active Donors"
                icon={<Users className="w-8 h-8 text-[#6de882]" />}
              />
              <StatItem
                number="95%"
                label="Food Saved"
                icon={<GanttChart className="w-8 h-8 text-[#8beb7f]" />}
              />

              <div className="bg-gradient-to-br from-[#61cf73] to-[#6de882] p-8 text-white">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold leading-tight">
                    Join Our Mission to Share Food
                  </h3>
                  <Link to="/donor-registration">
                    <button className="flex items-center space-x-2 text-lg font-medium group">
                      <span>Become a Donor</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <div className="absolute -top-8 -left-8 z-20 bg-gradient-to-br from-[#61cf73] to-[#6de882] rounded-full p-6">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="https://media.istockphoto.com/id/1498170916/photo/a-couple-is-taking-a-bag-of-food-at-the-food-and-clothes-bank.jpg?s=612x612&w=0&k=20&c=0fnD_g46lvoZ5NdzX5zYOSM4PzM95ezfs5uMe9D1QKs="
                  alt="Food sharing community"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-8 md:pl-8 pt-16 md:pt-0">
              <div>
                <h3 className="text-[#61cf73] text-lg font-medium mb-4">
                  About FoodShare
                </h3>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Connecting Communities Through Food Sharing
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  "Reduce food waste in our communities",
                  "Connect donors with those in need",
                  "Ensure safe and timely food distribution",
                  "Build a more sustainable future",
                ].map((text, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <Check className="w-6 h-6 text-[#6de882]" />
                    </div>
                    <span className="text-lg text-gray-700">{text}</span>
                  </div>
                ))}
              </div>

              <p className="text-gray-600 leading-relaxed">
                FoodShare is a community-driven platform dedicated to reducing
                food waste while helping those in need. We connect restaurants,
                grocery stores, and individuals with surplus food to local
                communities and organizations, making food sharing simple,
                efficient, and impactful.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ number, label, icon }) => (
  <div className="p-8 text-center">
    <div className="space-y-4">
      <div className="flex justify-center">{icon}</div>
      <h3 className="text-4xl font-bold bg-gradient-to-r from-[#61cf73] to-[#6de882] bg-clip-text text-transparent">
        {number}
      </h3>
      <div className="relative">
        <div className="h-1 w-12 bg-gradient-to-r from-[#61cf73] to-[#6de882] mx-auto mb-3" />
        <p className="text-gray-600 font-medium">{label}</p>
      </div>
    </div>
  </div>
);

export default AboutPage;
