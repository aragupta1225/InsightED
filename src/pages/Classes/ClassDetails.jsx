import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ChevronRight, BarChart3, Users, CalendarCheck, BookOpen, Download, Upload, Plus, Save, Edit, ArrowUpDown, CheckCircle, Check, X, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import * as XLSX from 'xlsx';
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
  const [searchParams, setSearchParams] = useSearchParams();
  
  const activeTab = searchParams.get('tab') || 'overview';
  const handleTabChange = (tabId) => {
    setSearchParams({ tab: tabId });
  };

  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  
  const classDetails = mockClasses.find(c => c.id === id) || mockClasses[0];
  const initialStudents = mockStudents.filter(s => s.classId === id);

  // Sorting State for Students Tab
  const [sortConfig, setSortConfig] = useState({ key: 'rollNo', direction: 'asc' });

  const sortedStudents = useMemo(() => {
    let sortableStudents = [...initialStudents];
    if (sortConfig !== null) {
      sortableStudents.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];
        
        if (sortConfig.key === 'rollNo' || sortConfig.key === 'attendance' || sortConfig.key === 'marks') {
          aVal = Number(aVal);
          bVal = Number(bVal);
        }

        if (aVal < bVal) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aVal > bVal) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableStudents;
  }, [initialStudents, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const chartData = [
    { name: classDetails.name, attendance: classDetails.avgAttendance, avgScore: classDetails.avgMarks }
  ];

  const generatedDate = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  const handleGenerateReport = () => {
    setIsGeneratingReport(true);
    setTimeout(() => {
      setIsGeneratingReport(false);
      setIsReportOpen(true);
    }, 800);
  };

  // --- TEST MANAGEMENT STATE ---
  const [testState, setTestState] = useState('setup');
  const [testForm, setTestForm] = useState({ name: '', subject: '', maxMarks: 100, date: '' });
  const [testMarks, setTestMarks] = useState([]); 
  const [testInsights, setTestInsights] = useState(null);
  const [isTestLoading, setIsTestLoading] = useState(false);
  const [testError, setTestError] = useState('');

  const handleTestSetupSubmit = (e) => {
    e.preventDefault();
    setTestError('');
    if (testForm.maxMarks <= 0) {
      setTestError('Maximum marks must be greater than 0.');
      return;
    }
    if (testForm.name && testForm.subject && testForm.date) {
      setTestState('entry');
    }
  };

  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsTestLoading(true);
    setTestError('');

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { defval: "" });

        const parsedMarks = [];
        let hasError = false;
        const rollNos = new Set();

        for (let i = 0; i < data.length; i++) {
          const row = data[i];
          const rollNo = row['Roll No']?.toString().trim();
          const name = row['Student Name']?.toString().trim();
          const marks = row['Marks']?.toString().trim();

          if (!rollNo || !name || marks === "") {
            setTestError(`Row ${i + 2}: Missing required fields (Roll No, Student Name, or Marks).`);
            hasError = true;
            break;
          }

          if (rollNos.has(rollNo)) {
            setTestError(`Row ${i + 2}: Duplicate Roll No detected (${rollNo}).`);
            hasError = true;
            break;
          }
          rollNos.add(rollNo);

          const numericMarks = Number(marks);
          if (isNaN(numericMarks) || numericMarks > testForm.maxMarks || numericMarks < 0) {
            setTestError(`Row ${i + 2}: Invalid marks for ${name}. Must be between 0 and ${testForm.maxMarks}.`);
            hasError = true;
            break;
          }

          // Map back to student ID if exists, otherwise generate one
          const matchedStudent = initialStudents.find(s => s.rollNo === rollNo);
          parsedMarks.push({
            id: matchedStudent ? matchedStudent.id : `STU_TEMP_${i}`,
            rollNo,
            name,
            marks: numericMarks
          });
        }

        if (!hasError) {
          setTestMarks(parsedMarks);
          setTestState('preview');
        }
      } catch (err) {
        setTestError("Failed to parse the file. Please ensure it is a valid Excel/CSV file with the correct format.");
      } finally {
        setIsTestLoading(false);
        if (fileInputRef.current) fileInputRef.current.value = ""; // reset input
      }
    };
    reader.onerror = () => {
      setTestError("Error reading the file.");
      setIsTestLoading(false);
    };
    reader.readAsBinaryString(file);
  };

  const saveMarks = () => {
    setIsTestLoading(true);
    setTimeout(() => {
      const marksArr = testMarks.map(t => Number(t.marks) || 0);
      const avg = marksArr.length > 0 ? (marksArr.reduce((a,b) => a+b, 0) / marksArr.length).toFixed(1) : 0;
      const max = marksArr.length > 0 ? Math.max(...marksArr) : 0;
      const min = marksArr.length > 0 ? Math.min(...marksArr) : 0;
      const below40 = testMarks.filter(t => (Number(t.marks || 0) / testForm.maxMarks) * 100 < 40).length;

      setTestInsights({ avg, max, min, below40 });
      setIsTestLoading(false);
      setTestState('saved');
    }, 1000);
  };

  // --- ATTENDANCE MANAGEMENT STATE ---
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceData, setAttendanceData] = useState({});
  const [attendanceStatus, setAttendanceStatus] = useState('new'); // 'new', 'viewing', 'editing'
  const [originalAttendanceData, setOriginalAttendanceData] = useState(null);
  const [isSavingAttendance, setIsSavingAttendance] = useState(false);
  const [attendanceSaved, setAttendanceSaved] = useState(false);

  useEffect(() => {
    if (activeTab !== 'attendance') return;
    
    const key = `attendance_${id}_${attendanceDate}`;
    const saved = localStorage.getItem(key);
    
    if (saved) {
      setAttendanceData(JSON.parse(saved));
      setAttendanceStatus('viewing');
    } else {
      setAttendanceData(initialStudents.reduce((acc, s) => ({ ...acc, [s.id]: true }), {}));
      setAttendanceStatus('new');
    }
    setAttendanceSaved(false);
  }, [attendanceDate, id, activeTab]);

  const toggleStudentAttendance = (studentId) => {
    if (attendanceStatus === 'viewing') return;
    setAttendanceData(prev => ({ ...prev, [studentId]: !prev[studentId] }));
  };

  const saveAttendance = () => {
    setIsSavingAttendance(true);
    setTimeout(() => {
      const key = `attendance_${id}_${attendanceDate}`;
      localStorage.setItem(key, JSON.stringify(attendanceData));
      
      setIsSavingAttendance(false);
      setAttendanceStatus('viewing');
      setAttendanceSaved(true);
      setTimeout(() => setAttendanceSaved(false), 3000);
    }, 1000);
  };

  const handleEditAttendance = () => {
    setOriginalAttendanceData({ ...attendanceData });
    setAttendanceStatus('editing');
  };

  const handleCancelEdit = () => {
    setAttendanceData(originalAttendanceData);
    setAttendanceStatus('viewing');
  };

  const mockWeeklyAttendance = [
    { day: 'Mon', present: 95 },
    { day: 'Tue', present: 92 },
    { day: 'Wed', present: 88 },
    { day: 'Thu', present: 94 },
    { day: 'Fri', present: 89 },
  ];

  const studentsNeedingAttendanceSupport = initialStudents
    .filter(s => s.attendance < 75)
    .sort((a, b) => a.attendance - b.attendance);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
    { id: 'tests', label: 'Tests', icon: BookOpen },
  ];

  const SortableHeader = ({ label, sortKey, align = 'left' }) => (
    <th 
      className={`px-6 py-4 font-semibold text-text-secondary text-sm cursor-pointer hover:text-navy transition-colors select-none ${align === 'right' ? 'text-right' : 'text-left'}`}
      onClick={() => requestSort(sortKey)}
    >
      <div className={`flex items-center gap-1 ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
        {label}
        <ArrowUpDown size={14} className={sortConfig?.key === sortKey ? 'text-navy' : 'text-text-muted/50'} />
      </div>
    </th>
  );

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
          <div className="mb-4">
            <h1 className="text-4xl font-serif text-navy mb-3">Class {classDetails.name} Details</h1>
            <p className="text-text-secondary text-lg">Comprehensive overview of class performance and roster.</p>
          </div>
        </div>
        <Button variant="outline" className="flex items-center gap-2 !border-border-subtle !bg-white hover:!bg-white hover:!border-border-subtle hover:!scale-105 shadow-sm transition-transform" onClick={handleGenerateReport} isLoading={isGeneratingReport}>
          <Download size={18} /> Download Class Report PDF
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-border-subtle scrollbar-hide">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-semibold transition-all whitespace-nowrap ${
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
                    <Bar dataKey="attendance" name="Attendance %" fill="#1E2B59" fillOpacity={0.85} radius={[4, 4, 0, 0]} barSize={60} />
                    <Bar dataKey="avgScore" name="Avg Score %" fill="#E89BAA" fillOpacity={0.85} radius={[4, 4, 0, 0]} barSize={60} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        )}

        {/* STUDENTS TAB */}
        {activeTab === 'students' && (
          <Card noPadding>
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-border-subtle bg-paper/50">
                    <SortableHeader label="Roll No" sortKey="rollNo" />
                    <SortableHeader label="Name" sortKey="name" />
                    <SortableHeader label="Attendance %" sortKey="attendance" />
                    <SortableHeader label="Avg Score" sortKey="marks" />
                    <SortableHeader label="Status" sortKey="status" />
                    <th className="px-6 py-4 font-semibold text-text-secondary text-sm text-right">View</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedStudents.map((student) => (
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
                  {sortedStudents.length === 0 && (
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

        {/* TESTS TAB */}
        {activeTab === 'tests' && (
          <div className="flex flex-col gap-6">
            
            {testState === 'setup' && (
              <Card>
                <h3 className="text-xl font-bold text-navy mb-4">Create New Test</h3>
                {testError && <div className="mb-4 p-3 bg-danger-light text-danger rounded-xl text-sm">{testError}</div>}
                
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

            {testState === 'entry' && (
              <div className="flex flex-col gap-6">
                {testError && <div className="p-3 bg-danger-light text-danger rounded-xl text-sm">{testError}</div>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card 
                    className={`flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-gold transition-colors ${isTestLoading ? 'bg-gold-light/20 cursor-wait' : 'hover:bg-gold-light/20 cursor-pointer'}`}
                    onClick={() => !isTestLoading && fileInputRef.current && fileInputRef.current.click()}
                  >
                    <input 
                      type="file" 
                      accept=".xlsx, .xls, .csv" 
                      className="hidden" 
                      ref={fileInputRef} 
                      onChange={handleFileUpload} 
                    />
                    <Upload size={48} className={`text-gold mb-4 ${isTestLoading ? 'animate-bounce' : ''}`} />
                    <h3 className="text-lg font-bold text-navy mb-2">{isTestLoading ? 'Processing...' : 'Upload Excel Sheet'}</h3>
                    <p className="text-sm text-text-secondary">Format: Roll No, Student Name, Marks</p>
                  </Card>
                
                <Card 
                  className={`flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-navy transition-colors ${isTestLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-navy/5 cursor-pointer'}`}
                  onClick={() => {
                    if(isTestLoading) return;
                    setTestMarks(initialStudents.map(s => ({ id: s.id, rollNo: s.rollNo, name: s.name, marks: '' })));
                    setTestState('preview');
                  }}
                >
                  <Plus size={48} className="text-navy mb-4" />
                  <h3 className="text-lg font-bold text-navy mb-2">Manual Entry</h3>
                  <p className="text-sm text-text-secondary">Enter marks directly into the system</p>
                </Card>
                </div>
              </div>
            )}

            {(testState === 'preview' || testState === 'saved') && (
              <div className="flex flex-col gap-6">
                {testState === 'saved' && testInsights && (
                  <Card className="bg-success-light/30 border-success/20">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                      <h3 className="text-lg font-bold text-navy">{testForm.name} - {testForm.subject} Insights</h3>
                      <div className="flex flex-wrap items-center gap-3">
                        <Button variant="outline" className="px-4 py-2 text-sm flex items-center justify-center gap-2" onClick={() => setTestState('preview')}>
                          <Edit size={16} /> Edit Marks
                        </Button>
                        <Button variant="primary" className="px-4 py-2 text-sm flex items-center justify-center gap-2" onClick={() => {
                          setTestForm({ name: '', subject: '', maxMarks: 100, date: '' });
                          setTestMarks([]);
                          setTestInsights(null);
                          setTestError('');
                          setTestState('setup');
                        }}>
                          <Plus size={16} /> Create Another Test
                        </Button>
                      </div>
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
                  <div className="p-4 border-b border-border-subtle bg-paper-light flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-navy">{testState === 'preview' ? 'Preview Data' : 'Final Marks'}</h3>
                      {testState === 'preview' && <p className="text-sm text-text-secondary">Review before saving.</p>}
                    </div>
                    {testState === 'preview' && (
                      <div className="flex items-center gap-3">
                        <Button variant="ghost" onClick={() => setTestState('entry')} disabled={isTestLoading}>
                          Cancel
                        </Button>
                        <Button variant="primary" className="flex items-center justify-center gap-2" onClick={saveMarks} isLoading={isTestLoading}>
                          <Save size={18} /> Save Marks
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse min-w-[500px]">
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
                                  className="input-tactile py-2 px-3 text-right max-w-[120px] ml-auto block" 
                                  value={tm.marks}
                                  disabled={isTestLoading}
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

        {/* ATTENDANCE MANAGEMENT TAB */}
        {activeTab === 'attendance' && (
          <div className="flex flex-col gap-6">
            
            {/* Top Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="flex flex-col justify-center">
                <p className="text-xs text-text-secondary uppercase tracking-wider mb-1">Today's Attd.</p>
                <p className="text-2xl font-bold text-navy">
                  {Object.values(attendanceData).filter(Boolean).length} / {initialStudents.length}
                </p>
              </Card>
              <Card className="flex flex-col justify-center">
                <p className="text-xs text-text-secondary uppercase tracking-wider mb-1">Avg Attendance</p>
                <p className="text-2xl font-bold text-navy">{classDetails.avgAttendance}%</p>
              </Card>
              <Card className="flex flex-col justify-center border-danger-light">
                <p className="text-xs text-text-secondary uppercase tracking-wider mb-1">Below 75%</p>
                <p className="text-2xl font-bold text-danger">{studentsNeedingAttendanceSupport.length}</p>
              </Card>
              <Card className="flex flex-col justify-center border-warning-light">
                <p className="text-xs text-text-secondary uppercase tracking-wider mb-1">Consecutive Absentees</p>
                <p className="text-2xl font-bold text-warning">1</p>
              </Card>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              
              {/* Left Column: Marking Table */}
              <div className="xl:col-span-2 flex flex-col gap-6 w-full overflow-hidden">
                <Card noPadding className="flex flex-col h-full">
                  <div className="p-4 border-b border-border-subtle bg-paper-light flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <h3 className="font-bold text-navy">Mark Attendance</h3>
                      <input 
                        type="date" 
                        className="input-tactile py-1 px-3 text-sm w-auto"
                        value={attendanceDate}
                        onChange={(e) => setAttendanceDate(e.target.value)}
                        disabled={isSavingAttendance || attendanceStatus === 'editing'}
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      {attendanceStatus === 'new' && (
                        <Button variant="primary" onClick={saveAttendance} isLoading={isSavingAttendance}>
                          <Save size={16} className="mr-2 inline" /> Save Attendance
                        </Button>
                      )}
                      {attendanceStatus === 'viewing' && (
                        <Button variant="outline" onClick={handleEditAttendance}>
                          <Edit size={16} className="mr-2 inline" /> Edit Attendance
                        </Button>
                      )}
                      {attendanceStatus === 'editing' && (
                        <>
                          <Button variant="ghost" onClick={handleCancelEdit} disabled={isSavingAttendance}>
                            Cancel
                          </Button>
                          <Button variant="primary" onClick={saveAttendance} isLoading={isSavingAttendance}>
                            <Save size={16} className="mr-2 inline" /> Save Changes
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {attendanceStatus === 'viewing' && (
                    <div className="m-4 p-3 bg-paper-light border border-border-subtle text-text-secondary rounded-xl text-sm font-medium flex items-center gap-2">
                      <AlertCircle size={18} className="text-navy" /> Attendance already recorded for this date.
                    </div>
                  )}

                  {attendanceSaved && (
                    <div className="m-4 p-3 bg-success-light text-success rounded-xl text-sm font-bold flex items-center justify-center gap-2 animate-in fade-in">
                      <CheckCircle size={18} /> Attendance saved successfully!
                    </div>
                  )}

                  <div className="overflow-x-auto w-full flex-1">
                    <table className="w-full text-left border-collapse min-w-[400px]">
                      <thead>
                        <tr className="border-b border-border-subtle bg-paper/50">
                          <th className="px-6 py-4 font-semibold text-text-secondary text-sm w-24">Roll No</th>
                          <th className="px-6 py-4 font-semibold text-text-secondary text-sm">Student Name</th>
                          <th className="px-6 py-4 font-semibold text-text-secondary text-sm text-right">Present</th>
                        </tr>
                      </thead>
                      <tbody>
                        {initialStudents.map(student => (
                          <tr key={student.id} className={`border-b border-border-subtle last:border-none transition-colors ${attendanceStatus === 'viewing' ? 'hover:bg-transparent' : 'hover:bg-paper-light'}`}>
                            <td className="px-6 py-3 font-semibold text-navy">{student.rollNo}</td>
                            <td className="px-6 py-3 font-medium text-navy">{student.name}</td>
                            <td className="px-6 py-3 text-right">
                              {attendanceStatus === 'viewing' ? (
                                attendanceData[student.id] 
                                  ? <span className="flex items-center justify-end gap-1 text-success font-bold"><Check size={16} /> Present</span> 
                                  : <span className="flex items-center justify-end gap-1 text-danger font-bold"><X size={16} /> Absent</span>
                              ) : (
                                <input 
                                  type="checkbox" 
                                  className="w-5 h-5 accent-navy cursor-pointer ml-auto block"
                                  checked={attendanceData[student.id] || false}
                                  onChange={() => toggleStudentAttendance(student.id)}
                                  disabled={isSavingAttendance}
                                />
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>

              {/* Right Column: Insights & History */}
              <div className="flex flex-col gap-6 w-full">
                <ChartContainer title="Weekly Attendance" className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockWeeklyAttendance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(27, 37, 65, 0.08)" />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#8A8B9E', fontSize: 12 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8A8B9E', fontSize: 12 }} domain={[0, 100]} />
                      <Tooltip cursor={{ fill: 'rgba(27, 37, 65, 0.04)' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                      <Bar dataKey="present" name="Present %" fill="#E89BAA" fillOpacity={0.85} radius={[4, 4, 0, 0]} barSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>

                <Card noPadding>
                  <div className="p-4 border-b border-border-subtle bg-paper-light">
                    <h3 className="font-semibold text-navy">Students &lt; 75% Attendance</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <tbody>
                        {studentsNeedingAttendanceSupport.length === 0 ? (
                          <tr><td className="p-6 text-center text-text-secondary text-sm">No students below 75%</td></tr>
                        ) : (
                          studentsNeedingAttendanceSupport.map(s => (
                            <tr key={s.id} className="border-b border-border-subtle last:border-none">
                              <td className="px-4 py-3 font-medium text-navy text-sm">{s.name}</td>
                              <td className="px-4 py-3 font-bold text-danger text-sm text-right">{s.attendance}%</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* CLASS REPORT MODAL */}
      <ReportModal 
        isOpen={isReportOpen} 
        onClose={() => setIsReportOpen(false)} 
        title="Class Performance Report"
        reportType="class"
        classDetails={classDetails}
        students={initialStudents}
      >
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
                <li>{initialStudents.length > 1 ? initialStudents[1].name : 'N/A'}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 border-b border-border-subtle pb-2 text-danger">Students Needing Support</h3>
              <ul className="list-disc pl-5 space-y-2">
                {initialStudents.filter(s => s.status === 'Needs Support').map((s, idx) => (
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
