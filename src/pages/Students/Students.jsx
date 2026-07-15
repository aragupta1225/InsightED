import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronRight } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';
import { mockStudents } from '../../data/mockData';

const Students = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState('all');

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = filterRisk === 'all' || student.risk === filterRisk;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-navy mb-2">Students Directory</h1>
          <p className="text-text-secondary">Manage and monitor student performance across the institution.</p>
        </div>
        <Button variant="primary">Add Student</Button>
      </div>

      <Card noPadding>
        <div className="p-6 border-b border-border-subtle flex flex-wrap gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
            <input 
              type="text" 
              placeholder="Search by student name or ID..." 
              className="input-tactile pl-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <Filter size={20} className="text-text-muted" />
            <select 
              className="input-tactile py-2 cursor-pointer appearance-none pr-10"
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
            >
              <option value="all">All Risk Levels</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="low">Low Risk</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-subtle bg-paper/50">
                <th className="px-6 py-4 font-semibold text-text-secondary text-sm">Student Name</th>
                <th className="px-6 py-4 font-semibold text-text-secondary text-sm">Grade</th>
                <th className="px-6 py-4 font-semibold text-text-secondary text-sm">Attendance</th>
                <th className="px-6 py-4 font-semibold text-text-secondary text-sm">GPA</th>
                <th className="px-6 py-4 font-semibold text-text-secondary text-sm">Risk Level</th>
                <th className="px-6 py-4 font-semibold text-text-secondary text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr 
                  key={student.id} 
                  className="border-b border-border-subtle last:border-none hover:bg-paper-light transition-colors group cursor-pointer"
                  onClick={() => navigate(`/students/${student.id}`)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={student.name} size="md" />
                      <div>
                        <p className="font-semibold text-navy">{student.name}</p>
                        <p className="text-xs text-text-muted">ID: STU-{student.id.padStart(4, '0')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-text-secondary font-medium">{student.grade}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-paper rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${student.attendance >= 90 ? 'bg-success' : student.attendance >= 80 ? 'bg-warning' : 'bg-danger'}`}
                          style={{ width: `${student.attendance}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-navy">{student.attendance}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-navy">{student.gpa.toFixed(1)}</td>
                  <td className="px-6 py-4">
                    <Badge variant={student.risk === 'high' ? 'danger' : student.risk === 'medium' ? 'warning' : 'success'}>
                      {student.risk.charAt(0).toUpperCase() + student.risk.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" className="opacity-0 group-hover:opacity-100 p-2">
                      <ChevronRight size={20} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredStudents.length === 0 && (
            <div className="p-12 text-center text-text-secondary">
              No students found matching your criteria.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Students;
