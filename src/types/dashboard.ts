
// Dashboard types
export interface Subject {
  id: string;
  name: string;
  icon: React.ReactNode;
  progress: number;
  color: string;
  chaptersCount: number;
}

export interface Chapter {
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'locked';
  duration: string;
}

export interface Quiz {
  title: string;
  subject: string;
  date: string;
  time: string;
  subjectColor: string;
  isUpcoming: boolean;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  grade: number;
  section: string;
  teacher: string;
  performance: string;
  attendance: number;
  lastActive: string;
  learningStats: LearningStats;
  subjectProgress?: StudentProgress[];
}

export interface StudentProgress {
  subject: string;
  progress: number;
}

export interface LearningStats {
  completedLessons: number;
  avgQuizScore: number;
  timeSpent: string;
  strongSubjects: string[];
  weakSubjects: string[];
  lastActivity?: string;
}

export interface SchoolPerformance {
  name: string;
  performance: number;
}

export interface GradeDistribution {
  grade: string;
  students: number;
}

export interface PerformanceData {
  name: string;
  value: number;
}

export interface AttendanceRange {
  name: string;
  value: number;
}
