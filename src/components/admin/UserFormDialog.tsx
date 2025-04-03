
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MOCK_SCHOOLS } from "@/data/mockSchools";

// Define UserData type explicitly to ensure required properties are set
export type UserData = {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher" | "headmaster" | "admin";
  status: "active" | "inactive" | "pending";
  schoolId: string;
  grade?: string;
};

interface UserFormDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  user: UserData | null;
  onSave: (userData: UserData) => void;
  title: string;
}

export default function UserFormDialog({ 
  isOpen, 
  setIsOpen, 
  user, 
  onSave, 
  title 
}: UserFormDialogProps) {
  // Initialize all form fields with default values
  const [formData, setFormData] = useState<UserData>({
    id: "",
    name: "",
    email: "",
    role: "student",
    status: "active",
    schoolId: MOCK_SCHOOLS[0]?.id || "",
    grade: "6"  // Changed default to grade 6
  });
  
  // Update form when editing existing user
  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id,
        name: user.name || "",
        email: user.email || "",
        role: user.role || "student",
        status: user.status || "active",
        schoolId: user.schoolId || MOCK_SCHOOLS[0]?.id || "",
        grade: user.grade || "6"  // Changed default to grade 6
      });
    } else {
      // Reset form for new user
      setFormData({
        id: `u${Date.now()}`, // Generate a temporary ID
        name: "",
        email: "",
        role: "student",
        status: "active",
        schoolId: MOCK_SCHOOLS[0]?.id || "",
        grade: "6"  // Changed default to grade 6
      });
    }
  }, [user]);
  
  const handleChange = (
    field: keyof UserData, 
    value: string
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = () => {
    // Ensure all required fields are filled
    if (!formData.name || !formData.email || !formData.role || !formData.status || !formData.schoolId) {
      alert("Please fill all required fields");
      return;
    }
    
    // Submit the form data
    onSave(formData);
    setIsOpen(false);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Select
              value={formData.role}
              onValueChange={(value) => handleChange("role", value as any)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
                <SelectItem value="headmaster">Head Master</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleChange("status", value as any)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="school" className="text-right">
              School
            </Label>
            <Select
              value={formData.schoolId}
              onValueChange={(value) => handleChange("schoolId", value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select school" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_SCHOOLS.map((school) => (
                  <SelectItem key={school.id} value={school.id}>
                    {school.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {formData.role === "student" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="grade" className="text-right">
                Grade
              </Label>
              <Select
                value={formData.grade || "6"}
                onValueChange={(value) => handleChange("grade", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {/* Changed to only include grades 6 through 10 */}
                  {Array.from({ length: 5 }, (_, i) => i + 6).map((grade) => (
                    <SelectItem key={grade} value={grade.toString()}>
                      Grade {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
