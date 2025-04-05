
// Define Student type that's compatible with what StudentTable expects
export type Student = {
  id: string;
  name: string;
  email: string;
  grade: number;
  section: string;
  schoolId: string;
  guardianName: string;
  guardianContact: string;
  dateOfBirth: string;
  address: string;
  enrollmentDate: string;
  attendance: number;
  performance: string;
  lastActive: string;
  teacher: string;
  status: "active" | "inactive" | "pending";
  learningStats: {
    completedLessons: number;
    avgQuizScore: number;
    timeSpent: string;
    strongSubjects: string[];
    weakSubjects: string[];
  };
  // Add the subjectProgress property to the Student type
  subjectProgress?: {
    subject: string;
    progress: number;
  }[];
};

// This file contains mock student data for 3 students (1 per school)
// Each student has a realistic profile with educational details

export const MOCK_STUDENTS: Student[] = [
  // School 1 Student
  {
    id: "s1",
    name: "Aarav Sharma",
    email: "aarav.s@student.apvidya.edu",
    grade: 7,
    section: "A",
    schoolId: "sch1",
    guardianName: "Rajesh Sharma",
    guardianContact: "+91-9876543111",
    dateOfBirth: "2012-05-15",
    address: "12-3-456, Begumpet, Hyderabad",
    enrollmentDate: "2019-06-10",
    attendance: 92,
    performance: "Excellent",
    lastActive: "2023-04-02",
    teacher: "Mrs. Ananya Sharma",
    status: "active",
    learningStats: {
      completedLessons: 145,
      avgQuizScore: 87,
      timeSpent: "120 hours",
      strongSubjects: ["Mathematics", "Science"],
      weakSubjects: ["Hindi"]
    },
    subjectProgress: [
      { subject: "Mathematics", progress: 92 },
      { subject: "Science", progress: 88 },
      { subject: "English", progress: 75 },
      { subject: "Hindi", progress: 65 },
      { subject: "Social Studies", progress: 78 }
    ]
  },
  
  // School 2 Student
  {
    id: "s11",
    name: "Aditya Rajan",
    email: "aditya.r@student.apvidya.edu",
    grade: 7,
    section: "A",
    schoolId: "sch2",
    guardianName: "Mahesh Rajan",
    guardianContact: "+91-8765432101",
    dateOfBirth: "2012-06-22",
    address: "24, Gandhi Street, T Nagar, Chennai",
    enrollmentDate: "2019-05-20",
    attendance: 91,
    performance: "Good",
    lastActive: "2023-04-02",
    teacher: "Mr. Arjun Patel",
    status: "active",
    learningStats: {
      completedLessons: 148,
      avgQuizScore: 86,
      timeSpent: "122 hours",
      strongSubjects: ["Science", "Tamil"],
      weakSubjects: ["Mathematics"]
    },
    subjectProgress: [
      { subject: "Mathematics", progress: 72 },
      { subject: "Science", progress: 85 },
      { subject: "English", progress: 78 },
      { subject: "Hindi", progress: 60 },
      { subject: "Social Studies", progress: 88 }
    ]
  },
  
  // School 3 Student
  {
    id: "s21",
    name: "Aryan Sharma",
    email: "aryan.s@student.apvidya.edu",
    grade: 7,
    section: "A",
    schoolId: "sch3",
    guardianName: "Amit Sharma",
    guardianContact: "+91-7654321098",
    dateOfBirth: "2012-08-17",
    address: "A-14, Vasant Vihar, New Delhi",
    enrollmentDate: "2019-04-10",
    attendance: 92,
    performance: "Good",
    lastActive: "2023-04-02",
    teacher: "Dr. Ravi Verma",
    status: "active",
    learningStats: {
      completedLessons: 146,
      avgQuizScore: 88,
      timeSpent: "122 hours",
      strongSubjects: ["Hindi", "Mathematics"],
      weakSubjects: ["English"]
    },
    subjectProgress: [
      { subject: "Mathematics", progress: 85 },
      { subject: "Science", progress: 70 },
      { subject: "English", progress: 75 },
      { subject: "Hindi", progress: 90 },
      { subject: "Social Studies", progress: 82 }
    ]
  }
];
