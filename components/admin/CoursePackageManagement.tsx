'use client';

import React, { useState } from 'react';
import {
  CreditCard,
  Plus,
  BookOpen,
  Sparkles,
  Zap,
  CheckCircle2,
  Edit2,
  Trash2,
  Lock,
} from 'lucide-react';
import { useAppStore } from '../../lib/store';
import { Package } from '../../types';

export const CoursePackageManagement: React.FC = () => {
  const { packages, addOrUpdatePackage, subjects } = useAppStore();
  const [isPkgModalOpen, setIsPkgModalOpen] = useState(false);

  // Package Form State
  const [pkgName, setPkgName] = useState('');
  const [classCount, setClassCount] = useState(10);
  const [price, setPrice] = useState(500);
  const [validityDays, setValidityDays] = useState(30);

  const handleCreatePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pkgName.trim()) return;

    const newPkg: Package = {
      id: `pkg-${Date.now()}`,
      name: pkgName,
      classCount,
      price,
      validityDays,
      description: `Unlocks ${classCount} interactive video lessons and live tuition sessions.`,
      isPopular: false,
      isActive: true,
    };

    addOrUpdatePackage(newPkg);
    setIsPkgModalOpen(false);
    setPkgName('');
  };

  const togglePackageActive = (pkg: Package) => {
    addOrUpdatePackage({
      ...pkg,
      isActive: !pkg.isActive,
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-edexora-yellow fill-slate-900" />
            Class Packages & Entitlement Configurator
          </h1>
          <p className="text-xs md:text-sm text-slate-500">
            Define dynamic class quotas (e.g. ₹500 for 10 classes) and manage curriculum unlock packages.
          </p>
        </div>

        <button
          onClick={() => setIsPkgModalOpen(true)}
          className="px-4 py-2.5 bg-edexora-yellow hover:bg-yellow-400 text-slate-950 font-black rounded-xl text-xs transition shadow-sm flex items-center gap-1.5 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" /> Create New Package
        </button>
      </div>

      {/* Package Cards List */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-900">Active Tuition Packages ({packages.length})</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-white rounded-2xl border-2 p-5 shadow-card space-y-4 flex flex-col justify-between transition ${
                pkg.isActive ? 'border-slate-950' : 'border-slate-200 opacity-60'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase">{pkg.name}</span>
                  {pkg.isPopular && (
                    <span className="bg-edexora-yellow text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                      Popular
                    </span>
                  )}
                </div>

                <div className="text-3xl font-black text-slate-900">
                  ₹{pkg.price}
                </div>

                <div className="text-xs font-bold text-slate-700 bg-slate-100 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span>Class Entitlement:</span>
                  <span className="font-black text-slate-950">{pkg.classCount} Unlocked Classes</span>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed pt-1">
                  {pkg.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-mono">
                  Validity: {pkg.validityDays} Days
                </span>
                <button
                  onClick={() => togglePackageActive(pkg)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition ${
                    pkg.isActive
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {pkg.isActive ? 'Active' : 'Disabled'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal to Create New Package */}
      {isPkgModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-black text-slate-900">Create Tuition Package</h3>
              <button
                onClick={() => setIsPkgModalOpen(false)}
                className="text-slate-400 hover:text-slate-800 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePackage} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Package Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Special Exam Booster Pack"
                  value={pkgName}
                  onChange={(e) => setPkgName(e.target.value)}
                  className="w-full p-2.5 border rounded-xl bg-slate-50 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Number of Classes</label>
                  <input
                    type="number"
                    value={classCount}
                    onChange={(e) => setClassCount(Number(e.target.value))}
                    className="w-full p-2.5 border rounded-xl bg-slate-50 text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Price (₹ INR)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full p-2.5 border rounded-xl bg-slate-50 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Validity (Days)</label>
                <input
                  type="number"
                  value={validityDays}
                  onChange={(e) => setValidityDays(Number(e.target.value))}
                  className="w-full p-2.5 border rounded-xl bg-slate-50 text-slate-900"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPkgModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 font-bold rounded-xl text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-edexora-yellow text-slate-950 font-black rounded-xl"
                >
                  Publish Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
