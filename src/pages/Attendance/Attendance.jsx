import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, UserX, AlertTriangle, Trophy } from 'lucide-react';
import Card from '../../components/common/Card';
import StatCard from '../../components/common/StatCard';
import ChartContainer from '../../components/common/ChartContainer';
import { attendanceOverview, weeklyAttendanceData, lowAttendanceClasses, chronicAbsenteesList } from '../../data/mockData';

const Attendance = () => {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-navy mb-2">Attendance Overview</h1>
        <p className="text-text-secondary">Monitor student attendance and identify chronic absentees.</p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Today's Attendance" value={`${attendanceOverview.todayAttendance}%`} icon={Users} color="pink" />
        <StatCard title="Best Attendance Class" value={attendanceOverview.bestAttendanceClass} icon={Trophy} color="green" />
        <StatCard title="Students Absent Today" value={attendanceOverview.absentToday} icon={UserX} color="blue" />
        <StatCard title="Chronic Absentees" value={attendanceOverview.chronicAbsentees} icon={AlertTriangle} color="brown" />
      </div>

      {/* Main Chart */}
      <div className="h-[400px]">
        <ChartContainer title="Weekly Attendance">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyAttendanceData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(27, 37, 65, 0.08)" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#8A8B9E' }} dy={10} />
              <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#8A8B9E' }} />
              <Tooltip
                cursor={{ fill: 'rgba(27, 37, 65, 0.04)' }}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 12px 36px -12px rgba(27, 37, 65, 0.1)' }}
              />
              <Bar dataKey="attendance" name="Attendance %" fill="#1B2541" radius={[6, 6, 6, 6]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Classes with Low Attendance Table */}
        <Card noPadding>
          <div className="p-6 border-b border-border-subtle bg-paper-light">
            <h3 className="font-semibold text-navy">Classes with Low Attendance</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border-subtle bg-paper/50">
                  <th className="px-6 py-4 font-semibold text-text-secondary text-sm">Class</th>
                  <th className="px-6 py-4 font-semibold text-text-secondary text-sm text-right">Attendance (%)</th>
                </tr>
              </thead>
              <tbody>
                {lowAttendanceClasses.map((item, idx) => (
                  <tr key={idx} className="border-b border-border-subtle last:border-none hover:bg-paper-light transition-colors">
                    <td className="px-6 py-4 font-semibold text-navy">{item.name}</td>
                    <td className="px-6 py-4 font-bold text-danger text-right">{item.attendance}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Students Below 75% Table */}
        <Card noPadding>
          <div className="p-6 border-b border-border-subtle bg-paper-light flex items-center gap-2">
            <AlertTriangle size={20} className="text-danger" />
            <h3 className="font-semibold text-navy">Students Below 75% Attendance</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border-subtle bg-paper/50">
                  <th className="px-6 py-4 font-semibold text-text-secondary text-sm">Student</th>
                  <th className="px-6 py-4 font-semibold text-text-secondary text-sm">Class</th>
                  <th className="px-6 py-4 font-semibold text-text-secondary text-sm text-right">Attendance (%)</th>
                </tr>
              </thead>
              <tbody>
                {chronicAbsenteesList.map((item, idx) => (
                  <tr key={idx} className="border-b border-border-subtle last:border-none hover:bg-paper-light transition-colors">
                    <td className="px-6 py-4 font-semibold text-navy">{item.name}</td>
                    <td className="px-6 py-4 font-medium text-navy">{item.class}</td>
                    <td className="px-6 py-4 font-bold text-danger text-right">{item.attendance}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

      </div>
    </div>
  );
};

export default Attendance;
