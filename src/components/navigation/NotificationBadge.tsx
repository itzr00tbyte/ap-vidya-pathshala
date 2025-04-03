
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotificationBadgeProps {
  count: number;
}

const NotificationBadge = ({ count }: NotificationBadgeProps) => {
  return (
    <Button size="sm" variant="outline" className="relative">
      <Bell className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-ap-red text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          {count}
        </span>
      )}
    </Button>
  );
};

export default NotificationBadge;
