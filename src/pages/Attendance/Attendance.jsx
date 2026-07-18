import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, UserX, AlertTriangle, Trophy } from 'lucide-react';
import Card from '../../components/common/Card';
import StatCard from '../../components/common/StatCard';
import ChartContainer from '../../components/common/ChartContainer';
import EmptyState from '../../components/common/EmptyState';
import useStudentStore from '../../store/studentStore';
import useAttendanceStore from '../../store/attendanceStore';

const Attendance = () => {
  const students = useStudentStore(state => state.students);
  const attendanceRecords = useAttendanceStore(state => state.records);

  const today = new Date().toISOString().split('T')[0];
  let totalPresent = 0;
  let totalRecords = 0;
  let absentTodayCount = 0;
  const classAttendance = {};

  Object.entries(attendanceRecords).forEach(([classSection, dates]) => {
    let classPresent = 0;
    let classTotal = 0;
    Object.entries(dates).forEach(([date, studentRecords]) => {
      Object.entries(studentRecords).forEach(([studentId, status]) => {
        totalRecords++;
        classTotal++;
        if (status === 'present') {
          totalPresent++;
          classPresent++;
        }
        if (date === today && status === 'absent') {
          absentTodayCount++;
        }
      });
    });
    if (classTotal > 0) {
      classAttendance[classSection] = (classPresent / classTotal) * 100;
    }
  });

  const avgAttendance = totalRecords > 0 ? Math.round((totalPresent / totalRecords) * 100) : 0;
  let bestClass = 'N/A';
  let highest = -1;
  Object.entries(classAttendance).forEach(([c, val]) => {
    if (val > highest) {
      highest = val;
      bestClass = c;
    }
  });
  return (
    <div className="flex flex-col gap-8">
      <div className="mb-4">
        <h1 className="text-4xl font-serif text-navy mb-3">Attendance Overview</h1>
        <p className="text-text-secondary text-lg">Monitor student attendance and identify chronic absentees.</p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Average Attendance" value={`${avgAttendance}%`} icon={Users} color="pink" />
        <StatCard title="Best Attendance Class" value={bestClass} icon={Trophy} color="blue" />
        <StatCard title="Students Absent Today" value={absentTodayCount} icon={UserX} color="pink" />
        <StatCard title="Chronic Absentees" value={0} icon={AlertTriangle} color="blue" />
      </div>

      {/* Analytics Empty State */}
      <Card className="mt-4 flex flex-col items-center">
        <EmptyState 
          title="Global Analytics Under Construction" 
          description="Detailed global attendance insights and charts will be available in a future update." 
        />
      </Card>
    </div>
  );
};

export default Attendance;
