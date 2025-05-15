import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import FractionsQuiz from './FractionsQuiz';

interface Topic {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  concepts: string[];
  examples: string[];
  hasQuiz?: boolean;
}

const mathTopics: Topic[] = [
  {
    id: 'fractions',
    title: 'Fractions',
    description: 'Master fractions, their operations, and applications',
    difficulty: 'Intermediate',
    concepts: [
      'Types of fractions',
      'Equivalent fractions',
      'Addition and subtraction of fractions',
      'Multiplication and division of fractions',
      'Converting between fractions, decimals, and percentages'
    ],
    examples: [
      'Finding equivalent fractions',
      'Adding fractions with different denominators',
      'Multiplying proper and improper fractions',
      'Solving word problems involving fractions'
    ],
    hasQuiz: true
  },
  {
    id: 'algebra',
    title: 'Algebra',
    description: 'Learn about algebraic expressions, equations, and their applications',
    difficulty: 'Intermediate',
    concepts: [
      'Linear equations',
      'Polynomials',
      'Factorization',
      'Quadratic expressions'
    ],
    examples: [
      'Solving equations like 2x + 3 = 11',
      'Factoring x² + 5x + 6',
      'Real-life applications of linear equations'
    ]
  },
  {
    id: 'geometry',
    title: 'Geometry',
    description: 'Explore shapes, angles, and spatial relationships',
    difficulty: 'Intermediate',
    concepts: [
      'Understanding quadrilaterals',
      'Circle properties',
      'Area and perimeter',
      'Theorems and proofs'
    ],
    examples: [
      'Properties of parallelograms',
      'Finding the area of composite shapes',
      'Applying Pythagoras theorem'
    ]
  },
  {
    id: 'data-handling',
    title: 'Data Handling',
    description: 'Learn to collect, organize, and analyze data',
    difficulty: 'Beginner',
    concepts: [
      'Data collection methods',
      'Frequency distribution',
      'Measures of central tendency',
      'Graphical representation'
    ],
    examples: [
      'Creating bar graphs and histograms',
      'Calculating mean, median, and mode',
      'Interpreting pie charts'
    ]
  }
];

const MathsPAL: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    setShowQuiz(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">8th Grade Mathematics - PAL Module</h1>
      
      <Tabs defaultValue="topics" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="topics">Topics</TabsTrigger>
          <TabsTrigger value="study-groups">Study Groups</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="topics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mathTopics.map((topic) => (
              <Card key={topic.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{topic.title}</CardTitle>
                  <CardDescription>{topic.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className={`inline-block px-2 py-1 rounded text-sm ${
                      topic.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                      topic.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {topic.difficulty}
                    </span>
                  </div>
                  <Button 
                    onClick={() => handleTopicSelect(topic)}
                    variant="outline"
                    className="w-full"
                  >
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="study-groups">
          <Card>
            <CardHeader>
              <CardTitle>Study Groups</CardTitle>
              <CardDescription>Join or create study groups for collaborative learning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full">Create New Study Group</Button>
                <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                  {/* Study groups will be implemented here */}
                  <p className="text-muted-foreground">No active study groups yet. Be the first to create one!</p>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Learning Resources</CardTitle>
              <CardDescription>Access additional learning materials and practice exercises</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                <div className="space-y-4">
                  <h3 className="font-semibold">Video Tutorials</h3>
                  <p className="text-muted-foreground">Coming soon...</p>
                  
                  <h3 className="font-semibold mt-6">Practice Worksheets</h3>
                  <p className="text-muted-foreground">Coming soon...</p>
                  
                  <h3 className="font-semibold mt-6">Interactive Exercises</h3>
                  <p className="text-muted-foreground">Coming soon...</p>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedTopic && !showQuiz && (
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{selectedTopic.title} - Learning Path</CardTitle>
              <CardDescription>Master these concepts at your own pace</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Key Concepts</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {selectedTopic.concepts.map((concept, index) => (
                      <li key={index}>{concept}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Examples and Practice</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {selectedTopic.examples.map((example, index) => (
                      <li key={index}>{example}</li>
                    ))}
                  </ul>
                </div>

                {selectedTopic.hasQuiz && (
                  <div className="mt-6">
                    <Button 
                      onClick={() => setShowQuiz(true)}
                      className="w-full"
                    >
                      Take Practice Quiz
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showQuiz && selectedTopic?.id === 'fractions' && (
        <div className="mt-6">
          <div className="mb-4">
            <Button 
              variant="outline" 
              onClick={() => setShowQuiz(false)}
            >
              ← Back to Topic
            </Button>
          </div>
          <FractionsQuiz />
        </div>
      )}
    </div>
  );
};

export default MathsPAL; 