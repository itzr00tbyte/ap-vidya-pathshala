
import { BookOpen, ChartBar, Book, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type StudentLearningStats = {
  completedLessons: number;
  avgQuizScore: number;
  timeSpent: string;
  strongSubjects: string[];
  weakSubjects: string[];
};

interface StudentStatsCardProps {
  student: {
    id: string;
    name: string;
    attendance: number;
    learningStats: StudentLearningStats;
  };
  onClose: () => void;
}

const StudentStatsCard = ({ student, onClose }: StudentStatsCardProps) => {
  return (
    <Card className="col-span-1 bg-white shadow-md overflow-hidden">
      <CardHeader className="bg-blue-50">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium text-blue-800">
            Learning Statistics for {student.name}
          </CardTitle>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center justify-center">
            <BookOpen className="h-8 w-8 text-blue-600 mb-2" />
            <p className="text-sm text-gray-500">Completed Lessons</p>
            <p className="text-2xl font-bold text-blue-700">{student.learningStats.completedLessons}</p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center justify-center">
            <ChartBar className="h-8 w-8 text-green-600 mb-2" />
            <p className="text-sm text-gray-500">Avg. Quiz Score</p>
            <p className="text-2xl font-bold text-green-700">{student.learningStats.avgQuizScore}%</p>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 flex flex-col items-center justify-center">
            <Book className="h-8 w-8 text-purple-600 mb-2" />
            <p className="text-sm text-gray-500">Time Spent Learning</p>
            <p className="text-2xl font-bold text-purple-700">{student.learningStats.timeSpent}</p>
          </div>
          
          <div className="bg-orange-50 rounded-lg p-4 flex flex-col items-center justify-center">
            <User className="h-8 w-8 text-orange-600 mb-2" />
            <p className="text-sm text-gray-500">Attendance</p>
            <p className="text-2xl font-bold text-orange-700">{student.attendance}%</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-2">Strong Subjects</h3>
            <div className="space-y-2">
              {student.learningStats.strongSubjects.length > 0 ? (
                student.learningStats.strongSubjects.map((subject, index) => (
                  <div key={index} className="flex items-center bg-green-50 p-2 rounded-md">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                    <span>{subject}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">No strong subjects yet</p>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-2">Areas for Improvement</h3>
            <div className="space-y-2">
              {student.learningStats.weakSubjects.length > 0 ? (
                student.learningStats.weakSubjects.map((subject, index) => (
                  <div key={index} className="flex items-center bg-orange-50 p-2 rounded-md">
                    <div className="h-3 w-3 rounded-full bg-orange-500 mr-2"></div>
                    <span>{subject}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">No weak subjects</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentStatsCard;
