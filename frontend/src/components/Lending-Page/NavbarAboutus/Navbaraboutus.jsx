import { ArrowBigLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <>
      <section className="bg-white py-12 px-6 md:px-16 lg:px-24 relative">
        <button
          onClick={handleBack}
          className="absolute top-6 left-6 flex items-center gap-2 text-emerald-600 text-lg font-medium hover:text-emerald-500 transition duration-300"
        >
          <ArrowBigLeft className="w-6 h-6" />
          Back
        </button>
        <br />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="relative w-full md:w-1/2 group">
            <img
              src="https://t4.ftcdn.net/jpg/06/08/50/69/360_F_608506906_sR8DlaueZontJyr68Q8hrsJIZYQCn3e5.jpg"
              alt="Volunteers working"
              className="rounded-lg shadow-lg transform group-hover:scale-105 transition-all duration-500"
            />
          </div>

          <div className="w-full md:w-1/2 text-left space-y-6">
            <h4 className="text-[#6de882] font-medium text-lg opacity-0 animate-fadeIn delay-300">
              Welcome to Harity
            </h4>
            <h2 className="text-gray-800 font-bold text-4xl leading-snug opacity-0 animate-fadeIn delay-500">
              Helping Today <br />
              Helping Tomorrow
            </h2>
            <p className="text-gray-600 text-lg opacity-0 animate-fadeIn delay-700">
              At Harity, we believe in the power of giving and the collective
              strength of communities to make the world a better place. Our goal
              is simple: to connect those who need help with those who are
              willing to give. Together, we can make a significant impact on the
              lives of others and create a better future for all.
            </p>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3 opacity-0 animate-fadeIn delay-800">
                <div className="text-[#61cf73] text-3xl transform hover:rotate-12 transition duration-300">
                  <i className="fas fa-hand-holding-usd"></i>{" "}
                </div>
                <p className="text-gray-700 font-medium">
                  You Can Help a Lot by Donating for Charity
                </p>
              </div>
              <div className="flex items-center gap-3 opacity-0 animate-fadeIn delay-900">
                <div className="text-[#61cf73] text-3xl transform hover:rotate-12 transition duration-300">
                  <i className="fas fa-handshake"></i>
                </div>
                <p className="text-gray-700 font-medium">
                  Our Only Mission is to Fulfill Others Dreams
                </p>
              </div>
            </div>

            <p className="text-gray-600 text-lg opacity-0 animate-fadeIn delay-1000">
              Whether it’s through food donations, clothing drives, or
              supporting local initiatives, Harity is dedicated to making an
              impact. We are constantly looking for ways to collaborate with
              others who share our vision and mission. Our work is powered by
              the kindness and generosity of individuals like you. Together, we
              are stronger.
            </p>

            <button className="mt-4 bg-[#6de882] hover:bg-[#61cf73] text-white font-medium px-6 py-3 rounded shadow-md transition duration-300 transform hover:scale-105">
              Donate Now <span className="text-red-500">♥</span>
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-500 {
          animation-delay: 0.4s;
        }
        .delay-700 {
          animation-delay: 0.5s;
        }
        .delay-800 {
          animation-delay: 0.6s;
        }
        .delay-900 {
          animation-delay: 0.7s;
        }
      `}</style>
    </>
  );
};

export default AboutUs;
