'use client';

import React from 'react';
import {
  PlayCircle,
  Clock,
  Sparkles,
  BookOpen,
  Award,
  Video,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Calendar,
  Zap,
} from 'lucide-react';
import { useAppStore } from '../../lib/store';

export const StudentDashboard: React.FC = () => {
  const {
    currentStudent,
    lessons,
    watchProgress,
    liveClasses,
    quizAttempts,
    subjects,
    openLesson,
    openSubject,
    openQuiz,
    setIsPackageModalOpen,
    setCurrentView,
    getAgeCategory,
  } = useAppStore();

  const ageCat = getAgeCategory();

  // Find last watched or active lesson
  const lastWatch = watchProgress[0];
  const activeLesson =
    lessons.find((l) => l.id === lastWatch?.lessonId) || lessons[5]; // Lesson 6 default

  const resumeTimeFormatted = lastWatch
    ? `${Math.floor(lastWatch.currentTimeSeconds / 60)}:${(
        '0' + Math.floor(lastWatch.currentTimeSeconds % 60)
      ).slice(-2)}`
    : '18:42';

  const upcomingLive = liveClasses.find((lc) => lc.status === 'LIVE NOW') || liveClasses[0];
  const lastQuizAttempt = quizAttempts[0];

  return (
    <div className="space-y-5 md:space-y-6">
      {/* 1. Top Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 text-white rounded-2xl md:rounded-3xl p-5 md:p-7 shadow-card relative overflow-hidden border border-slate-800">
        {/* Yellow decorative accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-edexora-yellow/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="bg-edexora-yellow text-slate-950 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                Class {currentStudent.classLevel} • {currentStudent.curriculum}
              </span>
              <span className="text-slate-400 text-xs flex items-center gap-1 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-edexora-yellow" /> Active Learner
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              Welcome back, {currentStudent.name} 👋
            </h1>
            <p className="text-slate-300 text-xs md:text-sm max-w-xl">
              You are making great progress! Continue your Mathematics chapter or prepare for today&apos;s live class.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={() => setCurrentView('courses')}
              className="px-4 py-2.5 bg-edexora-yellow hover:bg-yellow-400 text-slate-950 font-bold rounded-xl text-xs md:text-sm transition flex items-center gap-2 shadow-highlight"
            >
              <BookOpen className="w-4 h-4" /> Browse Courses
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top Grid: Continue Learning & Package Progress Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">
        {/* Continue Learning Card */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-4 md:p-6 border border-slate-200 shadow-card flex flex-col justify-between relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-slate-500 tracking-wider">
              <PlayCircle className="w-4 h-4 text-edexora-yellow fill-slate-900" /> Continue Learning
            </div>
            <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
              Mathematics • Ch 3
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 my-2">
            <div
              onClick={() => openLesson(activeLesson.id)}
              className="relative w-full sm:w-44 h-28 rounded-xl overflow-hidden bg-slate-900 shrink-0 cursor-pointer group/thumb border border-slate-200 shadow-sm"
            >
              <img
                src={activeLesson.thumbnailUrl}
                alt={activeLesson.title}
                className="w-full h-full object-cover group-hover/thumb:scale-105 transition duration-300 opacity-90"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-edexora-yellow text-slate-950 flex items-center justify-center shadow-lg group-hover/thumb:scale-110 transition">
                  <PlayCircle className="w-6 h-6 fill-slate-950 text-edexora-yellow" />
                </div>
              </div>
              <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
                {activeLesson.durationFormatted}
              </span>
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="text-[11px] font-bold text-slate-500">
                Lesson {activeLesson.order} of 12
              </div>
              <h3 className="text-sm md:text-base font-bold text-slate-900 leading-snug line-clamp-2">
                {activeLesson.title}
              </h3>
              <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> Resume from {resumeTimeFormatted}
                </span>
                <span>• {activeLesson.teacherName}</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-2">
            <div className="w-full max-w-[200px] bg-slate-100 h-2 rounded-full overflow-hidden mr-3">
              <div className="bg-edexora-yellow h-full rounded-full w-[42%]" />
            </div>
            <button
              onClick={() => openLesson(activeLesson.id)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition flex items-center gap-2 shrink-0"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5 text-edexora-yellow" />
            </button>
          </div>
        </div>

        {/* Learning Goals Card */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-4 md:p-6 border border-slate-200 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-extrabold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-edexora-yellow fill-edexora-yellow" /> Learning Streak
              </span>
              <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                🔥 5 Day Streak
              </span>
            </div>

            <div className="my-2">
              <div className="text-2xl font-black text-slate-900">
                12 / 16 Lessons Completed
              </div>
              <div className="text-xs font-semibold text-slate-500 mt-0.5">
                Mathematics Chapter 3 Term Progress
              </div>
            </div>

            {/* Horizontal Progress bar */}
            <div className="w-full bg-slate-100 h-3.5 rounded-full p-0.5 overflow-hidden my-3 border border-slate-200">
              <div
                className="bg-edexora-yellow h-full rounded-full transition-all duration-500 shadow-sm"
                style={{ width: '75%' }}
              />
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between mt-2">
            <div>
              <div className="text-xs font-bold text-slate-900">Next Recommended Target</div>
              <div className="text-[11px] text-slate-500">Quadratic Equations Practice Test</div>
            </div>
            <button
              onClick={() => openQuiz('quiz-math-c3-06')}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition shadow-sm"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>

      {/* 3. Small Statistic Cards (4 Columns) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {/* Stat 1 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">
              {currentStudent.completedClassesCount}
            </div>
            <div className="text-xs font-medium text-slate-500">Completed</div>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">
              {currentStudent.remainingClassesCount}
            </div>
            <div className="text-xs font-medium text-slate-500">Remaining</div>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">
              {lastQuizAttempt ? `${lastQuizAttempt.percentage}%` : '80%'}
            </div>
            <div className="text-xs font-medium text-slate-500">Quiz Score</div>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">73%</div>
            <div className="text-xs font-medium text-slate-500">Overall Progress</div>
          </div>
        </div>
      </div>

      {/* 4. Enrolled Subjects & Quick Course Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-edexora-yellow fill-slate-900" />
            Enrolled Subjects ({subjects.length})
          </h2>
          <button
            onClick={() => setCurrentView('courses')}
            className="text-xs font-bold text-slate-700 hover:text-slate-950 hover:underline"
          >
            View All Subjects →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {subjects.map((sub) => (
            <div
              key={sub.id}
              onClick={() => openSubject(sub.id)}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-card hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-slate-900 shadow-sm"
                    style={{ backgroundColor: sub.color }}
                  >
                    {sub.name.slice(0, 2).toUpperCase()}
                  </span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full border border-slate-200">
                    {sub.code}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition">
                  {sub.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                  {sub.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500">
                  {sub.totalLessons} Lessons
                </span>
                <span className="font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-full">
                  73% Done
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Live Classes & Recent Quiz Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">
        {/* Live Classes Card */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-4 md:p-6 border border-slate-200 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Video className="w-5 h-5 text-red-500" /> Today&apos;s Live Sessions
            </h3>
            <button
              onClick={() => setCurrentView('live')}
              className="text-xs font-bold text-slate-600 hover:text-slate-900"
            >
              Live Hub →
            </button>
          </div>

          {upcomingLive ? (
            <div className="bg-slate-900 text-white rounded-2xl p-4 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase animate-pulse">
                    {upcomingLive.status}
                  </span>
                  <span className="text-xs text-slate-300 font-medium">
                    {upcomingLive.startTime}
                  </span>
                </div>
                <div className="text-base font-bold text-white">
                  {upcomingLive.subjectName}: {upcomingLive.topic}
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <img
                    src={upcomingLive.teacherAvatar}
                    alt={upcomingLive.teacherName}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span>{upcomingLive.teacherName}</span>
                </div>
              </div>

              <button
                onClick={() => setCurrentView('live')}
                className="px-4 py-2.5 bg-edexora-yellow text-slate-950 font-black rounded-xl text-xs transition hover:bg-yellow-400 shrink-0 w-full sm:w-auto"
              >
                Join Live Class
              </button>
            </div>
          ) : (
            <div className="text-center py-6 text-slate-500 text-sm">
              No live classes scheduled right now.
            </div>
          )}
        </div>

        {/* Recent Quiz Card */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-4 md:p-6 border border-slate-200 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-edexora-yellow" /> Practice Tests
              </h3>
              <button
                onClick={() => setCurrentView('quizzes')}
                className="text-xs font-bold text-slate-600 hover:text-slate-900"
              >
                View Tests →
              </button>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-900">
                Linear & Quadratic Equations Quiz
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>5 Questions • 15 Mins</span>
                <span className="font-bold text-emerald-600">Passed (8/10)</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => openQuiz('quiz-math-c3-06')}
            className="w-full mt-3 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2"
          >
            <span>Retake or Practice Quiz</span>
          </button>
        </div>
      </div>
    </div>
  );
};
