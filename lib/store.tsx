'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Role,
  StudentProfile,
  TeacherProfile,
  User,
  Subject,
  Chapter,
  Lesson,
  Package,
  Transaction,
  LiveClass,
  Quiz,
  QuizAttempt,
  WatchProgress,
  NotificationItem,
} from '../types';
import {
  DEMO_STUDENT,
  DEMO_TEACHERS,
  DEMO_ADMIN,
  DEMO_ALL_STUDENTS,
  DEMO_PACKAGES,
  DEMO_SUBJECTS,
  DEMO_CHAPTERS,
  DEMO_LESSONS,
  DEMO_TRANSACTIONS,
  DEMO_LIVE_CLASSES,
  DEMO_QUIZZES,
  DEMO_QUIZ_ATTEMPTS,
  DEMO_WATCH_PROGRESS,
  DEMO_NOTIFICATIONS,
} from './demoData';

export type AppView =
  | 'landing'
  | 'dashboard'
  | 'courses'
  | 'lesson-view'
  | 'live'
  | 'quizzes'
  | 'quiz-view'
  | 'progress'
  | 'payments'
  | 'admin-students'
  | 'admin-teachers'
  | 'admin-courses'
  | 'admin-finance'
  | 'admin-reports'
  | 'settings';

export const ROLE_PINS: Record<Role, string> = {
  student: '9847',
  teacher: '022931',
  admin: '9526',
};

export interface AppContextType {
  // Auth & Security PIN
  isAuthenticated: boolean;
  isPinModalOpen: boolean;
  setIsPinModalOpen: (open: boolean) => void;
  pendingRoleSwitch: Role | null;
  setPendingRoleSwitch: (role: Role | null) => void;
  loginWithPin: (targetRole: Role, pin: string) => boolean;
  logout: () => void;
  requestRoleSwitch: (targetRole: Role) => void;

  // Navigation & Role
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  selectedSubjectId: string | null;
  setSelectedSubjectId: (id: string | null) => void;
  selectedLessonId: string | null;
  setSelectedLessonId: (id: string | null) => void;
  selectedQuizId: string | null;
  setSelectedQuizId: (id: string | null) => void;
  selectedLiveClassId: string | null;
  setSelectedLiveClassId: (id: string | null) => void;

  // Search & Modals
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  isPackageModalOpen: boolean;
  setIsPackageModalOpen: (open: boolean) => void;

  // Data
  currentStudent: StudentProfile;
  currentTeacher: TeacherProfile;
  currentAdmin: User;
  students: StudentProfile[];
  teachers: TeacherProfile[];
  packages: Package[];
  subjects: Subject[];
  chapters: Chapter[];
  lessons: Lesson[];
  transactions: Transaction[];
  liveClasses: LiveClass[];
  quizzes: Quiz[];
  quizAttempts: QuizAttempt[];
  watchProgress: WatchProgress[];
  notifications: NotificationItem[];

  // Actions
  unlockPackage: (packageId: string, paymentMethod: 'UPI' | 'Card' | 'Netbanking') => void;
  updateWatchProgress: (lessonId: string, currentTimeSeconds: number, durationSeconds: number) => void;
  markLessonComplete: (lessonId: string) => void;
  submitQuizAttempt: (quizId: string, score: number, totalMarks: number, timeSpentSeconds: number) => void;
  addOrUpdateStudent: (student: StudentProfile) => void;
  addOrUpdateTeacher: (teacher: TeacherProfile) => void;
  addOrUpdatePackage: (pkg: Package) => void;
  addOrUpdateLesson: (lesson: Lesson) => void;
  addOrUpdateLiveClass: (liveClass: LiveClass) => void;
  markNotificationRead: (id: string) => void;
  
  // Helpers
  getAgeCategory: () => 'primary' | 'middle' | 'secondary';
  openLesson: (lessonId: string) => void;
  openSubject: (subjectId: string) => void;
  openQuiz: (quizId: string) => void;
}

