
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
  BarChart3,
  User,
  Book,
  BookOpen,
  ChartBar
} from "lucide-react";

// Extended mock student data with learning stats
const MOCK_STUDENTS = [
  {
    id: "1",
    name: "Aarav Patel",
    email: "aarav@example.com",
    grade: 8,
    section: "A",
    attendance: 92,
    performance: "Excellent",
    lastActive: "2023-04-01",
    teacher: "Teacher User",
    learningStats: {
      completedLessons: 24,
      avgQuizScore: 85,
      timeSpent: "14h 30m",
      strongSubjects: ["Mathematics", "Science"],
      weakSubjects: ["History"]
    }
  },
  {
    id: "2",
    name: "Diya Sharma",
    email: "diya@example.com",
    grade: 8,
    section: "B",
    attendance: 88,
    performance: "Good",
    lastActive: "2023-04-02",
    teacher: "Another Teacher",
    learningStats: {
      completedLessons: 20,
      avgQuizScore: 78,
      timeSpent: "12h 15m",
      strongSubjects: ["Languages", "Art"],
      weakSubjects: ["Science", "Mathematics"]
    }
  },
  {
    id: "3",
    name: "Arjun Singh",
    email: "arjun@example.com",
    grade: 9,
    section: "A",
    attendance: 95,
    performance: "Excellent",
    lastActive: "2023-04-01",
    teacher: "Teacher User",
    learningStats: {
      completedLessons: 28,
      avgQuizScore: 92,
      timeSpent: "16h 45m",
      strongSubjects: ["Mathematics", "Science", "Computer Science"],
      weakSubjects: []
    }
  },
  {
    id: "4",
    name: "Ananya Reddy",
    email: "ananya@example.com",
    grade: 7,
    section: "C",
    attendance: 78,
    performance: "Average",
    lastActive: "2023-03-28",
    teacher: "Another Teacher",
    learningStats: {
      completedLessons: 18,
      avgQuizScore: 68,
      timeSpent: "10h 20m",
      strongSubjects: ["Art", "Physical Education"],
      weakSubjects: ["Mathematics", "Science"]
    }
  },
  {
    id: "5",
    name: "Vikram Nair",
    email: "vikram@example.com",
    grade: 10,
    section: "A",
    attendance: 91,
    performance: "Good",
    lastActive: "2023-04-02",
    teacher: "Teacher User",
    learningStats: {
      completedLessons: 26,
      avgQuizScore: 82,
      timeSpent: "15h 10m",
      strongSubjects: ["History", "Geography"],
      weakSubjects: ["Mathematics"]
    }
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
  const [selectedStudent, setSelectedStudent] = useState<typeof MOCK_STUDENTS[0] | null>(null);
  const [showStatsCard, setShowStatsCard] = useState(false);

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
    // For teachers, filter students to only show their students
    let filtered = students;
    
    if (user?.role === "teacher") {
      filtered = filtered.filter(student => student.teacher === user.name);
    }

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
  }, [searchQuery, activeTab, students, user]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const viewStudentStats = (student: typeof MOCK_STUDENTS[0]) => {
    setSelectedStudent(student);
    setShowStatsCard(true);
  };

  const closeStatsCard = () => {
    setShowStatsCard(false);
    setSelectedStudent(null);
  };

  const canEditStudents = user?.role === "headmaster";
  const pageTitle = user?.role === "headmaster" ? "Student Management" : "My Class Students";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{pageTitle}</h1>
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
        
        <div className="grid gap-6 mb-6">
          {showStatsCard && selectedStudent && (
            <Card className="col-span-1 bg-white shadow-md overflow-hidden">
              <CardHeader className="bg-blue-50">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-medium text-blue-800">
                    Learning Statistics for {selectedStudent.name}
                  </CardTitle>
                  <Button variant="ghost" onClick={closeStatsCard}>
                    Close
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center justify-center">
                    <BookOpen className="h-8 w-8 text-blue-600 mb-2" />
                    <p className="text-sm text-gray-500">Completed Lessons</p>
                    <p className="text-2xl font-bold text-blue-700">{selectedStudent.learningStats.completedLessons}</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center justify-center">
                    <ChartBar className="h-8 w-8 text-green-600 mb-2" />
                    <p className="text-sm text-gray-500">Avg. Quiz Score</p>
                    <p className="text-2xl font-bold text-green-700">{selectedStudent.learningStats.avgQuizScore}%</p>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4 flex flex-col items-center justify-center">
                    <Book className="h-8 w-8 text-purple-600 mb-2" />
                    <p className="text-sm text-gray-500">Time Spent Learning</p>
                    <p className="text-2xl font-bold text-purple-700">{selectedStudent.learningStats.timeSpent}</p>
                  </div>
                  
                  <div className="bg-orange-50 rounded-lg p-4 flex flex-col items-center justify-center">
                    <User className="h-8 w-8 text-orange-600 mb-2" />
                    <p className="text-sm text-gray-500">Attendance</p>
                    <p className="text-2xl font-bold text-orange-700">{selectedStudent.attendance}%</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h3 className="text-md font-medium text-gray-700 mb-2">Strong Subjects</h3>
                    <div className="space-y-2">
                      {selectedStudent.learningStats.strongSubjects.length > 0 ? (
                        selectedStudent.learningStats.strongSubjects.map((subject, index) => (
                          <div key={index} className="flex items-center bg-green-50 p-2 rounded-md">
                            <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                            <span>{subject}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 italic">No strong subjects yet</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium text-gray-700 mb-2">Areas for Improvement</h3>
                    <div className="space-y-2">
                      {selectedStudent.learningStats.weakSubjects.length > 0 ? (
                        selectedStudent.learningStats.weakSubjects.map((subject, index) => (
                          <div key={index} className="flex items-center bg-orange-50 p-2 rounded-md">
                            <div className="h-3 w-3 rounded-full bg-orange-500 mr-2"></div>
                            <span>{subject}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 italic">No weak subjects</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
                                <DropdownMenuItem onClick={() => viewStudentStats(student)}>
                                  View Learning Stats
                                </DropdownMenuItem>
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
