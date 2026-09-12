'use client';

import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, ChevronDown, Check } from 'lucide-react';

export interface VirtualRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
}

export function VirtualRoomModal({ isOpen, onClose, onSave }: VirtualRoomModalProps) {
  const [roomName, setRoomName] = useState('');
  const [providerRef, setProviderRef] = useState('');
  const [regionTenant, setRegionTenant] = useState('ODEL-Lagos');
  const [capacity, setCapacity] = useState('250');
  const [roomType, setRoomType] = useState('Live teaching room');
  const [effectiveFrom, setEffectiveFrom] = useState('');
  const [effectiveTo, setEffectiveTo] = useState('No expiry');
  const [providerStatus, setProviderStatus] = useState<'Active' | 'Under Maintenance' | 'Decommissioned'>('Active');

  const [capabilities, setCapabilities] = useState({
    authenticatedAccess: true,
    recordingPermitted: true,
    screenSharing: false,
    waitingRoomRequired: true,
    liveCaptions: true,
    hostRequired: true,
    breakoutRooms: false,
    noSecretsStored: true,
  });

  const toggleCapability = (key: keyof typeof capabilities) => {
    setCapabilities((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleReset = () => {
    setRoomName('');
    setProviderRef('');
    setRegionTenant('ODEL-Lagos');
    setCapacity('250');
    setRoomType('Live teaching room');
    setEffectiveFrom('');
    setEffectiveTo('No expiry');
    setProviderStatus('Active');
    setCapabilities({
      authenticatedAccess: true,
      recordingPermitted: true,
      screenSharing: false,
      waitingRoomRequired: true,
      liveCaptions: true,
      hostRequired: true,
      breakoutRooms: false,
      noSecretsStored: true,
    });
  };

  const handleSave = () => {
    onSave?.({
      roomName,
      providerRef,
      regionTenant,
      capacity,
      roomType,
      capabilities,
      effectiveFrom,
      effectiveTo,
      providerStatus,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-[2px] animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-[560px] bg-white rounded-[16px] shadow-[0px_20px_40px_rgba(0,0,0,0.12)] border border-[#ebebeb] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="virtual-room-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#f0f0f0]">
          <h2 id="virtual-room-title" className="text-[20px] font-bold text-[#0b0b0b] tracking-tight">
            Add Approved Virtual Room
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#808080] hover:text-[#0b0b0b] hover:bg-[#f5f5f5] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <div className="p-6 flex flex-col gap-5 overflow-y-auto max-h-[calc(85vh-130px)]">
          {/* Row 1: Name & Provider */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-[#0b0b0b]">
                Virtual Room Name
              </label>
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="e.g. CSC Seminar Room"
                className="px-3 py-2 text-[13px] bg-white border border-[#ebebeb] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#046aff]/20 focus:border-[#046aff]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-[#0b0b0b]">
                Provider Reference
              </label>
              <div className="relative">
                <select
                  value={providerRef}
                  onChange={(e) => setProviderRef(e.target.value)}
                  className="w-full appearance-none px-3 py-2 text-[13px] bg-white border border-[#ebebeb] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#046aff]/20 focus:border-[#046aff] pr-8 cursor-pointer"
                >
                  <option value="">Select approved provider reference...</option>
                  <option value="zoom-ent-01">Zoom Enterprise — License Hall A</option>
                  <option value="teams-edu-02">MS Teams Education — Room 102</option>
                  <option value="meet-campus-03">Google Meet Campus — Stream 01</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#808080] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 2: Region, Capacity, Room Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-[#0b0b0b]">
                Region / Tenant
              </label>
              <input
                type="text"
                value={regionTenant}
                onChange={(e) => setRegionTenant(e.target.value)}
                placeholder="e.g. ODEL-Lagos"
                className="px-3 py-2 text-[13px] bg-white border border-[#ebebeb] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#046aff]/20 focus:border-[#046aff]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-[#0b0b0b]">
                Participant Capacity
              </label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="e.g. 250"
                className="px-3 py-2 text-[13px] bg-white border border-[#ebebeb] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#046aff]/20 focus:border-[#046aff]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-[#0b0b0b]">
                Room Type
              </label>
              <div className="relative">
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full appearance-none px-3 py-2 text-[13px] bg-white border border-[#ebebeb] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#046aff]/20 focus:border-[#046aff] pr-8 cursor-pointer"
                >
                  <option value="Live teaching room">Live teaching room</option>
                  <option value="Seminar / Webinar room">Seminar / Webinar room</option>
                  <option value="Virtual lab room">Virtual lab room</option>
                  <option value="Office hours breakout">Office hours breakout</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#808080] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 3: Approved Constraints & Capabilities */}
          <div className="flex flex-col gap-2 pt-1">
            <label className="text-[12px] font-semibold text-[#0b0b0b]">
              Approved Constraints &amp; Capabilities
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4 p-3.5 bg-[#fafafa] border border-[#ebebeb] rounded-[10px]">
              <label className="flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#1f1f1f]">
                <input
                  type="checkbox"
                  checked={capabilities.authenticatedAccess}
                  onChange={() => toggleCapability('authenticatedAccess')}
                  className="w-4 h-4 rounded text-[#335cff] focus:ring-[#335cff] cursor-pointer"
                />
                <span>Authenticated access</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#1f1f1f]">
                <input
                  type="checkbox"
                  checked={capabilities.recordingPermitted}
                  onChange={() => toggleCapability('recordingPermitted')}
                  className="w-4 h-4 rounded text-[#335cff] focus:ring-[#335cff] cursor-pointer"
                />
                <span>Recording permitted</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#1f1f1f]">
                <input
                  type="checkbox"
                  checked={capabilities.screenSharing}
                  onChange={() => toggleCapability('screenSharing')}
                  className="w-4 h-4 rounded text-[#335cff] focus:ring-[#335cff] cursor-pointer"
                />
                <span>Screen sharing</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#1f1f1f]">
                <input
                  type="checkbox"
                  checked={capabilities.waitingRoomRequired}
                  onChange={() => toggleCapability('waitingRoomRequired')}
                  className="w-4 h-4 rounded text-[#335cff] focus:ring-[#335cff] cursor-pointer"
                />
                <span>Waiting room required</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#1f1f1f]">
                <input
                  type="checkbox"
                  checked={capabilities.liveCaptions}
                  onChange={() => toggleCapability('liveCaptions')}
                  className="w-4 h-4 rounded text-[#335cff] focus:ring-[#335cff] cursor-pointer"
                />
                <span>Live captions</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#1f1f1f]">
                <input
                  type="checkbox"
                  checked={capabilities.hostRequired}
                  onChange={() => toggleCapability('hostRequired')}
                  className="w-4 h-4 rounded text-[#335cff] focus:ring-[#335cff] cursor-pointer"
                />
                <span>Host required</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#1f1f1f]">
                <input
                  type="checkbox"
                  checked={capabilities.breakoutRooms}
                  onChange={() => toggleCapability('breakoutRooms')}
                  className="w-4 h-4 rounded text-[#335cff] focus:ring-[#335cff] cursor-pointer"
                />
                <span>Breakout rooms</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#1f1f1f]">
                <input
                  type="checkbox"
                  checked={capabilities.noSecretsStored}
                  onChange={() => toggleCapability('noSecretsStored')}
                  className="w-4 h-4 rounded text-[#335cff] focus:ring-[#335cff] cursor-pointer"
                />
                <span>No secrets stored in Academic Planning</span>
              </label>
            </div>
          </div>

          {/* Row 4: Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-[#0b0b0b]">
                Effective From
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={effectiveFrom}
                  onChange={(e) => setEffectiveFrom(e.target.value)}
                  className="w-full px-3 py-2 text-[13px] bg-white border border-[#ebebeb] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#046aff]/20 focus:border-[#046aff]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-[#0b0b0b]">
                Effective To
              </label>
              <input
                type="text"
                value={effectiveTo}
                onChange={(e) => setEffectiveTo(e.target.value)}
                placeholder="No expiry"
                className="w-full px-3 py-2 text-[13px] bg-white border border-[#ebebeb] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#046aff]/20 focus:border-[#046aff]"
              />
            </div>
          </div>

          {/* Row 5: Provider Status (Radio Group) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-semibold text-[#0b0b0b]">
              Provider Status
            </label>
            <div className="flex flex-wrap items-center gap-4 text-[13px]">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="radio"
                  name="providerStatus"
                  value="Active"
                  checked={providerStatus === 'Active'}
                  onChange={() => setProviderStatus('Active')}
                  className="w-4 h-4 text-[#335cff] focus:ring-[#335cff]"
                />
                <span className="text-[#1f1f1f]">Active</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="radio"
                  name="providerStatus"
                  value="Under Maintenance"
                  checked={providerStatus === 'Under Maintenance'}
                  onChange={() => setProviderStatus('Under Maintenance')}
                  className="w-4 h-4 text-[#335cff] focus:ring-[#335cff]"
                />
                <span className="text-[#1f1f1f]">Under Maintenance</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="radio"
                  name="providerStatus"
                  value="Decommissioned"
                  checked={providerStatus === 'Decommissioned'}
                  onChange={() => setProviderStatus('Decommissioned')}
                  className="w-4 h-4 text-[#335cff] focus:ring-[#335cff]"
                />
                <span className="text-[#1f1f1f]">Decommissioned</span>
              </label>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#f0f0f0] bg-[#fafafa]">
          <button
            type="button"
            onClick={handleReset}
            className="text-[13px] font-medium text-[#808080] hover:text-[#0b0b0b] transition-colors cursor-pointer"
          >
            Reset fields
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-[#ebebeb] hover:bg-gray-50 text-[#1f1f1f] text-[13px] font-medium rounded-[10px] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-[#335cff] hover:bg-[#254bdb] text-white text-[13px] font-medium rounded-[10px] transition-colors cursor-pointer shadow-xs"
            >
              Save Virtual Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
