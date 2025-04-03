
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  MoreHorizontal, 
  Search, 
  UserPlus, 
  Filter, 
  Download, 
  BarChart3 
} from "lucide-react";

// Mock student data
const MOCK_STUDENTS = [
  {
    id: "1",
    name: "Aarav Patel",
    email: "aarav@example.com",
    grade: 8,
    section: "A",
    attendance: 92,
    performance: "Excellent",
    lastActive: "2023-04-01"
  },
  {
    id: "2",
    name: "Diya Sharma",
    email: "diya@example.com",
    grade: 8,
    section: "B",
    attendance: 88,
    performance: "Good",
    lastActive: "2023-04-02"
  },
  {
    id: "3",
    name: "Arjun Singh",
    email: "arjun@example.com",
    grade: 9,
    section: "A",
    attendance: 95,
    performance: "Excellent",
    lastActive: "2023-04-01"
  },
  {
    id: "4",
    name: "Ananya Reddy",
    email: "ananya@example.com",
    grade: 7,
    section: "C",
    attendance: 78,
    performance: "Average",
    lastActive: "2023-03-28"
  },
  {
    id: "5",
    name: "Vikram Nair",
    email: "vikram@example.com",
    grade: 10,
    section: "A",
    attendance: 91,
    performance: "Good",
    lastActive: "2023-04-02"
  },
];

export default function StudentManagement() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [students, setStudents] = useState(MOCK_STUDENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(MOCK_STUDENTS);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    // Check if user has the required role
    if (!user || (user.role !== "teacher" && user.role !== "headmaster")) {
      navigate("/dashboard");
      toast({
        title: "Access denied",
        description: "You don't have permission to access this page",
        variant: "destructive",
      });
    }
  }, [user, navigate, toast]);

  useEffect(() => {
    // Filter students based on search and active tab
    let filtered = students;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(student => 
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply tab filter
    if (activeTab !== "all") {
      const grade = parseInt(activeTab);
      filtered = filtered.filter(student => student.grade === grade);
    }

    setFilteredStudents(filtered);
  }, [searchQuery, activeTab, students]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const canEditStudents = user?.role === "headmaster";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Student Management</h1>
            <p className="text-gray-500 mt-1">
              {user?.role === "headmaster" 
                ? "View and manage all student details" 
                : "View your students' details and performance"}
            </p>
          </div>
          
          {canEditStudents && (
            <div className="mt-4 md:mt-0">
              <Button className="flex items-center">
                <UserPlus className="mr-2 h-4 w-4" />
                Add New Student
              </Button>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="relative rounded-md w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search students..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10"
              />
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Reports
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="px-4 sm:px-6 border-b border-gray-200">
              <TabsList className="flex overflow-x-auto py-2">
                <TabsTrigger value="all">All Grades</TabsTrigger>
                <TabsTrigger value="7">Grade 7</TabsTrigger>
                <TabsTrigger value="8">Grade 8</TabsTrigger>
                <TabsTrigger value="9">Grade 9</TabsTrigger>
                <TabsTrigger value="10">Grade 10</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value={activeTab} className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Section</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.id}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>{student.grade}</TableCell>
                          <TableCell>{student.section}</TableCell>
                          <TableCell>{student.attendance}%</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              student.performance === 'Excellent' ? 'bg-green-100 text-green-800' :
                              student.performance === 'Good' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {student.performance}
                            </span>
                          </TableCell>
                          <TableCell>{student.lastActive}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View details</DropdownMenuItem>
                                <DropdownMenuItem>View performance</DropdownMenuItem>
                                {canEditStudents && (
                                  <>
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
                                  </>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={9} className="h-24 text-center">
                          No students found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
