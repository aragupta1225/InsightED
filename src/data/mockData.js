export const schoolData = {
  name: "Insight Public School",
  teacher: {
    name: "Ms. Ananya Sharma",
    role: "Mathematics",
    classes: ["8-A", "8-B", "9-A"]
  }
};

export const classesData = [
  { id: '8-A', name: 'Class 8', section: 'A', students: 52, avgAttendance: 92, avgPerformance: 76, room: 'Room 201' },
  { id: '8-B', name: 'Class 8', section: 'B', students: 48, avgAttendance: 89, avgPerformance: 71, room: 'Room 202' },
  { id: '9-A', name: 'Class 9', section: 'A', students: 56, avgAttendance: 91, avgPerformance: 74, room: 'Room 203' }
];

export const dummyStudents = [
  { id: '101', roll: '12', name: 'Rohan Verma', cls: '8', section: 'A', att: 62, perf: 38, risk: 'High', img: 'RV' },
  { id: '102', roll: '19', name: 'Kavya Singh', cls: '8', section: 'B', att: 68, perf: 42, risk: 'High', img: 'KS' },
  { id: '103', roll: '05', name: 'Arjun Mehta', cls: '9', section: 'A', att: 71, perf: 46, risk: 'Medium', img: 'AM' },
  { id: '104', roll: '23', name: 'Priyanshi Das', cls: '9', section: 'A', att: 72, perf: 48, risk: 'Medium', img: 'PD' },
  { id: '105', roll: '14', name: 'Ishaan Khan', cls: '8', section: 'A', att: 74, perf: 50, risk: 'Medium', img: 'IK' },
  { id: '106', roll: '01', name: 'Aarav Patel', cls: '8', section: 'A', att: 95, perf: 92, risk: 'Low', img: 'AP' },
  { id: '107', roll: '02', name: 'Diya Sharma', cls: '8', section: 'B', att: 98, perf: 88, risk: 'Low', img: 'DS' },
  { id: '108', roll: '28', name: 'Vihaan Kumar', cls: '9', section: 'A', att: 90, perf: 85, risk: 'Low', img: 'VK' },
  { id: '109', roll: '09', name: 'Ananya Gupta', cls: '8', section: 'A', att: 88, perf: 78, risk: 'Low', img: 'AG' },
  { id: '110', roll: '33', name: 'Krishna Reddy', cls: '8', section: 'B', att: 85, perf: 72, risk: 'Medium', img: 'KR' }
];

export const mockInsights = [
  { type: 'danger', text: '5 students have attendance below 75%.', subtext: 'Consider reaching out to parents.' },
  { type: 'warning', text: '3 students scored below 40% in Mathematics.', subtext: 'Suggested: Extra practice and doubt sessions.' },
  { type: 'success', text: '12 students improved their performance this month.', subtext: 'Great job! Keep encouraging them.' },
  { type: 'info', text: 'Class 8-A has the highest attendance this week.', subtext: 'Excellent work by the class!' }
];

