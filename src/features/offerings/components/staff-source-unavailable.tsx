'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  Search,
  RefreshCw,
  ChevronDown,
  User,
  Users,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';

export function StaffSourceUnavailable() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState<string | null>(null);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setRefreshMessage('Cached roster re-synchronized with local fallback store.');
    }, 800);
  };

  const staffMembers = [
    {
      name: 'Dr. Charles Ononiwu',
      dept: 'Computer Science',
      workload: '2 Courses (Medium)',
      trackWidth: '66%',
      trackColor: 'bg-[#046aff]',
      verifiedStatus: 'Stale — 26h',
      statusVariant: 'warning',
      tags: ['Software Eng', 'Distributed Sys'],
    },
    {
      name: 'Prof. Grace Hopper',
      dept: 'Computer Science',
      workload: '3 Courses (Max Load)',
      trackWidth: '95%',
      trackColor: 'bg-[#ea580c]',
      verifiedStatus: 'Inactive reference',
      statusVariant: 'danger',
      tags: ['Compilers', 'Security'],
    },
    {
      name: 'Dr. Alan Turing',
      dept: 'Computer Science',
      workload: '1 Course (Light)',
      trackWidth: '33%',
      trackColor: 'bg-[#10b981]',
      verifiedStatus: 'Stale — 26h',
      statusVariant: 'warning',
      tags: ['Algorithms', 'AI/ML'],
    },
    {
      name: 'Dr. Ada Lovelace',
      dept: 'Mathematics',
      workload: '1 Course (Light)',
      trackWidth: '25%',
      trackColor: 'bg-[#10b981]',
      verifiedStatus: 'Unverified',
      statusVariant: 'neutral',
      tags: ['Applied Math', 'Cryptography'],
    },
    {
      name: 'Prof. Richard Feynman',
      dept: 'Physics',
      workload: '4 Courses (Overload)',
      trackWidth: '100%',
      trackColor: 'bg-[#fb3748]',
      verifiedStatus: 'Inactive reference',
      statusVariant: 'danger',
      tags: ['Quantum Comp'],
    },
  ];

  return (
    <div className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-[1440px] mx-auto w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-[12px] font-medium text-[#808080]">
            Academic Planning &gt; Staffing
          </span>
          <h1 className="text-[26px] sm:text-[28px] font-bold text-[#0b0b0b] tracking-tight leading-tight">
            Staff Source Unavailable
          </h1>
        </div>

        <button
          type="button"
          disabled={isRefreshing}
          onClick={handleRefresh}
          className="inline-flex items-center justify-center gap-2 bg-[#335cff] hover:bg-[#254bdb] text-white px-4 py-2.5 rounded-[10px] text-[14px] font-medium transition-all shadow-xs cursor-pointer select-none self-start sm:self-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{isRefreshing ? 'Reconnecting...' : 'Refresh Roster'}</span>
        </button>
      </div>

      {refreshMessage && (
        <div className="p-3 bg-blue-50 border border-blue-200 text-[#046aff] text-xs rounded-lg font-medium animate-in fade-in">
          {refreshMessage}
        </div>
      )}

      {/* Search & Meta Controls Row */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
        {/* Search Input Box with Alert info text */}
        <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2 rounded-[10px] bg-[#fef6ee] border border-[#fbd5c0] text-[13px] text-[#9a3412]">
          <AlertTriangle className="w-4 h-4 text-[#ea580c] shrink-0" />
          <span className="truncate">
            Identity staff references could not be refreshed. Last successful update: 02 Sep 2026, 08:30 WAT.
          </span>
        </div>

        {/* Filter Dropdown 1 */}
        <div className="flex items-center justify-between gap-2 px-3 py-2 bg-white border border-[#ebebeb] rounded-[10px] text-xs font-medium text-[#5c5c5c] shrink-0">
          <span>Owner: Identity &amp; Access</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#808080]" />
        </div>

        {/* Filter Dropdown 2 */}
        <div className="flex items-center justify-between gap-2 px-3 py-2 bg-white border border-[#ebebeb] rounded-[10px] text-xs font-medium text-[#5c5c5c] shrink-0">
          <span>Source status: Delayed</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#808080]" />
        </div>
      </div>

      {/* Content Grid (Table + Profile Info) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left 3 Columns: Results Table */}
        <div className="lg:col-span-3 bg-white border border-[#ebebeb] rounded-[16px] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#f0f0f0] bg-[#fafafa] text-[12px] font-bold text-[#808080] uppercase tracking-wider">
                  <th className="py-3 px-4 font-semibold">Name / Department</th>
                  <th className="py-3 px-4 font-semibold">Current Workload</th>
                  <th className="py-3 px-4 font-semibold">Last verified</th>
                  <th className="py-3 px-4 font-semibold">Source freshness</th>
                  <th className="py-3 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f5f5f5] text-[13px]">
                {staffMembers.map((staff, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/60 transition-colors">
                    {/* Name / Dept */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs shrink-0">
                          {staff.name.split(' ').slice(-1)[0][0]}
                        </div>
                        <div>
                          <div className="font-bold text-[#0b0b0b] leading-tight">
                            {staff.name}
                          </div>
                          <div className="text-[11px] text-[#808080] mt-0.5">
                            {staff.dept}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Workload */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-col gap-1 w-32">
                        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`${staff.trackColor} h-full rounded-full`}
                            style={{ width: staff.trackWidth }}
                          />
                        </div>
                        <span className="text-[11px] font-medium text-[#5c5c5c]">
                          {staff.workload}
                        </span>
                      </div>
                    </td>

                    {/* Last Verified */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${
                          staff.statusVariant === 'warning'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : staff.statusVariant === 'danger'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-gray-100 text-gray-700 border border-gray-200'
                        }`}
                      >
                        {staff.verifiedStatus}
                      </span>
                    </td>

                    {/* Tags */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1.5">
                        {staff.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[11px] font-medium border border-gray-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Action Button */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        className="px-3 py-1 bg-white border border-[#ebebeb] hover:bg-gray-50 text-xs font-medium rounded-lg text-[#1f1f1f] transition-colors cursor-pointer shadow-xs"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Column: Selected Profile Info / Blocking Warning */}
        <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs flex flex-col gap-4">
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-[#fef6ee] border border-[#fbd5c0] text-[#ea580c] flex items-center justify-center mb-3">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <h3 className="text-[16px] font-bold text-[#0b0b0b]">
              Assignments cannot continue
            </h3>
            <p className="text-[12px] text-[#5c5c5c] mt-1.5 leading-relaxed">
              Refresh Identity staff references or contact the source owner.
            </p>
          </div>

          <div className="h-px bg-[#f0f0f0] w-full" />

          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#808080]">
              Affected validation
            </span>
            <ul className="text-[12px] text-[#5c5c5c] flex flex-col gap-2 leading-relaxed">
              <li className="flex items-start gap-1.5">
                <span className="text-[#ea580c] font-bold">•</span>
                <span>Lead instructor activity cannot be confirmed</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#ea580c] font-bold">•</span>
                <span>Workload and assignment overlap checks are paused</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
