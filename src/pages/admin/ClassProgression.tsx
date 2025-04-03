
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Filter, Plus, Calendar, Users, ChevronRight, ChevronUp, ChevronDown } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

// Mock data for classes
const MOCK_CLASSES = [
  {
    id: 1,
    grade: 6,
    sections: [
      { section: "A", students: 42, teacherName: "Mrs. Ananya Sharma" },
      { section: "B", students: 38, teacherName: "Mr. Vikram Singh" },
      { section: "C", students: 45, teacherName: "Dr. Rajesh Kumar" }
    ],
    nextPromotionDate: "April 1, 2025",
    subjects: ["Mathematics", "Science", "English", "Hindi", "Social Studies"],
    avgPerformance: 78
  },
  {
    id: 2,
    grade: 7,
    sections: [
      { section: "A", students: 40, teacherName: "Mrs. Lakshmi Reddy" },
      { section: "B", students: 41, teacherName: "Mr. Arjun Verma" }
    ],
    nextPromotionDate: "April 1, 2025",
    subjects: ["Mathematics", "Science", "English", "Hindi", "Social Studies", "Computer Science"],
    avgPerformance: 82
  },
  {
    id: 3,
    grade: 8,
    sections: [
      { section: "A", students: 44, teacherName: "Mrs. Divya Patel" },
      { section: "B", students: 43, teacherName: "Mr. Rahul Mehra" },
      { section: "C", students: 39, teacherName: "Dr. Kiran Rao" }
    ],
    nextPromotionDate: "April 1, 2025",
    subjects: ["Mathematics", "Science", "English", "Hindi", "Social Studies", "Computer Science"],
    avgPerformance: 75
  },
  {
    id: 4,
    grade: 9,
    sections: [
      { section: "A", students: 46, teacherName: "Mrs. Priya Iyer" },
      { section: "B", students: 42, teacherName: "Mr. Alok Sharma" }
    ],
    nextPromotionDate: "April 1, 2025",
    subjects: ["Physics", "Chemistry", "Biology", "Mathematics", "English", "Hindi", "Social Sciences"],
    avgPerformance: 76
  },
  {
    id: 5,
    grade: 10,
    sections: [
      { section: "A", students: 45, teacherName: "Mrs. Sunita Desai" },
      { section: "B", students: 40, teacherName: "Mr. Deepak Kumar" }
    ],
    nextPromotionDate: "Final Year",
    subjects: ["Physics", "Chemistry", "Biology", "Mathematics", "English", "Hindi", "Social Sciences"],
    avgPerformance: 81
  }
];

export default function ClassProgression() {
  const [expandedClass, setExpandedClass] = useState<number | null>(null);

  const toggleExpand = (classId: number) => {
    if (expandedClass === classId) {
      setExpandedClass(null);
    } else {
      setExpandedClass(classId);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Class Progression</h2>
          <p className="text-gray-600 mt-1">
            Manage class promotions, sections, and scheduled progressions
          </p>
        </div>
        
        <div className="flex space-x-3">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Promotion Schedule
          </Button>
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
            Add Class
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {MOCK_CLASSES.map((cls) => (
          <Card key={cls.id} className="overflow-hidden">
            <div 
              className="p-4 bg-slate-50 flex items-center justify-between cursor-pointer"
              onClick={() => toggleExpand(cls.id)}
            >
              <div className="flex items-center">
                <div className="bg-blue-100 text-blue-800 font-bold rounded-full w-10 h-10 flex items-center justify-center mr-3">
                  {cls.grade}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Grade {cls.grade}</h3>
                  <div className="text-sm text-gray-500">
                    {cls.sections.length} sections • {cls.sections.reduce((acc, section) => acc + section.students, 0)} students
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-sm text-gray-500">Avg. Performance</div>
                  <Badge className={`${
                    cls.avgPerformance >= 80 ? 'bg-green-100 text-green-800' : 
                    cls.avgPerformance >= 70 ? 'bg-blue-100 text-blue-800' : 
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {cls.avgPerformance}%
                  </Badge>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">Next Promotion</div>
                  <div className="text-sm font-medium">{cls.nextPromotionDate}</div>
                </div>
                
                <div>
                  {expandedClass === cls.id ? 
                    <ChevronUp className="h-5 w-5 text-gray-400" /> : 
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  }
                </div>
              </div>
            </div>
            
            {expandedClass === cls.id && (
              <div className="p-4">
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2">Sections</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Section</TableHead>
                        <TableHead>Students</TableHead>
                        <TableHead>Class Teacher</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cls.sections.map((section) => (
                        <TableRow key={section.section}>
                          <TableCell className="font-medium">Section {section.section}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Users className="h-3 w-3 mr-2" />
                              <span>{section.students}</span>
                            </div>
                          </TableCell>
                          <TableCell>{section.teacherName}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View Details
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold mb-2">Subjects</h4>
                  <div className="flex flex-wrap gap-2">
                    {cls.subjects.map((subject) => (
                      <Badge key={subject} variant="outline">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
