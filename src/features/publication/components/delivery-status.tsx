'use client';

import React, { useState } from 'react';
import {
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Clock,
  RefreshCw,
  Search,
  ExternalLink,
} from 'lucide-react';
import { DeliveryEvent } from '../types';

const INITIAL_EVENTS: DeliveryEvent[] = [
  {
    id: 'EVT-8921',
    artifactName: 'Academic Calendar',
    version: 'Version: v4.0',
    consumerModule: 'SIS Integration',
    status: 'delivered',
    sentAt: '12 Jan, 14:35',
    acknowledgedAt: '12 Jan, 14:36',
    correlationId: 'corr-8f2b7ac9-1a21781c',
    idempotencyKey: 'idem-calendar-v4.0-09oct',
    attempts: '1 attempt (Success)',
    acknowledgementHash: 'ack-75926035-NUC-26',
  },
  {
    id: 'EVT-8922',
    artifactName: 'BSc Computer Science',
    version: 'Version: v4.0',
    consumerModule: 'Admissions module',
    status: 'delivered',
    sentAt: '12 Jan, 14:35',
    acknowledgedAt: '12 Jan, 14:38',
    correlationId: 'corr-1a21781c-8f2b7ac9',
    idempotencyKey: 'idem-curriculum-v4.0-csc',
    attempts: '1 attempt (Success)',
    acknowledgementHash: 'ack-8890214-ADM-02',
  },
  {
    id: 'EVT-8923',
    artifactName: 'Academic Calendar',
    version: 'Version: v4.0',
    consumerModule: 'Learning Management',
    status: 'pending',
    sentAt: '12 Jan, 14:35',
    acknowledgedAt: '—',
    correlationId: 'corr-992014-lms-sync',
    idempotencyKey: 'idem-lms-v4.0-feed',
    attempts: 'In Queue (Retry 1/3)',
    acknowledgementHash: 'Awaiting webhook ack',
  },
  {
    id: 'EVT-8924',
    artifactName: 'Timetable Schedule',
    version: 'Version: v3.1',
    consumerModule: 'Examinations module',
    status: 'failed',
    sentAt: '11 Jan, 10:15',
    acknowledgedAt: '—',
    correlationId: 'corr-exam-fail-503',
    idempotencyKey: 'idem-exam-timetable-31',
    attempts: '3 attempts (503 Service Unavailable)',
    acknowledgementHash: 'None (Delivery timed out)',
  },
];

