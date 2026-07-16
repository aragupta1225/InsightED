import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Plus, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';
import ReportModal from '../../components/common/ReportModal';
import { mockStudents, mockTestHistory } from '../../data/mockData';

const StudentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const student = mockStudents.find(s => s.id === id) || mockStudents[0];

  const [remarks, setRemarks] = useState(student.remarks || []);
  const [isAddingRemark, setIsAddingRemark] = useState(false);
  const [newRemarkText, setNewRemarkText] = useState('');
  const [isSavingRemark, setIsSavingRemark] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  const addRemark = (e) => {
    e.preventDefault();
    if (newRemarkText.trim()) {
      setIsSavingRemark(true);
      setTimeout(() => {
        setRemarks([...remarks, newRemarkText.trim()]);
        setNewRemarkText('');
        setIsSavingRemark(false);
        setIsAddingRemark(false);
      }, 800);
    }
  };

  const handleGenerateReport = () => {
    setIsGeneratingReport(true);
    setTimeout(() => {
      setIsGeneratingReport(false);
      setIsReportOpen(true);
    }, 800);
  };

  const generatedDate = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(`/classes/${student.classId}?tab=students`)}
            className="p-2 bg-paper-light border border-border-subtle rounded-xl hover:bg-white hover:border-gold transition-all"
          >
            <ArrowLeft size={20} className="text-navy" />
          </button>
          <h1 className="text-3xl font-bold text-navy">Student Profile</h1>
        </div>
        <Button variant="outline" className="flex items-center gap-2" onClick={handleGenerateReport} isLoading={isGeneratingReport}>
          <Download size={18} /> Download Student Report PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Student Info & Remarks */}
        <div className="flex flex-col gap-6">
          <Card className="flex flex-col items-center text-center">
            <Avatar name={student.name} size="xl" className="mb-4" />
            <h2 className="text-xl font-bold text-navy mb-1">{student.name}</h2>
            <p className="text-text-secondary font-medium mb-4">Roll No: {student.rollNo}</p>
            
            <div className="w-full flex justify-around mb-2">
              <div className="text-center">
                <p className="text-sm text-text-muted uppercase tracking-wider mb-1">Marks</p>
                <p className="text-xl font-bold text-navy">{student.marks}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-text-muted uppercase tracking-wider mb-1">Attendance</p>
                <p className="text-xl font-bold text-navy">{student.attendance}%</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-navy">Teacher Remarks</h3>
              {!isAddingRemark && (
                <Button variant="ghost" className="p-2 text-gold hover:text-gold hover:bg-gold-light/30" onClick={() => setIsAddingRemark(true)}>
                  <Plus size={18} />
                </Button>
              )}
            </div>

            <div className="flex flex-col gap-4">
              {remarks.length === 0 && !isAddingRemark && (
                <p className="text-sm text-text-secondary italic">No remarks added yet.</p>
              )}
              {remarks.map((remark, idx) => (
                <div key={idx} className="p-4 bg-paper-light rounded-xl border border-border-subtle">
                  <p className="text-sm text-navy">{remark}</p>
                </div>
              ))}
              
              {isAddingRemark && (
                <form onSubmit={addRemark} className="flex flex-col gap-3 p-4 bg-paper-light rounded-xl border border-gold border-dashed">
                  <textarea 
                    autoFocus
                    placeholder="Type your remark here..." 
                    className="input-tactile min-h-[80px] text-sm resize-none"
                    value={newRemarkText}
                    onChange={(e) => setNewRemarkText(e.target.value)}
                    disabled={isSavingRemark}
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <Button type="button" variant="ghost" className="px-3 py-1.5 text-xs" onClick={() => setIsAddingRemark(false)} disabled={isSavingRemark}>Cancel</Button>
                    <Button type="submit" variant="primary" className="px-4 py-1.5 text-xs" isLoading={isSavingRemark}>Save Remark</Button>
                  </div>
                </form>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column: Performance & History */}
        <div className="lg:col-span-2 flex flex-col gap-6 w-full overflow-hidden">
          <Card>
            <h3 className="text-lg font-semibold text-navy mb-6">Performance Summary</h3>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 rounded-xl border border-border-subtle bg-paper-light">
                <div className="p-2 bg-success-light text-success rounded-lg shrink-0">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-navy mb-1">Overall Status</h4>
                  <p className="text-sm text-text-secondary">
                    {student.status === 'Excellent' ? 'Student is performing exceptionally well.' : 
                     student.status === 'Good' ? 'Student is making steady progress.' : 
                     'Student requires additional support and attention.'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-xl border border-border-subtle bg-paper-light">
                <div className={`p-2 rounded-lg shrink-0 ${student.attendance >= 75 ? 'bg-info-light text-info' : 'bg-danger-light text-danger'}`}>
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-navy mb-1">Attendance Flag</h4>
                  <p className="text-sm text-text-secondary">
                    {student.attendance >= 90 ? 'Attendance is excellent.' : 
                     student.attendance >= 75 ? 'Attendance is acceptable.' : 
                     'Critical! Attendance is below 75%.'}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card noPadding>
            <div className="p-6 border-b border-border-subtle bg-paper-light">
              <h3 className="font-semibold text-navy flex items-center gap-2">
                <FileText size={20} className="text-navy-muted" /> 
                Test History
              </h3>
            </div>
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse min-w-[400px]">
                <thead>
                  <tr className="border-b border-border-subtle bg-paper/50">
                    <th className="px-6 py-4 font-semibold text-text-secondary text-sm">Test Name</th>
                    <th className="px-6 py-4 font-semibold text-text-secondary text-sm">Date</th>
                    <th className="px-6 py-4 font-semibold text-text-secondary text-sm text-right">Marks (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTestHistory.map((test, idx) => (
                    <tr key={idx} className="border-b border-border-subtle last:border-none hover:bg-paper-light transition-colors">
                      <td className="px-6 py-4 font-semibold text-navy whitespace-nowrap">{test.testName}</td>
                      <td className="px-6 py-4 text-sm text-text-secondary whitespace-nowrap">{test.date}</td>
                      <td className="px-6 py-4 font-bold text-navy text-right whitespace-nowrap">{test.marks}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      {/* STUDENT REPORT MODAL */}
      <ReportModal 
        isOpen={isReportOpen} 
        onClose={() => setIsReportOpen(false)} 
        title="Student Academic Report"
        student={student}
        remarks={remarks}
        reportType="student"
      >
        <div className="flex flex-col gap-8 text-navy font-sans">
          
          <div className="text-center border-b-2 border-navy pb-6">
            <h1 className="text-3xl font-bold uppercase tracking-widest mb-2">InsightED</h1>
            <p className="text-lg text-text-secondary">Official Student Academic Report</p>
            <p className="text-sm mt-2 text-text-muted">Generated on {generatedDate}</p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="bg-paper-light p-6 rounded-xl border border-border-subtle">
              <h3 className="font-bold text-lg mb-4 border-b border-border-subtle pb-2">Student Information</h3>
              <p><strong>Name:</strong> {student.name}</p>
              <p className="mt-2"><strong>Roll No:</strong> {student.rollNo}</p>
              <p className="mt-2"><strong>Class:</strong> {student.classId}</p>
            </div>
            <div className="bg-paper-light p-6 rounded-xl border border-border-subtle">
              <h3 className="font-bold text-lg mb-4 border-b border-border-subtle pb-2">Performance Summary</h3>
              <p><strong>Overall Average:</strong> {student.marks}%</p>
              <p className="mt-2"><strong>Attendance:</strong> {student.attendance}%</p>
              <p className="mt-2"><strong>Status:</strong> {student.status}</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 border-b border-border-subtle pb-2">Test Scores</h3>
            <table className="w-full text-left border border-border-subtle">
              <thead>
                <tr className="bg-paper-light">
                  <th className="p-3 border-b border-border-subtle">Test Name</th>
                  <th className="p-3 border-b border-border-subtle">Date</th>
                  <th className="p-3 border-b border-border-subtle text-right">Marks (%)</th>
                </tr>
              </thead>
              <tbody>
                {mockTestHistory.map((test, idx) => (
                  <tr key={idx} className="border-b border-border-subtle">
                    <td className="p-3">{test.testName}</td>
                    <td className="p-3">{test.date}</td>
                    <td className="p-3 text-right">{test.marks}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 border-b border-border-subtle pb-2">Teacher Remarks</h3>
            {remarks.length === 0 ? (
              <p className="italic text-text-secondary">No remarks provided.</p>
            ) : (
              <ul className="list-disc pl-5 space-y-2">
                {remarks.map((remark, idx) => (
                  <li key={idx} className="text-navy">{remark}</li>
                ))}
              </ul>
            )}
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

export default StudentProfile;
