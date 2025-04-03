
import { Link } from "react-router-dom";

interface NavLink {
  to: string;
  label: string;
}

interface NavLinksProps {
  links: NavLink[];
  isMobile?: boolean;
  onClick?: () => void;
}

const NavLinks = ({ links, isMobile = false, onClick }: NavLinksProps) => {
  const baseClasses = isMobile 
    ? "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-ap-light-blue/10 hover:text-ap-blue"
    : "px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-ap-blue";
  
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={baseClasses}
          onClick={onClick}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
};

export default NavLinks;
