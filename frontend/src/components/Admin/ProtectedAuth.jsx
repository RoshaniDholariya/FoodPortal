// src/components/Admin/ProtectedAdminRoute.js
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedAdminRoute = ({ children }) => {
  const { isAdminAuthenticated } = useAuth();

  return isAdminAuthenticated ? children : <Navigate to="/Admin-Login" />;
};

export default ProtectedAdminRoute;
