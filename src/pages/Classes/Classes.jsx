import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Users, Search, AlertTriangle } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import EmptyState from '../../components/common/EmptyState';
import Avatar from '../../components/common/Avatar';
import useStudentStore from '../../store/studentStore';
import useAnalytics from '../../hooks/useAnalytics';

const Classes = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const students = useStudentStore(state => state.students);
  const { getClassMetrics } = useAnalytics();

  const filteredStudents = students.filter(student => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const nameParts = (student.name || '').toLowerCase().split(' ');
    const nameMatches = nameParts.some(part => part.startsWith(query));
    const rollNoMatches = String(student.rollNo || '').startsWith(searchQuery);
    return nameMatches || rollNoMatches;
  });

  const classMap = {};
  students.forEach(student => {
    if (!student.class || !student.section) return;
    const classKey = `${student.class}-${student.section}`;
    if (!classMap[classKey]) {
      classMap[classKey] = {
        id: classKey,
        name: student.class,
        section: student.section,
        studentsCount: 0,
        avgAttendance: 0,
        avgMarks: 0,
        studentsNeedingSupport: 0
      };
    }
    classMap[classKey].studentsCount++;
  });
  
  const dynamicClasses = Object.values(classMap).map(cls => {
    const metrics = getClassMetrics(cls.id);
    return {
      ...cls,
      avgAttendance: metrics.avgAttendance,
      avgMarks: metrics.avgMarks,
      studentsNeedingSupport: metrics.studentsNeedingAttention.length
    };
  }).sort((a, b) => a.id.localeCompare(b.id));

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
        <div>
          <h1 className="text-4xl font-serif text-navy mb-3">Classes</h1>
          <p className="text-text-secondary text-lg">Manage all classes and track their overall performance metrics.</p>
        </div>
        
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
          <input 
            type="text" 
            placeholder="Search students" 
            className="input-tactile pl-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {students.length === 0 ? (
        <Card className="mt-8">
          <EmptyState title="No Data Found" description="Please import student data to view and manage classes." />
        </Card>
      ) : searchQuery ? (
        filteredStudents.length === 0 ? (
          <Card className="mt-8">
            <EmptyState title="No students found" description={`No student matches the search "${searchQuery}".`} />
          </Card>
        ) : (
          <Card className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-navy border-b border-border-subtle pb-3">Search Results</h3>
            <div className="flex flex-col gap-3">
              {filteredStudents.map(student => (
                <div key={student.studentId} onClick={() => navigate(`/student/${student.studentId}`)} className="flex items-center justify-between p-4 bg-paper-light border border-border-subtle rounded-xl hover:border-gold hover:bg-white cursor-pointer transition-all group">
                  <div className="flex items-center gap-4">
                    <Avatar name={student.name} size="md" />
                    <div>
                      <h4 className="font-bold text-navy group-hover:text-gold transition-colors">{student.name}</h4>
                      <p className="text-sm text-text-secondary">Class {student.class}-{student.section} • Roll No: {student.rollNo}</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-text-muted group-hover:text-gold transition-colors" />
                </div>
              ))}
            </div>
          </Card>
        )
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dynamicClasses.map((cls) => (
            <Card key={cls.id} hover className="flex flex-col cursor-pointer group" onClick={() => navigate(`/classes/${cls.id}`)}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-navy-muted/10 text-navy flex items-center justify-center shrink-0">
                  <Users size={24} />
                </div>
                <Button variant="ghost" className="p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gold-light/50 text-gold">
                  <ChevronRight size={20} />
                </Button>
              </div>
              
              <h2 className="text-2xl font-bold text-navy mb-1 line-clamp-1">{cls.name}-{cls.section}</h2>
              <p className="text-sm text-text-secondary mb-6">{cls.studentsCount} Students</p>
              
              <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-border-subtle">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-text-secondary">Avg Attendance</span>
                  <span className="font-bold text-navy">{cls.avgAttendance}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-text-secondary flex items-center gap-1">
                    {cls.studentsNeedingSupport > 0 && <AlertTriangle size={14} className="text-danger shrink-0" />}
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
      )}
    </div>
  );
};

export default Classes;
