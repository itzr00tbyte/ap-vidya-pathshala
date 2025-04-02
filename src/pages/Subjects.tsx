
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SubjectCard from "@/components/SubjectCard";
import { 
  BookOpen, 
  Flask, 
  BookText, 
  Clock, 
  Globe, 
  Laptop 
} from "lucide-react";

// Mock subject data
const mockSubjects = [
  {
    id: "1",
    name: "Mathematics",
    description: "Learn algebra, geometry, and calculus concepts",
    coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=500",
    progress: 65,
    chapters: 12,
    color: "blue",
    icon: <BookOpen />
  },
  {
    id: "2",
    name: "Science",
    description: "Explore physics, chemistry, and biology",
    coverImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=500",
    progress: 42,
    chapters: 15,
    color: "green",
    icon: <Flask />
  },
  {
    id: "3",
    name: "English",
    description: "Master grammar, literature, and writing skills",
    coverImage: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=500",
    progress: 78,
    chapters: 10,
    color: "yellow",
    icon: <BookText />
  },
  {
    id: "4",
    name: "History",
    description: "Discover world civilizations and important events",
    coverImage: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=500",
    progress: 30,
    chapters: 14,
    color: "red",
    icon: <Clock />
  },
  {
    id: "5",
    name: "Geography",
    description: "Study lands, features, and phenomena of Earth",
    coverImage: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=500",
    progress: 55,
    chapters: 8,
    color: "purple",
    icon: <Globe />
  },
  {
    id: "6",
    name: "Computer Science",
    description: "Learn programming, algorithms, and digital systems",
    coverImage: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=500",
    progress: 20,
    chapters: 16,
    color: "teal",
    icon: <Laptop />
  }
];

const Subjects = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedGrade] = useState<number>(user?.grade || 6);

  const handleSubjectClick = (subjectId: string) => {
    navigate(`/subject/${subjectId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto py-8 px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Subjects</h1>
          <p className="text-gray-600 mt-2">
            Browse and learn from our comprehensive subject catalog for Grade {selectedGrade}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockSubjects.map((subject) => (
            <SubjectCard 
              key={subject.id}
              id={subject.id}
              name={subject.name}
              icon={subject.icon}
              progress={subject.progress}
              color={subject.color}
              chaptersCount={subject.chapters}
              onClick={() => handleSubjectClick(subject.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Subjects;
