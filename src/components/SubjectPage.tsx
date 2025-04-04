
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/ProgressBar";
import ChapterCard from "@/components/ChapterCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Beaker, Globe, BookOpen, Book, BookUser, FileText, Users, PlayCircle, CheckCircle, XCircle, HelpCircle, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SubjectButton } from "@/components/ui/subject-button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Skeleton } from "@/components/ui/skeleton";
import SlideshowView from "@/components/SlideshowView";

type ChapterStatus = "completed" | "in-progress" | "locked";

type SyllabusData = {
  _id: string;
  grade: string;
  semester: string;
  chapter_number: number;
  chapter_name: string;
  chapter_description: string;
  subject: string;
  topics: {
    name: string;
    presentation_link: string;
    _id: string;
  }[];
  learning_objectives: string[];
  curriculum_type: string;
}

type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
};

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
    status: ChapterStatus;
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
  const [language, setLanguage] = useState<"english" | "telugu">("english");
  const [syllabusData, setSyllabusData] = useState<SyllabusData[]>([]);
  const [showSlideshow, setShowSlideshow] = useState<boolean>(false);
  const [currentTopic, setCurrentTopic] = useState<{name: string, presentation_link: string} | null>(null);
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [currentTopicIndex, setCurrentTopicIndex] = useState<number>(0);
  const [isLastSlide, setIsLastSlide] = useState<boolean>(false);
  const [isLoadingSyllabus, setIsLoadingSyllabus] = useState<boolean>(true);
  
  useEffect(() => {
    // Fetch syllabus data from API
    const fetchSyllabusData = async () => {
      setIsLoadingSyllabus(true);
      try {
        const response = await fetch('https://ap-vidya-pathshala-api.vercel.app/api/syllabus');
        if (!response.ok) {
          throw new Error('Failed to fetch syllabus data');
        }
        const data = await response.json();
        const filteredData = data.filter((item: SyllabusData) => 
          item.subject.toLowerCase() === (subjectId || "").toLowerCase()
        );
        setSyllabusData(filteredData);
      } catch (error) {
        console.error('Error fetching syllabus data:', error);
        toast.error('Failed to load syllabus data');
      } finally {
        setIsLoadingSyllabus(false);
      }
    };

    fetchSyllabusData();

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

  useEffect(() => {
    if (syllabusData.length > 0 && !showSlideshow && subject) {
      // Create a copy of the subject
      const updatedSubject = { ...subject };
      
      // Update the subject's chapters based on API data, preserving status, duration, and quiz
      if (updatedSubject && updatedSubject.chapters) {
        // First, keep the original chapters in memory
        const originalChapters = [...updatedSubject.chapters];
        
        // Create new chapters array by merging API data with original chapter properties
        const newChapters = syllabusData.map((apiChapter, index) => {
          // Use original chapter data if available (for this index), otherwise use defaults
          const originalChapter = index < originalChapters.length ? originalChapters[index] : {
            status: index === 0 ? "completed" as ChapterStatus : index === 1 ? "in-progress" as ChapterStatus : "locked" as ChapterStatus,
            duration: "45 mins",
            quiz: undefined
          };
          
          return {
            title: apiChapter.chapter_name,
            description: apiChapter.chapter_description,
            status: originalChapter.status,
            duration: originalChapter.duration,
            quiz: originalChapter.quiz
          };
        });
        
        // If API returned fewer chapters than we had originally, append remaining originals
        if (newChapters.length < originalChapters.length) {
          newChapters.push(...originalChapters.slice(newChapters.length));
        }
        
        updatedSubject.chapters = newChapters;
        setSubject(updatedSubject);
      }
    }
  }, [syllabusData, subject, showSlideshow]);

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

  const handleStartSlideshow = (chapterName: string) => {
    const chapter = syllabusData.find(c => c.chapter_name === chapterName);
    if (chapter && chapter.topics.length > 0) {
      setCurrentChapter(chapterName);
      setCurrentTopic(chapter.topics[0]);
      setCurrentTopicIndex(0);
      setShowSlideshow(true);
      setIsLastSlide(false);
      window.scrollTo(0, 0);
    } else {
      toast.error('No presentation available for this chapter');
    }
  };

  const handleExitSlideshow = () => {
    setShowSlideshow(false);
    setCurrentTopic(null);
  };

  const handleNextTopic = () => {
    const chapter = syllabusData.find(c => c.chapter_name === currentChapter);
    if (!chapter) return;
    
    if (isLastSlide) {
      // Mark current topic as completed
      setCompletedTopics(prev => [...prev, currentTopic?.name || '']);
      
      // Move to next topic if available
      if (currentTopicIndex < chapter.topics.length - 1) {
        setCurrentTopicIndex(prev => prev + 1);
        setCurrentTopic(chapter.topics[currentTopicIndex + 1]);
        setIsLastSlide(false);
      } else {
        // All topics completed
        toast.success('Chapter completed!');
        handleExitSlideshow();
      }
    } else {
      // Control the Canva presentation to move to next slide
      console.log('Move to next slide in presentation');
      
      // Simulate detecting last slide
      setIsLastSlide(true);
    }
  };

  const handlePreviousTopic = () => {
    const chapter = syllabusData.find(c => c.chapter_name === currentChapter);
    if (!chapter) return;
    
    if (currentTopicIndex > 0) {
      setCurrentTopicIndex(prev => prev - 1);
      setCurrentTopic(chapter.topics[currentTopicIndex - 1]);
      setIsLastSlide(false);
    } else {
      // First topic, just reset the slides
      setIsLastSlide(false);
    }
  };

  if (!subject) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-ap-blue mx-auto" />
          <p className="text-ap-blue mt-4">Loading subject data...</p>
        </div>
      </div>
    );
  }

  // Find the chapter with quiz
  const currentQuizChapter = subject.chapters.find(ch => ch.title === currentChapter);
  const quizQuestions = currentQuizChapter?.quiz || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showSlideshow ? (
          <SlideshowView 
            chapterTitle={currentChapter}
            topics={syllabusData.find(c => c.chapter_name === currentChapter)?.topics || []}
            completedTopics={completedTopics}
            onTopicComplete={(topicName) => {
              setCompletedTopics(prev => [...prev, topicName]);
            }}
            onExit={handleExitSlideshow}
          />
        ) : showQuiz ? (
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
            <div className={`bg-ap-${subject?.color}/10 rounded-xl p-6 mb-8`}>
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 bg-ap-${subject?.color}/20 rounded-lg text-ap-${subject?.color}`}>
                    {subject?.icon}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{subject?.name}</h1>
                    <p className="text-gray-600 mt-1 max-w-2xl">{subject?.description}</p>
                  </div>
                </div>
                <div className="mt-6 md:mt-0 flex flex-col items-end justify-center">
                  <div className="text-sm text-gray-500 mb-2">Your Progress</div>
                  <div className="w-full md:w-48">
                    <ProgressBar progress={subject?.progress || 0} color={subject?.color || "blue"} />
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
                    {/* Language Toggle - Moved here next to Chapters heading */}
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold">
                        {language === "english" ? "Chapters" : "అధ్యాయాలు"}
                      </h2>
                      <ToggleGroup 
                        type="single" 
                        value={language} 
                        onValueChange={(value) => {
                          if (value) setLanguage(value as "english" | "telugu");
                        }}
                        className="border rounded-md"
                      >
                        <ToggleGroupItem value="english" aria-label="Toggle english">
                          English
                        </ToggleGroupItem>
                        <ToggleGroupItem value="telugu" aria-label="Toggle telugu">
                          తెలుగు
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </div>

                    {isLoadingSyllabus ? (
                      <div className="space-y-4">
                        {[1, 2, 3].map((_, index) => (
                          <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                            <div className="flex items-start">
                              <Skeleton className="h-10 w-10 rounded-md" />
                              <div className="ml-3 space-y-2 flex-1">
                                <Skeleton className="h-5 w-1/2" />
                                <Skeleton className="h-4 w-4/5" />
                              </div>
                            </div>
                            <Skeleton className="h-4 w-full mt-4" />
                            <div className="mt-3 flex items-center justify-between">
                              <Skeleton className="h-4 w-1/3" />
                              <Skeleton className="h-8 w-24 rounded-md" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {subject?.chapters.map((chapter, index) => (
                          <div key={index}>
                            <ChapterCard
                              title={
                                language === "english" 
                                  ? chapter.title 
                                  : `${chapter.title} (తెలుగులో)`
                              }
                              description={
                                language === "english"
                                  ? chapter.description
                                  : `${chapter.description} తెలుగులో`
                              }
                              status={chapter.status}
                              duration={chapter.duration}
                              subjectColor={subject.color}
                              onStartSlideshow={handleStartSlideshow}
                            />
                            {chapter.quiz && chapter.status === "in-progress" && (
                              <div className="mt-3 ml-0">
                                <div className={`rounded-lg border border-${subject.color === 'blue' ? 'ap-blue' : `ap-${subject.color}`}/20 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 flex items-center justify-between`}>
                                  <div>
                                    <h4 className="font-medium">
                                      {language === "english" ? `${chapter.title} Quiz` : `${chapter.title} క్విజ్`}
                                    </h4>
                                    <p className="text-sm text-gray-500 mt-1">
                                      {language === "english" 
                                        ? "Test your understanding" 
                                        : "మీ అవగాహనను పరీక్షించండి"}
                                    </p>
                                  </div>
                                  <SubjectButton
                                    variant="default" 
                                    size="sm"
                                    isQuizStyle={true}
                                    subjectColor={subject.color as "blue" | "green" | "orange" | "purple" | "yellow" | "red"}
                                    className={`bg-ap-${subject.color}`}
                                    onClick={() => handleStartQuiz(chapter.title)}
                                  >
                                    <PlayCircle className="h-4 w-4 mr-1" />
                                    {language === "english" ? "Start Quiz" : "క్విజ్ ప్రారంభించండి"}
                                  </SubjectButton>
                                </div>
                              </div>
                            )}
                            {syllabusData.length > 0 && syllabusData[index] && (
                              <div className="mt-3 ml-0">
                                <div className={`rounded-lg border border-${subject.color === 'blue' ? 'ap-blue' : `ap-${subject.color}`}/20 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 flex items-center justify-between`}>
                                  <div>
                                    <h4 className="font-medium">
                                      {language === "english" ? "Slideshow Presentation" : "స్లైడ్‌షో ప్రజెంటేషన్"}
                                    </h4>
                                    <p className="text-sm text-gray-500 mt-1">
                                      {language === "english" 
                                        ? "Interactive learning slides" 
                                        : "ఇంటరాక్టివ్ లెర్నింగ్ స్లైడ్‌లు"}
                                    </p>
                                  </div>
                                  <SubjectButton
                                    variant="default" 
                                    size="sm"
                                    subjectColor={subject.color as "blue" | "green" | "orange" | "purple" | "yellow" | "red"}
                                    className={`bg-ap-${subject.color}`}
                                    onClick={() => handleStartSlideshow(syllabusData[index].chapter_name)}
                                  >
                                    <PlayCircle className="h-4 w-4 mr-1" />
                                    {language === "english" ? "View Slides" : "స్లైడ్‌లను చూడండి"}
                                  </SubjectButton>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      {language === "english" ? "Learning Resources" : "అభ్యాస వనరులు"}
                    </h2>
                    <div className="space-y-4">
                      <div className={`bg-gradient-to-br from-ap-${subject?.color}/10 to-white rounded-xl p-5 border border-ap-${subject?.color}/20`}>
                        <div className="flex justify-between">
                          <div className={`p-2 bg-white/80 rounded-lg text-ap-${subject?.color}`}>
                            <FileText className="h-5 w-5" />
                          </div>
                          <span className="text-xs text-gray-500">PDF</span>
                        </div>
                        <h3 className="mt-3 font-medium">
                          {language === "english" ? "Study Materials" : "అధ్యయన సామగ్రి"}
                        </h3>
                        <p className="text-sm text-gray-600 mt-2">
                          {language === "english" 
                            ? "Comprehensive notes and examples for all chapters."
                            : "అన్ని అధ్యాయాలకు సమగ్ర నోట్స్ మరియు ఉదాహరణలు."}
                        </p>
                        <SubjectButton 
                          variant="outline" 
                          size="sm" 
                          subjectColor={subject.color as "blue" | "green" | "orange" | "purple" | "yellow" | "red"} 
                          className="mt-4 w-full"
                        >
                          {language === "english" ? "Download" : "డౌన్‌లోడ్"}
                        </SubjectButton>
                      </div>
                      
                      <div className={`bg-gradient-to-br from-ap-${subject?.color}/10 to-white rounded-xl p-5 border border-ap-${subject?.color}/20`}>
                        <div className="flex justify-between">
                          <div className={`p-2 bg-white/80 rounded-lg text-ap-${subject?.color}`}>
                            <PlayCircle className="h-5 w-5" />
                          </div>
                          <span className="text-xs text-gray-500">VIDEO</span>
                        </div>
                        <h3 className="mt-3 font-medium">
                          {language === "english" ? "Video Lessons" : "వీడియో పాఠాలు"}
                        </h3>
                        <p className="text-sm text-gray-600 mt-2">
                          {language === "english"
                            ? "Watch expert teachers explain key concepts."
                            : "నిపుణ ఉపాధ్యాయులు కీలక భావనలను వివరించడం చూడండి."}
                        </p>
                        <SubjectButton 
                          variant="outline" 
                          size="sm" 
                          subjectColor={subject.color as "blue" | "green" | "orange" | "purple" | "yellow" | "red"} 
                          className="mt-4 w-full"
                        >
                          {language === "english" ? "Watch Videos" : "వీడియోలు చూడండి"}
                        </SubjectButton>
                      </div>
                      
                      <div className={`bg-gradient-to-br from-ap-${subject?.color}/10 to-white rounded-xl p-5 border border-ap-${subject?.color}/20`}>
                        <div className="flex justify-between">
                          <div className={`p-2 bg-white/80 rounded-lg text-ap-${subject?.color}`}>
                            <Users className="h-5 w-5" />
                          </div>
                          <span className="text-xs text-gray-500">FORUM</span>
                        </div>
                        <h3 className="mt-3 font-medium">
                          {language === "english" ? "Ask Doubts" : "సందేహాలు అడగండి"}
                        </h3>
                        <p className="text-sm text-gray-600 mt-2">
                          {language === "english"
                            ? "Connect with teachers and peers to clear your doubts."
                            : "మీ సందేహాలను తీర్చడానికి ఉపాధ్యాయులు మరియు సహచరులతో కలవండి."}
                        </p>
                        <SubjectButton 
                          variant="outline" 
                          size="sm" 
                          subjectColor={subject.color as "blue" | "green" | "orange" | "purple" | "yellow" | "red"} 
                          className="mt-4 w-full"
                        >
                          {language === "english" ? "Join Discussion" : "చర్చలో చేరండి"}
                        </SubjectButton>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="resources">
                <div className="text-center py-16">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {language === "english" 
                      ? "Additional Resources Coming Soon" 
                      : "అదనపు వనరులు త్వరలో వస్తున్నాయి"}
                  </h2>
                  <p className="text-gray-500 mt-2">
                    {language === "english"
                      ? "We're working hard to provide the best learning resources for you."
                      : "మేము మీకు ఉత్తమమైన అభ్యాస వనరులను అందించడానికి కష్టపడుతున్నాము."}
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="tests">
                <div className="text-center py-16">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {language === "english" 
                      ? "Tests & Quizzes Coming Soon" 
                      : "పరీక్షలు మరియు క్విజ్‌లు త్వరలో వస్తున్నాయి"}
                  </h2>
                  <p className="text-gray-500 mt-2">
                    {language === "english"
                      ? "We're developing comprehensive tests to help you assess your knowledge."
                      : "మీ జ్ఞానాన్ని అంచనా వేయడానికి సహాయపడే సమగ్ర పరీక్షలను మేము అభివృద్ధి చేస్తున్నాము."}
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="discussions">
                <div className="text-center py-16">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {language === "english" 
                      ? "Discussion Forum Coming Soon" 
                      : "చర్చా వేదిక త్వరలో వస్తోంది"}
                  </h2>
                  <p className="text-gray-500 mt-2">
                    {language === "english"
                      ? "Connect with teachers and peers to discuss concepts and clear doubts."
                      : "భావనలను చర్చించడానికి మరియు సందేహాలను తీర్చడానికి ఉపాధ్యాయులు మరియు సహచరులతో కలవండి."}
                  </p>
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
