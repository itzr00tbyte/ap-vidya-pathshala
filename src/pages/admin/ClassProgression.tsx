
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Download, Filter, Search, ChevronRight, Calendar, BookOpen, Award, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Mock data for classes
const MOCK_CLASSES = [
  {
    id: 1,
    grade: 6,
    section: "A",
    totalStudents: 42,
    subjects: ["Mathematics", "Science", "English", "Hindi", "Social Studies"],
    teacher: "Mrs. Ananya Sharma",
    progress: 78,
    academicYear: "2024-2025",
    startDate: "2024-04-01",
    endDate: "2025-03-15",
    completionStatus: "in-progress",
    examResults: [
      { name: "First Term", avgScore: 82, passPercentage: 92 },
      { name: "Mid Term", avgScore: 79, passPercentage: 88 },
    ],
    topStudents: [
      { id: 1, name: "Arjun Singh", avgScore: 95 },
      { id: 2, name: "Meera Patel", avgScore: 93 },
      { id: 3, name: "Rohan Gupta", avgScore: 91 },
    ]
  },
  {
    id: 2,
    grade: 6,
    section: "B",
    totalStudents: 40,
    subjects: ["Mathematics", "Science", "English", "Hindi", "Social Studies"],
    teacher: "Mr. Vikram Singh",
    progress: 75,
    academicYear: "2024-2025",
    startDate: "2024-04-01",
    endDate: "2025-03-15",
    completionStatus: "in-progress",
    examResults: [
      { name: "First Term", avgScore: 78, passPercentage: 90 },
      { name: "Mid Term", avgScore: 76, passPercentage: 85 },
    ],
    topStudents: [
      { id: 4, name: "Priya Sharma", avgScore: 92 },
      { id: 5, name: "Aditya Kumar", avgScore: 90 },
      { id: 6, name: "Neha Verma", avgScore: 89 },
    ]
  },
  {
    id: 3,
    grade: 7,
    section: "A",
    totalStudents: 45,
    subjects: ["Mathematics", "Science", "English", "Hindi", "Social Studies", "Computer Science"],
    teacher: "Dr. Rajesh Kumar",
    progress: 82,
    academicYear: "2024-2025",
    startDate: "2024-04-01",
    endDate: "2025-03-15",
    completionStatus: "in-progress",
    examResults: [
      { name: "First Term", avgScore: 85, passPercentage: 95 },
      { name: "Mid Term", avgScore: 83, passPercentage: 93 },
    ],
    topStudents: [
      { id: 7, name: "Rahul Kapoor", avgScore: 98 },
      { id: 8, name: "Sanya Reddy", avgScore: 96 },
      { id: 9, name: "Vivek Mishra", avgScore: 94 },
    ]
  },
  {
    id: 4,
    grade: 8,
    section: "A",
    totalStudents: 38,
    subjects: ["Mathematics", "Science", "English", "Hindi", "Social Studies", "Computer Science"],
    teacher: "Mrs. Priya Patel",
    progress: 70,
    academicYear: "2024-2025",
    startDate: "2024-04-01",
    endDate: "2025-03-15",
    completionStatus: "in-progress",
    examResults: [
      { name: "First Term", avgScore: 76, passPercentage: 89 },
      { name: "Mid Term", avgScore: 73, passPercentage: 84 },
    ],
    topStudents: [
      { id: 10, name: "Ankit Shah", avgScore: 91 },
      { id: 11, name: "Preeti Joshi", avgScore: 89 },
      { id: 12, name: "Alok Singh", avgScore: 87 },
    ]
  },
  {
    id: 5,
    grade: 9,
    section: "A",
    totalStudents: 36,
    subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Hindi", "Social Studies"],
    teacher: "Mr. Arjun Reddy",
    progress: 65,
    academicYear: "2024-2025",
    startDate: "2024-04-01",
    endDate: "2025-03-15",
    completionStatus: "in-progress",
    examResults: [
      { name: "First Term", avgScore: 72, passPercentage: 86 },
      { name: "Mid Term", avgScore: 70, passPercentage: 83 },
    ],
    topStudents: [
      { id: 13, name: "Kavya Nair", avgScore: 90 },
      { id: 14, name: "Raj Malhotra", avgScore: 88 },
      { id: 15, name: "Tanya Desai", avgScore: 86 },
    ]
  },
];

