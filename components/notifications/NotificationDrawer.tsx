'use client';

import React from 'react';
import { Bell, X, CheckCircle2, Radio, CreditCard, Award, BookOpen } from 'lucide-react';
import { useAppStore } from '../../lib/store';

export const NotificationDrawer: React.FC = () => {
  const {
    isNotificationsOpen,
    setIsNotificationsOpen,
    notifications,
    markNotificationRead,
  } = useAppStore();

  if (!isNotificationsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setIsNotificationsOpen(false)}
        className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity"
      />

      <div className="relative w-full max-w-sm bg-white h-full z-10 shadow-2xl flex flex-col border-l border-slate-200 animate-slideInRight">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-edexora-yellow fill-slate-900" />
            <h3 className="font-black text-slate-900 text-base">Notifications</h3>
          </div>
          <button
            onClick={() => setIsNotificationsOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="p-3 overflow-y-auto space-y-2.5 flex-1 text-xs">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`p-3.5 rounded-2xl border transition cursor-pointer ${
                n.read
                  ? 'bg-slate-50 border-slate-100 opacity-70'
                  : 'bg-amber-50/50 border-amber-200 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 mb-1">
                <span className="uppercase text-amber-900">{n.category}</span>
                <span>{n.timestamp}</span>
              </div>
              <h4 className="font-bold text-slate-900 text-xs mb-1">{n.title}</h4>
              <p className="text-slate-600 leading-relaxed text-[11px]">{n.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
