
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { UserPlus } from "lucide-react";

// Import our refactored components
import StudentStatsCard from "@/components/student/StudentStatsCard";
import StudentTable from "@/components/student/StudentTable";
import StudentToolbar from "@/components/student/StudentToolbar";
import GradeTabs from "@/components/student/GradeTabs";
import { MOCK_STUDENTS, Student } from "@/data/mockStudents";

export default function StudentManagement() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [students, setStudents] = useState(MOCK_STUDENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(MOCK_STUDENTS);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
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

  const viewStudentStats = (student: Student) => {
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
            />
          </GradeTabs>
        </div>
      </div>
    </div>
  );
}
