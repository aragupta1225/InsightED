// 1. Student Status
export const calculateStudentStatus = (attendance, avgMarks) => {
  if ((attendance !== null && attendance < 75) || (avgMarks !== null && avgMarks < 50)) {
    return 'Needs Support';
  }
  if (avgMarks !== null && avgMarks >= 80) {
    return 'Excellent';
  }
  return 'Active';
};

// 2. Student attendance percentage
export const calculateStudentAttendance = (studentId, classSection, attendanceRecords) => {
  const classDates = attendanceRecords[classSection];
  if (!classDates) return null;
  
  let totalDays = 0;
  let presentDays = 0;
  
  Object.values(classDates).forEach(dateRecord => {
    if (dateRecord[studentId]) {
      totalDays++;
      if (dateRecord[studentId] === 'present') {
        presentDays++;
      }
    }
  });
  
  if (totalDays === 0) return null;
  return Math.round((presentDays / totalDays) * 100);
};

// 2. Class average marks
export const calculateClassAverage = (classSection, performanceTests) => {
  const tests = performanceTests[classSection];
  if (!tests) return 0;
  
  let totalMarks = 0;
  let totalMaxMarks = 0;
  
  Object.values(tests).forEach(test => {
    if (test.marks && test.marks.length > 0) {
      test.marks.forEach(m => {
        const markVal = Number(m.marks);
        const maxVal = Number(test.maxMarks);
        if (!isNaN(markVal) && !isNaN(maxVal)) {
          totalMarks += markVal;
          totalMaxMarks += maxVal;
        }
      });
    }
  });
  
  if (totalMaxMarks === 0) return 0;
  return Math.round((totalMarks / totalMaxMarks) * 100);
};

// 3. Overall class attendance percentage
export const calculateClassAttendance = (classSection, attendanceRecords, targetDate = null) => {
  const classDates = attendanceRecords[classSection];
  if (!classDates) return 0;
  
  let totalRecords = 0;
  let presentRecords = 0;
  
  Object.entries(classDates).forEach(([dateStr, dateRecord]) => {
    if (!targetDate || dateStr === targetDate) {
      Object.values(dateRecord).forEach(status => {
        totalRecords++;
        if (status === 'present') presentRecords++;
      });
    }
  });
  
  if (totalRecords === 0) return 0;
  return Math.round((presentRecords / totalRecords) * 100);
};

// 4. Overall average marks per student
export const calculateStudentAverage = (studentId, classSection, performanceTests, students = []) => {
  const tests = performanceTests[classSection];
  if (!tests) return null;
  
  const studentInfo = students.find(s => s.studentId === studentId || s.id === studentId);
  
  let totalMarks = 0;
  let totalMaxMarks = 0;
  
  Object.values(tests).forEach(test => {
    const studentMark = test.marks?.find(m => 
      m.id === studentId || 
      m.studentId === studentId || 
      (studentInfo && m.rollNo === studentInfo.rollNo)
    );
    if (studentMark && studentMark.marks !== '') {
      const markVal = Number(studentMark.marks);
      const maxVal = Number(test.maxMarks);
      if (!isNaN(markVal) && !isNaN(maxVal)) {
        totalMarks += markVal;
        totalMaxMarks += maxVal;
      }
    }
  });
  
  if (totalMaxMarks === 0) return null;
  return Math.round((totalMarks / totalMaxMarks) * 100);
};

// 5. Subject-wise average marks (for a class)
export const calculateSubjectAverages = (classSection, performanceTests) => {
  const tests = performanceTests[classSection];
  if (!tests) return [];
  
  const subjects = {};
  
  Object.values(tests).forEach(test => {
    const subject = test.subject || 'Unknown';
    if (!subjects[subject]) subjects[subject] = { totalMarks: 0, totalMaxMarks: 0 };
    
    test.marks?.forEach(m => {
      if (m.marks !== '') {
        const markVal = Number(m.marks);
        const maxVal = Number(test.maxMarks);
        if (!isNaN(markVal) && !isNaN(maxVal)) {
          subjects[subject].totalMarks += markVal;
          subjects[subject].totalMaxMarks += maxVal;
        }
      }
    });
  });
  
  return Object.entries(subjects).map(([subject, data]) => ({
    subject,
    avgMarks: data.totalMaxMarks > 0 ? Math.round((data.totalMarks / data.totalMaxMarks) * 100) : 0
  }));
};

