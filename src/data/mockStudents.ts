
export type Student = {
  id: string;
  name: string;
  email: string;
  grade: number;
  section: string;
  attendance: number;
  performance: string;
  lastActive: string;
  teacher: string;
  learningStats: {
    completedLessons: number;
    avgQuizScore: number;
    timeSpent: string;
    strongSubjects: string[];
    weakSubjects: string[];
  }
};

// Extended mock student data with learning stats
export const MOCK_STUDENTS: Student[] = [
  {
    id: "1",
    name: "Aarav Patel",
    email: "aarav@example.com",
    grade: 8,
    section: "A",
    attendance: 92,
    performance: "Excellent",
    lastActive: "2023-04-01",
    teacher: "Teacher User",
    learningStats: {
      completedLessons: 24,
      avgQuizScore: 85,
      timeSpent: "14h 30m",
      strongSubjects: ["Mathematics", "Science"],
      weakSubjects: ["History"]
    }
  },
  {
    id: "2",
    name: "Diya Sharma",
    email: "diya@example.com",
    grade: 8,
    section: "B",
    attendance: 88,
    performance: "Good",
    lastActive: "2023-04-02",
    teacher: "Another Teacher",
    learningStats: {
      completedLessons: 20,
      avgQuizScore: 78,
      timeSpent: "12h 15m",
      strongSubjects: ["Languages", "Art"],
      weakSubjects: ["Science", "Mathematics"]
    }
  },
  {
    id: "3",
    name: "Arjun Singh",
    email: "arjun@example.com",
    grade: 9,
    section: "A",
    attendance: 95,
    performance: "Excellent",
    lastActive: "2023-04-01",
    teacher: "Teacher User",
    learningStats: {
      completedLessons: 28,
      avgQuizScore: 92,
      timeSpent: "16h 45m",
      strongSubjects: ["Mathematics", "Science", "Computer Science"],
      weakSubjects: []
    }
  },
  {
    id: "4",
    name: "Ananya Reddy",
    email: "ananya@example.com",
    grade: 7,
    section: "C",
    attendance: 78,
    performance: "Average",
    lastActive: "2023-03-28",
    teacher: "Another Teacher",
    learningStats: {
      completedLessons: 18,
      avgQuizScore: 68,
      timeSpent: "10h 20m",
      strongSubjects: ["Art", "Physical Education"],
      weakSubjects: ["Mathematics", "Science"]
    }
  },
  {
    id: "5",
    name: "Vikram Nair",
    email: "vikram@example.com",
    grade: 10,
    section: "A",
    attendance: 91,
    performance: "Good",
    lastActive: "2023-04-02",
    teacher: "Teacher User",
    learningStats: {
      completedLessons: 26,
      avgQuizScore: 82,
      timeSpent: "15h 10m",
      strongSubjects: ["History", "Geography"],
      weakSubjects: ["Mathematics"]
    }
  }
];
