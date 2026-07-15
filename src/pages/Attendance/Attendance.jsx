import { Calendar, ChevronDown, Check, X } from 'lucide-react';
import { dummyStudents } from '../../data/mockData';
import PageWrapper from '../../components/common/PageWrapper';

const Attendance = () => {
  const [cls, setCls] = useState('8-A');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Dummy local state to toggle attendance
  const [attendance, setAttendance] = useState(
    dummyStudents.filter(s => s.cls === '8' && s.section === 'A').reduce((acc, st) => ({ ...acc, [st.id]: 'Present' }), {})
  );

  const studentsInClass = dummyStudents.filter(s => `${s.cls}-${s.section}` === cls);

  const markStatus = (id, status) => {
    setAttendance(prev => ({ ...prev, [id]: status }));
  };

  return (
    <PageWrapper className="w-full pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-navy tracking-tight mb-2">Mark Attendance</h1>
          <p className="text-sm font-medium text-text-secondary">Record daily presence for your assigned sections.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="btn-outline w-full sm:w-auto">Save Draft</button>
          <button className="btn-primary w-full sm:w-auto">Submit</button>
        </div>
      </div>

      <div className="card-glass p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-end gap-6">
           <div className="w-full md:w-1/3">
             <label className="block text-[12px] font-bold text-navy uppercase tracking-wider mb-2 ml-1">Select Class & Section</label>
             <div className="relative">
               <select 
                 className="input-tactile w-full h-[46px] appearance-none cursor-pointer"
                 value={cls}
                 onChange={(e) => setCls(e.target.value)}
               >
                 <option value="8-A">Class 8 - Section A (Math)</option>
                 <option value="8-B">Class 8 - Section B (Math)</option>
                 <option value="9-A">Class 9 - Section A (Math)</option>
               </select>
               <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
             </div>
           </div>
           
           <div className="w-full md:w-1/3">
             <label className="block text-[12px] font-bold text-navy uppercase tracking-wider mb-2 ml-1">Date</label>
             <div className="relative">
               <input 
                 type="date" 
                 className="input-tactile w-full h-[46px] cursor-pointer"
                 value={date}
                 onChange={(e) => setDate(e.target.value)}
               />
               <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
             </div>
           </div>
        </div>
      </div>

      <div className="card-glass overflow-x-auto pb-4">
        <div className="flex flex-col sm:flex-row items-center justify-between p-6 pb-4 border-b border-border-subtle/50 mb-2 gap-4">
           <h3 className="text-[15px] font-bold text-navy">Student Roster</h3>
           <div className="flex items-center gap-4 text-[12px] font-bold">
              <span className="flex items-center gap-1.5 text-success"><div className="w-2 h-2 rounded-full bg-success"/> Present</span>
              <span className="flex items-center gap-1.5 text-danger"><div className="w-2 h-2 rounded-full bg-danger"/> Absent</span>
           </div>
        </div>
        
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="uppercase text-[11px] font-bold text-text-muted tracking-wider">
              <th className="p-4 pl-6 w-24 border-b border-border-subtle/30">Roll No</th>
              <th className="p-4 border-b border-border-subtle/30">Student Name</th>
              <th className="p-4 text-center border-b border-border-subtle/30 w-48">Status</th>
            </tr>
          </thead>
          <tbody>
            {studentsInClass.map((st) => (
              <tr key={st.id} className="border-b border-border-subtle/20 hover:bg-white/40 transition-colors">
                <td className="p-4 pl-6 text-sm font-bold text-text-secondary">#{st.roll}</td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#E5E0DA] flex items-center justify-center text-[9px] font-bold text-navy">
                      {st.img}
                    </div>
                    <span className="text-[14px] font-bold text-navy">{st.name}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2 bg-paper-light border border-border-subtle p-1 rounded-[10px]">
                    <button 
                      onClick={() => markStatus(st.id, 'Present')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        attendance[st.id] === 'Present' ? 'bg-success text-white shadow-sm' : 'text-text-muted hover:bg-black/5'
                      }`}
                    >
                      <Check size={14} /> Present
                    </button>
                    <button 
                      onClick={() => markStatus(st.id, 'Absent')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        attendance[st.id] === 'Absent' ? 'bg-danger text-white shadow-sm' : 'text-text-muted hover:bg-black/5'
                      }`}
                    >
                      <X size={14} /> Absent
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {studentsInClass.length === 0 && (
          <div className="flex flex-col items-center justify-center p-16 text-text-muted">
             <div className="w-16 h-16 rounded-2xl bg-paper-light flex items-center justify-center mb-4 border border-border-subtle/50">
                <Check size={28} className="text-text-secondary" />
             </div>
             <p className="font-bold text-navy text-lg mb-1">No students found</p>
             <p className="font-medium text-sm">Please select a different class or section.</p>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Attendance;
