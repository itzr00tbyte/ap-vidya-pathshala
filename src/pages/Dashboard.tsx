
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

const Dashboard = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const gradeParam = searchParams.get('grade');
  const [currentGrade, setCurrentGrade] = useState(gradeParam ? parseInt(gradeParam) : 6);
  
  useEffect(() => {
    if (gradeParam) {
      setCurrentGrade(parseInt(gradeParam));
    }
  }, [gradeParam]);

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

  // Add subject progress data to students
  const enrichStudentsWithProgress = () => {
    // Filter students that belong to this teacher
    const teacherStudents = MOCK_STUDENTS.filter(student => 
      student.teacher === (user?.name || "Current Teacher")
    ).slice(0, 6);

    return teacherStudents.map(student => {
      if (!student.subjectProgress) {
        student.subjectProgress = subjects.map(subject => ({
          subject: subject.name,
          progress: Math.floor(Math.random() * 100)
        }));
      }
      return student;
    });
  };

  // Get enriched student data
  const enrichedStudents = enrichStudentsWithProgress();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader 
          currentGrade={currentGrade}
          setCurrentGrade={setCurrentGrade}
        />
        
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
            customStudents={enrichedStudents} 
            teacherName={user?.name || "Current Teacher"}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
