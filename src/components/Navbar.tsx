
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import NavLogo from "./navigation/NavLogo";
import DesktopNav from "./navigation/DesktopNav";
import MobileNavToggle from "./navigation/MobileNavToggle";
import MobileMenu from "./navigation/MobileMenu";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState("6");

  const handleGradeChange = (value: string) => {
    setSelectedGrade(value);
    // Additional logic for grade change can be added here
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLogo />
          </div>
          
          <DesktopNav 
            isAuthenticated={isAuthenticated}
            selectedGrade={selectedGrade}
            onGradeChange={handleGradeChange}
            onLogout={logout}
          />
          
          <MobileNavToggle onClick={toggleMenu} />
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu 
        isOpen={isMenuOpen}
        isAuthenticated={isAuthenticated}
        selectedGrade={selectedGrade}
        onGradeChange={handleGradeChange}
        onClose={closeMenu}
        onLogout={logout}
      />
    </nav>
  );
};

export default Navbar;
