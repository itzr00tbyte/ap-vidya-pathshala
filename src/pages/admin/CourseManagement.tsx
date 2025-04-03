
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Download, Filter, Search, Book, GraduationCap, Clock, Calendar, BookOpen, Sparkles, Star } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Mock data for courses
const MOCK_COURSES = [
  {
    id: 1,
    title: "Mathematics Fundamentals",
    subject: "Mathematics",
    grade: [6, 7],
    chapters: 12,
    lessons: 48,
    duration: "120 hours",
    creator: "Dr. Rajesh Kumar",
    lastUpdated: "2024-02-15",
    status: "active",
    description: "A comprehensive course covering all the fundamental concepts of mathematics for grade 6-7 students. The course includes interactive lessons, practice problems, and quizzes to ensure mastery of key concepts.",
    curriculum: [
      {
        title: "Arithmetic Operations",
        lessons: ["Introduction to Numbers", "Addition & Subtraction", "Multiplication & Division", "Order of Operations"],
        duration: "20 hours"
      },
      {
        title: "Fractions and Decimals",
        lessons: ["Understanding Fractions", "Operations with Fractions", "Decimal Numbers", "Converting Fractions to Decimals"],
        duration: "24 hours"
      },
      {
        title: "Algebra Basics",
        lessons: ["Introduction to Variables", "Simple Equations", "Word Problems", "Function Basics"],
        duration: "28 hours"
      },
      {
        title: "Geometry",
        lessons: ["Lines and Angles", "Triangles", "Quadrilaterals", "Circles"],
        duration: "32 hours"
      },
      {
        title: "Data Handling",
        lessons: ["Data Collection", "Data Representation", "Mean, Median, Mode", "Probability Basics"],
        duration: "16 hours"
      }
    ],
    reviews: {
      rating: 4.7,
      count: 128,
      comments: [
        { user: "Headmaster, Delhi Public School", comment: "Excellent curriculum structure and content sequencing." },
        { user: "Math Teacher, St. Mary's", comment: "The interactive exercises really help students grasp difficult concepts." }
      ]
    }
  },
  {
    id: 2,
    title: "Science Explorer",
    subject: "Science",
    grade: [6, 7, 8],
    chapters: 15,
    lessons: 60,
    duration: "150 hours",
    creator: "Mrs. Ananya Sharma",
    lastUpdated: "2024-03-10",
    status: "active",
    description: "A comprehensive science course covering physics, chemistry, and biology topics for middle school students. The course includes practical experiments, interactive simulations, and engaging activities to foster scientific thinking.",
    curriculum: [
      {
        title: "Matter & Materials",
        lessons: ["States of Matter", "Properties of Materials", "Changes in Matter", "Elements & Compounds"],
        duration: "30 hours"
      },
      {
        title: "Forces & Energy",
        lessons: ["Types of Forces", "Motion", "Energy Forms", "Simple Machines"],
        duration: "35 hours"
      },
      {
        title: "Living Organisms",
        lessons: ["Cell Structure", "Classification", "Plant Life", "Animal Life"],
        duration: "40 hours"
      },
      {
        title: "Earth & Space",
        lessons: ["Earth Structure", "Weather & Climate", "Solar System", "Space Exploration"],
        duration: "30 hours"
      },
      {
        title: "Environmental Science",
        lessons: ["Ecosystems", "Human Impact", "Conservation", "Sustainability"],
        duration: "15 hours"
      }
    ],
    reviews: {
      rating: 4.8,
      count: 156,
      comments: [
        { user: "Science Coordinator, Green Valley School", comment: "The experiments are well designed and easy to implement." },
        { user: "Biology Teacher, Sacred Heart", comment: "Students love the interactive simulations and visual aids." }
      ]
    }
  },
  {
    id: 3,
    title: "English Language & Literature",
    subject: "English",
    grade: [8, 9],
    chapters: 10,
    lessons: 40,
    duration: "100 hours",
    creator: "Mrs. Priya Patel",
    lastUpdated: "2024-01-20",
    status: "active",
    description: "A comprehensive English course focusing on language skills and literature appreciation for students in grades 8-9. The course covers grammar, vocabulary, writing, and analysis of various literary genres.",
    curriculum: [
      {
        title: "Grammar Fundamentals",
        lessons: ["Parts of Speech", "Sentence Structure", "Tenses", "Punctuation"],
        duration: "25 hours"
      },
      {
        title: "Vocabulary Development",
        lessons: ["Word Roots", "Context Clues", "Synonyms & Antonyms", "Idioms & Phrases"],
        duration: "15 hours"
      },
      {
        title: "Writing Skills",
        lessons: ["Paragraph Writing", "Essay Structure", "Creative Writing", "Formal Letters"],
        duration: "25 hours"
      },
      {
        title: "Literature Analysis",
        lessons: ["Poetry", "Short Stories", "Drama", "Novel Excerpts"],
        duration: "35 hours"
      }
    ],
    reviews: {
      rating: 4.6,
      count: 112,
      comments: [
        { user: "English Teacher, City International School", comment: "The literature selections are age-appropriate and engaging." },
        { user: "Language Arts Coordinator, Modern Academy", comment: "The writing exercises progressively build important skills." }
      ]
    }
  },
  {
    id: 4,
    title: "Social Studies Comprehensive",
    subject: "Social Studies",
    grade: [7, 8, 9],
    chapters: 14,
    lessons: 56,
    duration: "140 hours",
    creator: "Mr. Arjun Reddy",
    lastUpdated: "2024-02-05",
    status: "development",
    description: "A thorough exploration of history, geography, civics, and economics for middle school students. The course includes case studies, map activities, primary source analysis, and project-based learning.",
    curriculum: [
      {
        title: "Ancient Civilizations",
        lessons: ["Mesopotamia", "Egypt", "Greece", "Rome"],
        duration: "30 hours"
      },
      {
        title: "Medieval World",
        lessons: ["Feudal System", "Islamic Golden Age", "Age of Exploration", "Renaissance"],
        duration: "30 hours"
      },
      {
        title: "Modern History",
        lessons: ["Industrial Revolution", "World Wars", "Independence Movements", "Contemporary Issues"],
        duration: "35 hours"
      },
      {
        title: "Geography & Economics",
        lessons: ["Physical Geography", "Human Geography", "Economic Systems", "Global Trade"],
        duration: "25 hours"
      },
      {
        title: "Civic Education",
        lessons: ["Government Structure", "Rights & Responsibilities", "Democratic Values", "Global Citizenship"],
        duration: "20 hours"
      }
    ],
    reviews: {
      rating: 4.5,
      count: 86,
      comments: [
        { user: "History Teacher, National Public School", comment: "The primary sources and case studies bring history alive." },
        { user: "Social Science Head, Progressive School", comment: "Well-balanced curriculum covering all important aspects of social studies." }
      ]
    }
  },
  {
    id: 5,
    title: "Computer Science Fundamentals",
    subject: "Computer Science",
    grade: [8, 9, 10],
    chapters: 8,
    lessons: 32,
    duration: "80 hours",
    creator: "Mr. Vikram Singh",
    lastUpdated: "2024-03-25",
    status: "active",
    description: "An introduction to computer science principles, programming concepts, and digital literacy for secondary school students. The course includes hands-on coding exercises and projects.",
    curriculum: [
      {
        title: "Computer Basics",
        lessons: ["Hardware Components", "Operating Systems", "Software Applications", "File Management"],
        duration: "12 hours"
      },
      {
        title: "Internet & Digital Literacy",
        lessons: ["Web Browsing", "Online Safety", "Information Evaluation", "Digital Citizenship"],
        duration: "12 hours"
      },
      {
        title: "Programming Concepts",
        lessons: ["Algorithms", "Flowcharts", "Variables & Data Types", "Control Structures"],
        duration: "20 hours"
      },
      {
        title: "Coding Fundamentals",
        lessons: ["Introduction to Python", "Basic Syntax", "Simple Programs", "Debugging"],
        duration: "24 hours"
      },
      {
        title: "Projects & Applications",
        lessons: ["Calculator Program", "Simple Game", "Data Analysis", "Final Project"],
        duration: "12 hours"
      }
    ],
    reviews: {
      rating: 4.9,
      count: 104,
      comments: [
        { user: "IT Teacher, Future Academy", comment: "Perfectly paced introduction to programming concepts for beginners." },
        { user: "Computer Lab Coordinator, Tech High", comment: "The hands-on projects keep students engaged and learning actively." }
      ]
    }
  }
];

