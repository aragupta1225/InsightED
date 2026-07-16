import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Target, Trophy, AlertCircle, TrendingUp } from 'lucide-react';
import Card from '../../components/common/Card';
import StatCard from '../../components/common/StatCard';
import ChartContainer from '../../components/common/ChartContainer';
import { performanceOverview, mockClasses, subjectPerformance, academicSupportStudents } from '../../data/mockData';

const Performance = () => {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-navy mb-2">Performance Overview</h1>
        <p className="text-text-secondary">Track academic progress and identify areas for improvement.</p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="School Average Score" value={`${performanceOverview.schoolAverage}%`} icon={Target} color="pink" />
        <StatCard title="Top Performing Class" value={performanceOverview.topClass} icon={Trophy} color="green" />
        <StatCard title="Classes Needing Attention" value={performanceOverview.classesNeedingAttention} icon={AlertCircle} color="brown" />
        <StatCard title="Improvement (Last Exam)" value={performanceOverview.improvementSinceLast} icon={TrendingUp} trend="up" color="blue" />
      </div>

      {/* Main Chart */}
      <div className="h-[400px]">
        <ChartContainer title="Class-wise Average Scores">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockClasses} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(27, 37, 65, 0.08)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#8A8B9E' }} dy={10} />
              <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#8A8B9E' }} />
              <Tooltip
                cursor={{ fill: 'rgba(27, 37, 65, 0.04)' }}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 12px 36px -12px rgba(27, 37, 65, 0.1)' }}
              />
              <Bar dataKey="avgMarks" name="Average Marks %" fill="#E89BAA" radius={[6, 6, 6, 6]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Subject Performance Table */}
        <Card noPadding>
          <div className="p-6 border-b border-border-subtle bg-paper-light">
            <h3 className="font-semibold text-navy">Subject Performance</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border-subtle bg-paper/50">
                  <th className="px-6 py-4 font-semibold text-text-secondary text-sm">Subject</th>
                  <th className="px-6 py-4 font-semibold text-text-secondary text-sm text-right">Average Marks (%)</th>
                </tr>
              </thead>
              <tbody>
                {subjectPerformance.map((item, idx) => (
                  <tr key={idx} className="border-b border-border-subtle last:border-none hover:bg-paper-light transition-colors">
                    <td className="px-6 py-4 font-semibold text-navy">{item.subject}</td>
                    <td className="px-6 py-4 font-bold text-navy text-right">{item.avgMarks}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Students Needing Academic Support Table */}
        <Card noPadding>
          <div className="p-6 border-b border-border-subtle bg-paper-light flex items-center gap-2">
            <AlertCircle size={20} className="text-danger" />
            <h3 className="font-semibold text-navy">Students Needing Academic Support</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border-subtle bg-paper/50">
                  <th className="px-6 py-4 font-semibold text-text-secondary text-sm">Student</th>
                  <th className="px-6 py-4 font-semibold text-text-secondary text-sm">Class</th>
                  <th className="px-6 py-4 font-semibold text-text-secondary text-sm text-right">Marks</th>
                </tr>
              </thead>
              <tbody>
                {academicSupportStudents.map((item, idx) => (
                  <tr key={idx} className="border-b border-border-subtle last:border-none hover:bg-paper-light transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-navy">{item.name}</p>
                      <p className="text-xs text-text-secondary mt-1">{item.reason}</p>
                    </td>
                    <td className="px-6 py-4 font-medium text-navy">{item.class}</td>
                    <td className="px-6 py-4 font-bold text-danger text-right">{item.marks}%</td>
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

export default Performance;
