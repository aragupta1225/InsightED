import React from 'react';
import { X, Printer } from 'lucide-react';
import Button from './Button';

const ReportModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/40 backdrop-blur-sm p-4 no-print">
      <div className="bg-paper w-full max-w-4xl max-h-[90vh] rounded-[24px] shadow-lifted overflow-hidden flex flex-col relative print-container">
        
        {/* Header - No print */}
        <div className="flex items-center justify-between p-6 border-b border-border-subtle bg-paper-light no-print">
          <h2 className="text-xl font-bold text-navy">{title}</h2>
          <div className="flex items-center gap-4">
            <Button variant="primary" onClick={handlePrint} className="flex items-center gap-2">
              <Printer size={18} /> Print / Save as PDF
            </Button>
            <button onClick={onClose} className="p-2 text-text-secondary hover:text-navy hover:bg-border-subtle rounded-xl transition-all">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content - This area prints */}
        <div className="p-8 overflow-y-auto flex-1 bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
