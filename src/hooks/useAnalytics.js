import { useCallback } from 'react';
import useStudentStore from '../store/studentStore';
import useAttendanceStore from '../store/attendanceStore';
import usePerformanceStore from '../store/performanceStore';
import * as Engine from '../utils/analyticsEngine';

const useAnalytics = () => {
  const students = useStudentStore(state => state.students);
  const attendanceRecords = useAttendanceStore(state => state.records);
  const performanceTests = usePerformanceStore(state => state.tests);

  const getStudentMetrics = useCallback((studentId, classSection) => {
    const attendance = Engine.calculateStudentAttendance(studentId, classSection, attendanceRecords);
    const avgMarks = Engine.calculateStudentAverage(studentId, classSection, performanceTests, students);
    return {
      attendance,
      avgMarks,
      status: Engine.calculateStudentStatus(attendance, avgMarks),
      testHistory: Engine.getStudentTestHistory(studentId, classSection, performanceTests, students),
    };
  }, [attendanceRecords, performanceTests, students]);

  const getClassMetrics = useCallback((classSection, targetDate = null) => {
    const classStudents = students.filter(
      s => `${s.class}-${s.section}` === classSection
    );

    return {
      avgAttendance: Engine.calculateClassAttendance(classSection, attendanceRecords),
      dailyAvgAttendance: targetDate ? Engine.calculateClassAttendance(classSection, attendanceRecords, targetDate) : null,
      avgMarks: Engine.calculateClassAverage(classSection, performanceTests),
      subjectAverages: Engine.calculateSubjectAverages(classSection, performanceTests),
      topPerformers: Engine.getTopPerformers(classSection, performanceTests, classStudents),
      lowAttendanceStudents: Engine.getLowAttendanceStudents(classSection, attendanceRecords, classStudents),
      lowPerformanceStudents: Engine.getLowPerformanceStudents(classSection, performanceTests, classStudents),
      studentsNeedingAttention: Engine.getStudentsNeedingAttention(classSection, attendanceRecords, performanceTests, classStudents)
    };
  }, [students, attendanceRecords, performanceTests]);

  const getGlobalMetrics = useCallback(() => {
    // School-wide aggregates
    let sumAttendance = 0;
    let sumMarks = 0;
    
    // Determine unique classes from students
    const uniqueClasses = new Set();
    students.forEach(s => {
      if (s.class && s.section) {
        uniqueClasses.add(`${s.class}-${s.section}`);
      }
    });

    let totalClassesWithData = 0;
    let totalClassesWithTest = 0;
    let totalClassesNeedingAttention = 0;

    const todayDate = new Date();
    const todayStr = `${todayDate.getFullYear()}-${String(todayDate.getMonth() + 1).padStart(2, '0')}-${String(todayDate.getDate()).padStart(2, '0')}`;
    const aggregatedAttendance = Engine.aggregateGlobalAttendance(attendanceRecords, students, todayStr);

    uniqueClasses.forEach(classSection => {
      
      const classMarks = Engine.calculateClassAverage(classSection, performanceTests);
      if (classMarks > 0) {
        sumMarks += classMarks;
        totalClassesWithTest++;
      }

      const classAttendance = Engine.calculateClassAttendance(classSection, attendanceRecords);
      const classStudents = students.filter(s => `${s.class}-${s.section}` === classSection);
      const studentsNeedingAttention = Engine.getStudentsNeedingAttention(classSection, attendanceRecords, performanceTests, classStudents);

      let needsAttention = false;
      if (classMarks > 0 && classMarks < 60) needsAttention = true;
      if (classAttendance > 0 && classAttendance < 75) needsAttention = true;
      if (studentsNeedingAttention && studentsNeedingAttention.length >= 1) needsAttention = true;

      if (needsAttention) {
        totalClassesNeedingAttention++;
      }
    });

    return {
      schoolAvgAttendance: aggregatedAttendance.schoolAvgAttendance,
      schoolAvgMarks: totalClassesWithTest > 0 ? Math.round(sumMarks / totalClassesWithTest) : 0,
      totalStudents: students.length,
      totalClasses: uniqueClasses.size,
      classesNeedingAttention: totalClassesNeedingAttention
    };
  }, [students, attendanceRecords, performanceTests]);


  const getGlobalPerformanceMetrics = useCallback(() => {
    const classAverages = [];
    const allSubjectStats = {};
    let allLowPerformance = [];

    const uniqueClasses = new Set();
    students.forEach(s => {
      if (s.class && s.section) {
        uniqueClasses.add(`${s.class}-${s.section}`);
      }
    });

    uniqueClasses.forEach(classSection => {
      const classMarks = Engine.calculateClassAverage(classSection, performanceTests);
      if (classMarks > 0) {
        classAverages.push({ name: classSection, avgMarks: classMarks });
      }

      // Subject stats
      const tests = performanceTests[classSection] || {};
      Object.values(tests).forEach(test => {
        const subject = test.subject || 'Unknown';
        if (!allSubjectStats[subject]) allSubjectStats[subject] = { total: 0, count: 0 };
        
        let validMarks = 0;
        let testTotal = 0;
        test.marks?.forEach(m => {
          if (m.marks !== '' && !isNaN(Number(m.marks))) {
            testTotal += (Number(m.marks) / Number(test.maxMarks)) * 100;
            validMarks++;
          }
        });
        
        if (validMarks > 0) {
          allSubjectStats[subject].total += (testTotal / validMarks);
          allSubjectStats[subject].count++;
        }
      });

      // Low Performance
      const classStudents = students.filter(s => `${s.class}-${s.section}` === classSection);
      const lowPerf = Engine.getLowPerformanceStudents(classSection, performanceTests, classStudents);
      allLowPerformance = [...allLowPerformance, ...lowPerf.map(s => ({
        name: s.name,
        class: classSection,
        marks: s.avgScore,
        reason: 'Low academic average'
      }))];
    });

    const subjectPerformance = Object.entries(allSubjectStats).map(([subject, stats]) => ({
      subject,
      avgMarks: Math.round(stats.total / stats.count)
    })).sort((a, b) => b.avgMarks - a.avgMarks);

    allLowPerformance.sort((a, b) => a.marks - b.marks);

    return {
      classAverages,
      subjectPerformance,
      academicSupportStudents: allLowPerformance
    };
  }, [students, performanceTests]);

  const getGlobalAttendanceMetrics = useCallback((targetDate = null) => {
    return Engine.aggregateGlobalAttendance(attendanceRecords, students, targetDate);
  }, [students, attendanceRecords]);

  return {
    getStudentMetrics,
    getClassMetrics,
    getGlobalMetrics,
    getGlobalPerformanceMetrics,
    getGlobalAttendanceMetrics
  };
};

export default useAnalytics;
