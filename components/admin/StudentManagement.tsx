'use client';

import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  Filter,
  CheckCircle2,
  XCircle,
  MoreVertical,
  BookOpen,
  Award,
  Zap,
  Phone,
  Mail,
  User,
} from 'lucide-react';
import { useAppStore } from '../../lib/store';
import { StudentProfile } from '../../types';

export const StudentManagement: React.FC = () => {
  const { students, addOrUpdateStudent } = useAppStore();
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState<number | 'ALL'>('ALL');
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);

  const filtered = students.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.parentName.toLowerCase().includes(search.toLowerCase());
    const matchClass = selectedClass === 'ALL' || s.classLevel === selectedClass;
    return matchSearch && matchClass;
  });

  const toggleStatus = (student: StudentProfile) => {
    const updated: StudentProfile = {
      ...student,
      status: student.status === 'active' ? 'inactive' : 'active',
    };
    addOrUpdateStudent(updated);
  };

  const grantBonusClasses = (student: StudentProfile, bonusCount: number) => {
    const updated: StudentProfile = {
      ...student,
      totalClassesUnlocked: student.totalClassesUnlocked + bonusCount,
      remainingClassesCount: student.remainingClassesCount + bonusCount,
    };
    addOrUpdateStudent(updated);
    setSelectedStudent(updated);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-edexora-yellow fill-slate-900" />
            Student Management Directory
          </h1>
          <p className="text-xs md:text-sm text-slate-500">
            View student profiles, monitor package entitlement limits, and manage access privileges.
          </p>
        </div>

        {/* Search & Class Filter */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search student or parent..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 bg-slate-100 border border-slate-200 rounded-full text-xs font-medium focus:outline-none focus:border-slate-900 w-48 md:w-64"
            />
          </div>

          <select
            value={selectedClass}
            onChange={(e) =>
              setSelectedClass(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))
            }
            className="bg-slate-100 border border-slate-200 rounded-full px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none"
          >
            <option value="ALL">All Grades (1–10)</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((c) => (
              <option key={c} value={c}>
                Class {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Student Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 uppercase tracking-wider text-slate-500 font-extrabold text-[10px]">
              <tr>
                <th className="p-4">Student Profile</th>
                <th className="p-4">Grade & Curriculum</th>
                <th className="p-4">Parent / Contact</th>
                <th className="p-4">Package Status</th>
                <th className="p-4">Classes Used</th>
                <th className="p-4">Account Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={s.avatar}
                        alt={s.name}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{s.name}</div>
                        <div className="text-[10px] text-slate-500">{s.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-slate-900">Class {s.classLevel}</span>
                    <div className="text-[10px] text-slate-500 font-semibold">{s.curriculum}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-slate-800">{s.parentName}</div>
                    <div className="text-[10px] text-slate-500">{s.parentPhone}</div>
                  </td>
                  <td className="p-4">
                    <span className="font-mono font-bold text-slate-900">
                      {s.remainingClassesCount} Remaining
                    </span>
                    <div className="text-[10px] text-slate-500">
                      Total Unlocked: {s.totalClassesUnlocked}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden mb-1">
                      <div
                        className="bg-edexora-yellow h-full rounded-full"
                        style={{
                          width: `${Math.min(
                            100,
                            (s.completedClassesCount / (s.totalClassesUnlocked || 1)) * 100
                          )}%`,
                        }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold">
                      {s.completedClassesCount} / {s.totalClassesUnlocked}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleStatus(s)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition ${
                        s.status === 'active'
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      {s.status}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedStudent(s)}
                      className="px-3 py-1.5 bg-slate-900 text-white rounded-xl text-[11px] font-bold hover:bg-slate-800 transition"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Detail Modal Drawer */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-5 border border-slate-200">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={selectedStudent.avatar}
                  alt={selectedStudent.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-edexora-yellow"
                />
                <div>
                  <h3 className="text-lg font-black text-slate-900">{selectedStudent.name}</h3>
                  <p className="text-xs text-slate-500">
                    Class {selectedStudent.classLevel} • {selectedStudent.curriculum}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-slate-400 hover:text-slate-800 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-slate-500 block text-[10px] font-bold">PARENT NAME</span>
                  <span className="font-bold text-slate-900">{selectedStudent.parentName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] font-bold">CONTACT PHONE</span>
                  <span className="font-bold text-slate-900">{selectedStudent.parentPhone}</span>
                </div>
              </div>

              {/* Class Package Entitlement stats */}
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-950 flex items-center gap-1">
                    <Zap className="w-4 h-4 text-edexora-yellow" /> Active Class Entitlement
                  </span>
                  <span className="font-mono font-extrabold text-slate-900">
                    {selectedStudent.remainingClassesCount} Remaining
                  </span>
                </div>
                <div className="text-[11px] text-slate-600">
                  Total Unlocked: {selectedStudent.totalClassesUnlocked} | Completed:{' '}
                  {selectedStudent.completedClassesCount}
                </div>
              </div>

              {/* Admin Bonus Action */}
              <div className="pt-2">
                <label className="font-bold text-slate-700 block mb-1">
                  Admin Action: Grant Bonus Classes
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => grantBonusClasses(selectedStudent, 5)}
                    className="px-3.5 py-2 bg-edexora-yellow text-slate-950 font-bold rounded-xl shadow-sm hover:bg-yellow-400 transition"
                  >
                    + Add 5 Classes
                  </button>
                  <button
                    onClick={() => grantBonusClasses(selectedStudent, 10)}
                    className="px-3.5 py-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition"
                  >
                    + Add 10 Classes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
