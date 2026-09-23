'use client';

import React, { useState } from 'react';
import {
  Video,
  Clock,
  User,
  Users,
  Send,
  Hand,
  CheckCircle2,
  Calendar,
  Sparkles,
  MessageSquare,
  PlayCircle,
  Radio,
} from 'lucide-react';
import { useAppStore } from '../../lib/store';
import { LiveClass, LiveStatus } from '../../types';

export const LiveClassHub: React.FC = () => {
  const { liveClasses, currentStudent } = useAppStore();
  const [activeFilter, setActiveFilter] = useState<LiveStatus | 'ALL'>('ALL');
  const [activeLiveSession, setActiveLiveSession] = useState<LiveClass | null>(
    liveClasses[0] || null
  );

  const [chatMessages, setChatMessages] = useState<
    { sender: string; text: string; time: string; isSelf?: boolean }[]
  >([
    { sender: 'Dr. Sarah Thomas', text: 'Welcome everyone! We are starting the polygon angle sum theorem now.', time: '7:02 PM' },
    { sender: 'Devika S.', text: 'Good evening maam! Excited for today session.', time: '7:03 PM' },
    { sender: 'Rohan S.', text: 'Can you please recap the diagonal formula n(n-3)/2?', time: '7:05 PM' },
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [hasHandRaised, setHasHandRaised] = useState(false);

  const filteredLive = liveClasses.filter(
    (lc) => activeFilter === 'ALL' || lc.status === activeFilter
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      {
        sender: currentStudent.name,
        text: inputMsg.trim(),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        isSelf: true,
      },
    ]);
    setInputMsg('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-2">
            <Radio className="w-6 h-6 text-red-500 animate-pulse" />
            Live Interactive Tuition
          </h1>
          <p className="text-xs md:text-sm text-slate-500">
            Join live broadcast classes, ask questions in real-time, and participate in live polls.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start md:self-auto">
          {(['ALL', 'LIVE NOW', 'UPCOMING', 'ENDED'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setActiveFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeFilter === status
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* If a Live Session is active, render the Interactive Broadcast Studio */}
      {activeLiveSession && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Main Video Broadcast Player (Col 8) */}
          <div className="lg:col-span-8 space-y-3">
            <div className="bg-slate-950 rounded-2xl overflow-hidden shadow-card border border-slate-800 relative aspect-video flex flex-col justify-between">
              {/* Fake Live Stream Background Video / Placeholder */}
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1000&auto=format&fit=crop&q=80"
                alt="Live Broadcast"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/60" />

              {/* Stream Header */}
              <div className="relative z-10 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="bg-red-600 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 animate-pulse">
                    <Radio className="w-3 h-3" /> LIVE NOW
                  </span>
                  <span className="bg-black/60 backdrop-blur-md text-white font-mono text-xs px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-edexora-yellow" />
                    {activeLiveSession.attendeesCount} Students
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setHasHandRaised(!hasHandRaised)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm ${
                      hasHandRaised
                        ? 'bg-amber-400 text-slate-950 animate-bounce'
                        : 'bg-white/20 backdrop-blur-md text-white hover:bg-white/30'
                    }`}
                  >
                    <Hand className="w-4 h-4" />
                    <span>{hasHandRaised ? 'Hand Raised ✋' : 'Raise Hand'}</span>
                  </button>
                </div>
              </div>

              {/* Stream Center Title */}
              <div className="relative z-10 p-4 md:p-6 space-y-1">
                <div className="text-xs font-bold text-edexora-yellow uppercase">
                  {activeLiveSession.subjectName} • Class {activeLiveSession.classLevel} ({activeLiveSession.curriculum})
                </div>
                <h2 className="text-lg md:text-xl font-black text-white">
                  {activeLiveSession.topic}
                </h2>
                <div className="flex items-center gap-2 text-xs text-slate-300 pt-1">
                  <img
                    src={activeLiveSession.teacherAvatar}
                    alt={activeLiveSession.teacherName}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span>Instructor: {activeLiveSession.teacherName}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Live Chatbox Sidebar (Col 4) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-card flex flex-col h-[400px] lg:h-auto justify-between overflow-hidden">
            <div className="p-3.5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-edexora-yellow" /> Live Student Q&A
              </span>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                Chat Active
              </span>
            </div>

            {/* Chat messages */}
            <div className="p-3 overflow-y-auto space-y-2.5 flex-1 text-xs">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl ${
                    msg.isSelf
                      ? 'bg-amber-50 border border-amber-200 ml-4'
                      : 'bg-slate-50 border border-slate-100 mr-4'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 mb-0.5">
                    <span>{msg.sender}</span>
                    <span>{msg.time}</span>
                  </div>
                  <div className="text-slate-800 font-medium">{msg.text}</div>
                </div>
              ))}
            </div>

            {/* Chat input form */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-slate-100 bg-slate-50 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask a question to faculty..."
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-900"
              />
              <button
                type="submit"
                className="p-2 bg-edexora-yellow text-slate-950 rounded-xl font-bold hover:bg-yellow-400 transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* List of Live & Upcoming Classes Cards */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-slate-900">
          All Scheduled Live Classes ({filteredLive.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLive.map((lc) => (
            <div
              key={lc.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 space-y-4 hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-900 px-2.5 py-1 rounded-lg bg-edexora-yellow">
                    {lc.subjectName}
                  </span>
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                      lc.status === 'LIVE NOW'
                        ? 'bg-red-100 text-red-600 animate-pulse'
                        : lc.status === 'UPCOMING'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {lc.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    {lc.topic}
                  </h4>
                  <div className="text-xs text-slate-500 mt-1">{lc.chapterTitle}</div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-slate-100 text-xs text-slate-600">
                  <img
                    src={lc.teacherAvatar}
                    alt={lc.teacherName}
                    className="w-8 h-8 rounded-full object-cover border border-slate-300"
                  />
                  <div>
                    <div className="font-bold text-slate-900">{lc.teacherName}</div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {lc.startTime}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveLiveSession(lc)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2"
              >
                <span>{lc.status === 'LIVE NOW' ? 'Join Live Room' : 'View Session Info'}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
