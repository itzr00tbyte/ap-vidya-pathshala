
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type SubjectCardProps = {
  id: string;
  name: string;
  icon: React.ReactNode;
  progress: number;
  color: string;
  chaptersCount: number;
};

const SubjectCard = ({ id, name, icon, progress, color, chaptersCount }: SubjectCardProps) => {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl p-5 card-hover bg-white border",
      color === "blue" && "border-ap-blue/30",
      color === "green" && "border-ap-green/30",
      color === "yellow" && "border-ap-yellow/30",
      color === "orange" && "border-ap-orange/30",
      color === "purple" && "border-ap-purple/30",
      color === "red" && "border-ap-red/30",
    )}>
      <div className="flex justify-between">
        <div className={cn(
          "h-10 w-10 rounded-lg flex items-center justify-center",
          color === "blue" && "bg-ap-blue/10 text-ap-blue",
          color === "green" && "bg-ap-green/10 text-ap-green",
          color === "yellow" && "bg-ap-yellow/10 text-ap-yellow",
          color === "orange" && "bg-ap-orange/10 text-ap-orange",
          color === "purple" && "bg-ap-purple/10 text-ap-purple",
          color === "red" && "bg-ap-red/10 text-ap-red",
        )}>
          {icon}
        </div>
        <span className="text-sm text-gray-500">{chaptersCount} chapters</span>
      </div>
      
      <h3 className="mt-3 text-lg font-semibold">{name}</h3>
      
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Progress</span>
          <span className={cn(
            "font-medium",
            color === "blue" && "text-ap-blue",
            color === "green" && "text-ap-green",
            color === "yellow" && "text-ap-yellow",
            color === "orange" && "text-ap-orange",
            color === "purple" && "text-ap-purple",
            color === "red" && "text-ap-red",
          )}>{progress}%</span>
        </div>
        <div className="mt-1 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={cn(
              "h-full rounded-full",
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
      
      <Link 
        to={`/subject/${id}`} 
        className={cn(
          "mt-4 inline-flex items-center text-sm font-medium",
          color === "blue" && "text-ap-blue",
          color === "green" && "text-ap-green",
          color === "yellow" && "text-ap-yellow",
          color === "orange" && "text-ap-orange",
          color === "purple" && "text-ap-purple",
          color === "red" && "text-ap-red",
        )}
      >
        Continue Learning <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  );
};

export default SubjectCard;
