
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, User } from "lucide-react";
import { Student } from "@/data/mockStudents";
import { useIsMobile } from "@/hooks/use-mobile";

interface StudentTableProps {
  students: Student[];
  onViewStats: (student: Student) => void;
  canEditStudents: boolean;
}

const StudentTable = ({ students, onViewStats, canEditStudents }: StudentTableProps) => {
  const isMobile = useIsMobile();

  // Mobile card view for students
  if (isMobile) {
    return (
      <div className="space-y-3">
        {students.length > 0 ? (
          students.map((student) => (
            <div 
              key={student.id} 
              className="bg-white p-3 rounded-lg border shadow-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-sm sm:text-base">{student.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-500">{student.email}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onViewStats(student)}>
                      View Learning Stats
                    </DropdownMenuItem>
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>View performance</DropdownMenuItem>
                    {canEditStudents && (
                      <>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-xs sm:text-sm">
                <div>
                  <span className="text-gray-500">Grade:</span> {student.grade}
                </div>
                <div>
                  <span className="text-gray-500">Section:</span> {student.section}
                </div>
                <div>
                  <span className="text-gray-500">Attendance:</span> {student.attendance}%
                </div>
                <div>
                  <span className="text-gray-500">Performance:</span>
                  <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
                    student.performance === 'Excellent' ? 'bg-green-100 text-green-800' :
                    student.performance === 'Good' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {student.performance}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <User className="h-8 w-8 mx-auto text-gray-400" />
            <p className="mt-2 text-gray-500">No students found</p>
          </div>
        )}
      </div>
    );
  }

  // Desktop table view with horizontal scrolling for smaller screens
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Section</TableHead>
            <TableHead>Attendance</TableHead>
            <TableHead>Performance</TableHead>
            <TableHead className="hidden md:table-cell">Last Active</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.length > 0 ? (
            students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.grade}</TableCell>
                <TableCell>{student.section}</TableCell>
                <TableCell>{student.attendance}%</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    student.performance === 'Excellent' ? 'bg-green-100 text-green-800' :
                    student.performance === 'Good' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {student.performance}
                  </span>
                </TableCell>
                <TableCell className="hidden md:table-cell">{student.lastActive}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onViewStats(student)}>
                        View Learning Stats
                      </DropdownMenuItem>
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>View performance</DropdownMenuItem>
                      {canEditStudents && (
                        <>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="h-24 text-center">
                No students found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentTable;
