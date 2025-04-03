
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Download, Filter, Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { MOCK_STUDENTS } from "@/data/mockStudents";
import StudentTable from "@/components/student/StudentTable";
import StudentToolbar from "@/components/student/StudentToolbar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock data for teachers and headmasters
const MOCK_TEACHERS = [
  {
    id: "t1",
    name: "Dr. Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    subject: "Mathematics",
    grade: 8,
    section: "A",
    school: "AP Vidya Pathshala Central",
    phone: "+91-9876543210",
    joinDate: "2022-06-15",
  },
  {
    id: "t2",
    name: "Mrs. Ananya Sharma",
    email: "ananya.sharma@example.com",
    subject: "Science",
    grade: 7,
    section: "B",
    school: "AP Vidya Pathshala South",
    phone: "+91-8765432109",
    joinDate: "2021-07-10",
  },
  {
    id: "t3",
    name: "Mr. Vikram Singh",
    email: "vikram.singh@example.com",
    subject: "Hindi",
    grade: 9,
    section: "A",
    school: "AP Vidya Pathshala North",
    phone: "+91-7654321098",
    joinDate: "2020-08-05",
  },
];

const MOCK_HEADMASTERS = [
  {
    id: "h1",
    name: "Dr. Srinivas Rao",
    email: "srinivas.rao@example.com",
    school: "AP Vidya Pathshala Central",
    phone: "+91-6543210987",
    joinDate: "2018-04-01",
    teachersCount: 48,
    studentsCount: 1245,
  },
  {
    id: "h2",
    name: "Mrs. Lakshmi Devi",
    email: "lakshmi.devi@example.com",
    school: "AP Vidya Pathshala South",
    phone: "+91-5432109876",
    joinDate: "2019-06-15",
    teachersCount: 35,
    studentsCount: 980,
  },
];

export default function UserManagement() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [showStatsDialog, setShowStatsDialog] = useState(false);

  // Filter students based on search query
  const filteredStudents = MOCK_STUDENTS.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewStats = (student: any) => {
    setSelectedStudent(student);
    setShowStatsDialog(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">User Management</h2>
          <p className="text-gray-600 mt-1">
            {isAdmin ? "Manage all users across the platform" : "Manage users in your assigned schools"}
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
            Add User
          </Button>
        </div>
      </div>

      <Card>
        <Tabs defaultValue="students" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            {isAdmin && <TabsTrigger value="headmasters">Head Masters</TabsTrigger>}
          </TabsList>
          
          <Separator className="my-4" />
          
          <TabsContent value="students" className="p-4">
            <div className="space-y-4">
              <StudentToolbar searchQuery={searchQuery} onSearchChange={(e) => setSearchQuery(e.target.value)} />
              <StudentTable 
                students={filteredStudents} 
                onViewStats={handleViewStats}
                canEditStudents={isAdmin || user?.role === "headmaster"} 
              />
            </div>
          </TabsContent>
          
          <TabsContent value="teachers" className="p-4">
            <div className="relative rounded-md w-full mb-4 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search teachers..."
                className="pl-10"
              />
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Name</th>
                    <th className="text-left py-3 px-4 font-medium">Email</th>
                    <th className="text-left py-3 px-4 font-medium">Subject</th>
                    <th className="text-left py-3 px-4 font-medium">Grade/Section</th>
                    <th className="text-left py-3 px-4 font-medium">School</th>
                    <th className="text-left py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_TEACHERS.map((teacher) => (
                    <tr key={teacher.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{teacher.name}</td>
                      <td className="py-3 px-4">{teacher.email}</td>
                      <td className="py-3 px-4">{teacher.subject}</td>
                      <td className="py-3 px-4">Grade {teacher.grade}-{teacher.section}</td>
                      <td className="py-3 px-4">{teacher.school}</td>
                      <td className="py-3 px-4">
                        <Button variant="outline" size="sm">View Profile</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          {isAdmin && (
            <TabsContent value="headmasters" className="p-4">
              <div className="relative rounded-md w-full mb-4 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search headmasters..."
                  className="pl-10"
                />
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Name</th>
                      <th className="text-left py-3 px-4 font-medium">Email</th>
                      <th className="text-left py-3 px-4 font-medium">School</th>
                      <th className="text-left py-3 px-4 font-medium">Teachers</th>
                      <th className="text-left py-3 px-4 font-medium">Students</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_HEADMASTERS.map((headmaster) => (
                      <tr key={headmaster.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{headmaster.name}</td>
                        <td className="py-3 px-4">{headmaster.email}</td>
                        <td className="py-3 px-4">{headmaster.school}</td>
                        <td className="py-3 px-4">{headmaster.teachersCount}</td>
                        <td className="py-3 px-4">{headmaster.studentsCount}</td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">View Profile</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </Card>

      {/* Student Stats Dialog */}
      <Dialog open={showStatsDialog} onOpenChange={setShowStatsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Learning Statistics for {selectedStudent?.name}</DialogTitle>
            <DialogDescription>
              Detailed learning progress and performance metrics
            </DialogDescription>
          </DialogHeader>
          
          {selectedStudent && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Completed Lessons</div>
                  <div className="text-2xl font-bold">{selectedStudent.learningStats.completedLessons}</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Average Quiz Score</div>
                  <div className="text-2xl font-bold">{selectedStudent.learningStats.avgQuizScore}%</div>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg col-span-2">
                  <div className="text-sm text-gray-500">Time Spent Learning</div>
                  <div className="text-2xl font-bold">{selectedStudent.learningStats.timeSpent}</div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Strong Subjects</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedStudent.learningStats.strongSubjects.map((subject: string) => (
                    <span key={subject} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Needs Improvement</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedStudent.learningStats.weakSubjects.length > 0 ? 
                    selectedStudent.learningStats.weakSubjects.map((subject: string) => (
                      <span key={subject} className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                        {subject}
                      </span>
                    )) : 
                    <span className="text-gray-500 text-sm">No weak subjects identified</span>
                  }
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
