import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GraduationCap, LogIn, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

const adminLoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;

export default function AdminLogin() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();

  // Use useEffect for navigation instead of direct rendering logic
  useEffect(() => {
    if (user && (user.role === "admin" || user.role === "headmaster" || user.role === "teacher")) {
      navigate("/admin-portal");
    }
  }, [user, navigate]);

  const form = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: AdminLoginFormValues) {
    setIsLoading(true);
    
    try {
      await login(data.email, data.password);
      
      // Check if user is admin, headmaster or teacher after login
      const loggedInUser = JSON.parse(localStorage.getItem("user") || "{}");
      
      if (["admin", "headmaster", "teacher"].includes(loggedInUser.role)) {
        toast({
          title: "Login successful",
          description: `Welcome back, ${loggedInUser.name}!`,
        });
        navigate("/admin-portal");
      } else {
        // If not admin/headmaster/teacher, logout and show error
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");
        toast({
          title: "Access denied",
          description: "You don't have permission to access the admin portal",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-12 w-12 text-ap-blue" />
            <span className="text-2xl font-bold text-ap-blue">E Vidhya Pathshala</span>
          </div>
        </div>

        <Card className="border-t-4 border-t-ap-blue">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-ap-blue p-3 rounded-full">
                <Lock className="h-6 w-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Admin Portal</CardTitle>
            <CardDescription className="text-center">
              Sign in to access the administrative dashboard
            </CardDescription>
            <div className="bg-amber-50 p-2 rounded-md border border-amber-200 text-amber-800 text-sm mt-4">
              <p className="font-medium">Demo Accounts:</p>
              <p>Admin: admin@example.com | admin123</p>
              <p>Headmaster: headmaster@example.com | headmaster123</p>
              <p>Teacher: teacher@example.com | teacher123</p>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="admin@example.com" 
                          type="email" 
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your password" 
                          type="password" 
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign in to Admin Portal
                    </span>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-sm text-gray-500">
              Regular student? <a href="/login" className="text-ap-blue hover:underline">Student login</a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
