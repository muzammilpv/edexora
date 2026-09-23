'use client';

import React, { useState } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  Lock,
  CreditCard,
  QrCode,
  ShieldCheck,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { useAppStore } from '../../lib/store';

export const PackageUnlockModal: React.FC = () => {
  const {
    isPackageModalOpen,
    setIsPackageModalOpen,
    packages,
    currentStudent,
    unlockPackage,
  } = useAppStore();

  const [selectedPkgId, setSelectedPkgId] = useState<string>(
    packages[0]?.id || 'pkg-10-class'
  );
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'Netbanking'>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isPackageModalOpen) return null;

  const selectedPkg = packages.find((p) => p.id === selectedPkgId) || packages[0];

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      unlockPackage(selectedPkg.id, paymentMethod);
      setTimeout(() => {
        setIsSuccess(false);
        setIsPackageModalOpen(false);
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-edexora-yellow text-slate-950 flex items-center justify-center font-black">
              <Zap className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white leading-tight">
                Unlock Learning Package
              </h2>
              <p className="text-xs text-slate-400">
                Class 1–10 Tuition Entitlement • Instant Activation
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsPackageModalOpen(false)}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {isSuccess ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                Payment Successful!
              </h3>
              <p className="text-sm text-slate-600 font-bold max-w-sm mx-auto">
                🎉 {selectedPkg.classCount} New Classes Unlocked in your account. Continue watching your lessons!
              </p>
            </div>
          ) : (
            <>
              {/* Entitlement Summary */}
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-amber-900">Current Balance</div>
                  <div className="text-lg font-black text-amber-950">
                    {currentStudent.completedClassesCount} / {currentStudent.totalClassesUnlocked} Classes Used
                  </div>
                </div>
                <span className="text-xs font-bold bg-amber-200 text-amber-900 px-3 py-1 rounded-full">
                  {currentStudent.remainingClassesCount} Remaining
                </span>
              </div>

              {/* Package Selection */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                  Select Package Option:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {packages.map((pkg) => {
                    const isSelected = pkg.id === selectedPkgId;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPkgId(pkg.id)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition relative flex flex-col justify-between ${
                          isSelected
                            ? 'border-slate-950 bg-slate-50 shadow-sm'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        {pkg.isPopular && (
                          <span className="absolute -top-2.5 right-3 bg-edexora-yellow text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 rounded-full border border-slate-900 shadow-sm">
                            Popular
                          </span>
                        )}
                        <div>
                          <div className="text-xs font-bold text-slate-700">{pkg.name}</div>
                          <div className="text-2xl font-black text-slate-900 my-1">
                            ₹{pkg.price}
                          </div>
                        </div>
                        <div className="text-xs font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                          {pkg.classCount} Classes
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                  Select Payment Method:
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'UPI', label: 'UPI / GPay / PhonePe', icon: QrCode },
                    { id: 'Card', label: 'Debit / Credit Card', icon: CreditCard },
                    { id: 'Netbanking', label: 'Net Banking', icon: ShieldCheck },
                  ].map((m) => {
                    const Icon = m.icon;
                    const isSel = paymentMethod === m.id;
                    return (
                      <button
                        key={m.id}
                        onClick={() => setPaymentMethod(m.id as any)}
                        className={`p-3 rounded-2xl border flex flex-col items-center text-center gap-1.5 transition text-xs font-bold ${
                          isSel
                            ? 'border-slate-950 bg-edexora-yellow/20 text-slate-950'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-[11px] leading-tight">{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Security badge */}
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  100% Encrypted & Safe Gateway. Classes are unlocked instantly after demo payment.
                </span>
              </div>
            </>
          )}
        </div>

        {/* Footer CTA */}
        {!isSuccess && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-500">Total Payable</div>
              <div className="text-xl font-black text-slate-900">
                ₹{selectedPkg.price}
              </div>
            </div>

            <button
              onClick={handleSimulatePayment}
              disabled={isProcessing}
              className="px-6 py-3 bg-edexora-yellow hover:bg-yellow-400 text-slate-950 font-black rounded-2xl text-sm transition shadow-highlight flex items-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Processing Payment...</span>
              ) : (
                <>
                  <span>Pay ₹{selectedPkg.price} & Unlock</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
