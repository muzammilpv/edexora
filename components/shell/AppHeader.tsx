'use client';

import React from 'react';
import Image from 'next/image';
import {
  Search,
  Bell,
  UserCheck,
  Sparkles,
  ChevronDown,
  Shield,
  GraduationCap,
  Briefcase,
  Menu,
  Lock,
} from 'lucide-react';
import { useAppStore, AppView } from '../../lib/store';
import { Role } from '../../types';

export const AppHeader: React.FC<{ onMobileMenuToggle?: () => void }> = ({
  onMobileMenuToggle,
}) => {
  const {
    currentRole,
    requestRoleSwitch,
    currentView,
    setCurrentView,
    currentStudent,
    currentTeacher,
    currentAdmin,
    notifications,
    setIsNotificationsOpen,
    setIsSearchOpen,
    getAgeCategory,
    logout,
  } = useAppStore();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getPageTitle = () => {
    switch (currentView) {
      case 'dashboard':
        return currentRole === 'admin'
          ? 'Platform Analytics Dashboard'
          : currentRole === 'teacher'
          ? 'Teacher Overview'
          : 'Student Dashboard';
      case 'courses':
        return 'Enrolled Courses & Curriculum';
      case 'lesson-view':
        return 'Video Lesson';
      case 'live':
        return 'Live Online Classes';
      case 'quizzes':
        return 'Quizzes & Practice Tests';
      case 'quiz-view':
        return 'Interactive Test Engine';
      case 'progress':
        return 'Academic Progress & Reports';
      case 'payments':
        return 'Package & Transaction History';
      case 'admin-students':
        return 'Student Management';
      case 'admin-teachers':
        return 'Teacher Directory';
      case 'admin-courses':
        return 'Course & Content Manager';
      case 'admin-finance':
        return 'Finance & Revenue';
      case 'admin-reports':
        return 'Platform Intelligence Reports';
      case 'settings':
        return 'Account & App Settings';
      default:
        return 'EDEXORA Learning';
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const role = e.target.value as Role;
    if (role !== currentRole) {
      requestRoleSwitch(role);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-2.5 md:px-6 md:py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Mobile Menu Toggle & Brand / Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileMenuToggle}
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-edexora-yellow flex items-center justify-center">
              <Image
                src="/edexora-logo.jpg"
                alt="Edexora Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-extrabold tracking-tight text-slate-900 leading-none block">
                EDEXORA
              </span>
              <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase">
                Online Tuition
              </span>
            </div>
          </div>

          <div className="h-5 w-[1px] bg-slate-200 hidden md:block mx-1" />

          <h1 className="text-base md:text-lg font-bold text-slate-800 truncate hidden sm:block">
            {getPageTitle()}
          </h1>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-xs md:max-w-md mx-2">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center gap-2.5 px-3.5 py-1.5 md:py-2 bg-slate-100 hover:bg-slate-150 border border-slate-200 rounded-full text-xs md:text-sm text-slate-500 transition text-left shadow-inner"
          >
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate">Search lessons, subjects, tests...</span>
            <kbd className="hidden lg:inline-flex ml-auto items-center px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white rounded border border-slate-200">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right: Actions, Role Quick-Switcher & Profile */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Role Switcher with Lock */}
          <div className="relative flex items-center bg-slate-100 border border-slate-200 rounded-full px-2.5 py-1 text-xs">
            <Lock className="w-3.5 h-3.5 text-slate-500 mr-1.5 hidden sm:inline" />
            <select
              value={currentRole}
              onChange={handleRoleChange}
              className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer pr-4 text-xs appearance-none"
            >
              <option value="student">🎓 Student (Alex)</option>
              <option value="teacher">👨‍🏫 Teacher (Dr. Sarah)</option>
              <option value="admin">🛡️ Admin (Super Access)</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 pointer-events-none" />
          </div>

          {/* Notification Icon */}
          <button
            onClick={() => setIsNotificationsOpen(true)}
            className="relative p-2 rounded-full text-slate-700 hover:bg-slate-100 transition"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Profile Badge */}
          <div
            onClick={() => setCurrentView('progress')}
            className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-slate-100 transition"
          >
            <img
              src={
                currentRole === 'student'
                  ? currentStudent.avatar
                  : currentRole === 'teacher'
                  ? currentTeacher.avatar
                  : currentAdmin.avatar
              }
              alt="Avatar"
              className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover border-2 border-edexora-yellow shadow-sm"
            />
            <div className="hidden xl:block text-left pr-1">
              <div className="text-xs font-bold text-slate-900 leading-tight">
                {currentRole === 'student'
                  ? currentStudent.name
                  : currentRole === 'teacher'
                  ? currentTeacher.name
                  : currentAdmin.name}
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                {currentRole === 'student'
                  ? `Class ${currentStudent.classLevel} • ${currentStudent.curriculum}`
                  : currentRole === 'teacher'
                  ? 'Faculty Educator'
                  : 'Super Admin'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
