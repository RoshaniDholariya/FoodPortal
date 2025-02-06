import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user || {});
  console.log(currentUser.data.user.role)
  useEffect(() => {
    if (
      !currentUser.data.user.role ||
      currentUser.data.user.role !== "ADMIN"
    ) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return currentUser.data.user.role === "ADMIN" ? children : null;
};

export default AdminRoute;