export const mockStudents = [
  { id: '1', name: 'Alice Johnson', grade: '10th', attendance: 95, gpa: 3.8, risk: 'low', lastIntervention: null },
  { id: '2', name: 'Bob Smith', grade: '10th', attendance: 82, gpa: 2.4, risk: 'high', lastIntervention: '2026-07-10' },
  { id: '3', name: 'Charlie Davis', grade: '11th', attendance: 98, gpa: 3.9, risk: 'low', lastIntervention: null },
  { id: '4', name: 'Diana Evans', grade: '12th', attendance: 88, gpa: 3.1, risk: 'medium', lastIntervention: '2026-06-25' },
  { id: '5', name: 'Ethan Foster', grade: '9th', attendance: 76, gpa: 2.1, risk: 'high', lastIntervention: '2026-07-12' },
  { id: '6', name: 'Fiona Green', grade: '11th', attendance: 92, gpa: 3.5, risk: 'low', lastIntervention: null },
  { id: '7', name: 'George Harris', grade: '10th', attendance: 85, gpa: 2.8, risk: 'medium', lastIntervention: null },
  { id: '8', name: 'Hannah Adams', grade: '12th', attendance: 99, gpa: 4.0, risk: 'low', lastIntervention: null },
  { id: '9', name: 'Ian Brooks', grade: '9th', attendance: 91, gpa: 3.2, risk: 'low', lastIntervention: null },
  { id: '10', name: 'Jenny Carter', grade: '10th', attendance: 79, gpa: 2.5, risk: 'high', lastIntervention: '2026-07-05' },
  { id: '11', name: 'Kevin Dunn', grade: '11th', attendance: 89, gpa: 3.0, risk: 'medium', lastIntervention: null },
  { id: '12', name: 'Laura Edwards', grade: '12th', attendance: 96, gpa: 3.7, risk: 'low', lastIntervention: null },
  { id: '13', name: 'Mike Franklin', grade: '9th', attendance: 84, gpa: 2.6, risk: 'medium', lastIntervention: '2026-06-28' },
  { id: '14', name: 'Nina Gibson', grade: '10th', attendance: 94, gpa: 3.6, risk: 'low', lastIntervention: null },
  { id: '15', name: 'Oscar Howard', grade: '11th', attendance: 75, gpa: 1.9, risk: 'high', lastIntervention: '2026-07-14' },
];

export const mockKpiData = [
  { title: 'Total Students', value: '1,245', change: '+2.4%', trend: 'up' },
  { title: 'Average Attendance', value: '92.4%', change: '-0.8%', trend: 'down' },
  { title: 'At-Risk Students', value: '48', change: '-12%', trend: 'up' },
  { title: 'Avg GPA', value: '3.12', change: '+0.05', trend: 'up' },
];

export const mockAttendanceTrends = [
  { month: 'Jan', attendance: 94 },
  { month: 'Feb', attendance: 93 },
  { month: 'Mar', attendance: 95 },
  { month: 'Apr', attendance: 92 },
  { month: 'May', attendance: 91 },
  { month: 'Jun', attendance: 89 },
];

export const mockPerformanceData = [
  { subject: 'Math', avgScore: 78, highest: 98 },
  { subject: 'Science', avgScore: 82, highest: 100 },
  { subject: 'English', avgScore: 85, highest: 96 },
  { subject: 'History', avgScore: 81, highest: 95 },
  { subject: 'Art', avgScore: 92, highest: 100 },
];

export const mockRecentInterventions = [
  { id: 1, student: 'Oscar Howard', action: 'Meeting with counselor', date: '2026-07-14', status: 'Completed' },
  { id: 2, student: 'Ethan Foster', action: 'Parent-teacher conference', date: '2026-07-12', status: 'Scheduled' },
  { id: 3, student: 'Bob Smith', action: 'Tutoring session assigned', date: '2026-07-10', status: 'Completed' },
];

export const mockStudentDetails = {
  '1': {
    ...mockStudents[0],
    email: 'alice.j@school.edu',
    phone: '555-0101',
    parents: 'Mark & Sarah Johnson',
    address: '123 Maple St',
    subjects: [
      { name: 'Math', score: 92 },
      { name: 'Science', score: 95 },
      { name: 'English', score: 88 },
      { name: 'History', score: 91 },
    ],
    behaviorNotes: [
      { date: '2026-05-10', note: 'Excellent participation in Science fair.' }
    ]
  },
  '2': {
    ...mockStudents[1],
    email: 'bob.s@school.edu',
    phone: '555-0102',
    parents: 'Robert & Emily Smith',
    address: '456 Oak Ave',
    subjects: [
      { name: 'Math', score: 65 },
      { name: 'Science', score: 72 },
      { name: 'English', score: 68 },
      { name: 'History', score: 70 },
    ],
    behaviorNotes: [
      { date: '2026-07-10', note: 'Missed 3 consecutive homework assignments.' },
      { date: '2026-06-15', note: 'Frequent unexcused absences.' }
    ]
  },
};
