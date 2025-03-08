import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Lending-Page/Dashboard/Dashboard";
import NavbarAboutus from "./components/Lending-Page/NavbarAboutus/Navbaraboutus";
import AuthPage from "./components/Lending-Page/Authentication/Authenticationpage";
import UserDashboard from "./components/Users-Pages/Dashboard/UserDashboard";
import HowItWorks from "./components/Lending-Page/How-it-work/How-it-work";
import ContactUs from "./components/Lending-Page/Contactus/Contactus";
import OurMotive from "./components/Lending-Page/Ourmotive/Ourmotive";
import WantToDonate from "./components/Lending-Page/Want-to-donate/want-to-donate";
import Needfood from "./components/Lending-Page/Need-food/Need-food";
import FoodDonationForm from "./components/Users-Pages/Donation-form/Donationform";
import UserDonationHistory from "./components/Users-Pages/UserDonationHistory/UserDonationHistory";
import UserNGODetails from "./components/Users-Pages/UserNGODetails/UserNGODetails";
import Userprofile from "./components/Users-Pages/User-Profile/Userprofile";
import NGODashboard from "./components/NGO-Pages/NGOdash";
import NGODonationpage from "./components/NGO-Pages/DonationPage/NGO-Donationpage";
import NGOProfile from "./components/NGO-Pages/NGO-Profile/NGO-Profile";
import NGOAccepteddonation from "./components/NGO-Pages/NGO-Accepteddonation/NGO-Accepteddonation";
import NGODonorDetails from "./components/NGO-Pages/NGO-DonorDeatials/NGO-DonorDetails";
import AdminDashboard from "./components/Admin/AdminDashboard";
// import AdminRoute from "./components/Admin/AdminRoute";
import AdminLogin from "./components/Admin/AdminLogin";
import DonorRegistrationForm from "./components/Lending-Page/Donorregistration/Donorregistrattion";
import NGOAuthentication from "./components/Lending-Page/Authentication/NGO-Authentication";
import NGOLogin from "./components/Lending-Page/Authentication/NGO-Login";
import OTPVerify from "./components/Lending-Page/Authentication/OTP-Verify";
import RegistrationSuccess from "./components/Lending-Page/Authentication/Register_success";
import LocationPicker from "./components/Users-Pages/Donation-form/LocationPicker";
import AdminNGODetails from "./components/Admin/NGO/NGODetails";
import AdminDonorDetails from "./components/Admin/Donor/AdminDonor";
import { AuthProvider } from "./components/context/Authcontext";
import ProtectedAdminRoute from "./components/Admin/ProtectedAuth";
import Charts from "./components/Users-Pages/Dashboard/Charts";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/aboutus" element={<NavbarAboutus />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/ourmotive" element={<OurMotive />} />
        <Route path="/want-to-donar" element={<WantToDonate />} />
        <Route path="/need-food" element={<Needfood />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/otp-verify" element={<OTPVerify />} />
        <Route path="/data-register" element={<RegistrationSuccess />} />
        <Route path="/donor-registration" element={<DonorRegistrationForm />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/user-donation-form" element={<FoodDonationForm />} />
        <Route path="/mapbox" element={<LocationPicker />} />
        <Route
          path="/user-donation-history"
          element={<UserDonationHistory />}
        />
        <Route path="/user-ngo-details" element={<UserNGODetails />} />
        <Route path="/user-profile" element={<Userprofile />} />
        <Route path="/chart-analysis" element={<Charts />}/>
        <Route path="/NGO-register" element={<NGOAuthentication />} />
        <Route path="/NGO-login" element={<NGOLogin />} />
        <Route path="/NGO-dashboard" element={<NGODashboard />} />
        <Route path="/NGO-donationpage" element={<NGODonationpage />} />
        <Route path="/NGO-profilepage" element={<NGOProfile />} />
        <Route
          path="/NGO-accepted-donationpage"
          element={<NGOAccepteddonation />}
        />
        <Route path="/NGO-Doner-detailspage" element={<NGODonorDetails />} />
        <Route path="/Admin-Login" element={<AdminLogin />} />
        <Route
          path="/Admin-dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/Admin-NGO"
          element={
            <ProtectedAdminRoute>
              <AdminNGODetails />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/Admin-Donor"
          element={
            <ProtectedAdminRoute>
              <AdminDonorDetails />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;
