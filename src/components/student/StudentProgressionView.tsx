
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart2, 
  BookOpen, 
  Calendar, 
  Clock, 
  Award, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight 
} from "lucide-react";
import { Student } from "@/data/mockStudents";
import ProgressBar from "@/components/ProgressBar";

interface StudentProgressionViewProps {
  student: Student;
  onClose?: () => void;
}

const StudentProgressionView = ({ student, onClose }: StudentProgressionViewProps) => {
  const navigate = useNavigate();
  
  // Calculate average progress for a student across all subjects
  const getAverageProgress = () => {
    if (!student.subjectProgress || student.subjectProgress.length === 0) {
      return 0;
    }
    
    const total = student.subjectProgress.reduce((sum, subject) => sum + subject.progress, 0);
    return Math.round(total / student.subjectProgress.length);
  };
  
  // Generate mock performance trend data for the student
  const generateTrendData = () => {
    const trends = [];
    let baseValue = student.learningStats.avgQuizScore - 10;
    
    for (let i = 0; i < 6; i++) {
      // Generate a value that shows an upward trend with small fluctuations
      baseValue = Math.min(100, Math.max(60, baseValue + Math.floor(Math.random() * 8) - 2));
      trends.push({
        month: getMonthName(i),
        score: baseValue
      });
    }
    
    return trends;
  };
  
  // Helper to get month name
  const getMonthName = (monthsAgo: number) => {
    const date = new Date();
    date.setMonth(date.getMonth() - monthsAgo);
    return date.toLocaleString('default', { month: 'short' });
  };
  
  const trendsData = generateTrendData().reverse();
  const averageProgress = getAverageProgress();
  
  // Calculate change from previous month
  const currentMonthScore = trendsData[trendsData.length - 1].score;
  const previousMonthScore = trendsData[trendsData.length - 2].score;
  const changePercentage = Math.round(((currentMonthScore - previousMonthScore) / previousMonthScore) * 100);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
            <p className="text-gray-600">Grade {student.grade} - Section {student.section}</p>
            <div className="flex items-center mt-1 text-sm">
              <Badge 
                className={
                  student.performance === "Excellent" ? "bg-green-100 text-green-800" :
                  student.performance === "Good" ? "bg-blue-100 text-blue-800" :
                  "bg-yellow-100 text-yellow-800"
                }
              >
                {student.performance}
              </Badge>
              <span className="mx-2">•</span>
              <span className="text-gray-600">{student.email}</span>
            </div>
          </div>
          
          {onClose && (
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 border-l-4 border-blue-500">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Overall Progress</p>
                <p className="text-2xl font-bold mt-1">{averageProgress}%</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <Progress value={averageProgress} className="mt-2" />
          </Card>
          
          <Card className="p-4 border-l-4 border-green-500">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Quiz Score</p>
                <p className="text-2xl font-bold mt-1">{student.learningStats.avgQuizScore}%</p>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <Award className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              {changePercentage >= 0 ? (
                <div className="flex items-center text-green-600 text-sm">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>+{changePercentage}% from last month</span>
                </div>
              ) : (
                <div className="flex items-center text-red-600 text-sm">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  <span>{changePercentage}% from last month</span>
                </div>
              )}
            </div>
          </Card>
          
          <Card className="p-4 border-l-4 border-purple-500">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Completed Lessons</p>
                <p className="text-2xl font-bold mt-1">{student.learningStats.completedLessons}</p>
              </div>
              <div className="bg-purple-100 p-2 rounded-full">
                <BookOpen className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Out of {student.learningStats.completedLessons + Math.floor(student.learningStats.completedLessons * 0.3)} total lessons
            </div>
          </Card>
          
          <Card className="p-4 border-l-4 border-amber-500">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Attendance</p>
                <p className="text-2xl font-bold mt-1">{student.attendance}%</p>
              </div>
              <div className="bg-amber-100 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-amber-600" />
              </div>
            </div>
            <div className="mt-2 text-sm">
              <span className={student.attendance > 90 ? "text-green-600" : "text-amber-600"}>
                {student.attendance > 90 ? "Excellent" : "Needs improvement"}
              </span>
            </div>
          </Card>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Subject Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {student.subjectProgress && student.subjectProgress.map((subject, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{subject.subject}</span>
                  <span>{subject.progress}%</span>
                </div>
                <ProgressBar 
                  progress={subject.progress} 
                  color={
                    subject.progress >= 75 ? "green" : 
                    subject.progress >= 40 ? "blue" : "yellow"
                  }
                  size="md"
                  showLabel={false}
                />
              </div>
            ))}
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <Tabs defaultValue="performance">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="strengths">Strengths & Weaknesses</TabsTrigger>
            <TabsTrigger value="time">Time Spent</TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="space-y-4 pt-4">
            <h3 className="text-lg font-medium">Performance Trend</h3>
            <div className="h-64 w-full">
              <div className="h-full flex items-end">
                {trendsData.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      style={{ height: `${item.score}%` }} 
                      className={`w-8 ${
                        index === trendsData.length - 1 ? 'bg-blue-500' : 'bg-blue-200'
                      } rounded-t-md`}
                    ></div>
                    <div className="mt-2 text-xs">{item.month}</div>
                    <div className="mt-1 text-xs font-medium">{item.score}%</div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-600 italic">
              {changePercentage >= 0 
                ? `${student.name} has shown a ${changePercentage}% improvement in performance over the last month.`
                : `${student.name}'s performance has decreased by ${Math.abs(changePercentage)}% over the last month.`}
            </p>
          </TabsContent>
          
          <TabsContent value="strengths" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Strong Subjects</h3>
                {student.learningStats.strongSubjects.length > 0 ? (
                  <div className="space-y-2">
                    {student.learningStats.strongSubjects.map((subject, index) => (
                      <div key={index} className="flex items-center bg-green-50 p-3 rounded-md">
                        <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                        <span>{subject}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No strong subjects identified yet</p>
                )}
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Areas for Improvement</h3>
                {student.learningStats.weakSubjects.length > 0 ? (
                  <div className="space-y-2">
                    {student.learningStats.weakSubjects.map((subject, index) => (
                      <div key={index} className="flex items-center bg-amber-50 p-3 rounded-md">
                        <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
                        <span>{subject}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No weak subjects identified</p>
                )}
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg mt-4">
              <h4 className="font-medium text-blue-800 mb-2">Teacher Recommendations</h4>
              <p className="text-sm text-blue-700">
                {student.learningStats.weakSubjects.length > 0 
                  ? `Focus on improving ${student.learningStats.weakSubjects.join(', ')} with additional practice exercises and remedial sessions.`
                  : `Continue to maintain consistent performance across all subjects.`
                }
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="time" className="space-y-4 pt-4">
            <h3 className="text-lg font-medium mb-3">Learning Time Analysis</h3>
            <Card className="p-4">
              <div className="flex items-center mb-4">
                <Clock className="h-5 w-5 text-indigo-500 mr-2" />
                <span className="font-medium">Total Time Spent Learning:</span>
                <span className="ml-2">{student.learningStats.timeSpent}</span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Mathematics</span>
                    <span>{Math.floor(Math.random() * 30) + 20} hours</span>
                  </div>
                  <Progress value={Math.floor(Math.random() * 30) + 70} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Science</span>
                    <span>{Math.floor(Math.random() * 30) + 20} hours</span>
                  </div>
                  <Progress value={Math.floor(Math.random() * 30) + 70} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>English</span>
                    <span>{Math.floor(Math.random() * 30) + 20} hours</span>
                  </div>
                  <Progress value={Math.floor(Math.random() * 30) + 70} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Social Studies</span>
                    <span>{Math.floor(Math.random() * 30) + 20} hours</span>
                  </div>
                  <Progress value={Math.floor(Math.random() * 30) + 70} className="h-2" />
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
                <p className="italic">
                  {student.name} spends most time on {student.learningStats.strongSubjects[0] || "core subjects"}.
                  {student.learningStats.weakSubjects.length > 0 
                    ? ` More time should be allocated to ${student.learningStats.weakSubjects[0]}.`
                    : ` Time allocation appears to be well-balanced.`
                  }
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentProgressionView;
