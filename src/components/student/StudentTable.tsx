
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
import { MoreHorizontal, User, BarChart2 } from "lucide-react";
import { Student } from "@/data/mockStudents";
import { useIsMobile } from "@/hooks/use-mobile";
import ProgressBar from "@/components/ProgressBar";

interface StudentTableProps {
  students: Student[];
  onViewStats: (student: Student) => void;
  canEditStudents: boolean;
  onViewSubjectProgress?: (student: Student) => void;
}

const StudentTable = ({ 
  students, 
  onViewStats, 
  canEditStudents,
  onViewSubjectProgress 
}: StudentTableProps) => {
  const isMobile = useIsMobile();

  // Calculate average progress for a student across all subjects
  const getAverageProgress = (student: Student) => {
    if (!student.subjectProgress || student.subjectProgress.length === 0) {
      return 0;
    }
    
    const total = student.subjectProgress.reduce((sum, subject) => sum + subject.progress, 0);
    return Math.round(total / student.subjectProgress.length);
  };

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
                    {onViewSubjectProgress && (
                      <DropdownMenuItem onClick={() => onViewSubjectProgress(student)}>
                        View Subject Progress
                      </DropdownMenuItem>
                    )}
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
              
              {/* Add progress section */}
              <div className="mt-3">
                <div className="text-xs font-medium mb-1">Overall Progress</div>
                <ProgressBar 
                  progress={getAverageProgress(student)} 
                  color={
                    getAverageProgress(student) >= 75 ? "green" : 
                    getAverageProgress(student) >= 40 ? "blue" : "yellow"
                  }
                  size="sm"
                />
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
            <TableHead>Progress</TableHead>
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
                <TableCell>
                  <div className="w-28">
                    <ProgressBar 
                      progress={getAverageProgress(student)} 
                      color={
                        getAverageProgress(student) >= 75 ? "green" : 
                        getAverageProgress(student) >= 40 ? "blue" : "yellow"
                      }
                      size="sm"
                      showLabel={false}
                    />
                    <span className="text-xs ml-1">{getAverageProgress(student)}%</span>
                  </div>
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
                      {onViewSubjectProgress && (
                        <DropdownMenuItem onClick={() => onViewSubjectProgress(student)}>
                          <BarChart2 className="h-4 w-4 mr-2" />
                          View Subject Progress
                        </DropdownMenuItem>
                      )}
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
              <TableCell colSpan={10} className="h-24 text-center">
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
