import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const ProtectedAdminRoute = ({ children }) => {
  const { admin } = useAuth();
  return admin ? children : <Navigate to="/Admin-Login" />;
};

export default ProtectedAdminRoute;
