
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
            color === "blue" && "text-ap-blue",
            color === "green" && "text-ap-green",
            color === "yellow" && "text-ap-yellow",
            color === "orange" && "text-ap-orange",
            color === "purple" && "text-ap-purple",
            color === "red" && "text-ap-red",
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
            color === "blue" && "bg-ap-blue",
            color === "green" && "bg-ap-green",
            color === "yellow" && "bg-ap-yellow",
            color === "orange" && "bg-ap-orange",
            color === "purple" && "bg-ap-purple",
            color === "red" && "bg-ap-red",
          )}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
