'use client';

import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  BookOpen,
  DollarSign,
  TrendingUp,
  Video,
  CreditCard,
  PieChart,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  ArrowRight,
  Printer,
  FileText,
} from 'lucide-react';
import { useAppStore } from '../../lib/store';
import { InvoiceGeneratorModal } from './InvoiceGeneratorModal';

export const AdminDashboard: React.FC = () => {
  const {
    students,
    teachers,
    subjects,
    transactions,
    liveClasses,
    packages,
    setCurrentView,
  } = useAppStore();

  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  const totalRevenue = transactions.reduce((acc, t) => acc + t.amount, 0) + 145000;
  const activeStudentsCount = students.filter((s) => s.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Top Banner with Invoice Button */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 md:p-8 border border-slate-800 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <span className="bg-edexora-yellow text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            Super Administrator Portal
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            Platform Intelligence Dashboard 🛡️
          </h1>
          <p className="text-slate-400 text-xs md:text-sm max-w-xl">
            Real-time telemetry across student enrollments, teacher assignments, package sales, revenue, and fee billing.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
          <button
            onClick={() => setIsInvoiceOpen(true)}
            className="px-4 py-2.5 bg-edexora-yellow text-slate-950 font-black rounded-xl text-xs transition hover:bg-yellow-400 shadow-highlight flex items-center gap-2"
          >
            <FileText className="w-4 h-4" /> Generate Fee Invoice / Bill
          </button>
          <button
            onClick={() => setCurrentView('admin-finance')}
            className="px-4 py-2.5 bg-slate-900 border border-slate-800 text-white font-bold rounded-xl text-xs transition hover:bg-slate-800 flex items-center gap-2"
          >
            <DollarSign className="w-4 h-4 text-edexora-yellow" /> Finance Logs
          </button>
        </div>
      </div>

      {/* Analytics KPI Stat Grid (6 Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 md:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase">Students</span>
            <Users className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">{students.length}</div>
          <div className="text-[10px] text-emerald-600 font-bold">{activeStudentsCount} Active</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase">Faculty</span>
            <GraduationCap className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">{teachers.length}</div>
          <div className="text-[10px] text-slate-500 font-medium">Class 1–10</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase">Subjects</span>
            <BookOpen className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">{subjects.length}</div>
          <div className="text-[10px] text-slate-500 font-medium">CBSE & Kerala</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase">Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">₹{totalRevenue.toLocaleString()}</div>
          <div className="text-[10px] text-emerald-600 font-bold">+18.4% this mo</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase">Live Streams</span>
            <Video className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">{liveClasses.length}</div>
          <div className="text-[10px] text-red-600 font-bold">1 Streaming Now</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase">Packages</span>
            <CreditCard className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">{packages.length}</div>
          <div className="text-[10px] text-slate-500 font-medium">₹500 Base Rate</div>
        </div>
      </div>

      {/* SVG Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Revenue Growth Chart (Col 7) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 md:p-6 border border-slate-200 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-black text-slate-900">Monthly Revenue & Sales Trend</h3>
              <p className="text-xs text-slate-500">
                Fee payments and class packages over 6 months
              </p>
            </div>
            <span className="text-xs font-bold text-slate-900 bg-edexora-yellow px-3 py-1 rounded-full">
              2026 YTD
            </span>
          </div>

          {/* SVG Line Chart */}
          <div className="h-56 w-full pt-4 relative flex items-end justify-between px-2">
            <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
              <path
                d="M 10 180 Q 80 140, 150 160 T 300 90 T 450 60 T 600 20"
                fill="none"
                stroke="#FFD200"
                strokeWidth="4"
              />
              <path
                d="M 10 180 Q 80 140, 150 160 T 300 90 T 450 60 T 600 20 L 600 220 L 10 220 Z"
                fill="url(#yellowGradient)"
                opacity="0.3"
              />
              <defs>
                <linearGradient id="yellowGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFD200" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            {['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((m) => (
              <div key={m} className="text-center z-10 text-[11px] font-bold text-slate-500">
                {m}
              </div>
            ))}
          </div>
        </div>

        {/* Enrollment Distribution by Class Level (Col 5) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 md:p-6 border border-slate-200 shadow-card space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-black text-slate-900">Enrollment by Grade Level</h3>
            <p className="text-xs text-slate-500">Class 1 to 10 Student Distribution</p>
          </div>

          {/* Bar chart representation */}
          <div className="space-y-2.5 text-xs font-bold text-slate-700">
            {[
              { grade: 'Class 8 (CBSE & Kerala)', count: 4, pct: 85 },
              { grade: 'Class 10 (Board Exam)', count: 2, pct: 60 },
              { grade: 'Class 5 (Kerala State)', count: 1, pct: 40 },
              { grade: 'Class 1–4 (Primary)', count: 1, pct: 30 },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between">
                  <span>{item.grade}</span>
                  <span className="text-slate-900">{item.count} Students</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-slate-900 h-full rounded-full"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Admin Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button
          onClick={() => setIsInvoiceOpen(true)}
          className="p-4 bg-edexora-yellow rounded-2xl border border-yellow-300 shadow-card hover:bg-yellow-400 transition text-left flex items-center justify-between group"
        >
          <div>
            <div className="text-xs font-bold text-slate-900 uppercase">Create</div>
            <div className="text-base font-black text-slate-950">Student Fee Bill</div>
          </div>
          <FileText className="w-5 h-5 text-slate-950 group-hover:scale-110 transition" />
        </button>

        <button
          onClick={() => setCurrentView('admin-students')}
          className="p-4 bg-white rounded-2xl border border-slate-200 shadow-card hover:border-slate-400 transition text-left flex items-center justify-between group"
        >
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase">Manage</div>
            <div className="text-base font-black text-slate-900">Student Directory</div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition" />
        </button>

        <button
          onClick={() => setCurrentView('admin-teachers')}
          className="p-4 bg-white rounded-2xl border border-slate-200 shadow-card hover:border-slate-400 transition text-left flex items-center justify-between group"
        >
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase">Manage</div>
            <div className="text-base font-black text-slate-900">Faculty Members</div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition" />
        </button>

        <button
          onClick={() => setCurrentView('admin-finance')}
          className="p-4 bg-white rounded-2xl border border-slate-200 shadow-card hover:border-slate-400 transition text-left flex items-center justify-between group"
        >
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase">Review</div>
            <div className="text-base font-black text-slate-900">Payments & Receipts</div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition" />
        </button>
      </div>

      {/* Invoice Generator Modal */}
      <InvoiceGeneratorModal
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
      />
    </div>
  );
};
