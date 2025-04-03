
import React from "react";

interface DashboardHeaderProps {
  currentGrade: number;
  setCurrentGrade: (grade: number) => void;
}

const DashboardHeader = ({ currentGrade, setCurrentGrade }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Class {currentGrade} Dashboard
        </h1>
        <p className="text-gray-600 mt-1">Welcome back! Continue your learning journey</p>
      </div>
      
      <div className="mt-4 sm:mt-0">
        <select 
          className="bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-ap-blue focus:border-transparent"
          value={currentGrade}
          onChange={(e) => setCurrentGrade(parseInt(e.target.value))}
        >
          <option value={6}>6th Grade</option>
          <option value={7}>7th Grade</option>
          <option value={8}>8th Grade</option>
          <option value={9}>9th Grade</option>
          <option value={10}>10th Grade</option>
        </select>
      </div>
    </div>
  );
};

export default DashboardHeader;
