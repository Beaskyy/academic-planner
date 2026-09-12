'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  RefreshCw,
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Check,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export function PublicationRecovery() {
  const [activeTab, setActiveTab] = useState<'versions' | 'delivery' | 'audit'>('versions');
  const [isQuerying, setIsQuerying] = useState(false);
  const [querySuccess, setQuerySuccess] = useState(false);

  const handleQueryRecord = () => {
    setIsQuerying(true);
    setTimeout(() => {
      setIsQuerying(false);
      setQuerySuccess(true);
    }, 1000);
  };

  return (
    <div className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-[1440px] mx-auto w-full">
      {/* ── Page Header & Tabs ───────────────────────────────────────── */}
      <div className="flex flex-col gap-4">
        <h1 className="text-[26px] sm:text-[28px] font-bold text-[#0b0b0b] tracking-tight leading-tight">
          Publication Recovery
        </h1>

        {/* View Toggles */}
        <div className="flex items-center gap-1 bg-[#f0f0f0] p-1 rounded-[10px] w-fit">
          <button
            type="button"
            onClick={() => setActiveTab('versions')}
            className={`px-3.5 py-1.5 rounded-[8px] text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'versions'
                ? 'bg-white text-[#0b0b0b] shadow-xs'
                : 'text-[#5c5c5c] hover:text-[#0b0b0b]'
            }`}
          >
            Version History
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('delivery')}
            className={`px-3.5 py-1.5 rounded-[8px] text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'delivery'
                ? 'bg-white text-[#0b0b0b] shadow-xs'
                : 'text-[#5c5c5c] hover:text-[#0b0b0b]'
            }`}
          >
            Delivery Status
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('audit')}
            className={`px-3.5 py-1.5 rounded-[8px] text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'audit'
                ? 'bg-white text-[#0b0b0b] shadow-xs'
                : 'text-[#5c5c5c] hover:text-[#0b0b0b]'
            }`}
          >
            Audit Logs
          </button>
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-[#808080] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter by artifact or version..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#ebebeb] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#046aff]/20 focus:border-[#046aff]"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="px-3.5 py-2 bg-white border border-[#ebebeb] hover:bg-gray-50 text-xs font-medium rounded-[8px] text-[#1f1f1f] shadow-xs cursor-pointer"
          >
            Filter: All Failures
          </button>
          <button
            type="button"
            className="px-3.5 py-2 bg-[#335cff] hover:bg-[#254bdb] text-xs font-medium rounded-[8px] text-white shadow-xs cursor-pointer"
          >
            Export Audit Trail
          </button>
        </div>
      </div>

      {/* ── Main Recovery Workspace (2 Columns) ──────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Cols: Timeline List */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Version Card v3.1 Failed (High Attention) */}
          <div className="bg-white border-2 border-[#fecdd3] rounded-[16px] p-6 shadow-xs flex flex-col gap-4 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="font-bold text-[18px] text-[#0b0b0b]">v3.1</span>
                <span className="text-[14px] font-semibold text-[#0b0b0b]">
                  Course Offerings — Semester 1 2026/27
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#fff1f2] text-[#fb3748] border border-[#fecdd3] w-fit">
                Status Unknown
              </span>
            </div>

            <p className="text-[13px] text-[#5c5c5c] leading-relaxed">
              Publication request sent on Jan 12, 2026; no authoritative completion response received.
            </p>

            {/* Expanded Error Detail Card */}
            <div className="p-4 rounded-[12px] bg-[#fff1f2]/60 border border-[#fecdd3] flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-[#fb3748]">
                <AlertTriangle className="w-4 h-4 text-[#fb3748] shrink-0" />
                <span className="text-[13px] font-bold text-[#fb3748]">
                  Status unknown — query the authoritative publication record before retrying
                </span>
              </div>

              <div className="text-[12px] text-[#9f1239] flex flex-col gap-1 pl-6">
                <div>• No duplicate version has been created</div>
                <div>• Event identity pub_evt_3053_89ac remains reserved</div>
              </div>

              <div className="text-[11px] text-[#9f1239] font-mono pl-6 pt-1 border-t border-[#fecdd3]/60">
                Correlation ID: pub_corr_3053_89ac
              </div>
            </div>
          </div>

          {/* Version Card v3.0 Published (Historical) */}
          <div className="bg-white border border-[#ebebeb] rounded-[16px] p-5 shadow-xs flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="font-bold text-[16px] text-[#0b0b0b]">v3.0</span>
                <span className="text-[13px] font-semibold text-[#1f1f1f]">
                  Major draft calendar setup for 26/27
                </span>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#eafaf1] text-[#1fc16b] border border-[#d1f2e1] w-fit">
                Published ✓
              </span>
            </div>
            <div className="text-[12px] text-[#808080]">
              Published on Dec 18, 2025 by Laura Hills
            </div>
          </div>
        </div>

        {/* Right 1 Col: Required Recovery Sequence */}
        <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-5">
          <h2 className="text-[16px] font-bold text-[#0b0b0b]">
            Required Recovery Sequence
          </h2>

          {/* Recovery Action Buttons */}
          <div className="flex flex-col gap-2.5">
            <button
              type="button"
              disabled={isQuerying}
              onClick={handleQueryRecord}
              className="w-full py-2.5 px-4 bg-[#335cff] hover:bg-[#254bdb] text-white text-[13px] font-medium rounded-[10px] transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isQuerying ? 'animate-spin' : ''}`} />
              <span>{isQuerying ? 'Querying...' : 'Query Authoritative Record'}</span>
            </button>

            <button
              type="button"
              disabled={!querySuccess}
              className={`w-full py-2.5 px-4 text-[13px] font-medium rounded-[10px] transition-colors shadow-xs ${
                querySuccess
                  ? 'bg-[#fb3748] hover:bg-[#e02839] text-white cursor-pointer'
                  : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
              }`}
            >
              Retry Publication
            </button>

            <div className="p-3 rounded-[10px] bg-[#fafafa] border border-[#ebebeb] text-[11px] text-[#5c5c5c] leading-relaxed">
              {querySuccess ? (
                <span className="text-[#10b981] font-medium">
                  ✓ Authoritative query confirmed: previous request timed out before ledger commit. You may now retry safely.
                </span>
              ) : (
                <span>
                  Retry remains disabled until the authoritative query confirms that publication did not complete.
                </span>
              )}
            </div>
          </div>

          <div className="h-px bg-[#f0f0f0] w-full" />

          {/* Last Known Delivery Evidence */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#808080]">
              Last Known Delivery Evidence
            </h3>

            <div className="flex flex-col gap-2.5 text-[12px]">
              <div className="flex items-center justify-between py-1">
                <span className="text-[#1f1f1f]">Learning Delivery</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#eafaf1] text-[#1fc16b]">
                  Acknowledged
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-[#1f1f1f]">Admissions Module</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#eafaf1] text-[#1fc16b]">
                  Acknowledged
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-[#1f1f1f]">Registration</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#eafaf1] text-[#1fc16b]">
                  Acknowledged
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-[#1f1f1f]">SIS Integration</span>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                  <span>Pending Retry</span>
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-[#1f1f1f]">Examinations Module</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#eafaf1] text-[#1fc16b]">
                  Acknowledged
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
