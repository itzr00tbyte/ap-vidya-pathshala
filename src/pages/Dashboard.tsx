
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { BookOpen, Calculator, Globe, Beaker, Book, BookUser } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProgressOverview from "@/components/dashboard/ProgressOverview";
import SubjectsGrid from "@/components/dashboard/SubjectsGrid";
import ChaptersList from "@/components/dashboard/ChaptersList";
import QuizAndTips from "@/components/dashboard/QuizAndTips";
import StudentProgressSection from "@/components/dashboard/StudentProgressSection";
import { Subject, Chapter, Quiz } from "@/types/dashboard";
import { MOCK_STUDENTS } from "@/data/mockStudents";
import { getFilteredStudents, generateSubjectProgressData, generatePerformanceData, generateAttendanceData } from "@/utils/dashboardData";

const Dashboard = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const gradeParam = searchParams.get('grade');
  const [currentGrade, setCurrentGrade] = useState(gradeParam ? parseInt(gradeParam) : 6);
  const [teacherStudents, setTeacherStudents] = useState([]);
  
  useEffect(() => {
    if (gradeParam) {
      setCurrentGrade(parseInt(gradeParam));
    }
  }, [gradeParam]);

  useEffect(() => {
    // Filter students based on teacher name
    if (user?.role === "teacher" && user?.name) {
      const filteredStudents = getFilteredStudents(user.name, user.role);
      setTeacherStudents(filteredStudents);
    }
  }, [user]);

  // Subject data
  const subjects: Subject[] = [
    { 
      id: "mathematics", 
      name: "Mathematics", 
      icon: <Calculator className="h-5 w-5" />, 
      progress: 65, 
      color: "blue", 
      chaptersCount: 12 
    },
    { 
      id: "science", 
      name: "Science", 
      icon: <Beaker className="h-5 w-5" />, 
      progress: 45, 
      color: "green", 
      chaptersCount: 15 
    },
    { 
      id: "social", 
      name: "Social Studies", 
      icon: <Globe className="h-5 w-5" />, 
      progress: 30, 
      color: "orange", 
      chaptersCount: 10 
    },
    { 
      id: "english", 
      name: "English", 
      icon: <BookOpen className="h-5 w-5" />, 
      progress: 75, 
      color: "purple", 
      chaptersCount: 8 
    },
    { 
      id: "telugu", 
      name: "Telugu", 
      icon: <Book className="h-5 w-5" />, 
      progress: 50, 
      color: "yellow", 
      chaptersCount: 9 
    },
    { 
      id: "hindi", 
      name: "Hindi", 
      icon: <BookUser className="h-5 w-5" />, 
      progress: 25, 
      color: "red", 
      chaptersCount: 7 
    },
  ];

  // Chapter data
  const chapters: Chapter[] = [
    {
      title: "Introduction to Algebra",
      description: "Learn the basics of algebraic expressions",
      status: "completed",
      duration: "45 mins",
    },
    {
      title: "Linear Equations",
      description: "Solve equations with one variable",
      status: "in-progress",
      duration: "60 mins",
    },
    {
      title: "Quadratic Equations",
      description: "Understanding quadratic formulas",
      status: "locked",
      duration: "50 mins",
    },
    {
      title: "Polynomials",
      description: "Working with polynomial expressions",
      status: "locked",
      duration: "55 mins",
    },
  ];

  // Quiz data
  const quizzes: Quiz[] = [
    {
      title: "Weekly Math Quiz",
      subject: "Mathematics",
      date: "Today",
      time: "3:00 PM",
      subjectColor: "blue",
      isUpcoming: false,
    },
    {
      title: "Science Test",
      subject: "Science",
      date: "Tomorrow",
      time: "11:30 AM",
      subjectColor: "green",
      isUpcoming: true,
    },
  ];

  // Calculate overall progress
  const overallProgress = Math.round(
    subjects.reduce((acc, subject) => acc + subject.progress, 0) / subjects.length
  );

  // Check if the current user is a teacher
  const isTeacher = user?.role === "teacher";

  // Get enriched student data from utility function
  const filteredStudents = isTeacher && user?.name 
    ? getFilteredStudents(user.name, "teacher") 
    : [];

  // Prepare student data visualizations
  const studentPerformanceData = generatePerformanceData(filteredStudents);
  const subjectProgressData = generateSubjectProgressData(filteredStudents);
  const attendanceData = generateAttendanceData(filteredStudents);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader 
          currentGrade={currentGrade}
          setCurrentGrade={setCurrentGrade}
        />
        
        {isTeacher && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Class Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-medium text-blue-700 mb-2">Total Students</h3>
                <p className="text-3xl font-bold">{filteredStudents.length}</p>
                <p className="text-sm text-gray-500 mt-1">Assigned to you</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-medium text-green-700 mb-2">Average Progress</h3>
                <p className="text-3xl font-bold">
                  {Math.round(filteredStudents.reduce((sum, student) => {
                    return sum + (student.subjectProgress ? 
                      student.subjectProgress.reduce((subSum, subject) => subSum + subject.progress, 0) / 
                      student.subjectProgress.length : 0);
                  }, 0) / (filteredStudents.length || 1))}%
                </p>
                <p className="text-sm text-gray-500 mt-1">Across all subjects</p>
              </div>
              <div className="bg-amber-50 rounded-lg p-4">
                <h3 className="font-medium text-amber-700 mb-2">Honor Roll Students</h3>
                <p className="text-3xl font-bold">
                  {filteredStudents.filter(student => student.performance === "Excellent").length}
                </p>
                <p className="text-sm text-gray-500 mt-1">Excellent performance</p>
              </div>
            </div>
          </div>
        )}
        
        <ProgressOverview 
          subjects={subjects}
          overallProgress={overallProgress}
        />
        
        <SubjectsGrid subjects={subjects} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ChaptersList 
              chapters={chapters}
              subjectColor="blue"
            />
          </div>
          
          <div>
            <QuizAndTips quizzes={quizzes} />
          </div>
        </div>
        
        {/* Show student progress section for teachers */}
        {isTeacher && (
          <StudentProgressSection
            customStudents={filteredStudents} 
            teacherName={user?.name || "Current Teacher"}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
