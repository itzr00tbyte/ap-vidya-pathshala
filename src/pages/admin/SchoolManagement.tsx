
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Download, Filter, MapPin, Users, GraduationCap } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Mock data for schools
const MOCK_SCHOOLS = [
  {
    id: 1,
    name: "AP Vidya Pathshala Central",
    location: "Hyderabad, Telangana",
    students: 1245,
    teachers: 48,
    headmaster: "Dr. Srinivas Rao",
    status: "active"
  },
  {
    id: 2,
    name: "AP Vidya Pathshala South",
    location: "Chennai, Tamil Nadu",
    students: 980,
    teachers: 35,
    headmaster: "Mrs. Lakshmi Devi",
    status: "active"
  },
  {
    id: 3,
    name: "AP Vidya Pathshala North",
    location: "Delhi, NCR",
    students: 1120,
    teachers: 42,
    headmaster: "Mr. Arun Verma",
    status: "active"
  },
  {
    id: 4,
    name: "AP Vidya Pathshala East",
    location: "Kolkata, West Bengal",
    students: 875,
    teachers: 32,
    headmaster: "Dr. Amrita Sen",
    status: "maintenance"
  },
  {
    id: 5,
    name: "AP Vidya Pathshala West",
    location: "Mumbai, Maharashtra",
    students: 1350,
    teachers: 52,
    headmaster: "Mr. Deepak Patil",
    status: "active"
  },
];

export default function SchoolManagement() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">School Management</h2>
          <p className="text-gray-600 mt-1">
            Manage schools across the platform
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
            Add School
          </Button>
        </div>
      </div>

      <Card>
        <div className="p-4">
          <div className="flex items-center justify-between pb-4">
            <p className="text-sm text-muted-foreground">Showing {MOCK_SCHOOLS.length} schools</p>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>School Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Headmaster</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Teachers</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_SCHOOLS.map((school) => (
                <TableRow key={school.id}>
                  <TableCell className="font-medium">{school.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-2" />
                      <span>{school.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>{school.headmaster}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="h-3 w-3 mr-2" />
                      <span>{school.students}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <GraduationCap className="h-3 w-3 mr-2" />
                      <span>{school.teachers}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={school.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'}
                    >
                      {school.status === 'active' ? 'Active' : 'Maintenance'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">Manage</Button>
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
