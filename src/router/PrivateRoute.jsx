import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../hooks/useAuth";

const ProtectedRoute = () => {
  const isAuthenticated = getToken();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
