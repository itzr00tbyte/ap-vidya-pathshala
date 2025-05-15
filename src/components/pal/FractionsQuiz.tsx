import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SubjectButton } from '@/components/ui/subject-button';
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// All possible questions across different difficulty levels
const allQuestions: QuizQuestion[] = [
  // Easy Questions
  {
    id: 1,
    question: "What is 1/2 + 1/4?",
    options: ["3/4", "2/6", "1/6", "2/4"],
    correctAnswer: "3/4",
    explanation: "To add fractions with different denominators, we need to find a common denominator. Here, 4 is the common denominator. Converting 1/2 to 2/4, then adding 1/4 gives us 2/4 + 1/4 = 3/4.",
    difficulty: 'easy'
  },
  {
    id: 2,
    question: "Which fraction is equivalent to 2/3?",
    options: ["4/6", "3/4", "4/8", "3/5"],
    correctAnswer: "4/6",
    explanation: "To find equivalent fractions, we multiply both numerator and denominator by the same number. Here, multiplying 2/3 by 2/2 gives us (2×2)/(3×2) = 4/6.",
    difficulty: 'easy'
  },
  {
    id: 3,
    question: "What is a proper fraction?",
    options: ["Numerator equals denominator", "Numerator smaller than denominator", "Numerator larger than denominator", "Denominator is zero"],
    correctAnswer: "Numerator smaller than denominator",
    explanation: "A proper fraction has a numerator that is smaller than the denominator, which means the fraction represents a value less than 1. Examples include 1/2, 3/4, and 5/8.",
    difficulty: 'easy'
  },
  {
    id: 4,
    question: "Simplify: 8/12",
    options: ["2/3", "4/6", "2/4", "3/4"],
    correctAnswer: "2/3",
    explanation: "To simplify a fraction, divide both the numerator and denominator by their greatest common factor (GCF). The GCF of 8 and 12 is 4. Dividing both by 4 gives us 8÷4 / 12÷4 = 2/3.",
    difficulty: 'easy'
  },
  // Medium Questions
  {
    id: 5,
    question: "Solve: (2/5) × (3/4)",
    options: ["6/20", "5/9", "3/10", "6/9"],
    correctAnswer: "6/20",
    explanation: "When multiplying fractions, multiply the numerators together and denominators together: (2×3)/(5×4) = 6/20. This can be simplified to 3/10 by dividing both by the common factor 2.",
    difficulty: 'medium'
  },
  {
    id: 6,
    question: "Add: 2/5 + 1/3",
    options: ["3/8", "3/15", "11/15", "5/8"],
    correctAnswer: "11/15",
    explanation: "To add fractions with different denominators, we need to find a common denominator. LCD of 5 and 3 is 15. Convert 2/5 = 6/15 and 1/3 = 5/15. Then add: 6/15 + 5/15 = 11/15.",
    difficulty: 'medium'
  },
  {
    id: 7,
    question: "Subtract: 7/8 - 1/4",
    options: ["6/8", "5/8", "3/4", "1/2"],
    correctAnswer: "5/8",
    explanation: "To subtract fractions with different denominators, find a common denominator. 1/4 = 2/8 in terms of the common denominator 8. Then subtract: 7/8 - 2/8 = 5/8.",
    difficulty: 'medium'
  },
  {
    id: 8,
    question: "Which is larger: 4/5 or 7/9?",
    options: ["4/5", "7/9", "They are equal", "Cannot be determined"],
    correctAnswer: "4/5",
    explanation: "To compare fractions, convert them to equivalent fractions with a common denominator. LCD of 5 and 9 is 45. 4/5 = 36/45 and 7/9 = 35/45. Since 36/45 > 35/45, 4/5 is larger than 7/9.",
    difficulty: 'medium'
  },
  // Hard Questions
  {
    id: 9,
    question: "Divide: (5/6) ÷ (2/3)",
    options: ["10/18", "15/12", "5/4", "3/4"],
    correctAnswer: "5/4",
    explanation: "To divide by a fraction, multiply by its reciprocal. (5/6) ÷ (2/3) = (5/6) × (3/2) = (5×3)/(6×2) = 15/12 = 5/4 (simplified).",
    difficulty: 'hard'
  },
  {
    id: 10,
    question: "Solve: (3/4) - (1/2) × (2/3)",
    options: ["1/4", "1/3", "1/2", "7/12"],
    correctAnswer: "7/12",
    explanation: "Follow the order of operations. First, multiply: (1/2) × (2/3) = 2/6 = 1/3. Then subtract: 3/4 - 1/3. Find the common denominator: 3/4 = 9/12 and 1/3 = 4/12. Subtract: 9/12 - 4/12 = 5/12.",
    difficulty: 'hard'
  },
  {
    id: 11,
    question: "If you divide a pizza into 8 equal slices and eat 3 slices, what fraction of the pizza remains?",
    options: ["3/8", "5/8", "3/5", "5/3"],
    correctAnswer: "5/8",
    explanation: "If you eat 3 out of 8 slices, then 3/8 of the pizza is eaten. To find what remains, subtract from 1 whole: 1 - 3/8 = 8/8 - 3/8 = 5/8.",
    difficulty: 'hard'
  },
  {
    id: 12,
    question: "Solve: (2/3)² + (1/4)",
    options: ["4/9 + 1/4", "17/36", "13/36", "4/7"],
    correctAnswer: "17/36",
    explanation: "First, calculate (2/3)² = (2/3) × (2/3) = 4/9. Then add: 4/9 + 1/4. Find a common denominator: 4/9 = 16/36 and 1/4 = 9/36. Add: 16/36 + 9/36 = 25/36.",
    difficulty: 'hard'
  }
];

