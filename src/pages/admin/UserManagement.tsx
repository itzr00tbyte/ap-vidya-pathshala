
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Download, Filter, Search, Mail, Trash2, Eye } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/hooks/use-toast";
import { MOCK_STUDENTS, Student } from "@/data/mockStudents";
import { MOCK_TEACHERS } from "@/data/mockTeachers";
import { MOCK_HEADMASTERS } from "@/data/mockHeadmasters";
import { MOCK_SCHOOLS } from "@/data/mockSchools";
import StudentTable from "@/components/student/StudentTable";
import StudentToolbar from "@/components/student/StudentToolbar";
import UserPagination from "@/components/admin/UserPagination";
import UserFilterDropdown from "@/components/admin/UserFilterDropdown";
import UserBulkActions from "@/components/admin/UserBulkActions";
import UserFormDialog from "@/components/admin/UserFormDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ITEMS_PER_PAGE = 10;

export default function UserManagement() {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const isAdmin = user?.role === "admin";
  
  // State variables
  const [searchQuery, setSearchQuery] = useState("");
  const [teacherSearchQuery, setTeacherSearchQuery] = useState("");
  const [headmasterSearchQuery, setHeadmasterSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showStatsDialog, setShowStatsDialog] = useState(false);
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsCurrentPage, setStudentsCurrentPage] = useState(1);
  const [teachersCurrentPage, setTeachersCurrentPage] = useState(1);
  const [headmastersCurrentPage, setHeadmastersCurrentPage] = useState(1);
  
  // Selection state
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  
  // Filter state
  const [activeFilters, setActiveFilters] = useState({
    roles: [] as string[],
    grades: [] as string[],
    schools: [] as string[],
    status: [] as string[],
  });
  
  // Tab state
  const [activeTab, setActiveTab] = useState("students");
  
  // Reset selection when tab changes
  useEffect(() => {
    setSelectedUsers([]);
  }, [activeTab]);
  
  // Reset pagination when search changes
  useEffect(() => {
    setStudentsCurrentPage(1);
  }, [searchQuery]);
  
  useEffect(() => {
    setTeachersCurrentPage(1);
  }, [teacherSearchQuery]);
  
  useEffect(() => {
    setHeadmastersCurrentPage(1);
  }, [headmasterSearchQuery]);

  // Filter students based on search query and filters
  const filteredStudents = MOCK_STUDENTS.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGradeFilter = activeFilters.grades.length === 0 || 
      activeFilters.grades.includes(student.grade.toString());
    
    const matchesSchoolFilter = activeFilters.schools.length === 0 ||
      activeFilters.schools.includes(student.schoolId);
    
    const matchesStatusFilter = activeFilters.status.length === 0 ||
      activeFilters.status.includes(student.status);
    
    return matchesSearch && matchesGradeFilter && matchesSchoolFilter && matchesStatusFilter;
  });

  // Filter teachers based on search query and filters
  const filteredTeachers = MOCK_TEACHERS.filter(teacher => {
    const matchesSearch = 
      teacher.name.toLowerCase().includes(teacherSearchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(teacherSearchQuery.toLowerCase()) ||
      teacher.subjects.some(subj => subj.toLowerCase().includes(teacherSearchQuery.toLowerCase()));
    
    const matchesSchoolFilter = activeFilters.schools.length === 0 ||
      activeFilters.schools.includes(teacher.schoolId);
    
    const matchesStatusFilter = activeFilters.status.length === 0 ||
      activeFilters.status.includes(teacher.status);
    
    return matchesSearch && matchesSchoolFilter && matchesStatusFilter;
  });

  // Filter headmasters based on search query and filters
  const filteredHeadmasters = MOCK_HEADMASTERS.filter(headmaster => {
    const matchesSearch = 
      headmaster.name.toLowerCase().includes(headmasterSearchQuery.toLowerCase()) ||
      headmaster.email.toLowerCase().includes(headmasterSearchQuery.toLowerCase());
    
    const matchesSchoolFilter = activeFilters.schools.length === 0 ||
      activeFilters.schools.includes(headmaster.schoolId);
    
    return matchesSearch && matchesSchoolFilter;
  });
  
  // Pagination logic
  const paginatedStudents = filteredStudents.slice(
    (studentsCurrentPage - 1) * ITEMS_PER_PAGE,
    studentsCurrentPage * ITEMS_PER_PAGE
  );
  
  const paginatedTeachers = filteredTeachers.slice(
    (teachersCurrentPage - 1) * ITEMS_PER_PAGE,
    teachersCurrentPage * ITEMS_PER_PAGE
  );
  
  const paginatedHeadmasters = filteredHeadmasters.slice(
    (headmastersCurrentPage - 1) * ITEMS_PER_PAGE,
    headmastersCurrentPage * ITEMS_PER_PAGE
  );
  
  const totalStudentPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const totalTeacherPages = Math.ceil(filteredTeachers.length / ITEMS_PER_PAGE);
  const totalHeadmasterPages = Math.ceil(filteredHeadmasters.length / ITEMS_PER_PAGE);
  
  // Filter options
  const filterOptions = {
    roles: [
      { id: "student", label: "Student" },
      { id: "teacher", label: "Teacher" },
      { id: "headmaster", label: "Headmaster" },
      { id: "admin", label: "Admin" },
    ],
    grades: Array.from({ length: 12 }, (_, i) => ({ 
      id: (i + 1).toString(), 
      label: `Grade ${i + 1}` 
    })),
    schools: MOCK_SCHOOLS.map(school => ({
      id: school.id,
      label: school.name,
    })),
    status: [
      { id: "active", label: "Active" },
      { id: "inactive", label: "Inactive" },
      { id: "pending", label: "Pending" },
    ],
  };
  
  // Handle filter changes
  const handleFilterChange = (category: string, value: string) => {
    setActiveFilters(prev => {
      const currentFilters = [...prev[category as keyof typeof prev]];
      const index = currentFilters.indexOf(value);
      
      if (index >= 0) {
        // Remove filter if already selected
        currentFilters.splice(index, 1);
      } else {
        // Add filter if not selected
        currentFilters.push(value);
      }
      
      return {
        ...prev,
        [category]: currentFilters,
      };
    });
    
    // Reset pagination
    setStudentsCurrentPage(1);
    setTeachersCurrentPage(1);
    setHeadmastersCurrentPage(1);
  };
  
  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters({
      roles: [],
      grades: [],
      schools: [],
      status: [],
    });
  };
  
  // Handle view stats
  const handleViewStats = (student: Student) => {
    setSelectedStudent(student);
    setShowStatsDialog(true);
  };
  
  // Handle bulk selection
  const toggleSelectAll = (tab: string) => {
    if (tab === "students") {
      if (selectedUsers.length === paginatedStudents.length) {
        // Deselect all if all are selected
        setSelectedUsers([]);
      } else {
        // Select all otherwise
        setSelectedUsers(paginatedStudents.map(student => student.id));
      }
    } else if (tab === "teachers") {
      if (selectedUsers.length === paginatedTeachers.length) {
        setSelectedUsers([]);
      } else {
        setSelectedUsers(paginatedTeachers.map(teacher => teacher.id));
      }
    } else if (tab === "headmasters") {
      if (selectedUsers.length === paginatedHeadmasters.length) {
        setSelectedUsers([]);
      } else {
        setSelectedUsers(paginatedHeadmasters.map(headmaster => headmaster.id));
      }
    }
  };
  
  // Toggle individual item selection
  const toggleSelectUser = (id: string) => {
    setSelectedUsers(prev => {
      if (prev.includes(id)) {
        return prev.filter(userId => userId !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  
  // Clear selection
  const clearSelection = () => {
    setSelectedUsers([]);
  };
  
  // Handle bulk actions
  const handleExportSelected = () => {
    toast({
      title: "Export initiated",
      description: `Exporting data for ${selectedUsers.length} users`,
    });
    clearSelection();
  };
  
  const handleDeleteSelected = () => {
    toast({
      title: "Users deleted",
      description: `${selectedUsers.length} users have been deleted`,
    });
    clearSelection();
  };
  
  const handleEmailSelected = () => {
    toast({
      title: "Email prepared",
      description: `Email draft created for ${selectedUsers.length} users`,
    });
  };
  
  const handleAssignSelected = () => {
    toast({
      title: "Assignment prepared",
      description: `Ready to assign new school/class to ${selectedUsers.length} users`,
    });
  };
  
  // Handle add/edit user
  const handleAddUser = () => {
    setEditingUser(null);
    setShowAddUserDialog(true);
  };
  
  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setShowAddUserDialog(true);
  };
  
  const handleSaveUser = (userData: any) => {
    const action = userData.id ? "updated" : "added";
    toast({
      title: `User ${action}`,
      description: `${userData.name} has been successfully ${action}`,
    });
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">User Management</h2>
          <p className="text-gray-600 mt-1">
            {isAdmin ? "Manage all users across the platform" : "Manage users in your assigned schools"}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <UserFilterDropdown 
            options={filterOptions}
            selectedFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearAllFilters}
          />
          
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          
          <Button onClick={handleAddUser}>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      <Card>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            {isAdmin && <TabsTrigger value="headmasters">Head Masters</TabsTrigger>}
          </TabsList>
          
          <Separator className="my-4" />
          
          {/* Bulk Actions Bar (appears when items are selected) */}
          <UserBulkActions
            selectedCount={selectedUsers.length}
            onClearSelection={clearSelection}
            onExportSelected={handleExportSelected}
            onDeleteSelected={handleDeleteSelected}
            onEmailSelected={handleEmailSelected}
            onAssignSelected={handleAssignSelected}
          />
          
          <TabsContent value="students" className="p-0 sm:p-4">
            <div className="space-y-4">
              <StudentToolbar 
                searchQuery={searchQuery} 
                onSearchChange={(e) => setSearchQuery(e.target.value)} 
              />
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox 
                          checked={selectedUsers.length === paginatedStudents.length && paginatedStudents.length > 0}
                          onCheckedChange={() => toggleSelectAll("students")}
                          aria-label="Select all"
                        />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden md:table-cell">Email</TableHead>
                      <TableHead className="hidden sm:table-cell">School</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead className="hidden md:table-cell">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedStudents.map((student) => {
                      const school = MOCK_SCHOOLS.find(s => s.id === student.schoolId);
                      return (
                        <TableRow key={student.id}>
                          <TableCell className="w-[50px]">
                            <Checkbox 
                              checked={selectedUsers.includes(student.id)}
                              onCheckedChange={() => toggleSelectUser(student.id)}
                              aria-label={`Select ${student.name}`}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell className="hidden md:table-cell">{student.email}</TableCell>
                          <TableCell className="hidden sm:table-cell">{school?.name}</TableCell>
                          <TableCell>Grade {student.grade}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge 
                              className={
                                student.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 
                                student.status === 'pending' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : 
                                'bg-red-100 text-red-800 hover:bg-red-200'
                              }
                            >
                              {student.status === 'active' ? 'Active' : 
                              student.status === 'pending' ? 'Pending' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <span className="sr-only">Open menu</span>
                                  <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                  >
                                    <path
                                      d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                                      fill="currentColor"
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleViewStats(student)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Stats
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEditUser(student)}>
                                  <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mr-2 h-4 w-4"
                                  >
                                    <path
                                      d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z"
                                      fill="currentColor"
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Mail className="mr-2 h-4 w-4" />
                                  Email
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {paginatedStudents.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                          No students found matching your search
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              {totalStudentPages > 1 && (
                <div className="flex justify-center mt-4">
                  <UserPagination
                    currentPage={studentsCurrentPage}
                    totalPages={totalStudentPages}
                    onPageChange={setStudentsCurrentPage}
                  />
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="teachers" className="p-0 sm:p-4">
            <div className="space-y-4">
              <div className="px-3 py-3 sm:px-4 sm:py-5 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="relative rounded-md w-full sm:max-w-xs">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      type="text"
                      placeholder="Search teachers..."
                      className="pl-10"
                      value={teacherSearchQuery}
                      onChange={(e) => setTeacherSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox 
                          checked={selectedUsers.length === paginatedTeachers.length && paginatedTeachers.length > 0}
                          onCheckedChange={() => toggleSelectAll("teachers")}
                          aria-label="Select all"
                        />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden md:table-cell">Email</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead className="hidden lg:table-cell">School</TableHead>
                      <TableHead className="hidden md:table-cell">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedTeachers.map((teacher) => {
                      const school = MOCK_SCHOOLS.find(s => s.id === teacher.schoolId);
                      return (
                        <TableRow key={teacher.id}>
                          <TableCell className="w-[50px]">
                            <Checkbox 
                              checked={selectedUsers.includes(teacher.id)}
                              onCheckedChange={() => toggleSelectUser(teacher.id)}
                              aria-label={`Select ${teacher.name}`}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{teacher.name}</TableCell>
                          <TableCell className="hidden md:table-cell">{teacher.email}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {teacher.subjects.slice(0, 2).map((subject) => (
                                <Badge key={subject} variant="outline" className="bg-blue-50">
                                  {subject}
                                </Badge>
                              ))}
                              {teacher.subjects.length > 2 && (
                                <Badge variant="outline">+{teacher.subjects.length - 2}</Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">{school?.name}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge 
                              className={
                                teacher.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 
                                teacher.status === 'leave' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : 
                                'bg-red-100 text-red-800 hover:bg-red-200'
                              }
                            >
                              {teacher.status === 'active' ? 'Active' : 
                              teacher.status === 'leave' ? 'On Leave' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <span className="sr-only">Open menu</span>
                                  <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                  >
                                    <path
                                      d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                                      fill="currentColor"
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleEditUser(teacher)}>
                                  <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mr-2 h-4 w-4"
                                  >
                                    <path
                                      d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z"
                                      fill="currentColor"
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Mail className="mr-2 h-4 w-4" />
                                  Email
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {paginatedTeachers.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                          No teachers found matching your search
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              {totalTeacherPages > 1 && (
                <div className="flex justify-center mt-4">
                  <UserPagination
                    currentPage={teachersCurrentPage}
                    totalPages={totalTeacherPages}
                    onPageChange={setTeachersCurrentPage}
                  />
                </div>
              )}
            </div>
          </TabsContent>
          
          {isAdmin && (
            <TabsContent value="headmasters" className="p-0 sm:p-4">
              <div className="space-y-4">
                <div className="px-3 py-3 sm:px-4 sm:py-5 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="relative rounded-md w-full sm:max-w-xs">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input
                        type="text"
                        placeholder="Search headmasters..."
                        className="pl-10"
                        value={headmasterSearchQuery}
                        onChange={(e) => setHeadmasterSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">
                          <Checkbox 
                            checked={selectedUsers.length === paginatedHeadmasters.length && paginatedHeadmasters.length > 0}
                            onCheckedChange={() => toggleSelectAll("headmasters")}
                            aria-label="Select all"
                          />
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="hidden md:table-cell">Email</TableHead>
                        <TableHead>School</TableHead>
                        <TableHead className="hidden md:table-cell">Teachers</TableHead>
                        <TableHead className="hidden md:table-cell">Students</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedHeadmasters.map((headmaster) => {
                        const school = MOCK_SCHOOLS.find(s => s.id === headmaster.schoolId);
                        return (
                          <TableRow key={headmaster.id}>
                            <TableCell className="w-[50px]">
                              <Checkbox 
                                checked={selectedUsers.includes(headmaster.id)}
                                onCheckedChange={() => toggleSelectUser(headmaster.id)}
                                aria-label={`Select ${headmaster.name}`}
                              />
                            </TableCell>
                            <TableCell className="font-medium">{headmaster.name}</TableCell>
                            <TableCell className="hidden md:table-cell">{headmaster.email}</TableCell>
                            <TableCell>{school?.name}</TableCell>
                            <TableCell className="hidden md:table-cell">{school?.teachers}</TableCell>
                            <TableCell className="hidden md:table-cell">{school?.students}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <span className="sr-only">Open menu</span>
                                    <svg
                                      width="15"
                                      height="15"
                                      viewBox="0 0 15 15"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-4 w-4"
                                    >
                                      <path
                                        d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                      ></path>
                                    </svg>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem onClick={() => handleEditUser(headmaster)}>
                                    <svg
                                      width="15"
                                      height="15"
                                      viewBox="0 0 15 15"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="mr-2 h-4 w-4"
                                    >
                                      <path
                                        d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z"
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                      ></path>
                                    </svg>
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Profile
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Mail className="mr-2 h-4 w-4" />
                                    Email
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      {paginatedHeadmasters.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                            No headmasters found matching your search
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                {totalHeadmasterPages > 1 && (
                  <div className="flex justify-center mt-4">
                    <UserPagination
                      currentPage={headmastersCurrentPage}
                      totalPages={totalHeadmasterPages}
                      onPageChange={setHeadmastersCurrentPage}
                    />
                  </div>
                )}
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
      
      {/* Add/Edit User Dialog */}
      <UserFormDialog
        isOpen={showAddUserDialog}
        setIsOpen={setShowAddUserDialog}
        user={editingUser}
        onSave={handleSaveUser}
        title={editingUser ? "Edit User" : "Add New User"}
      />
    </div>
  );
}