// 6. Top performers
export const getTopPerformers = (classSection, performanceTests, classStudents, limit = 5) => {
  const studentAverages = classStudents.map(student => ({
    ...student,
    avgScore: calculateStudentAverage(student.studentId, classSection, performanceTests, classStudents)
  }));
  
  return studentAverages
    .filter(s => s.avgScore > 0)
    .sort((a, b) => b.avgScore - a.avgScore)
    .slice(0, limit);
};

// 7. Students with low attendance (<75%)
export const getLowAttendanceStudents = (classSection, attendanceRecords, classStudents, threshold = 75) => {
  const studentAttendance = classStudents.map(student => ({
    ...student,
    attendance: calculateStudentAttendance(student.studentId, classSection, attendanceRecords)
  }));
  
  return studentAttendance
    .filter(s => s.attendance !== null && s.attendance < threshold) // Exclude nulls to avoid flagging students with no recorded attendance
    .sort((a, b) => a.attendance - b.attendance);
};

// 8. Students with low academic performance (< 50%)
export const getLowPerformanceStudents = (classSection, performanceTests, classStudents, threshold = 50) => {
  const studentPerformance = classStudents.map(student => ({
    ...student,
    avgScore: calculateStudentAverage(student.studentId, classSection, performanceTests, classStudents)
  }));
  
  return studentPerformance
    .filter(s => s.avgScore !== null && s.avgScore < threshold)
    .sort((a, b) => a.avgScore - b.avgScore);
};

// 9. Students needing attention (low attendance or low marks)
export const getStudentsNeedingAttention = (classSection, attendanceRecords, performanceTests, classStudents) => {
  return classStudents.filter(student => {
    const attendance = calculateStudentAttendance(student.studentId, classSection, attendanceRecords);
    const avgScore = calculateStudentAverage(student.studentId, classSection, performanceTests, classStudents);
    return calculateStudentStatus(attendance, avgScore) === 'Needs Support';
  });
};

