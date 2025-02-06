// import React, { useState } from "react";
// import { Mail, Lock, User, Eye, EyeOff, Heart } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const AuthPage = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isLogin) {
//       navigate("/user-dashboard");
//     } else {
//       navigate("/donor-registration");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <div className="text-center mb-8">
//             <div className="flex justify-center mb-4">
//               <Heart className="w-12 h-12 text-[#8beb7f]" />
//             </div>
//             <h2 className="text-3xl font-bold text-gray-800">
//               {isLogin ? "Welcome Back" : "Create Account"}
//             </h2>
//             <p className="text-gray-600 mt-2">Share Food, Share Love</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             {!isLogin && (
//               <div className="relative">
//                 <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
//                 <input
//                   type="text"
//                   className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8beb7f] focus:border-transparent"
//                   placeholder="Full Name"
//                 />
//               </div>
//             )}

//             <div className="relative">
//               <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
//               <input
//                 type="email"
//                 className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8beb7f] focus:border-transparent"
//                 placeholder="Email"
//               />
//             </div>

//             <div className="relative">
//               <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8beb7f] focus:border-transparent"
//                 placeholder="Password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 {showPassword ? (
//                   <EyeOff className="w-5 h-5" />
//                 ) : (
//                   <Eye className="w-5 h-5" />
//                 )}
//               </button>
//             </div>

//             <button className="w-full py-3 bg-[#8beb7f] hover:bg-[#78d86e] text-white rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg">
//               {isLogin ? "Sign In" : "Create Account"}
//             </button>
//           </form>

//           <div className="mt-6 grid grid-cols-3 gap-2 items-center">
//             <div className="border-t border-gray-200"></div>
//             <p className="text-center text-sm text-gray-500">
//               or continue with
//             </p>
//             <div className="border-t border-gray-200"></div>
//           </div>

//           <div className="mt-6 grid grid-cols gap-4 border border-gray-200 rounded-xl">
//             <button className="flex items-center justify-center px-4 py-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 border border-gray-200">
//               <img
//                 src="https://logos-world.net/wp-content/uploads/2020/09/Google-Logo.png"
//                 alt="Google"
//                 className="w-20 h-18"
//               />
//             </button>
//           </div>

//           <div className="mt-8 text-center">
//             <button
//               onClick={() => setIsLogin(!isLogin)}
//               className="text-[#8beb7f] hover:text-[#78d86e] font-medium"
//             >
//               {isLogin
//                 ? "Need an account? Sign up"
//                 : "Have an account? Sign in"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;
import React, { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let response;
      
      if (!isLogin) {
        // Registration
        response = await axios.post("http://localhost:3000/api/donors/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        
        localStorage.setItem("email", formData.email);
        navigate("/otp-verify");
      } else {
        // Login
        const response = await axios.post("http://localhost:3000/api/donors/login",
          { email: formData.email, password: formData.password },
  { withCredentials: true }

      );
        
      if(response.data.success){
        console.log(response.data.data)
      }
       
        
        navigate("/user-dashboard");
      }
    } catch (err) {
      console.error("Auth error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || 
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Heart className="w-12 h-12 text-[#8beb7f]" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-gray-600 mt-2">Share Food, Share Love</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="relative">
                <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8beb7f] focus:border-transparent"
                  placeholder="Full Name"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8beb7f] focus:border-transparent"
                placeholder="Email"
                required
              />
            </div>

            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8beb7f] focus:border-transparent"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#8beb7f] hover:bg-[#78d86e] text-white rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                isLogin ? "Sign In" : "Create Account"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
                setFormData({ name: "", email: "", password: "" });
              }}
              className="text-[#8beb7f] hover:text-[#78d86e] font-medium"
            >
              {isLogin ? "Need an account? Sign up" : "Have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;