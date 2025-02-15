import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  const loginAdmin = (email, password) => {
    if (email === "admin@gmail.com" && password === "admin123") {
      setAdmin({ email });
      localStorage.setItem("admin", JSON.stringify({ email }));
      navigate("/Admin-dashboard");
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  const logoutAdmin = () => {
    setAdmin(null);
    localStorage.removeItem("admin");
    navigate("/Admin-Login");
  };

  return (
    <AuthContext.Provider value={{ admin, loginAdmin, logoutAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
