
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Download, Filter, Mail, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Mock data for teachers
const MOCK_TEACHERS = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "+91-9876543210",
    subject: "Mathematics",
    classes: [7, 8, 9],
    school: "AP Vidya Pathshala Central",
  },
  {
    id: 2,
    name: "Smt. Ananya Sharma",
    email: "ananya.sharma@example.com",
    phone: "+91-8765432109",
    subject: "Science",
    classes: [6, 7],
    school: "AP Vidya Pathshala South",
  },
  {
    id: 3,
    name: "Shri. Vikram Singh",
    email: "vikram.singh@example.com",
    phone: "+91-7654321098",
    subject: "Hindi",
    classes: [8, 9, 10],
    school: "AP Vidya Pathshala North",
  },
  {
    id: 4,
    name: "Ms. Priya Patel",
    email: "priya.patel@example.com",
    phone: "+91-6543210987",
    subject: "English",
    classes: [6, 7, 8],
    school: "AP Vidya Pathshala East",
  },
  {
    id: 5,
    name: "Mr. Arjun Reddy",
    email: "arjun.reddy@example.com",
    phone: "+91-5432109876",
    subject: "Social Studies",
    classes: [9, 10],
    school: "AP Vidya Pathshala West",
  },
];

export default function TeacherManagement() {
  const { user } = useAuth();
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Teacher Management</h2>
          <p className="text-gray-600 mt-1">
            {user?.role === "admin" ? 
              "Manage all teachers across schools" : 
              "Manage teachers in your assigned schools"}
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
            Add Teacher
          </Button>
        </div>
      </div>

      <Card>
        <div className="p-4">
          <div className="flex items-center justify-between pb-4">
            <p className="text-sm text-muted-foreground">Showing {MOCK_TEACHERS.length} teachers</p>
          </div>
          
          <Separator className="my-4" />
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Teacher Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Classes</TableHead>
                <TableHead>School</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_TEACHERS.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell className="font-medium">{teacher.name}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="h-3 w-3 mr-2" />
                        <span>{teacher.email}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-3 w-3 mr-2" />
                        <span>{teacher.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{teacher.subject}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {teacher.classes.map((cls) => (
                        <Badge key={cls} variant="outline">Grade {cls}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{teacher.school}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
