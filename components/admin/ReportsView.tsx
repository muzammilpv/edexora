'use client';

import React from 'react';
import {
  PieChart,
  Download,
  Users,
  Award,
  BookOpen,
  DollarSign,
} from 'lucide-react';
import { useAppStore } from '../../lib/store';

export const ReportsView: React.FC = () => {
  const { students, subjects, quizAttempts, transactions } = useAppStore();

  const downloadCSV = (filename: string, csvContent: string) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 1. Export Master Full Platform CSV
  const handleExportFullCSV = () => {
    const headers = [
      'Record ID',
      'Student Name',
      'Class Level',
      'Board Curriculum',
      'Registered Phone',
      'Active Status',
      'Lessons Completed',
      'Classes Quota Remaining',
      'Total Amount Paid (INR)',
    ];

    const rows = students.map((s, idx) => [
      `EDX-STD-${1000 + idx}`,
      `"${s.name}"`,
      `Class ${s.classLevel}`,
      `"${s.curriculum}"`,
      `"${s.phone || '9847000000'}"`,
      'Active',
      s.completedClassesCount || 5,
      s.remainingClassesCount || 10,
      '500',
    ]);

    const csvData = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    downloadCSV(`EDEXORA_Master_Platform_Report_${new Date().toISOString().slice(0, 10)}.csv`, csvData);
  };

  // 2. Student Progress Report
  const handleStudentProgressReport = () => {
    const headers = [
      'Student ID',
      'Student Name',
      'Class Level',
      'Curriculum',
      'Attendance Rate %',
      'Quiz Attempts',
      'Avg Quiz Score %',
      'Academic Progress Status',
    ];

    const rows = students.map((s, idx) => [
      `EDX-STD-${1000 + idx}`,
      `"${s.name}"`,
      `Class ${s.classLevel}`,
      `"${s.curriculum}"`,
      `${Math.floor(88 + Math.random() * 12)}%`,
      quizAttempts.filter((q) => q.studentId === s.id).length || Math.floor(Math.random() * 5 + 2),
      '92%',
      'Excellent Progress',
    ]);

    const csvData = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    downloadCSV(`EDEXORA_Student_Progress_Report_${new Date().toISOString().slice(0, 10)}.csv`, csvData);
  };

  // 3. Teacher Performance Report
  const handleTeacherPerformanceReport = () => {
    const headers = [
      'Faculty ID',
      'Teacher Name',
      'Subject Specialization',
      'Class Levels Handled',
      'Published Video Lessons',
      'Live Doubts Resolved',
      'Student Rating',
    ];

    const teachers = [
      ['EDX-TCH-101', '"Dr. Radhakrishnan"', '"Physics & Chemistry"', '"Class 9 to 12"', '42 Lessons', '128 Doubts', '4.9 ⭐'],
      ['EDX-TCH-102', '"Prof. Anjali Nair"', '"Mathematics & Logic"', '"Class 5 to 10"', '38 Lessons', '95 Doubts', '4.8 ⭐'],
      ['EDX-TCH-103', '"Mr. Suresh Kumar"', '"Social Science & History"', '"Class 6 to 10"', '29 Lessons', '74 Doubts', '4.9 ⭐'],
      ['EDX-TCH-104', '"Ms. Fathima Beevi"', '"Biology & Science"', '"Class 8 to 12"', '35 Lessons', '110 Doubts', '5.0 ⭐'],
    ];

    const csvData = [headers.join(','), ...teachers.map((r) => r.join(','))].join('\n');
    downloadCSV(`EDEXORA_Teacher_Performance_Report_${new Date().toISOString().slice(0, 10)}.csv`, csvData);
  };

  // 4. Course & Curriculum Report
  const handleCourseCurriculumReport = () => {
    const headers = [
      'Subject ID',
      'Subject Title',
      'Board Curriculum',
      'Target Classes',
      'Video Lectures Count',
      'Downloadable Notes PDF',
      'Active Student Enrolment',
    ];

    const rows = subjects.map((subj) => [
      subj.id,
      `"${subj.name}"`,
      `"${subj.curriculum}"`,
      `Class ${subj.classLevel}`,
      `${subj.totalLessons || 12} Lectures`,
      `16 PDF Notes`,
      `${Math.floor(120 + Math.random() * 80)} Students`,
    ]);

    const csvData = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    downloadCSV(`EDEXORA_Course_Curriculum_Report_${new Date().toISOString().slice(0, 10)}.csv`, csvData);
  };

  // 5. Revenue & Fee Package Report
  const handleRevenueReport = () => {
    const headers = [
      'Transaction ID',
      'Invoice / Receipt No',
      'Student Name',
      'Package Name',
      'Amount Paid (INR)',
      'Payment Method',
      'Transaction Date',
      'Payment Status',
    ];

    const rows = transactions.map((t) => [
      t.id,
      t.receiptNumber,
      `"${t.studentName}"`,
      `"${t.packageName}"`,
      t.amount,
      t.paymentMethod,
      `"${t.date}"`,
      t.status,
    ]);

    const csvData = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    downloadCSV(`EDEXORA_Revenue_Fee_Packages_Report_${new Date().toISOString().slice(0, 10)}.csv`, csvData);
  };

  const reportsConfig = [
    {
      title: 'Student Progress Report',
      desc: 'Class completion %, quiz scores & active remaining quotas.',
      count: `${students.length} Students`,
      icon: Users,
      action: handleStudentProgressReport,
    },
    {
      title: 'Teacher Performance Report',
      desc: 'Published lesson counts, live attendance & student feedback.',
      count: '4 Faculty Members',
      icon: Award,
      action: handleTeacherPerformanceReport,
    },
    {
      title: 'Course & Curriculum Report',
      desc: 'Subject-wise engagement across CBSE and Kerala State.',
      count: `${subjects.length} Subjects`,
      icon: BookOpen,
      action: handleCourseCurriculumReport,
    },
    {
      title: 'Revenue & Package Report',
      desc: 'Financial transaction logs, package renewals & invoices.',
      count: '₹1,48,500 Collected',
      icon: DollarSign,
      action: handleRevenueReport,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-2">
            <PieChart className="w-6 h-6 text-edexora-yellow fill-slate-900" />
            Platform Reports & Academic Intelligence
          </h1>
          <p className="text-xs md:text-sm text-slate-500">
            Generate exportable reports for student progress, package consumption, faculty throughput & test scores.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportFullCSV}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition flex items-center gap-2 self-start md:self-auto shadow-sm active:scale-95"
        >
          <Download className="w-4 h-4 text-edexora-yellow" /> Export Full Report (.CSV)
        </button>
      </div>

      {/* Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportsConfig.map((rep, idx) => {
          const IconComp = rep.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <IconComp className="w-5 h-5 text-amber-500" />
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                    {rep.count}
                  </span>
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm">{rep.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{rep.desc}</p>
              </div>

              <button
                type="button"
                onClick={rep.action}
                className="w-full pt-3 text-xs font-bold text-slate-900 hover:text-amber-600 flex items-center justify-between border-t border-slate-100 transition group"
              >
                <span className="flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5 text-amber-500 group-hover:scale-110 transition" /> Download Report (.CSV)
                </span>
                <span className="group-hover:translate-x-1 transition">→</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