export function DeliveryStatus() {
  const [events, setEvents] = useState<DeliveryEvent[]>(INITIAL_EVENTS);
  const [selectedEventId, setSelectedEventId] = useState<string>('EVT-8921');
  const [searchQuery, setSearchQuery] = useState('');
  const [consumerFilter, setConsumerFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [retryingId, setRetryingId] = useState<string | null>(null);

  const selectedEvent = events.find((e) => e.id === selectedEventId) || events[0];

  const handleRetryEvent = (eventId: string) => {
    setRetryingId(eventId);
    setTimeout(() => {
      setEvents((prev) =>
        prev.map((evt) =>
          evt.id === eventId
            ? {
                ...evt,
                status: 'delivered',
                acknowledgedAt: 'Just now',
                attempts: '4 attempts (Recovered)',
                acknowledgementHash: 'ack-recovered-manual-retry',
              }
            : evt
        )
      );
      setRetryingId(null);
    }, 1200);
  };

  const filteredEvents = events.filter((evt) => {
    const matchesSearch =
      evt.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.artifactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.consumerModule.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesConsumer =
      consumerFilter === 'All' || evt.consumerModule === consumerFilter;
    const matchesStatus =
      statusFilter === 'All' || evt.status === statusFilter.toLowerCase();
    return matchesSearch && matchesConsumer && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* ── KPI Summary Cards Row (4 cards) ────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Events Sent */}
        <div className="bg-white border border-[#ebebeb] rounded-[16px] p-5 shadow-xs flex flex-col justify-between gap-3">
          <span className="text-[12px] font-semibold text-[#808080] uppercase tracking-wider">
            Total Events Sent
          </span>
          <span className="text-[28px] font-bold text-[#0b0b0b] tracking-tight">
            148 Events
          </span>
        </div>

        {/* Card 2: Acknowledged */}
        <div className="bg-white border border-[#ebebeb] rounded-[16px] p-5 shadow-xs flex flex-col justify-between gap-3">
          <span className="text-[12px] font-semibold text-[#808080] uppercase tracking-wider">
            Acknowledged
          </span>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[28px] font-bold text-[#1fc16b] tracking-tight">
              142 Deliveries
            </span>
            <span className="bg-[#e0faec] text-[#1fc16b] text-[11px] font-bold px-2 py-0.5 rounded-full">
              95.9%
            </span>
          </div>
        </div>

        {/* Card 3: Pending */}
        <div className="bg-white border border-[#ebebeb] rounded-[16px] p-5 shadow-xs flex flex-col justify-between gap-3">
          <span className="text-[12px] font-semibold text-[#808080] uppercase tracking-wider">
            Pending
          </span>
          <span className="text-[28px] font-bold text-[#0b0b0b] tracking-tight">
            5 Pending
          </span>
        </div>

        {/* Card 4: Failed Delivery */}
        <div className="bg-white border border-[#ebebeb] rounded-[16px] p-5 shadow-xs flex flex-col justify-between gap-3">
          <span className="text-[12px] font-semibold text-[#808080] uppercase tracking-wider">
            Failed Delivery
          </span>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[28px] font-bold text-[#fb3748] tracking-tight">
              1 Event
            </span>
            <span className="bg-[#fb3748] text-white text-[11px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Requires Action
            </span>
          </div>
        </div>
      </div>

      {/* ── Filters Row ───────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px] max-w-sm">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by event ID or consumer..."
            className="w-full bg-white border border-[#ebebeb] rounded-[8px] px-3.5 py-2 text-[13px] text-[#1f1f1f] placeholder:text-[#808080] focus:outline-none focus:border-[#046aff] shadow-2xs"
          />
        </div>

        <div className="relative">
          <select
            value={consumerFilter}
            onChange={(e) => setConsumerFilter(e.target.value)}
            className="bg-white border border-[#ebebeb] rounded-[8px] px-3.5 py-2 text-[14px] font-medium text-[#5c5c5c] appearance-none cursor-pointer focus:outline-none focus:border-[#046aff] pr-8 shadow-2xs"
          >
            <option value="All">Consumer: All Systems</option>
            <option value="SIS Integration">SIS Integration</option>
            <option value="Admissions module">Admissions module</option>
            <option value="Learning Management">Learning Management</option>
            <option value="Examinations module">Examinations module</option>
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-[#808080]">
            ▼
          </span>
        </div>

        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-[#ebebeb] rounded-[8px] px-3.5 py-2 text-[14px] font-medium text-[#5c5c5c] appearance-none cursor-pointer focus:outline-none focus:border-[#046aff] pr-8 shadow-2xs"
          >
            <option value="All">Status: All</option>
            <option value="Delivered">Delivered</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-[#808080]">
            ▼
          </span>
        </div>
      </div>

      {/* ── Table Wrapper ─────────────────────────────────────────── */}
      <div className="bg-white border border-[#ebebeb] rounded-[16px] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-[#fafafa] border-b border-[#ebebeb] text-[#808080] text-[12px] font-semibold">
                <th className="py-3.5 px-4 font-semibold">Event ID</th>
                <th className="py-3.5 px-4 font-semibold">Artifact / Version</th>
                <th className="py-3.5 px-4 font-semibold">Consumer Module</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold">Sent At</th>
                <th className="py-3.5 px-4 font-semibold">Acknowledged At</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f5f5f5]">
              {filteredEvents.map((evt) => {
                const isSelected = evt.id === selectedEventId;
                return (
                  <tr
                    key={evt.id}
                    onClick={() => setSelectedEventId(evt.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[#f0f8ff]'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className="py-4 px-4 font-semibold text-[#0b0b0b]">
                      {evt.id}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-[#1f1f1f]">
                          {evt.artifactName}
                        </span>
                        <span className="text-[12px] text-[#808080]">
                          {evt.version}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-[#1f1f1f] font-medium">
                      {evt.consumerModule}
                    </td>
                    <td className="py-4 px-4">
                      {evt.status === 'delivered' && (
                        <span className="bg-[#e0faec] text-[#1fc16b] text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                          Delivered
                        </span>
                      )}
                      {evt.status === 'pending' && (
                        <span className="bg-[#fef3ec] text-[#f97316] text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                          Pending
                        </span>
                      )}
                      {evt.status === 'failed' && (
                        <span className="bg-[#fef0f0] text-[#dc2626] text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                          Failed
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-[#5c5c5c]">
                      {evt.sentAt}
                    </td>
                    <td className="py-4 px-4 text-[#5c5c5c]">
                      {evt.acknowledgedAt}
                    </td>
                    <td className="py-4 px-4 text-right">
                      {evt.status === 'failed' && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRetryEvent(evt.id);
                          }}
                          disabled={retryingId === evt.id}
                          className="px-3 py-1 bg-[#335cff] hover:bg-[#254bdb] text-white text-[12px] font-medium rounded-[6px] transition-colors shadow-2xs disabled:opacity-50 cursor-pointer"
                        >
                          {retryingId === evt.id ? 'Retrying...' : 'Retry'}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Event Details Payload Drawer (Bottom Card) ─────────────── */}
      {selectedEvent && (
        <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-xs space-y-4">
          <h3 className="text-[14px] font-bold text-[#0b0b0b]">
            Event Details Payload — {selectedEvent.id}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-[13px] pt-1 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-[#808080]">Correlation ID</span>
              <span className="font-mono font-medium text-[#1f1f1f]">
                {selectedEvent.correlationId}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#808080]">Delivery Attempts</span>
              <span className="font-medium text-[#1f1f1f]">
                {selectedEvent.attempts}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#808080]">Idempotency Key</span>
              <span className="font-mono font-medium text-[#1f1f1f]">
                {selectedEvent.idempotencyKey}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#808080]">Acknowledgement Hash</span>
              <span className="font-mono font-medium text-[#1f1f1f]">
                {selectedEvent.acknowledgementHash}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
