'use client';

import React from 'react';
import { Settings, User, Shield, Phone, Mail, Globe, Bell } from 'lucide-react';
import { useAppStore } from '../../lib/store';

export const SettingsView: React.FC = () => {
  const { currentRole, currentStudent, currentTeacher, currentAdmin } = useAppStore();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
        <h1 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-2">
          <Settings className="w-6 h-6 text-edexora-yellow fill-slate-900" />
          Account & App Settings
        </h1>
        <p className="text-xs md:text-sm text-slate-500">
          Manage your personal profile, notification preferences, and curriculum settings.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
          Profile Information
        </h3>
        <div className="flex items-center gap-4">
          <img
            src={
              currentRole === 'student'
                ? currentStudent.avatar
                : currentRole === 'teacher'
                ? currentTeacher.avatar
                : currentAdmin.avatar
            }
            alt="User Avatar"
            className="w-16 h-16 rounded-full object-cover border-2 border-edexora-yellow"
          />
          <div>
            <div className="text-lg font-black text-slate-900">
              {currentRole === 'student'
                ? currentStudent.name
                : currentRole === 'teacher'
                ? currentTeacher.name
                : currentAdmin.name}
            </div>
            <div className="text-xs text-slate-500">
              {currentRole === 'student'
                ? `Student • Class ${currentStudent.classLevel} (${currentStudent.curriculum})`
                : currentRole === 'teacher'
                ? 'Faculty Mentor'
                : 'Platform Administrator'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
