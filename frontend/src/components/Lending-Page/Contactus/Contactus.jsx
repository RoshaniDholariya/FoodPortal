import React from "react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-green-100 flex flex-col items-center py-10 px-6 md:px-16 lg:px-32">
      <div className="w-full max-w-7xl bg-white shadow-xl rounded-lg flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-green-50 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-700 mb-6 leading-tight">
            Why Reduce Food Wastage?
          </h2>
          <p className="text-gray-700 text-lg mb-4 leading-relaxed">
            Each year, billions of tons of food are wasted while millions go
            hungry. By reducing food waste, we not only fight hunger but also
            conserve essential resources like water and energy.
          </p>
          <p className="text-gray-700 text-lg mb-4 leading-relaxed">
            Join us in our mission to minimize food wastage by spreading
            awareness and taking actionable steps.
          </p>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
            <li>Plan meals and shop wisely</li>
            <li>Donate excess food to those in need</li>
            <li>Compost food scraps to reduce landfill waste</li>
            <li>Support and volunteer for food recovery initiatives</li>
          </ul>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-center text-green-700 mb-6">
            Contact Us
          </h1>
          <form className="space-y-6">
            <div>
              <label
                className="block text-sm font-semibold text-gray-700 mb-2"
                htmlFor="name"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                className="block text-sm font-semibold text-gray-700 mb-2"
                htmlFor="email"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                placeholder="example@domain.com"
              />
            </div>

            <div>
              <label
                className="block text-sm font-semibold text-gray-700 mb-2"
                htmlFor="message"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
                className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                placeholder="Write your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-4 rounded-lg hover:from-green-600 hover:to-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
