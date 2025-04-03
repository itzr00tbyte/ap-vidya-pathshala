
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Download, Filter } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function CourseManagement() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Course Management</h2>
          <p className="text-gray-600 mt-1">
            Manage classes, subjects, semesters and courses across the platform
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
            Add Course
          </Button>
        </div>
      </div>

      <Card>
        <Tabs defaultValue="classes" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-md">
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="semesters">Semesters</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
          </TabsList>
          
          <Separator className="my-4" />
          
          <TabsContent value="classes" className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[6, 7, 8, 9, 10].map((grade) => (
                <Card key={grade} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="font-bold text-lg">Grade {grade}</div>
                  <div className="text-sm text-gray-500 mt-2">Students: {Math.floor(Math.random() * 100) + 200}</div>
                  <div className="text-sm text-gray-500">Subjects: {Math.floor(Math.random() * 5) + 5}</div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="subjects" className="p-4">
            <div className="space-y-2">
              {Array(5).fill(0).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="semesters" className="p-4">
            <div className="space-y-2">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="courses" className="p-4">
            <div className="space-y-2">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
