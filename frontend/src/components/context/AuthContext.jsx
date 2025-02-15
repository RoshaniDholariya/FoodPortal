// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(
    localStorage.getItem("isAdminAuthenticated") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isAdminAuthenticated", isAdminAuthenticated);
  }, [isAdminAuthenticated]);

  const loginAdmin = () => {
    setIsAdminAuthenticated(true);
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem("isAdminAuthenticated");
  };

  return (
    <AuthContext.Provider
      value={{ isAdminAuthenticated, loginAdmin, logoutAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
