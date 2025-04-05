
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, SortDesc, SortAsc, BookOpen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Import our refactored components
import StudentStatsCard from "@/components/student/StudentStatsCard";
import StudentTable from "@/components/student/StudentTable";
import StudentToolbar from "@/components/student/StudentToolbar";
import GradeTabs from "@/components/student/GradeTabs";
import { MOCK_STUDENTS, Student } from "@/data/mockStudents";
import ProgressBar from "@/components/ProgressBar";

export default function StudentManagement() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Students will have subject progress data if it doesn't exist
  const studentsWithProgress = MOCK_STUDENTS.map(student => {
    if (!student.subjectProgress) {
      // Generate some random subject progress if not available
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
  
  const [students, setStudents] = useState(studentsWithProgress);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(studentsWithProgress);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showStatsCard, setShowStatsCard] = useState(false);
  const [showSubjectProgressDialog, setShowSubjectProgressDialog] = useState(false);
  const [progressSort, setProgressSort] = useState<"none" | "asc" | "desc">("none");

  useEffect(() => {
    // Check if user has the required role
    if (!user || (user.role !== "teacher" && user.role !== "headmaster" && user.role !== "admin")) {
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
    
    if (user?.role === "teacher" && user?.name) {
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
    
    // Apply progress sort if enabled
    if (progressSort !== "none") {
      filtered = [...filtered].sort((a, b) => {
        const avgProgressA = getAverageProgress(a);
        const avgProgressB = getAverageProgress(b);
        
        return progressSort === "asc" 
          ? avgProgressA - avgProgressB 
          : avgProgressB - avgProgressA;
      });
    }

    setFilteredStudents(filtered);
  }, [searchQuery, activeTab, students, user, progressSort]);

  // Calculate average progress for a student across all subjects
  const getAverageProgress = (student: Student) => {
    if (!student.subjectProgress || student.subjectProgress.length === 0) {
      return 0;
    }
    
    const total = student.subjectProgress.reduce((sum, subject) => sum + subject.progress, 0);
    return Math.round(total / student.subjectProgress.length);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const viewStudentStats = (student: Student) => {
    setSelectedStudent(student);
    setShowStatsCard(true);
  };
  
  const viewSubjectProgress = (student: Student) => {
    setSelectedStudent(student);
    setShowSubjectProgressDialog(true);
  };

  const closeStatsCard = () => {
    setShowStatsCard(false);
    setSelectedStudent(null);
  };
  
  const closeSubjectProgressDialog = () => {
    setShowSubjectProgressDialog(false);
  };
  
  const toggleProgressSort = () => {
    // Cycle through none -> asc -> desc -> none
    if (progressSort === "none") {
      setProgressSort("asc");
      toast({
        title: "Sorting progress",
        description: "Showing lowest progress first",
      });
    } else if (progressSort === "asc") {
      setProgressSort("desc");
      toast({
        title: "Sorting progress",
        description: "Showing highest progress first",
      });
    } else {
      setProgressSort("none");
      toast({
        title: "Sorting disabled",
        description: "Using default sort order",
      });
    }
  };

  const canEditStudents = user?.role === "headmaster" || user?.role === "admin";
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
          
          <div className="mt-4 md:mt-0 flex space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {progressSort === "asc" ? (
                    <SortAsc className="mr-2 h-4 w-4" />
                  ) : progressSort === "desc" ? (
                    <SortDesc className="mr-2 h-4 w-4" />
                  ) : (
                    <BookOpen className="mr-2 h-4 w-4" />
                  )}
                  Progress
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setProgressSort("asc")}>
                  <SortAsc className="mr-2 h-4 w-4" />
                  Lowest First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setProgressSort("desc")}>
                  <SortDesc className="mr-2 h-4 w-4" />
                  Highest First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setProgressSort("none")}>
                  Clear Sorting
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {canEditStudents && (
              <Button className="flex items-center">
                <UserPlus className="mr-2 h-4 w-4" />
                Add New Student
              </Button>
            )}
          </div>
        </div>
        
        <div className="grid gap-6 mb-6">
          {showStatsCard && selectedStudent && (
            <StudentStatsCard 
              student={selectedStudent} 
              onClose={closeStatsCard}
            />
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <StudentToolbar 
            searchQuery={searchQuery} 
            onSearchChange={handleSearch} 
          />
          
          <GradeTabs 
            activeTab={activeTab} 
            onTabChange={handleTabChange}
          >
            <StudentTable 
              students={filteredStudents} 
              onViewStats={viewStudentStats} 
              canEditStudents={canEditStudents}
              onViewSubjectProgress={viewSubjectProgress}
            />
          </GradeTabs>
        </div>
      </div>
      
      {/* Subject Progress Dialog */}
      <Dialog open={showSubjectProgressDialog} onOpenChange={setShowSubjectProgressDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Subject Progress</DialogTitle>
            <DialogDescription>
              {selectedStudent?.name}'s learning progress by subject
            </DialogDescription>
          </DialogHeader>
          
          {selectedStudent && selectedStudent.subjectProgress && (
            <div className="space-y-4">
              {selectedStudent.subjectProgress.map((subject, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{subject.subject}</span>
                    <span className="text-sm">{subject.progress}%</span>
                  </div>
                  <ProgressBar 
                    progress={subject.progress} 
                    color={
                      subject.progress >= 75 ? "green" : 
                      subject.progress >= 40 ? "blue" : "yellow"
                    }
                    size="md"
                    showLabel={false}
                  />
                </div>
              ))}
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm">{getAverageProgress(selectedStudent)}%</span>
                </div>
                <ProgressBar 
                  progress={getAverageProgress(selectedStudent)} 
                  color="blue"
                  size="lg"
                  showLabel={false}
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
