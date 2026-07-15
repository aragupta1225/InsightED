const students = [
  { id: 1, name: 'Rohan Verma', cls: 'Class 8-A', att: '62%', perf: '38%', risk: 'High' },
  { id: 2, name: 'Kavya Singh', cls: 'Class 8-B', att: '68%', perf: '42%', risk: 'High' },
  { id: 3, name: 'Arjun Mehta', cls: 'Class 9-A', att: '71%', perf: '46%', risk: 'Medium' },
  { id: 4, name: 'Priyanshi Das', cls: 'Class 9-A', att: '72%', perf: '48%', risk: 'Medium' },
  { id: 5, name: 'Ishaan Khan', cls: 'Class 8-C', att: '74%', perf: '50%', risk: 'Medium' },
];

const StudentRiskList = () => {
  return (
    <div className="card-glass p-6 w-full flex flex-col h-[340px]">
      <div className="flex items-center justify-between mb-4 border-b border-border-subtle pb-3">
        <h2 className="text-[16px] font-bold text-navy">Students at Risk</h2>
        <button className="text-[12px] font-bold text-navy flex items-center gap-1 bg-white/50 border border-border-subtle rounded-lg px-3 py-1 hover:bg-white transition-colors">
          View all
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] text-[10px] uppercase tracking-wider font-bold text-text-muted mb-3 px-2">
          <span>Student</span>
          <span className="text-center">Attendance</span>
          <span className="text-center">Performance</span>
          <span className="text-right pr-2">Risk</span>
        </div>

        <div className="space-y-1">
          {students.map((st) => (
            <div key={st.id} className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center py-2.5 px-2 rounded-xl hover:bg-white/60 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold-light" />
                <div>
                  <p className="text-[13px] font-bold text-navy leading-tight">{st.name}</p>
                  <p className="text-[11px] text-text-muted mt-0.5">{st.cls}</p>
                </div>
              </div>
              <div className="text-[13px] font-bold text-danger text-center">{st.att}</div>
              <div className="text-[13px] font-bold text-danger text-center">{st.perf}</div>
              <div className="flex justify-end">
                <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                  st.risk === 'High' ? 'bg-danger-light text-danger' : 'bg-warning-light text-warning'
                }`}>
                  {st.risk}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentRiskList;