export default function ClassProgression() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [showClassDialog, setShowClassDialog] = useState(false);

  // Filter classes based on search query and grade filter
  const filteredClasses = MOCK_CLASSES.filter(classItem => {
    const matchesSearch = 
      classItem.grade.toString().includes(searchQuery.toLowerCase()) ||
      classItem.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classItem.teacher.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGrade = selectedGrade === "all" || classItem.grade.toString() === selectedGrade;
    
    return matchesSearch && matchesGrade;
  });

  const handleViewClass = (classItem: any) => {
    setSelectedClass(classItem);
    setShowClassDialog(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Class Progression</h2>
          <p className="text-gray-600 mt-1">
            {user?.role === "admin" ? 
              "Monitor academic progress of all classes" : 
              "Monitor academic progress of your assigned classes"}
          </p>
        </div>
        
        <div className="flex space-x-3">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Class
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
                placeholder="Search classes..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm">Grade:</span>
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All Grades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="6">Grade 6</SelectItem>
                  <SelectItem value="7">Grade 7</SelectItem>
                  <SelectItem value="8">Grade 8</SelectItem>
                  <SelectItem value="9">Grade 9</SelectItem>
                  <SelectItem value="10">Grade 10</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((classItem) => (
          <Card key={classItem.id} className="hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold">
                    Grade {classItem.grade}-{classItem.section}
                  </h3>
                  <p className="text-sm text-gray-500">{classItem.academicYear}</p>
                </div>
                <Badge 
                  className={
                    classItem.progress >= 80 ? 'bg-green-100 text-green-800' :
                    classItem.progress >= 60 ? 'bg-amber-100 text-amber-800' :
                    'bg-red-100 text-red-800'
                  }
                >
                  {classItem.progress}% Complete
                </Badge>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span className="font-medium">{classItem.progress}%</span>
                </div>
                <Progress 
                  value={classItem.progress} 
                  className={
                    classItem.progress >= 80 ? 'bg-green-200' :
                    classItem.progress >= 60 ? 'bg-amber-200' :
                    'bg-red-200'
                  }
                />
              </div>
              
              <div className="grid grid-cols-2 gap-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-3.5 w-3.5 text-gray-500" />
                  <span>{classItem.totalStudents} Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-3.5 w-3.5 text-gray-500" />
                  <span>{classItem.subjects.length} Subjects</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-gray-500" />
                  <span>Started: {new Date(classItem.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-3.5 w-3.5 text-gray-500" />
                  <span>Avg: {classItem.examResults[0]?.avgScore || 0}%</span>
                </div>
              </div>
              
              <div className="text-sm mb-4">
                <p className="font-medium">Class Teacher:</p>
                <p>{classItem.teacher}</p>
              </div>
              
              <Button 
                onClick={() => handleViewClass(classItem)} 
                variant="outline" 
                className="w-full"
              >
                View Details
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
        
        {filteredClasses.length === 0 && (
          <div className="col-span-3 py-8 text-center">
            <p className="text-gray-500">No classes found matching your search criteria</p>
          </div>
        )}
      </div>

      {/* Class Details Dialog */}
      <Dialog open={showClassDialog} onOpenChange={setShowClassDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              Class Details: Grade {selectedClass?.grade}-{selectedClass?.section}
            </DialogTitle>
            <DialogDescription>
              Detailed information and academic progress
            </DialogDescription>
          </DialogHeader>
          
          {selectedClass && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Academic Year</p>
                  <p className="font-medium">{selectedClass.academicYear}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Class Teacher</p>
                  <p className="font-medium">{selectedClass.teacher}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Total Students</p>
                  <p className="font-medium">{selectedClass.totalStudents}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Completion Status</p>
                  <Badge className={
                    selectedClass.progress >= 80 ? 'bg-green-100 text-green-800' :
                    selectedClass.progress >= 60 ? 'bg-amber-100 text-amber-800' :
                    'bg-red-100 text-red-800'
                  }>
                    {selectedClass.progress}% Complete
                  </Badge>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-3">Subject Progress</h3>
                <div className="space-y-3">
                  {selectedClass.subjects.map((subject: string, index: number) => {
                    // Generate random progress for each subject
                    const subjectProgress = Math.floor(Math.random() * 30) + selectedClass.progress - 15;
                    const normalizedProgress = Math.max(0, Math.min(100, subjectProgress));
                    
                    return (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{subject}</span>
                          <span className="font-medium">{normalizedProgress}%</span>
                        </div>
                        <Progress 
                          value={normalizedProgress}
                          className={
                            normalizedProgress >= 80 ? 'bg-green-200' :
                            normalizedProgress >= 60 ? 'bg-amber-200' :
                            'bg-red-200'
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <Separator />
              
              <Tabs defaultValue="exams">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="exams">Exam Results</TabsTrigger>
                  <TabsTrigger value="students">Top Students</TabsTrigger>
                </TabsList>
                
                <TabsContent value="exams" className="pt-4">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Exam</th>
                        <th className="text-left py-2">Average Score</th>
                        <th className="text-left py-2">Pass Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedClass.examResults.map((exam: any, index: number) => (
                        <tr key={index} className="border-b">
                          <td className="py-2">{exam.name}</td>
                          <td className="py-2">
                            <Badge className={
                              exam.avgScore >= 80 ? 'bg-green-100 text-green-800' :
                              exam.avgScore >= 60 ? 'bg-amber-100 text-amber-800' :
                              'bg-red-100 text-red-800'
                            }>
                              {exam.avgScore}%
                            </Badge>
                          </td>
                          <td className="py-2">
                            <Badge variant="outline">
                              {exam.passPercentage}%
                            </Badge>
                          </td>
                        </tr>
                      ))}
                      {selectedClass.examResults.length === 0 && (
                        <tr>
                          <td colSpan={3} className="py-4 text-center text-gray-500">
                            No exam results available yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </TabsContent>
                
                <TabsContent value="students" className="pt-4">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Rank</th>
                        <th className="text-left py-2">Student Name</th>
                        <th className="text-left py-2">Average Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedClass.topStudents.map((student: any, index: number) => (
                        <tr key={student.id} className="border-b">
                          <td className="py-2">#{index + 1}</td>
                          <td className="py-2">{student.name}</td>
                          <td className="py-2">
                            <Badge className="bg-green-100 text-green-800">
                              {student.avgScore}%
                            </Badge>
                          </td>
                        </tr>
                      ))}
                      {selectedClass.topStudents.length === 0 && (
                        <tr>
                          <td colSpan={3} className="py-4 text-center text-gray-500">
                            No student data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={() => setShowClassDialog(false)}>
                  Close
                </Button>
                <Button>
                  Generate Full Report
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
