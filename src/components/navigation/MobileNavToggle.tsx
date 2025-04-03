
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileNavToggleProps {
  onClick: () => void;
}

const MobileNavToggle = ({ onClick }: MobileNavToggleProps) => {
  return (
    <div className="md:hidden">
      <Button variant="ghost" className="flex items-center" onClick={onClick}>
        <Menu className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default MobileNavToggle;
