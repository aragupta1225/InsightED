export const teacherData = {
  name: 'Ms. Ananya Sharma',
  role: 'Mathematics Teacher',
  username: 'ananya.maths',
  email: 'ananya.sharma@insighted.edu',
};

export const mockClasses = [
  { id: '8-A', name: 'Class 8', section: 'A', studentsCount: 42, avgAttendance: 92, avgMarks: 76, studentsNeedingSupport: 3, topPerformer: 'Aarav Patel' },
  { id: '8-B', name: 'Class 8', section: 'B', studentsCount: 38, avgAttendance: 89, avgMarks: 71, studentsNeedingSupport: 5, topPerformer: 'Arjun Mehta' },
  { id: '9-A', name: 'Class 9', section: 'A', studentsCount: 45, avgAttendance: 91, avgMarks: 74, studentsNeedingSupport: 2, topPerformer: 'Aditya Singh' },
];

export const mockStudents = [
  { id: 'STU001', rollNo: '01', name: 'Aarav Patel', classId: '8-A', attendance: 95, marks: 92, status: 'Excellent', remarks: ['Consistent performer in all unit tests.'] },
  { id: 'STU002', rollNo: '02', name: 'Diya Sharma', classId: '8-A', attendance: 98, marks: 88, status: 'Good', remarks: ['Participates well in class discussions.'] },
  { id: 'STU003', rollNo: '03', name: 'Ishaan Khan', classId: '8-A', attendance: 74, marks: 50, status: 'Needs Support', remarks: ['Missed last two assignments. Needs extra help in Algebra.'] },
  { id: 'STU004', rollNo: '04', name: 'Rohan Verma', classId: '8-A', attendance: 62, marks: 38, status: 'Needs Support', remarks: ['Frequent absences affecting performance.'] },
  { id: 'STU005', rollNo: '05', name: 'Ananya Gupta', classId: '8-A', attendance: 88, marks: 78, status: 'Good', remarks: ['Steady progress over the semester.'] },
  
  { id: 'STU006', rollNo: '01', name: 'Kavya Singh', classId: '8-B', attendance: 68, marks: 42, status: 'Needs Support', remarks: ['Struggling with geometry concepts.'] },
  { id: 'STU007', rollNo: '02', name: 'Krishna Reddy', classId: '8-B', attendance: 85, marks: 72, status: 'Good', remarks: [] },
  { id: 'STU008', rollNo: '03', name: 'Arjun Mehta', classId: '8-B', attendance: 92, marks: 80, status: 'Good', remarks: ['Very attentive in class.'] },
  
  { id: 'STU009', rollNo: '01', name: 'Priyanshi Das', classId: '9-A', attendance: 72, marks: 48, status: 'Needs Support', remarks: ['Performance dropped in the mid-terms.'] },
  { id: 'STU010', rollNo: '02', name: 'Vihaan Kumar', classId: '9-A', attendance: 90, marks: 85, status: 'Good', remarks: [] },
  { id: 'STU011', rollNo: '03', name: 'Aditya Singh', classId: '9-A', attendance: 96, marks: 91, status: 'Excellent', remarks: ['Topper of the class. Outstanding problem solving skills.'] },
];

export const mockDashboardStats = {
  totalStudents: 125,
  attendanceToday: 91,
  studentsNeedingSupport: 10,
  classesMonitored: 3,
};

export const attentionStudents = [
  { id: 'STU004', name: 'Rohan Verma', class: '8-A', reason: 'Absent for 4 consecutive days' },
  { id: 'STU003', name: 'Ishaan Khan', class: '8-A', reason: 'Failed recent Algebra test' },
  { id: 'STU006', name: 'Kavya Singh', class: '8-B', reason: 'Marks dropped by 15% this month' },
  { id: 'STU009', name: 'Priyanshi Das', class: '9-A', reason: 'Low participation and missed homework' },
];

export const attentionClasses = [
  { id: '8-B', class: 'Class 8-B', reason: 'Overall average marks dropped below 75%' },
  { id: '9-A', class: 'Class 9-A', reason: 'Pending attendance log for yesterday' },
];

export const initialTasks = [
  { id: 1, text: 'Review mid-term papers for 8-A', completed: false },
  { id: 2, text: 'Submit weekly attendance report to admin', completed: false },
  { id: 3, text: 'Prepare questions for tomorrow\'s quiz', completed: false },
  { id: 4, text: 'Meet with Rohan Verma\'s parents', completed: false },
  { id: 5, text: 'Update marks in the central database', completed: false },
];

export const mockTestHistory = [
  { testName: 'Unit Test 1', marks: 78, date: '10 Aug 2026' },
  { testName: 'Unit Test 2', marks: 82, date: '15 Sep 2026' },
  { testName: 'Mid Terms', marks: 75, date: '20 Oct 2026' },
];

export const mockAttendanceTrends = [
  { month: 'Apr', attendance: 94 },
  { month: 'May', attendance: 93 },
  { month: 'Jun', attendance: 88 },
  { month: 'Jul', attendance: 92 },
  { month: 'Aug', attendance: 91 },
  { month: 'Sep', attendance: 89 },
];

// --- NEW DATA FOR PERFORMANCE OVERVIEW ---
export const performanceOverview = {
  schoolAverage: 74,
  topClass: 'Class 8-A',
  classesNeedingAttention: 2,
  improvementSinceLast: '+2.4%',
};

export const subjectPerformance = [
  { subject: 'Algebra', avgMarks: 72 },
  { subject: 'Geometry', avgMarks: 68 },
  { subject: 'Trigonometry', avgMarks: 76 },
  { subject: 'Calculus', avgMarks: 81 },
  { subject: 'Statistics', avgMarks: 79 },
];

export const academicSupportStudents = [
  { name: 'Rohan Verma', class: '8-A', marks: 38, reason: 'Struggling with basic algebra concepts.' },
  { name: 'Kavya Singh', class: '8-B', marks: 42, reason: 'Needs help visualizing geometric shapes.' },
  { name: 'Priyanshi Das', class: '9-A', marks: 48, reason: 'Difficulty applying formulas in exams.' },
  { name: 'Ishaan Khan', class: '8-A', marks: 50, reason: 'Missed several classes, falling behind.' },
];

// --- NEW DATA FOR ATTENDANCE OVERVIEW ---
export const attendanceOverview = {
  todayAttendance: 92.5,
  absentToday: 9,
  chronicAbsentees: 4,
  bestAttendanceClass: 'Class 9-A',
};

export const weeklyAttendanceData = [
  { day: 'Mon', attendance: 94 },
  { day: 'Tue', attendance: 96 },
  { day: 'Wed', attendance: 92 },
  { day: 'Thu', attendance: 89 },
  { day: 'Fri', attendance: 91 },
];

export const lowAttendanceClasses = [
  { name: 'Class 8-B', attendance: 82 },
  { name: 'Class 8-C', attendance: 85 },
];

export const chronicAbsenteesList = [
  { name: 'Rohan Verma', class: '8-A', attendance: 62 },
  { name: 'Kavya Singh', class: '8-B', attendance: 68 },
  { name: 'Aman Patel', class: '8-C', attendance: 71 },
  { name: 'Priyanshi Das', class: '9-A', attendance: 72 },
];
