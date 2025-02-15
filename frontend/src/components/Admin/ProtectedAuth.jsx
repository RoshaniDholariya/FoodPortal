import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedAdminRoute = ({ children }) => {
  const { user } = useAuth();

  // Ensure only authenticated admins can access the route
  if (!user || user.role !== "admin") {
    return <Navigate to="/Admin-Login" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
