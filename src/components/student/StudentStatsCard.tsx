
import { X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Student } from "@/data/mockStudents";
import { Progress } from "@/components/ui/progress";

interface StudentStatsCardProps {
  student: Student;
  onClose: () => void;
}

const StudentStatsCard = ({ student, onClose }: StudentStatsCardProps) => {
  return (
    <Card className="col-span-1 bg-white shadow-md overflow-hidden">
      <div className="p-6 sm:p-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Learning Statistics for {student.name}</h2>
            <p className="text-gray-500 text-lg">Detailed learning progress and performance metrics</p>
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full h-10 w-10 border-gray-200 hover:bg-gray-100"
            onClick={onClose}
          >
            <X className="h-5 w-5 text-gray-500" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Completed Lessons Card */}
          <div className="bg-blue-50 rounded-lg p-6">
            <p className="text-gray-600 text-lg">Completed Lessons</p>
            <p className="text-4xl font-bold mt-2">{student.learningStats.completedLessons}</p>
          </div>
          
          {/* Average Quiz Score Card */}
          <div className="bg-green-50 rounded-lg p-6">
            <p className="text-gray-600 text-lg">Average Quiz Score</p>
            <p className="text-4xl font-bold mt-2">{student.learningStats.avgQuizScore}%</p>
          </div>
          
          {/* Time Spent Learning Card */}
          <div className="bg-amber-50 rounded-lg p-6">
            <p className="text-gray-600 text-lg">Time Spent Learning</p>
            <p className="text-4xl font-bold mt-2">{student.learningStats.timeSpent}</p>
          </div>
        </div>
        
        {/* Subject Progress Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Subject Progress</h3>
          <div className="space-y-6">
            {student.subjectProgress && student.subjectProgress.map((subject, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-medium">{subject.subject}</span>
                  <span className="text-lg font-bold">{subject.progress}%</span>
                </div>
                <Progress 
                  value={subject.progress}
                  className={`h-3 rounded-full ${
                    subject.progress >= 80 ? 'bg-green-200' :
                    subject.progress >= 60 ? 'bg-amber-200' :
                    'bg-red-200'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Strong Subjects Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Strong Subjects</h3>
            <div className="flex flex-wrap gap-2">
              {student.learningStats.strongSubjects.length > 0 ? (
                student.learningStats.strongSubjects.map((subject, index) => (
                  <span key={index} className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm">
                    {subject}
                  </span>
                ))
              ) : (
                <p className="text-gray-500 italic">No strong subjects yet</p>
              )}
            </div>
          </div>
          
          {/* Needs Improvement Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Needs Improvement</h3>
            <div className="flex flex-wrap gap-2">
              {student.learningStats.weakSubjects.length > 0 ? (
                student.learningStats.weakSubjects.map((subject, index) => (
                  <span key={index} className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm">
                    {subject}
                  </span>
                ))
              ) : (
                <p className="text-gray-500 italic">No weak subjects</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StudentStatsCard;
