import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ChevronDown } from 'lucide-react';

const data = [
  { name: 'Mon', uv: 88 },
  { name: 'Tue', uv: 91 },
  { name: 'Wed', uv: 82 },
  { name: 'Thu', uv: 93 },
  { name: 'Fri', uv: 89 },
];

const AttendanceChart = () => {
  return (
    <div className="card-glass p-6 w-full h-[340px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[16px] font-bold text-navy">Attendance This Week</h2>
        <button className="text-[12px] font-bold text-navy flex items-center gap-1 bg-white/50 border border-border-subtle rounded-lg px-3 py-1 hover:bg-white transition-colors">
          This Week <ChevronDown size={14} />
        </button>
      </div>
      
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={26} margin={{ top: 20, right: 0, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(27,37,65,0.06)" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#8A8B9E', fontSize: 11, fontWeight: 600}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#8A8B9E', fontSize: 11, fontWeight: 600}} />
            <Tooltip 
              cursor={{fill: 'rgba(200, 155, 60, 0.05)'}}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px -10px rgba(27,37,65,0.1)' }}
            />
            <Bar dataKey="uv" radius={[6, 6, 6, 6]}>
              {
                data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="var(--color-gold)" />
                ))
              }
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AttendanceChart;
