'use client';

import React, { useState } from 'react';
import {
  Package,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Search,
  Plus,
  Filter,
  SlidersHorizontal,
  ChevronRight,
  MoreVertical,
  Edit2,
  Calendar,
  Wrench,
  Laptop,
  Cpu,
  Tv,
  Microscope,
} from 'lucide-react';

export interface ExclusiveResource {
  id: string;
  name: string;
  code: string;
  category: 'Lab Equipment' | 'AV Equipment' | 'Computing' | 'Specialized Rig';
  homeVenue: string;
  status: 'Available' | 'In Use' | 'Under Maintenance';
  currentAssignment?: {
    courseCode: string;
    instructor: string;
    slot: string;
  };
  specs: string;
  serialNumber: string;
}

export function ExclusiveResources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const resources: ExclusiveResource[] = [
    {
      id: 'res-1',
      name: 'Digital Storage Oscilloscope 100MHz (Tektronix)',
      code: 'EQ-OSC-01',
      category: 'Lab Equipment',
      homeVenue: 'Hardware Lab H-201',
      status: 'In Use',
      currentAssignment: {
        courseCode: 'EEE 305',
        instructor: 'Dr. Adeyemi',
        slot: 'Mon 10:00 - 12:00',
      },
      specs: '4 Channels, 1GS/s, Color TFT LCD, USB storage',
      serialNumber: 'TEK-2024-9981',
    },
    {
      id: 'res-2',
      name: '4K High-Lumen Laser Projector Rig',
      code: 'AV-PRJ-08',
      category: 'AV Equipment',
      homeVenue: 'Amphitheater A',
      status: 'Available',
      specs: '8000 Lumens, Wireless HDMI broadcast, motorized lens',
      serialNumber: 'PRJ-4K-0092',
    },
    {
      id: 'res-3',
      name: 'NVIDIA GPU AI Workstation Node 04',
      code: 'CMP-GPU-04',
      category: 'Computing',
      homeVenue: 'Advanced Computing Lab L-304',
      status: 'In Use',
      currentAssignment: {
        courseCode: 'CSC 401',
        instructor: 'Prof. Bello',
        slot: 'Wed 14:00 - 17:00',
      },
      specs: '4x RTX 4090 24GB, 256GB RAM, Dual Xeon 64-core',
      serialNumber: 'SRV-AI-2025-04',
    },
    {
      id: 'res-4',
      name: 'Binocular Metallurgical Microscope',
      code: 'LAB-MIC-12',
      category: 'Lab Equipment',
      homeVenue: 'Materials Lab M-101',
      status: 'Under Maintenance',
      specs: 'Magnification 40x-1000x, Polarizing filter, 12MP cam',
      serialNumber: 'MIC-OLY-8821',
    },
    {
      id: 'res-5',
      name: 'Multi-Camera 4K Live Broadcast Station',
      code: 'AV-BRD-02',
      category: 'AV Equipment',
      homeVenue: 'Studio Lab 102',
      status: 'Available',
      specs: '3x Sony FX3, Blackmagic ATEM Mini Extreme ISO, Shure Mics',
      serialNumber: 'STU-BC-4410',
    },
    {
      id: 'res-6',
      name: 'Spectrum Analyzer 9kHz - 3.6GHz',
      code: 'EQ-SA-03',
      category: 'Lab Equipment',
      homeVenue: 'Telecom Lab T-302',
      status: 'Available',
      specs: 'Tracking generator, EMI filter, preamplifier option',
      serialNumber: 'R&S-SA-7734',
    },
    {
      id: 'res-7',
      name: 'High-Performance VR Headset Suite (8 Units)',
      code: 'CMP-VR-01',
      category: 'Computing',
      homeVenue: 'Graphics Lab G-105',
      status: 'In Use',
      currentAssignment: {
        courseCode: 'CSC 312',
        instructor: 'Dr. Okafor',
        slot: 'Thu 09:00 - 11:00',
      },
      specs: 'Meta Quest Pro & HTC Vive XR Elite, Base stations included',
      serialNumber: 'VR-ST-1002',
    },
    {
      id: 'res-8',
      name: 'Precision Wind Tunnel Test Bed',
      code: 'RIG-WND-01',
      category: 'Specialized Rig',
      homeVenue: 'Aeronautics Facility',
      status: 'Under Maintenance',
      specs: 'Subsonic 0-45 m/s, Pitot-static tube array, digital manometer',
      serialNumber: 'WND-TN-001',
    },
  ];

  const filteredResources = resources.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.homeVenue.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getCategoryIcon = (category: ExclusiveResource['category']) => {
    switch (category) {
      case 'Lab Equipment':
        return <Microscope className="w-4 h-4 text-purple-600" />;
      case 'AV Equipment':
        return <Tv className="w-4 h-4 text-blue-600" />;
      case 'Computing':
        return <Laptop className="w-4 h-4 text-[#21bf2b]" />;
      case 'Specialized Rig':
        return <Cpu className="w-4 h-4 text-amber-600" />;
    }
  };

  const getStatusBadge = (status: ExclusiveResource['status']) => {
    switch (status) {
      case 'Available':
        // Figma: semantic/success/50 bg + semantic/success/600 text
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[6px] text-[11px] font-semibold bg-[#f5fff6] text-[#21bf2b]">
            Available
          </span>
        );
      case 'In Use':
        // Figma: state/information/lighter bg + state/information/base text
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[6px] text-[11px] font-semibold bg-[#ebf1ff] text-[#335cff]">
            In Use
          </span>
        );
      case 'Under Maintenance':
        // Figma: accent/orange/100 bg + accent/orange/500 text
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[6px] text-[11px] font-semibold bg-[#fef3ec] text-[#f97316]">
            Under Maintenance
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* 4 Stat KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Resources</div>
            <div className="text-2xl font-black text-gray-900 mt-1">48</div>
            <div className="text-xs text-gray-500 mt-0.5">Tracked equipment items</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#ebf1ff] border border-[#d2e0ff] flex items-center justify-center text-[#046aff]">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Available Now</div>
            <div className="text-2xl font-black text-[#21bf2b] mt-1">32</div>
            <div className="text-xs text-[#21bf2b] font-medium mt-0.5">Ready for scheduling</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#f5fff6] border border-[#b8f5be] flex items-center justify-center text-[#21bf2b]">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Currently In Use</div>
            <div className="text-2xl font-black text-blue-600 mt-1">12</div>
            <div className="text-xs text-blue-700 font-medium mt-0.5">Assigned to live sessions</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Under Maintenance</div>
            <div className="text-2xl font-black text-amber-600 mt-1">4</div>
            <div className="text-xs text-amber-700 font-medium mt-0.5">Service required</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
            <Wrench className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter & Action Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search resource name, asset code, venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#046aff]/30 focus:border-[#046aff]"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Type:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#046aff]/30"
            >
              <option value="All">All Categories</option>
              <option value="Lab Equipment">Lab Equipment</option>
              <option value="AV Equipment">AV Equipment</option>
              <option value="Computing">Computing</option>
              <option value="Specialized Rig">Specialized Rig</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#046aff]/30"
            >
              <option value="All">All Statuses</option>
              <option value="Available">Available</option>
              <option value="In Use">In Use</option>
              <option value="Under Maintenance">Under Maintenance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Equipment Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Resource & Code</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Home Venue</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Current Allocation</th>
                <th className="py-3.5 px-4">Specs & Serial</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
              {filteredResources.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/60 transition-colors group">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-gray-900 group-hover:text-[#046aff] transition-colors">
                      {item.name}
                    </div>
                    <div className="text-[11px] font-mono text-gray-400 mt-0.5">{item.code}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-xs font-semibold">
                      {getCategoryIcon(item.category)}
                      {item.category}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-gray-600 font-medium">{item.homeVenue}</td>

                  <td className="py-3.5 px-4">{getStatusBadge(item.status)}</td>

                  <td className="py-3.5 px-4">
                    {item.currentAssignment ? (
                      <div className="space-y-0.5">
                        <div className="font-bold text-[#046aff] text-xs">
                          {item.currentAssignment.courseCode}
                        </div>
                        <div className="text-[11px] text-gray-500">
                          {item.currentAssignment.instructor} • {item.currentAssignment.slot}
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-xs italic">None (Unassigned)</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 max-w-[220px]">
                    <div className="text-xs text-gray-600 truncate" title={item.specs}>
                      {item.specs}
                    </div>
                    <div className="text-[11px] font-mono text-gray-400 mt-0.5">S/N: {item.serialNumber}</div>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      {item.status === 'Available' && (
                        <button
                          type="button"
                          className="px-2.5 py-1 bg-[#f0f8ff] hover:bg-[#046aff] text-[#046aff] hover:text-white rounded text-xs font-semibold transition-all"
                        >
                          Reserve
                        </button>
                      )}
                      <button
                        type="button"
                        className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                        title="Edit Resource"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
