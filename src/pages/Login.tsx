
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

  const demoAccountsNotice = (
    <div className="bg-amber-50 p-2 rounded-md border border-amber-200 text-amber-800 text-sm">
      <p className="font-medium">Demo Accounts:</p>
      <p>Student: student@example.com | password123</p>
      <p>Teacher: teacher@example.com | teacher123</p>
      <p>Headmaster: headmaster@example.com | headmaster123</p>
    </div>
  );

  const footerContent = (
    <div className="mt-2 text-center text-sm">
      Don't have an account?{" "}
      <Button 
        variant="link" 
        className="font-medium text-ap-blue hover:underline p-0"
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
      headerContent={demoAccountsNotice}
      footerContent={footerContent}
    >
      <LoginForm />
    </AuthLayout>
  );
}
