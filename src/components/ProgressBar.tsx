
import { cn } from "@/lib/utils";

type ProgressBarProps = {
  progress: number;
  color?: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
};

const ProgressBar = ({ 
  progress, 
  color = "blue", 
  size = "md", 
  showLabel = true 
}: ProgressBarProps) => {
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-500">Progress</span>
          <span className={cn(
            "text-sm font-medium",
            color === "blue" && "text-blue-600",
            color === "green" && "text-green-600",
            color === "yellow" && "text-yellow-600",
            color === "orange" && "text-orange-600",
            color === "purple" && "text-purple-600",
            color === "red" && "text-red-600",
          )}>
            {progress}%
          </span>
        </div>
      )}
      <div className={cn(
        "w-full bg-gray-100 rounded-full overflow-hidden",
        size === "sm" && "h-1.5",
        size === "md" && "h-2",
        size === "lg" && "h-3",
      )}>
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-500",
            color === "blue" && "bg-blue-600",
            color === "green" && "bg-green-600",
            color === "yellow" && "bg-yellow-600",
            color === "orange" && "bg-orange-600",
            color === "purple" && "bg-purple-600",
            color === "red" && "bg-red-600",
          )}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
