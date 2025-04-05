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

// This file contains mock student data for 30 students (10 per school)
// Each student has a realistic profile with educational details

export const MOCK_STUDENTS: Student[] = [
  // School 1 Students (10 students)
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
    status: "active", // Added status
    learningStats: {
      completedLessons: 145,
      avgQuizScore: 87,
      timeSpent: "120 hours",
      strongSubjects: ["Mathematics", "Science"],
      weakSubjects: ["Hindi"]
    },
    // Add subject progress data
    subjectProgress: [
      { subject: "Mathematics", progress: 92 },
      { subject: "Science", progress: 88 },
      { subject: "English", progress: 75 },
      { subject: "Hindi", progress: 65 },
      { subject: "Social Studies", progress: 78 }
    ]
  },
  {
    id: "s2",
    name: "Ananya Reddy",
    email: "ananya.r@student.apvidya.edu",
    grade: 8,
    section: "B",
    schoolId: "sch1",
    guardianName: "Priya Reddy",
    guardianContact: "+91-9876543112",
    dateOfBirth: "2011-07-22",
    address: "8-2-293, Banjara Hills, Hyderabad",
    enrollmentDate: "2018-06-12",
    attendance: 95,
    performance: "Excellent",
    lastActive: "2023-04-02",
    teacher: "Mr. Vikram Singh",
    status: "active", // Added status
    learningStats: {
      completedLessons: 168,
      avgQuizScore: 92,
      timeSpent: "135 hours",
      strongSubjects: ["Science", "Social Studies"],
      weakSubjects: []
    },
    // Add subject progress data
    subjectProgress: [
      { subject: "Mathematics", progress: 85 },
      { subject: "Science", progress: 95 },
      { subject: "English", progress: 82 },
      { subject: "Hindi", progress: 78 },
      { subject: "Social Studies", progress: 90 }
    ]
  },
  {
    id: "s3",
    name: "Vihaan Kumar",
    email: "vihaan.k@student.apvidya.edu",
    grade: 6,
    section: "A",
    schoolId: "sch1",
    guardianName: "Anil Kumar",
    guardianContact: "+91-9876543113",
    dateOfBirth: "2013-03-10",
    address: "3-6-245, Himayatnagar, Hyderabad",
    enrollmentDate: "2020-06-15",
    attendance: 88,
    performance: "Good",
    lastActive: "2023-04-01",
    teacher: "Mrs. Ananya Sharma",
    status: "pending", // Added status
    learningStats: {
      completedLessons: 120,
      avgQuizScore: 78,
      timeSpent: "95 hours",
      strongSubjects: ["English"],
      weakSubjects: ["Mathematics", "Science"]
    },
    // Add subject progress data
    subjectProgress: [
      { subject: "Mathematics", progress: 62 },
      { subject: "Science", progress: 65 },
      { subject: "English", progress: 80 },
      { subject: "Hindi", progress: 72 },
      { subject: "Social Studies", progress: 70 }
    ]
  },
  {
    id: "s4",
    name: "Ishaan Patel",
    email: "ishaan.p@student.apvidya.edu",
    grade: 9,
    section: "A",
    schoolId: "sch1",
    guardianName: "Rajiv Patel",
    guardianContact: "+91-9876543114",
    dateOfBirth: "2010-11-05",
    address: "5-9-22, Basheer Bagh, Hyderabad",
    enrollmentDate: "2017-06-08",
    attendance: 90,
    performance: "Good",
    lastActive: "2023-04-02",
    teacher: "Mr. Vikram Singh",
    status: "active",
    learningStats: {
      completedLessons: 182,
      avgQuizScore: 85,
      timeSpent: "150 hours",
      strongSubjects: ["Mathematics", "Physics"],
      weakSubjects: ["Hindi"]
    },
    subjectProgress: [
      { subject: "Mathematics", progress: 70 },
      { subject: "Science", progress: 80 },
      { subject: "English", progress: 75 },
      { subject: "Hindi", progress: 60 },
      { subject: "Social Studies", progress: 85 }
    ]
  },
  {
    id: "s5",
    name: "Saanvi Gupta",
    email: "saanvi.g@student.apvidya.edu",
    grade: 7,
    section: "B",
    schoolId: "sch1",
    guardianName: "Neha Gupta",
    guardianContact: "+91-9876543115",
    dateOfBirth: "2012-09-18",
    address: "10-3-156, Masab Tank, Hyderabad",
    enrollmentDate: "2019-06-10",
    attendance: 94,
    performance: "Excellent",
    lastActive: "2023-04-01",
    teacher: "Mrs. Priya Reddy",
    status: "active",
    learningStats: {
      completedLessons: 152,
      avgQuizScore: 89,
      timeSpent: "125 hours",
      strongSubjects: ["Science", "English"],
      weakSubjects: []
    },
    subjectProgress: [
      { subject: "Mathematics", progress: 82 },
      { subject: "Science", progress: 90 },
      { subject: "English", progress: 88 },
      { subject: "Hindi", progress: 70 },
      { subject: "Social Studies", progress: 80 }
    ]
  },
  {
    id: "s6",
    name: "Advait Singh",
    email: "advait.s@student.apvidya.edu",
    grade: 8,
    section: "A",
    schoolId: "sch1",
    guardianName: "Vikram Singh",
    guardianContact: "+91-9876543116",
    dateOfBirth: "2011-04-25",
    address: "7-1-397, Ameerpet, Hyderabad",
    enrollmentDate: "2018-06-11",
    attendance: 91,
    performance: "Good",
    lastActive: "2023-04-01",
    teacher: "Mrs. Priya Reddy",
    status: "active",
    learningStats: {
      completedLessons: 160,
      avgQuizScore: 86,
      timeSpent: "130 hours",
      strongSubjects: ["Social Studies", "Hindi"],
      weakSubjects: ["Mathematics"]
    },
    subjectProgress: [
      { subject: "Mathematics", progress: 68 },
      { subject: "Science", progress: 75 },
      { subject: "English", progress: 82 },
      { subject: "Hindi", progress: 90 },
      { subject: "Social Studies", progress: 85 }
    ]
  },
  {
    id: "s7",
    name: "Anika Joshi",
    email: "anika.j@student.apvidya.edu",
    grade: 6,
    section: "B",
    schoolId: "sch1",
    guardianName: "Vivek Joshi",
    guardianContact: "+91-9876543117",
    dateOfBirth: "2013-08-14",
    address: "12-7-20, Kukatpally, Hyderabad",
    enrollmentDate: "2020-06-15",
    attendance: 89,
    performance: "Good",
    lastActive: "2023-03-31",
    teacher: "Mrs. Ananya Sharma",
    status: "pending",
    learningStats: {
      completedLessons: 118,
      avgQuizScore: 81,
      timeSpent: "90 hours",
      strongSubjects: ["Art", "English"],
      weakSubjects: ["Science"]
    },
    subjectProgress: [
      { subject: "Mathematics", progress: 75 },
      { subject: "Science", progress: 62 },
      { subject: "English", progress: 88 },
      { subject: "Hindi", progress: 78 },
      { subject: "Social Studies", progress: 70 }
    ]
  },
  {
    id: "s8",
    name: "Arjun Malhotra",
    email: "arjun.m@student.apvidya.edu",
    grade: 9,
    section: "B",
    schoolId: "sch1",
    guardianName: "Aman Malhotra",
    guardianContact: "+91-9876543118",
    dateOfBirth: "2010-02-08",
    address: "8-3-168, Jubilee Hills, Hyderabad",
    enrollmentDate: "2017-06-08",
    attendance: 92,
    performance: "Good",
    lastActive: "2023-04-02",
    teacher: "Mr. Vikram Singh",
    status: "active",
    learningStats: {
      completedLessons: 180,
      avgQuizScore: 88,
      timeSpent: "145 hours",
      strongSubjects: ["Mathematics", "Computer Science"],
      weakSubjects: ["Hindi"]
    },
    subjectProgress: [
      { subject: "Mathematics", progress: 90 },
      { subject: "Science", progress: 72 },
      { subject: "English", progress: 80 },
      { subject: "Hindi", progress: 65 },
      { subject: "Social Studies", progress: 78 }
    ]
  },
  {
    id: "s9",
    name: "Pari Verma",
    email: "pari.v@student.apvidya.edu",
    grade: 7,
    section: "A",
    schoolId: "sch1",
    guardianName: "Shalini Verma",
    guardianContact: "+91-9876543119",
    dateOfBirth: "2012-12-03",
    address: "3-5-890, Narayanguda, Hyderabad",
    enrollmentDate: "2019-06-10",
    attendance: 96,
    performance: "Excellent",
    lastActive: "2023-04-01",
    teacher: "Mrs. Ananya Sharma",
    status: "active",
    learningStats: {
      completedLessons: 155,
      avgQuizScore: 90,
      timeSpent: "128 hours",
      strongSubjects: ["Science", "Mathematics"],
      weakSubjects: []
    },
    subjectProgress: [
      { subject: "Mathematics", progress: 95 },
      { subject: "Science", progress: 92 },
      { subject: "English", progress: 85 },
      { subject: "Hindi", progress: 70 },
      { subject: "Social Studies", progress: 88 }
    ]
  },
  {
    id: "s10",
    name: "Reyansh Kapoor",
    email: "reyansh.k@student.apvidya.edu",
    grade: 8,
    section: "A",
    schoolId: "sch1",
    guardianName: "Rohit Kapoor",
    guardianContact: "+91-9876543120",
    dateOfBirth: "2011-10-17",
    address: "5-8-123, Nampally, Hyderabad",
    enrollmentDate: "2018-06-11",
    attendance: 90,
    performance: "Good",
    lastActive: "2023-03-31",
    teacher: "Mrs. Priya Reddy",
    status: "active",
    learningStats: {
      completedLessons: 162,
      avgQuizScore: 84,
      timeSpent: "132 hours",
      strongSubjects: ["Social Studies"],
      weakSubjects: ["Science", "Mathematics"]
    },
    subjectProgress: [
      { subject: "Mathematics", progress: 65 },
      { subject: "Science", progress: 70 },
      { subject: "English", progress: 88 },
      { subject: "Hindi", progress: 82 },
      { subject: "Social Studies", progress: 90 }
    ]
  },
  
  // School 2 Students (10 students)
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
  {
    id: "s12",
    name: "Kavya Subramaniam",
    email: "kavya.s@student.apvidya.edu",
    grade: 8,
    section: "B",
    schoolId: "sch2",
    guardianName: "Ramesh Subramaniam",
    guardianContact: "+91-8765432102",
    dateOfBirth: "2011-09-15",
    address: "12, Poes Garden, Chennai",
    enrollmentDate: "2018-05-22",
    attendance: 94,
    performance: "Excellent",
    lastActive: "2023-04-02",
    teacher: "Ms. Meera Iyer",
    status: "active",
    learningStats: {
      completedLessons: 165,
      avgQuizScore: 91,
      timeSpent: "138 hours",
      strongSubjects: ["Mathematics", "English"],
      weakSubjects: []
    },
    subjectProgress: [
      { subject: "Mathematics", progress: 92 },
      { subject: "Science", progress: 80 },
      { subject: "English", progress: 90 },
      { subject: "Hindi", progress: 75 },
      { subject: "Social Studies", progress: 85 }
    ]
  },
  {
    id: "s13",
    name: "Vivaan Krishnan",
    email: "vivaan.k@student.apvidya.edu",
    grade: 6,
    section: "A",
    schoolId: "sch2",
    guardianName: "Karthik Krishnan",
    guardianContact: "+91-8765432103",
    dateOfBirth: "2013-04-28",
    address: "7, Lake View Road, Nungambakkam, Chennai",
    enrollmentDate: "2020-05-18",
    attendance: 87,
    performance: "Satisfactory",
    lastActive: "2023-03-31",
    teacher: "Mr. Arjun Patel",
    status: "pending",
    learningStats: {
      completedLessons: 115,
      avgQuizScore: 79,
      timeSpent: "92 hours",
      strongSubjects: ["Tamil"],
      weakSubjects: ["Mathematics", "English"]
    },
    subjectProgress: [
      { subject: "Mathematics", progress: 60 },
      { subject: "Science", progress: 70 },
      { subject: "English", progress: 65 },
      { subject: "Hindi", progress: 80 },
      { subject: "Social Studies", progress: 72 }
    ]
  },
  {
    id: "s14",
    name: "Dhruv Iyer",
    email: "dhruv.i@student.apvidya.edu",
    grade: 9,
    section: "A",
    schoolId: "sch2",
    guardianName: "Ganesh Iyer",
    guardianContact: "+91-8765432104",
    dateOfBirth: "2010-07-19",
    address: "45, Sterling Road, Nungambakkam, Chennai",
    enrollmentDate: "2017-05-15",
    attendance: 93,
    performance: "Good",
    lastActive: "2023-04-01",
    teacher: "Ms. Meera Iyer",
    status: "active",
    learningStats: {
      completedLessons: 185,
      avgQuizScore: 87,
      timeSpent: "152 hours",
      strongSubjects: ["Mathematics", "Science"],
      weakSubjects: ["Social Studies"]
    },
    subjectProgress: [
      { subject: "Mathematics", progress: 88 },
      { subject: "Science", progress: 92 },
      { subject: "English", progress: 70 },
      { subject: "Hindi", progress: 65 },
      { subject: "Social Studies", progress: 78 }
    ]
  },
  {
    id: "s15",
    name: "Aadhya Natarajan",
    email: "aadhya.n@student.apvidya.edu",
    grade: 7,
    section: "B",
    schoolId: "sch2",
    guardianName: "Lakshmi Natarajan",
    guardianContact: "+91-8765432105",
    dateOfBirth: "2012-11-08",
    address: "22, Chamiers Road, RA Puram, Chennai",
    enrollmentDate: "2019-05-20",
    attendance: 95,
    performance: "Good",
    lastActive: "2023-04-01",
    teacher: "Mr. Arjun Patel",
    status: "active",
    learningStats: {
      completedLessons: 150,
      avgQuizScore: 88,
      timeSpent: "125 hours",
      strongSubjects: ["Tamil", "English"],
      weakSubjects: ["Science"]
    },
    subjectProgress: [
      { subject: "Mathematics", progress: 70 },
      { subject: "Science", progress: 78 },
      { subject: "English", progress: 85 },
      { subject: "Hindi", progress: 92 },
      { subject: "Social Studies", progress: 80 }
    ]
  },
  {
    id: "s16",
    name: "Kabir Menon",
    email: "kabir.m@student.apvidya.edu",
    grade: 8,
    section: "A",
    schoolId: "sch2",
    guardianName: "Pradeep Menon",
    guardianContact: "+91-8765432106",
    dateOfBirth: "2011-03-12",
    address: "8, Cathedral Road, Chennai",
    enrollmentDate: "2018-05-22",
    attendance: 90,
    performance: "Good",
    lastActive: "2023-03-31",
    teacher: "Ms. Meera Iyer",
    status: "active",
    learningStats: {
      completedLessons: 158,
      avgQuizScore: 85,
      timeSpent: "128 hours",
      strongSubjects: ["Computer Science", "Mathematics"],
      weakSubjects: ["Social Studies"]
    },
    subjectProgress: [
      { subject: "Mathematics", progress: 82 },
      { subject: "Science", progress: 75 },
      { subject: "English", progress: 70 },
      { subject: "Hindi", progress: 88 },
      { subject: "Social Studies", progress: 65 }
    ]
  },
  {
    id: "s17",
    name: "Meera Venkat",
    email: "meera.v@student.apvidya.edu",
    grade: 6,
    section: "B",
    schoolId: "sch2",
    guardianName: "Venkat Subramanian",
    guardianContact: "+91-8765432107",
    dateOfBirth: "2013-08-30",
    address: "33, Peters Road, Royapettah, Chennai",
    enrollmentDate: "2020-05-18",
    attendance: 89,
    performance: "Good",
    lastActive: "2023-04-02",
    teacher: "Mr. Karthik Nair",
    status: "pending",
    learningStats: {
      completedLessons: 120,
      avgQuizScore: 82,
      timeSpent: "95 hours",
      strongSubjects: ["Art", "Tamil"],
      weakSubjects: ["Mathematics"]
    },
    subjectProgress: [
      { subject: "Mathematics", progress: 68 },
      { subject: "Science", progress: 72 },
      { subject: "English", progress: 80 },
      { subject: "Hindi", progress: 85 },
      { subject: "Social Studies", progress: 70 }
    ]
  },
  {
    id: "s18",
    name: "Veer Chandran",
    email: "veer.c@student.apvidya.edu",
    grade: 9,
    section: "B",
    schoolId: "sch2",
    guardianName: "Prakash Chandran",
    guardianContact: "+91-8765432108",
    dateOfBirth: "2010-05-25",
    address: "17, Dr. Radhakrishnan Salai, Mylapore, Chennai",
    enrollmentDate: "2017-05-15",
    attendance: 92,
    performance: "Good",
    lastActive: "2023-04-01",
    teacher: "Ms. Meera Iyer",
    status: "active",
    learningStats: {
      completedLessons: 178,
      avgQuizScore: 89,
      timeSpent: "148 hours",
      strongSubjects: ["Science", "Mathematics"],
      weakSubjects: ["Hindi"]
    },
    subjectProgress: [
      { subject: "Mathematics", progress: 85 },
      { subject: "Science", progress: 95 },
      { subject: "English", progress: 72 },
      { subject: "Hindi", progress: 68 },
      { subject: "Social Studies", progress: 80 }
    ]
  },
  {
    id: "s19",
    name: "Aisha Lakshman",
    email: "aisha.l@student.apvidya.edu",
    grade: 7,
    section: "A",
    schoolId: "sch2",
    guardianName: "Rima Lakshman",
    guardianContact: "+91-8765432109",
    dateOfBirth: "2012-10-12",
    address: "5, Santhome High Road, Chennai",
    enrollmentDate: "2019-05-20",
    attendance: 96,
    performance: "Excellent",
    lastActive: "2023-04-02",
    teacher: "Mr. Arjun Patel",
    status: "active",
    learningStats: {
      completedLessons: 154,
      avgQuizScore: 93,
      timeSpent: "130 hours",
      strongSubjects: ["English", "Science"],
      weakSubjects: []
    },
    subjectProgress: [
      { subject: "Mathematics", progress: 78 },
      { subject: "Science", progress: 90 },
      { subject: "English", progress: 92 },
      { subject: "Hindi", progress: 70 },
      { subject: "Social Studies", progress: 85 }
    ]
  },
  {
    id: "s20",
    name: "Arnav Pillai",
    email: "arnav.p@student.apvidya.edu",
    grade: 8,
    section: "A",
    schoolId: "sch2",
    guardianName: "Suresh Pillai",
    guardianContact: "+91-8765432110",
    dateOfBirth: "2011-01-10",
    address: "28, TTK Road, Alwarpet, Chennai",
    enrollmentDate: "2018-05-22",
    attendance: 88,
    performance: "Satisfactory",
    lastActive: "2023-03-31",
    teacher: "Mr. Karthik Nair",
    status: "pending",
    learningStats: {
      completedLessons: 160,
      avgQuizScore: 82,
      timeSpent: "130 hours",
      strongSubjects: ["Computer Science"],
      weakSubjects: ["English", "Social Studies"]
    },
    subjectProgress: [
      { subject: "Mathematics", progress: 70 },
      { subject: "Science", progress: 75 },
      { subject: "English", progress: 62 },
      { subject: "Hindi", progress: 88 },
      { subject: "Social Studies", progress: 68 }
    ]
  },
  
  // School 3 Students (10 students)
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
  },
  {
    id: "s22",
    name: "Kyra Gupta",
    email: "kyra.g@student.apvidya.edu",
    grade: 8,
    section: "B",
    schoolId: "sch3",
    guardianName: "Deepak Gupta",
    guardianContact: "+91-7654321099",
    dateOfBirth: "2011-05-28",
    address: "C-8, Greater Kailash, New Delhi",
    enrollmentDate: "2018-04-12",
    attendance: 95,
    performance: "Excellent",
    lastActive: "2023-04-01",
    teacher: "Mrs. Sunita Gupta",
    status: "active",
    learningStats: {
      completedLessons: 170,
      avgQuizScore: 90,
      timeSpent: "140 hours",
      strongSubjects: ["Science", "Social Studies"],
      weakSubjects: []
    },
    subjectProgress: [
      { subject: "Mathematics", progress: 72 },
      { subject: "Science", progress: 92 },
      { subject: "English", progress: 80 },
      { subject: "Hindi", progress: 85 },
      { subject: "Social Studies", progress: 90 }
    ]
  },
  {
    id: "s23",
    name: "Kabir Singh",
    email: "kabir.s@student.apvidya.edu",
    grade: 6,
    section: "A",
    schoolId: "sch3",
    guardianName: "Harpreet Singh",
    guardianContact: "+91-7654321100",
    dateOfBirth: "2013-11-05",
    address: "D-5, Punjabi Bagh, New Delhi",
    enrollmentDate: "2020-04-15",
    attendance: 88,
    performance: "Good",
    lastActive: "2023-03-31",
    teacher: "Mrs. Sunita Gupta",
    status: "pending",
    learningStats: {
      completedLessons: 118,
      avgQuizScore: 80,
      timeSpent: "95 hours",
      strongSubjects: ["Hindi", "Art"],
      weakSubjects: ["Mathematics"]
    },
    subjectProgress: [
      { subject: "Mathematics", progress: 65 },
      { subject: "Science", progress: 78 },
      { subject: "English", progress: 70 },
      { subject: "Hindi", progress: 82 },
      { subject: "Social Studies", progress: 75 }
    ]
  },
  {
    id: "s24",
    name: "Aarav Khanna",
    email: "aarav.k@student.apvidya.edu",
    grade: 9,
    section: "A",
    schoolId: "sch3",
    guardianName: "Vivek Khanna",
    guardianContact: "+91-7654321101",
    date
