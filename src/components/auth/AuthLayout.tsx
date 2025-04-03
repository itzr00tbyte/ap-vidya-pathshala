
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  footerContent?: ReactNode;
  headerContent?: ReactNode;
}

export default function AuthLayout({ 
  children, 
  title, 
  description,
  footerContent,
  headerContent
}: AuthLayoutProps) {
  const navigate = useNavigate();
  
  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Button variant="link" className="flex items-center space-x-2 p-0" onClick={handleBackToHome}>
            <GraduationCap className="h-12 w-12 text-ap-blue" />
            <span className="text-2xl font-bold text-ap-blue">AP Vidya Pathshala</span>
          </Button>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            {headerContent}
            <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
            {description && <CardDescription className="text-center">{description}</CardDescription>}
          </CardHeader>
          <CardContent>
            {children}
          </CardContent>
          {footerContent && (
            <CardFooter className="flex flex-col">
              {footerContent}
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
