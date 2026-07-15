import { TriangleAlert, CopyCheck, Star, TrendingUp } from 'lucide-react';

const insights = [
  {
    icon: TriangleAlert,
    bg: 'bg-danger-light',
    color: 'text-danger',
    text: '5 students have attendance below 75%.',
    subtext: 'Consider reaching out to parents.'
  },
  {
    icon: CopyCheck,
    bg: 'bg-warning-light',
    color: 'text-warning',
    text: '3 students scored below 40% in Mathematics.',
    subtext: 'Suggested: Extra practice and doubt sessions.'
  },
  {
    icon: Star,
    bg: 'bg-success-light',
    color: 'text-success',
    text: '12 students improved their performance this month.',
    subtext: 'Great job! Keep encouraging them.'
  },
  {
    icon: TrendingUp,
    bg: 'bg-info-light',
    color: 'text-info',
    text: 'Class 8-A has the highest attendance this week.',
    subtext: 'Excellent work by the class!'
  }
];

const InsightList = () => {
  return (
    <div className="card-glass p-6 w-full h-[360px] flex flex-col">
      <div className="flex items-center justify-between mb-4 border-b border-border-subtle pb-3">
        <h2 className="text-[16px] font-bold text-navy">Learning Insights</h2>
        <button className="text-[12px] font-bold text-navy flex items-center gap-1 bg-white/50 border border-border-subtle rounded-lg px-3 py-1 hover:bg-white transition-colors">
          View all
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4 pt-2">
         {insights.map((ins, i) => (
           <div key={i} className="flex gap-4 group cursor-pointer">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-1 ${ins.bg} group-hover:scale-105 transition-transform`}>
                 <ins.icon size={16} className={ins.color} strokeWidth={2.5} />
              </div>
              <div className="flex-1 border-b border-border-subtle/40 pb-4 group-last:border-0 group-last:pb-0 flex justify-between items-center">
                 <div>
                    <h4 className="text-[13px] font-bold text-navy leading-tight">{ins.text}</h4>
                    <p className="text-[11px] font-medium text-text-muted mt-1">{ins.subtext}</p>
                 </div>
                 <div className="text-border-subtle group-hover:text-gold transition-colors pl-2">
                    <span className="text-xl">&rsaquo;</span>
                 </div>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default InsightList;
