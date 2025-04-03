
import React, { useState } from "react";
import { MoreHorizontal, Trash2, Mail, UserPlus, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

interface UserBulkActionsProps {
  selectedCount: number;
  onClearSelection: () => void;
  onExportSelected: () => void;
  onDeleteSelected: () => void;
  onEmailSelected: () => void;
  onAssignSelected: () => void;
}

const UserBulkActions = ({
  selectedCount,
  onClearSelection,
  onExportSelected,
  onDeleteSelected,
  onEmailSelected,
  onAssignSelected,
}: UserBulkActionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  if (selectedCount === 0) return null;
  
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-blue-50 border-b border-blue-100 animate-fade-in">
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-600 hover:text-blue-800 p-1"
          onClick={onClearSelection}
        >
          <X className="h-4 w-4 mr-1" />
        </Button>
        <span className="text-sm font-medium text-blue-600">
          {selectedCount} user{selectedCount !== 1 ? "s" : ""} selected
        </span>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="hidden sm:flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="text-blue-600 border-blue-200 hover:bg-blue-100"
            onClick={onEmailSelected}
          >
            <Mail className="h-4 w-4 mr-1" /> Email
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-blue-600 border-blue-200 hover:bg-blue-100"
            onClick={onAssignSelected}
          >
            <UserPlus className="h-4 w-4 mr-1" /> Assign
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-blue-600 border-blue-200 hover:bg-blue-100"
            onClick={onExportSelected}
          >
            <Download className="h-4 w-4 mr-1" /> Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 border-red-200 hover:bg-red-50"
            onClick={onDeleteSelected}
          >
            <Trash2 className="h-4 w-4 mr-1" /> Delete
          </Button>
        </div>
        
        <div className="sm:hidden">
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Bulk Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onEmailSelected}>
                <Mail className="h-4 w-4 mr-2" /> Email Selected
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onAssignSelected}>
                <UserPlus className="h-4 w-4 mr-2" /> Assign Selected
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onExportSelected}>
                <Download className="h-4 w-4 mr-2" /> Export Selected
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-600"
                onClick={onDeleteSelected}
              >
                <Trash2 className="h-4 w-4 mr-2" /> Delete Selected
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default UserBulkActions;
