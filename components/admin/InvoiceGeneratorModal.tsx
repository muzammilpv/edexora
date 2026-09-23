'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  FileText,
  Printer,
  Download,
  CheckCircle2,
  X,
  User,
  DollarSign,
  Calendar,
  CreditCard,
  Building,
  ShieldCheck,
  PlusCircle,
  Sparkles,
} from 'lucide-react';
import { useAppStore } from '../../lib/store';
import { Transaction } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const InvoiceGeneratorModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { students, unlockPackage, packages, currentStudent } = useAppStore();

  const [studentName, setStudentName] = useState('Muzammil PV');
  const [classLevel, setClassLevel] = useState('Class 8 (CBSE)');
  const [amount, setAmount] = useState<number>(500);
  const [description, setDescription] = useState('Monthly Tuition Fee • 10 Classes Pack');
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'UPI' | 'Card' | 'Netbanking'>('Cash');
  const [receiptNumber, setReceiptNumber] = useState(`EDX-INV-2026-${Math.floor(10000 + Math.random() * 90000)}`);
  const [receiptDate, setReceiptDate] = useState(
    new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  );

  const [isGenerated, setIsGenerated] = useState(false);

  if (!isOpen) return null;

  const handleStudentSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === 'CUSTOM') {
      setStudentName('');
    } else {
      const found = students.find((s) => s.name === val);
      if (found) {
        setStudentName(found.name);
        setClassLevel(`Class ${found.classLevel} (${found.curriculum})`);
      } else {
        setStudentName(val);
      }
    }
  };

  const handleGenerateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;
    setIsGenerated(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSavePdf = () => {
    window.print();
  };

  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderVisualInvoice = (logoImg?: HTMLImageElement) => {
      // 1. Solid Pure White Background Paper
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Clean Slate Outer Border
      ctx.strokeStyle = '#0F172A';
      ctx.lineWidth = 8;
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

      // 2. BRIGHT EDEXORA YELLOW HEADER BANNER (NO BLACK BOX!)
      ctx.fillStyle = '#FFD200';
      if (ctx.roundRect) {
        ctx.roundRect(35, 35, canvas.width - 70, 160, 16);
        ctx.fill();
      } else {
        ctx.fillRect(35, 35, canvas.width - 70, 160);
      }
      ctx.strokeStyle = '#0F172A';
      ctx.lineWidth = 3;
      ctx.strokeRect(35, 35, canvas.width - 70, 160);

      // Logo rendering in a crisp White Circle badge
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(120, 115, 58, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#0F172A';
      ctx.lineWidth = 4;
      ctx.stroke();

      if (logoImg && logoImg.complete && logoImg.naturalWidth > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(120, 115, 54, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(logoImg, 66, 61, 108, 108);
        ctx.restore();
      } else {
        // Fallback Logo Emblem
        ctx.fillStyle = '#0F172A';
        ctx.font = 'black 58px sans-serif';
        ctx.fillText('E', 103, 136);
      }

      // Edexora Header Text (Dark Slate on Yellow Header)
      ctx.fillStyle = '#0F172A';
      ctx.font = 'black 46px sans-serif';
      ctx.fillText('EDEXORA', 205, 98);

      ctx.font = 'bold 16px sans-serif';
      ctx.fillStyle = '#1E293B';
      ctx.fillText('ONLINE TUITION & LEARNING ACADEMY', 205, 126);

      ctx.font = '14px sans-serif';
      ctx.fillStyle = '#334155';
      ctx.fillText('Class 1 to 12 • CBSE & Kerala State Board', 205, 150);

      // Paid Badge (Top Right)
      ctx.fillStyle = '#059669';
      if (ctx.roundRect) {
        ctx.roundRect(790, 50, 355, 48, 24);
        ctx.fill();
      } else {
        ctx.fillRect(790, 50, 355, 48);
      }

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('✓ OFFICIAL FEE RECEIPT • PAID', 815, 80);

      // Receipt Metadata (On Yellow Banner)
      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 18px monospace';
      ctx.fillText(`Invoice No: ${receiptNumber}`, 790, 130);
      ctx.font = '15px sans-serif';
      ctx.fillStyle = '#334155';
      ctx.fillText(`Date: ${receiptDate}`, 790, 156);

      // 3. Student Profile Details Box (Soft Amber Light Box #FFFBEB)
      ctx.fillStyle = '#FFFBEB';
      if (ctx.roundRect) {
        ctx.roundRect(50, 225, canvas.width - 100, 190, 20);
        ctx.fill();
      } else {
        ctx.fillRect(50, 225, canvas.width - 100, 190);
      }
      ctx.strokeStyle = '#FCD34D';
      ctx.lineWidth = 3;
      ctx.strokeRect(50, 225, canvas.width - 100, 190);

      // Left Column: Student Details
      ctx.fillStyle = '#B45309';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('STUDENT NAME & PROFILE:', 80, 265);

      ctx.fillStyle = '#0F172A';
      ctx.font = 'black 32px sans-serif';
      ctx.fillText(studentName, 80, 310);

      ctx.font = 'bold 19px sans-serif';
      ctx.fillStyle = '#1E293B';
      ctx.fillText(classLevel, 80, 348);

      ctx.font = '14px sans-serif';
      ctx.fillStyle = '#64748B';
      ctx.fillText(`Student ID: EDX-STD-${Math.floor(1000 + Math.random() * 9000)}`, 80, 382);

      // Right Column: Payment Details
      ctx.fillStyle = '#B45309';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('PAYMENT DETAILS:', 720, 265);

      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText(`Mode: ${paymentMethod}`, 720, 308);

      ctx.fillStyle = '#059669';
      ctx.font = 'bold 19px sans-serif';
      ctx.fillText('Status: Verified & Completed', 720, 348);

      ctx.font = '14px sans-serif';
      ctx.fillStyle = '#64748B';
      ctx.fillText('Issued by: EDEXORA Accounts Team', 720, 382);

      // 4. Itemized Table Header (Light Slate Accent Bar #F1F5F9 - NO BLACK BOX!)
      ctx.fillStyle = '#F1F5F9';
      if (ctx.roundRect) {
        ctx.roundRect(50, 445, canvas.width - 100, 55, 12);
        ctx.fill();
      } else {
        ctx.fillRect(50, 445, canvas.width - 100, 55);
      }
      ctx.strokeStyle = '#CBD5E1';
      ctx.lineWidth = 2;
      ctx.strokeRect(50, 445, canvas.width - 100, 55);

      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('FEE DESCRIPTION', 80, 480);
      ctx.fillText('QTY / CLASSES', 620, 480);
      ctx.fillText('AMOUNT (₹)', 980, 480);

      // Table Content Row
      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText(description, 80, 550);

      ctx.font = '15px sans-serif';
      ctx.fillStyle = '#64748B';
      ctx.fillText('Access to full video lectures, study materials & live classes', 80, 585);

      ctx.font = 'bold 19px sans-serif';
      ctx.fillStyle = '#0F172A';
      ctx.fillText('10 Classes Pack', 620, 550);

      ctx.font = 'black 32px sans-serif';
      ctx.fillText(`₹${amount.toLocaleString()}`, 980, 550);

      // Line Separator
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(50, 630);
      ctx.lineTo(canvas.width - 50, 630);
      ctx.stroke();

      // 5. BRIGHT EDEXORA YELLOW TOTAL BOX (NO BLACK BOX!)
      ctx.fillStyle = '#FFD200';
      if (ctx.roundRect) {
        ctx.roundRect(50, 665, canvas.width - 100, 115, 24);
        ctx.fill();
      } else {
        ctx.fillRect(50, 665, canvas.width - 100, 115);
      }
      ctx.strokeStyle = '#0F172A';
      ctx.lineWidth = 3;
      ctx.strokeRect(50, 665, canvas.width - 100, 115);

      ctx.fillStyle = '#0F172A';
      ctx.font = 'black 20px sans-serif';
      ctx.fillText('TOTAL AMOUNT RECEIVED', 85, 715);

      ctx.font = '14px sans-serif';
      ctx.fillStyle = '#334155';
      ctx.fillText('Inclusive of all learning materials & taxes', 85, 746);

      ctx.fillStyle = '#0F172A';
      ctx.font = 'black 50px sans-serif';
      ctx.fillText(`₹${amount.toLocaleString()}`, 930, 740);

      // 6. Verification Badge & Signature Block
      ctx.strokeStyle = '#059669';
      ctx.lineWidth = 3;
      if (ctx.roundRect) {
        ctx.roundRect(50, 815, 440, 70, 16);
        ctx.stroke();
      } else {
        ctx.strokeRect(50, 815, 440, 70);
      }

      ctx.fillStyle = '#059669';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('✓ VALID COMPUTER GENERATED RECEIPT', 75, 858);

      ctx.fillStyle = '#0F172A';
      ctx.font = 'black 22px sans-serif';
      ctx.fillText('EDEXORA Tuition Academy', 760, 845);

      ctx.font = '14px sans-serif';
      ctx.fillStyle = '#64748B';
      ctx.fillText('Authorized Signature & Official Stamp', 760, 872);

      // Bottom Footer Brand Tag
      ctx.fillStyle = '#94A3B8';
      ctx.font = '14px sans-serif';
      ctx.fillText('EDEXORA Learning App • Official Fee Receipt • www.edexora.com', 360, 1030);

      // Download Image trigger
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `EDEXORA_Official_Invoice_${studentName.replace(/\s+/g, '_')}_${receiptNumber}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    // Load logo image onto canvas
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.src = '/edexora-logo.jpg';
    img.onload = () => {
      renderVisualInvoice(img);
    };
    img.onerror = () => {
      renderVisualInvoice();
    };
  };

  const handleReset = () => {
    setIsGenerated(false);
    setReceiptNumber(`EDX-INV-2026-${Math.floor(10000 + Math.random() * 90000)}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto no-print">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-slate-950 text-white p-5 md:p-6 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-edexora-yellow text-slate-950 flex items-center justify-center font-black shadow-highlight">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-black text-white">
                EDEXORA Official Fee Invoice & Bill
              </h2>
              <p className="text-xs text-slate-400">
                Generate, print and download fee receipts for students.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-900 border border-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="p-5 md:p-6 overflow-y-auto flex-1">
          {!isGenerated ? (
            /* Step 1: Fill Invoice Form */
            <form onSubmit={handleGenerateInvoice} className="space-y-5">
              <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl flex items-center gap-3 text-xs text-amber-900 font-semibold">
                <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
                <span>
                  Quick Bill Generation: Select or enter student details below (e.g. Muzammil PV - ₹500).
                </span>
              </div>

              {/* Student Name Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Select Registered Student or Enter Name
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <select
                    onChange={handleStudentSelect}
                    defaultValue="Muzammil PV"
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs md:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950"
                  >
                    <option value="Muzammil PV">Muzammil PV (Class 8 CBSE)</option>
                    {students.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name} (Class {s.classLevel} {s.curriculum})
                      </option>
                    ))}
                    <option value="CUSTOM">+ Custom Student Name</option>
                  </select>

                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Student Full Name"
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs md:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950"
                    required
                  />
                </div>
              </div>

              {/* Class & Curriculum */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Class & Board Curriculum
                  </label>
                  <input
                    type="text"
                    value={classLevel}
                    onChange={(e) => setClassLevel(e.target.value)}
                    placeholder="e.g. Class 8 (CBSE / Kerala State)"
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs md:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Amount Paid (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-500">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full pl-8 pr-3 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs md:text-sm font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Description & Payment Method */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Fee Description / Purpose
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. Monthly Tuition Fee"
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs md:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Payment Mode
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs md:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950"
                  >
                    <option value="Cash">💵 Cash</option>
                    <option value="UPI">📱 UPI / Google Pay / PhonePe</option>
                    <option value="Card">💳 Credit / Debit Card</option>
                    <option value="Netbanking">🏦 Bank Transfer</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-edexora-yellow hover:bg-yellow-400 text-slate-950 font-black rounded-2xl text-sm transition shadow-highlight flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Generate Official Fee Invoice</span>
                </button>
              </div>
            </form>
          ) : (
            /* Step 2: Generated Printable Fee Receipt / Invoice */
            <div className="space-y-6">
              {/* Printable Invoice Container */}
              <div
                id="printable-invoice"
                className="bg-white p-6 md:p-8 rounded-3xl border-2 border-slate-900 shadow-card space-y-6 text-slate-900 font-sans relative overflow-hidden"
              >
                {/* Invoice Watermark / Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-slate-900 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-edexora-yellow border border-slate-800 flex items-center justify-center shrink-0">
                      <Image src="/edexora-logo.jpg" alt="Edexora Logo" fill className="object-cover" priority />
                    </div>
                    <div>
                      <h1 className="text-2xl font-black tracking-tight text-slate-950 leading-none">
                        EDEXORA
                      </h1>
                      <p className="text-[11px] font-bold text-slate-600 uppercase tracking-widest mt-0.5">
                        Online Tuition & Learning Academy
                      </p>
                      <p className="text-[10px] text-slate-500">
                        Class 1 to 12 • CBSE & Kerala State Board
                      </p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="inline-block bg-emerald-600 text-white text-[11px] font-black uppercase px-3 py-1 rounded-full tracking-wider">
                      OFFICIAL FEE RECEIPT • PAID
                    </span>
                    <div className="text-xs font-mono font-bold text-slate-800 mt-1">
                      Invoice No: <span className="text-slate-950">{receiptNumber}</span>
                    </div>
                    <div className="text-xs text-slate-600">Date: {receiptDate}</div>
                  </div>
                </div>

                {/* Billed Student Details */}
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-500 block mb-0.5">
                      Student Name & Profile:
                    </span>
                    <div className="text-base font-black text-slate-950">{studentName}</div>
                    <div className="text-slate-600 font-semibold">{classLevel}</div>
                    <div className="text-slate-500 text-[11px]">ID: EDX-STD-{Math.floor(1000 + Math.random() * 9000)}</div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase text-slate-500 block mb-0.5">
                      Payment Details:
                    </span>
                    <div className="text-sm font-extrabold text-slate-900">Mode: {paymentMethod}</div>
                    <div className="text-emerald-700 font-bold">Status: Completed & Verified</div>
                    <div className="text-slate-500 text-[11px]">Issued by: EDEXORA Accounts</div>
                  </div>
                </div>

                {/* Itemized Table */}
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-900 text-slate-500 uppercase text-[10px] tracking-wider">
                      <th className="py-2">Description</th>
                      <th className="py-2 text-center">Qty / Classes</th>
                      <th className="py-2 text-right">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-900 font-semibold">
                    <tr>
                      <td className="py-3">
                        <div className="font-bold text-slate-950">{description}</div>
                        <div className="text-[11px] text-slate-500">Access to video lectures, notes & live classes</div>
                      </td>
                      <td className="py-3 text-center font-bold">10 Classes Pack</td>
                      <td className="py-3 text-right font-black text-base text-slate-950">
                        ₹{amount.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Total Summary Row */}
                <div className="bg-slate-950 text-white p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-edexora-yellow">TOTAL AMOUNT RECEIVED</div>
                    <div className="text-[11px] text-slate-300">Inclusive of all learning materials</div>
                  </div>
                  <div className="text-2xl font-black text-white">
                    ₹{amount.toLocaleString()}
                  </div>
                </div>

                {/* Footer Stamp & Verification */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                    <ShieldCheck className="w-4 h-4" /> Valid Computer Generated Official Receipt
                  </div>
                  <div className="text-right">
                    <div className="font-extrabold text-slate-900">EDEXORA Tuition Academy</div>
                    <div className="text-[10px]">Authorized Signature</div>
                  </div>
                </div>
              </div>

              {/* 3 Separate Distinct Small Box Action Buttons */}
              <div className="space-y-4">
                <div className="text-[11px] font-extrabold uppercase text-slate-500 tracking-wider text-center">
                  Export & Share Options:
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {/* Box 1: Print */}
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="p-3.5 bg-slate-950 hover:bg-slate-900 text-white font-black rounded-2xl text-xs transition flex flex-col items-center justify-center gap-1.5 border border-slate-800 shadow-sm active:scale-95 group"
                  >
                    <Printer className="w-5 h-5 text-edexora-yellow group-hover:scale-110 transition" />
                    <span>Print</span>
                  </button>

                  {/* Box 2: Save as PDF */}
                  <button
                    type="button"
                    onClick={handleSavePdf}
                    className="p-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl text-xs transition flex flex-col items-center justify-center gap-1.5 border border-emerald-500 shadow-sm active:scale-95 group"
                  >
                    <FileText className="w-5 h-5 group-hover:scale-110 transition" />
                    <span>Save as PDF</span>
                  </button>

                  {/* Box 3: Download Visual PNG */}
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="p-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl text-xs transition flex flex-col items-center justify-center gap-1.5 border border-blue-500 shadow-sm active:scale-95 group"
                  >
                    <Download className="w-5 h-5 group-hover:scale-110 transition" />
                    <span>Download Image</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" /> Create Another Fee Bill
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
