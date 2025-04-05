
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  User, BookOpen, BarChart2, Calendar, School,
  BookUser, BookText, UsersRound, GraduationCap,
  SearchCheck
} from "lucide-react";
import { 
  getFilteredStudents, 
  generateSubjectProgressData, 
  generatePerformanceData, 
  generateAttendanceData,
  calculateAvgStudentProgress
} from "@/utils/dashboardData";

import StudentTable from "@/components/student/StudentTable";
import { MOCK_STUDENTS } from "@/data/mockStudents";
import { MOCK_TEACHERS } from "@/data/mockTeachers";

export default function TeacherPortal() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentDetails, setShowStudentDetails] = useState(false);
  
  // Filter students based on teacher name
  const filteredStudents = user?.name 
    ? getFilteredStudents(user.name, "teacher")
    : [];
  
  // Find teacher data
  const teacherData = MOCK_TEACHERS.find(teacher => teacher.name === user?.name) || {
    subjects: ["Mathematics", "Science"],
    grades: [6, 7, 8],
    qualification: "M.Ed. Teaching",
    specialization: "STEM Education",
    joinDate: "2020-01-15",
    status: "active"
  };
  
  // Prepare student data visualizations
  const studentPerformanceData = generatePerformanceData(filteredStudents);
  const subjectProgressData = generateSubjectProgressData(filteredStudents);
  const attendanceData = generateAttendanceData(filteredStudents);
  
  // Calculate KPIs
  const totalStudents = filteredStudents.length;
  const averageProgress = calculateAvgStudentProgress(filteredStudents);
  const honorRollStudents = filteredStudents.filter(student => student.performance === "Excellent").length;
  const atRiskStudents = filteredStudents.filter(student => student.performance === "Satisfactory" || student.performance === "Poor").length;
  
  // Handle view student details
  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setShowStudentDetails(true);
  };
  
  // Get performance class based on progress value
  const getPerformanceClass = (progress) => {
    if (progress >= 75) return "text-green-600";
    if (progress >= 50) return "text-amber-600";
    return "text-red-600";
  };

  // Get average progress for a student across all subjects
  const getAverageProgress = (student) => {
    if (!student?.subjectProgress || student.subjectProgress.length === 0) {
      return 0;
    }
    
    const total = student.subjectProgress.reduce((sum, subject) => sum + subject.progress, 0);
    return Math.round(total / student.subjectProgress.length);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Teacher Portal</h2>
          <p className="text-gray-600 mt-1">
            Manage your classes, students, and teaching resources
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="classes">Classes & Subjects</TabsTrigger>
          <TabsTrigger value="materials">Teaching Materials</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Teacher information card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle>Teacher Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-2xl font-bold">
                    {user?.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold">{user?.name}</h3>
                    <div className="text-sm text-gray-500">
                      {teacherData.specialization}
                    </div>
                    <Badge className="mt-1 bg-green-100 text-green-800 hover:bg-green-200">
                      Active
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Subjects</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {teacherData.subjects.map((subject) => (
                        <Badge key={subject} variant="outline" className="bg-blue-50">
                          <BookOpen className="h-3 w-3 mr-1" />
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Grades</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {teacherData.grades.map((grade) => (
                        <Badge key={grade} variant="outline">Grade {grade}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Qualification</h4>
                    <p className="text-sm">{teacherData.qualification}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Join Date</h4>
                    <p className="text-sm">{new Date(teacherData.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>Class Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center">
                    <div className="rounded-full bg-blue-100 p-2">
                      <UsersRound className="h-6 w-6 text-blue-800" />
                    </div>
                    <h4 className="mt-2 text-sm font-medium">Total Students</h4>
                    <p className="text-2xl font-bold">{totalStudents}</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center">
                    <div className="rounded-full bg-green-100 p-2">
                      <BarChart2 className="h-6 w-6 text-green-800" />
                    </div>
                    <h4 className="mt-2 text-sm font-medium">Avg. Progress</h4>
                    <p className="text-2xl font-bold">{averageProgress}%</p>
                  </div>
                  
                  <div className="bg-amber-50 rounded-lg p-4 flex flex-col items-center">
                    <div className="rounded-full bg-amber-100 p-2">
                      <GraduationCap className="h-6 w-6 text-amber-800" />
                    </div>
                    <h4 className="mt-2 text-sm font-medium">Honor Roll</h4>
                    <p className="text-2xl font-bold">{honorRollStudents}</p>
                  </div>
                  
                  <div className="bg-red-50 rounded-lg p-4 flex flex-col items-center">
                    <div className="rounded-full bg-red-100 p-2">
                      <SearchCheck className="h-6 w-6 text-red-800" />
                    </div>
                    <h4 className="mt-2 text-sm font-medium">Needs Attention</h4>
                    <p className="text-2xl font-bold">{atRiskStudents}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-4">Top Performing Students</h4>
                  <div className="space-y-3">
                    {filteredStudents
                      .filter(student => student.performance === "Excellent")
                      .slice(0, 3)
                      .map(student => (
                        <div key={student.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-bold">
                              {student.name.charAt(0)}
                            </div>
                            <div className="ml-3">
                              <h5 className="text-sm font-medium">{student.name}</h5>
                              <p className="text-xs text-gray-500">Grade {student.grade} - {student.section}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{getAverageProgress(student)}% Overall</div>
                            <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-4">Students Needing Attention</h4>
                  <div className="space-y-3">
                    {filteredStudents
                      .filter(student => student.performance === "Satisfactory" || student.performance === "Poor")
                      .slice(0, 3)
                      .map(student => (
                        <div key={student.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-red-100 text-red-800 rounded-full flex items-center justify-center font-bold">
                              {student.name.charAt(0)}
                            </div>
                            <div className="ml-3">
                              <h5 className="text-sm font-medium">{student.name}</h5>
                              <p className="text-xs text-gray-500">Grade {student.grade} - {student.section}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{getAverageProgress(student)}% Overall</div>
                            <Badge className={
                              student.performance === "Satisfactory" 
                                ? "bg-yellow-100 text-yellow-800" 
                                : "bg-red-100 text-red-800"
                            }>
                              {student.performance}
                            </Badge>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button variant="outline" onClick={() => setActiveTab("students")}>
                    View All Students
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Class progress and upcoming activities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Subject Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjectProgressData.map((subject, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{subject.subject}</span>
                        <span className={`text-sm font-bold ${getPerformanceClass(subject.avgProgress)}`}>
                          {subject.avgProgress}%
                        </span>
                      </div>
                      <Progress 
                        value={subject.avgProgress}
                        className={`h-2 rounded-full ${
                          subject.avgProgress >= 80 ? 'bg-green-200' :
                          subject.avgProgress >= 60 ? 'bg-amber-200' :
                          'bg-red-200'
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-purple-100 p-2 flex-shrink-0">
                      <BookText className="h-5 w-5 text-purple-800" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Math Quiz - Linear Equations</h4>
                      <p className="text-xs text-gray-500">Tomorrow, 10:30 AM • Grade 8</p>
                      <Badge className="mt-1 bg-purple-100 text-purple-800">Quiz</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-blue-100 p-2 flex-shrink-0">
                      <School className="h-5 w-5 text-blue-800" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Parent-Teacher Meeting</h4>
                      <p className="text-xs text-gray-500">April 10, 3:00 PM • All Grades</p>
                      <Badge className="mt-1 bg-blue-100 text-blue-800">Meeting</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-green-100 p-2 flex-shrink-0">
                      <Calendar className="h-5 w-5 text-green-800" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Science Project Submission</h4>
                      <p className="text-xs text-gray-500">April 15 • Grade 7</p>
                      <Badge className="mt-1 bg-green-100 text-green-800">Deadline</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-amber-100 p-2 flex-shrink-0">
                      <BookUser className="h-5 w-5 text-amber-800" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Workshop: Teaching Methods</h4>
                      <p className="text-xs text-gray-500">April 20, 2:00 PM • Teachers Only</p>
                      <Badge className="mt-1 bg-amber-100 text-amber-800">Professional Development</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Student Management</CardTitle>
            </CardHeader>
            <CardContent>
              <StudentTable 
                students={filteredStudents} 
                onViewStats={handleViewStudent} 
                canEditStudents={false}
                onViewSubjectProgress={handleViewStudent}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="classes">
          <Card>
            <CardHeader>
              <CardTitle>Classes & Subjects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teacherData.grades.map(grade => (
                  <Card key={grade}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Grade {grade}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {teacherData.subjects.map(subject => (
                          <div key={`${grade}-${subject}`} className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                                <span className="font-medium">{subject}</span>
                              </div>
                              <div>
                                <Badge variant="outline">
                                  {filteredStudents.filter(s => s.grade === grade).length} Students
                                </Badge>
                              </div>
                            </div>
                            <div className="mt-2">
                              <div className="flex justify-between items-center text-sm mb-1">
                                <span>Class Progress</span>
                                <span className="font-medium">
                                  {Math.round(Math.random() * 20) + 60}%
                                </span>
                              </div>
                              <Progress value={Math.round(Math.random() * 20) + 60} className="h-2" />
                            </div>
                            <div className="mt-3 flex justify-end">
                              <Button variant="outline" size="sm">View Details</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="materials">
          <Card>
            <CardHeader>
              <CardTitle>Teaching Materials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {teacherData.subjects.map(subject => (
                  <Card key={subject}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{subject}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="bg-blue-100 p-2 rounded">
                              <BookText className="h-5 w-5 text-blue-700" />
                            </div>
                            <div className="ml-3">
                              <p className="font-medium text-sm">Lesson Plans</p>
                              <p className="text-xs text-gray-500">12 documents</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">View</Button>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="bg-green-100 p-2 rounded">
                              <BookOpen className="h-5 w-5 text-green-700" />
                            </div>
                            <div className="ml-3">
                              <p className="font-medium text-sm">Worksheets</p>
                              <p className="text-xs text-gray-500">24 documents</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">View</Button>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="bg-amber-100 p-2 rounded">
                              <BarChart2 className="h-5 w-5 text-amber-700" />
                            </div>
                            <div className="ml-3">
                              <p className="font-medium text-sm">Assessments</p>
                              <p className="text-xs text-gray-500">8 quizzes</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">View</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Student Details Dialog */}
      <Dialog open={showStudentDetails} onOpenChange={setShowStudentDetails}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Student Profile</DialogTitle>
            <DialogDescription className="text-base">
              Detailed information about {selectedStudent?.name}
            </DialogDescription>
          </DialogHeader>
          
          {selectedStudent && (
            <div className="space-y-6 my-4">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-2xl font-bold">
                  {selectedStudent.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold">{selectedStudent.name}</h3>
                  <p className="text-sm text-gray-500">Grade {selectedStudent.grade} - Section {selectedStudent.section}</p>
                  <Badge className={
                    selectedStudent.performance === 'Excellent' ? 'bg-green-100 text-green-800' :
                    selectedStudent.performance === 'Good' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }>
                    {selectedStudent.performance}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 p-3 rounded-md text-center">
                  <p className="text-xs text-gray-500">Attendance</p>
                  <p className="text-xl font-bold">{selectedStudent.attendance}%</p>
                </div>
                <div className="bg-green-50 p-3 rounded-md text-center">
                  <p className="text-xs text-gray-500">Completed Lessons</p>
                  <p className="text-xl font-bold">{selectedStudent.learningStats.completedLessons}</p>
                </div>
                <div className="bg-amber-50 p-3 rounded-md text-center">
                  <p className="text-xs text-gray-500">Quiz Average</p>
                  <p className="text-xl font-bold">{selectedStudent.learningStats.avgQuizScore}%</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-4">Subject Progress</h4>
                {selectedStudent.subjectProgress && (
                  <div className="space-y-4">
                    {selectedStudent.subjectProgress.map((subject, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{subject.subject}</span>
                          <span className={`text-sm font-bold ${getPerformanceClass(subject.progress)}`}>
                            {subject.progress}%
                          </span>
                        </div>
                        <Progress 
                          value={subject.progress}
                          className={`h-2 rounded-full ${
                            subject.progress >= 80 ? 'bg-green-200' :
                            subject.progress >= 60 ? 'bg-amber-200' :
                            'bg-red-200'
                          }`}
                        />
                      </div>
                    ))}
                    
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Overall Progress</span>
                        <span className="text-sm font-bold">
                          {getAverageProgress(selectedStudent)}%
                        </span>
                      </div>
                      <Progress 
                        value={getAverageProgress(selectedStudent)}
                        className="h-3 rounded-full bg-blue-200"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Teacher Notes</h4>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm italic text-gray-600">
                    {selectedStudent.performance === 'Excellent' 
                      ? `${selectedStudent.name} is performing exceptionally well. Shows great aptitude for problem-solving and critical thinking.` 
                      : selectedStudent.performance === 'Good'
                      ? `${selectedStudent.name} is performing well but could benefit from additional practice in certain concepts.`
                      : `${selectedStudent.name} needs additional support, particularly in core subjects. Consider scheduling a parent-teacher meeting.`
                    }
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
