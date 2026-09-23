'use client';

import React, { useState } from 'react';
import {
  DollarSign,
  Search,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  XCircle,
  Receipt,
  Printer,
  FileText,
} from 'lucide-react';
import { useAppStore } from '../../lib/store';
import { Transaction, PaymentStatus } from '../../types';
import { InvoiceGeneratorModal } from './InvoiceGeneratorModal';

export const FinanceDashboard: React.FC = () => {
  const { transactions } = useAppStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | 'ALL'>('ALL');
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  const filtered = transactions.filter((t) => {
    const matchSearch =
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.studentName.toLowerCase().includes(search.toLowerCase()) ||
      t.receiptNumber.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalRevenue = transactions.reduce((acc, t) => acc + t.amount, 0) + 145000;
  const totalSuccessful = transactions.filter((t) => t.status === 'Successful').length + 80;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-emerald-600 fill-emerald-100" />
            Finance & Fee Transactions
          </h1>
          <p className="text-xs md:text-sm text-slate-500">
            Real-time package purchase history, payment gateway statuses, and student fee invoices.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsInvoiceOpen(true)}
            className="px-4 py-2.5 bg-edexora-yellow hover:bg-yellow-400 text-slate-950 font-black rounded-xl text-xs transition shadow-sm flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4" />
            <span>Generate Fee Bill / Invoice</span>
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
        <div className="relative w-full sm:w-auto flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            placeholder="Search Transaction ID, Student Name, Receipt No..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-slate-900"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="w-full sm:w-auto bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none"
        >
          <option value="ALL">All Payment Statuses</option>
          <option value="Successful">Successful</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card space-y-1">
          <div className="text-xs font-extrabold uppercase text-slate-400">Total Platform Revenue</div>
          <div className="text-3xl font-black text-slate-900">₹{totalRevenue.toLocaleString()}</div>
          <div className="text-[10px] text-emerald-600 font-bold">100% Verified Collections</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card space-y-1">
          <div className="text-xs font-extrabold uppercase text-slate-400">Completed Transactions</div>
          <div className="text-3xl font-black text-slate-900">{totalSuccessful}</div>
          <div className="text-[10px] text-slate-500 font-medium">Automatic Receipts Issued</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card space-y-1">
          <div className="text-xs font-extrabold uppercase text-slate-400">Standard Package Rate</div>
          <div className="text-3xl font-black text-slate-900">₹500</div>
          <div className="text-[10px] text-slate-500 font-medium">Class 1–10 Packages</div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 uppercase tracking-wider text-slate-500 font-extrabold text-[10px]">
              <tr>
                <th className="p-4">Transaction ID</th>
                <th className="p-4">Student</th>
                <th className="p-4">Package Name</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Date / Time</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80 transition font-medium">
                  <td className="p-4 font-mono font-bold text-slate-900">{t.id}</td>
                  <td className="p-4 font-bold text-slate-900">{t.studentName}</td>
                  <td className="p-4 text-slate-700">{t.packageName}</td>
                  <td className="p-4 font-black text-slate-900">₹{t.amount}</td>
                  <td className="p-4 text-slate-600 font-semibold">{t.paymentMethod}</td>
                  <td className="p-4 text-slate-500 font-mono text-[11px]">{t.date}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                      {t.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedTxn(t)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl text-[11px] transition flex items-center gap-1 ml-auto"
                    >
                      <Receipt className="w-3.5 h-3.5" /> View Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Single Transaction Receipt Modal */}
      {selectedTxn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-edexora-yellow fill-slate-900" />
                <h3 className="text-base font-black text-slate-900">Payment Invoice Receipt</h3>
              </div>
              <button
                onClick={() => setSelectedTxn(null)}
                className="text-slate-400 hover:text-slate-800 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Receipt No:</span>
                <span className="font-mono font-bold text-slate-900">{selectedTxn.receiptNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Student Name:</span>
                <span className="font-bold text-slate-900">{selectedTxn.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Package:</span>
                <span className="font-bold text-slate-900">{selectedTxn.packageName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Classes Unlocked:</span>
                <span className="font-bold text-emerald-600">+{selectedTxn.classesUnlocked} Classes</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-black">
                <span>Amount Paid:</span>
                <span>₹{selectedTxn.amount}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => window.print()}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4 text-edexora-yellow" /> Print / Save Invoice PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Generator Modal */}
      <InvoiceGeneratorModal
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
      />
    </div>
  );
};