// Function to shuffle an array
const shuffleArray = (array: any[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Function to select questions based on user performance
const selectQuestionsBasedOnPerformance = (
  userScore: number,
  questionsAnswered: number,
  previousDifficulty: string | null
): QuizQuestion[] => {
  const totalQuestionsToShow = 5;
  
  let targetDifficulty: 'easy' | 'medium' | 'hard';
  
  // Initial question is medium
  if (questionsAnswered === 0) {
    targetDifficulty = 'medium';
  } 
  // After first question, determine difficulty based on whether they got it right
  else if (questionsAnswered === 1) {
    targetDifficulty = userScore === 1 ? 'medium' : 'easy';
  }
  // For subsequent questions, use a more sophisticated algorithm
  else {
    const performanceRate = userScore / questionsAnswered;
    
    if (performanceRate >= 0.8) {
      targetDifficulty = 'hard';
    } else if (performanceRate >= 0.5) {
      targetDifficulty = 'medium';
    } else {
      targetDifficulty = 'easy';
    }
    
    // Avoid sudden jumps - only move one level at a time
    if (previousDifficulty === 'easy' && targetDifficulty === 'hard') {
      targetDifficulty = 'medium';
    } else if (previousDifficulty === 'hard' && targetDifficulty === 'easy') {
      targetDifficulty = 'medium';
    }
  }
  
  // Filter questions by the target difficulty and shuffle them
  const questionsForDifficulty = shuffleArray(
    allQuestions.filter(q => q.difficulty === targetDifficulty)
  );
  
  // If we don't have enough questions at this difficulty, add some from adjacent difficulties
  if (questionsForDifficulty.length < totalQuestionsToShow) {
    let additionalQuestions: QuizQuestion[] = [];
    
    if (targetDifficulty === 'easy') {
      additionalQuestions = allQuestions.filter(q => q.difficulty === 'medium');
    } else if (targetDifficulty === 'hard') {
      additionalQuestions = allQuestions.filter(q => q.difficulty === 'medium');
    } else {
      const easyQuestions = allQuestions.filter(q => q.difficulty === 'easy');
      const hardQuestions = allQuestions.filter(q => q.difficulty === 'hard');
      additionalQuestions = [...easyQuestions, ...hardQuestions];
    }
    
    additionalQuestions = shuffleArray(additionalQuestions);
    
    return [...questionsForDifficulty, ...additionalQuestions].slice(0, totalQuestionsToShow);
  }
  
  return questionsForDifficulty.slice(0, totalQuestionsToShow);
};

const FractionsQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentDifficulty, setCurrentDifficulty] = useState<string | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Initialize quiz with questions based on medium difficulty
  useEffect(() => {
    const initialQuestions = selectQuestionsBasedOnPerformance(0, 0, null);
    setQuestions(initialQuestions);
    setCurrentDifficulty('medium');
  }, []);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === questions[currentQuestionIndex].correctAnswer;
    setIsAnswerCorrect(correct);
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    // Update current difficulty based on current question's difficulty
    setCurrentDifficulty(questions[currentQuestionIndex].difficulty);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    // Reset all state
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
    
    // Generate new questions based on starting at medium difficulty
    const newQuestions = selectQuestionsBasedOnPerformance(0, 0, null);
    setQuestions(newQuestions);
    setCurrentDifficulty('medium');
  };

  // When moving to next question, adaptively pick the next set of questions
  useEffect(() => {
    if (currentQuestionIndex > 0 && !quizCompleted) {
      const updatedQuestions = [...questions];
      
      // Get next questions based on current performance
      const nextQuestions = selectQuestionsBasedOnPerformance(
        score, 
        currentQuestionIndex,
        currentDifficulty as 'easy' | 'medium' | 'hard'
      );
      
      // Keep the questions we've already seen, replace upcoming ones
      for (let i = currentQuestionIndex; i < Math.min(updatedQuestions.length, nextQuestions.length + currentQuestionIndex); i++) {
        if (i < updatedQuestions.length) {
          updatedQuestions[i] = nextQuestions[i - currentQuestionIndex];
        } else {
          updatedQuestions.push(nextQuestions[i - currentQuestionIndex]);
        }
      }
      
      setQuestions(updatedQuestions);
    }
  }, [currentQuestionIndex]);

  if (questions.length === 0) {
    return <div className="p-8 text-center">Loading questions...</div>;
  }

  if (quizCompleted) {
    const performancePercentage = (score / questions.length) * 100;
    let feedbackMessage = "";
    let nextStepMessage = "";
    
    if (performancePercentage >= 80) {
      feedbackMessage = "Excellent work! You've mastered fractions.";
      nextStepMessage = "You're ready to move on to more advanced topics like decimals and percentages.";
    } else if (performancePercentage >= 60) {
      feedbackMessage = "Good job! You understand most fraction concepts.";
      nextStepMessage = "Review the explanations for the questions you missed to strengthen your understanding.";
    } else {
      feedbackMessage = "You're making progress with fractions.";
      nextStepMessage = "Consider revisiting the basic concepts and practice with more examples before trying again.";
    }
    
    return (
      <Card className="border-2 border-ap-green/30 shadow-md bg-white">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Quiz Completed!</CardTitle>
          <CardDescription className="text-base font-medium">
            Your score: {score} out of {questions.length} ({performancePercentage.toFixed(0)}%)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
            <p className="text-lg font-medium text-gray-900 mb-2">
              {feedbackMessage}
            </p>
            <p className="text-gray-700">
              {nextStepMessage}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <SubjectButton 
              subjectColor="green" 
              variant="default" 
              onClick={restartQuiz}
              className="flex-1 font-medium"
            >
              Try Again
            </SubjectButton>
            
            <SubjectButton 
              subjectColor="purple" 
              variant="outline" 
              className="flex-1 font-medium border-2"
              onClick={() => window.location.href = '/fractions'}
            >
              Back to Fractions
            </SubjectButton>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Card className="border-2 border-ap-purple/30 shadow-md bg-white">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-gray-900">Fractions Quiz</CardTitle>
          <div className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
        </div>
        <div className="w-full bg-gray-100 h-2 rounded-full mt-2">
          <div 
            className="bg-ap-purple h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-lg font-medium text-gray-900 p-3 bg-gray-50 rounded-lg border border-gray-100">
          {currentQuestion.question}
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              variant={
                selectedAnswer === option 
                  ? isAnswerCorrect === true 
                    ? "default" 
                    : "destructive"
                  : "outline"
              }
              className={`w-full justify-start text-left font-medium ${
                selectedAnswer !== null && option === currentQuestion.correctAnswer
                  ? "border-2 border-green-500 bg-green-50 text-green-700 hover:bg-green-100"
                  : ""
              }`}
              onClick={() => selectedAnswer === null && handleAnswerSelect(option)}
              disabled={selectedAnswer !== null}
            >
              {selectedAnswer !== null && option === currentQuestion.correctAnswer && (
                <CheckCircle2 className="h-5 w-5 mr-2 text-green-600" />
              )}
              {selectedAnswer === option && !isAnswerCorrect && (
                <XCircle className="h-5 w-5 mr-2 text-red-500" />
              )}
              {option}
            </Button>
          ))}
        </div>
        
        {selectedAnswer && (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg border ${
              isAnswerCorrect 
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}>
              <div className="flex items-start gap-2">
                {isAnswerCorrect 
                  ? <CheckCircle2 className="h-5 w-5 mt-0.5 text-green-600" />
                  : <XCircle className="h-5 w-5 mt-0.5 text-red-500" />
                }
                <div>
                  <p className="font-semibold">
                    {isAnswerCorrect ? "Correct!" : "Not quite right."}
                  </p>
                  <p className="text-sm mt-1">
                    {isAnswerCorrect 
                      ? "Great job! You selected the right answer."
                      : `The correct answer is "${currentQuestion.correctAnswer}".`
                    }
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                onClick={() => setShowExplanation(!showExplanation)}
                variant="outline"
                className="w-full"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                {showExplanation ? "Hide" : "Show"} Explanation
              </Button>
            </div>
            
            {showExplanation && (
              <Card className="bg-blue-50 border border-blue-200">
                <CardContent className="pt-4">
                  <p className="text-blue-900">{currentQuestion.explanation}</p>
                </CardContent>
              </Card>
            )}
            
            <Button 
              onClick={handleNextQuestion}
              className="w-full bg-ap-purple hover:bg-ap-purple/90 text-white font-medium"
            >
              {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FractionsQuiz; 