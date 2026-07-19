import React, { useState, useRef, useEffect } from 'react';
import { Bell, Menu, AlertCircle } from 'lucide-react';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import { teacherData } from '../../data/mockData';
import useStudentStore from '../../store/studentStore';
import useAnalytics from '../../hooks/useAnalytics';
const Topbar = ({ onMenuClick }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [globalProfilePic, setGlobalProfilePic] = useState(() => localStorage.getItem('profilePic') || null);
  const dropdownRef = useRef(null);

  const students = useStudentStore(state => state.students);
  const { getClassMetrics, getStudentMetrics } = useAnalytics();

  let attentionStudents = [];
  const uniqueClassesList = Array.from(new Set(students.filter(s => s.class && s.section).map(s => `${s.class}-${s.section}`)));
  uniqueClassesList.forEach(classKey => {
    const metrics = getClassMetrics(classKey);
    
    if (metrics.studentsNeedingAttention && metrics.studentsNeedingAttention.length > 0) {
      attentionStudents = [
        ...attentionStudents,
        ...metrics.studentsNeedingAttention.map(s => {
          const studentMetrics = getStudentMetrics(s.studentId || s.id, classKey);
          const lowAtt = studentMetrics.attendance !== null && studentMetrics.attendance < 75;
          const lowMarks = studentMetrics.avgMarks !== null && studentMetrics.avgMarks < 50;
          
          let dynamicReason = 'Needs Support';
          if (lowAtt && lowMarks) dynamicReason = 'Low attendance and low performance';
          else if (lowAtt) dynamicReason = 'Attendance below 75%';
          else if (lowMarks) dynamicReason = 'Average score below 50%';

          return {
            name: s.name,
            class: classKey,
            reason: dynamicReason
          };
        })
      ];
    }
  });

  useEffect(() => {
    const handleProfileUpdate = () => {
      setGlobalProfilePic(localStorage.getItem('profilePic'));
    };
    window.addEventListener('profileUpdated', handleProfileUpdate);
    return () => window.removeEventListener('profileUpdated', handleProfileUpdate);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="h-[90px] flex items-center justify-between sticky top-0 bg-transparent backdrop-blur-md z-10 -mx-4 px-4 md:-mx-8 md:px-8 mb-8 border-b border-transparent">
      
      <button 
        onClick={onMenuClick}
        className="lg:hidden p-2 text-text-secondary hover:text-navy hover:bg-paper-light rounded-xl transition-colors"
      >
        <Menu size={24} />
      </button>

      {/* Spacer to push right content if menu button is shown */}
      <div className="flex-1 hidden lg:block"></div>

      <div className="flex items-center gap-4 md:gap-6 ml-auto">
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-2 rounded-xl transition-colors ${showNotifications ? 'bg-paper-light text-navy' : 'text-text-secondary hover:text-navy hover:bg-paper-light'}`}
          >
            <Bell size={24} />
            {attentionStudents.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-danger rounded-full border-2 border-paper"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-4 w-[380px] bg-white rounded-2xl border border-white shadow-[0_12px_40px_rgba(31,38,135,0.1)] z-50 overflow-hidden origin-top-right animate-in fade-in zoom-in-95 duration-200">
              <div className="p-4 border-b border-border-subtle bg-paper-light flex items-center gap-2">
                <AlertCircle size={20} className="text-danger" />
                <h3 className="font-semibold text-navy">Notifications</h3>
              </div>
              <div className="flex flex-col max-h-[400px] overflow-y-auto p-2">
                {attentionStudents.length === 0 ? (
                  <div className="p-4 text-center text-sm text-text-muted">No new notifications.</div>
                ) : (
                  attentionStudents.map((student, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 hover:bg-paper-light rounded-xl transition-colors border-b border-border-subtle/30 last:border-0 cursor-default">
                      <Avatar name={student.name} size="sm" className="shrink-0 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-navy">{student.name} <span className="font-normal text-text-muted text-xs ml-1">({student.class})</span></span>
                        <span className="text-[13px] text-navy font-medium mt-0.5 leading-relaxed">{student.reason}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="h-8 w-px bg-border-subtle hidden md:block"></div>

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-navy">{teacherData.name}</p>
            <p className="text-xs text-text-secondary">{teacherData.role}</p>
          </div>
          <div className="relative">
            <Avatar name={teacherData.name} url={globalProfilePic} size="md" className="group-hover:ring-2 ring-gold transition-all" />
            <Badge variant="success" className="absolute -bottom-1 -right-1 w-4 h-4 !p-0 border-2 border-white text-[0px]">Active</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
