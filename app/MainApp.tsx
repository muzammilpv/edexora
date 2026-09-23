'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore } from '../lib/store';
import { AppShell } from '../components/shell/AppShell';
import { StudentDashboard } from '../components/student/StudentDashboard';
import { CourseBrowser } from '../components/student/CourseBrowser';
import { VideoLessonPlayer } from '../components/student/VideoLessonPlayer';
import { LiveClassHub } from '../components/student/LiveClassHub';
import { QuizEngine } from '../components/student/QuizEngine';
import { PackageUnlockModal } from '../components/student/PackageUnlockModal';

import { TeacherDashboard } from '../components/teacher/TeacherDashboard';

import { AdminDashboard } from '../components/admin/AdminDashboard';
import { StudentManagement } from '../components/admin/StudentManagement';
import { TeacherManagement } from '../components/admin/TeacherManagement';
import { CoursePackageManagement } from '../components/admin/CoursePackageManagement';
import { FinanceDashboard } from '../components/admin/FinanceDashboard';
import { ReportsView } from '../components/admin/ReportsView';

import { LandingPage } from '../components/landing/LandingPage';
import { SettingsView } from '../components/settings/SettingsView';
import { GlobalSearchModal } from '../components/search/GlobalSearchModal';
import { NotificationDrawer } from '../components/notifications/NotificationDrawer';
import { PinAuthModal } from '../components/auth/PinAuthModal';
import { ErrorBoundary } from '../components/common/ErrorBoundary';

const MainAppContent: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const store = useAppStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-sans">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-edexora-yellow text-slate-950 flex items-center justify-center font-black mx-auto animate-bounce text-xl shadow-highlight">
            E
          </div>
          <div className="text-base font-bold text-slate-200">Loading EDEXORA Platform...</div>
        </div>
      </div>
    );
  }

  const { currentView, currentRole } = store;

  const renderContent = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage />;

      case 'dashboard':
        if (currentRole === 'admin') return <AdminDashboard />;
        if (currentRole === 'teacher') return <TeacherDashboard />;
        return <StudentDashboard />;

      case 'courses':
        return <CourseBrowser />;

      case 'lesson-view':
        return <VideoLessonPlayer />;

      case 'live':
        return <LiveClassHub />;

      case 'quizzes':
      case 'quiz-view':
        return <QuizEngine />;

      case 'progress':
        return <StudentDashboard />;

      case 'payments':
        return <FinanceDashboard />;

      case 'admin-students':
        return <StudentManagement />;

      case 'admin-teachers':
        return <TeacherManagement />;

      case 'admin-courses':
        return <CoursePackageManagement />;

      case 'admin-finance':
        return <FinanceDashboard />;

      case 'admin-reports':
        return <ReportsView />;

      case 'settings':
        return <SettingsView />;

      default:
        return <StudentDashboard />;
    }
  };

  return (
    <>
      <AppShell>{renderContent()}</AppShell>
      <PinAuthModal />
      <PackageUnlockModal />
      <GlobalSearchModal />
      <NotificationDrawer />
    </>
  );
};

export const MainApp: React.FC = () => {
  return (
    <ErrorBoundary>
      <MainAppContent />
    </ErrorBoundary>
  );
};
