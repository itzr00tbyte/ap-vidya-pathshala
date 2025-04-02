
import { BellRing, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type QuizNotificationProps = {
  title: string;
  subject: string;
  date: string;
  time: string;
  subjectColor?: string;
  isUpcoming?: boolean;
};

const QuizNotification = ({
  title,
  subject,
  date,
  time,
  subjectColor = "blue",
  isUpcoming = false,
}: QuizNotificationProps) => {
  return (
    <div className={cn(
      "relative border rounded-lg p-4 bg-white transition-all hover:shadow-md",
      isUpcoming ? "border-ap-yellow/30" : "border-ap-blue/30"
    )}>
      <div className="flex items-start space-x-3">
        <div className={cn(
          "mt-0.5 p-2 rounded-md",
          isUpcoming ? "bg-ap-yellow/10 text-ap-yellow" : `bg-ap-${subjectColor}/10 text-ap-${subjectColor}`,
        )}>
          <BellRing className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900">{title}</h3>
            {isUpcoming && (
              <span className="bg-ap-yellow/10 text-ap-yellow text-xs px-2 py-0.5 rounded">Upcoming</span>
            )}
          </div>
          <p className="text-sm mt-1 text-gray-500">{subject}</p>
          
          <div className="mt-3 flex items-center justify-between">
            <div className="flex space-x-4 text-xs text-gray-500">
              <div className="flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1" /> {date}
              </div>
              <div className="flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1" /> {time}
              </div>
            </div>
            
            <Button 
              size="sm" 
              variant={isUpcoming ? "outline" : "default"} 
              className={isUpcoming ? "border-ap-yellow text-ap-yellow hover:bg-ap-yellow/10" : ""}
            >
              {isUpcoming ? "Set Reminder" : "Start Quiz"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizNotification;
