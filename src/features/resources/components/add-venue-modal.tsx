'use client';

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface AddVenueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (venueData: any) => void;
}

export function AddVenueModal({ isOpen, onClose, onSave }: AddVenueModalProps) {
  const [roomName, setRoomName] = useState('');
  const [building, setBuilding] = useState('Main Science Block');
  const [floor, setFloor] = useState('1st Floor');
  const [capacity, setCapacity] = useState('120');
  const [roomType, setRoomType] = useState('Lecture Hall');
  const [status, setStatus] = useState<'Active' | 'Under Maintenance' | 'Decommissioned'>('Active');

  const [features, setFeatures] = useState({
    projector: true,
    soundSystem: true,
    videoConference: false,
    smartBoard: false,
    wheelchair: true,
    airConditioning: true,
    labEquipments: false,
    whiteboard: true,
  });

  if (!isOpen) return null;

  const toggleFeature = (key: keyof typeof features) => {
    setFeatures((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      roomName: roomName || 'New Hall',
      building,
      floor,
      capacity: Number(capacity) || 50,
      roomType,
      status,
      features,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-[20px] shadow-2xl border border-[#ebebeb] w-full max-w-[560px] max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#f0f0f0] flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-[#1f1f1f]">
            Add Physical Venue
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#808080] hover:text-[#1f1f1f] hover:bg-[#f5f5f5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex flex-col gap-5 text-[13px]">
          {/* Row 1: Room Name & Building */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-[#1f1f1f]">
                Room Name / Number
              </label>
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="e.g. Hall S-102"
                required
                className="bg-[#fafafa] border border-[#d9d9d9] rounded-[10px] px-3.5 py-2 text-[13px] font-medium text-[#1f1f1f] focus:outline-none focus:border-[#046aff]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-[#1f1f1f]">
                Building / Location
              </label>
              <div className="relative">
                <select
                  value={building}
                  onChange={(e) => setBuilding(e.target.value)}
                  className="w-full bg-[#fafafa] border border-[#d9d9d9] rounded-[10px] px-3.5 py-2 text-[13px] font-medium text-[#1f1f1f] appearance-none cursor-pointer focus:outline-none focus:border-[#046aff]"
                >
                  <option value="Main Science Block">Main Science Block</option>
                  <option value="Engineering Wing">Engineering Wing</option>
                  <option value="Arts & Humanities">Arts &amp; Humanities</option>
                  <option value="Administrative Senate">Administrative Senate</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#808080]">
                  ▾
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Floor, Capacity, Room Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-[#1f1f1f]">
                Floor
              </label>
              <input
                type="text"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                placeholder="e.g. 1st Floor"
                className="bg-[#fafafa] border border-[#d9d9d9] rounded-[10px] px-3.5 py-2 text-[13px] font-medium text-[#1f1f1f] focus:outline-none focus:border-[#046aff]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-[#1f1f1f]">
                Capacity
              </label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="e.g. 120"
                required
                className="bg-[#fafafa] border border-[#d9d9d9] rounded-[10px] px-3.5 py-2 text-[13px] font-medium text-[#1f1f1f] focus:outline-none focus:border-[#046aff]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-[#1f1f1f]">
                Room Type
              </label>
              <div className="relative">
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full bg-[#fafafa] border border-[#d9d9d9] rounded-[10px] px-3 py-2 text-[13px] font-medium text-[#1f1f1f] appearance-none cursor-pointer focus:outline-none focus:border-[#046aff]"
                >
                  <option value="Lecture Hall">Lecture Hall</option>
                  <option value="Seminar Room">Seminar Room</option>
                  <option value="Computing Lab">Computing Lab</option>
                  <option value="Boardroom">Boardroom</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#808080]">
                  ▾
                </div>
              </div>
            </div>
          </div>

          {/* Features & Equipment */}
          <div className="flex flex-col gap-2.5 pt-2 border-t border-[#f5f5f5]">
            <span className="text-[12px] font-bold text-[#1f1f1f]">
              Features &amp; Equipments
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { key: 'projector', label: 'Projector Installed' },
                { key: 'soundSystem', label: 'Audio/Sound System' },
                { key: 'videoConference', label: 'Video Conferencing Suite' },
                { key: 'smartBoard', label: 'Smart Board' },
                { key: 'wheelchair', label: 'Wheelchair Accessible' },
                { key: 'airConditioning', label: 'Air Conditioning' },
                { key: 'labEquipments', label: 'Lab Station Equipments' },
                { key: 'whiteboard', label: 'Whiteboard / Markers' },
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex items-center gap-2.5 cursor-pointer select-none text-[13px] text-[#1f1f1f]"
                >
                  <input
                    type="checkbox"
                    checked={features[item.key as keyof typeof features]}
                    onChange={() => toggleFeature(item.key as keyof typeof features)}
                    className="w-4 h-4 rounded text-[#046aff] border-[#d9d9d9] focus:ring-0 cursor-pointer"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Operational Status */}
          <div className="flex flex-col gap-2 pt-2 border-t border-[#f5f5f5]">
            <span className="text-[12px] font-bold text-[#1f1f1f]">
              Operational Status
            </span>
            <div className="flex items-center gap-4 flex-wrap">
              {(['Active', 'Under Maintenance', 'Decommissioned'] as const).map(
                (st) => (
                  <label
                    key={st}
                    className="flex items-center gap-2 cursor-pointer text-[13px] font-medium text-[#1f1f1f]"
                  >
                    <input
                      type="radio"
                      name="status"
                      value={st}
                      checked={status === st}
                      onChange={() => setStatus(st)}
                      className="text-[#046aff] focus:ring-0 cursor-pointer"
                    />
                    <span>{st}</span>
                  </label>
                )
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-[#f5f5f5] mt-2">
            <button
              type="button"
              onClick={() => {
                setRoomName('');
                setCapacity('120');
              }}
              className="text-xs font-semibold text-[#808080] hover:text-[#1f1f1f] cursor-pointer"
            >
              Reset fields
            </button>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-[#d9d9d9] bg-white hover:bg-[#f5f5f5] text-[#1f1f1f] rounded-[10px] text-[13px] font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#335cff] hover:bg-[#1a45e8] text-white rounded-[10px] text-[13px] font-semibold transition-colors cursor-pointer shadow-xs"
              >
                Save Venue
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
