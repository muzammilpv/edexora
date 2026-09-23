'use client';

import React from 'react';
import Image from 'next/image';
import {
  Home,
  BookOpen,
  Video,
  FileCheck,
  TrendingUp,
  CreditCard,
  Users,
  GraduationCap,
  FolderPlus,
  DollarSign,
  PieChart,
  Settings,
  LogOut,
  Sparkles,
  Lock,
} from 'lucide-react';
import { useAppStore, AppView } from '../../lib/store';

interface NavItem {
  id: AppView;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

export const AppSidebar: React.FC<{
  onCloseMobile?: () => void;
}> = ({ onCloseMobile }) => {
  const {
    currentRole,
    currentView,
    setCurrentView,
    logout,
  } = useAppStore();

  const getNavItems = (): NavItem[] => {
    if (currentRole === 'student') {
      return [
        { id: 'dashboard', label: 'Home', icon: Home },
        { id: 'courses', label: 'Courses', icon: BookOpen },
        { id: 'live', label: 'Live Classes', icon: Video, badge: 'LIVE' },
        { id: 'quizzes', label: 'Tests & Quizzes', icon: FileCheck },
        { id: 'progress', label: 'Progress', icon: TrendingUp },
      ];
    } else if (currentRole === 'teacher') {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'courses', label: 'My Courses', icon: BookOpen },
        { id: 'live', label: 'Live Sessions', icon: Video, badge: 'HOST' },
        { id: 'admin-courses', label: 'Lessons & Videos', icon: FolderPlus },
        { id: 'progress', label: 'Student Analytics', icon: TrendingUp },
      ];
    } else {
      // Admin
      return [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'admin-students', label: 'Students', icon: Users },
        { id: 'admin-teachers', label: 'Teachers', icon: GraduationCap },
        { id: 'admin-courses', label: 'Course & Content', icon: FolderPlus },
        { id: 'admin-finance', label: 'Finance & Payments', icon: DollarSign },
        { id: 'admin-reports', label: 'Reports & Export', icon: PieChart },
      ];
    }
  };

  const navItems = getNavItems();

  const handleNavClick = (viewId: AppView) => {
    setCurrentView(viewId);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full select-none shadow-sm">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div
          onClick={() => handleNavClick('landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-edexora-yellow flex items-center justify-center">
            <Image
              src="/edexora-logo.jpg"
              alt="Edexora Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-slate-900 leading-tight block">
              EDEXORA
            </span>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block">
              Class 1–10 Tuition
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
          Main Menu ({currentRole.toUpperCase()})
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all group ${
                isActive
                  ? 'bg-edexora-yellow text-slate-950 font-bold shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-slate-950' : 'text-slate-500'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-slate-950 text-white'
                      : 'bg-red-100 text-red-600 animate-pulse'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Footer Section */}
      <div className="p-3 border-t border-slate-200 space-y-1 bg-slate-50/50">
        <button
          onClick={() => handleNavClick('settings')}
          className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
            currentView === 'settings'
              ? 'bg-slate-200 text-slate-900 font-bold'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Settings className="w-4 h-4 text-slate-500" />
          <span>App Settings</span>
        </button>

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-200 transition"
        >
          <Lock className="w-4 h-4 text-slate-500" />
          <span>Lock / Change PIN</span>
        </button>
      </div>
    </aside>
  );
};
