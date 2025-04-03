
import React from "react";
import ProgressBar from "@/components/ProgressBar";
import { Subject } from "@/types/dashboard";

interface ProgressOverviewProps {
  subjects: Subject[];
  overallProgress: number;
}

const ProgressOverview = ({ subjects, overallProgress }: ProgressOverviewProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-lg font-semibold">Overall Progress</h2>
        <div className="text-sm text-gray-500">Academic Year 2023-24</div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
        <div className="w-full sm:w-2/3">
          <ProgressBar progress={overallProgress} color="blue" size="lg" />
          <div className="grid grid-cols-3 mt-6 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-ap-blue font-semibold text-xl">{subjects.length}</div>
              <div className="text-xs text-gray-500 mt-1">Subjects</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-ap-green font-semibold text-xl">24</div>
              <div className="text-xs text-gray-500 mt-1">Chapters</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <div className="text-ap-orange font-semibold text-xl">12</div>
              <div className="text-xs text-gray-500 mt-1">Quizzes</div>
            </div>
          </div>
        </div>
        
        <div className="w-full sm:w-1/3 mt-4 sm:mt-0 flex flex-col justify-center">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Recent Activity</h3>
          <ul className="space-y-2">
            <li className="text-sm flex justify-between">
              <span className="text-gray-600">Mathematics Quiz</span>
              <span className="text-ap-blue font-medium">85%</span>
            </li>
            <li className="text-sm flex justify-between">
              <span className="text-gray-600">Science Chapter 4</span>
              <span className="text-ap-green font-medium">Completed</span>
            </li>
            <li className="text-sm flex justify-between">
              <span className="text-gray-600">Telugu Assignment</span>
              <span className="text-ap-yellow font-medium">Pending</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProgressOverview;
