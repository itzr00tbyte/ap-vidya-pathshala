
import { Link } from "react-router-dom";
import { GraduationCap, User, Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-ap-blue" />
              <span className="text-xl font-bold text-ap-blue">AP Vidya Pathshala</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-ap-blue">
                Home
              </Link>
              <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-ap-blue">
                Dashboard
              </Link>
              <Link to="/subjects" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-ap-blue">
                Subjects
              </Link>
              <Button size="sm" variant="outline" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-ap-red text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  2
                </span>
              </Button>
              <Button size="sm" variant="ghost" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" className="flex items-center" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-ap-light-blue/10 hover:text-ap-blue"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/dashboard" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-ap-light-blue/10 hover:text-ap-blue"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/subjects" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-ap-light-blue/10 hover:text-ap-blue"
              onClick={() => setIsMenuOpen(false)}
            >
              Subjects
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-ap-blue/10 flex items-center justify-center text-ap-blue">
                  <User className="h-5 w-5" />
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">Student User</div>
                <div className="text-sm font-medium text-gray-500">student@example.com</div>
              </div>
              <Button size="sm" variant="outline" className="ml-auto relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-ap-red text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  2
                </span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
