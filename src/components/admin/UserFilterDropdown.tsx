
import React, { useState } from "react";
import { Filter, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FilterOption {
  id: string;
  label: string;
}

interface UserFilterDropdownProps {
  options: {
    roles: FilterOption[];
    grades: FilterOption[];
    schools: FilterOption[];
    status: FilterOption[];
  };
  selectedFilters: {
    roles: string[];
    grades: string[];
    schools: string[];
    status: string[];
  };
  onFilterChange: (category: string, value: string) => void;
  onClearFilters: () => void;
}

const UserFilterDropdown = ({
  options,
  selectedFilters,
  onFilterChange,
  onClearFilters,
}: UserFilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const getActiveFilterCount = () => {
    return (
      selectedFilters.roles.length +
      selectedFilters.grades.length +
      selectedFilters.schools.length +
      selectedFilters.status.length
    );
  };
  
  const activeCount = getActiveFilterCount();

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="relative">
          <Filter className="h-4 w-4 mr-2" />
          Filter
          {activeCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 bg-white shadow-md" align="start">
        <DropdownMenuLabel>Filter Users</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs text-gray-500 px-2">Role</DropdownMenuLabel>
          {options.roles.map((role) => (
            <DropdownMenuItem
              key={role.id}
              className="flex items-center justify-between cursor-pointer"
              onClick={() => onFilterChange("roles", role.id)}
            >
              {role.label}
              {selectedFilters.roles.includes(role.id) && (
                <Check className="h-4 w-4" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs text-gray-500 px-2">Grade</DropdownMenuLabel>
          {options.grades.map((grade) => (
            <DropdownMenuItem
              key={grade.id}
              className="flex items-center justify-between cursor-pointer"
              onClick={() => onFilterChange("grades", grade.id)}
            >
              {grade.label}
              {selectedFilters.grades.includes(grade.id) && (
                <Check className="h-4 w-4" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs text-gray-500 px-2">School</DropdownMenuLabel>
          {options.schools.map((school) => (
            <DropdownMenuItem
              key={school.id}
              className="flex items-center justify-between cursor-pointer"
              onClick={() => onFilterChange("schools", school.id)}
            >
              {school.label}
              {selectedFilters.schools.includes(school.id) && (
                <Check className="h-4 w-4" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs text-gray-500 px-2">Status</DropdownMenuLabel>
          {options.status.map((status) => (
            <DropdownMenuItem
              key={status.id}
              className="flex items-center justify-between cursor-pointer"
              onClick={() => onFilterChange("status", status.id)}
            >
              {status.label}
              {selectedFilters.status.includes(status.id) && (
                <Check className="h-4 w-4" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        <div className="p-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={onClearFilters}
          >
            Clear All Filters
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserFilterDropdown;
