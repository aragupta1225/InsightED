import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Target, Trophy, AlertCircle } from 'lucide-react';
import Card from '../../components/common/Card';
import StatCard from '../../components/common/StatCard';
import ChartContainer from '../../components/common/ChartContainer';
import EmptyState from '../../components/common/EmptyState';
import useAnalytics from '../../hooks/useAnalytics';

const Performance = () => {
  const { getGlobalMetrics, getGlobalPerformanceMetrics } = useAnalytics();
  const globalMetrics = getGlobalMetrics();
  const metrics = getGlobalPerformanceMetrics();

  const sortedClasses = [...metrics.classAverages].sort((a, b) => b.avgMarks - a.avgMarks);
  const bestClass = sortedClasses.length > 0 ? sortedClasses[0].name : 'N/A';

  return (
    <div className="flex flex-col gap-8">
      <div className="mb-4">
        <h1 className="text-4xl font-serif text-navy mb-3">Performance Overview</h1>
        <p className="text-text-secondary text-lg">Track academic progress and identify areas for improvement.</p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        <StatCard title="School Average Score" value={`${globalMetrics.schoolAvgMarks}%`} icon={Target} color="pink" />
        <StatCard title="Top Performing Class" value={bestClass} icon={Trophy} color="blue" />
        <StatCard title="Classes Needing Attention" value={globalMetrics.classesNeedingAttention} icon={AlertCircle} color="pink" />
      </div>

      {sortedClasses.length === 0 ? (
        <Card className="mt-4 flex flex-col items-center">
          <EmptyState 
            title="No Performance Data Found" 
            description="Please import test marks to view the global performance analytics." 
          />
        </Card>
      ) : (
        <>
          {/* Main Chart */}
          <div className="h-[400px]">
            <ChartContainer title="Class-wise Average Scores">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sortedClasses} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(27, 37, 65, 0.08)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#8A8B9E' }} dy={10} />
                  <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#8A8B9E' }} />
                  <Tooltip
                    cursor={{ fill: 'rgba(27, 37, 65, 0.04)' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 12px 36px -12px rgba(27, 37, 65, 0.1)' }}
                  />
                  <Bar dataKey="avgMarks" name="Average Marks %" fill="#E89BAA" fillOpacity={0.85} radius={[6, 6, 6, 6]} barSize={40} />
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
                    {metrics.subjectPerformance.length === 0 ? (
                      <tr><td colSpan="2" className="p-6 text-center text-text-secondary">No subjects recorded</td></tr>
                    ) : metrics.subjectPerformance.map((item, idx) => (
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
                    {metrics.academicSupportStudents.length === 0 ? (
                      <tr><td colSpan="3" className="p-6 text-center text-text-secondary">No students flagged</td></tr>
                    ) : metrics.academicSupportStudents.map((item, idx) => (
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
        </>
      )}
    </div>
  );
};

export default Performance;
