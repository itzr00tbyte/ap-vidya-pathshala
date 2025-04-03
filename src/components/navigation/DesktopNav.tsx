
import { useAuth } from "@/context/AuthContext";
import NavLinks from "./NavLinks";
import GradeSelector from "./GradeSelector";
import NotificationBadge from "./NotificationBadge";
import UserMenu from "./UserMenu";
import AuthButtons from "./AuthButtons";

interface DesktopNavProps {
  isAuthenticated: boolean;
  selectedGrade: string;
  onGradeChange: (value: string) => void;
  onLogout: () => void;
}

const DesktopNav = ({
  isAuthenticated,
  selectedGrade,
  onGradeChange,
  onLogout,
}: DesktopNavProps) => {
  const homeLink = { to: "/", label: "Home" };
  
  const authenticatedLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/subjects", label: "Subjects" }
  ];

  return (
    <div className="hidden md:block">
      <div className="ml-10 flex items-center space-x-4">
        <NavLinks links={[homeLink]} />
        
        {isAuthenticated && (
          <>
            <NavLinks links={authenticatedLinks} />
            
            {/* Grade selector dropdown */}
            <div className="relative">
              <GradeSelector selectedGrade={selectedGrade} onGradeChange={onGradeChange} />
            </div>
            
            <NotificationBadge count={2} />
          </>
        )}
        
        {isAuthenticated ? (
          <UserMenu onLogout={onLogout} />
        ) : (
          <AuthButtons />
        )}
      </div>
    </div>
  );
};

export default DesktopNav;
