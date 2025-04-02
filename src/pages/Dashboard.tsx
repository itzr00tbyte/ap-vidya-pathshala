import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SubjectCard from "@/components/SubjectCard";
import ProgressBar from "@/components/ProgressBar";
import QuizNotification from "@/components/QuizNotification";
import ChapterCard from "@/components/ChapterCard";
import { BookOpen, Calculator, Globe, Beaker, Book, BookUser, FileText, PieChart, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const gradeParam = searchParams.get('grade');
  const [currentGrade, setCurrentGrade] = useState(gradeParam ? parseInt(gradeParam) : 6);
  
  useEffect(() => {
    if (gradeParam) {
      setCurrentGrade(parseInt(gradeParam));
    }
  }, [gradeParam]);

  // Subject data
  const subjects = [
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
  const chapters = [
    {
      title: "Introduction to Algebra",
      description: "Learn the basics of algebraic expressions",
      status: "completed" as const,
      duration: "45 mins",
    },
    {
      title: "Linear Equations",
      description: "Solve equations with one variable",
      status: "in-progress" as const,
      duration: "60 mins",
    },
    {
      title: "Quadratic Equations",
      description: "Understanding quadratic formulas",
      status: "locked" as const,
      duration: "50 mins",
    },
    {
      title: "Polynomials",
      description: "Working with polynomial expressions",
      status: "locked" as const,
      duration: "55 mins",
    },
  ];

  // Quiz data
  const quizzes = [
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Class {currentGrade} Dashboard
            </h1>
            <p className="text-gray-600 mt-1">Welcome back! Continue your learning journey</p>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <select 
              className="bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-ap-blue focus:border-transparent"
              value={currentGrade}
              onChange={(e) => setCurrentGrade(parseInt(e.target.value))}
            >
              <option value={6}>6th Grade</option>
              <option value={7}>7th Grade</option>
              <option value={8}>8th Grade</option>
              <option value={9}>9th Grade</option>
              <option value={10}>10th Grade</option>
            </select>
          </div>
        </div>
        
        {/* Progress Overview */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h2 className="text-lg font-semibold">Overall Progress</h2>
            <div className="text-sm text-gray-500">Academic Year 2023-24</div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <div className="w-full sm:w-2/3">
              <ProgressBar progress={overallProgress} color="blue" size="lg" />
              <div className="grid grid-cols-3 mt-6 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-ap-blue font-semibold text-xl">{subjects.length}</div>
                  <div className="text-xs text-gray-500 mt-1">Subjects</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-ap-green font-semibold text-xl">24</div>
                  <div className="text-xs text-gray-500 mt-1">Chapters</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <div className="text-ap-orange font-semibold text-xl">12</div>
                  <div className="text-xs text-gray-500 mt-1">Quizzes</div>
                </div>
              </div>
            </div>
            
            <div className="w-full sm:w-1/3 mt-4 sm:mt-0 flex flex-col justify-center">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Recent Activity</h3>
              <ul className="space-y-2">
                <li className="text-sm flex justify-between">
                  <span className="text-gray-600">Mathematics Quiz</span>
                  <span className="text-ap-blue font-medium">85%</span>
                </li>
                <li className="text-sm flex justify-between">
                  <span className="text-gray-600">Science Chapter 4</span>
                  <span className="text-ap-green font-medium">Completed</span>
                </li>
                <li className="text-sm flex justify-between">
                  <span className="text-gray-600">Telugu Assignment</span>
                  <span className="text-ap-yellow font-medium">Pending</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Subjects Grid */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Subjects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              id={subject.id}
              name={subject.name}
              icon={subject.icon}
              progress={subject.progress}
              color={subject.color}
              chaptersCount={subject.chaptersCount}
            />
          ))}
        </div>
        
        {/* Two Column Layout for Chapters and Quizzes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Mathematics Chapters</h2>
              <Button variant="ghost" size="sm" className="text-ap-blue">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {chapters.map((chapter, index) => (
                <ChapterCard 
                  key={index}
                  title={chapter.title}
                  description={chapter.description}
                  status={chapter.status}
                  duration={chapter.duration}
                  subjectColor="blue"
                />
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Quizzes</h2>
              <Button variant="ghost" size="sm" className="text-ap-blue">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {quizzes.map((quiz, index) => (
                <QuizNotification 
                  key={index}
                  title={quiz.title}
                  subject={quiz.subject}
                  date={quiz.date}
                  time={quiz.time}
                  subjectColor={quiz.subjectColor}
                  isUpcoming={quiz.isUpcoming}
                />
              ))}
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Study Tips</h2>
              <div className="bg-gradient-to-br from-ap-blue/10 to-ap-green/10 rounded-xl p-5 border border-blue-100">
                <div className="flex justify-between">
                  <div className="p-2 bg-white/80 rounded-lg text-ap-blue">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="p-2 bg-white/80 rounded-lg text-ap-blue">
                    <PieChart className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="mt-3 font-medium">Study Planner</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Create a study schedule to balance all subjects. Focus on weaker areas.
                </p>
                <Button variant="outline" size="sm" className="mt-4 w-full border-ap-blue text-ap-blue">
                  Create Study Plan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
