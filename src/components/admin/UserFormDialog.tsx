
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { MOCK_SCHOOLS } from "@/data/mockSchools";

const userFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  role: z.enum(["student", "teacher", "headmaster", "admin"]),
  schoolId: z.string().optional(),
  grade: z.string().optional(),
  status: z.enum(["active", "inactive", "pending"]).default("active"),
});

type UserFormValues = z.infer<typeof userFormSchema>;

interface UserData {
  id?: string;
  name: string;
  email: string;
  role: "student" | "teacher" | "headmaster" | "admin";
  schoolId?: string;
  grade?: string;
  status: "active" | "inactive" | "pending";
}

interface UserFormDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  user?: UserData | null;
  onSave: (data: UserData) => void;
  title?: string;
}

const UserFormDialog = ({
  isOpen,
  setIsOpen,
  user,
  onSave,
  title = "Add New User",
}: UserFormDialogProps) => {
  const isEditMode = !!user;
  
  const defaultValues: Partial<UserFormValues> = {
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "student",
    schoolId: user?.schoolId || "",
    grade: user?.grade || "",
    status: user?.status || "active",
  };

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues,
  });

  function onSubmit(data: UserFormValues) {
    try {
      onSave({
        id: user?.id,
        ...data,
      });
      setIsOpen(false);
      toast({
        title: `User ${isEditMode ? "updated" : "added"} successfully`,
        description: `${data.name} has been ${isEditMode ? "updated" : "added"} in the system.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEditMode ? "update" : "add"} user. Please try again.`,
        variant: "destructive",
      });
    }
  }

  const selectedRole = form.watch("role");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {isEditMode ? "Update user details" : "Fill in the details to add a new user."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="headmaster">Headmaster</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {(selectedRole === "student" || selectedRole === "teacher") && (
              <FormField
                control={form.control}
                name="schoolId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a school" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {MOCK_SCHOOLS.map(school => (
                          <SelectItem key={school.id} value={school.id}>
                            {school.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {selectedRole === "student" && (
              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grade</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a grade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(grade => (
                          <SelectItem key={grade} value={grade.toString()}>
                            Grade {grade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {isEditMode ? "Update" : "Add"} User
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UserFormDialog;
