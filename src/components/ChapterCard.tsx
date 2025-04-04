
import { Book, CheckCircle, Lock, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";

type ChapterStatus = "completed" | "in-progress" | "locked";

type ChapterCardProps = {
  title: string;
  description: string;
  status: ChapterStatus;
  duration: string;
  subjectColor?: string;
  onStartSlideshow?: (title: string) => void;
};

const ChapterCard = ({ 
  title, 
  description, 
  status, 
  duration,
  subjectColor = "blue",
  onStartSlideshow
}: ChapterCardProps) => {
  const navigate = useNavigate();
  const { subjectId } = useParams<{ subjectId: string }>();

  const handleButtonClick = () => {
    if (status === "locked") return;
    
    if (status === "completed") {
      // If onStartSlideshow is provided, use it instead of navigating
      if (onStartSlideshow) {
        onStartSlideshow(title);
      } else {
        // Navigate to slideshow for review
        navigate(`/subject/${subjectId}/slideshow/${encodeURIComponent(title)}`);
      }
    } else {
      // For "in-progress", continue with the original behavior
      console.log("Continue chapter:", title);
    }
  };

  return (
    <div className={cn(
      "border rounded-lg p-5 bg-white transition-all hover:shadow-md",
      status === "completed" && "border-green-200",
      status === "in-progress" && "border-blue-200",
      status === "locked" && "border-gray-200 bg-gray-50",
    )}>
      <div className="flex justify-between">
        <div className="flex items-start space-x-3">
          <div className={cn(
            "mt-0.5 p-2 rounded-md",
            status === "completed" && "bg-green-100 text-green-600",
            status === "in-progress" && `bg-ap-${subjectColor}/10 text-ap-${subjectColor}`,
            status === "locked" && "bg-gray-100 text-gray-400",
          )}>
            {status === "completed" ? (
              <CheckCircle className="h-5 w-5" />
            ) : status === "in-progress" ? (
              <Book className="h-5 w-5" />
            ) : (
              <Lock className="h-5 w-5" />
            )}
          </div>
          <div>
            <h3 className={cn(
              "font-medium",
              status === "locked" && "text-gray-400"
            )}>{title}</h3>
            <p className={cn(
              "text-sm mt-1",
              status === "locked" ? "text-gray-400" : "text-gray-500"
            )}>{description}</p>
          </div>
        </div>
        <div className="text-sm text-gray-500">{duration}</div>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        {status === "locked" ? (
          <span className="text-xs text-gray-400">Complete previous chapters to unlock</span>
        ) : (
          <span className={cn(
            "text-xs",
            status === "completed" ? "text-green-600" : "text-ap-blue"
          )}>
            {status === "completed" ? "Completed" : "In progress"}
          </span>
        )}
        
        <Button 
          size="sm" 
          variant={status === "locked" ? "outline" : "default"}
          disabled={status === "locked"}
          className={cn(
            status === "in-progress" && `bg-ap-${subjectColor}`,
            status === "locked" && "text-gray-400"
          )}
          onClick={handleButtonClick}
        >
          <PlayCircle className="mr-1 h-4 w-4" />
          {status === "completed" ? "Review" : status === "in-progress" ? "Continue" : "Locked"}
        </Button>
      </div>
    </div>
  );
};

export default ChapterCard;
