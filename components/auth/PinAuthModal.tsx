'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Lock,
  KeyRound,
  ShieldCheck,
  GraduationCap,
  UserCheck,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  X,
  BookOpen,
} from 'lucide-react';
import { useAppStore } from '../../lib/store';
import { Role } from '../../types';

export const PinAuthModal: React.FC = () => {
  const {
    isAuthenticated,
    isPinModalOpen,
    setIsPinModalOpen,
    pendingRoleSwitch,
    setPendingRoleSwitch,
    currentRole,
    currentStudent,
    loginWithPin,
  } = useAppStore();

  const [selectedRole, setSelectedRole] = useState<Role>(pendingRoleSwitch || currentRole || 'student');
  const [selectedClassLevel, setSelectedClassLevel] = useState<number>(currentStudent?.classLevel || 8);
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPin, setShowPin] = useState(false);

  useEffect(() => {
    if (pendingRoleSwitch) {
      setSelectedRole(pendingRoleSwitch);
    }
    setPin('');
    setErrorMsg('');
  }, [pendingRoleSwitch, isPinModalOpen]);

  if (!isPinModalOpen && isAuthenticated) return null;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!pin.trim()) {
      setErrorMsg('Please enter your security password');
      return;
    }

    const success = loginWithPin(selectedRole, pin, selectedClassLevel);
    if (!success) {
      setErrorMsg(`Incorrect password for ${selectedRole.toUpperCase()}. Please check and try again.`);
    }
  };

  const handleKeypadPress = (val: string) => {
    if (val === 'DEL') {
      setPin((prev) => prev.slice(0, -1));
    } else if (val === 'CLR') {
      setPin('');
    } else {
      if (pin.length < 8) {
        setPin((prev) => prev + val);
      }
    }
    setErrorMsg('');
  };

  const getRoleTitle = (role: Role) => {
    switch (role) {
      case 'student':
        return `Class ${selectedClassLevel} Student`;
      case 'teacher':
        return 'Teacher Educator';
      case 'admin':
        return 'Super Admin Portal';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Top Decorative Header */}
        <div className="bg-slate-950 text-white p-5 text-center space-y-2 relative overflow-hidden border-b border-slate-800 shrink-0">
          <div className="absolute top-0 right-0 w-48 h-48 bg-edexora-yellow/10 rounded-full blur-2xl pointer-events-none" />

          {/* Optional Close Button if already authenticated */}
          {isAuthenticated && (
            <button
              onClick={() => {
                setPendingRoleSwitch(null);
                setIsPinModalOpen(false);
              }}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-900 border border-slate-800 transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Brand Logo & Title */}
          <div className="flex items-center justify-center gap-2.5">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-edexora-yellow border border-slate-700 shadow-highlight flex items-center justify-center">
              <Image src="/edexora-logo.jpg" alt="Edexora Logo" fill className="object-cover" priority />
            </div>
            <span className="text-xl font-black tracking-tight text-white">EDEXORA</span>
          </div>

          <div className="space-y-0.5">
            <h2 className="text-base font-extrabold text-white flex items-center justify-center gap-2">
              <Lock className="w-4 h-4 text-edexora-yellow" />
              <span>{pendingRoleSwitch ? 'Role Authentication Lock' : 'EDEXORA Security Verification'}</span>
            </h2>
            <p className="text-[11px] text-slate-300">
              Select portal role, choose class & enter password to unlock.
            </p>
          </div>
        </div>

        {/* Role Selector Tabs */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 space-y-2 shrink-0">
          <div className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider text-center">
            1. Select Portal Access
          </div>

          <div className="grid grid-cols-3 gap-2">
            {(['student', 'teacher', 'admin'] as Role[]).map((r) => {
              const active = selectedRole === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setSelectedRole(r);
                    setPin('');
                    setErrorMsg('');
                  }}
                  className={`p-2.5 rounded-2xl text-xs font-bold transition flex flex-col items-center justify-center gap-1 border ${
                    active
                      ? 'bg-slate-950 text-white border-slate-950 shadow-md scale-[1.02]'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="capitalize text-xs font-extrabold">{r}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 flex-1 overflow-y-auto">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Student Class Level Selector (Classes 1 to 12) */}
          {selectedRole === 'student' && (
            <div className="space-y-2 bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200">
              <div className="flex items-center justify-between text-xs">
                <label className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-slate-950" />
                  Select Your Class (Class 1 to 12):
                </label>
                <span className="text-xs font-black text-slate-950 bg-edexora-yellow px-2.5 py-0.5 rounded-full shadow-sm">
                  Class {selectedClassLevel}
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 pt-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedClassLevel(lvl)}
                    className={`py-1.5 rounded-xl font-black text-xs transition border ${
                      selectedClassLevel === lvl
                        ? 'bg-slate-950 text-white border-slate-950 shadow-sm scale-105'
                        : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Class {lvl}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Password Input Display */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                {selectedRole === 'student' ? '2. Enter Security Password' : 'Enter Authorization Password'}
              </label>
            </div>

            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <KeyRound className="w-5 h-5 text-slate-500" />
              </div>
              <input
                type={showPin ? 'text' : 'password'}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="Enter password..."
                className="w-full pl-11 pr-11 py-2.5 bg-slate-50 border border-slate-300 rounded-2xl font-mono text-center text-lg font-bold text-slate-900 tracking-widest focus:outline-none focus:ring-2 focus:ring-slate-950 transition"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Keypad Buttons for Quick Entry */}
          <div className="grid grid-cols-3 gap-1.5 max-w-xs mx-auto">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'CLR', '0', 'DEL'].map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => handleKeypadPress(k)}
                className={`py-2 rounded-xl font-mono font-bold text-sm transition active:scale-95 border ${
                  k === 'DEL' || k === 'CLR'
                    ? 'bg-slate-200 text-slate-700 border-slate-300 text-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border-slate-200 shadow-sm'
                }`}
              >
                {k}
              </button>
            ))}
          </div>

          {/* Unlock Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-edexora-yellow hover:bg-yellow-400 text-slate-950 font-black rounded-2xl text-sm transition shadow-highlight flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Unlock {getRoleTitle(selectedRole)}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
