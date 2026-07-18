import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, UserX, AlertTriangle, Trophy } from 'lucide-react';
import Card from '../../components/common/Card';
import StatCard from '../../components/common/StatCard';
import ChartContainer from '../../components/common/ChartContainer';
import EmptyState from '../../components/common/EmptyState';
import useAnalytics from '../../hooks/useAnalytics';
import useAttendanceStore from '../../store/attendanceStore';

const Attendance = () => {
  const { getGlobalAttendanceMetrics } = useAnalytics();
  const todayDate = new Date();
  const today = `${todayDate.getFullYear()}-${String(todayDate.getMonth() + 1).padStart(2, '0')}-${String(todayDate.getDate()).padStart(2, '0')}`;
  
  const metrics = getGlobalAttendanceMetrics(today);

  return (
    <div className="flex flex-col gap-8">
      <div className="mb-4">
        <h1 className="text-4xl font-serif text-navy mb-3">Attendance Overview</h1>
        <p className="text-text-secondary text-lg">Monitor student attendance and identify chronic absentees.</p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Average Attendance" value={`${metrics.schoolAvgAttendance}%`} icon={Users} color="pink" />
        <StatCard title="Best Attendance Class" value={metrics.bestAttendanceClass} icon={Trophy} color="blue" />
        <StatCard title="Students Absent Today" value={metrics.absentTodayCount} icon={UserX} color="pink" />
        <StatCard title="Chronic Absentees" value={metrics.chronicAbsenteesList.length} icon={AlertTriangle} color="blue" />
      </div>

      {metrics.weeklyAttendanceData.length === 0 ? (
        <Card className="mt-4 flex flex-col items-center">
          <EmptyState 
            title="No Attendance Data Found" 
            description="Please record student attendance to view the global analytics." 
          />
        </Card>
      ) : (
        <>
          {/* Main Chart */}
          <div className="h-[400px]">
            <ChartContainer title="Recent Attendance Trends">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metrics.weeklyAttendanceData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(27, 37, 65, 0.08)" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#8A8B9E' }} dy={10} />
                  <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#8A8B9E' }} />
                  <Tooltip
                    cursor={{ fill: 'rgba(27, 37, 65, 0.04)' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 12px 36px -12px rgba(27, 37, 65, 0.1)' }}
                  />
                  <Bar dataKey="attendance" name="Attendance %" fill="#1E2B59" fillOpacity={0.85} radius={[6, 6, 6, 6]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Tables Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Classes with Low Attendance Table */}
            <Card noPadding>
              <div className="p-6 border-b border-border-subtle bg-paper-light">
                <h3 className="font-semibold text-navy">Classes with Low Attendance (&lt; 85%)</h3>
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
                    {metrics.lowAttendanceClasses.length === 0 ? (
                      <tr><td colSpan="2" className="p-6 text-center text-text-secondary">All classes have good attendance!</td></tr>
                    ) : metrics.lowAttendanceClasses.map((item, idx) => (
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
                    {metrics.studentsBelow75List.length === 0 ? (
                      <tr><td colSpan="3" className="p-6 text-center text-text-secondary">No students are currently below 75% attendance.</td></tr>
                    ) : metrics.studentsBelow75List.slice(0, 10).map((item, idx) => (
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
        </>
      )}
    </div>
  );
};

export default Attendance;