export default function CourseManagement() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [showCourseDialog, setShowCourseDialog] = useState(false);
  const [showAddCourseDialog, setShowAddCourseDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("curriculum");
  
  // New course form state
  const [newCourse, setNewCourse] = useState({
    title: "",
    subject: "",
    grade: [],
    description: "",
  });

  // Filter courses based on search query and subject filter
  const filteredCourses = MOCK_COURSES.filter(course => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.creator.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubject = selectedSubject === "all" || course.subject.toLowerCase() === selectedSubject.toLowerCase();
    
    return matchesSearch && matchesSubject;
  });

  // Extract unique subjects for the filter dropdown
  const uniqueSubjects = Array.from(new Set(MOCK_COURSES.map(course => course.subject)));

  const handleViewCourse = (course: any) => {
    setSelectedCourse(course);
    setShowCourseDialog(true);
  };

  const handleAddCourse = () => {
    // In a real application, this would save the course data
    console.log("Adding new course:", newCourse);
    setShowAddCourseDialog(false);
    
    // Reset form
    setNewCourse({
      title: "",
      subject: "",
      grade: [],
      description: "",
    });

    // Show success message (would use a toast in a real application)
    alert("Course added successfully!");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Course Management</h2>
          <p className="text-gray-600 mt-1">
            Manage course curriculum and content across all grades
          </p>
        </div>
        
        <div className="flex space-x-3">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => setShowAddCourseDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Course
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <div className="p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:max-w-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search courses..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm">Subject:</span>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {uniqueSubjects.map((subject, index) => (
                    <SelectItem key={index} value={subject.toLowerCase()}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Grade Levels</TableHead>
                <TableHead>Content</TableHead>
                <TableHead>Creator</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Book className="h-4 w-4 mr-2 text-ap-blue" />
                      {course.title}
                    </div>
                  </TableCell>
                  <TableCell>{course.subject}</TableCell>
                  <TableCell>
                    {course.grade.map((g, i) => (
                      <Badge key={i} variant="outline" className="mr-1">
                        Grade {g}
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <BookOpen className="h-3 w-3 mr-1" />
                        <span>{course.chapters} Chapters</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <GraduationCap className="h-3 w-3 mr-1" />
                      <span>{course.creator}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        course.status === 'active' ? 'bg-green-100 text-green-800' : 
                        course.status === 'development' ? 'bg-amber-100 text-amber-800' : 
                        'bg-red-100 text-red-800'
                      }
                    >
                      {course.status === 'active' ? 'Active' : 
                       course.status === 'development' ? 'In Development' : 
                       'Archived'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => handleViewCourse(course)}>
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredCourses.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                    No courses found matching your search
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Course Details Dialog */}
      <Dialog open={showCourseDialog} onOpenChange={setShowCourseDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Course Details</DialogTitle>
            <DialogDescription>
              Comprehensive information about this course
            </DialogDescription>
          </DialogHeader>
          
          {selectedCourse && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedCourse.title}</h2>
                  <p className="text-gray-500">{selectedCourse.subject}</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <Badge 
                    className={
                      selectedCourse.status === 'active' ? 'bg-green-100 text-green-800' : 
                      selectedCourse.status === 'development' ? 'bg-amber-100 text-amber-800' : 
                      'bg-red-100 text-red-800'
                    }
                  >
                    {selectedCourse.status === 'active' ? 'Active' : 
                     selectedCourse.status === 'development' ? 'In Development' : 
                     'Archived'}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Creator</p>
                    <p className="font-medium">{selectedCourse.creator}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="font-medium">{new Date(selectedCourse.lastUpdated).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-amber-500" />
                  <div>
                    <p className="text-sm text-gray-500">Rating</p>
                    <p className="font-medium">{selectedCourse.reviews.rating} ({selectedCourse.reviews.count} reviews)</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-medium mb-2">Description</h3>
                <p className="text-gray-700">{selectedCourse.description}</p>
              </div>
              
              <div>
                <h3 className="text-md font-medium mb-2">Grade Levels</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCourse.grade.map((g: number, i: number) => (
                    <Badge key={i} variant="outline">
                      Grade {g}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="statistics">Statistics</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="curriculum" className="p-2">
                  <div className="space-y-4">
                    {selectedCourse.curriculum.map((chapter: any, index: number) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="bg-gray-50 p-3 flex justify-between items-center">
                          <div className="font-medium">Chapter {index + 1}: {chapter.title}</div>
                          <Badge variant="outline">{chapter.duration}</Badge>
                        </div>
                        <div className="p-3">
                          <p className="text-sm text-gray-500 mb-2">Lessons:</p>
                          <ul className="list-disc list-inside space-y-1">
                            {chapter.lessons.map((lesson: string, i: number) => (
                              <li key={i} className="text-sm">{lesson}</li>
                            ))}
                          </ul>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="statistics" className="p-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="p-4">
                      <div className="text-sm text-gray-500">Chapters</div>
                      <div className="text-3xl font-bold">{selectedCourse.chapters}</div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-sm text-gray-500">Lessons</div>
                      <div className="text-3xl font-bold">{selectedCourse.lessons}</div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-sm text-gray-500">Duration</div>
                      <div className="text-3xl font-bold">{selectedCourse.duration}</div>
                    </Card>
                    
                    <Card className="p-4 col-span-3">
                      <div className="text-sm text-gray-500 mb-4">Estimated Completion Time by Chapter</div>
                      <div className="space-y-4">
                        {selectedCourse.curriculum.map((chapter: any, index: number) => {
                          const hours = parseInt(chapter.duration.split(' ')[0]);
                          const percentage = (hours / parseInt(selectedCourse.duration)) * 100;
                          
                          return (
                            <div key={index}>
                              <div className="flex justify-between text-sm mb-1">
                                <span>{chapter.title}</span>
                                <span>{chapter.duration}</span>
                              </div>
                              <Progress value={percentage} className="h-2" />
                            </div>
                          );
                        })}
                      </div>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="p-2">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="bg-amber-100 text-amber-800 p-3 rounded-lg flex items-center">
                        <Star className="h-5 w-5 mr-2 fill-amber-500 text-amber-500" />
                        <span className="text-2xl font-bold">{selectedCourse.reviews.rating}</span>
                      </div>
                      <div className="text-gray-500">
                        Based on {selectedCourse.reviews.count} reviews
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {selectedCourse.reviews.comments.map((review: any, index: number) => (
                        <Card key={index} className="p-3">
                          <div className="font-medium">{review.user}</div>
                          <div className="text-gray-600 mt-1">{review.comment}</div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <Separator />
              
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setShowCourseDialog(false)}>
                  Close
                </Button>
                <Button>
                  Edit Course
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Course Dialog */}
      <Dialog open={showAddCourseDialog} onOpenChange={setShowAddCourseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
            <DialogDescription>
              Create a new course curriculum for your school
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input 
                id="title"
                placeholder="Enter course title"
                value={newCourse.title}
                onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select 
                value={newCourse.subject} 
                onValueChange={(value) => setNewCourse({...newCourse, subject: value})}
              >
                <SelectTrigger id="subject">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueSubjects.map((subject, index) => (
                    <SelectItem key={index} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                  <SelectItem value="New Subject">Add New Subject</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="grade">Grade Levels (multiple selection)</Label>
              <Select>
                <SelectTrigger id="grade">
                  <SelectValue placeholder="Select grade levels" />
                </SelectTrigger>
                <SelectContent>
                  {[6, 7, 8, 9, 10, 11, 12].map((grade) => (
                    <SelectItem key={grade} value={grade.toString()}>
                      Grade {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                This would be a multi-select component in a real implementation
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Course Description</Label>
              <Textarea 
                id="description" 
                placeholder="Enter course description"
                rows={4}
                value={newCourse.description}
                onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddCourseDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCourse}>
              <Sparkles className="mr-2 h-4 w-4" />
              Create Course
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
