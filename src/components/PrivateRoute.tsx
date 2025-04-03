
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

interface PrivateRouteProps {
  redirectTo?: string;
  roles?: Array<"student" | "teacher" | "headmaster" | "admin">;
}

export default function PrivateRoute({ 
  redirectTo = "/login",
  roles
}: PrivateRouteProps) {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  
  useEffect(() => {
    // Give auth context a moment to initialize
    const checkAuth = setTimeout(() => {
      setIsChecking(false);
    }, 500);
    
    return () => clearTimeout(checkAuth);
  }, []);
  
  // Show nothing while checking authentication
  if (isChecking) {
    return null;
  }
  
  // First check if user is authenticated
  if (!isAuthenticated) {
    // Redirect to login with return path
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }
  
  // Then check if specific roles are required and if the user has the necessary role
  if (roles && user && !roles.includes(user.role)) {
    // Redirect teachers and headmasters to dashboard, admins to admin portal
    const fallbackPath = user.role === "admin" ? "/admin-portal" : "/dashboard";
    return <Navigate to={fallbackPath} replace state={{ from: location }} />;
  }

  return <Outlet />;
}
