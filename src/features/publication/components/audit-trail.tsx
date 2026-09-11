'use client';

import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Download,
  Search,
  BookOpen,
  Calendar,
  Layers,
  GraduationCap,
  Shield,
  CheckCircle2,
} from 'lucide-react';
import { AuditEvent } from '../types';

const AUDIT_EVENTS: AuditEvent[] = [
  {
    id: 'audit-1',
    timestamp: '12 Jan 2026, 14:32',
    action: 'PUBLISHED',
    artifactType: 'Academic Structures',
    version: 'v4.2',
    actor: {
      name: 'Dr. Marcus',
      role: 'VP Academic',
    },
    changeSummary: 'Published finalized syllabus and prerequisite tree for Semester 1',
    effectiveTime: 'Immediate',
    reference: 'STRUCT-902-A',
    diff: {
      before: "status: 'Draft', revision: 41, completePercent: 98",
      after: "status: 'Published', revision: 42, activeSemesters: [1, 2]",
      dependencySnapshots: 'Prerequisite Schema v2.1 • Faculty Directory v1.0',
      approvalTrail: 'Dr. Marcus (Initiated) → VP Academic Approval [12 Jan, 14:05]',
      eventCorrelationIds: 'evt_pub_89201a • corr_seq_9901-b2',
    },
  },
  {
    id: 'audit-2',
    timestamp: '12 Jan 2026, 10:15',
    action: 'RETURNED',
    artifactType: 'Academic Calendar',
    version: 'v3.0-D',
    actor: {
      name: 'Dean Alabi',
      role: 'Dean of Faculty',
    },
    changeSummary: 'Returned for adjustment of regional holiday overlap during Reading Week',
    effectiveTime: 'N/A',
    reference: 'CAL-2026-R3',
    diff: {
      before: "readingWeekOverlap: true, holidayConflict: 'Eid al-Mawlid'",
      after: "status: 'ReturnedToMaker', requestedAdjustment: '+3 days slide'",
      dependencySnapshots: 'Holiday Calendar v2026.1 • Academic Calendar 2026/27',
      approvalTrail: 'Dean Alabi (Reviewer) → Return Notice Dispatched [12 Jan, 10:15]',
      eventCorrelationIds: 'evt_ret_449012 • corr_seq_9882-a1',
    },
  },
  {
    id: 'audit-3',
    timestamp: '11 Jan 2026, 18:40',
    action: 'APPROVED',
    artifactType: 'Course Catalogue',
    version: 'v7.1',
    actor: {
      name: 'Dr. Marcus',
      role: 'VP Academic',
    },
    changeSummary: 'Approved PHY 102 laboratory equipment calibration slot overrides',
    effectiveTime: '09 Oct 2026',
    reference: 'CAT-PHY-102',
    diff: {
      before: "venueAssignment: 'Physics Lab 3', machineAlignmentState: 'Pending'",
      after: "venueAssignment: 'Main Science Hall B', machineAlignmentState: 'Overridden'",
      dependencySnapshots: 'Lab Equipment Inventory v4 • Faculty Staffing v2.2',
      approvalTrail: 'Prof. Cole (Maker) → Dr. Marcus (Approved) [11 Jan, 18:40]',
      eventCorrelationIds: 'evt_app_772091 • corr_seq_9845-c4',
    },
  },
  {
    id: 'audit-4',
    timestamp: '10 Jan 2026, 09:00',
    action: 'CREATED',
    artifactType: 'Offerings',
    version: 'v1.0-D',
    actor: {
      name: 'Laura Hills',
      role: 'Curriculum Coordinator',
    },
    changeSummary: 'Created initial course offerings batch for Semester 1 CSC cohorts',
    effectiveTime: '09 Oct 2026',
    reference: 'OFFER-BATCH-1',
    diff: {
      before: 'status: null, offeringsCount: 0',
      after: "status: 'DraftCreated', offeringsCount: 14, primaryTrack: 'BSc Computer Science'",
      dependencySnapshots: 'Course Catalogue v7.0 • Academic Structures v4.1',
      approvalTrail: 'Laura Hills (Created) [10 Jan, 09:00]',
      eventCorrelationIds: 'evt_crt_110294 • corr_seq_9781-b0',
    },
  },
];

