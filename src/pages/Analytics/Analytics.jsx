import React from 'react';
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Card from '../../components/common/Card';
import ChartContainer from '../../components/common/ChartContainer';

const Analytics = () => {
  const data = [
    { name: 'Week 1', attendance: 92, performance: 78, assignments: 85 },
    { name: 'Week 2', attendance: 94, performance: 82, assignments: 88 },
    { name: 'Week 3', attendance: 88, performance: 80, assignments: 76 },
    { name: 'Week 4', attendance: 96, performance: 86, assignments: 92 },
    { name: 'Week 5', attendance: 95, performance: 88, assignments: 90 },
    { name: 'Week 6', attendance: 97, performance: 90, assignments: 94 },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-navy mb-2">Institution Analytics</h1>
        <p className="text-text-secondary">Deep dive into performance metrics and historic trends.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-navy mb-6">Cross-Metric Correlation</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(27, 37, 65, 0.08)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#8A8B9E' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8A8B9E' }} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 12px 36px -12px rgba(27, 37, 65, 0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="assignments" name="Assignments Completion %" barSize={20} fill="#1B2541" radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="attendance" name="Attendance %" stroke="#C89B3C" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="performance" name="Performance Score" stroke="#357AD5" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="flex flex-col gap-6">
          <Card className="flex-1 flex flex-col justify-center">
            <h4 className="text-text-secondary text-sm font-medium mb-1">Strongest Correlation</h4>
            <p className="text-2xl font-bold text-navy mb-2">Attendance & Performance</p>
            <p className="text-sm text-text-muted">A 0.84 correlation coefficient suggests high impact of attendance on final grades.</p>
          </Card>
          
          <Card className="flex-1 flex flex-col justify-center">
            <h4 className="text-text-secondary text-sm font-medium mb-1">Critical Drop Alert</h4>
            <p className="text-2xl font-bold text-danger mb-2">Week 3 Assignments</p>
            <p className="text-sm text-text-muted">Completion rate dropped by 12% likely due to the flu outbreak.</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
