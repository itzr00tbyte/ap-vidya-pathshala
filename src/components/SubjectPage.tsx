import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/ProgressBar";
import ChapterCard from "@/components/ChapterCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Beaker, Globe, BookOpen, Book, BookUser, FileText, Users, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type SubjectData = {
  id: string;
  name: string;
  icon: JSX.Element;
  color: string;
  description: string;
  progress: number;
  chapters: {
    title: string;
    description: string;
    status: "completed" | "in-progress" | "locked";
    duration: string;
  }[];
};

const SubjectPage = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const [subject, setSubject] = useState<SubjectData | null>(null);

  useEffect(() => {
    // This would normally be a fetch from an API
    // Simulating getting subject data
    const getSubjectData = () => {
      const subjects: Record<string, SubjectData> = {
        mathematics: {
          id: "mathematics",
          name: "Mathematics",
          icon: <Calculator className="h-6 w-6" />,
          color: "blue",
          description: "Develop problem-solving skills and logical reasoning through numbers, patterns, and equations.",
          progress: 65,
          chapters: [
            {
              title: "Introduction to Algebra",
              description: "Learn the basics of algebraic expressions and equations",
              status: "completed",
              duration: "45 mins",
            },
            {
              title: "Linear Equations",
              description: "Solve equations with one variable and understand their applications",
              status: "in-progress",
              duration: "60 mins",
            },
            {
              title: "Quadratic Equations",
              description: "Understanding quadratic formulas and their graphical representation",
              status: "locked",
              duration: "50 mins",
            },
            {
              title: "Polynomials",
              description: "Working with polynomial expressions and factorization",
              status: "locked",
              duration: "55 mins",
            },
            {
              title: "Geometric Constructions",
              description: "Learn to create geometric figures using compass and straightedge",
              status: "locked",
              duration: "40 mins",
            },
            {
              title: "Statistics and Probability",
              description: "Analyze data and understand random events",
              status: "locked",
              duration: "65 mins",
            },
          ],
        },
        science: {
          id: "science",
          name: "Science",
          icon: <Beaker className="h-6 w-6" />,
          color: "green",
          description: "Explore physical and biological phenomena through observation, experimentation, and analysis.",
          progress: 45,
          chapters: [
            {
              title: "Matter and Its Properties",
              description: "Understanding the physical and chemical properties of matter",
              status: "completed",
              duration: "50 mins",
            },
            {
              title: "Force and Motion",
              description: "Learn about Newton's laws and their applications",
              status: "completed",
              duration: "55 mins",
            },
            {
              title: "Electricity and Magnetism",
              description: "Understand electric circuits and magnetic fields",
              status: "in-progress",
              duration: "60 mins",
            },
            {
              title: "Plant and Animal Life",
              description: "Study of living organisms and their systems",
              status: "locked",
              duration: "65 mins",
            },
            {
              title: "Human Body Systems",
              description: "Learn about different organ systems and their functions",
              status: "locked",
              duration: "70 mins",
            },
          ],
        },
        social: {
          id: "social",
          name: "Social Studies",
          icon: <Globe className="h-6 w-6" />,
          color: "orange",
          description: "Understand human society, history, geography, and civic responsibilities.",
          progress: 30,
          chapters: [
            {
              title: "Ancient Indian History",
              description: "Explore the rich history of ancient Indian civilizations",
              status: "completed",
              duration: "55 mins",
            },
            {
              title: "Indian Geography",
              description: "Learn about the diverse geographical features of India",
              status: "in-progress",
              duration: "60 mins",
            },
            {
              title: "Civics and Constitution",
              description: "Understanding Indian democracy and constitution",
              status: "locked",
              duration: "50 mins",
            },
            {
              title: "Modern Indian History",
              description: "Study the freedom struggle and post-independence India",
              status: "locked",
              duration: "65 mins",
            },
          ],
        },
        english: {
          id: "english",
          name: "English",
          icon: <BookOpen className="h-6 w-6" />,
          color: "purple",
          description: "Develop reading, writing, speaking, and listening skills in English language.",
          progress: 75,
          chapters: [
            {
              title: "Reading Comprehension",
              description: "Improve understanding and analysis of text",
              status: "completed",
              duration: "40 mins",
            },
            {
              title: "Grammar Basics",
              description: "Learn parts of speech and sentence structure",
              status: "completed",
              duration: "45 mins",
            },
            {
              title: "Writing Skills",
              description: "Develop essay writing and creative writing skills",
              status: "in-progress",
              duration: "50 mins",
            },
            {
              title: "Poetry and Literature",
              description: "Analyze poems and literary works",
              status: "locked",
              duration: "55 mins",
            },
          ],
        },
        telugu: {
          id: "telugu",
          name: "Telugu",
          icon: <Book className="h-6 w-6" />,
          color: "yellow",
          description: "Master Telugu language through literature, grammar, and communication practice.",
          progress: 50,
          chapters: [
            {
              title: "Telugu Padyalu (Poetry)",
              description: "Learn classical Telugu poetry and their meanings",
              status: "completed",
              duration: "50 mins",
            },
            {
              title: "Telugu Vyakaranam (Grammar)",
              description: "Understand the grammatical rules of Telugu language",
              status: "in-progress",
              duration: "55 mins",
            },
            {
              title: "Telugu Sahityam (Literature)",
              description: "Explore various forms of Telugu literature",
              status: "locked",
              duration: "60 mins",
            },
            {
              title: "Rachana (Creative Writing)",
              description: "Develop writing skills in Telugu",
              status: "locked",
              duration: "45 mins",
            },
          ],
        },
        hindi: {
          id: "hindi",
          name: "Hindi",
          icon: <BookUser className="h-6 w-6" />,
          color: "red",
          description: "Learn Hindi language through vocabulary building, grammar, and literary appreciation.",
          progress: 25,
          chapters: [
            {
              title: "Hindi Varnamala",
              description: "Master Hindi alphabets and their pronunciations",
              status: "completed",
              duration: "40 mins",
            },
            {
              title: "Hindi Vyakaran (Grammar)",
              description: "Learn basic Hindi grammar rules",
              status: "in-progress",
              duration: "50 mins",
            },
            {
              title: "Hindi Kahaniyan (Stories)",
              description: "Read and understand Hindi short stories",
              status: "locked",
              duration: "45 mins",
            },
            {
              title: "Hindi Nibandh (Essays)",
              description: "Learn to write essays in Hindi",
              status: "locked",
              duration: "55 mins",
            },
          ],
        },
      };

      return subjects[subjectId || "mathematics"] || subjects.mathematics;
    };

    setSubject(getSubjectData());
  }, [subjectId]);

  if (!subject) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Subject Header */}
        <div className={`bg-ap-${subject.color}/10 rounded-xl p-6 mb-8`}>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex items-start space-x-4">
              <div className={`p-3 bg-ap-${subject.color}/20 rounded-lg text-ap-${subject.color}`}>
                {subject.icon}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{subject.name}</h1>
                <p className="text-gray-600 mt-1 max-w-2xl">{subject.description}</p>
              </div>
            </div>
            <div className="mt-6 md:mt-0 flex flex-col items-end justify-center">
              <div className="text-sm text-gray-500 mb-2">Your Progress</div>
              <div className="w-full md:w-48">
                <ProgressBar progress={subject.progress} color={subject.color} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Subject Content Tabs */}
        <Tabs defaultValue="chapters">
          <TabsList className="mb-8">
            <TabsTrigger value="chapters" className="text-sm">
              Chapters
            </TabsTrigger>
            <TabsTrigger value="resources" className="text-sm">
              Resources
            </TabsTrigger>
            <TabsTrigger value="tests" className="text-sm">
              Tests & Quizzes
            </TabsTrigger>
            <TabsTrigger value="discussions" className="text-sm">
              Discussions
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chapters">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold mb-4">Chapters</h2>
                <div className="space-y-4">
                  {subject.chapters.map((chapter, index) => (
                    <ChapterCard
                      key={index}
                      title={chapter.title}
                      description={chapter.description}
                      status={chapter.status}
                      duration={chapter.duration}
                      subjectColor={subject.color}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Learning Resources</h2>
                <div className="space-y-4">
                  <div className={`bg-gradient-to-br from-ap-${subject.color}/10 to-white rounded-xl p-5 border border-ap-${subject.color}/20`}>
                    <div className="flex justify-between">
                      <div className={`p-2 bg-white/80 rounded-lg text-ap-${subject.color}`}>
                        <FileText className="h-5 w-5" />
                      </div>
                      <span className="text-xs text-gray-500">PDF</span>
                    </div>
                    <h3 className="mt-3 font-medium">Study Materials</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Comprehensive notes and examples for all chapters.
                    </p>
                    <Button variant="outline" size="sm" className={`mt-4 w-full border-ap-${subject.color} text-ap-${subject.color}`}>
                      Download
                    </Button>
                  </div>
                  
                  <div className={`bg-gradient-to-br from-ap-${subject.color}/10 to-white rounded-xl p-5 border border-ap-${subject.color}/20`}>
                    <div className="flex justify-between">
                      <div className={`p-2 bg-white/80 rounded-lg text-ap-${subject.color}`}>
                        <PlayCircle className="h-5 w-5" />
                      </div>
                      <span className="text-xs text-gray-500">VIDEO</span>
                    </div>
                    <h3 className="mt-3 font-medium">Video Lessons</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Watch expert teachers explain key concepts.
                    </p>
                    <Button variant="outline" size="sm" className={`mt-4 w-full border-ap-${subject.color} text-ap-${subject.color}`}>
                      Watch Videos
                    </Button>
                  </div>
                  
                  <div className={`bg-gradient-to-br from-ap-${subject.color}/10 to-white rounded-xl p-5 border border-ap-${subject.color}/20`}>
                    <div className="flex justify-between">
                      <div className={`p-2 bg-white/80 rounded-lg text-ap-${subject.color}`}>
                        <Users className="h-5 w-5" />
                      </div>
                      <span className="text-xs text-gray-500">FORUM</span>
                    </div>
                    <h3 className="mt-3 font-medium">Ask Doubts</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Connect with teachers and peers to clear your doubts.
                    </p>
                    <Button variant="outline" size="sm" className={`mt-4 w-full border-ap-${subject.color} text-ap-${subject.color}`}>
                      Join Discussion
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="resources">
            <div className="text-center py-16">
              <h2 className="text-xl font-semibold text-gray-800">Additional Resources Coming Soon</h2>
              <p className="text-gray-600 mt-2">We're adding more study materials for this subject.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="tests">
            <div className="text-center py-16">
              <h2 className="text-xl font-semibold text-gray-800">Tests & Quizzes Coming Soon</h2>
              <p className="text-gray-600 mt-2">Practice tests will be available once you progress through the chapters.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="discussions">
            <div className="text-center py-16">
              <h2 className="text-xl font-semibold text-gray-800">Discussion Forum Coming Soon</h2>
              <p className="text-gray-600 mt-2">Connect with teachers and peers to discuss topics and clear doubts.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SubjectPage;
