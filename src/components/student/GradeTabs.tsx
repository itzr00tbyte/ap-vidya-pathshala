
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GradeTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  children: React.ReactNode;
}

const GradeTabs = ({ activeTab, onTabChange, children }: GradeTabsProps) => {
  return (
    <Tabs defaultValue={activeTab} value={activeTab} onValueChange={onTabChange} className="w-full">
      <div className="px-4 sm:px-6 border-b border-gray-200">
        <TabsList className="flex overflow-x-auto py-2">
          <TabsTrigger value="all">All Grades</TabsTrigger>
          <TabsTrigger value="7">Grade 7</TabsTrigger>
          <TabsTrigger value="8">Grade 8</TabsTrigger>
          <TabsTrigger value="9">Grade 9</TabsTrigger>
          <TabsTrigger value="10">Grade 10</TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value={activeTab} className="p-0">
        <div className="overflow-x-auto">
          {children}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default GradeTabs;
