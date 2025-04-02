
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/ProgressBar";
import ChapterCard from "@/components/ChapterCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calculator, 
  Beaker, 
  Globe, 
  BookOpen, 
  BookText, 
  FileText, 
  Users, 
  PlayCircle, 
  CheckCircle, 
  XCircle, 
  HelpCircle,
  Clock 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
};

type SyllabusUnit = {
  title: string;
  topics: string[];
  learningOutcomes: string[];
};

type SubjectData = {
  id: string;
  name: string;
  icon: JSX.Element;
  color: string;
  description: string;
  progress: number;
  syllabus?: SyllabusUnit[];
  chapters: {
    title: string;
    description: string;
    status: "completed" | "in-progress" | "locked";
    duration: string;
    quiz?: QuizQuestion[];
  }[];
};

const SubjectPage = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const [subject, setSubject] = useState<SubjectData | null>(null);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(1);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [currentChapter, setCurrentChapter] = useState<string>("");
  
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
          syllabus: [
            {
              title: "Algebra Fundamentals",
              topics: [
                "Variables and Constants",
                "Algebraic Expressions",
                "Simplifying Expressions",
                "Linear Equations"
              ],
              learningOutcomes: [
                "Identify and use variables in mathematical contexts",
                "Translate word problems into algebraic expressions",
                "Solve linear equations with one variable",
                "Apply algebraic principles to real-world problems"
              ]
            },
            {
              title: "Geometry and Measurements",
              topics: [
                "Basic Geometric Shapes",
                "Area and Perimeter",
                "Angles and Lines",
                "Coordinate Geometry"
              ],
              learningOutcomes: [
                "Calculate the area and perimeter of basic shapes",
                "Analyze properties of angles and lines",
                "Plot points and graphs on the coordinate plane",
                "Apply geometric principles to solve problems"
              ]
            },
            {
              title: "Number Systems",
              topics: [
                "Integers and Operations",
                "Fractions and Decimals",
                "Rational Numbers",
                "Properties of Numbers"
              ],
              learningOutcomes: [
                "Perform operations with integers",
                "Convert between fractions, decimals, and percentages",
                "Apply properties of rational numbers",
                "Solve problems involving number systems"
              ]
            }
          ],
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
              quiz: [
                {
                  id: "q1",
                  question: "Which of the following is a linear equation?",
                  options: ["y = x² + 1", "y = 2x + 3", "y = 1/x", "y = √x"],
                  correctAnswer: "y = 2x + 3"
                },
                {
                  id: "q2",
                  question: "What is the slope of the line y = 3x - 4?",
                  options: ["3", "-4", "4", "0"],
                  correctAnswer: "3"
                },
                {
                  id: "q3",
                  question: "What is the solution to 2x + 5 = 15?",
                  options: ["x = 5", "x = 10", "x = 7.5", "x = 5.5"],
                  correctAnswer: "x = 5"
                },
                {
                  id: "q4",
                  question: "What is the y-intercept of the line y = 4x - 7?",
                  options: ["4", "-7", "7", "0"],
                  correctAnswer: "-7"
                },
                {
                  id: "q5",
                  question: "Which property allows us to add the same number to both sides of an equation?",
                  options: [
                    "Distributive Property", 
                    "Commutative Property", 
                    "Addition Property of Equality", 
                    "Associative Property"
                  ],
                  correctAnswer: "Addition Property of Equality"
                }
              ]
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
          syllabus: [
            {
              title: "Physical Sciences",
              topics: [
                "Matter and Its Properties",
                "Force and Motion",
                "Energy and Work",
                "Electricity and Magnetism"
              ],
              learningOutcomes: [
                "Classify materials based on physical and chemical properties",
                "Explain Newton's laws of motion and apply them to everyday scenarios",
                "Understand different forms of energy and their conversions",
                "Describe the relationship between electricity and magnetism"
              ]
            },
            {
              title: "Life Sciences",
              topics: [
                "Cell Structure and Function",
                "Plant and Animal Life",
                "Human Body Systems",
                "Ecosystems and Environment"
              ],
              learningOutcomes: [
                "Identify cell structures and explain their functions",
                "Compare and contrast plant and animal life cycles",
                "Describe the major human body systems and their interactions",
                "Analyze ecosystem dynamics and environmental impacts"
              ]
            }
          ],
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
          syllabus: [
            {
              title: "History",
              topics: [
                "Ancient Indian History",
                "Medieval Indian History",
                "Modern Indian History",
                "World History Highlights"
              ],
              learningOutcomes: [
                "Trace the evolution of ancient Indian civilizations",
                "Analyze key events and developments in medieval India",
                "Evaluate the freedom struggle and its impact on modern India",
                "Connect Indian history with global historical trends"
              ]
            },
            {
              title: "Geography",
              topics: [
                "Physical Geography of India",
                "Human Geography",
                "Resource Distribution",
                "Environmental Concerns"
              ],
              learningOutcomes: [
                "Identify major geographical features of India",
                "Analyze population distribution and migration patterns",
                "Assess the distribution and utilization of natural resources",
                "Evaluate environmental challenges and conservation efforts"
              ]
            },
            {
              title: "Civics",
              topics: [
                "Indian Constitution",
                "Government Structure",
                "Rights and Duties",
                "Democratic Processes"
              ],
              learningOutcomes: [
                "Understand the key features of the Indian Constitution",
                "Describe the structure and functions of government",
                "Recognize fundamental rights and duties of citizens",
                "Explain democratic processes and civic participation"
              ]
            }
          ],
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
          syllabus: [
            {
              title: "Reading and Comprehension",
              topics: [
                "Fiction and Non-fiction Texts",
                "Poetry Analysis",
                "Critical Reading",
                "Context Clues and Vocabulary"
              ],
              learningOutcomes: [
                "Analyze different types of texts for meaning and structure",
                "Interpret poetic devices and their effects",
                "Evaluate arguments and evidence in texts",
                "Use context clues to determine word meanings"
              ]
            },
            {
              title: "Writing Skills",
              topics: [
                "Essay Writing",
                "Creative Writing",
                "Grammar and Syntax",
                "Research and Citation"
              ],
              learningOutcomes: [
                "Compose well-structured essays with clear arguments",
                "Create original fiction and poetry using literary techniques",
                "Apply grammar rules consistently in writing",
                "Conduct research and cite sources properly"
              ]
            },
            {
              title: "Communication",
              topics: [
                "Public Speaking",
                "Debate and Discussion",
                "Listening Skills",
                "Digital Communication"
              ],
              learningOutcomes: [
                "Deliver effective oral presentations",
                "Participate constructively in debates and discussions",
                "Demonstrate active listening techniques",
                "Communicate appropriately across digital platforms"
              ]
            }
          ],
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
        history: {
          id: "history",
          name: "History",
          icon: <Clock className="h-6 w-6" />,
          color: "red",
          description: "Discover world civilizations and important events through time.",
          progress: 30,
          syllabus: [
            {
              title: "Ancient Civilizations",
              topics: [
                "Mesopotamia and Egypt",
                "Ancient Greece",
                "Roman Empire",
                "Indus Valley Civilization"
              ],
              learningOutcomes: [
                "Compare the development of early human civilizations",
                "Analyze the contributions of ancient Greece to modern society",
                "Evaluate the rise and fall of the Roman Empire",
                "Describe the urban planning and culture of Indus Valley"
              ]
            },
            {
              title: "Medieval Period",
              topics: [
                "Feudal Systems",
                "Islamic Golden Age",
                "Byzantine Empire",
                "Medieval India"
              ],
              learningOutcomes: [
                "Explain the structure and impact of feudalism",
                "Recognize scientific and cultural advances of the Islamic Golden Age",
                "Analyze the Byzantine Empire's influence on Eastern Europe",
                "Trace the development of medieval Indian kingdoms"
              ]
            },
            {
              title: "Modern History",
              topics: [
                "Industrial Revolution",
                "World Wars",
                "Decolonization",
                "Contemporary Global Issues"
              ],
              learningOutcomes: [
                "Assess the social and economic impacts of industrialization",
                "Analyze causes and consequences of the World Wars",
                "Evaluate the process of decolonization in various regions",
                "Connect historical patterns to current global challenges"
              ]
            }
          ],
          chapters: [
            {
              title: "Ancient Indian History",
              description: "Explore the rich history of ancient Indian civilizations",
              status: "completed",
              duration: "55 mins",
            },
            {
              title: "World War II",
              description: "Study the causes, events, and aftermath of WWII",
              status: "in-progress",
              duration: "65 mins",
            },
            {
              title: "Cold War Era",
              description: "Understand the geopolitical tensions of the Cold War period",
              status: "locked",
              duration: "60 mins",
            },
            {
              title: "Indian Independence Movement",
              description: "Learn about India's struggle for independence",
              status: "locked",
              duration: "50 mins",
            },
          ],
        },
      };

      return subjects[subjectId || "mathematics"] || subjects.mathematics;
    };

    setSubject(getSubjectData());
  }, [subjectId]);

  const handleStartQuiz = (chapterTitle: string) => {
    setCurrentChapter(chapterTitle);
    setShowQuiz(true);
    setQuizSubmitted(false);
    setSelectedAnswers({});
    setQuizScore(0);
    window.scrollTo(0, 0);
  };

  const handleSelectAnswer = (questionId: string, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmitQuiz = () => {
    if (!subject) return;
    
    const chapter = subject.chapters.find(ch => ch.title === currentChapter);
    if (!chapter || !chapter.quiz) return;
    
    // Check if all questions are answered
    const allAnswered = chapter.quiz.every(q => selectedAnswers[q.id]);
    
    if (!allAnswered) {
      toast("Please answer all questions before submitting", {
        description: "You need to select an answer for each question",
      });
      return;
    }
    
    // Calculate score
    let score = 0;
    chapter.quiz.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        score++;
      }
    });
    
    const percentage = Math.round((score / chapter.quiz.length) * 100);
    setQuizScore(percentage);
    setQuizSubmitted(true);
    
    if (percentage >= 70) {
      toast("Quiz Completed!", {
        description: `Congratulations! You scored ${percentage}% on the quiz.`,
      });
    } else {
      toast("Quiz Completed", {
        description: `You scored ${percentage}%. You may want to review the material and try again.`,
      });
    }
  };

  const handleExitQuiz = () => {
    setShowQuiz(false);
  };

  if (!subject) {
    return <div>Loading...</div>;
  }

  // Find the chapter with quiz
  const currentQuizChapter = subject.chapters.find(ch => ch.title === currentChapter);
  const quizQuestions = currentQuizChapter?.quiz || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showQuiz ? (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{currentChapter} Quiz</h1>
                <p className="text-gray-600 mt-1">
                  Test your understanding of {currentChapter.toLowerCase()} concepts
                </p>
              </div>
              <Button variant="outline" onClick={handleExitQuiz}>
                Exit Quiz
              </Button>
            </div>
            
            {quizSubmitted ? (
              <div className="text-center py-12">
                <div className={`inline-flex items-center justify-center p-4 rounded-full ${
                  quizScore >= 70 ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {quizScore >= 70 ? 
                    <CheckCircle className="h-12 w-12" /> : 
                    <HelpCircle className="h-12 w-12" />
                  }
                </div>
                <h2 className="text-2xl font-bold mt-6">
                  {quizScore >= 70 ? 'Great job!' : 'Keep practicing!'}
                </h2>
                <p className="text-gray-600 mt-3 text-lg">
                  You scored {quizScore}% on this quiz
                </p>
                <div className="mt-8 flex justify-center gap-4">
                  <Button onClick={handleExitQuiz} variant="outline">
                    Return to Chapter
                  </Button>
                  {quizScore < 70 && (
                    <Button onClick={() => {
                      setQuizSubmitted(false);
                      setSelectedAnswers({});
                    }}>
                      Try Again
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <div className="flex gap-2 mb-6">
                  {quizQuestions.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`h-2 flex-1 rounded-full ${
                        idx + 1 === currentQuizIndex ? 'bg-ap-blue' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                
                {quizQuestions.map((question, idx) => (
                  <div 
                    key={question.id} 
                    className={idx + 1 === currentQuizIndex ? 'block' : 'hidden'}
                  >
                    <h3 className="text-lg font-medium mb-4">
                      Question {idx + 1}: {question.question}
                    </h3>
                    
                    <div className="space-y-3">
                      {question.options.map((option) => (
                        <div 
                          key={option}
                          onClick={() => handleSelectAnswer(question.id, option)}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedAnswers[question.id] === option 
                              ? 'border-ap-blue bg-ap-blue/10'
                              : 'border-gray-200 hover:border-ap-blue/50'
                          }`}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 flex justify-between">
                      {currentQuizIndex > 1 && (
                        <Button 
                          variant="outline"
                          onClick={() => setCurrentQuizIndex(currentQuizIndex - 1)}
                        >
                          Previous
                        </Button>
                      )}
                      <div className="flex-1" />
                      {currentQuizIndex < quizQuestions.length ? (
                        <Button 
                          onClick={() => setCurrentQuizIndex(currentQuizIndex + 1)}
                          disabled={!selectedAnswers[question.id]}
                        >
                          Next
                        </Button>
                      ) : (
                        <Button 
                          onClick={handleSubmitQuiz}
                          disabled={!selectedAnswers[question.id]}
                        >
                          Submit
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
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
                <TabsTrigger value="syllabus" className="text-sm">
                  Syllabus
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
                        <div key={index}>
                          <ChapterCard
                            title={chapter.title}
                            description={chapter.description}
                            status={chapter.status}
                            duration={chapter.duration}
                            subjectColor={subject.color}
                          />
                          {chapter.quiz && chapter.status === "in-progress" && (
                            <div className="mt-2 ml-12">
                              <Button
                                variant="outline"
                                size="sm"
                                className={`border-ap-${subject.color} text-ap-${subject.color}`}
                                onClick={() => handleStartQuiz(chapter.title)}
                              >
                                Take Chapter Quiz
                              </Button>
                            </div>
                          )}
                        </div>
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
              
              {/* Syllabus Tab Content */}
              <TabsContent value="syllabus">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-bold mb-6">{subject.name} Syllabus</h2>
                  
                  {subject.syllabus ? (
                    <div className="space-y-6">
                      {subject.syllabus.map((unit, index) => (
                        <Collapsible key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                          <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left font-medium bg-gray-50 hover:bg-gray-100 transition-colors">
                            <span>{unit.title}</span>
                            <span className="text-gray-500">+</span>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="p-4 border-t border-gray-200">
                              <div className="mb-4">
                                <h4 className="font-medium text-gray-700 mb-2">Topics Covered</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                  {unit.topics.map((topic, idx) => (
                                    <li key={idx} className="text-gray-600">{topic}</li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div>
                                <h4 className="font-medium text-gray-700 mb-2">Learning Outcomes</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                  {unit.learningOutcomes.map((outcome, idx) => (
                                    <li key={idx} className="text-gray-600">{outcome}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      Syllabus information will be available soon.
                    </div>
                  )}
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Evaluation Structure</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Component</TableHead>
                          <TableHead>Weightage</TableHead>
                          <TableHead>Description</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Class Participation</TableCell>
                          <TableCell>10%</TableCell>
                          <TableCell>Active engagement in discussions and activities</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Assignments</TableCell>
                          <TableCell>20%</TableCell>
                          <TableCell>Regular homework and practice exercises</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Unit Tests</TableCell>
                          <TableCell>30%</TableCell>
                          <TableCell>Chapter-wise assessments throughout the term</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Final Examination</TableCell>
                          <TableCell>40%</TableCell>
                          <TableCell>Comprehensive test covering all units</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold mb-2">Recommended Textbooks</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <BookOpen className="h-5 w-5 text-gray-600 mr-2 mt-0.5" />
                        <span className="text-gray-700">Core Textbook: "Essential {subject.name} for Grade 6-8"</span>
                      </li>
                      <li className="flex items-start">
                        <BookOpen className="h-5 w-5 text-gray-600 mr-2 mt-0.5" />
                        <span className="text-gray-700">Supplementary Material: "Practice Workbook for {subject.name}"</span>
                      </li>
                    </ul>
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
                  <p className="text-gray-600 mt-2">Connect with teachers and peers to discuss concepts and clear doubts.</p>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
};

export default SubjectPage;
