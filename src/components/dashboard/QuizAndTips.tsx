
import React from "react";
import { FileText, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuizNotification from "@/components/QuizNotification";
import { Quiz } from "@/types/dashboard";

interface QuizAndTipsProps {
  quizzes: Quiz[];
}

const QuizAndTips = ({ quizzes }: QuizAndTipsProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Upcoming Quizzes</h2>
        <Button variant="ghost" size="sm" className="text-ap-blue">
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {quizzes.map((quiz, index) => (
          <QuizNotification 
            key={index}
            title={quiz.title}
            subject={quiz.subject}
            date={quiz.date}
            time={quiz.time}
            subjectColor={quiz.subjectColor}
            isUpcoming={quiz.isUpcoming}
          />
        ))}
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Study Tips</h2>
        <div className="bg-gradient-to-br from-ap-blue/10 to-ap-green/10 rounded-xl p-5 border border-blue-100">
          <div className="flex justify-between">
            <div className="p-2 bg-white/80 rounded-lg text-ap-blue">
              <FileText className="h-5 w-5" />
            </div>
            <div className="p-2 bg-white/80 rounded-lg text-ap-blue">
              <PieChart className="h-5 w-5" />
            </div>
          </div>
          <h3 className="mt-3 font-medium">Study Planner</h3>
          <p className="text-sm text-gray-600 mt-2">
            Create a study schedule to balance all subjects. Focus on weaker areas.
          </p>
          <Button variant="outline" size="sm" className="mt-4 w-full border-ap-blue text-ap-blue">
            Create Study Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizAndTips;
