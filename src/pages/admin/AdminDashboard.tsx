
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, GraduationCap, BookOpen, School,
  BarChart, Calendar, BookMarked, Award
} from "lucide-react";
import { MOCK_STUDENTS } from "@/data/mockStudents";
import { MOCK_TEACHERS } from "@/data/mockTeachers";
import { MOCK_SCHOOLS } from "@/data/mockSchools";

export default function AdminDashboard() {
  const { user } = useAuth();

  // Calculate statistics from mock data
  const totalStudents = MOCK_STUDENTS.length;
  const totalTeachers = MOCK_TEACHERS.length;
  const totalSchools = MOCK_SCHOOLS.length;
  
  // Calculate average completion from student learning stats
  const avgCompletion = Math.round(
    MOCK_STUDENTS.reduce((sum, student) => 
      sum + (student.learningStats.avgQuizScore || 0), 0) / totalStudents
  );

  // Calculate honor roll students (students with performance = "Excellent")
  const honorRollCount = MOCK_STUDENTS.filter(student => 
    student.performance === "Excellent"
  ).length;

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
      value: `${avgCompletion}%`,
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
      value: honorRollCount.toString(),
      icon: Award,
      color: "bg-teal-100 text-teal-600",
      roles: ["admin", "headmaster", "teacher"]
    }
  ];

  // Filter stats based on user role
  const filteredStats = stats.filter(stat => 
    user && stat.roles.includes(user.role)
  );

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
              You can view your assigned students and track their course progress, completion rates, and performance.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
