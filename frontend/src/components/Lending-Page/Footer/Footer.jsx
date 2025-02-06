import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Twitter,
  Instagram,
  Facebook,
  Linkedin,
  Heart,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-[#61cf73]" />
              <span className="text-2xl font-bold bg-gradient-to-r from-[#61cf73] to-[#6de882] bg-clip-text text-transparent">
                FoodShare
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Join our mission to reduce food waste and fight hunger in our
              communities. Through FoodShare, we connect surplus food with those
              who need it most, creating a more sustainable and caring world.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={Twitter} href="#" />
              <SocialLink icon={Instagram} href="#" />
              <SocialLink icon={Facebook} href="#" />
              <SocialLink icon={Linkedin} href="#" />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-4">
              <FooterLink href="#">About Us</FooterLink>
              <FooterLink href="#">Available Food</FooterLink>
              <FooterLink href="#">Become a Donor</FooterLink>
              <FooterLink href="#">Our Impact</FooterLink>
              <FooterLink href="#">Latest News</FooterLink>
            </ul>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Contact Us</h3>
            <div className="space-y-4">
              <ContactItem
                icon={Phone}
                label="24/7 Support"
                detail="+1 (555) 123-4567"
              />
              <ContactItem
                icon={Mail}
                label="Email Us"
                detail="help@foodshare.org"
              />
              <ContactItem
                icon={MapPin}
                label="Main Office"
                detail="123 Sharing Street, NY 10001"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Join Our Newsletter
            </h3>
            <p className="text-gray-600">
              Stay updated with new opportunities to share food and make a
              difference in your community.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8beb7f]"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-[#61cf73] to-[#6de882] text-white rounded-lg hover:from-[#61cf73] hover:to-[#6de882] transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }) => (
  <li>
    <a
      href={href}
      className="text-gray-600 hover:text-[#8beb7f] transition-colors"
    >
      {children}
    </a>
  </li>
);

const SocialLink = ({ icon: Icon, href }) => (
  <a
    href={href}
    className="w-10 h-10 rounded-full bg-gradient-to-r from-[#61cf73] to-[#6de882] 
    text-white flex items-center justify-center hover:from-[#61cf73] hover:to-[#6de882] 
    transition-all duration-300 transform hover:scale-105"
  >
    <Icon className="w-5 h-5" />
  </a>
);

const ContactItem = ({ icon: Icon, label, detail }) => (
  <div className="flex items-start gap-4">
    <div
      className="w-10 h-10 rounded-full bg-gradient-to-r from-[#61cf73] to-[#6de882] 
    flex items-center justify-center flex-shrink-0"
    >
      <Icon className="w-5 h-5 text-white" />
    </div>
    <div>
      <h4 className="font-semibold text-gray-900">{label}</h4>
      <p className="text-gray-600">{detail}</p>
    </div>
  </div>
);

export default Footer;
