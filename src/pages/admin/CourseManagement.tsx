
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Download, Filter, Search, Book, Clock, BookOpen } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// Mock data for course management
const MOCK_SUBJECTS = [
  { id: 1, name: "Mathematics", grades: [6, 7, 8, 9, 10], courseCount: 15, iconColor: "bg-blue-100" },
  { id: 2, name: "Science", grades: [6, 7, 8], courseCount: 12, iconColor: "bg-green-100" },
  { id: 3, name: "Physics", grades: [9, 10], courseCount: 8, iconColor: "bg-purple-100" },
  { id: 4, name: "Chemistry", grades: [9, 10], courseCount: 8, iconColor: "bg-red-100" },
  { id: 5, name: "Biology", grades: [9, 10], courseCount: 9, iconColor: "bg-amber-100" },
  { id: 6, name: "English", grades: [6, 7, 8, 9, 10], courseCount: 10, iconColor: "bg-indigo-100" },
  { id: 7, name: "Hindi", grades: [6, 7, 8, 9, 10], courseCount: 10, iconColor: "bg-pink-100" },
  { id: 8, name: "Social Studies", grades: [6, 7, 8], courseCount: 9, iconColor: "bg-teal-100" },
  { id: 9, name: "Social Sciences", grades: [9, 10], courseCount: 6, iconColor: "bg-cyan-100" },
  { id: 10, name: "Computer Science", grades: [6, 7, 8, 9, 10], courseCount: 12, iconColor: "bg-slate-100" },
];

const MOCK_SEMESTERS = [
  { id: 1, name: "First Semester 2024-25", start: "April 2024", end: "September 2024", status: "active" },
  { id: 2, name: "Second Semester 2024-25", start: "October 2024", end: "March 2025", status: "upcoming" },
  { id: 3, name: "First Semester 2023-24", start: "April 2023", end: "September 2023", status: "completed" },
  { id: 4, name: "Second Semester 2023-24", start: "October 2023", end: "March 2024", status: "completed" },
];

const MOCK_COURSES = [
  { 
    id: 1, 
    name: "Mathematics Fundamentals", 
    subject: "Mathematics", 
    grade: 6, 
    semester: "First Semester 2024-25", 
    modules: 8, 
    completionRate: 45,
    status: "active"
  },
  { 
    id: 2, 
    name: "Introductory Physics", 
    subject: "Physics", 
    grade: 9, 
    semester: "First Semester 2024-25", 
    modules: 10, 
    completionRate: 38,
    status: "active"
  },
  { 
    id: 3, 
    name: "Advanced English Literature", 
    subject: "English", 
    grade: 10, 
    semester: "First Semester 2024-25", 
    modules: 12, 
    completionRate: 52,
    status: "active"
  },
  { 
    id: 4, 
    name: "Basic Computer Programming", 
    subject: "Computer Science", 
    grade: 8, 
    semester: "First Semester 2024-25", 
    modules: 6, 
    completionRate: 60,
    status: "active"
  },
  { 
    id: 5, 
    name: "Organic Chemistry", 
    subject: "Chemistry", 
    grade: 10, 
    semester: "First Semester 2024-25", 
    modules: 9, 
    completionRate: 32,
    status: "active"
  },
];

export default function CourseManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSubjects = MOCK_SUBJECTS.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredCourses = MOCK_COURSES.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Course Management</h2>
          <p className="text-gray-600 mt-1">
            Manage classes, subjects, semesters and courses across the platform
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
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Course
          </Button>
        </div>
      </div>

      <Card>
        <Tabs defaultValue="classes" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-md">
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="semesters">Semesters</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
          </TabsList>
          
          <Separator className="my-4" />
          
          <TabsContent value="classes" className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[6, 7, 8, 9, 10].map((grade) => (
                <Card key={grade} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="font-bold text-lg">Grade {grade}</div>
                  <div className="text-sm text-gray-500 mt-2">Students: {Math.floor(Math.random() * 100) + 200}</div>
                  <div className="text-sm text-gray-500">Subjects: {MOCK_SUBJECTS.filter(s => s.grades.includes(grade)).length}</div>
                  <div className="mt-3 flex gap-1 flex-wrap">
                    {MOCK_SUBJECTS.filter(s => s.grades.includes(grade))
                      .slice(0, 3)
                      .map(subject => (
                        <Badge key={subject.id} variant="outline" className="text-xs">
                          {subject.name}
                        </Badge>
                      ))}
                    {MOCK_SUBJECTS.filter(s => s.grades.includes(grade)).length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{MOCK_SUBJECTS.filter(s => s.grades.includes(grade)).length - 3} more
                      </Badge>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="subjects" className="p-4">
            <div className="relative mb-4 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search subjects..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSubjects.map((subject) => (
                <Card key={subject.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center">
                    <div className={`${subject.iconColor} p-2 rounded-md mr-3`}>
                      <Book className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-bold">{subject.name}</div>
                      <div className="text-sm text-gray-500">{subject.courseCount} courses</div>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-1 flex-wrap">
                    {subject.grades.map(grade => (
                      <Badge key={grade} variant="outline" className="text-xs">
                        Grade {grade}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="semesters" className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Semester Name</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_SEMESTERS.map((semester) => (
                  <TableRow key={semester.id}>
                    <TableCell className="font-medium">{semester.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-2" />
                        <span>{semester.start} - {semester.end}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          semester.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 
                          semester.status === 'upcoming' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' : 
                          'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }
                      >
                        {semester.status === 'active' ? 'Active' : 
                         semester.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {MOCK_COURSES.filter(c => c.semester === semester.name).length} courses
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">Manage</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="courses" className="p-4">
            <div className="relative mb-4 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search courses..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Modules</TableHead>
                  <TableHead>Completion</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2" />
                        <span>{course.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{course.subject}</TableCell>
                    <TableCell>Grade {course.grade}</TableCell>
                    <TableCell>{course.semester}</TableCell>
                    <TableCell>{course.modules} modules</TableCell>
                    <TableCell>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${course.completionRate}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{course.completionRate}% complete</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
