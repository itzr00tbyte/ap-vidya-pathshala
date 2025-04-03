
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface PrivateRouteProps {
  redirectTo?: string;
  roles?: Array<"student" | "teacher" | "headmaster">;
}

export default function PrivateRoute({ 
  redirectTo = "/login",
  roles
}: PrivateRouteProps) {
  const location = useLocation();
  const { user } = useAuth();
  
  // First check if user is authenticated
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }
  
  // Then check if specific roles are required and if the user has the necessary role
  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