const defaultStoreValue: AppContextType = {
  isAuthenticated: false,
  isPinModalOpen: true,
  setIsPinModalOpen: () => {},
  pendingRoleSwitch: null,
  setPendingRoleSwitch: () => {},
  loginWithPin: () => false,
  logout: () => {},
  requestRoleSwitch: () => {},
  currentRole: 'student',
  setCurrentRole: () => {},
  currentView: 'dashboard',
  setCurrentView: () => {},
  selectedSubjectId: 'sub-math-8',
  setSelectedSubjectId: () => {},
  selectedLessonId: 'les-m3-06',
  setSelectedLessonId: () => {},
  selectedQuizId: 'quiz-math-c3-06',
  setSelectedQuizId: () => {},
  selectedLiveClassId: 'live-math-01',
  setSelectedLiveClassId: () => {},
  searchQuery: '',
  setSearchQuery: () => {},
  isSearchOpen: false,
  setIsSearchOpen: () => {},
  isNotificationsOpen: false,
  setIsNotificationsOpen: () => {},
  isPackageModalOpen: false,
  setIsPackageModalOpen: () => {},
  currentStudent: DEMO_STUDENT,
  currentTeacher: DEMO_TEACHERS[0],
  currentAdmin: DEMO_ADMIN,
  students: DEMO_ALL_STUDENTS,
  teachers: DEMO_TEACHERS,
  packages: DEMO_PACKAGES,
  subjects: DEMO_SUBJECTS,
  chapters: DEMO_CHAPTERS,
  lessons: DEMO_LESSONS,
  transactions: DEMO_TRANSACTIONS,
  liveClasses: DEMO_LIVE_CLASSES,
  quizzes: DEMO_QUIZZES,
  quizAttempts: DEMO_QUIZ_ATTEMPTS,
  watchProgress: DEMO_WATCH_PROGRESS,
  notifications: DEMO_NOTIFICATIONS,
  unlockPackage: () => {},
  updateWatchProgress: () => {},
  markLessonComplete: () => {},
  submitQuizAttempt: () => {},
  addOrUpdateStudent: () => {},
  addOrUpdateTeacher: () => {},
  addOrUpdatePackage: () => {},
  addOrUpdateLesson: () => {},
  addOrUpdateLiveClass: () => {},
  markNotificationRead: () => {},
  getAgeCategory: () => 'secondary',
  openLesson: () => {},
  openSubject: () => {},
  openQuiz: () => {},
};

