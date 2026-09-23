export type Role = 'student' | 'teacher' | 'admin';

export type CurriculumType = 'CBSE' | 'Kerala State';

export type PaymentStatus = 'Successful' | 'Pending' | 'Failed' | 'Refunded';

export type LiveStatus = 'LIVE NOW' | 'UPCOMING' | 'ENDED';

export type LessonStatus = 'Completed' | 'Continue' | 'Locked';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  phone?: string;
  status: 'active' | 'inactive';
}

export interface StudentProfile extends User {
  classLevel: number; // 1 to 10
  curriculum: CurriculumType;
  parentName: string;
  parentPhone: string;
  totalClassesUnlocked: number;
  completedClassesCount: number;
  remainingClassesCount: number;
  currentPackageId?: string;
  enrolledSubjectIds: string[];
}

export interface TeacherProfile extends User {
  qualification: string;
  experienceYears: number;
  assignedSubjectIds: string[];
  assignedClassLevels: number[];
  bio: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  classLevel: number;
  curriculum: CurriculumType;
  iconName?: string;
  icon?: string;
  color: string;
  totalLessons: number;
  description: string;
}

export interface Chapter {
  id: string;
  subjectId: string;
  title: string;
  order: number;
  totalLessons: number;
}

export interface Lesson {
  id: string;
  chapterId: string;
  subjectId: string;
  title: string;
  description: string;
  durationMinutes: number;
  durationFormatted: string;
  videoUrl: string;
  thumbnailUrl: string;
  teacherId: string;
  teacherName: string;
  order: number;
  notesPdfUrl?: string;
  studyMaterialsCount: number;
  quizId?: string;
  isLockedDefault?: boolean;
}

export interface Package {
  id: string;
  name: string;
  classCount: number;
  price: number; // e.g. 500
  validityDays: number; // e.g. 30
  description: string;
  curriculum?: CurriculumType;
  isPopular?: boolean;
  isActive: boolean;
}

export interface Transaction {
  id: string;
  studentId: string;
  studentName: string;
  packageId: string;
  packageName: string;
  amount: number;
  classesUnlocked: number;
  date: string;
  paymentMethod: 'UPI' | 'Card' | 'Netbanking';
  status: PaymentStatus;
  receiptNumber: string;
}

export interface LiveClass {
  id: string;
  subjectId: string;
  subjectName: string;
  chapterTitle: string;
  topic: string;
  teacherId: string;
  teacherName: string;
  teacherAvatar: string;
  classLevel: number;
  curriculum: CurriculumType;
  startTime: string;
  durationFormatted: string;
  status: LiveStatus;
  meetingLink?: string;
  streamUrl?: string;
  attendeesCount: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  lessonId?: string;
  subjectId: string;
  title: string;
  durationMinutes: number;
  questions: Question[];
  totalMarks: number;
  passingMarks: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  quizTitle: string;
  score: number;
  totalMarks: number;
  percentage: number;
  timeSpentSeconds: number;
  date: string;
  passed: boolean;
}

export interface WatchProgress {
  lessonId: string;
  studentId: string;
  currentTimeSeconds: number;
  durationSeconds: number;
  percentage: number;
  completed: boolean;
  lastWatchedAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: 'Class' | 'Live' | 'Payment' | 'Quiz' | 'System';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}
