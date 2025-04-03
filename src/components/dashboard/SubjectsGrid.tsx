
import React from "react";
import SubjectCard from "@/components/SubjectCard";
import { Subject } from "@/types/dashboard";

interface SubjectsGridProps {
  subjects: Subject[];
}

const SubjectsGrid = ({ subjects }: SubjectsGridProps) => {
  return (
    <>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Subjects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            id={subject.id}
            name={subject.name}
            icon={subject.icon}
            progress={subject.progress}
            color={subject.color}
            chaptersCount={subject.chaptersCount}
          />
        ))}
      </div>
    </>
  );
};

export default SubjectsGrid;
