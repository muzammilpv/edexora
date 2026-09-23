'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Video,
  PlusCircle,
  Users,
  CheckCircle2,
  Clock,
  Upload,
  Calendar,
  Sparkles,
  BarChart2,
} from 'lucide-react';
import { useAppStore } from '../../lib/store';
import { Lesson, LiveClass } from '../../types';

export const TeacherDashboard: React.FC = () => {
  const {
    currentTeacher,
    subjects,
    lessons,
    liveClasses,
    students,
    addOrUpdateLesson,
    addOrUpdateLiveClass,
  } = useAppStore();

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isLiveModalOpen, setIsLiveModalOpen] = useState(false);

  // Lesson form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newDuration, setNewDuration] = useState(45);

  // Live session form state
  const [liveTopic, setLiveTopic] = useState('');
  const [liveTime, setLiveTime] = useState('Tomorrow 7:00 PM');

  // Filter lessons assigned to this teacher
  const teacherLessons = lessons.filter((l) => l.teacherId === currentTeacher.id);
  const teacherLive = liveClasses.filter((lc) => lc.teacherId === currentTeacher.id);
  const assignedSubjects = subjects.filter((s) =>
    currentTeacher.assignedSubjectIds.includes(s.id)
  );

  const handleCreateLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newLesson: Lesson = {
      id: `les-${Date.now()}`,
      chapterId: 'chap-math-3',
      subjectId: assignedSubjects[0]?.id || 'sub-math-8',
      title: newTitle,
      description: newDesc || 'Comprehensive video lesson uploaded by faculty.',
      durationMinutes: newDuration,
      durationFormatted: `${newDuration} min`,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80',
      teacherId: currentTeacher.id,
      teacherName: currentTeacher.name,
      order: teacherLessons.length + 1,
      studyMaterialsCount: 2,
    };

    addOrUpdateLesson(newLesson);
    setIsUploadModalOpen(false);
    setNewTitle('');
    setNewDesc('');
  };

  const handleScheduleLive = (e: React.FormEvent) => {
    e.preventDefault();
    if (!liveTopic.trim()) return;

    const newLive: LiveClass = {
      id: `live-${Date.now()}`,
      subjectId: assignedSubjects[0]?.id || 'sub-math-8',
      subjectName: assignedSubjects[0]?.name || 'Mathematics',
      chapterTitle: 'Chapter 4: Geometry',
      topic: liveTopic,
      teacherId: currentTeacher.id,
      teacherName: currentTeacher.name,
      teacherAvatar: currentTeacher.avatar,
      classLevel: 8,
      curriculum: 'CBSE',
      startTime: liveTime,
      durationFormatted: '60 min',
      status: 'UPCOMING',
      attendeesCount: 0,
    };

    addOrUpdateLiveClass(newLive);
    setIsLiveModalOpen(false);
    setLiveTopic('');
  };

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 border border-slate-800 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <span className="bg-edexora-yellow text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            Faculty Educator Workspace
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            Welcome, {currentTeacher.name} 👨‍🏫
          </h1>
          <p className="text-slate-300 text-xs md:text-sm max-w-xl">
            {currentTeacher.qualification} • {currentTeacher.experienceYears} Years Teaching Experience
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="px-4 py-2.5 bg-edexora-yellow hover:bg-yellow-400 text-slate-950 font-bold rounded-xl text-xs transition flex items-center gap-2 shadow-highlight"
          >
            <Upload className="w-4 h-4" /> Upload Lesson Video
          </button>
          <button
            onClick={() => setIsLiveModalOpen(true)}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition flex items-center gap-2 border border-slate-700"
          >
            <Video className="w-4 h-4 text-red-400" /> Schedule Live
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold border border-amber-100">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">{assignedSubjects.length}</div>
            <div className="text-xs text-slate-500 font-medium">Assigned Subjects</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold border border-blue-100">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">{teacherLessons.length}</div>
            <div className="text-xs text-slate-500 font-medium">Published Lessons</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold border border-purple-100">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">42 Students</div>
            <div className="text-xs text-slate-500 font-medium">Enrolled Learners</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold border border-emerald-100">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">92%</div>
            <div className="text-xs text-slate-500 font-medium">Avg Completion</div>
          </div>
        </div>
      </div>

      {/* Assigned Subjects & Video Management Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Published Video Lessons List */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-200 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Published Video Lessons ({teacherLessons.length})
            </h3>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="text-xs font-bold text-amber-600 hover:underline"
            >
              + Add New Lesson
            </button>
          </div>

          <div className="space-y-2.5">
            {teacherLessons.map((les) => (
              <div
                key={les.id}
                className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3 hover:border-slate-300 transition"
              >
                <div className="flex items-center gap-3 truncate">
                  <img
                    src={les.thumbnailUrl}
                    alt={les.title}
                    className="w-12 h-10 rounded-lg object-cover border border-slate-300 shrink-0"
                  />
                  <div className="truncate space-y-0.5">
                    <div className="text-xs font-bold text-slate-900 truncate">
                      {les.order}. {les.title}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {les.durationFormatted} • {les.studyMaterialsCount} Worksheets Attached
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full shrink-0">
                  Published
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Classes Scheduled */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Scheduled Live Classes</h3>
            <button
              onClick={() => setIsLiveModalOpen(true)}
              className="text-xs font-bold text-amber-600 hover:underline"
            >
              + Schedule
            </button>
          </div>

          <div className="space-y-2.5">
            {teacherLive.map((lc) => (
              <div
                key={lc.id}
                className="p-3 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold bg-edexora-yellow text-slate-950 px-2 py-0.5 rounded">
                    {lc.subjectName}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{lc.startTime}</span>
                </div>
                <div className="text-xs font-bold text-white leading-snug">{lc.topic}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upload Lesson Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-black text-slate-900">Upload New Video Lesson</h3>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-slate-400 hover:text-slate-800 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLesson} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Lesson Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Quadratic Formula & Nature of Roots"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 border rounded-xl bg-slate-50 focus:bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Brief chapter overview for students..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full p-2.5 border rounded-xl bg-slate-50 focus:bg-white text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Duration (Minutes)</label>
                  <input
                    type="number"
                    value={newDuration}
                    onChange={(e) => setNewDuration(Number(e.target.value))}
                    className="w-full p-2.5 border rounded-xl bg-slate-50 text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subject</label>
                  <select className="w-full p-2.5 border rounded-xl bg-slate-50 text-slate-900">
                    {assignedSubjects.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} (Class {s.classLevel})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 font-bold rounded-xl text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-edexora-yellow text-slate-950 font-black rounded-xl"
                >
                  Publish Lesson
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Schedule Live Modal */}
      {isLiveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-black text-slate-900">Schedule Live Session</h3>
              <button
                onClick={() => setIsLiveModalOpen(false)}
                className="text-slate-400 hover:text-slate-800 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleScheduleLive} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Live Topic</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Live Geometry Problem Solving"
                  value={liveTopic}
                  onChange={(e) => setLiveTopic(e.target.value)}
                  className="w-full p-2.5 border rounded-xl bg-slate-50 text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Scheduled Date & Time</label>
                <input
                  type="text"
                  value={liveTime}
                  onChange={(e) => setLiveTime(e.target.value)}
                  className="w-full p-2.5 border rounded-xl bg-slate-50 text-slate-900"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsLiveModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 font-bold rounded-xl text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 text-white font-black rounded-xl"
                >
                  Schedule Live Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
