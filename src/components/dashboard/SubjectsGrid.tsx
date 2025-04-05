
import React from "react";
import SubjectCard from "@/components/SubjectCard";
import { Subject } from "@/types/dashboard";
import { useAuth } from "@/context/AuthContext";
import { MOCK_STUDENTS } from "@/data/mockStudents";
import { 
  BookOpen, 
  BookText, 
  BeakerIcon, 
  Globe2, 
  Dna, 
  Calculator 
} from "lucide-react";

interface SubjectsGridProps {
  subjects?: Subject[];
}

const SubjectsGrid = ({ subjects: propSubjects }: SubjectsGridProps) => {
  const { user } = useAuth();
  
  // Generate subjects from mock data if not provided as props
  const subjects = propSubjects || generateSubjectsFromMockData(user?.name);
  
  return (
    <>
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
    </>
  );
};

// Helper function to generate subjects from mock data
const generateSubjectsFromMockData = (teacherName?: string): Subject[] => {
  // For students, get their own subject progress
  if (!teacherName) {
    const studentSubjects = [
      {
        id: "math",
        name: "Mathematics",
        icon: <Calculator className="h-5 w-5" />,
        progress: 65,
        color: "blue",
        chaptersCount: 12,
      },
      {
        id: "science",
        name: "Science",
        icon: <BeakerIcon className="h-5 w-5" />,
        progress: 85,
        color: "green",
        chaptersCount: 10,
      },
      {
        id: "english",
        name: "English",
        icon: <BookText className="h-5 w-5" />,
        progress: 75,
        color: "purple",
        chaptersCount: 8,
      },
      {
        id: "social",
        name: "Social Studies",
        icon: <Globe2 className="h-5 w-5" />,
        progress: 60,
        color: "amber",
        chaptersCount: 9,
      },
      {
        id: "cs",
        name: "Computer Science",
        icon: <BookOpen className="h-5 w-5" />,
        progress: 90,
        color: "indigo",
        chaptersCount: 6,
      },
      {
        id: "bio",
        name: "Biology",
        icon: <Dna className="h-5 w-5" />,
        progress: 70,
        color: "teal",
        chaptersCount: 11,
      },
    ];
    return studentSubjects;
  }
  
  // For teachers, collect all subjects they teach based on mock data
  const teacherStudents = MOCK_STUDENTS.filter(student => student.teacher === teacherName);
  
  // Extract unique subjects from all students' subject progress
  const subjectMap = new Map<string, { totalProgress: number; count: number }>();
  
  teacherStudents.forEach(student => {
    if (student.subjectProgress) {
      student.subjectProgress.forEach(subj => {
        if (!subjectMap.has(subj.subject)) {
          subjectMap.set(subj.subject, { totalProgress: 0, count: 0 });
        }
        const current = subjectMap.get(subj.subject)!;
        current.totalProgress += subj.progress;
        current.count += 1;
      });
    }
  });
  
  // Convert to Subject array with average progress
  const icons: Record<string, ReactNode> = {
    "Mathematics": <Calculator className="h-5 w-5" />,
    "Science": <BeakerIcon className="h-5 w-5" />,
    "English": <BookText className="h-5 w-5" />,
    "Social Studies": <Globe2 className="h-5 w-5" />,
    "Computer Science": <BookOpen className="h-5 w-5" />,
    "Biology": <Dna className="h-5 w-5" />,
  };
  
  const colors: Record<string, string> = {
    "Mathematics": "blue",
    "Science": "green",
    "English": "purple",
    "Social Studies": "amber",
    "Computer Science": "indigo",
    "Biology": "teal",
  };
  
  return Array.from(subjectMap.entries()).map(([subject, data], index) => ({
    id: subject.toLowerCase().replace(/\s+/g, '-'),
    name: subject,
    icon: icons[subject] || <BookOpen className="h-5 w-5" />,
    progress: Math.round(data.totalProgress / data.count),
    color: colors[subject] || "blue",
    chaptersCount: Math.floor(Math.random() * 10) + 5, // Random chapter count between 5-15
  }));
};

export default SubjectsGrid;
