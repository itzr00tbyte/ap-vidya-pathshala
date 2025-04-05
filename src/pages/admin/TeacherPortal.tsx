
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";
import StudentTable from "@/components/student/StudentTable";
import { Student } from "@/types/dashboard";
import { MOCK_STUDENTS } from "@/data/mockStudents";
import {
  generatePerformanceData,
  generateSubjectProgressData,
  generateAttendanceData,
  calculateAvgCompletion,
  calculateHonorRollCount,
  calculateAtRiskCount,
  calculateAvgStudentProgress,
  calculateAvgCompletedLessons
} from "@/utils/dashboardData";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { 
  Users, Award, AlertCircle, BookOpenCheck, TrendingUp,
  LineChart, BarChart as BarChartIcon, School
} from "lucide-react";

export default function TeacherPortal() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [teacherStudents, setTeacherStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showStatsDialog, setShowStatsDialog] = useState(false);
  const [showProgressDialog, setShowProgressDialog] = useState(false);
  
  // Dashboard data states
  const [performanceData, setPerformanceData] = useState([]);
  const [subjectProgressData, setSubjectProgressData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  
  useEffect(() => {
    // Filter students based on teacher name
    if (user?.role === "teacher" && user?.name) {
      const filteredStudents = MOCK_STUDENTS.filter(student => student.teacher === user.name);
      setTeacherStudents(filteredStudents);
      
      // Generate chart data
      setPerformanceData(generatePerformanceData(filteredStudents));
      setSubjectProgressData(generateSubjectProgressData(filteredStudents));
      setAttendanceData(generateAttendanceData(filteredStudents));
      
      // Check if a student ID is in the URL parameters
      const studentId = searchParams.get("student");
      if (studentId) {
        const student = filteredStudents.find(s => s.id === studentId);
        if (student) {
          setSelectedStudent(student);
          setShowStatsDialog(true);
        }
      }
    }
  }, [user, searchParams]);
  
  // Calculate stats for the teacher's students
  const totalStudents = teacherStudents.length;
  const avgCompletion = calculateAvgCompletion(teacherStudents);
  const honorRollCount = calculateHonorRollCount(teacherStudents);
  const atRiskCount = calculateAtRiskCount(teacherStudents);
  const avgProgress = calculateAvgStudentProgress(teacherStudents);
  const avgCompletedLessons = calculateAvgCompletedLessons(teacherStudents);
  
  // Stats cards for the teacher portal
  const statsCards = [
    {
      title: "My Students",
      value: totalStudents.toString(),
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Honor Roll",
      value: honorRollCount.toString(),
      icon: Award,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Students At Risk",
      value: atRiskCount.toString(),
      icon: AlertCircle,
      color: "bg-red-100 text-red-600",
    },
    {
      title: "Avg. Completion",
      value: `${avgCompletion}%`,
      icon: TrendingUp,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Avg. Progress",
      value: `${avgProgress}%`,
      icon: BarChartIcon,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "Completed Lessons",
      value: avgCompletedLessons.toString(),
      icon: BookOpenCheck,
      color: "bg-amber-100 text-amber-600",
    },
  ];
  
  // Colors for the charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  // Handlers for the student table
  const handleViewStats = (student: Student) => {
    setSelectedStudent(student);
    setShowStatsDialog(true);
  };
  
  const handleViewSubjectProgress = (student: Student) => {
    setSelectedStudent(student);
    setShowProgressDialog(true);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Teacher Portal</h2>
        <p className="text-gray-600 mt-1">Manage your students and track their progress</p>
      </div>
      
      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statsCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
              <div className={`p-2 rounded-md ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Tabs for different sections */}
      <Tabs defaultValue="students" className="w-full">
        <TabsList>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="performance">Class Performance</TabsTrigger>
          <TabsTrigger value="subjects">Subjects & Materials</TabsTrigger>
        </TabsList>
        
        {/* Students Tab Content */}
        <TabsContent value="students" className="p-4 bg-white rounded-md shadow mt-4">
          <h3 className="text-lg font-semibold mb-4">My Students</h3>
          
          {teacherStudents.length > 0 ? (
            <StudentTable 
              students={teacherStudents} 
              onViewStats={handleViewStats}
              canEditStudents={false}
              onViewSubjectProgress={handleViewSubjectProgress}
            />
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <School className="h-8 w-8 mx-auto text-gray-400" />
              <p className="mt-2 text-gray-500">No students assigned yet</p>
            </div>
          )}
        </TabsContent>
        
        {/* Performance Tab Content */}
        <TabsContent value="performance" className="p-4 bg-white rounded-md shadow mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Student Performance</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                {performanceData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={performanceData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {performanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">No data available</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Subject Progress Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Subject Progress</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                {subjectProgressData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={subjectProgressData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <XAxis dataKey="subject" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="avgProgress" name="Average Progress (%)" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">No subject progress data available</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Attendance Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Attendance Overview</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                {attendanceData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={attendanceData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {attendanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">No attendance data available</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Top Students */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Performing Students</CardTitle>
              </CardHeader>
              <CardContent>
                {teacherStudents.length > 0 ? (
                  <div className="space-y-4">
                    {teacherStudents
                      .sort((a, b) => b.learningStats.avgQuizScore - a.learningStats.avgQuizScore)
                      .slice(0, 5)
                      .map((student, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            index === 0 ? "bg-yellow-100 text-yellow-700" :
                            index === 1 ? "bg-gray-100 text-gray-700" :
                            index === 2 ? "bg-amber-100 text-amber-700" :
                            "bg-blue-100 text-blue-700"
                          }`}>
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-sm">{student.name}</span>
                              <span className="text-sm font-bold">{student.learningStats.avgQuizScore}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                              <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{ width: `${student.learningStats.avgQuizScore}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-40">
                    <p className="text-gray-500">No student data available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Subjects & Materials Tab Content */}
        <TabsContent value="subjects" className="p-4 bg-white rounded-md shadow mt-4">
          <h3 className="text-lg font-semibold mb-4">Teaching Materials</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Sample teaching materials */}
            {["Mathematics", "Science", "English", "History", "Geography", "Computer Science"].map((subject, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="bg-blue-50 pb-2">
                  <CardTitle className="text-md">{subject}</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-gray-600">
                    Access lesson plans, worksheets, assignments, and teaching resources for {subject}.
                  </p>
                  <div className="mt-4 flex justify-end">
                    <button className="text-blue-600 text-sm hover:underline">
                      View Materials
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Student Stats Dialog */}
      <Dialog open={showStatsDialog} onOpenChange={setShowStatsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Learning Statistics for {selectedStudent?.name}</DialogTitle>
            <DialogDescription>
              Detailed learning progress and performance metrics
            </DialogDescription>
          </DialogHeader>
          
          {selectedStudent && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Completed Lessons</div>
                  <div className="text-2xl font-bold">{selectedStudent.learningStats.completedLessons}</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Average Quiz Score</div>
                  <div className="text-2xl font-bold">{selectedStudent.learningStats.avgQuizScore}%</div>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg col-span-2">
                  <div className="text-sm text-gray-500">Last Activity</div>
                  <div className="text-2xl font-bold">{selectedStudent.lastActive}</div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Subject Progress</h4>
                {selectedStudent.subjectProgress && selectedStudent.subjectProgress.length > 0 ? (
                  <div className="space-y-3">
                    {selectedStudent.subjectProgress.map((subject, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{subject.subject}</span>
                          <span className="text-sm font-medium">{subject.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${
                              subject.progress >= 75 ? "bg-green-600" : 
                              subject.progress >= 50 ? "bg-blue-600" : 
                              subject.progress >= 25 ? "bg-amber-500" : "bg-red-600"
                            }`}
                            style={{ width: `${subject.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No subject progress data available</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Strong Subjects</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudent.learningStats.strongSubjects && 
                     selectedStudent.learningStats.strongSubjects.length > 0 ? (
                      selectedStudent.learningStats.strongSubjects.map((subject, idx) => (
                        <span key={idx} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          {subject}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">No data available</span>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Needs Improvement</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudent.learningStats.weakSubjects && 
                     selectedStudent.learningStats.weakSubjects.length > 0 ? (
                      selectedStudent.learningStats.weakSubjects.map((subject, idx) => (
                        <span key={idx} className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                          {subject}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">No data available</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Subject Progress Dialog */}
      <Dialog open={showProgressDialog} onOpenChange={setShowProgressDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Subject Progress for {selectedStudent?.name}</DialogTitle>
            <DialogDescription>
              Detailed view of progress across all subjects
            </DialogDescription>
          </DialogHeader>
          
          {selectedStudent && selectedStudent.subjectProgress && (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={selectedStudent.subjectProgress.map(subject => ({
                    subject: subject.subject,
                    progress: subject.progress
                  }))}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="progress" name="Progress (%)" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
