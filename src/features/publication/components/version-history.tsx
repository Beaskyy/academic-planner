'use client';

import React, { useState } from 'react';
import {
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Search,
  ExternalLink,
  Copy,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface VersionHistoryProps {
  isFailureState?: boolean;
  onToggleFailureState?: (failed: boolean) => void;
}

export function VersionHistory({ isFailureState = false, onToggleFailureState }: VersionHistoryProps) {
  const [selectedVersion, setSelectedVersion] = useState<string>('v4.0');
  const [searchQuery, setSearchQuery] = useState('');
  const [artifactTypeFilter, setArtifactTypeFilter] = useState('All');
  const [dateRangeFilter, setDateRangeFilter] = useState('Last 90 Days');
  const [isRetrying, setIsRetrying] = useState(false);
  const [retrySuccess, setRetrySuccess] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
      setRetrySuccess(true);
      if (onToggleFailureState) {
        onToggleFailureState(false);
      }
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* ── Filters Row ───────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-3 w-full">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px] max-w-sm">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by artifact or version..."
            className="w-full bg-white border border-[#ebebeb] rounded-[8px] px-3.5 py-2 text-[13px] text-[#1f1f1f] placeholder:text-[#808080] focus:outline-none focus:border-[#046aff] shadow-2xs"
          />
        </div>

        {/* Artifact Type Dropdown */}
        <div className="relative">
          <select
            value={artifactTypeFilter}
            onChange={(e) => setArtifactTypeFilter(e.target.value)}
            className="bg-white border border-[#ebebeb] rounded-[8px] px-3.5 py-2 text-[14px] font-medium text-[#5c5c5c] appearance-none cursor-pointer focus:outline-none focus:border-[#046aff] pr-8 shadow-2xs"
          >
            <option value="All">Artifact Type: All</option>
            <option value="Academic Calendar">Academic Calendar</option>
            <option value="Curriculum">Curriculum</option>
            <option value="Course Offerings">Course Offerings</option>
            <option value="Timetable">Timetable</option>
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-[#808080]">
            ▼
          </span>
        </div>

        {/* Date Range Dropdown */}
        <div className="relative">
          <select
            value={dateRangeFilter}
            onChange={(e) => setDateRangeFilter(e.target.value)}
            className="bg-white border border-[#ebebeb] rounded-[8px] px-3.5 py-2 text-[14px] font-medium text-[#5c5c5c] appearance-none cursor-pointer focus:outline-none focus:border-[#046aff] pr-8 shadow-2xs"
          >
            <option value="Last 90 Days">Date Range: Last 90 Days</option>
            <option value="Last 30 Days">Date Range: Last 30 Days</option>
            <option value="All Time">Date Range: All Time</option>
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-[#808080]">
            ▼
          </span>
        </div>
      </div>

      {/* ── Timeline Workspace Grid (Left List + Right Column) ────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
        {/* Left Column: Version Cards Timeline */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* FAILURE STATE: v3.1 Course Offerings (aps-25-pub-failed) */}
          {isFailureState && (
            <div className="bg-white border-2 border-[#fb3748] rounded-[16px] p-5 shadow-xs flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <span className="w-3 h-3 rounded-full bg-[#fb3748] shrink-0 mt-1" />
                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[14px] text-[#0b0b0b]">v3.1</span>
                      <h3 className="font-semibold text-[14px] text-[#0b0b0b]">
                        Course Offerings — Semester 1 2026/27
                      </h3>
                    </div>
                    <span className="bg-[#fb3748] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      PUBLICATION FAILED
                    </span>
                  </div>
                  <p className="text-[12px] text-[#808080]">
                    Attempted publication on Jan 12, 2026 by Laura Hills
                  </p>
                </div>
              </div>

              {/* Error Callout Box */}
              <div className="bg-white border border-[#fbd5c0] rounded-[10px] p-4 flex flex-col gap-2.5">
                <div className="flex items-center gap-2 text-[#fb3748] text-[13px] font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Status: Partial — 2 of 5 events delivered</span>
                </div>
                <div className="space-y-1.5 text-[12px] text-[#1f1f1f] pl-6">
                  <p>• SIS Integration: Connection timeout after 3 attempts</p>
                  <p>• Examinations: Endpoint returned 503 Service Unavailable</p>
                </div>
                <span className="text-[11px] text-[#808080] pt-1 pl-6">
                  Correlation ID: pub_corr_3053_89ac
                </span>
              </div>
            </div>
          )}

          {/* NORMAL STATE: Active Version Card v4.0 (aps-25-versions) */}
          {!isFailureState && (
            <div
              onClick={() => setSelectedVersion('v4.0')}
              className="bg-white border-2 border-[#046aff] rounded-[16px] p-5 shadow-xs flex flex-col gap-3 cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <span className="w-3 h-3 rounded-full bg-[#046aff] shrink-0 mt-1" />
                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[14px] text-[#0b0b0b]">v4.0</span>
                      <h3 className="font-semibold text-[14px] text-[#0b0b0b]">
                        BSc Computer Science structure change
                      </h3>
                    </div>
                    <span className="bg-[#e0faec] text-[#1fc16b] text-[11px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Published
                    </span>
                  </div>
                  <p className="text-[12px] text-[#808080]">
                    Published on Jan 12, 2026 by Laura Hills
                  </p>
                </div>
              </div>

              {/* Version Changes Box */}
              <div className="bg-[#fafafa] rounded-[8px] p-3.5 space-y-1.5 ml-6">
                <span className="block text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
                  Version Changes
                </span>
                <p className="text-[12px] text-[#1f1f1f] leading-relaxed">
                  - Reallocated PHY 102 laboratory practical slots due to equipment calibration schedule.
                </p>
                <p className="text-[12px] text-[#1f1f1f] leading-relaxed">
                  - Shifted Semester 1 start date to October 9, 2026.
                </p>
              </div>
            </div>
          )}

          {/* Version Card v3.1 */}
          <div
            onClick={() => setSelectedVersion('v3.1')}
            className="bg-white border border-[#ebebeb] rounded-[16px] p-5 shadow-2xs flex items-start gap-3 hover:border-gray-300 transition-all cursor-pointer opacity-85 hover:opacity-100"
          >
            <span className="w-3 h-3 rounded-full bg-[#808080] shrink-0 mt-1" />
            <div className="flex-1 min-w-0 flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[14px] text-[#0b0b0b]">v3.1</span>
                  <h3 className="font-semibold text-[14px] text-[#0b0b0b]">
                    Updated Reading Week block start
                  </h3>
                </div>
                <span className="bg-[#f5f5f5] text-[#7b7b7b] text-[11px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Superseded
                </span>
              </div>
              <p className="text-[12px] text-[#808080]">
                Published on Jan 05, 2026 by Marcus Cole
              </p>
            </div>
          </div>

          {/* Version Card v3.0 */}
          <div
            onClick={() => setSelectedVersion('v3.0')}
            className="bg-white border border-[#ebebeb] rounded-[16px] p-5 shadow-2xs flex items-start gap-3 hover:border-gray-300 transition-all cursor-pointer opacity-85 hover:opacity-100"
          >
            <span className="w-3 h-3 rounded-full bg-[#808080] shrink-0 mt-1" />
            <div className="flex-1 min-w-0 flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[14px] text-[#0b0b0b]">v3.0</span>
                  <h3 className="font-semibold text-[14px] text-[#0b0b0b]">
                    Major draft calendar setup for 26/27
                  </h3>
                </div>
                <span className="bg-[#f5f5f5] text-[#7b7b7b] text-[11px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Superseded
                </span>
              </div>
              <p className="text-[12px] text-[#808080]">
                Published on Dec 18, 2025 by Laura Hills
              </p>
            </div>
          </div>

          {/* Version Card v2.0 */}
          <div
            onClick={() => setSelectedVersion('v2.0')}
            className="bg-white border border-[#ebebeb] rounded-[16px] p-5 shadow-2xs flex items-start gap-3 hover:border-gray-300 transition-all cursor-pointer opacity-85 hover:opacity-100"
          >
            <span className="w-3 h-3 rounded-full bg-[#808080] shrink-0 mt-1" />
            <div className="flex-1 min-w-0 flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[14px] text-[#0b0b0b]">v2.0</span>
                  <h3 className="font-semibold text-[14px] text-[#0b0b0b]">
                    Academic Year 2025/2026 Archive
                  </h3>
                </div>
                <span className="bg-[#f5f5f5] text-[#7b7b7b] text-[11px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Superseded
                </span>
              </div>
              <p className="text-[12px] text-[#808080]">
                Published on Jun 15, 2025 by System Admin
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Details or Recovery Center */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* If FAILURE STATE: Recovery & Action Center (aps-25-pub-failed) */}
          {isFailureState ? (
            <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-5">
              <h3 className="text-[16px] font-bold text-[#0b0b0b]">
                Recovery &amp; Action Center
              </h3>

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleRetry}
                  disabled={isRetrying}
                  className="w-full py-2.5 bg-[#335cff] hover:bg-[#254bdb] text-white rounded-[10px] text-[14px] font-medium transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
                  <span>{isRetrying ? 'Retrying Failed Events...' : 'Retry Failed Events'}</span>
                </button>

                <button
                  type="button"
                  className="w-full py-2.5 bg-white hover:bg-gray-50 text-[#1f1f1f] rounded-[10px] text-[14px] font-medium transition-colors border border-[#d9d9d9] shadow-2xs"
                >
                  Query Current Status
                </button>

                <div className="bg-[#fafafa] rounded-[8px] p-3 text-[12px] text-[#5c5c5c] leading-relaxed">
                  Note: Retry uses the same event identity and will not create a new artifact version or duplicate notifications.
                </div>
              </div>

              <div className="h-px bg-[#f5f5f5] w-full" />

              {/* Integration Delivery Logs */}
              <div className="space-y-3">
                <h4 className="text-[14px] font-semibold text-[#0b0b0b]">
                  Integration Delivery Logs
                </h4>
                <div className="space-y-2.5 text-[13px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#1f1f1f]">Learning Delivery</span>
                    <span className="bg-[#e0faec] text-[#1fc16b] text-[11px] font-bold px-2 py-0.5 rounded-full uppercase">
                      Acknowledged
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#1f1f1f]">Admissions Module</span>
                    <span className="bg-[#e0faec] text-[#1fc16b] text-[11px] font-bold px-2 py-0.5 rounded-full uppercase">
                      Acknowledged
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#1f1f1f]">Registration</span>
                    <span className="bg-[#e0faec] text-[#1fc16b] text-[11px] font-bold px-2 py-0.5 rounded-full uppercase">
                      Acknowledged
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#1f1f1f]">SIS Integration</span>
                    <span className="bg-[#fef3ec] text-[#f97316] text-[11px] font-bold px-2 py-0.5 rounded-full uppercase">
                      Pending Retry
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#1f1f1f]">Examinations Module</span>
                    <span className="bg-[#fef0f0] text-[#dc2626] text-[11px] font-bold px-2 py-0.5 rounded-full uppercase">
                      503 Error
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* NORMAL STATE: Version v4.0 Details (aps-25-versions) */
            <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-5">
              <h3 className="text-[16px] font-bold text-[#0b0b0b]">
                Version v4.0 Details
              </h3>

              <div className="space-y-3 text-[13px]">
                <div className="flex items-center justify-between">
                  <span className="text-[#808080]">Artifact Type</span>
                  <span className="font-semibold text-[#1f1f1f]">Academic Calendar</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#808080]">Commit Hash</span>
                  <span className="font-semibold font-mono text-[#1f1f1f]">8f2b7ac9</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#808080]">Publications Reference</span>
                  <span className="font-semibold text-[#046aff] hover:underline cursor-pointer">
                    PUB-REF-2026-Semester1
                  </span>
                </div>
              </div>

              <div className="h-px bg-[#f5f5f5] w-full" />

              {/* Downstream Integrations */}
              <div className="space-y-3">
                <h4 className="text-[14px] font-semibold text-[#0b0b0b]">
                  Downstream Integrations
                </h4>
                <div className="space-y-2.5 text-[13px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#1f1f1f]">Student Information System (SIS)</span>
                    <span className="bg-[#e0faec] text-[#1fc16b] text-[11px] font-bold px-2 py-0.5 rounded-full uppercase">
                      Synced
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#1f1f1f]">Learning Management (LMS)</span>
                    <span className="bg-[#e0faec] text-[#1fc16b] text-[11px] font-bold px-2 py-0.5 rounded-full uppercase">
                      Synced
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#1f1f1f]">Admissions Module</span>
                    <span className="bg-[#e0faec] text-[#1fc16b] text-[11px] font-bold px-2 py-0.5 rounded-full uppercase">
                      Synced
                    </span>
                  </div>
                </div>
              </div>

              {/* Create Successor Button */}
              <button
                type="button"
                className="w-full py-2.5 bg-[#335cff] hover:bg-[#254bdb] text-white rounded-[10px] text-[14px] font-medium transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Create successor from v4.0</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
