
import { useEffect, useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { 
  Users, School, BookOpen, GraduationCap, 
  BarChart3, Settings, LogOut, UserCog, Calendar, Briefcase,
  BookOpenCheck, GraduationCap as Student
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { MOCK_STUDENTS } from "@/data/mockStudents";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  const [teacherStudents, setTeacherStudents] = useState([]);
  const [isStudentsOpen, setIsStudentsOpen] = useState(false);
  
  // Ensure only admin, headmaster, or teacher can access
  useEffect(() => {
    if (!user || !["admin", "headmaster", "teacher"].includes(user.role)) {
      navigate("/admin-portal/login");
      toast({
        title: "Access denied",
        description: "You don't have permission to access the admin portal",
        variant: "destructive",
      });
    }
    
    // If teacher, load their students
    if (user && user.role === "teacher" && user.name) {
      const filteredStudents = MOCK_STUDENTS.filter(student => student.teacher === user.name);
      setTeacherStudents(filteredStudents);
    }
  }, [user, navigate, toast]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/admin-portal/login");
  };

  // Define navigation items based on role
  const navigationItems = [
    { 
      name: "Dashboard", 
      path: "/admin-portal", 
      icon: BarChart3,
      roles: ["admin", "headmaster", "teacher"] 
    },
    { 
      name: "User Management", 
      path: "/admin-portal/users", 
      icon: Users,
      roles: ["admin", "headmaster"] 
    },
    { 
      name: "Course Management", 
      path: "/admin-portal/courses", 
      icon: BookOpen,
      roles: ["admin"] 
    },
    { 
      name: "Teacher Management", 
      path: "/admin-portal/teachers", 
      icon: UserCog,
      roles: ["admin", "headmaster"] 
    },
    { 
      name: "School Management", 
      path: "/admin-portal/schools", 
      icon: School,
      roles: ["admin"] 
    },
    { 
      name: "Class Progression", 
      path: "/admin-portal/classes", 
      icon: Calendar,
      roles: ["admin", "headmaster"] 
    },
    { 
      name: "Teacher Portal", 
      path: "/admin-portal/teacher-portal", 
      icon: Briefcase,
      roles: ["teacher"] 
    },
  ];

  // Filter navigation items based on user role
  const filteredNavigation = navigationItems.filter(item => 
    item.roles.includes(user.role)
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg fixed h-full z-10">
        <div className="flex items-center justify-center h-16 border-b">
          <GraduationCap className="h-8 w-8 text-ev-blue" />
          <span className="ml-2 text-lg font-bold">Admin Portal</span>
        </div>
        
        <div className="p-4 border-b">
          <div className="text-sm font-medium text-gray-400">LOGGED IN AS</div>
          <div className="mt-2 flex items-center">
            <div className="w-8 h-8 bg-ev-blue text-white rounded-full flex items-center justify-center">
              {user.name.charAt(0)}
            </div>
            <div className="ml-2">
              <div className="text-sm font-medium">{user.name}</div>
              <div className="text-xs text-gray-500 capitalize">{user.role}</div>
            </div>
          </div>
        </div>
        
        <nav className="mt-4 overflow-y-auto max-h-[calc(100vh-220px)]">
          <ul className="space-y-1">
            {filteredNavigation.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center px-4 py-3 text-sm font-medium",
                      isActive
                        ? "text-ev-blue bg-blue-50 border-l-4 border-ev-blue"
                        : "text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          
          {/* Students section for teachers */}
          {user.role === "teacher" && teacherStudents.length > 0 && (
            <div className="mt-6">
              <Collapsible
                open={isStudentsOpen}
                onOpenChange={setIsStudentsOpen}
                className="w-full"
              >
                <CollapsibleTrigger className="flex items-center px-4 py-2 w-full text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <Student className="h-5 w-5 mr-3" />
                  <span>My Students</span>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`ml-auto h-4 w-4 transition-transform ${isStudentsOpen ? "transform rotate-180" : ""}`}
                  >
                    <path
                      d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <ul className="pl-8 space-y-1 mt-1 mb-2">
                    {teacherStudents.map((student) => (
                      <li key={student.id}>
                        <Link
                          to={`/admin-portal/teacher-portal?student=${student.id}`}
                          className="flex items-center px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 rounded-md"
                        >
                          <Student className="h-3 w-3 mr-2" />
                          {student.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            </div>
          )}
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 ml-64">
        <header className="bg-white shadow-sm h-16 flex items-center px-6">
          <h1 className="text-xl font-semibold text-gray-800">
            Admin Portal - {user.role === "admin" ? "Super Admin" : user.role === "headmaster" ? "Head Master" : "Teacher"} View
          </h1>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
