
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSignUp = () => {
    navigate('/signup');
  };

  const footerContent = (
    <div className="mt-2 text-center text-sm">
      Don't have an account?{" "}
      <Button 
        variant="link" 
        className="font-medium text-ev-blue hover:underline p-0"
        onClick={handleSignUp}
      >
        Sign up
      </Button>
    </div>
  );

  return (
    <AuthLayout
      title="Sign in"
      description="Enter your email and password to access your account"
      footerContent={footerContent}
    >
      <LoginForm />
    </AuthLayout>
  );
}
