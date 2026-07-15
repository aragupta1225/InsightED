import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Download, AlertTriangle } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';
import ChartContainer from '../../components/common/ChartContainer';
import { mockStudentDetails } from '../../data/mockData';

const StudentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Use mock details or fallback to first student if not found in detailed mock
  const student = mockStudentDetails[id] || mockStudentDetails['1'];

  // Mock data for radar chart based on subjects
  const radarData = student.subjects.map(s => ({
    subject: s.name,
    score: s.score,
    fullMark: 100,
  }));

  // Mock trend data
  const trendData = [
    { month: 'Sep', gpa: student.gpa - 0.2 },
    { month: 'Oct', gpa: student.gpa - 0.1 },
    { month: 'Nov', gpa: student.gpa + 0.1 },
    { month: 'Dec', gpa: student.gpa },
    { month: 'Jan', gpa: student.gpa + 0.2 },
    { month: 'Feb', gpa: student.gpa },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/students')}
            className="p-2 bg-paper-light border border-border-subtle rounded-xl hover:bg-white hover:border-gold transition-all"
          >
            <ArrowLeft size={20} className="text-navy" />
          </button>
          <h1 className="text-2xl font-bold text-navy">Student Profile</h1>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Schedule Meeting</Button>
          <Button variant="primary">Generate Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Personal Info */}
        <div className="flex flex-col gap-6">
          <Card className="flex flex-col items-center text-center">
            <Avatar name={student.name} size="xl" className="mb-4" />
            <h2 className="text-xl font-bold text-navy">{student.name}</h2>
            <p className="text-text-secondary mb-4">Grade: {student.grade} • ID: STU-{student.id.padStart(4, '0')}</p>
            
            <div className="flex gap-2 mb-6">
              <Badge variant={student.risk === 'high' ? 'danger' : student.risk === 'medium' ? 'warning' : 'success'}>
                {student.risk.charAt(0).toUpperCase() + student.risk.slice(1)} Risk
              </Badge>
              <Badge variant="info">GPA: {student.gpa.toFixed(1)}</Badge>
            </div>

            <div className="w-full h-px bg-border-subtle mb-6"></div>

            <div className="w-full flex flex-col gap-4 text-left">
              <div className="flex items-center gap-3 text-text-secondary">
                <Mail size={18} />
                <span className="text-sm">{student.email}</span>
              </div>
              <div className="flex items-center gap-3 text-text-secondary">
                <Phone size={18} />
                <span className="text-sm">{student.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-text-secondary">
                <Users size={18} />
                <span className="text-sm">{student.parents}</span>
              </div>
              <div className="flex items-center gap-3 text-text-secondary">
                <MapPin size={18} />
                <span className="text-sm">{student.address}</span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-navy mb-4">Behavioral Notes</h3>
            <div className="flex flex-col gap-4">
              {student.behaviorNotes.map((note, idx) => (
                <div key={idx} className="p-4 bg-paper-light rounded-2xl border border-border-subtle">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-text-muted">{note.date}</span>
                  </div>
                  <p className="text-sm text-navy">{note.note}</p>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2">+ Add Note</Button>
            </div>
          </Card>
        </div>

        {/* Right Column: Analytics */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChartContainer title="Subject Proficiency">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="rgba(27, 37, 65, 0.08)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#585A72', fontSize: 12 }} />
                  <Radar name="Student" dataKey="score" stroke="#C89B3C" fill="#C89B3C" fillOpacity={0.4} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </ChartContainer>

            <ChartContainer title="GPA Trend (Last 6 Months)">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(27, 37, 65, 0.08)" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#8A8B9E', fontSize: 12 }} dy={10} />
                  <YAxis domain={[0, 4.0]} axisLine={false} tickLine={false} tick={{ fill: '#8A8B9E', fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 12px 36px -12px rgba(27, 37, 65, 0.1)' }} />
                  <Line type="monotone" dataKey="gpa" stroke="#1B2541" strokeWidth={3} dot={{ r: 4, fill: '#1B2541' }} activeDot={{ r: 6, fill: '#C89B3C' }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-navy">Intervention History</h3>
            </div>
            {student.risk === 'high' && (
              <div className="flex items-start gap-3 p-4 bg-danger-light rounded-2xl mb-6">
                <AlertTriangle className="text-danger shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-semibold text-danger">Immediate Action Required</h4>
                  <p className="text-sm text-danger/80 mt-1">Student has missed multiple assignments and attendance is critically low.</p>
                </div>
              </div>
            )}
            
            <div className="relative border-l-2 border-border-subtle ml-3 pl-6 pb-2">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-paper border-2 border-gold"></div>
              <p className="text-sm font-semibold text-navy mb-1">Parent-Teacher Conference Scheduled</p>
              <p className="text-sm text-text-secondary mb-2">Discussing recent drop in math performance.</p>
              <span className="text-xs text-text-muted">Upcoming: Next Tuesday</span>
            </div>
            <div className="relative border-l-2 border-border-subtle ml-3 pl-6 py-6">
              <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-paper border-2 border-navy"></div>
              <p className="text-sm font-semibold text-navy mb-1">Counselor Meeting Completed</p>
              <p className="text-sm text-text-secondary mb-2">Student reported feeling overwhelmed with assignments.</p>
              <span className="text-xs text-text-muted">July 10, 2026</span>
            </div>
            <div className="relative ml-3 pl-6 pt-6">
              <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-paper border-2 border-border-subtle"></div>
              <p className="text-sm font-semibold text-navy mb-1">Tutoring Assigned</p>
              <p className="text-sm text-text-secondary mb-2">Weekly sessions for Science starting.</p>
              <span className="text-xs text-text-muted">June 15, 2026</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Helper import we missed at top
import { Users } from 'lucide-react';

export default StudentProfile;
