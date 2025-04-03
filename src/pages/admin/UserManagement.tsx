
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Download, Filter } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserManagement() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">User Management</h2>
          <p className="text-gray-600 mt-1">
            {isAdmin ? "Manage all users across the platform" : "Manage users in your assigned schools"}
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
            Add User
          </Button>
        </div>
      </div>

      <Card>
        <Tabs defaultValue="students" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            {isAdmin && <TabsTrigger value="headmasters">Head Masters</TabsTrigger>}
          </TabsList>
          
          <Separator className="my-4" />
          
          <TabsContent value="students" className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4">
                <p className="text-sm text-muted-foreground">Showing placeholder for student management</p>
              </div>
              
              {/* Skeleton UI for students table */}
              <div className="space-y-2">
                {Array(5).fill(0).map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="teachers" className="p-4">
            <div className="space-y-2">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          {isAdmin && (
            <TabsContent value="headmasters" className="p-4">
              <div className="space-y-2">
                {Array(2).fill(0).map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </Card>
    </div>
  );
}
