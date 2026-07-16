import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, BarChart3, Users, CalendarCheck, BookOpen, Download, Upload, Plus, Save, Edit } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';
import ChartContainer from '../../components/common/ChartContainer';
import ReportModal from '../../components/common/ReportModal';
import { mockClasses, mockStudents, subjectPerformance } from '../../data/mockData';

const ClassDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isReportOpen, setIsReportOpen] = useState(false);
  
  const classDetails = mockClasses.find(c => c.id === id) || mockClasses[0];
  const students = mockStudents.filter(s => s.classId === id);

  // Simple mock data for the bar chart
  const chartData = [
    { name: classDetails.name, attendance: classDetails.avgAttendance, avgScore: classDetails.avgMarks }
  ];

  const generatedDate = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  // --- TEST MANAGEMENT STATE ---
  const [testState, setTestState] = useState('setup'); // setup, entry, preview, saved
  const [testForm, setTestForm] = useState({ name: '', subject: '', maxMarks: 100, date: '' });
  const [testMarks, setTestMarks] = useState([]); // Array of { id, rollNo, name, marks }
  const [testInsights, setTestInsights] = useState(null);

  const handleTestSetupSubmit = (e) => {
    e.preventDefault();
    if(testForm.name && testForm.subject && testForm.date) {
      setTestState('entry');
    }
  };

  const simulateExcelUpload = () => {
    // Simulate parsing an excel file that maps to our students
    const uploadedData = students.map(s => ({
      id: s.id,
      rollNo: s.rollNo,
      name: s.name,
      marks: Math.floor(Math.random() * 41) + 60 // Random marks between 60-100 for simulation
    }));
    setTestMarks(uploadedData);
    setTestState('preview');
  };

  const saveMarks = () => {
    // Calculate insights
    const marksArr = testMarks.map(t => Number(t.marks));
    const avg = (marksArr.reduce((a,b) => a+b, 0) / marksArr.length).toFixed(1);
    const max = Math.max(...marksArr);
    const min = Math.min(...marksArr);
    const below40 = testMarks.filter(t => (Number(t.marks) / testForm.maxMarks) * 100 < 40).length;

    setTestInsights({ avg, max, min, below40 });
    setTestState('saved');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
    { id: 'tests', label: 'Tests', icon: BookOpen },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/classes')}
            className="p-2 bg-paper-light border border-border-subtle rounded-xl hover:bg-white hover:border-gold transition-all"
          >
            <ArrowLeft size={20} className="text-navy" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-navy mb-1">{classDetails.name}-{classDetails.section} Details</h1>
            <p className="text-text-secondary">Comprehensive overview of class performance and roster.</p>
          </div>
        </div>
        <Button variant="outline" className="flex items-center gap-2" onClick={() => setIsReportOpen(true)}>
          <Download size={18} /> Download Class Report PDF
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-border-subtle">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-semibold transition-all ${
                isActive 
                  ? 'bg-paper-light border-x border-t border-border-subtle text-navy shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]' 
                  : 'text-text-secondary hover:text-navy hover:bg-paper-light/50'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-gold' : ''} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 flex flex-col gap-6">
              <Card className="flex flex-col gap-4">
                <h3 className="font-semibold text-navy border-b border-border-subtle pb-2">Class Snapshot</h3>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Avg Attendance</span>
                  <span className="font-bold text-navy">{classDetails.avgAttendance}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Avg Test Score</span>
                  <span className="font-bold text-navy">{classDetails.avgMarks}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Students Needing Support</span>
                  <span className="font-bold text-danger">{classDetails.studentsNeedingSupport}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Top Performer</span>
                  <span className="font-bold text-gold">{classDetails.topPerformer}</span>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <ChartContainer title="Attendance vs Average Score">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(27, 37, 65, 0.08)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#8A8B9E' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8A8B9E' }} />
                    <Tooltip cursor={{ fill: 'rgba(27, 37, 65, 0.04)' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 12px 36px -12px rgba(27, 37, 65, 0.1)' }} />
                    <Legend iconType="circle" />
                    <Bar dataKey="attendance" name="Attendance %" fill="#1B2541" radius={[4, 4, 0, 0]} barSize={60} />
                    <Bar dataKey="avgScore" name="Avg Score %" fill="#C89B3C" radius={[4, 4, 0, 0]} barSize={60} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        )}

        {/* STUDENTS TAB */}
        {activeTab === 'students' && (
          <Card noPadding>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border-subtle bg-paper/50">
                    <th className="px-6 py-4 font-semibold text-text-secondary text-sm w-24">Roll No</th>
                    <th className="px-6 py-4 font-semibold text-text-secondary text-sm">Name</th>
                    <th className="px-6 py-4 font-semibold text-text-secondary text-sm">Attendance %</th>
                    <th className="px-6 py-4 font-semibold text-text-secondary text-sm">Avg Score</th>
                    <th className="px-6 py-4 font-semibold text-text-secondary text-sm">Status</th>
                    <th className="px-6 py-4 font-semibold text-text-secondary text-sm text-right">View</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr 
                      key={student.id} 
                      className="border-b border-border-subtle last:border-none hover:bg-paper-light transition-colors cursor-pointer group"
                      onClick={() => navigate(`/student/${student.id}`)}
                    >
                      <td className="px-6 py-4 font-semibold text-navy">{student.rollNo}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={student.name} size="sm" />
                          <span className="font-bold text-navy">{student.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-navy">{student.attendance}%</td>
                      <td className="px-6 py-4 font-medium text-navy">{student.marks}</td>
                      <td className="px-6 py-4">
                        <Badge variant={student.status === 'Needs Support' ? 'danger' : student.status === 'Excellent' ? 'success' : 'info'}>
                          {student.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" className="p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronRight size={20} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {students.length === 0 && (
                    <tr>
                      <td colSpan="6" className="p-12 text-center text-text-secondary">
                        No students found in this class.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* TESTS TAB (TEST MANAGEMENT) */}
        {activeTab === 'tests' && (
          <div className="flex flex-col gap-6">
            
            {/* Step 1: Setup Form */}
            {testState === 'setup' && (
              <Card>
                <h3 className="text-xl font-bold text-navy mb-4">Create New Test</h3>
                <form onSubmit={handleTestSetupSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text-secondary">Test Name</label>
                    <input required type="text" placeholder="e.g. Mid Term Exam" className="input-tactile" value={testForm.name} onChange={e => setTestForm({...testForm, name: e.target.value})} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text-secondary">Subject</label>
                    <input required type="text" placeholder="e.g. Mathematics" className="input-tactile" value={testForm.subject} onChange={e => setTestForm({...testForm, subject: e.target.value})} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text-secondary">Date</label>
                    <input required type="date" className="input-tactile" value={testForm.date} onChange={e => setTestForm({...testForm, date: e.target.value})} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text-secondary">Maximum Marks</label>
                    <input required type="number" min="1" className="input-tactile" value={testForm.maxMarks} onChange={e => setTestForm({...testForm, maxMarks: e.target.value})} />
                  </div>
                  <div className="md:col-span-2 flex justify-end">
                    <Button type="submit" variant="primary">Proceed to Data Entry</Button>
                  </div>
                </form>
              </Card>
            )}

            {/* Step 2: Data Entry Upload */}
            {testState === 'entry' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-gold hover:bg-gold-light/20 cursor-pointer transition-colors" onClick={simulateExcelUpload}>
                  <Upload size={48} className="text-gold mb-4" />
                  <h3 className="text-lg font-bold text-navy mb-2">Upload Excel Sheet</h3>
                  <p className="text-sm text-text-secondary">Format: Roll No, Student Name, Marks</p>
                </Card>
                <Card className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-navy hover:bg-navy/5 cursor-pointer transition-colors" onClick={() => {
                  setTestMarks(students.map(s => ({ id: s.id, rollNo: s.rollNo, name: s.name, marks: '' })));
                  setTestState('preview');
                }}>
                  <Plus size={48} className="text-navy mb-4" />
                  <h3 className="text-lg font-bold text-navy mb-2">Manual Entry</h3>
                  <p className="text-sm text-text-secondary">Enter marks directly into the system</p>
                </Card>
              </div>
            )}

            {/* Step 3 & 4: Preview and Saved View */}
            {(testState === 'preview' || testState === 'saved') && (
              <div className="flex flex-col gap-6">
                
                {/* Insights Header when Saved */}
                {testState === 'saved' && testInsights && (
                  <Card className="bg-success-light/30 border-success/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-navy">{testForm.name} - {testForm.subject} Insights</h3>
                      <Button variant="outline" className="px-4 py-2 text-sm flex items-center gap-2" onClick={() => setTestState('preview')}>
                        <Edit size={16} /> Edit Marks
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-text-muted uppercase tracking-wider">Class Average</p>
                        <p className="text-xl font-bold text-navy">{testInsights.avg}</p>
                      </div>
                      <div>
                        <p className="text-xs text-text-muted uppercase tracking-wider">Highest Score</p>
                        <p className="text-xl font-bold text-success">{testInsights.max}</p>
                      </div>
                      <div>
                        <p className="text-xs text-text-muted uppercase tracking-wider">Lowest Score</p>
                        <p className="text-xl font-bold text-danger">{testInsights.min}</p>
                      </div>
                      <div>
                        <p className="text-xs text-text-muted uppercase tracking-wider">Students &lt; 40%</p>
                        <p className="text-xl font-bold text-warning">{testInsights.below40}</p>
                      </div>
                    </div>
                  </Card>
                )}

                <Card noPadding>
                  <div className="p-4 border-b border-border-subtle bg-paper-light flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-navy">{testState === 'preview' ? 'Preview Data' : 'Final Marks'}</h3>
                      {testState === 'preview' && <p className="text-sm text-text-secondary">Review before saving.</p>}
                    </div>
                    {testState === 'preview' && (
                      <Button variant="primary" className="flex items-center gap-2" onClick={saveMarks}>
                        <Save size={18} /> Save Marks
                      </Button>
                    )}
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-border-subtle bg-paper/50">
                          <th className="px-6 py-4 font-semibold text-text-secondary text-sm w-24">Roll No</th>
                          <th className="px-6 py-4 font-semibold text-text-secondary text-sm">Student Name</th>
                          <th className="px-6 py-4 font-semibold text-text-secondary text-sm w-48 text-right">Marks (/{testForm.maxMarks})</th>
                        </tr>
                      </thead>
                      <tbody>
                        {testMarks.map((tm, idx) => (
                          <tr key={tm.id} className="border-b border-border-subtle last:border-none hover:bg-paper-light transition-colors">
                            <td className="px-6 py-3 font-semibold text-navy">{tm.rollNo}</td>
                            <td className="px-6 py-3 font-medium text-navy">{tm.name}</td>
                            <td className="px-6 py-3 text-right">
                              {testState === 'preview' ? (
                                <input 
                                  type="number" 
                                  className="input-tactile py-2 px-3 text-right max-w-[120px]" 
                                  value={tm.marks}
                                  onChange={(e) => {
                                    const newMarks = [...testMarks];
                                    newMarks[idx].marks = e.target.value;
                                    setTestMarks(newMarks);
                                  }}
                                />
                              ) : (
                                <span className="font-bold text-navy pr-4">{tm.marks}</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            )}
          </div>
        )}

        {/* ATTENDANCE TAB Placeholder */}
        {activeTab === 'attendance' && (
          <Card className="flex flex-col items-center justify-center p-20 text-center">
            <div className="w-16 h-16 bg-paper rounded-full flex items-center justify-center mb-4 text-gold">
              <CalendarCheck size={32} />
            </div>
            <h3 className="text-xl font-bold text-navy mb-2">Detailed Attendance View</h3>
            <p className="text-text-secondary">This module is under development.</p>
          </Card>
        )}

      </div>

      {/* CLASS REPORT MODAL */}
      <ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} title="Class Performance Report">
        <div className="flex flex-col gap-8 text-navy font-sans">
          
          <div className="text-center border-b-2 border-navy pb-6">
            <h1 className="text-3xl font-bold uppercase tracking-widest mb-2">InsightED</h1>
            <p className="text-lg text-text-secondary">Official Class Performance Report</p>
            <p className="text-sm mt-2 text-text-muted">Generated on {generatedDate}</p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="bg-paper-light p-6 rounded-xl border border-border-subtle">
              <h3 className="font-bold text-lg mb-4 border-b border-border-subtle pb-2">Class Information</h3>
              <p><strong>Name:</strong> {classDetails.name}-{classDetails.section}</p>
              <p className="mt-2"><strong>Total Students:</strong> {classDetails.studentsCount}</p>
            </div>
            <div className="bg-paper-light p-6 rounded-xl border border-border-subtle">
              <h3 className="font-bold text-lg mb-4 border-b border-border-subtle pb-2">Attendance Summary</h3>
              <p><strong>Average Attendance:</strong> {classDetails.avgAttendance}%</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 border-b border-border-subtle pb-2">Subject-wise Performance</h3>
            <table className="w-full text-left border border-border-subtle">
              <thead>
                <tr className="bg-paper-light">
                  <th className="p-3 border-b border-border-subtle">Subject</th>
                  <th className="p-3 border-b border-border-subtle text-right">Average Marks (%)</th>
                </tr>
              </thead>
              <tbody>
                {subjectPerformance.map((sub, idx) => (
                  <tr key={idx} className="border-b border-border-subtle">
                    <td className="p-3">{sub.subject}</td>
                    <td className="p-3 text-right">{sub.avgMarks}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 border-b border-border-subtle pb-2 text-success">Top Performers</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>{classDetails.topPerformer}</li>
                <li>{students.length > 1 ? students[1].name : 'N/A'}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 border-b border-border-subtle pb-2 text-danger">Students Needing Support</h3>
              <ul className="list-disc pl-5 space-y-2">
                {students.filter(s => s.status === 'Needs Support').map((s, idx) => (
                  <li key={idx}>{s.name} (Avg: {s.marks}%)</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border-subtle flex justify-between items-center text-sm text-text-secondary">
            <p>This is a computer-generated document and does not require a signature.</p>
            <p>Powered by InsightED Platform</p>
          </div>

        </div>
      </ReportModal>

    </div>
  );
};

export default ClassDetails;
