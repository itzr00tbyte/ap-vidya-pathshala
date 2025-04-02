
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Camera, Save, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type UserData = {
  name: string;
  email: string;
  grade: number;
  avatar: string | null;
  bio?: string;
  phone?: string;
  address?: string;
};

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  grade: z.string(),
  bio: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
  newPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmNewPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords do not match",
  path: ["confirmNewPassword"],
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function Profile() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Check if user is authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setAvatarPreview(parsedUser.avatar);
    }
  }, [navigate]);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      grade: user?.grade?.toString() || "",
      bio: user?.bio || "",
      phone: user?.phone || "",
      address: user?.address || "",
    },
  });

  // Update form when user data is loaded
  useEffect(() => {
    if (user) {
      profileForm.reset({
        name: user.name,
        email: user.email,
        grade: user.grade.toString(),
        bio: user.bio || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user, profileForm]);

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  function onProfileSubmit(data: ProfileFormValues) {
    setIsLoading(true);
    
    // Update user data in localStorage - in a real app this would update your backend
    setTimeout(() => {
      const updatedUser = {
        ...user,
        name: data.name,
        email: data.email,
        grade: parseInt(data.grade),
        bio: data.bio,
        phone: data.phone,
        address: data.address,
        avatar: avatarPreview
      };
      
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      setIsLoading(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    }, 1000);
  }

  function onPasswordSubmit(data: PasswordFormValues) {
    setIsLoading(true);
    
    // Simulate password change - in a real app this would update your backend
    setTimeout(() => {
      setIsLoading(false);
      passwordForm.reset();
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
    }, 1000);
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatarPreview(result);
      };
      reader.readAsDataURL(file);
    }
  }

  if (!user) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Your Profile</h1>
        
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="password">Password & Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Your Photo</CardTitle>
                  <CardDescription>
                    This will be displayed on your profile
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center">
                  <div className="relative mb-6">
                    <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                      {avatarPreview ? (
                        <img src={avatarPreview} alt="Profile" className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-ap-blue/10 text-ap-blue">
                          <User className="h-16 w-16" />
                        </div>
                      )}
                    </div>
                    <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md cursor-pointer border border-gray-200 hover:bg-gray-50">
                      <Camera className="h-4 w-4 text-gray-600" />
                      <input 
                        id="avatar-upload" 
                        type="file" 
                        accept="image/*"
                        className="hidden" 
                        onChange={handleAvatarChange}
                      />
                    </label>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Remove photo
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                      <FormField
                        control={profileForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={isLoading} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={profileForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" {...field} disabled={isLoading} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="grade"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Grade</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select your grade" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="6">6th Grade</SelectItem>
                                  <SelectItem value="7">7th Grade</SelectItem>
                                  <SelectItem value="8">8th Grade</SelectItem>
                                  <SelectItem value="9">9th Grade</SelectItem>
                                  <SelectItem value="10">10th Grade</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={profileForm.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us a bit about yourself" 
                                className="resize-none" 
                                {...field} 
                                disabled={isLoading} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={profileForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input {...field} disabled={isLoading} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <Input {...field} disabled={isLoading} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving changes...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center">
                            <Save className="mr-2 h-4 w-4" />
                            Save changes
                          </span>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Update Password</CardTitle>
                <CardDescription>
                  Change your password to enhance security
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...passwordForm}>
                  <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormDescription>
                            Password must be at least 8 characters long
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={passwordForm.control}
                      name="confirmNewPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} disabled={isLoading} />
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
                          Updating password...
                        </span>
                      ) : (
                        "Update password"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
