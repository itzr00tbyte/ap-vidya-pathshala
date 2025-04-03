
import { useEffect } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { 
  Users, School, BookOpen, GraduationCap, 
  BarChart3, Settings, LogOut, UserCog, Calendar 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  
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
          <GraduationCap className="h-8 w-8 text-ap-blue" />
          <span className="ml-2 text-lg font-bold">Admin Portal</span>
        </div>
        
        <div className="p-4 border-b">
          <div className="text-sm font-medium text-gray-400">LOGGED IN AS</div>
          <div className="mt-2 flex items-center">
            <div className="w-8 h-8 bg-ap-blue text-white rounded-full flex items-center justify-center">
              {user.name.charAt(0)}
            </div>
            <div className="ml-2">
              <div className="text-sm font-medium">{user.name}</div>
              <div className="text-xs text-gray-500 capitalize">{user.role}</div>
            </div>
          </div>
        </div>
        
        <nav className="mt-4">
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
                        ? "text-ap-blue bg-blue-50 border-l-4 border-ap-blue"
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

