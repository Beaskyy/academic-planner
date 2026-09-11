'use client';

import React, { useState } from 'react';
import {
  Users,
  Presentation,
  Wifi,
  Filter,
  Plus,
} from 'lucide-react';

export interface PhysicalVenue {
  id: string;
  name: string;
  building: string;
  capacity: number;
  status: 'Available' | 'Booked' | 'Under Maintenance';
  features: {
    projector?: boolean;
    wifi?: boolean;
    smartBoard?: boolean;
  };
}

export function PhysicalVenues() {
  const [selectedBuilding, setSelectedBuilding] = useState('All');
  const [selectedCapacity, setSelectedCapacity] = useState('All');
  const [filterProjector, setFilterProjector] = useState(false);
  const [filterSmartBoard, setFilterSmartBoard] = useState(false);

  const venues: PhysicalVenue[] = [
    {
      id: 'v-1',
      name: 'Lecture Hall G-201',
      building: 'Main Science Block',
      capacity: 120,
      status: 'Available',
      features: { projector: true, wifi: true },
    },
    {
      id: 'v-2',
      name: 'Seminar Room S-102',
      building: 'Arts & Humanities',
      capacity: 45,
      status: 'Booked',
      features: { projector: true, wifi: true },
    },
    {
      id: 'v-3',
      name: 'Computing Lab L-304',
      building: 'Engineering Wing',
      capacity: 60,
      status: 'Available',
      features: { projector: true, wifi: true, smartBoard: true },
    },
    {
      id: 'v-4',
      name: 'Lecture Theater G-101',
      building: 'Main Science Block',
      capacity: 250,
      status: 'Available',
      features: { projector: true, wifi: true },
    },
    {
      id: 'v-5',
      name: 'Executive Boardroom',
      building: 'Administrative Senate',
      capacity: 25,
      status: 'Booked',
      features: { wifi: true, smartBoard: true },
    },
    {
      id: 'v-6',
      name: 'Tutorial Room T-22',
      building: 'Arts & Humanities',
      capacity: 30,
      status: 'Available',
      features: { wifi: true },
    },
  ];

  const filteredVenues = venues.filter((v) => {
    const matchesBuilding =
      selectedBuilding === 'All' || v.building === selectedBuilding;
    const matchesCap =
      selectedCapacity === 'All' ||
      (selectedCapacity === '20-50' && v.capacity <= 50) ||
      (selectedCapacity === '51-150' && v.capacity > 50 && v.capacity <= 150) ||
      (selectedCapacity === '150+' && v.capacity > 150);
    const matchesProj = !filterProjector || v.features.projector;
    const matchesSb = !filterSmartBoard || v.features.smartBoard;
    return matchesBuilding && matchesCap && matchesProj && matchesSb;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Filter Bar */}
      <div className="bg-white border border-[#ebebeb] rounded-[14px] p-4 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div className="flex flex-wrap items-center gap-3.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#808080] uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5" />
            <span>Filters:</span>
          </div>

          <div className="relative min-w-[190px]">
            <select
              value={selectedBuilding}
              onChange={(e) => setSelectedBuilding(e.target.value)}
              className="w-full bg-[#fafafa] border border-[#d9d9d9] rounded-[10px] px-3 py-1.5 text-[13px] font-medium text-[#1f1f1f] appearance-none cursor-pointer focus:outline-none focus:border-[#046aff]"
            >
              <option value="All">Building: All Buildings</option>
              <option value="Main Science Block">Main Science Block</option>
              <option value="Engineering Wing">Engineering Wing</option>
              <option value="Arts & Humanities">Arts &amp; Humanities</option>
              <option value="Administrative Senate">Administrative Senate</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#808080]">
              ▾
            </div>
          </div>

          <div className="relative min-w-[170px]">
            <select
              value={selectedCapacity}
              onChange={(e) => setSelectedCapacity(e.target.value)}
              className="w-full bg-[#fafafa] border border-[#d9d9d9] rounded-[10px] px-3 py-1.5 text-[13px] font-medium text-[#1f1f1f] appearance-none cursor-pointer focus:outline-none focus:border-[#046aff]"
            >
              <option value="All">Capacity: Any</option>
              <option value="20-50">20 - 50 Seats</option>
              <option value="51-150">51 - 150 Seats</option>
              <option value="150+">150+ Seats</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#808080]">
              ▾
            </div>
          </div>

          <div className="flex items-center gap-3 pl-2 border-l border-[#f0f0f0]">
            <label className="flex items-center gap-1.5 text-xs font-medium text-[#1f1f1f] cursor-pointer">
              <input
                type="checkbox"
                checked={filterProjector}
                onChange={(e) => setFilterProjector(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-[#046aff] border-[#d9d9d9] focus:ring-0"
              />
              <span>Projector</span>
            </label>

            <label className="flex items-center gap-1.5 text-xs font-medium text-[#1f1f1f] cursor-pointer">
              <input
                type="checkbox"
                checked={filterSmartBoard}
                onChange={(e) => setFilterSmartBoard(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-[#046aff] border-[#d9d9d9] focus:ring-0"
              />
              <span>Smart Board</span>
            </label>
          </div>
        </div>
      </div>

      {/* Venue Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredVenues.map((venue) => {
          const isAvailable = venue.status === 'Available';
          const isBooked = venue.status === 'Booked';

          return (
            <div
              key={venue.id}
              className="bg-white border border-[#ebebeb] rounded-[16px] p-5 shadow-xs flex flex-col justify-between hover:border-[#d2e4ff] transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-[#f5f5f5]">
                  <div>
                    <h4 className="text-[15px] font-bold text-[#1f1f1f]">
                      {venue.name}
                    </h4>
                    <span className="text-xs text-[#808080] font-medium">
                      {venue.building}
                    </span>
                  </div>
                  {/* Status badge — Figma tokens: semantic/success/50 + semantic/success/500 for Available, semantic/error/100 + semantic/error/500 for Booked */}
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-[6px] text-[11px] font-semibold ${
                      isAvailable
                        ? 'bg-[#f5fff6] text-[#21bf2b]'
                        : isBooked
                        ? 'bg-[#fef0f0] text-[#bf1f1f]'
                        : 'bg-[#fff8ec] text-[#f97316]'
                    }`}
                  >
                    {venue.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 text-xs text-[#5c5c5c]">
                <div className="flex items-center gap-1.5 font-semibold text-[#1f1f1f]">
                  <Users className="w-4 h-4 text-[#808080]" />
                  <span>Cap: {venue.capacity}</span>
                </div>

                <div className="flex items-center gap-2">
                  {venue.features.projector && (
                    <span title="Projector Installed" className="p-1 rounded-md bg-[#fafafa] text-[#5c5c5c]">
                      <Presentation className="w-3.5 h-3.5" />
                    </span>
                  )}
                  {venue.features.wifi && (
                    <span title="Wi-Fi Available" className="p-1 rounded-md bg-[#fafafa] text-[#5c5c5c]">
                      <Wifi className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
