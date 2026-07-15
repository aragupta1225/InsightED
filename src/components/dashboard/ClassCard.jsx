import { Users, MapPin } from 'lucide-react';

const ClassCard = ({ title, subject, students, room, att, perf }) => {
  return (
    <div className="card-glass p-5 flex flex-col justify-between">
      <div className="flex items-start gap-4 pb-4 border-b border-border-subtle">
        <div className="w-12 h-12 rounded-xl bg-gold-light flex items-center justify-center">
          <Users className="text-gold" size={24} strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-navy">{title}</h3>
          <p className="text-xs text-text-muted mt-0.5 font-medium">{subject}</p>
        </div>
      </div>

      <div className="flex items-center gap-6 mt-4 mb-5">
         <div className="flex items-center gap-2 text-xs text-text-secondary font-medium">
           <Users size={14} className="text-text-muted" /> {students} Students
         </div>
         <div className="flex items-center gap-1.5 text-xs text-text-secondary font-medium">
           <MapPin size={14} className="text-text-muted" /> {room}
         </div>
      </div>

      <div className="flex justify-between items-center bg-paper-light rounded-xl p-3 border border-border-subtle/50">
        <div className="text-center w-full">
           <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider mb-1">Attendance</p>
           <p className="text-sm font-extrabold text-success">{att}</p>
        </div>
        <div className="w-[1px] h-8 bg-border-subtle mx-2" />
        <div className="text-center w-full">
           <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider mb-1">Avg. Perf</p>
           <p className="text-sm font-extrabold text-success">{perf}</p>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
