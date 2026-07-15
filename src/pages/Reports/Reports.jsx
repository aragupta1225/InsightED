import React from 'react';
import { Download, FileText, Calendar, Filter } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const Reports = () => {
  const reports = [
    { id: 1, name: 'End of Term Assessment Summary', date: 'July 15, 2026', type: 'PDF', size: '2.4 MB' },
    { id: 2, name: 'Monthly Attendance Overview', date: 'July 01, 2026', type: 'CSV', size: '1.1 MB' },
    { id: 3, name: 'At-Risk Cohort Analysis', date: 'June 28, 2026', type: 'PDF', size: '3.8 MB' },
    { id: 4, name: 'Departmental Performance Matrix', date: 'June 15, 2026', type: 'XLSX', size: '4.2 MB' },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-navy mb-2">Reports & Exports</h1>
          <p className="text-text-secondary">Generate and download official school reports.</p>
        </div>
        <Button variant="primary">Generate Custom Report</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-2">
        <div className="md:col-span-1">
          <Card className="flex flex-col gap-6 h-full">
            <h3 className="font-semibold text-navy flex items-center gap-2">
              <Filter size={18} /> Filters
            </h3>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-text-secondary">Report Type</label>
              <select className="input-tactile appearance-none py-2 px-3">
                <option>All Types</option>
                <option>Academic</option>
                <option>Attendance</option>
                <option>Behavioral</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-text-secondary">Date Range</label>
              <select className="input-tactile appearance-none py-2 px-3">
                <option>Last 30 Days</option>
                <option>This Semester</option>
                <option>This Academic Year</option>
                <option>Custom Range</option>
              </select>
            </div>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Card noPadding className="overflow-hidden">
            <div className="p-6 border-b border-border-subtle bg-paper-light">
              <h3 className="font-semibold text-navy">Generated Reports</h3>
            </div>
            <div className="divide-y divide-border-subtle">
              {reports.map(report => (
                <div key={report.id} className="p-6 flex items-center justify-between hover:bg-paper-light transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gold-light/50 flex items-center justify-center text-gold">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy">{report.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-text-muted mt-1">
                        <span className="flex items-center gap-1"><Calendar size={14} /> {report.date}</span>
                        <span>•</span>
                        <span>{report.type}</span>
                        <span>•</span>
                        <span>{report.size}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" className="opacity-0 group-hover:opacity-100 flex items-center gap-2">
                    <Download size={18} /> Download
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;
