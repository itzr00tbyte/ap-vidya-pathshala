
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AuthButtons = () => {
  return (
    <div className="flex items-center space-x-2">
      <Button asChild variant="ghost" size="sm">
        <Link to="/login">Sign in</Link>
      </Button>
      <Button asChild size="sm">
        <Link to="/signup">Sign up</Link>
      </Button>
    </div>
  );
};

export default AuthButtons;
