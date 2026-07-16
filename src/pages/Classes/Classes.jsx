import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Users, Search, AlertTriangle } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { mockClasses } from '../../data/mockData';

const Classes = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-navy mb-2">My Classes</h1>
          <p className="text-text-secondary">Select a class to view details, students, and performance.</p>
        </div>
        
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
          <input 
            type="text" 
            placeholder="Search student" 
            className="input-tactile pl-12"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockClasses.map((cls) => (
          <Card key={cls.id} hover className="flex flex-col cursor-pointer group" onClick={() => navigate(`/classes/${cls.id}`)}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-navy-muted/10 text-navy flex items-center justify-center">
                <Users size={24} />
              </div>
              <Button variant="ghost" className="p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gold-light/50 text-gold">
                <ChevronRight size={20} />
              </Button>
            </div>
            
            <h2 className="text-2xl font-bold text-navy mb-1">{cls.name}-{cls.section}</h2>
            <p className="text-sm text-text-secondary mb-6">{cls.studentsCount} Students</p>
            
            <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-border-subtle">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-text-secondary">Avg Attendance</span>
                <span className="font-bold text-navy">{cls.avgAttendance}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-text-secondary flex items-center gap-1">
                  {cls.studentsNeedingSupport > 0 && <AlertTriangle size={14} className="text-danger" />}
                  Needing Support
                </span>
                <span className={`font-bold ${cls.studentsNeedingSupport > 0 ? 'text-danger' : 'text-success'}`}>
                  {cls.studentsNeedingSupport}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Classes;
