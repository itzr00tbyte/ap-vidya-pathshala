
import { Link } from "react-router-dom";
import { User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import NavLinks from "./NavLinks";
import GradeSelector from "./GradeSelector";

interface MobileMenuProps {
  isOpen: boolean;
  isAuthenticated: boolean;
  selectedGrade: string;
  onGradeChange: (value: string) => void;
  onClose: () => void;
  onLogout: () => void;
}

const MobileMenu = ({
  isOpen,
  isAuthenticated,
  selectedGrade,
  onGradeChange,
  onClose,
  onLogout,
}: MobileMenuProps) => {
  const { user } = useAuth();
  
  if (!isOpen) return null;
  
  const homeLink = { to: "/", label: "Home" };
  
  const authenticatedLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/subjects", label: "Subjects" }
  ];
  
  const profileLinks = [
    { to: "/profile", label: "Profile" }
  ];

  return (
    <div className="md:hidden bg-white shadow-lg animate-fade-in">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <NavLinks links={[homeLink]} isMobile={true} onClick={onClose} />
        
        {isAuthenticated && (
          <>
            <NavLinks links={authenticatedLinks} isMobile={true} onClick={onClose} />
            <GradeSelector 
              selectedGrade={selectedGrade} 
              onGradeChange={onGradeChange} 
              isMobile={true} 
            />
          </>
        )}
        
        {isAuthenticated ? (
          <>
            <NavLinks links={profileLinks} isMobile={true} onClick={onClose} />
            <button 
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
            >
              Log out
            </button>
          </>
        ) : (
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center justify-center gap-4">
              <Button asChild variant="outline" onClick={onClose}>
                <Link to="/login">Sign in</Link>
              </Button>
              <Button asChild onClick={onClose}>
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {isAuthenticated && (
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              {user?.avatar ? (
                <img 
                  className="h-10 w-10 rounded-full object-cover" 
                  src={user.avatar} 
                  alt={user.name || "User"}
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-ap-blue/10 flex items-center justify-center text-ap-blue">
                  <User className="h-5 w-5" />
                </div>
              )}
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800">{user?.name}</div>
              <div className="text-sm font-medium text-gray-500">{user?.email}</div>
            </div>
            <Button size="sm" variant="outline" className="ml-auto relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-ap-red text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                2
              </span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
