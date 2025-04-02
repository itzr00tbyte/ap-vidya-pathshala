
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface PrivateRouteProps {
  redirectTo?: string;
}

export default function PrivateRoute({ redirectTo = "/login" }: PrivateRouteProps) {
  // Use localStorage directly for initial check before the context is loaded
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}
