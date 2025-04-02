
import { Link } from "react-router-dom";
import { GraduationCap, User, Bell, Menu, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState("6");

  const handleGradeChange = (value: string) => {
    setSelectedGrade(value);
    // Additional logic for grade change can be added here
  };

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
              
              {isAuthenticated && (
                <>
                  <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-ap-blue">
                    Dashboard
                  </Link>
                  <Link to="/subjects" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-ap-blue">
                    Subjects
                  </Link>
                  
                  {/* Grade selector dropdown */}
                  <div className="relative">
                    <Select value={selectedGrade} onValueChange={handleGradeChange}>
                      <SelectTrigger className="w-[130px] h-9 bg-ap-light-blue/10 border-0 text-ap-blue">
                        <span className="flex items-center">
                          Grade <SelectValue placeholder="6" />
                        </span>
                      </SelectTrigger>
                      <SelectContent>
                        {[6, 7, 8, 9, 10].map((grade) => (
                          <SelectItem key={grade} value={grade.toString()}>
                            Grade {grade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button size="sm" variant="outline" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-ap-red text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      2
                    </span>
                  </Button>
                </>
              )}
              
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="ghost" className="rounded-full">
                      {user?.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-5 w-5" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer w-full flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout} className="text-red-600 cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button asChild variant="ghost" size="sm">
                    <Link to="/login">Sign in</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link to="/signup">Sign up</Link>
                  </Button>
                </div>
              )}
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
            
            {isAuthenticated && (
              <>
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
                
                {/* Mobile grade selector */}
                <div className="px-3 py-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Grade
                  </label>
                  <Select value={selectedGrade} onValueChange={handleGradeChange}>
                    <SelectTrigger className="w-full bg-ap-light-blue/10 border-0">
                      <span className="flex items-center">
                        Grade <SelectValue placeholder="6" />
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      {[6, 7, 8, 9, 10].map((grade) => (
                        <SelectItem key={grade} value={grade.toString()}>
                          Grade {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-ap-light-blue/10 hover:text-ap-blue"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  Log out
                </button>
              </>
            ) : (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center justify-center gap-4">
                  <Button asChild variant="outline" onClick={() => setIsMenuOpen(false)}>
                    <Link to="/login">Sign in</Link>
                  </Button>
                  <Button asChild onClick={() => setIsMenuOpen(false)}>
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
                      alt={user.name}
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
      )}
    </nav>
  );
};

export default Navbar;
