'use client';

import React from 'react';
import { Home, BookOpen, Video, FileCheck, User } from 'lucide-react';
import { useAppStore, AppView } from '../../lib/store';

export const MobileBottomNav: React.FC = () => {
  const { currentView, setCurrentView, currentRole } = useAppStore();

  if (currentRole === 'admin') {
    // Admin mobile navigation
    const adminNavs = [
      { id: 'dashboard' as AppView, label: 'Overview', icon: Home },
      { id: 'admin-students' as AppView, label: 'Students', icon: User },
      { id: 'admin-courses' as AppView, label: 'Courses', icon: BookOpen },
      { id: 'admin-finance' as AppView, label: 'Finance', icon: FileCheck },
    ];

    return (
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-2 py-1.5 shadow-highlight">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {adminNavs.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex flex-col items-center py-1 px-3 rounded-2xl transition-all ${
                  isActive
                    ? 'text-slate-950 font-bold bg-edexora-yellow shadow-sm scale-105'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                <span className="text-[10px] mt-0.5 tracking-tight font-semibold">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Student / Teacher Mobile Nav
  const navs = [
    { id: 'dashboard' as AppView, label: 'Home', icon: Home },
    { id: 'courses' as AppView, label: 'Courses', icon: BookOpen },
    { id: 'live' as AppView, label: 'Live', icon: Video, badge: 'LIVE' },
    { id: 'quizzes' as AppView, label: 'Tests', icon: FileCheck },
    { id: 'progress' as AppView, label: 'Profile', icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-1 py-1.5 shadow-highlight">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navs.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`relative flex flex-col items-center py-1 px-3 rounded-2xl transition-all ${
                isActive
                  ? 'text-slate-950 font-extrabold bg-edexora-yellow shadow-sm scale-105'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              <span className="text-[10px] mt-0.5 tracking-tight font-semibold">
                {item.label}
              </span>
              {item.badge && !isActive && (
                <span className="absolute -top-0.5 right-1 w-2 h-2 rounded-full bg-red-500 animate-ping" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
