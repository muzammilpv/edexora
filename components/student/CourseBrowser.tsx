'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Filter,
  CheckCircle2,
  Lock,
  PlayCircle,
  Sparkles,
  ChevronRight,
  Clock,
  User,
} from 'lucide-react';
import { useAppStore } from '../../lib/store';
import { CurriculumType } from '../../types';

export const CourseBrowser: React.FC = () => {
  const {
    currentStudent,
    subjects,
    lessons,
    watchProgress,
    openLesson,
    setIsPackageModalOpen,
  } = useAppStore();

  const [selectedCurriculum, setSelectedCurriculum] = useState<CurriculumType>(
    currentStudent.curriculum
  );
  const [selectedClass, setSelectedClass] = useState<number>(
    currentStudent.classLevel
  );
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('all');

  const filteredSubjects = subjects.filter((sub) => {
    const matchCurriculum = sub.curriculum === selectedCurriculum;
    const matchClass = sub.classLevel === selectedClass;
    const matchSubject =
      selectedSubjectId === 'all' || sub.id === selectedSubjectId;
    return matchCurriculum && matchClass && matchSubject;
  });

  return (
    <div className="space-y-6">
      {/* Top Title & Filters */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-edexora-yellow fill-slate-900" />
              Course Catalog & Syllabus
            </h1>
            <p className="text-xs md:text-sm text-slate-500">
              Browse structured chapters, video lectures, notes & practice tests for Class 1–10.
            </p>
          </div>

          {/* Curriculum Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 self-start md:self-auto">
            <button
              onClick={() => setSelectedCurriculum('CBSE')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                selectedCurriculum === 'CBSE'
                  ? 'bg-edexora-yellow text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              CBSE Curriculum
            </button>
            <button
              onClick={() => setSelectedCurriculum('Kerala State')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                selectedCurriculum === 'Kerala State'
                  ? 'bg-edexora-yellow text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kerala State Board
            </button>
          </div>
        </div>

        {/* Horizontal Class Selector Tabs (1 to 10) */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
            Select Class Grade:
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition ${
                  selectedClass === cls
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Class {cls}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Course List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            Available Courses ({filteredSubjects.length})
          </h2>
          <span className="text-xs text-slate-500">
            Showing Class {selectedClass} • {selectedCurriculum}
          </span>
        </div>

        {filteredSubjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSubjects.map((subject) => {
              const subjectLessons = lessons.filter(
                (l) => l.subjectId === subject.id
              );
              const completedCount = 6;
              const remainingCount = Math.max(0, subjectLessons.length - completedCount);
              const progressPct = 73;

              return (
                <div
                  key={subject.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden hover:shadow-md transition flex flex-col justify-between group"
                >
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        className="px-3 py-1 rounded-xl text-xs font-extrabold text-slate-950 shadow-sm"
                        style={{ backgroundColor: subject.color }}
                      >
                        {subject.name}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {subject.code}
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-amber-600 transition leading-snug">
                      {subject.name} (Class {subject.classLevel})
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {subject.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-600">Overall Progress</span>
                        <span className="text-slate-900">{progressPct}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-edexora-yellow h-full rounded-full transition-all duration-500"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>

                    {/* Meta stats */}
                    <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs border-t border-slate-100">
                      <div className="p-2 bg-slate-50 rounded-xl">
                        <div className="font-extrabold text-slate-900">
                          {subject.totalLessons}
                        </div>
                        <div className="text-[10px] text-slate-500">Lessons</div>
                      </div>
                      <div className="p-2 bg-emerald-50 rounded-xl">
                        <div className="font-extrabold text-emerald-700">
                          {completedCount}
                        </div>
                        <div className="text-[10px] text-emerald-600">Done</div>
                      </div>
                      <div className="p-2 bg-amber-50 rounded-xl">
                        <div className="font-extrabold text-amber-700">
                          {remainingCount}
                        </div>
                        <div className="text-[10px] text-amber-600">Remaining</div>
                      </div>
                    </div>
                  </div>

                  {/* Lessons list inside course card preview */}
                  <div className="bg-slate-50 p-4 border-t border-slate-100 space-y-2">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Chapter 3 Lessons Preview
                    </div>
                    {subjectLessons.slice(0, 3).map((les, idx) => (
                      <div
                        key={les.id}
                        onClick={() => openLesson(les.id)}
                        className="flex items-center justify-between p-2 bg-white rounded-xl border border-slate-200 text-xs hover:border-slate-400 cursor-pointer transition"
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          <PlayCircle className="w-4 h-4 text-slate-400 shrink-0" />
                          <span className="truncate font-semibold text-slate-800">
                            {idx + 1}. {les.title}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 shrink-0">
                          {les.durationFormatted}
                        </span>
                      </div>
                    ))}

                    <button
                      onClick={() => openLesson(subjectLessons[0]?.id || 'les-m3-06')}
                      className="w-full mt-2 py-2 bg-edexora-yellow hover:bg-yellow-400 text-slate-950 font-extrabold rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <span>Open Full Course</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No courses match this filter</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try switching curriculum between CBSE and Kerala State, or select another Class level.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
