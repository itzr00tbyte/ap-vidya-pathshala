
import { Search, Filter, Download, BarChart3, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";

interface StudentToolbarProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StudentToolbar = ({ searchQuery, onSearchChange }: StudentToolbarProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="px-3 py-3 sm:px-4 sm:py-5 border-b border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="relative rounded-md w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={onSearchChange}
            className="pl-10"
          />
        </div>
        
        {isMobile ? (
          <div className="flex justify-between w-full">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              Reports
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentToolbar;
