'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Clock,
  CheckCircle2,
  FileText,
  Download,
  BookOpen,
  Award,
  Lock,
  ChevronLeft,
  ChevronRight,
  User,
  Sparkles,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { useAppStore } from '../../lib/store';

export const VideoLessonPlayer: React.FC = () => {
  const {
    selectedLessonId,
    lessons,
    currentStudent,
    watchProgress,
    updateWatchProgress,
    openLesson,
    openQuiz,
    setIsPackageModalOpen,
    setCurrentView,
  } = useAppStore();

  const lesson = lessons.find((l) => l.id === selectedLessonId) || lessons[5];
  const lessonIndex = lessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = lessonIndex > 0 ? lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < lessons.length - 1 ? lessons[lessonIndex + 1] : null;

  // All lessons are unlocked and accessible for learning
  const isLocked = false;

  const [activeTab, setActiveTab] = useState<'overview' | 'notes' | 'materials' | 'quiz'>('overview');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(1122); // default 18:42
  const [duration, setDuration] = useState(2700); // 45 min
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Restore saved progress if available
  useEffect(() => {
    const savedWP = watchProgress.find((wp) => wp.lessonId === lesson.id);
    if (savedWP && savedWP.currentTimeSeconds > 0) {
      setCurrentTime(savedWP.currentTimeSeconds);
      if (videoRef.current) {
        videoRef.current.currentTime = savedWP.currentTimeSeconds;
      }
    }
  }, [lesson.id, watchProgress]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const cur = videoRef.current.currentTime;
      const dur = videoRef.current.duration || 2700;
      setCurrentTime(cur);
      setDuration(dur);
      updateWatchProgress(lesson.id, cur, dur);
    }
  };

  const togglePlay = () => {
    if (isLocked) {
      setIsPackageModalOpen(true);
      return;
    }
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
    }
  };

  const handlePlaybackSpeed = () => {
    const nextRate = playbackRate === 1 ? 1.25 : playbackRate === 1.25 ? 1.5 : playbackRate === 1.5 ? 2 : 1;
    setPlaybackRate(nextRate);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextRate;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Breadcrumb & Back */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentView('courses')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Courses
        </button>
        <span className="text-xs font-semibold text-slate-500">
          Lesson {lesson.order} of {lessons.length}
        </span>
      </div>

      {/* Video Container */}
      <div className="bg-slate-950 rounded-2xl md:rounded-3xl overflow-hidden shadow-card border border-slate-800 relative group">
        {/* HTML5 Video element */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
          {!isLocked ? (
            <video
              ref={videoRef}
              src={lesson.videoUrl}
              poster={lesson.thumbnailUrl}
              className="w-full h-full object-contain"
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
            />
          ) : (
            <img
              src={lesson.thumbnailUrl}
              alt={lesson.title}
              className="w-full h-full object-cover opacity-30 filter blur-sm"
            />
          )}

          {/* Locked Overlay if quota exhausted */}
          {isLocked && (
            <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-edexora-yellow border border-edexora-yellow/40 flex items-center justify-center shadow-highlight animate-bounce">
                <Lock className="w-7 h-7" />
              </div>
              <div className="space-y-1 max-w-md">
                <h3 className="text-xl font-extrabold text-white">Class Locked</h3>
                <p className="text-xs md:text-sm text-slate-300">
                  You have completed your 10 active classes in your starter package. Unlock the next package to continue learning.
                </p>
              </div>
              <button
                onClick={() => setIsPackageModalOpen(true)}
                className="px-6 py-3 bg-edexora-yellow hover:bg-yellow-400 text-slate-950 font-black rounded-xl text-sm transition shadow-highlight flex items-center gap-2"
              >
                <span>Unlock Next 10 Classes (₹500)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Big Center Play Button overlay when paused */}
          {!isLocked && !isPlaying && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer z-10"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-edexora-yellow text-slate-950 flex items-center justify-center shadow-highlight hover:scale-110 transition duration-300">
                <Play className="w-8 h-8 md:w-10 md:h-10 fill-slate-950 ml-1" />
              </div>
            </div>
          )}
        </div>

        {/* Video Controls Bar */}
        {!isLocked && (
          <div className="bg-slate-900 px-4 py-3 border-t border-slate-800 text-white flex flex-col gap-2">
            {/* Progress Slider */}
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-edexora-yellow"
            />

            <div className="flex items-center justify-between text-xs font-mono text-slate-300">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-1.5 hover:text-edexora-yellow transition"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                </button>
                <span>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700 hidden sm:inline">
                  Resume from {formatTime(currentTime)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePlaybackSpeed}
                  className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 rounded text-xs font-bold text-edexora-yellow"
                >
                  {playbackRate}x
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 hover:text-white"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lesson Details Header */}
      <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200 shadow-card space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Mathematics • Chapter 3
              </span>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                Unlocked
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">
              {lesson.title}
            </h1>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
              alt={lesson.teacherName}
              className="w-10 h-10 rounded-full object-cover border-2 border-edexora-yellow"
            />
            <div className="text-left">
              <div className="text-xs font-bold text-slate-900">{lesson.teacherName}</div>
              <div className="text-[10px] text-slate-500">Senior Math Faculty</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Overview, Notes, Materials, Quiz) */}
        <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto no-scrollbar">
          {(['overview', 'notes', 'materials', 'quiz'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-xs md:text-sm font-bold capitalize transition border-b-2 whitespace-nowrap ${
                activeTab === tab
                  ? 'border-slate-950 text-slate-950'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab === 'notes'
                ? '📄 Class Notes'
                : tab === 'materials'
                ? `📚 Study Materials (${lesson.studyMaterialsCount})`
                : tab === 'quiz'
                ? '✏️ Practice Quiz'
                : 'Overview'}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="pt-2">
          {activeTab === 'overview' && (
            <div className="space-y-3 text-slate-700 text-xs md:text-sm leading-relaxed">
              <p>{lesson.description}</p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Key Learning Objectives:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-600">
                  <li>Derivation of the Quadratic Formula x = (-b ± √(b²-4ac)) / 2a</li>
                  <li>Calculating the Discriminant Δ = b² - 4ac</li>
                  <li>Distinguishing Real & Distinct, Real & Equal, and Complex Imaginary roots</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-3">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    PDF
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Chapter 3 Lesson 6 Handwritten Faculty Notes.pdf
                    </div>
                    <div className="text-[10px] text-slate-500">2.4 MB • Complete Formula Sheet</div>
                  </div>
                </div>
                <button
                  onClick={() => alert('Downloading Class Notes PDF...')}
                  className="px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-slate-800 transition"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </button>
              </div>
            </div>
          )}

          {activeTab === 'materials' && (
            <div className="space-y-2">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-slate-400" />
                    <span className="font-semibold text-slate-800">
                      Worksheet {num}: Quadratic Discriminant Practice Problems
                    </span>
                  </div>
                  <button className="text-slate-700 hover:text-slate-950 font-bold underline">
                    View Worksheet
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="bg-edexora-yellow text-slate-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                  Quiz Available
                </span>
                <h4 className="text-base font-bold text-white">
                  Linear & Quadratic Equations Assessment
                </h4>
                <p className="text-xs text-slate-300">
                  5 Questions • 15 Minutes • Instant Score & Answer Explanations
                </p>
              </div>
              <button
                onClick={() => openQuiz('quiz-math-c3-06')}
                className="px-5 py-2.5 bg-edexora-yellow text-slate-950 font-black rounded-xl text-xs transition hover:bg-yellow-400 shrink-0 shadow-highlight"
              >
                Start Quiz Now
              </button>
            </div>
          )}
        </div>

        {/* Previous & Next Lesson Navigation */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          {prevLesson ? (
            <button
              onClick={() => openLesson(prevLesson.id)}
              className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-950 bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev: Lesson {prevLesson.order}</span>
            </button>
          ) : <div />}

          {nextLesson && (
            <button
              onClick={() => openLesson(nextLesson.id)}
              className="flex items-center gap-2 text-xs font-bold text-slate-950 bg-edexora-yellow hover:bg-yellow-400 px-3.5 py-2 rounded-xl shadow-sm transition"
            >
              <span>Next: Lesson {nextLesson.order}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
