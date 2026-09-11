'use client';

import React, { useState } from 'react';
import {
  Video,
  Plus,
  Search,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Edit2,
  Power,
  Copy,
  Users,
  Clock,
  Key,
  Shield,
  Layers,
} from 'lucide-react';

export interface VirtualRoom {
  id: string;
  name: string;
  platform: 'Zoom' | 'Teams' | 'Google Meet';
  capacity: number;
  status: 'Active' | 'Inactive';
  link: string;
  hostKeyRequired: boolean;
  maxSessionHours?: number;
  licenseTier?: string;
  constraints: string[];
}

export function VirtualRooms() {
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const rooms: VirtualRoom[] = [
    {
      id: 'vr-1',
      name: 'Zoom Main Hall Alpha',
      platform: 'Zoom',
      capacity: 300,
      status: 'Active',
      link: 'https://zoom.us/j/98472910384',
      hostKeyRequired: true,
      maxSessionHours: 3,
      constraints: ['Max 3hr sessions', 'Requires host key', 'Cloud recording enabled'],
    },
    {
      id: 'vr-2',
      name: 'MS Teams Amphitheater',
      platform: 'Teams',
      capacity: 500,
      status: 'Active',
      link: 'https://teams.microsoft.com/l/meetup-join/19...',
      hostKeyRequired: false,
      licenseTier: 'Enterprise E5',
      constraints: ['Pro license tier required', 'Co-host required', 'Auto-transcription'],
    },
    {
      id: 'vr-3',
      name: 'Google Meet Lecture Room 1',
      platform: 'Google Meet',
      capacity: 100,
      status: 'Active',
      link: 'https://meet.google.com/abc-defg-hij',
      hostKeyRequired: false,
      constraints: ['No recurring limit', 'Live streaming to campus network'],
    },
    {
      id: 'vr-4',
      name: 'Zoom Seminar Beta',
      platform: 'Zoom',
      capacity: 150,
      status: 'Inactive',
      link: 'https://zoom.us/j/47281930219',
      hostKeyRequired: true,
      maxSessionHours: 2,
      constraints: ['Requires key renewal', 'Breakout rooms limit: 10'],
    },
    {
      id: 'vr-5',
      name: 'MS Teams Lab Synchronous',
      platform: 'Teams',
      capacity: 300,
      status: 'Active',
      link: 'https://teams.microsoft.com/l/meetup-join/lab202',
      hostKeyRequired: false,
      licenseTier: 'Enterprise E5',
      constraints: ['Co-host required', 'Whiteboard integration active'],
    },
    {
      id: 'vr-6',
      name: 'Google Meet Grand Colloquium',
      platform: 'Google Meet',
      capacity: 1000,
      status: 'Active',
      link: 'https://meet.google.com/colloquium-2026',
      hostKeyRequired: false,
      constraints: ['Max 3hr sessions', 'Requires domain admin signoff', 'Overflow broadcast'],
    },
  ];

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.platform.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = platformFilter === 'All' || room.platform === platformFilter;
    const matchesStatus = statusFilter === 'All' || room.status === statusFilter;
    return matchesSearch && matchesPlatform && matchesStatus;
  });

  const handleCopyLink = (id: string, link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getPlatformBadge = (platform: VirtualRoom['platform']) => {
    switch (platform) {
      case 'Zoom':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#2D8CFF]/10 text-[#2D8CFF] border border-[#2D8CFF]/20">
            <Video className="w-3 h-3" /> Zoom
          </span>
        );
      case 'Teams':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#5B5FC7]/10 text-[#5B5FC7] border border-[#5B5FC7]/20">
            <Layers className="w-3 h-3" /> MS Teams
          </span>
        );
      case 'Google Meet':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#00AC47]/10 text-[#00AC47] border border-[#00AC47]/20">
            <Video className="w-3 h-3" /> Google Meet
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls & Filter Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search virtual rooms, IDs, platforms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#046aff]/30 focus:border-[#046aff]"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Platform:</span>
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#046aff]/30"
            >
              <option value="All">All Platforms</option>
              <option value="Zoom">Zoom</option>
              <option value="Teams">MS Teams</option>
              <option value="Google Meet">Google Meet</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#046aff]/30"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Virtual Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
          >
            {/* Header */}
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-gray-900 text-base leading-tight group-hover:text-[#046aff] transition-colors">
                  {room.name}
                </h3>
                {getPlatformBadge(room.platform)}
              </div>

              <div className="flex items-center gap-3 text-xs text-gray-600 mt-2">
                <span className="inline-flex items-center gap-1 font-medium bg-gray-100 px-2 py-0.5 rounded">
                  <Users className="w-3.5 h-3.5 text-gray-500" />
                  Cap: {room.capacity}
                </span>
                <span
                  className={`inline-flex items-center gap-1 font-medium px-2 py-0.5 rounded-[6px] text-[11px] ${
                    room.status === 'Active'
                      ? 'bg-[#f5fff6] text-[#21bf2b]'
                      : 'bg-[#fef0f0] text-[#bf1f1f]'
                  }`}
                >
                  {room.status}
                </span>
              </div>
            </div>

            {/* Constraints & Meta */}
            <div className="p-5 space-y-3 flex-1 bg-gray-50/50">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Operating Constraints & Rules
              </div>
              <ul className="space-y-1.5">
                {room.constraints.map((constraint, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#046aff] mt-1.5 shrink-0" />
                    <span>{constraint}</span>
                  </li>
                ))}
              </ul>

              {/* Join Link Preview */}
              <div className="mt-4 pt-3 border-t border-gray-200/60">
                <div className="text-[11px] font-medium text-gray-500 mb-1">Access URL:</div>
                <div className="flex items-center justify-between gap-2 bg-white px-2.5 py-1.5 rounded-md border border-gray-200 text-xs font-mono text-gray-600 truncate">
                  <span className="truncate">{room.link}</span>
                  <button
                    onClick={() => handleCopyLink(room.id, room.link)}
                    title="Copy Link"
                    className="shrink-0 p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {copiedId === room.id ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#21bf2b]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="p-3.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs font-semibold">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-gray-700 hover:text-[#046aff] hover:bg-white rounded-md border border-transparent hover:border-gray-200 transition-all"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit Config
              </button>
              <button
                type="button"
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                  room.status === 'Active'
                    ? 'text-rose-700 hover:bg-rose-50 border border-transparent hover:border-rose-200'
                    : 'text-[#21bf2b] hover:bg-[#f5fff6] border border-transparent hover:border-[#b8f5be]'
                }`}
              >
                <Power className="w-3.5 h-3.5" />
                {room.status === 'Active' ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
