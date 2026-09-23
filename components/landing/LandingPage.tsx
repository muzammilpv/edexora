'use client';

import React from 'react';
import Image from 'next/image';
import {
  Sparkles,
  BookOpen,
  Video,
  FileCheck,
  Zap,
  CheckCircle2,
  Shield,
  ArrowRight,
  PlayCircle,
  Users,
  Award,
  Globe,
  Radio,
} from 'lucide-react';
import { useAppStore } from '../../lib/store';

export const LandingPage: React.FC = () => {
  const { requestRoleSwitch } = useAppStore();

  const handleLaunchApp = (role: 'student' | 'teacher' | 'admin' = 'student') => {
    requestRoleSwitch(role);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-edexora-yellow selection:text-slate-950 overflow-x-hidden">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-slate-700 bg-edexora-yellow flex items-center justify-center">
              <Image
                src="/edexora-logo.jpg"
                alt="Edexora Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white block">
                EDEXORA
              </span>
              <span className="text-[10px] font-semibold text-edexora-yellow tracking-widest uppercase block">
                Class 1–10 Tuition
              </span>
            </div>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-300">
            <a href="#why" className="hover:text-white transition">Why Edexora</a>
            <a href="#classes" className="hover:text-white transition">Classes 1–10</a>
            <a href="#curriculum" className="hover:text-white transition">CBSE & Kerala State</a>
            <a href="#packages" className="hover:text-white transition">Package Pricing</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleLaunchApp('student')}
              className="px-4 py-2 bg-edexora-yellow hover:bg-yellow-400 text-slate-950 font-black rounded-xl text-xs transition shadow-highlight flex items-center gap-1.5"
            >
              <span>Launch Demo App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 md:px-8 max-w-7xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-edexora-yellow text-xs font-bold shadow-card">
          <Sparkles className="w-4 h-4 fill-edexora-yellow" />
          <span>Premier Online Tuition Platform for Class 1 to Class 10</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
          Learn Better. <br />
          <span className="bg-gradient-to-r from-yellow-200 via-edexora-yellow to-amber-500 bg-clip-text text-transparent">
            Grow Smarter.
          </span>
        </h1>

        <p className="text-slate-300 text-base md:text-xl max-w-2xl mx-auto font-normal leading-relaxed">
          Master CBSE & Kerala State Board subjects with interactive video lectures, live classes, instant quizzes, and flexible class packages.
        </p>

        {/* Hero CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => handleLaunchApp('student')}
            className="w-full sm:w-auto px-8 py-4 bg-edexora-yellow hover:bg-yellow-400 text-slate-950 font-black rounded-2xl text-base transition shadow-highlight flex items-center justify-center gap-2"
          >
            <span>Get Started • Student Demo</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleLaunchApp('admin')}
            className="w-full sm:w-auto px-6 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-sm transition border border-slate-800 flex items-center justify-center gap-2"
          >
            <Shield className="w-4 h-4 text-edexora-yellow" />
            <span>Admin & Teacher Portal</span>
          </button>
        </div>

        {/* Hero Curriculum Badge */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 font-semibold">
          <span className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> CBSE Board Aligned
          </span>
          <span className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Kerala State Board Support
          </span>
          <span className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
            <Zap className="w-4 h-4 text-edexora-yellow" /> ₹500 / 10 Classes Pack
          </span>
        </div>
      </section>

      {/* Why Edexora Features Section */}
      <section id="why" className="py-16 bg-slate-900/60 border-y border-slate-800 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-black text-white">
              Why Students & Parents Trust EDEXORA
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
              Built for modern learning with age-appropriate interfaces for Classes 1–4, 5–7, and 8–10.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-edexora-yellow flex items-center justify-center font-bold">
                <PlayCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-white">Video Learning & Watch Resume</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Stream high quality lessons with exact watch position tracking. Resume seamlessly from your previous timestamp.
              </p>
            </div>

            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold">
                <Radio className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-white">Live Online Classes & Q&A</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Participate in interactive live streams with faculty, live chatbox, and raise-hand feature for instant doubt clearance.
              </p>
            </div>

            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-white">Class Unlock & Package System</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Fair, transparent pricing. Pay ₹500 to unlock 10 classes. Never pay for unused subscriptions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Package Pricing Overview */}
      <section id="packages" className="py-16 px-4 md:px-8 max-w-7xl mx-auto space-y-10 text-center">
        <div className="space-y-3">
          <span className="text-xs font-bold text-edexora-yellow uppercase tracking-widest">
            Simple & Flexible Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white">
            Choose Your Learning Package
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            No long-term contracts. Unlock classes as you need them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="text-xs font-bold text-slate-400 uppercase">Starter Pack</div>
            <div className="text-3xl font-black text-white">₹500</div>
            <div className="text-xs font-bold text-edexora-yellow">10 Complete Classes</div>
            <p className="text-xs text-slate-400">Includes video lectures, notes, and 10 class unlocks.</p>
            <button
              onClick={() => handleLaunchApp('student')}
              className="w-full py-3 bg-edexora-yellow text-slate-950 font-black rounded-xl text-xs transition"
            >
              Try Starter Pack
            </button>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6 border-2 border-edexora-yellow space-y-4 relative shadow-highlight">
            <span className="absolute -top-3 right-6 bg-edexora-yellow text-slate-950 text-[10px] font-black uppercase px-3 py-1 rounded-full">
              Most Popular
            </span>
            <div className="text-xs font-bold text-edexora-yellow uppercase">Pro Bundle</div>
            <div className="text-3xl font-black text-white">₹1,150</div>
            <div className="text-xs font-bold text-edexora-yellow">25 Complete Classes</div>
            <p className="text-xs text-slate-400">Includes all subjects, live Q&A sessions, and practice tests.</p>
            <button
              onClick={() => handleLaunchApp('student')}
              className="w-full py-3 bg-edexora-yellow text-slate-950 font-black rounded-xl text-xs transition"
            >
              Get Pro Bundle
            </button>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="text-xs font-bold text-slate-400 uppercase">Master Term Pass</div>
            <div className="text-3xl font-black text-white">₹2,200</div>
            <div className="text-xs font-bold text-edexora-yellow">50 Complete Classes</div>
            <p className="text-xs text-slate-400">Full term preparation with mentor guidance and exam tests.</p>
            <button
              onClick={() => handleLaunchApp('student')}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition"
            >
              Explore Master Pass
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8 px-4 text-center text-xs text-slate-500 space-y-3">
        <div className="flex items-center justify-center gap-2">
          <Image
            src="/edexora-logo.jpg"
            alt="Edexora"
            width={24}
            height={24}
            className="rounded-lg"
          />
          <span className="font-bold text-white text-sm">EDEXORA Online Tuition</span>
        </div>
        <p>© 2026 EDEXORA Learning Inc. All rights reserved. CBSE & Kerala State Board Tuition.</p>
      </footer>
    </div>
  );
};
