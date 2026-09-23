'use client';

import React, { useState } from 'react';
import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';
import { MobileBottomNav } from './MobileBottomNav';
import { useAppStore } from '../../lib/store';
import { X } from 'lucide-react';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { currentView } = useAppStore();

  // If viewing public landing page, skip app shell wrapper
  if (currentView === 'landing') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-edexora-bg flex flex-col font-sans text-slate-900 antialiased selection:bg-edexora-yellow selection:text-slate-950">
      {/* Top App Header */}
      <AppHeader onMobileMenuToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />

      <div className="flex-1 flex overflow-hidden relative">
        {/* Desktop Sidebar */}
        <div className="hidden md:block shrink-0 sticky top-[61px] h-[calc(100vh-61px)]">
          <AppSidebar />
        </div>

        {/* Mobile Sidebar Overlay Drawer */}
        {isMobileSidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div
              onClick={() => setIsMobileSidebarOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
            />
            {/* Sidebar content */}
            <div className="relative w-72 bg-white h-full z-10 shadow-2xl flex flex-col">
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="absolute top-3 right-3 p-2 text-slate-500 hover:text-slate-900 bg-slate-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
              <AppSidebar onCloseMobile={() => setIsMobileSidebarOpen(false)} />
            </div>
          </div>
        )}

        {/* Main Content Scroll Area */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-8 p-3 sm:p-5 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav />
    </div>
  );
};
