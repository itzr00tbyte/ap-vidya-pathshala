
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/auth/AuthLayout";
import SignupForm from "@/components/auth/SignupForm";

export default function Signup() {
  const navigate = useNavigate();
  
  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupSuccess = () => {
    navigate('/dashboard');
  };

  const headerContent = (
    <div className="flex items-center justify-between mb-2">
      <Button 
        variant="ghost" 
        size="sm" 
        className="flex items-center text-ap-blue" 
        onClick={handleLoginClick}
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to login
      </Button>
      <div className="w-[88px]"></div> {/* Empty div for alignment */}
    </div>
  );

  const footerContent = (
    <div className="mt-2 text-center text-sm">
      Already have an account?{" "}
      <Button 
        variant="link" 
        className="font-medium text-ap-blue hover:underline p-0"
        onClick={handleLoginClick}
      >
        Sign in
      </Button>
    </div>
  );

  return (
    <AuthLayout
      title="Create an account"
      description="Enter your details to create your account"
      headerContent={headerContent}
      footerContent={footerContent}
    >
      <SignupForm onSignupSuccess={handleSignupSuccess} />
    </AuthLayout>
  );
}
