
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import GradeCard from "@/components/GradeCard";
import { Book } from "lucide-react";

const stateGradeData = [
  {
    grade: 6,
    title: "6th Standard",
    description: "Begin your middle school journey with essential foundations.",
    color: "blue",
  },
  {
    grade: 7,
    title: "7th Standard",
    description: "Build on your knowledge with more advanced concepts.",
    color: "green",
  },
  {
    grade: 8,
    title: "8th Standard",
    description: "Deepen your understanding with complex topics.",
    color: "yellow",
  },
  {
    grade: 9,
    title: "9th Standard",
    description: "Prepare for high school with critical thinking skills.",
    color: "orange",
  },
  {
    grade: 10,
    title: "10th Standard",
    description: "Get ready for board exams with comprehensive study materials.",
    color: "red",
  },
];

const cbseGradeData = [
  {
    grade: 6,
    title: "6th Standard CBSE",
    description: "CBSE curriculum with focus on conceptual understanding.",
    color: "blue",
  },
  {
    grade: 7,
    title: "7th Standard CBSE",
    description: "CBSE approach to strengthen foundational knowledge.",
    color: "green",
  },
  {
    grade: 8,
    title: "8th Standard CBSE",
    description: "CBSE syllabus with emphasis on analytical thinking.",
    color: "yellow",
  },
  {
    grade: 9,
    title: "9th Standard CBSE",
    description: "CBSE curriculum to prepare for board examination patterns.",
    color: "orange",
  },
  {
    grade: 10,
    title: "10th Standard CBSE",
    description: "Comprehensive CBSE board exam preparation materials.",
    color: "red",
  },
];

const GradeSelectorSection = () => {
  const [currentSyllabus, setCurrentSyllabus] = useState<"state" | "cbse">("state");

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Choose Your Grade</h2>
          <p className="mt-4 text-gray-600">Select your grade to access curriculum-aligned learning materials</p>
        </div>
        
        <div className="flex justify-center mb-8">
          <Tabs 
            defaultValue="state" 
            value={currentSyllabus}
            onValueChange={(value) => setCurrentSyllabus(value as "state" | "cbse")}
            className="w-full max-w-md"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="state" className="text-md">State Syllabus</TabsTrigger>
              <TabsTrigger value="cbse" className="text-md">CBSE</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentSyllabus === "state" ? (
            stateGradeData.map((grade) => (
              <GradeCard
                key={`state-${grade.grade}`}
                grade={grade.grade}
                title={grade.title}
                description={grade.description}
                color={grade.color}
                icon={<Book className="h-5 w-5" />}
              />
            ))
          ) : (
            cbseGradeData.map((grade) => (
              <GradeCard
                key={`cbse-${grade.grade}`}
                grade={grade.grade}
                title={grade.title}
                description={grade.description}
                color={grade.color}
                icon={<Book className="h-5 w-5" />}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default GradeSelectorSection;
