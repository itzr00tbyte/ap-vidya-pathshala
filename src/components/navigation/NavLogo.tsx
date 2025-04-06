
import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <GraduationCap className="h-8 w-8 text-blue-600" />
      <span className="text-xl font-bold text-blue-600">E Vidhya Pathshala</span>
    </Link>
  );
};

export default NavLogo;
