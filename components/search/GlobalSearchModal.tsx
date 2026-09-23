'use client';

import React, { useEffect } from 'react';
import { Search, X, BookOpen, Video, GraduationCap, FileCheck, ArrowRight } from 'lucide-react';
import { useAppStore } from '../../lib/store';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    subjects,
    lessons,
    teachers,
    liveClasses,
    openLesson,
    openSubject,
    setCurrentView,
  } = useAppStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const matchSubjects = subjects.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const matchLessons = lessons.filter((l) =>
    l.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const matchTeachers = teachers.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Type to search lessons, subjects, teachers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm md:text-base font-bold text-slate-900 focus:outline-none"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1 text-xs">
          {searchQuery.trim() === '' ? (
            <div className="text-center py-8 text-slate-400 font-medium">
              Start typing to search across Class 1–10 syllabus...
            </div>
          ) : (
            <>
              {/* Lessons Results */}
              {matchLessons.length > 0 && (
                <div className="space-y-2">
                  <div className="font-extrabold uppercase text-slate-400 text-[10px]">
                    Lessons ({matchLessons.length})
                  </div>
                  {matchLessons.map((l) => (
                    <div
                      key={l.id}
                      onClick={() => {
                        openLesson(l.id);
                        setIsSearchOpen(false);
                      }}
                      className="p-3 bg-slate-50 hover:bg-amber-50 rounded-2xl border border-slate-200 flex items-center justify-between cursor-pointer transition"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Video className="w-4 h-4 text-amber-500 shrink-0" />
                        <span className="font-bold text-slate-900 truncate">{l.title}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
              )}

              {/* Subjects Results */}
              {matchSubjects.length > 0 && (
                <div className="space-y-2">
                  <div className="font-extrabold uppercase text-slate-400 text-[10px]">
                    Subjects ({matchSubjects.length})
                  </div>
                  {matchSubjects.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => {
                        openSubject(s.id);
                        setIsSearchOpen(false);
                      }}
                      className="p-3 bg-slate-50 hover:bg-amber-50 rounded-2xl border border-slate-200 flex items-center justify-between cursor-pointer transition"
                    >
                      <div className="flex items-center gap-2.5">
                        <BookOpen className="w-4 h-4 text-blue-500 shrink-0" />
                        <span className="font-bold text-slate-900">
                          {s.name} (Class {s.classLevel})
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
