import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { mockTestHistory, subjectPerformance } from '../data/mockData';

export const generateClassReport = (classDetails, students) => {
  const doc = new jsPDF();
  const generatedDate = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  // Header
  doc.setFontSize(22);
  doc.setTextColor(15, 23, 42); // Navy
  doc.text('InsightED', 105, 20, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setTextColor(100);
  doc.text('Official Class Performance Report', 105, 30, { align: 'center' });
  
  doc.setFontSize(10);
  doc.text(`Generated on ${generatedDate}`, 105, 38, { align: 'center' });
  
  // Line
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.5);
  doc.line(20, 45, 190, 45);

  // Class Info & Attendance Summary
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.text('Class Information', 20, 55);
  doc.text('Attendance Summary', 120, 55);

  doc.setFont('helvetica', 'normal');
  doc.text(`Name: ${classDetails.name}-${classDetails.section}`, 20, 63);
  doc.text(`Total Students: ${classDetails.studentsCount}`, 20, 70);
  
  doc.text(`Average Attendance: ${classDetails.avgAttendance}%`, 120, 63);

  // Subject Performance Table
  doc.setFont('helvetica', 'bold');
  doc.text('Subject-wise Performance', 20, 85);
  
  const subjectData = subjectPerformance.map(sub => [sub.subject, `${sub.avgMarks}%`]);
  
  autoTable(doc, {
    startY: 90,
    head: [['Subject', 'Average Marks (%)']],
    body: subjectData,
    theme: 'grid',
    headStyles: { fillColor: [248, 250, 252], textColor: [15, 23, 42] },
    margin: { left: 20, right: 20 }
  });

  // Top Performers & Support Needs
  const finalY = doc.lastAutoTable.finalY + 15;
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(22, 163, 74); // Success green
  doc.text('Top Performers', 20, finalY);
  
  doc.setTextColor(220, 38, 38); // Danger red
  doc.text('Students Needing Support', 120, finalY);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  
  const topPerformers = [classDetails.topPerformer];
  if (students.length > 1) topPerformers.push(students[1].name);
  
  let yOffset = finalY + 8;
  topPerformers.forEach(name => {
    doc.text(`• ${name}`, 20, yOffset);
    yOffset += 7;
  });

  const supportStudents = students.filter(s => s.status === 'Needs Support');
  let ySupportOffset = finalY + 8;
  if (supportStudents.length === 0) {
    doc.text('None', 120, ySupportOffset);
  } else {
    supportStudents.forEach(s => {
      doc.text(`• ${s.name} (Avg: ${s.marks}%)`, 120, ySupportOffset);
      ySupportOffset += 7;
    });
  }

  // Footer
  const pageHeight = doc.internal.pageSize.height;
  doc.setDrawColor(200);
  doc.line(20, pageHeight - 20, 190, pageHeight - 20);
  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text('This is a computer-generated document and does not require a signature.', 20, pageHeight - 12);
  doc.text('Powered by InsightED Platform', 190, pageHeight - 12, { align: 'right' });

  doc.save(`${classDetails.name}_${classDetails.section}_Report.pdf`);
};

export const generateStudentReport = (student, remarks) => {
  const doc = new jsPDF();
  const generatedDate = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  // Header
  doc.setFontSize(22);
  doc.setTextColor(15, 23, 42);
  doc.text('InsightED', 105, 20, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setTextColor(100);
  doc.text('Official Student Academic Report', 105, 30, { align: 'center' });
  
  doc.setFontSize(10);
  doc.text(`Generated on ${generatedDate}`, 105, 38, { align: 'center' });
  
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.5);
  doc.line(20, 45, 190, 45);

  // Student Info & Summary
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.text('Student Information', 20, 55);
  doc.text('Performance Summary', 120, 55);

  doc.setFont('helvetica', 'normal');
  doc.text(`Name: ${student.name}`, 20, 63);
  doc.text(`Roll No: ${student.rollNo}`, 20, 70);
  doc.text(`Class: ${student.classId}`, 20, 77);
  
  doc.text(`Overall Average: ${student.marks}%`, 120, 63);
  doc.text(`Attendance: ${student.attendance}%`, 120, 70);
  doc.text(`Status: ${student.status}`, 120, 77);

  // Test History Table
  doc.setFont('helvetica', 'bold');
  doc.text('Test Scores', 20, 95);
  
  const testData = mockTestHistory.map(test => [test.testName, test.date, `${test.marks}%`]);
  
  autoTable(doc, {
    startY: 100,
    head: [['Test Name', 'Date', 'Marks (%)']],
    body: testData,
    theme: 'grid',
    headStyles: { fillColor: [248, 250, 252], textColor: [15, 23, 42] },
    margin: { left: 20, right: 20 }
  });

  // Teacher Remarks
  const finalY = doc.lastAutoTable.finalY + 15;
  doc.setFont('helvetica', 'bold');
  doc.text('Teacher Remarks', 20, finalY);
  
  doc.setFont('helvetica', 'normal');
  let currentY = finalY + 8;
  
  if (!remarks || remarks.length === 0) {
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(150);
    doc.text('No remarks provided.', 20, currentY);
    doc.setFont('helvetica', 'normal');
  } else {
    doc.setTextColor(15, 23, 42);
    remarks.forEach(remark => {
      // Split text if it's too long
      const splitRemark = doc.splitTextToSize(`• ${remark}`, 170);
      doc.text(splitRemark, 20, currentY);
      currentY += (splitRemark.length * 6);
    });
  }

  // Footer
  const pageHeight = doc.internal.pageSize.height;
  doc.setDrawColor(200);
  doc.line(20, pageHeight - 20, 190, pageHeight - 20);
  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text('This is a computer-generated document and does not require a signature.', 20, pageHeight - 12);
  doc.text('Powered by InsightED Platform', 190, pageHeight - 12, { align: 'right' });

  doc.save(`${student.rollNo}_${student.name.replace(' ', '_')}_Report.pdf`);
};
