
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { User, BookOpen, BarChart2, LineChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MOCK_STUDENTS } from "@/data/mockStudents";

const StudentProgressSection = () => {
  const { user } = useAuth();
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showProgressDialog, setShowProgressDialog] = useState(false);

  // Filter students assigned to the current teacher
  const assignedStudents = MOCK_STUDENTS.filter(
    (student) => student.teacher === user?.name
  );

  // Calculate average progress for a student across all subjects
  const getAverageProgress = (student: any) => {
    if (!student.subjectProgress || student.subjectProgress.length === 0) {
      return 0;
    }
    
    const total = student.subjectProgress.reduce((sum, subject) => sum + subject.progress, 0);
    return Math.round(total / student.subjectProgress.length);
  };

  // Handle view student details
  const handleViewDetails = (student: any) => {
    setSelectedStudent(student);
    setShowDetailsDialog(true);
  };

  // Handle view student progress
  const handleViewProgress = (student: any) => {
    setSelectedStudent(student);
    setShowProgressDialog(true);
  };

  // Find strong and weak subjects
  const getStrongAndWeakSubjects = (student: any) => {
    if (!student.subjectProgress || student.subjectProgress.length === 0) {
      return { strongSubject: null, weakSubject: null };
    }

    const sortedSubjects = [...student.subjectProgress].sort((a, b) => b.progress - a.progress);
    return {
      strongSubject: sortedSubjects[0],
      weakSubject: sortedSubjects[sortedSubjects.length - 1]
    };
  };

  // Get performance class based on progress value
  const getPerformanceClass = (progress: number) => {
    if (progress >= 75) return "text-green-600";
    if (progress >= 50) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">My Students</h2>
        <span className="text-sm text-gray-500">
          {assignedStudents.length} students assigned
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assignedStudents.map((student) => {
          const avgProgress = getAverageProgress(student);
          const { strongSubject, weakSubject } = getStrongAndWeakSubjects(student);
          
          return (
            <Card key={student.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{student.name}</CardTitle>
                    <p className="text-sm text-gray-500">Grade {student.grade} - {student.section}</p>
                  </div>
                  <Badge className={`${
                    student.performance === 'Excellent' ? 'bg-green-100 text-green-800' :
                    student.performance === 'Good' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {student.performance}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span>Overall Progress</span>
                    <span className="font-bold">{avgProgress}%</span>
                  </div>
                  <Progress 
                    value={avgProgress} 
                    className={`h-2 ${
                      avgProgress >= 75 ? 'bg-green-100' :
                      avgProgress >= 50 ? 'bg-amber-100' :
                      'bg-red-100'
                    }`}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                  <div className="bg-blue-50 p-2 rounded-md">
                    <p className="text-gray-500">Attendance</p>
                    <p className="font-bold">{student.attendance}%</p>
                  </div>
                  <div className="bg-purple-50 p-2 rounded-md">
                    <p className="text-gray-500">Last Active</p>
                    <p className="font-bold">{student.lastActive}</p>
                  </div>
                </div>
                
                {strongSubject && weakSubject && (
                  <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                    <div className="bg-green-50 p-2 rounded-md">
                      <p className="text-gray-500">Strong Subject</p>
                      <p className="font-bold">{strongSubject.subject}</p>
                      <p className="text-green-600">{strongSubject.progress}%</p>
                    </div>
                    <div className="bg-red-50 p-2 rounded-md">
                      <p className="text-gray-500">Needs Improvement</p>
                      <p className="font-bold">{weakSubject.subject}</p>
                      <p className="text-red-600">{weakSubject.progress}%</p>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between gap-2 mt-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full" 
                    onClick={() => handleViewDetails(student)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full" 
                    onClick={() => handleViewProgress(student)}
                  >
                    <BarChart2 className="h-4 w-4 mr-2" />
                    Progress
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Student Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Student Profile</DialogTitle>
            <DialogDescription>
              Detailed information about {selectedStudent?.name}
            </DialogDescription>
          </DialogHeader>
          
          {selectedStudent && (
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-2xl font-bold">
                  {selectedStudent.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold">{selectedStudent.name}</h3>
                  <p className="text-sm text-gray-500">ID: {selectedStudent.id}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500">Grade & Section</p>
                  <p className="font-medium">Grade {selectedStudent.grade} - {selectedStudent.section}</p>
                </div>
                <div>
                  <p className="text-gray-500">Performance</p>
                  <p className="font-medium">{selectedStudent.performance}</p>
                </div>
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-medium">{selectedStudent.email}</p>
                </div>
                <div>
                  <p className="text-gray-500">Attendance</p>
                  <p className="font-medium">{selectedStudent.attendance}%</p>
                </div>
                <div>
                  <p className="text-gray-500">Last Active</p>
                  <p className="font-medium">{selectedStudent.lastActive}</p>
                </div>
                <div>
                  <p className="text-gray-500">Joined</p>
                  <p className="font-medium">{selectedStudent.joinDate || "Jan 2023"}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Learning Stats</h4>
                <div className="bg-gray-50 p-3 rounded-md grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Completed</p>
                    <p className="font-bold text-lg">{selectedStudent.learningStats.completedLessons}</p>
                    <p className="text-xs">Lessons</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Avg. Score</p>
                    <p className="font-bold text-lg">{selectedStudent.learningStats.avgQuizScore}%</p>
                    <p className="text-xs">In Quizzes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Last Activity</p>
                    <p className="font-bold text-lg">{selectedStudent.learningStats.lastActivity.split(" ")[0]}</p>
                    <p className="text-xs">{selectedStudent.learningStats.lastActivity.split(" ")[1]}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Student Progress Dialog */}
      <Dialog open={showProgressDialog} onOpenChange={setShowProgressDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Subject Progress</DialogTitle>
            <DialogDescription className="text-base">
              {selectedStudent?.name}'s learning progress by subject
            </DialogDescription>
          </DialogHeader>
          
          {selectedStudent && selectedStudent.subjectProgress && (
            <div className="space-y-6 my-4">
              {selectedStudent.subjectProgress.map((subject, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-medium">{subject.subject}</span>
                    <span className={`text-lg font-bold ${getPerformanceClass(subject.progress)}`}>
                      {subject.progress}%
                    </span>
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
              
              <div className="pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-medium">Overall Progress</span>
                  <span className="text-lg font-bold">
                    {getAverageProgress(selectedStudent)}%
                  </span>
                </div>
                <Progress 
                  value={getAverageProgress(selectedStudent)}
                  className="h-4 rounded-full bg-blue-200"
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentProgressSection;
