'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  Search,
  Plus,
  BookOpen,
  CheckCircle2,
  Mail,
  Phone,
  Award,
} from 'lucide-react';
import { useAppStore } from '../../lib/store';
import { TeacherProfile } from '../../types';

export const TeacherManagement: React.FC = () => {
  const { teachers, addOrUpdateTeacher, subjects } = useAppStore();
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New teacher form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [qual, setQual] = useState('M.Sc Mathematics, B.Ed');
  const [exp, setExp] = useState(8);

  const filtered = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newTeacher: TeacherProfile = {
      id: `tch-${Date.now()}`,
      name,
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@edexora.edu`,
      role: 'teacher',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      status: 'active',
      qualification: qual,
      experienceYears: exp,
      assignedSubjectIds: ['sub-math-8'],
      assignedClassLevels: [8, 9, 10],
      bio: 'Senior faculty mentor.',
    };

    addOrUpdateTeacher(newTeacher);
    setIsAddModalOpen(false);
    setName('');
    setEmail('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-edexora-yellow fill-slate-900" />
            Faculty Educator Directory
          </h1>
          <p className="text-xs md:text-sm text-slate-500">
            Manage teacher profiles, qualifications, and subject assignments across Class 1 to 10.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search faculty name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 bg-slate-100 border border-slate-200 rounded-full text-xs font-medium focus:outline-none focus:border-slate-900 w-48 md:w-64"
            />
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-edexora-yellow hover:bg-yellow-400 text-slate-950 font-black rounded-full text-xs transition shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Teacher
          </button>
        </div>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 space-y-4 hover:shadow-md transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-edexora-yellow shrink-0"
                />
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm leading-snug">{t.name}</h3>
                  <div className="text-[10px] text-slate-500 font-medium">{t.qualification}</div>
                </div>
              </div>

              <p className="text-xs text-slate-500 line-clamp-2">{t.bio}</p>

              <div className="pt-2 border-t border-slate-100 space-y-1 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Experience:</span>
                  <span className="font-bold text-slate-900">{t.experienceYears} Years</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Assigned Grades:</span>
                  <span className="font-bold text-slate-900">
                    Classes {t.assignedClassLevels.join(', ')}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => alert(`Viewing details for ${t.name}`)}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition"
            >
              Edit Teacher Profile
            </button>
          </div>
        ))}
      </div>

      {/* Add Teacher Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-black text-slate-900">Register New Teacher</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-800 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTeacher} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Dr. Sarah Thomas"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 border rounded-xl bg-slate-50 text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="teacher@edexora.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 border rounded-xl bg-slate-50 text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Academic Qualification</label>
                <input
                  type="text"
                  value={qual}
                  onChange={(e) => setQual(e.target.value)}
                  className="w-full p-2.5 border rounded-xl bg-slate-50 text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Teaching Experience (Years)</label>
                <input
                  type="number"
                  value={exp}
                  onChange={(e) => setExp(Number(e.target.value))}
                  className="w-full p-2.5 border rounded-xl bg-slate-50 text-slate-900"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 font-bold rounded-xl text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-edexora-yellow text-slate-950 font-black rounded-xl"
                >
                  Save Teacher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
