
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, GraduationCap, BookOpen, School,
  BarChart, Calendar, BookMarked, Award,
  TrendingUp, BookOpenCheck, AlertCircle, Crown
} from "lucide-react";
import { MOCK_STUDENTS } from "@/data/mockStudents";
import { MOCK_TEACHERS } from "@/data/mockTeachers";
import { MOCK_SCHOOLS } from "@/data/mockSchools";
import { useEffect, useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [teacherStudents, setTeacherStudents] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [subjectProgressData, setSubjectProgressData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  
  useEffect(() => {
    // Filter students based on user role
    let filteredStudents = [...MOCK_STUDENTS];
    
    if (user?.role === "teacher" && user?.name) {
      filteredStudents = MOCK_STUDENTS.filter(student => student.teacher === user.name);
    } else if (user?.role === "headmaster") {
      // For headmaster, we'll show all students but could filter by school if needed
      filteredStudents = MOCK_STUDENTS;
    }
    
    setTeacherStudents(filteredStudents);
    
    // Generate performance data for pie chart
    const performanceCounts = filteredStudents.reduce((acc, student) => {
      acc[student.performance] = (acc[student.performance] || 0) + 1;
      return acc;
    }, {});
    
    setPerformanceData(
      Object.keys(performanceCounts).map(key => ({
        name: key,
        value: performanceCounts[key],
      }))
    );
    
    // Generate subject progress data for bar chart
    if (filteredStudents.length > 0 && filteredStudents[0].subjectProgress) {
      const subjects = {};
      
      // Collect all subjects and calculate average progress
      filteredStudents.forEach(student => {
        if (student.subjectProgress) {
          student.subjectProgress.forEach(subject => {
            if (!subjects[subject.subject]) {
              subjects[subject.subject] = {
                total: 0,
                count: 0
              };
            }
            subjects[subject.subject].total += subject.progress;
            subjects[subject.subject].count += 1;
          });
        }
      });
      
      const subjectData = Object.keys(subjects).map(subject => ({
        subject: subject,
        avgProgress: Math.round(subjects[subject].total / subjects[subject].count)
      }));
      
      setSubjectProgressData(subjectData);
    }
    
    // Generate attendance data
    const attendanceRanges = {
      "Excellent (91-100%)": 0,
      "Good (81-90%)": 0,
      "Average (71-80%)": 0,
      "Below Average (≤70%)": 0
    };
    
    filteredStudents.forEach(student => {
      if (student.attendance > 90) {
        attendanceRanges["Excellent (91-100%)"]++;
      } else if (student.attendance > 80) {
        attendanceRanges["Good (81-90%)"]++;
      } else if (student.attendance > 70) {
        attendanceRanges["Average (71-80%)"]++;
      } else {
        attendanceRanges["Below Average (≤70%)"]++;
      }
    });
    
    setAttendanceData(
      Object.keys(attendanceRanges).map(key => ({
        name: key,
        value: attendanceRanges[key],
      }))
    );
    
  }, [user]);

  // Calculate statistics from mock data
  const totalStudents = MOCK_STUDENTS.length;
  const totalTeachers = MOCK_TEACHERS.length;
  const totalSchools = MOCK_SCHOOLS.length;
  const teacherStudentCount = teacherStudents.length;
  
  // Calculate average completion from student learning stats
  const avgCompletion = Math.round(
    MOCK_STUDENTS.reduce((sum, student) => 
      sum + (student.learningStats.avgQuizScore || 0), 0) / totalStudents
  );
  
  // Calculate teacher-specific student average completion
  const teacherAvgCompletion = teacherStudents.length > 0 
    ? Math.round(
        teacherStudents.reduce((sum, student) => 
          sum + (student.learningStats.avgQuizScore || 0), 0) / teacherStudents.length
      )
    : 0;

  // Calculate honor roll students (students with performance = "Excellent")
  const honorRollCount = MOCK_STUDENTS.filter(student => 
    student.performance === "Excellent"
  ).length;
  
  // Calculate teacher-specific honor roll count
  const teacherHonorRollCount = teacherStudents.filter(student => 
    student.performance === "Excellent"
  ).length;
  
  // Calculate students at risk (low attendance or poor performance)
  const atRiskCount = teacherStudents.filter(student => 
    student.attendance < 80 || student.performance === "Poor" || student.performance === "Satisfactory"
  ).length;
  
  // Calculate average student progress across all subjects
  const avgStudentProgress = teacherStudents.length > 0
    ? Math.round(
        teacherStudents.reduce((sum, student) => {
          if (student.subjectProgress && student.subjectProgress.length > 0) {
            const studentAvg = student.subjectProgress.reduce((subSum, subject) => 
              subSum + subject.progress, 0) / student.subjectProgress.length;
            return sum + studentAvg;
          }
          return sum;
        }, 0) / teacherStudents.length
      )
    : 0;

  // Data for statistics cards
  const stats = [
    {
      title: "Total Students",
      value: totalStudents.toString(),
      icon: Users,
      color: "bg-blue-100 text-blue-600",
      roles: ["admin", "headmaster", "teacher"]
    },
    {
      title: "My Students",
      value: teacherStudentCount.toString(),
      icon: Users,
      color: "bg-indigo-100 text-indigo-600",
      roles: ["teacher"]
    },
    {
      title: "Total Teachers",
      value: totalTeachers.toString(),
      icon: GraduationCap,
      color: "bg-green-100 text-green-600",
      roles: ["admin", "headmaster"]
    },
    {
      title: "Total Courses",
      value: "128",
      icon: BookOpen,
      color: "bg-amber-100 text-amber-600",
      roles: ["admin", "headmaster", "teacher"]
    },
    {
      title: "Total Schools",
      value: totalSchools.toString(),
      icon: School,
      color: "bg-purple-100 text-purple-600",
      roles: ["admin"]
    },
    {
      title: "Class Promotions",
      value: "Apr 2025",
      icon: Calendar,
      color: "bg-pink-100 text-pink-600",
      roles: ["admin", "headmaster"]
    },
    {
      title: "Avg. Completion",
      value: `${user?.role === "teacher" ? teacherAvgCompletion : avgCompletion}%`,
      icon: BarChart,
      color: "bg-indigo-100 text-indigo-600",
      roles: ["admin", "headmaster", "teacher"]
    },
    {
      title: "Total Subjects",
      value: "24",
      icon: BookMarked,
      color: "bg-rose-100 text-rose-600",
      roles: ["admin", "headmaster", "teacher"]
    },
    {
      title: "Honor Roll",
      value: user?.role === "teacher" ? teacherHonorRollCount.toString() : honorRollCount.toString(),
      icon: Award,
      color: "bg-teal-100 text-teal-600",
      roles: ["admin", "headmaster", "teacher"]
    },
    {
      title: "Students At Risk",
      value: atRiskCount.toString(),
      icon: AlertCircle,
      color: "bg-red-100 text-red-600",
      roles: ["teacher", "headmaster"]
    },
    {
      title: "Avg. Progress",
      value: `${avgStudentProgress}%`,
      icon: TrendingUp,
      color: "bg-cyan-100 text-cyan-600",
      roles: ["teacher", "headmaster", "admin"]
    },
    {
      title: "Completed Courses",
      value: `${teacherStudents.length > 0 ? Math.round(teacherStudents.reduce((sum, student) => sum + student.learningStats.completedLessons, 0) / teacherStudents.length) : 0}`,
      icon: BookOpenCheck,
      color: "bg-emerald-100 text-emerald-600",
      roles: ["teacher"]
    }
  ];

  // Filter stats based on user role
  const filteredStats = stats.filter(stat => 
    user && stat.roles.includes(user.role)
  );

  // Colors for the charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <div className="w-full px-2 sm:px-4">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          Welcome back, {user?.name}. Here's what's happening with your educational platform.
        </p>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mb-8">
        {filteredStats.map((stat, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-500">{stat.title}</CardTitle>
              <div className={`p-1 sm:p-2 rounded-md ${stat.color}`}>
                <stat.icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
            </CardHeader>
            <CardContent className="pt-0 sm:pt-2">
              <div className="text-xl sm:text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and detailed statistics - Different for each role */}
      {user?.role === "teacher" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
                  <RechartsBarChart
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
                  </RechartsBarChart>
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
                          {index < 3 ? <Crown className="w-3 h-3" /> : (index + 1)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-sm">{student.name}</span>
                            <span className="text-sm font-bold">{student.learningStats.avgQuizScore}%</span>
                          </div>
                          <ProgressBar
                            progress={student.learningStats.avgQuizScore}
                            color="blue"
                            size="sm"
                            showLabel={false}
                          />
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
      )}
      
      {/* Different charts for headmaster and admin */}
      {(user?.role === "headmaster" || user?.role === "admin") && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* School Performance Comparison (for admin) */}
          {user?.role === "admin" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">School Performance</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={MOCK_SCHOOLS.map(school => ({
                      name: school.name.split(' ').pop(), // Just use the last part of the name
                      performance: Math.floor(Math.random() * 30) + 70 // Random performance between 70-100%
                    }))}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="performance" name="Average Performance (%)" fill="#8884d8" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
          
          {/* Grade Distribution (for headmaster and admin) */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Grade Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={[6, 7, 8, 9].map(grade => ({
                    grade: `Grade ${grade}`,
                    students: MOCK_STUDENTS.filter(s => s.grade === grade).length
                  }))}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <XAxis dataKey="grade" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="students" name="Number of Students" fill="#82ca9d" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          {/* Performance Distribution (similar to teacher view) */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Performance Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
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
            </CardContent>
          </Card>
          
          {/* Subject Progress (similar to teacher view) */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Subject Progress</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              {subjectProgressData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
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
                  </RechartsBarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">No subject progress data available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Role-specific content */}
      {user?.role === "admin" && (
        <div className="mt-6 sm:mt-8">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Super Admin Controls</h3>
          <div className="bg-amber-50 p-3 sm:p-4 rounded-md border border-amber-200">
            <p className="text-sm sm:text-base text-amber-800">
              You have full access to all system functionalities. Use the navigation menu to manage users, courses, teachers, schools, and monitor class progression.
            </p>
          </div>
        </div>
      )}
      
      {user?.role === "headmaster" && (
        <div className="mt-6 sm:mt-8">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Head Master View</h3>
          <div className="bg-blue-50 p-3 sm:p-4 rounded-md border border-blue-200">
            <p className="text-sm sm:text-base text-blue-800">
              You can view and manage all students and teachers assigned to your schools. Monitor student learning progress by class, semester, and subject.
            </p>
          </div>
        </div>
      )}
      
      {user?.role === "teacher" && (
        <div className="mt-6 sm:mt-8">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Teacher Dashboard</h3>
          <div className="bg-green-50 p-3 sm:p-4 rounded-md border border-green-200">
            <p className="text-sm sm:text-base text-green-800">
              You can view your assigned students and track their course progress, completion rates, and performance. Use the insights to identify students who may need additional support.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
