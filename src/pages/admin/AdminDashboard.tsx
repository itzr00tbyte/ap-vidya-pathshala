import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, BookOpen, Star, AlertCircle, BookCheck, LineChart, BarChart2, Users, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { 
  getFilteredStudents, 
  generatePerformanceData, 
  generateSubjectProgressData,
  calculateAvgCompletion,
  calculateHonorRollCount,
  calculateAtRiskCount,
  calculateAvgStudentProgress,
  calculateAvgCompletedLessons
} from "@/utils/dashboardData";
import { MOCK_STUDENTS } from "@/data/mockStudents";
import StudentProgressSection from "@/components/dashboard/StudentProgressSection";

// Import charts components if needed for visualizations
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Get students filtered based on user role (admin sees all, teacher sees only their students)
  const filteredStudents = getFilteredStudents(user?.name, user?.role);
  
  // Calculate stats based on filtered students
  const totalStudents = filteredStudents.length;
  const avgCompletion = calculateAvgCompletion(filteredStudents);
  const honorRollCount = calculateHonorRollCount(filteredStudents);
  const atRiskCount = calculateAtRiskCount(filteredStudents);
  const avgProgress = calculateAvgStudentProgress(filteredStudents);
  const completedLessons = calculateAvgCompletedLessons(filteredStudents);
  
  // Generate data for charts
  const performanceData = generatePerformanceData(filteredStudents);
  const subjectProgressData = generateSubjectProgressData(filteredStudents);

  // Add subject progress data to students
  const enrichStudentsWithProgress = () => {
    if (filteredStudents.length === 0) return [];
    
    return filteredStudents.slice(0, 8).map(student => {
      if (!student.subjectProgress) {
        student.subjectProgress = [
          { subject: "Mathematics", progress: Math.floor(Math.random() * 100) },
          { subject: "Science", progress: Math.floor(Math.random() * 100) },
          { subject: "English", progress: Math.floor(Math.random() * 100) },
          { subject: "Social Studies", progress: Math.floor(Math.random() * 100) },
          { subject: "Computer Science", progress: Math.floor(Math.random() * 100) },
        ];
      }
      return student;
    });
  };

  const enrichedStudents = enrichStudentsWithProgress();
  
  // For teachers, we'll display their students' progress data in the dashboard
  const isTeacher = user?.role === "teacher";
  
  return (
    <>
      <Helmet>
        <title>Dashboard | AP Vidya Administrative Portal</title>
      </Helmet>
      
      <div className="flex flex-col">
        <div className="flex flex-col space-y-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">
              Welcome back, {user?.name}. Here's what's happening with your educational platform.
            </p>
          </div>
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              {isTeacher && <TabsTrigger value="students">My Students</TabsTrigger>}
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalStudents}</div>
                    {isTeacher && (
                      <p className="text-xs text-muted-foreground">
                        Students assigned to you
                      </p>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Completion</CardTitle>
                    <BookCheck className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{avgCompletion}%</div>
                    <p className="text-xs text-muted-foreground">
                      Average quiz score
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Honor Roll</CardTitle>
                    <Star className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{honorRollCount}</div>
                    <p className="text-xs text-muted-foreground">
                      Excellent performance
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Students At Risk</CardTitle>
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{atRiskCount}</div>
                    <p className="text-xs text-muted-foreground">
                      Need attention
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Student Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {performanceData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={performanceData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {performanceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex h-[300px] items-center justify-center">
                        <p className="text-muted-foreground">No performance data available</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Subject Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {subjectProgressData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={subjectProgressData}>
                          <XAxis dataKey="subject" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="avgProgress" fill="#4f46e5" />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex h-[300px] items-center justify-center">
                        <p className="text-muted-foreground">No subject progress data available</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Progress</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{avgProgress}%</div>
                    <Progress value={avgProgress} className="h-2" />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completed Lessons</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{completedLessons}</div>
                    <p className="text-xs text-muted-foreground">
                      Avg. lessons per student
                    </p>
                  </CardContent>
                </Card>
                
                {/* Add more analytics cards as needed */}
              </div>
              
              {/* Add more analytics sections/charts as needed */}
            </TabsContent>
            
            {isTeacher && (
              <TabsContent value="students" className="space-y-4">
                {filteredStudents.length > 0 ? (
                  <StudentProgressSection 
                    customStudents={enrichedStudents} 
                    teacherName={user?.name || "Current Teacher"}
                  />
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <Users className="h-10 w-10 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-medium mb-2">No Students Assigned</h3>
                      <p className="text-muted-foreground text-center">
                        You don't have any students assigned yet. Once students are assigned to you, they'll appear here.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
