import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Target, Trophy, AlertCircle, TrendingUp } from 'lucide-react';
import Card from '../../components/common/Card';
import StatCard from '../../components/common/StatCard';
import ChartContainer from '../../components/common/ChartContainer';
import EmptyState from '../../components/common/EmptyState';
import useStudentStore from '../../store/studentStore';
import usePerformanceStore from '../../store/performanceStore';

const Performance = () => {
  const performanceTests = usePerformanceStore(state => state.tests);

  let totalMarks = 0;
  let totalMaxMarks = 0;
  let classAverages = {};

  Object.entries(performanceTests).forEach(([classSection, tests]) => {
    let classMarks = 0;
    let classMax = 0;
    Object.values(tests).forEach(test => {
      if (test.marks && test.marks.length > 0) {
        test.marks.forEach(m => {
          totalMarks += Number(m.marks) || 0;
          totalMaxMarks += Number(test.maxMarks) || 100;
          classMarks += Number(m.marks) || 0;
          classMax += Number(test.maxMarks) || 100;
        });
      }
    });
    if (classMax > 0) {
      classAverages[classSection] = (classMarks / classMax) * 100;
    }
  });

  const schoolAvg = totalMaxMarks > 0 ? Math.round((totalMarks / totalMaxMarks) * 100) : 0;
  let bestClass = 'N/A';
  let highest = -1;
  Object.entries(classAverages).forEach(([c, val]) => {
    if (val > highest) {
      highest = val;
      bestClass = c;
    }
  });
  return (
    <div className="flex flex-col gap-8">
      <div className="mb-4">
        <h1 className="text-4xl font-serif text-navy mb-3">Performance Overview</h1>
        <p className="text-text-secondary text-lg">Track academic progress and identify areas for improvement.</p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="School Average Score" value={`${schoolAvg}%`} icon={Target} color="pink" />
        <StatCard title="Top Performing Class" value={bestClass} icon={Trophy} color="blue" />
        <StatCard title="Classes Needing Attention" value={0} icon={AlertCircle} color="pink" />
        <StatCard title="Improvement (Last Exam)" value="N/A" icon={TrendingUp} color="blue" />
      </div>

      {/* Analytics Empty State */}
      <Card className="mt-4 flex flex-col items-center">
        <EmptyState 
          title="Global Analytics Under Construction" 
          description="Detailed global performance insights and charts will be available in a future update." 
        />
      </Card>
    </div>
  );
};

export default Performance;
