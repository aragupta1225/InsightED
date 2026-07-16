import React, { useState } from 'react';
import { X, Download } from 'lucide-react';
import Button from './Button';
import { generateClassReport, generateStudentReport } from '../../utils/pdfGenerator';

const ReportModal = ({ isOpen, onClose, title, children, reportType, classDetails, students, student, remarks }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    
    // Slight timeout to show the spinner and then generate/download PDF
    setTimeout(() => {
      try {
        if (reportType === 'class') {
          generateClassReport(classDetails, students);
        } else if (reportType === 'student') {
          generateStudentReport(student, remarks);
        }
      } catch (err) {
        console.error("Error generating PDF:", err);
        alert("Failed to generate PDF. Check console for details.");
      } finally {
        setIsDownloading(false);
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/40 backdrop-blur-sm p-4">
      <div className="bg-paper w-full max-w-4xl max-h-[90vh] rounded-[24px] shadow-lifted overflow-hidden flex flex-col relative">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-subtle bg-paper-light">
          <h2 className="text-xl font-bold text-navy">{title}</h2>
          <div className="flex items-center gap-4">
            <Button variant="primary" onClick={handleDownloadPDF} isLoading={isDownloading} className="flex items-center gap-2">
              <Download size={18} /> Download PDF
            </Button>
            <button onClick={onClose} className="p-2 text-text-secondary hover:text-navy hover:bg-border-subtle rounded-xl transition-all">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="p-8 overflow-y-auto flex-1 bg-white">
          <div className="mb-6 p-4 bg-info-light/30 border border-info-light text-info rounded-xl text-sm text-center">
            This is a preview of the report. Click <strong>Download PDF</strong> to generate the official A4 document.
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