export function AuditTrail() {
  const [expandedId, setExpandedId] = useState<string | null>('audit-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [artifactFilter, setArtifactFilter] = useState('All');
  const [actionFilter, setActionFilter] = useState('All');
  const [dateRangeFilter, setDateRangeFilter] = useState('Last 14 Days');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const toggleRow = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleExportCSV = () => {
    const headers = ['Timestamp', 'Action', 'Artifact Type', 'Version', 'Actor', 'Effective Time', 'Reference'];
    const rows = AUDIT_EVENTS.map((e) => [
      e.timestamp,
      e.action,
      e.artifactType,
      e.version,
      e.actor.name,
      e.effectiveTime,
      e.reference,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'audit_trail_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const filteredEvents = AUDIT_EVENTS.filter((e) => {
    const matchesSearch =
      e.actor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.artifactType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesArtifact =
      artifactFilter === 'All' || e.artifactType === artifactFilter;
    const matchesAction =
      actionFilter === 'All' || e.action === actionFilter;
    return matchesSearch && matchesArtifact && matchesAction;
  });

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* ── Page Header ───────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-[13px] font-medium text-[#808080]">
            System Admin &gt; Audit Log
          </span>
          <h1 className="text-[28px] font-bold text-[#0b0b0b] tracking-tight leading-tight">
            Audit Trail &amp; Logs
          </h1>
        </div>

        <button
          type="button"
          onClick={handleExportCSV}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-gray-50 text-[#1f1f1f] text-[14px] font-medium rounded-[10px] border border-[#ebebeb] shadow-2xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <span>{downloadSuccess ? 'Exported CSV!' : 'Export Trail CSV'}</span>
          <ChevronRight className="w-4 h-4 text-[#808080]" />
        </button>
      </div>

      {/* ── Filter Bar ────────────────────────────────────────────── */}
      <div className="bg-white border border-[#ebebeb] rounded-[14px] p-4 flex flex-wrap items-center gap-3 shadow-2xs">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Actor name..."
            className="w-full bg-[#fafafa] border border-[#d9d9d9] rounded-[8px] px-3 py-1.5 text-[13px] text-[#1f1f1f] placeholder:text-[#808080] focus:outline-none focus:border-[#046aff]"
          />
        </div>

        {/* Dropdown 1: Artifact Type */}
        <div className="relative">
          <select
            value={artifactFilter}
            onChange={(e) => setArtifactFilter(e.target.value)}
            className="bg-[#fafafa] border border-[#d9d9d9] rounded-[8px] px-3 py-1.5 text-[13px] font-medium text-[#1f1f1f] appearance-none cursor-pointer focus:outline-none focus:border-[#046aff] pr-7"
          >
            <option value="All">Artifact Type: All</option>
            <option value="Academic Structures">Academic Structures</option>
            <option value="Academic Calendar">Academic Calendar</option>
            <option value="Course Catalogue">Course Catalogue</option>
            <option value="Offerings">Offerings</option>
          </select>
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-[#808080]">
            ▼
          </span>
        </div>

        {/* Dropdown 2: Action Multi-select */}
        <div className="relative">
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="bg-[#fafafa] border border-[#d9d9d9] rounded-[8px] px-3 py-1.5 text-[13px] font-medium text-[#1f1f1f] appearance-none cursor-pointer focus:outline-none focus:border-[#046aff] pr-7"
          >
            <option value="All">Action: Multi-select</option>
            <option value="PUBLISHED">Action: Published</option>
            <option value="APPROVED">Action: Approved</option>
            <option value="RETURNED">Action: Returned</option>
            <option value="CREATED">Action: Created</option>
          </select>
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-[#808080]">
            ▼
          </span>
        </div>

        {/* Dropdown 3: Date Range */}
        <div className="relative">
          <select
            value={dateRangeFilter}
            onChange={(e) => setDateRangeFilter(e.target.value)}
            className="bg-[#fafafa] border border-[#d9d9d9] rounded-[8px] px-3 py-1.5 text-[13px] font-medium text-[#1f1f1f] appearance-none cursor-pointer focus:outline-none focus:border-[#046aff] pr-7"
          >
            <option value="Last 14 Days">Date Range: Last 14 Days</option>
            <option value="Last 30 Days">Date Range: Last 30 Days</option>
            <option value="All Time">Date Range: All Time</option>
          </select>
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-[#808080]">
            ▼
          </span>
        </div>
      </div>

      {/* ── Table Wrapper ─────────────────────────────────────────── */}
      <div className="bg-white border border-[#ebebeb] rounded-[16px] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-[#fafafa] border-b border-[#ebebeb] text-[#808080] text-[12px] font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">Action</th>
                <th className="py-3.5 px-4">Artifact Type</th>
                <th className="py-3.5 px-4">Version</th>
                <th className="py-3.5 px-4">Actor</th>
                <th className="py-3.5 px-4">Change Summary</th>
                <th className="py-3.5 px-4">Effective Time</th>
                <th className="py-3.5 px-4">Reference</th>
                <th className="py-3.5 px-4 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f5f5f5]">
              {filteredEvents.map((evt) => {
                const isExpanded = expandedId === evt.id;

                return (
                  <React.Fragment key={evt.id}>
                    <tr
                      onClick={() => toggleRow(evt.id)}
                      className={`cursor-pointer transition-colors ${
                        isExpanded ? 'bg-[#fafafa]' : 'hover:bg-gray-50'
                      }`}
                    >
                      <td className="py-4 px-4 font-medium text-[#5c5c5c] whitespace-nowrap">
                        {evt.timestamp}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        {evt.action === 'PUBLISHED' && (
                          <span className="bg-[#e0faec] text-[#1fc16b] text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                            Published
                          </span>
                        )}
                        {evt.action === 'APPROVED' && (
                          <span className="bg-[#ebf1ff] text-[#335cff] text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                            Approved
                          </span>
                        )}
                        {evt.action === 'RETURNED' && (
                          <span className="bg-[#fef0f0] text-[#dc2626] text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                            Returned
                          </span>
                        )}
                        {evt.action === 'CREATED' && (
                          <span className="bg-[#f4ebff] text-[#7f56d9] text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                            Created
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 font-semibold text-[#1f1f1f]">
                          <BookOpen className="w-4 h-4 text-[#808080]" />
                          <span>{evt.artifactType}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-mono text-[12px] text-[#5c5c5c] whitespace-nowrap">
                        {evt.version}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#335cff]/10 text-[#335cff] font-bold text-[11px] flex items-center justify-center shrink-0">
                            {evt.actor.name.charAt(0)}
                          </div>
                          <span className="font-medium text-[#1f1f1f]">{evt.actor.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-[#5c5c5c] max-w-[200px] truncate" title={evt.changeSummary}>
                        ... {evt.changeSummary.slice(0, 30)}
                      </td>
                      <td className="py-4 px-4 text-[#5c5c5c] whitespace-nowrap">
                        {evt.effectiveTime}
                      </td>
                      <td className="py-4 px-4 font-mono text-[12px] font-medium text-[#046aff] whitespace-nowrap">
                        {evt.reference}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-[#046aff] inline-block" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#808080] inline-block" />
                        )}
                      </td>
                    </tr>

                    {/* Expanded Diff & Snapshots Panel */}
                    {isExpanded && evt.diff && (
                      <tr>
                        <td colSpan={9} className="p-0 bg-[#fafafa]">
                          <div className="p-6 border-t border-b border-[#ebebeb] space-y-5">
                            {/* Before & After Changes */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <span className="block text-[12px] font-semibold text-[#808080] uppercase tracking-wider">
                                  Before Changes
                                </span>
                                <div className="bg-white border border-[#ebebeb] rounded-[8px] p-3 text-[13px] font-mono text-[#1f1f1f] shadow-2xs">
                                  {evt.diff.before}
                                </div>
                              </div>

                              <div className="space-y-1.5">
                                <span className="block text-[12px] font-semibold text-[#046aff] uppercase tracking-wider">
                                  After Changes
                                </span>
                                <div className="bg-white border border-[#d2e4ff] rounded-[8px] p-3 text-[13px] font-mono text-[#046aff] shadow-2xs">
                                  {evt.diff.after}
                                </div>
                              </div>
                            </div>

                            {/* Additional Metadata Details */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-gray-200/60 text-[12px]">
                              <div>
                                <span className="block font-semibold text-[#808080] uppercase tracking-wider mb-1">
                                  Dependency Snapshots
                                </span>
                                <p className="text-[#1f1f1f] font-medium">
                                  {evt.diff.dependencySnapshots}
                                </p>
                              </div>

                              <div>
                                <span className="block font-semibold text-[#808080] uppercase tracking-wider mb-1">
                                  Approval Trail
                                </span>
                                <p className="text-[#1f1f1f] font-medium">
                                  {evt.diff.approvalTrail}
                                </p>
                              </div>

                              <div>
                                <span className="block font-semibold text-[#808080] uppercase tracking-wider mb-1">
                                  Event &amp; Correlation IDs
                                </span>
                                <p className="text-[#5c5c5c] font-mono">
                                  {evt.diff.eventCorrelationIds}
                                </p>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="px-6 py-4 border-t border-[#ebebeb] flex items-center justify-between text-[13px] text-[#808080]">
          <span>Showing 1 to {filteredEvents.length} of 384 events</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled
              className="px-3 py-1.5 rounded-[8px] border border-[#ebebeb] text-[#808080] bg-[#fafafa] cursor-not-allowed text-xs font-medium"
            >
              Previous
            </button>
            <button
              type="button"
              className="px-3 py-1.5 rounded-[8px] border border-[#ebebeb] text-[#1f1f1f] hover:bg-gray-50 text-xs font-medium cursor-pointer transition-colors shadow-2xs"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
