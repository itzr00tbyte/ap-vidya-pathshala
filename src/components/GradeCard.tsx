
import { Link } from "react-router-dom";
import { Book, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type GradeCardProps = {
  grade: number;
  title: string;
  description: string;
  color: string;
  icon?: React.ReactNode;
};

const GradeCard = ({ grade, title, description, color, icon }: GradeCardProps) => {
  return (
    <motion.div 
      className={cn(
        "relative overflow-hidden rounded-xl p-6 card-hover",
        color === "blue" && "bg-ap-blue/10",
        color === "green" && "bg-ap-green/10",
        color === "yellow" && "bg-ap-yellow/10",
        color === "orange" && "bg-ap-orange/10",
        color === "red" && "bg-ap-red/10",
      )}
      whileHover={{ 
        scale: 1.03,
        transition: { duration: 0.2 } 
      }}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center space-x-2">
          <div className={cn(
            "p-2 rounded-full",
            color === "blue" && "bg-ap-blue/20 text-ap-blue",
            color === "green" && "bg-ap-green/20 text-ap-green",
            color === "yellow" && "bg-ap-yellow/20 text-ap-yellow",
            color === "orange" && "bg-ap-orange/20 text-ap-orange",
            color === "red" && "bg-ap-red/20 text-ap-red",
          )}>
            {icon || <Book className="h-5 w-5" />}
          </div>
          <h3 className={cn(
            "text-lg font-semibold",
            color === "blue" && "text-ap-blue",
            color === "green" && "text-ap-green",
            color === "yellow" && "text-ap-yellow",
            color === "orange" && "text-ap-orange",
            color === "red" && "text-ap-red",
          )}>
            {title}
          </h3>
        </div>
        
        <p className="mt-2 text-gray-600 text-sm">{description}</p>
        
        <Link 
          to={`/dashboard?grade=${grade}`} 
          className={cn(
            "mt-4 inline-flex items-center text-sm font-medium",
            color === "blue" && "text-ap-blue",
            color === "green" && "text-ap-green",
            color === "yellow" && "text-ap-yellow",
            color === "orange" && "text-ap-orange",
            color === "red" && "text-ap-red",
          )}
        >
          Enter Class <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      <div className={cn(
        "absolute -bottom-8 -right-8 h-24 w-24 rounded-full opacity-20",
        color === "blue" && "bg-ap-blue",
        color === "green" && "bg-ap-green",
        color === "yellow" && "bg-ap-yellow",
        color === "orange" && "bg-ap-orange",
        color === "red" && "bg-ap-red",
      )}/>
      
      <div className={cn(
        "absolute top-3 right-3 text-3xl font-bold opacity-10",
        color === "blue" && "text-ap-blue",
        color === "green" && "text-ap-green",
        color === "yellow" && "text-ap-yellow",
        color === "orange" && "text-ap-orange",
        color === "red" && "text-ap-red",
      )}>
        {grade}
      </div>
    </motion.div>
  );
};

export default GradeCard;