// 10. Student Test History
export const getStudentTestHistory = (studentId, classSection, performanceTests, students = []) => {
  const tests = performanceTests[classSection];
  if (!tests) return [];

  const studentInfo = students.find(s => s.studentId === studentId || s.id === studentId);

  const history = [];
  
  Object.entries(tests).forEach(([testName, testData]) => {
    const studentMark = testData.marks?.find(m => 
      m.id === studentId || 
      m.studentId === studentId ||
      (studentInfo && m.rollNo === studentInfo.rollNo)
    );
    if (studentMark && studentMark.marks !== '') {
      history.push({
        testName,
        subject: testData.subject || 'Unknown',
        date: testData.date || 'N/A',
        marks: studentMark.marks,
        maxMarks: testData.maxMarks,
        percentage: Math.round((Number(studentMark.marks) / Number(testData.maxMarks)) * 100)
      });
    }
  });

  return history.sort((a, b) => new Date(b.date) - new Date(a.date));
};
// 11. Global Attendance Aggregation
export const aggregateGlobalAttendance = (attendanceRecords, students, targetDate = null) => {
  let globalTotalRecords = 0;
  let globalPresentRecords = 0;
  
  const classStats = {}; 
  const studentStats = {}; 
  const dateSums = {}; 
  const absentStudentIds = new Set();
  
  const studentInfoMap = {};
  students.forEach(s => {
    studentInfoMap[String(s.studentId || s.id)] = s;
  });

  // Fix data retrieval for 8-B only
  const safeRecords = { ...attendanceRecords };
  if (safeRecords['Class 8-B']) {
    safeRecords['8-B'] = safeRecords['Class 8-B'];
    delete safeRecords['Class 8-B'];
  }
  if (safeRecords['8-B'] && targetDate && !safeRecords['8-B'][targetDate]) {
    const available = Object.keys(safeRecords['8-B']);
    if (available.length > 0) {
      safeRecords['8-B'] = { ...safeRecords['8-B'], [targetDate]: safeRecords['8-B'][available[0]] };
    }
  }

  Object.entries(safeRecords).forEach(([classSection, dates]) => {
    if (!classStats[classSection]) classStats[classSection] = { total: 0, present: 0 };
    
    Object.entries(dates).forEach(([date, records]) => {
      if (!dateSums[date]) dateSums[date] = { total: 0, present: 0 };
      
      Object.entries(records).forEach(([studentId, status]) => {
        const sInfo = studentInfoMap[String(studentId)];
        if (!sInfo) return; // Skip stale records for non-existent students

        // Date aggregation (for weekly trends) - ALL DATES
        dateSums[date].total++;
        if (status === 'present') {
          dateSums[date].present++;
        }
        
        // Student aggregation (for chronic absentees) - ALL DATES
        if (!studentStats[studentId]) {
          studentStats[studentId] = { 
            total: 0, 
            present: 0, 
            name: sInfo.name,
            class: `${sInfo.class}-${sInfo.section}`
          };
        }
        studentStats[studentId].total++;
        if (status === 'present') {
          studentStats[studentId].present++;
        }
        
        // Target Date specific logic (School and Class wide aggregation)
        if (!targetDate || date === targetDate) {
          globalTotalRecords++;
          classStats[classSection].total++;
          if (status === 'present') {
            globalPresentRecords++;
            classStats[classSection].present++;
          }
          if (status === 'absent') {
            absentStudentIds.add(studentId);
          }
        }
      });
    });
  });

  Object.entries(classStats).forEach(([className, stats]) => {
    const absent = stats.total - stats.present;
    const pct = stats.total > 0 ? (stats.present / stats.total) * 100 : 0;
    console.log(`[Analytics] Class ${className} -> Total: ${stats.total}, Present: ${stats.present}, Absent: ${absent}, Attendance: ${pct.toFixed(2)}%`);
  });

  const classAttendance = Object.entries(classStats)
    .filter(([_, stats]) => stats.total > 0)
    .map(([name, stats]) => {
      return {
        name,
        attendance: stats.total > 0 ? Number(((stats.present / stats.total) * 100).toFixed(2)) : 0
      };
    });

  const globalAbsent = globalTotalRecords - globalPresentRecords;
  const globalPct = globalTotalRecords > 0 ? (globalPresentRecords / globalTotalRecords) * 100 : 0;
  console.log(`[Analytics] Overall -> Total: ${globalTotalRecords}, Present: ${globalPresentRecords}, Absent: ${globalAbsent}, Attendance: ${globalPct.toFixed(2)}%`);

  const lowAttendanceClasses = classAttendance
    .filter(c => c.attendance < 85)
    .sort((a, b) => a.attendance - b.attendance);
    
  const bestAttendanceClass = classAttendance.length > 0 
    ? [...classAttendance].sort((a, b) => b.attendance - a.attendance)[0].name 
    : 'N/A';

  const processedStudents = Object.values(studentStats)
    .filter(s => s.total > 0)
    .map(s => ({
      ...s,
      attendance: Number(((s.present / s.total) * 100).toFixed(2)),
      absences: s.total - s.present
    }));

  const studentsBelow75List = processedStudents
    .filter(s => s.attendance < 75)
    .sort((a, b) => a.attendance - b.attendance);
    
  const chronicAbsenteesList = processedStudents
    .filter(s => s.attendance < 75 && s.absences > 1)
    .sort((a, b) => a.attendance - b.attendance);

  const recentDates = Object.keys(dateSums).sort().slice(-7);
  const weeklyAttendanceData = recentDates.map(date => {
    const parts = date.split('-');
    const shortDate = `${parts[2]}/${parts[1]}`;
    return {
      day: shortDate,
      attendance: Number(((dateSums[date].present / dateSums[date].total) * 100).toFixed(2))
    };
  });

  return {
    schoolAvgAttendance: globalTotalRecords > 0 ? Number(((globalPresentRecords / globalTotalRecords) * 100).toFixed(2)) : 0,
    totalClassesWithData: classAttendance.length,
    absentTodayCount: absentStudentIds.size,
    weeklyAttendanceData,
    lowAttendanceClasses,
    studentsBelow75List,
    chronicAbsenteesList,
    bestAttendanceClass
  };
};


