import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, FileSpreadsheet, CheckCircle2, AlertTriangle, X } from 'lucide-react';
import { read, utils } from 'xlsx';
import useStudentStore from '../../store/studentStore';
import useAttendanceStore from '../../store/attendanceStore';
import usePerformanceStore from '../../store/performanceStore';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const messages = [
  "Reading Excel file...",
  "Validating records...",
  "Creating student profiles...",
  "Organizing classes...",
  "Preparing dashboard..."
];

const REQUIRED_COLUMNS = [
  'Student ID',
  'Roll No.',
  'Student Name',
  'Class',
  'Section',
  'Gender',
  'Parent Contact'
];

const ImportData = () => {
  const navigate = useNavigate();
  // states: 'default', 'selected', 'importing', 'success', 'error'
  const [status, setStatus] = useState('default');
  const [selectedFile, setSelectedFile] = useState(null);
  const [messageIndex, setMessageIndex] = useState(0);
  const [errors, setErrors] = useState([]);
  const [summary, setSummary] = useState({ students: 0, classes: 0, sections: 0 });
  const setStudents = useStudentStore((state) => state.setStudents);
  const students = useStudentStore((state) => state.students);
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (status === 'default' && students && students.length > 0) {
      const uniqueClasses = new Set();
      const uniqueSections = new Set();

      students.forEach(student => {
        if (student.class) uniqueClasses.add(student.class);
        if (student.section) uniqueSections.add(`${student.class}-${student.section}`);
      });

      setSummary({
        students: students.length,
        classes: uniqueClasses.size,
        sections: uniqueSections.size
      });
      setStatus('success');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setStatus('selected');
      setErrors([]);
    }
  };

  const simulateImport = () => {
    setStatus('importing');
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      if (idx < messages.length) {
        setMessageIndex(idx);
      } else {
        clearInterval(interval);
        setStatus('success');
      }
    }, 1200);
  };

  const handleImport = () => {
    if (!selectedFile) return;

    const fileName = selectedFile.name.toLowerCase();
    if (!fileName.endsWith('.xlsx') && !fileName.endsWith('.csv')) {
      setErrors(["Unsupported file type. Please upload an .xlsx or .csv file."]);
      setStatus('error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target.result;
        const workbook = read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = utils.sheet_to_json(worksheet, { defval: "" });

        if (jsonData.length === 0) {
          setErrors(["The uploaded file is empty."]);
          setStatus('error');
          return;
        }

        const firstRow = jsonData[0];
        const missingColumns = REQUIRED_COLUMNS.filter(col => !(col in firstRow));
        
        const newErrors = [];
        
        if (missingColumns.length > 0) {
          newErrors.push(`Missing column: ${missingColumns.join(', ')}`);
        } else {
          // Check for duplicates only if required columns exist
          const studentIds = new Set();
          const classSectionRolls = new Set();
          
          jsonData.forEach((row) => {
            const studentId = String(row['Student ID'] || '').trim();
            const rollNo = String(row['Roll No.'] || '').trim();
            const className = String(row['Class'] || '').trim();
            const section = String(row['Section'] || '').trim();
            
            // Skip empty rows
            if (!studentId && !rollNo && !className) return;

            if (studentIds.has(studentId)) {
              newErrors.push(`Duplicate Student ID: ${studentId}`);
            }
            if (studentId) studentIds.add(studentId);

            const classSectionRollKey = `${className}-${section}-${rollNo}`;
            if (classSectionRolls.has(classSectionRollKey)) {
              newErrors.push(`Duplicate Roll No. ${rollNo} in Class ${className}-${section}`);
            }
            if (rollNo && className && section) classSectionRolls.add(classSectionRollKey);
          });
        }

        if (newErrors.length > 0) {
          setErrors(newErrors);
          setStatus('error');
        } else {
          // Calculate summary metrics
          const uniqueClasses = new Set();
          const uniqueSections = new Set();
          let validStudents = 0;

          const parsedStudents = [];

          jsonData.forEach(row => {
            const studentId = String(row['Student ID'] || '').trim();
            const rollNo = String(row['Roll No.'] || '').trim();
            const studentName = String(row['Student Name'] || '').trim();
            const className = String(row['Class'] || '').trim();
            const section = String(row['Section'] || '').trim();
            const gender = String(row['Gender'] || '').trim();
            const parentContact = String(row['Parent Contact'] || '').trim();

            if (studentId) {
              parsedStudents.push({
                studentId,
                rollNo,
                name: studentName,
                class: className,
                section,
                gender,
                parentContact
              });
              validStudents++;
              if (className) uniqueClasses.add(className);
              if (section) uniqueSections.add(`${className}-${section}`);
            }
          });

          // Save globally
          setStudents(parsedStudents);

          setSummary({
            students: validStudents,
            classes: uniqueClasses.size,
            sections: uniqueSections.size
          });

          simulateImport();
        }
      } catch (err) {
        setErrors(["Failed to read the file. Please ensure it's a valid Excel or CSV file."]);
        setStatus('error');
      }
    };
    reader.onerror = () => {
      setErrors(["An error occurred while reading the file."]);
      setStatus('error');
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  return (
    <div className="w-full flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-serif text-navy mb-3">Import Student Data</h1>
        <p className="text-text-secondary text-lg">Upload the student dataset to create student records and class rosters.</p>
      </div>

      {(status === 'default' || status === 'selected') && (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
          <Card className="border-2 border-dashed border-border-subtle min-h-[400px] p-12 flex flex-col items-center justify-center text-center transition-all hover:border-navy/30 bg-paper-light/30">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange}
              accept=".xlsx,.csv"
              className="hidden" 
            />
            
            {status === 'default' ? (
              <>
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-border-subtle flex items-center justify-center mb-6 text-navy">
                  <UploadCloud size={32} />
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">Drag & drop your Excel file here</h3>
                <p className="text-text-secondary mb-6">or browse from your computer</p>
                <div className="flex flex-col items-center gap-4">
                  <Button variant="outline" onClick={handleBrowseClick}>Browse Files</Button>
                  <p className="text-xs text-text-muted">Supported formats: .xlsx, .csv</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-border-subtle flex items-center justify-center mb-6 text-navy">
                  <FileSpreadsheet size={32} />
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">{selectedFile?.name || 'students_master.xlsx'}</h3>
                <p className="text-text-secondary mb-6">Ready to import</p>
                <Button variant="outline" onClick={handleBrowseClick}>Change File</Button>
              </>
            )}
          </Card>
          
          <div className="flex justify-center">
            <Button 
              variant="primary" 
              onClick={handleImport} 
              disabled={status === 'default'}
              className="px-8 py-3"
            >
              Import Data
            </Button>
          </div>
        </div>
      )}

      {status === 'importing' && (
        <div className="max-w-4xl mx-auto w-full">
          <Card className="p-16 flex flex-col items-center justify-center text-center gap-6 border border-border-subtle shadow-sm bg-white min-h-[400px]">
            <LoadingSpinner size={48} className="text-navy" />
            <div>
              <h3 className="text-2xl font-bold text-navy mb-2">Importing student records...</h3>
              <p className="text-text-secondary text-lg h-6">{messages[messageIndex]}</p>
            </div>
          </Card>
        </div>
      )}

      {status === 'error' && (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
          <Card className="p-16 flex flex-col items-center justify-center text-center border border-border-subtle shadow-sm bg-white min-h-[400px]">
            <div className="w-20 h-20 bg-danger-light/30 rounded-full flex items-center justify-center mb-6">
              <AlertTriangle size={40} className="text-danger" />
            </div>
            <h2 className="text-3xl font-bold text-navy mb-3">Import Failed</h2>
            <p className="text-text-secondary text-lg mb-8">The uploaded file contains the following issues:</p>
            
            <div className="w-full max-w-md bg-danger-light/20 border border-danger/20 rounded-2xl p-6 mb-8 text-left">
              <ul className="flex flex-col gap-3">
                {errors.map((error, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-danger">
                    <span className="mt-1 flex-shrink-0 text-[10px]">⚫</span>
                    <span>{error}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-text-secondary mb-8">Please correct these issues and upload the file again.</p>

            <Button variant="outline" className="px-8 py-3" onClick={() => {
              setSelectedFile(null);
              setStatus('default');
              if (fileInputRef.current) fileInputRef.current.value = '';
            }}>
              Upload New File
            </Button>
          </Card>
        </div>
      )}

      {status === 'success' && (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
          <Card className="p-16 flex flex-col items-center justify-center text-center border border-border-subtle shadow-sm bg-white min-h-[400px] relative">
            <button 
              className="absolute top-4 right-4 text-text-muted hover:text-text-secondary"
              onClick={() => {
                useStudentStore.setState({ students: [] });
                useAttendanceStore.setState({ records: {} });
                usePerformanceStore.setState({ tests: {} });
                setSelectedFile(null);
                setStatus('default');
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              title="Remove Imported Data"
            >
              <X size={20} />
            </button>
            <div className="w-20 h-20 bg-success-light/30 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={40} className="text-success" />
            </div>
            <h2 className="text-3xl font-bold text-navy mb-3">Import Successful</h2>
            <p className="text-text-secondary text-lg mb-10">Your student data has been imported successfully.</p>
            
            <div className="w-full max-w-md bg-paper-light border border-border-subtle rounded-2xl p-6 mb-8 text-left">
              <h4 className="font-semibold text-navy mb-4 border-b border-border-subtle pb-2">Import Summary</h4>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Students Imported</span>
                  <span className="font-bold text-navy">{summary.students}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Classes</span>
                  <span className="font-bold text-navy">{summary.classes}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Sections</span>
                  <span className="font-bold text-navy">{summary.sections}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" className="px-8 py-3" onClick={() => {
                setSelectedFile(null);
                setStatus('default');
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}>
                Upload New Dataset
              </Button>
              <Button variant="primary" className="px-8 py-3" onClick={() => navigate('/dashboard')}>
                Go to Dashboard
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ImportData;