const AppContext = createContext<AppContextType>(defaultStoreValue);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState<boolean>(true);
  const [pendingRoleSwitch, setPendingRoleSwitch] = useState<Role | null>(null);

  const [currentRole, setCurrentRole] = useState<Role>('student');
  const [currentView, setCurrentView] = useState<AppView>('dashboard');

  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>('sub-math-8');
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>('les-m3-06');
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>('quiz-math-c3-06');
  const [selectedLiveClassId, setSelectedLiveClassId] = useState<string | null>('live-math-01');

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);

  // Core Data Collections
  const [currentStudent, setCurrentStudent] = useState<StudentProfile>(DEMO_STUDENT);
  const [currentTeacher] = useState<TeacherProfile>(DEMO_TEACHERS[0]);
  const [currentAdmin] = useState<User>(DEMO_ADMIN);
  const [students, setStudents] = useState<StudentProfile[]>(DEMO_ALL_STUDENTS);
  const [teachers, setTeachers] = useState<TeacherProfile[]>(DEMO_TEACHERS);
  const [packages, setPackages] = useState<Package[]>(DEMO_PACKAGES);
  const [subjects] = useState<Subject[]>(DEMO_SUBJECTS);
  const [chapters] = useState<Chapter[]>(DEMO_CHAPTERS);
  const [lessons, setLessons] = useState<Lesson[]>(DEMO_LESSONS);
  const [transactions, setTransactions] = useState<Transaction[]>(DEMO_TRANSACTIONS);
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>(DEMO_LIVE_CLASSES);
  const [quizzes] = useState<Quiz[]>(DEMO_QUIZZES);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>(DEMO_QUIZ_ATTEMPTS);
  const [watchProgress, setWatchProgress] = useState<WatchProgress[]>(DEMO_WATCH_PROGRESS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(DEMO_NOTIFICATIONS);

  // PIN Authentication method
  const loginWithPin = (targetRole: Role, pin: string): boolean => {
    const expectedPin = ROLE_PINS[targetRole];
    if (pin.trim() === expectedPin) {
      setIsAuthenticated(true);
      setCurrentRole(targetRole);
      setPendingRoleSwitch(null);
      setIsPinModalOpen(false);
      setCurrentView('dashboard');
      return true;
    }
    return false;
  };

  const requestRoleSwitch = (targetRole: Role) => {
    if (targetRole === currentRole && isAuthenticated) return;
    setPendingRoleSwitch(targetRole);
    setIsPinModalOpen(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setPendingRoleSwitch(null);
    setIsPinModalOpen(true);
    setCurrentView('dashboard');
  };

  // Age appropriate classification helper
  const getAgeCategory = (): 'primary' | 'middle' | 'secondary' => {
    const lvl = currentStudent.classLevel;
    if (lvl <= 4) return 'primary';
    if (lvl <= 7) return 'middle';
    return 'secondary';
  };

  // Quick navigation helpers
  const openLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setCurrentView('lesson-view');
  };

  const openSubject = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    setCurrentView('courses');
  };

  const openQuiz = (quizId: string) => {
    setSelectedQuizId(quizId);
    setCurrentView('quiz-view');
  };

  // Unlock package action
  const unlockPackage = (packageId: string, paymentMethod: 'UPI' | 'Card' | 'Netbanking') => {
    const pkg = packages.find((p) => p.id === packageId) || packages[0];

    // Create transaction log
    const newTxn: Transaction = {
      id: `txn-${Date.now().toString().slice(-5)}`,
      studentId: currentStudent.id,
      studentName: currentStudent.name,
      packageId: pkg.id,
      packageName: `${pkg.name} (${pkg.classCount} Classes)`,
      amount: pkg.price,
      classesUnlocked: pkg.classCount,
      date: new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      paymentMethod,
      status: 'Successful',
      receiptNumber: `EDX-2026-${Math.floor(10000 + Math.random() * 90000)}`,
    };

    setTransactions((prev) => [newTxn, ...prev]);

    // Update current student profile entitlement
    const updatedStudent: StudentProfile = {
      ...currentStudent,
      totalClassesUnlocked: currentStudent.totalClassesUnlocked + pkg.classCount,
      remainingClassesCount: currentStudent.remainingClassesCount + pkg.classCount,
      currentPackageId: pkg.id,
    };

    setCurrentStudent(updatedStudent);

    // Update student in list
    setStudents((prev) =>
      prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
    );

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: '🎉 Package Purchase Successful!',
      message: `₹${pkg.price} payment completed. ${pkg.classCount} classes unlocked. Enjoy learning!`,
      category: 'Payment',
      timestamp: 'Just now',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
    setIsPackageModalOpen(false);
  };

  // Watch progress persistence
  const updateWatchProgress = (
    lessonId: string,
    currentTimeSeconds: number,
    durationSeconds: number
  ) => {
    const percentage = Math.min(100, Math.round((currentTimeSeconds / durationSeconds) * 100));
    const completed = percentage >= 90;

    setWatchProgress((prev) => {
      const existingIdx = prev.findIndex(
        (wp) => wp.lessonId === lessonId && wp.studentId === currentStudent.id
      );
      const newEntry: WatchProgress = {
        lessonId,
        studentId: currentStudent.id,
        currentTimeSeconds,
        durationSeconds,
        percentage,
        completed,
        lastWatchedAt: new Date().toISOString(),
      };

      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx] = newEntry;
        return copy;
      }
      return [...prev, newEntry];
    });

    if (completed) {
      markLessonComplete(lessonId);
    }
  };

  const markLessonComplete = (lessonId: string) => {
    const existing = watchProgress.find(
      (wp) => wp.lessonId === lessonId && wp.completed
    );

    if (!existing) {
      const updatedStudent: StudentProfile = {
        ...currentStudent,
        completedClassesCount: currentStudent.completedClassesCount + 1,
        remainingClassesCount: Math.max(0, currentStudent.remainingClassesCount - 1),
      };
      setCurrentStudent(updatedStudent);
      setStudents((prev) =>
        prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
      );
    }
  };

  const submitQuizAttempt = (
    quizId: string,
    score: number,
    totalMarks: number,
    timeSpentSeconds: number
  ) => {
    const quiz = quizzes.find((q) => q.id === quizId);
    const percentage = Math.round((score / totalMarks) * 100);
    const passed = score >= (quiz?.passingMarks || 6);

    const newAttempt: QuizAttempt = {
      id: `qa-${Date.now()}`,
      quizId,
      studentId: currentStudent.id,
      quizTitle: quiz?.title || 'Quiz Test',
      score,
      totalMarks,
      percentage,
      timeSpentSeconds,
      date: new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      passed,
    };

    setQuizAttempts((prev) => [newAttempt, ...prev]);

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: passed ? '🎯 Quiz Passed!' : '📝 Quiz Completed',
      message: `You scored ${percentage}% (${score}/${totalMarks}) in ${quiz?.title}`,
      category: 'Quiz',
      timestamp: 'Just now',
      read: false,
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  // Admin Actions
  const addOrUpdateStudent = (student: StudentProfile) => {
    setStudents((prev) => {
      const exists = prev.some((s) => s.id === student.id);
      if (exists) return prev.map((s) => (s.id === student.id ? student : s));
      return [...prev, student];
    });
  };

  const addOrUpdateTeacher = (teacher: TeacherProfile) => {
    setTeachers((prev) => {
      const exists = prev.some((t) => t.id === teacher.id);
      if (exists) return prev.map((t) => (t.id === teacher.id ? teacher : t));
      return [...prev, teacher];
    });
  };

  const addOrUpdatePackage = (pkg: Package) => {
    setPackages((prev) => {
      const exists = prev.some((p) => p.id === pkg.id);
      if (exists) return prev.map((p) => (p.id === pkg.id ? pkg : p));
      return [...prev, pkg];
    });
  };

  const addOrUpdateLesson = (lesson: Lesson) => {
    setLessons((prev) => {
      const exists = prev.some((l) => l.id === lesson.id);
      if (exists) return prev.map((l) => (l.id === lesson.id ? lesson : l));
      return [...prev, lesson];
    });
  };

  const addOrUpdateLiveClass = (liveClass: LiveClass) => {
    setLiveClasses((prev) => {
      const exists = prev.some((lc) => lc.id === liveClass.id);
      if (exists) return prev.map((lc) => (lc.id === liveClass.id ? lc : liveClass));
      return [...prev, liveClass];
    });
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        isPinModalOpen,
        setIsPinModalOpen,
        pendingRoleSwitch,
        setPendingRoleSwitch,
        loginWithPin,
        logout,
        requestRoleSwitch,
        currentRole,
        setCurrentRole,
        currentView,
        setCurrentView,
        selectedSubjectId,
        setSelectedSubjectId,
        selectedLessonId,
        setSelectedLessonId,
        selectedQuizId,
        setSelectedQuizId,
        selectedLiveClassId,
        setSelectedLiveClassId,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
        isPackageModalOpen,
        setIsPackageModalOpen,
        currentStudent,
        currentTeacher,
        currentAdmin,
        students,
        teachers,
        packages,
        subjects,
        chapters,
        lessons,
        transactions,
        liveClasses,
        quizzes,
        quizAttempts,
        watchProgress,
        notifications,
        unlockPackage,
        updateWatchProgress,
        markLessonComplete,
        submitQuizAttempt,
        addOrUpdateStudent,
        addOrUpdateTeacher,
        addOrUpdatePackage,
        addOrUpdateLesson,
        addOrUpdateLiveClass,
        markNotificationRead,
        getAgeCategory,
        openLesson,
        openSubject,
        openQuiz,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const context = useContext(AppContext);
  return context || defaultStoreValue;
};
