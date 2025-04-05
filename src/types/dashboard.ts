
import { ReactNode } from "react";

export interface Subject {
  id: string;
  name: string;
  icon: ReactNode;
  progress: number;
  color: string;
  chaptersCount: number;
}

export interface Chapter {
  title: string;
  description: string;
  status: "completed" | "in-progress" | "locked";
  duration: string;
  quiz?: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
}

export interface Quiz {
  title: string;
  subject: string;
  date: string;
  time: string;
  subjectColor: string;
  isUpcoming: boolean;
}

// Adding new types for the dashboard statistics
export interface StudentProgress {
  subject: string;
  progress: number;
}

export interface LearningStats {
  completedLessons: number;
  avgQuizScore: number;
  lastActivity: string;
  timeSpent?: string;
  strongSubjects?: string[];
  weakSubjects?: string[];
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

// Ensure the Student interface is properly defined
export interface Student {
  id: string;
  name: string;
  email: string;
  grade: number;
  section: string;
  attendance: number;
  performance: string;
  teacher: string;
  lastActive: string;
  subjectProgress?: StudentProgress[];
  learningStats: LearningStats;
  status?: "active" | "inactive" | "pending";
}
