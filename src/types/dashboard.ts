
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
}

export interface Quiz {
  title: string;
  subject: string;
  date: string;
  time: string;
  subjectColor: string;
  isUpcoming: boolean;
}
