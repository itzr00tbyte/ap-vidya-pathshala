
import { 
  StudentProgress, 
  LearningStats, 
  SchoolPerformance, 
  GradeDistribution, 
  PerformanceData, 
  AttendanceRange 
} from "@/types/dashboard";
import { MOCK_STUDENTS } from "@/data/mockStudents";
import { MOCK_SCHOOLS } from "@/data/mockSchools";

// Get students filtered by teacher name or all students for admin/headmaster
export function getFilteredStudents(userName?: string, userRole?: string) {
  let filteredStudents = [...MOCK_STUDENTS];
  
  if (userRole === "teacher" && userName) {
    filteredStudents = MOCK_STUDENTS.filter(student => student.teacher === userName);
  }
  
  return filteredStudents;
}

// Generate performance distribution data for pie chart
export function generatePerformanceData(filteredStudents: any[]): PerformanceData[] {
  const performanceCounts = filteredStudents.reduce((acc: Record<string, number>, student) => {
    acc[student.performance] = (acc[student.performance] || 0) + 1;
    return acc;
  }, {});
  
  return Object.keys(performanceCounts).map(key => ({
    name: key,
    value: performanceCounts[key],
  }));
}

// Generate subject progress data for bar chart
export function generateSubjectProgressData(filteredStudents: any[]): { subject: string; avgProgress: number }[] {
  if (filteredStudents.length === 0 || !filteredStudents[0].subjectProgress) {
    // If there's no data, generate some placeholder data for demo purposes
    if (filteredStudents.length === 0) {
      return [
        { subject: "Mathematics", avgProgress: 65 },
        { subject: "Science", avgProgress: 72 },
        { subject: "English", avgProgress: 83 },
        { subject: "Social Studies", avgProgress: 59 },
        { subject: "Computer Science", avgProgress: 78 }
      ];
    }
    return [];
  }
  
  const subjects: Record<string, { total: number; count: number }> = {};
  
  // Collect all subjects and calculate average progress
  filteredStudents.forEach(student => {
    if (student.subjectProgress) {
      student.subjectProgress.forEach((subject: StudentProgress) => {
        if (!subjects[subject.subject]) {
          subjects[subject.subject] = {
            total: 0,
            count: 0
          };
        }
        subjects[subject.subject].total += subject.progress;
        subjects[subject.subject].count += 1;
      });
    }
  });
  
  return Object.keys(subjects).map(subject => ({
    subject: subject,
    avgProgress: Math.round(subjects[subject].total / subjects[subject].count)
  }));
}

// Generate attendance distribution data
export function generateAttendanceData(filteredStudents: any[]): AttendanceRange[] {
  const attendanceRanges: Record<string, number> = {
    "Excellent (91-100%)": 0,
    "Good (81-90%)": 0,
    "Average (71-80%)": 0,
    "Below Average (≤70%)": 0
  };
  
  filteredStudents.forEach(student => {
    if (student.attendance > 90) {
      attendanceRanges["Excellent (91-100%)"]++;
    } else if (student.attendance > 80) {
      attendanceRanges["Good (81-90%)"]++;
    } else if (student.attendance > 70) {
      attendanceRanges["Average (71-80%)"]++;
    } else {
      attendanceRanges["Below Average (≤70%)"]++;
    }
  });
  
  return Object.keys(attendanceRanges).map(key => ({
    name: key,
    value: attendanceRanges[key],
  }));
}

// Generate school performance data
export function generateSchoolPerformanceData(): SchoolPerformance[] {
  return MOCK_SCHOOLS.map(school => ({
    name: school.name.split(' ').pop() || "", // Just use the last part of the name
    performance: Math.floor(Math.random() * 30) + 70 // Random performance between 70-100%
  }));
}

// Generate grade distribution data
export function generateGradeDistributionData(): GradeDistribution[] {
  return [6, 7, 8, 9].map(grade => ({
    grade: `Grade ${grade}`,
    students: MOCK_STUDENTS.filter(s => s.grade === grade).length
  }));
}

// Calculate average completion from student learning stats
export function calculateAvgCompletion(students: any[]): number {
  if (students.length === 0) return 0;
  
  return Math.round(
    students.reduce((sum, student) => 
      sum + (student.learningStats?.avgQuizScore || 0), 0) / students.length
  );
}

// Calculate honor roll students (students with performance = "Excellent")
export function calculateHonorRollCount(students: any[]): number {
  return students.filter(student => 
    student.performance === "Excellent"
  ).length;
}

// Calculate students at risk (low attendance or poor performance)
export function calculateAtRiskCount(students: any[]): number {
  return students.filter(student => 
    student.attendance < 80 || student.performance === "Poor" || student.performance === "Satisfactory"
  ).length;
}

// Calculate average student progress across all subjects
export function calculateAvgStudentProgress(students: any[]): number {
  if (students.length === 0) return 0;
  
  return Math.round(
    students.reduce((sum, student) => {
      if (student.subjectProgress && student.subjectProgress.length > 0) {
        const studentAvg = student.subjectProgress.reduce((subSum: number, subject: StudentProgress) => 
          subSum + subject.progress, 0) / student.subjectProgress.length;
        return sum + studentAvg;
      }
      return sum;
    }, 0) / students.length
  );
}

// Get average completed lessons per student
export function calculateAvgCompletedLessons(students: any[]): number {
  if (students.length === 0) return 0;
  
  return Math.round(
    students.reduce((sum, student) => 
      sum + (student.learningStats?.completedLessons || 0), 0) / students.length
  );
}

// Ensure each student has subject progress data
export function ensureStudentHasProgress(students: any[]): any[] {
  return students.map(student => {
    if (!student.subjectProgress) {
      student.subjectProgress = [
        { subject: "Mathematics", progress: Math.floor(Math.random() * 100) },
        { subject: "Science", progress: Math.floor(Math.random() * 100) },
        { subject: "English", progress: Math.floor(Math.random() * 100) },
        { subject: "Social Studies", progress: Math.floor(Math.random() * 100) },
        { subject: "Computer Science", progress: Math.floor(Math.random() * 100) },
      ];
    }
    return student;
  });
}
