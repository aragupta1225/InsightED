import React from 'react';
import { Users, GraduationCap, AlertTriangle, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import StatCard from '../../components/common/StatCard';
import ChartContainer from '../../components/common/ChartContainer';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';
import { mockKpiData, mockAttendanceTrends, mockPerformanceData, mockRecentInterventions } from '../../data/mockData';

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-navy mb-2">Platform Overview</h1>
        <p className="text-text-secondary">Welcome back, Dr. Jenkins. Here is what's happening today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title={mockKpiData[0].title} value={mockKpiData[0].value} change={mockKpiData[0].change} trend={mockKpiData[0].trend} icon={Users} />
        <StatCard title={mockKpiData[1].title} value={mockKpiData[1].value} change={mockKpiData[1].change} trend={mockKpiData[1].trend} icon={TrendingUp} />
        <StatCard title={mockKpiData[2].title} value={mockKpiData[2].value} change={mockKpiData[2].change} trend={mockKpiData[2].trend} icon={AlertTriangle} />
        <StatCard title={mockKpiData[3].title} value={mockKpiData[3].value} change={mockKpiData[3].change} trend={mockKpiData[3].trend} icon={GraduationCap} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Attendance Trends">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockAttendanceTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1B2541" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#1B2541" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(27, 37, 65, 0.08)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#8A8B9E', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8A8B9E', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 12px 36px -12px rgba(27, 37, 65, 0.1)' }}
              />
              <Area type="monotone" dataKey="attendance" stroke="#1B2541" strokeWidth={3} fillOpacity={1} fill="url(#colorAttendance)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Average Performance by Subject">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(27, 37, 65, 0.08)" />
              <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{ fill: '#8A8B9E', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8A8B9E', fontSize: 12 }} />
              <Tooltip
                cursor={{ fill: 'rgba(27, 37, 65, 0.04)' }}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 12px 36px -12px rgba(27, 37, 65, 0.1)' }}
              />
              <Bar dataKey="avgScore" fill="#C89B3C" radius={[6, 6, 6, 6]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-navy">Recent Interventions</h3>
            <Button variant="ghost" className="text-sm">View All</Button>
          </div>
          <div className="flex flex-col gap-4">
            {mockRecentInterventions.map((intervention) => (
              <div key={intervention.id} className="flex items-center justify-between p-4 rounded-[16px] bg-paper-light border border-border-subtle group hover:border-gold/30 transition-colors">
                <div className="flex items-center gap-4">
                  <Avatar name={intervention.student} size="md" />
                  <div>
                    <h4 className="font-semibold text-navy">{intervention.student}</h4>
                    <p className="text-sm text-text-secondary">{intervention.action}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-text-muted">{intervention.date}</span>
                  <Badge variant={intervention.status === 'Completed' ? 'success' : 'warning'}>
                    {intervention.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="flex flex-col">
          <h3 className="text-lg font-semibold text-navy mb-6">Quick Actions</h3>
          <div className="flex flex-col gap-3 flex-1">
            <Button variant="outline" className="justify-start">Generate School Report</Button>
            <Button variant="outline" className="justify-start">Schedule Parent Meeting</Button>
            <Button variant="outline" className="justify-start">Review At-Risk Students</Button>
            <Button variant="primary" className="mt-auto">Send Announcements</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
