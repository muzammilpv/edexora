'use client';

import React from 'react';
import {
  PieChart,
  BarChart3,
  Download,
  Calendar,
  Filter,
  FileText,
  TrendingUp,
  Award,
} from 'lucide-react';
import { useAppStore } from '../../lib/store';

export const ReportsView: React.FC = () => {
  const { students, subjects, quizAttempts } = useAppStore();

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
          onClick={() => alert('Exporting platform CSV report...')}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition flex items-center gap-2 self-start md:self-auto shadow-sm"
        >
          <Download className="w-4 h-4 text-edexora-yellow" /> Export Full Report (.CSV)
        </button>
      </div>

      {/* Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Student Progress Report', desc: 'Class completion %, quiz scores & active remaining quotas.', count: '8 Students' },
          { title: 'Teacher Performance Report', desc: 'Published lesson counts, live attendance & student feedback.', count: '4 Faculty' },
          { title: 'Course & Curriculum Report', desc: 'Subject-wise engagement across CBSE and Kerala State.', count: '5 Subjects' },
          { title: 'Revenue & Package Report', desc: 'Financial transaction logs, package renewals & invoices.', count: '₹1,48,500' },
        ].map((rep, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <FileText className="w-5 h-5 text-amber-500" />
              <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                {rep.count}
              </span>
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm">{rep.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{rep.desc}</p>
            <button
              onClick={() => alert(`Downloading ${rep.title}...`)}
              className="w-full pt-2 text-xs font-bold text-slate-900 hover:text-amber-600 flex items-center gap-1 border-t border-slate-100"
            >
              <span>Download PDF Summary</span> →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
