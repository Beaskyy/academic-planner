'use client';

import React, { useState } from 'react';
import { X, ChevronDown, Check } from 'lucide-react';

export interface ExclusiveResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
}

export function ExclusiveResourceModal({ isOpen, onClose, onSave }: ExclusiveResourceModalProps) {
  const [resourceName, setResourceName] = useState('');
  const [assetRef, setAssetRef] = useState('');
  const [owningUnit, setOwningUnit] = useState('Engineering Lab');
  const [quantity, setQuantity] = useState('12');
  const [resourceType, setResourceType] = useState('Exclusive equipment');
  const [availableFrom, setAvailableFrom] = useState('');
  const [availableTo, setAvailableTo] = useState('No expiry');
  const [lifecycleStatus, setLifecycleStatus] = useState<'Active' | 'Under Maintenance' | 'Decommissioned'>('Active');

  const [constraints, setConstraints] = useState({
    exclusiveBooking: true,
    qualifiedOperator: true,
    setupTime: false,
    oneSectionPerSlot: true,
    accessibleAlternative: true,
    maintenanceWindow: true,
    compatibleVenuesOnly: false,
    conflictValidation: true,
  });

  const toggleConstraint = (key: keyof typeof constraints) => {
    setConstraints((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleReset = () => {
    setResourceName('');
    setAssetRef('');
    setOwningUnit('Engineering Lab');
    setQuantity('12');
    setResourceType('Exclusive equipment');
    setAvailableFrom('');
    setAvailableTo('No expiry');
    setLifecycleStatus('Active');
    setConstraints({
      exclusiveBooking: true,
      qualifiedOperator: true,
      setupTime: false,
      oneSectionPerSlot: true,
      accessibleAlternative: true,
      maintenanceWindow: true,
      compatibleVenuesOnly: false,
      conflictValidation: true,
    });
  };

  const handleSave = () => {
    onSave?.({
      resourceName,
      assetRef,
      owningUnit,
      quantity,
      resourceType,
      constraints,
      availableFrom,
      availableTo,
      lifecycleStatus,
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
        aria-labelledby="exclusive-resource-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#f0f0f0]">
          <h2 id="exclusive-resource-title" className="text-[20px] font-bold text-[#0b0b0b] tracking-tight">
            Add Exclusive Teaching Resource
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
          {/* Row 1: Name & Asset Ref */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-[#0b0b0b]">
                Resource Name
              </label>
              <input
                type="text"
                value={resourceName}
                onChange={(e) => setResourceName(e.target.value)}
                placeholder="e.g. Mobile Robotics Kit"
                className="px-3 py-2 text-[13px] bg-white border border-[#ebebeb] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#046aff]/20 focus:border-[#046aff]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-[#0b0b0b]">
                Asset / Provider Reference
              </label>
              <div className="relative">
                <select
                  value={assetRef}
                  onChange={(e) => setAssetRef(e.target.value)}
                  className="w-full appearance-none px-3 py-2 text-[13px] bg-white border border-[#ebebeb] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#046aff]/20 focus:border-[#046aff] pr-8 cursor-pointer"
                >
                  <option value="">Enter approved asset reference...</option>
                  <option value="ast-eng-101">AST-ENG-101 (Robotics Lab A)</option>
                  <option value="ast-med-204">AST-MED-204 (Clinical Simulator B)</option>
                  <option value="ast-hpc-309">AST-HPC-309 (Cluster Partition Alpha)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#808080] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 2: Owning Unit, Quantity, Resource Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-[#0b0b0b]">
                Owning Unit
              </label>
              <input
                type="text"
                value={owningUnit}
                onChange={(e) => setOwningUnit(e.target.value)}
                placeholder="e.g. Engineering Lab"
                className="px-3 py-2 text-[13px] bg-white border border-[#ebebeb] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#046aff]/20 focus:border-[#046aff]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-[#0b0b0b]">
                Available Quantity
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 12"
                className="px-3 py-2 text-[13px] bg-white border border-[#ebebeb] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#046aff]/20 focus:border-[#046aff]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-[#0b0b0b]">
                Resource Type
              </label>
              <div className="relative">
                <select
                  value={resourceType}
                  onChange={(e) => setResourceType(e.target.value)}
                  className="w-full appearance-none px-3 py-2 text-[13px] bg-white border border-[#ebebeb] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#046aff]/20 focus:border-[#046aff] pr-8 cursor-pointer"
                >
                  <option value="Exclusive equipment">Exclusive equipment</option>
                  <option value="High performance lab">High performance lab</option>
                  <option value="Clinical suite">Clinical suite</option>
                  <option value="Audio/visual studio">Audio/visual studio</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#808080] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 3: Features & Allocation Constraints */}
          <div className="flex flex-col gap-2 pt-1">
            <label className="text-[12px] font-semibold text-[#0b0b0b]">
              Features &amp; Allocation Constraints
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4 p-3.5 bg-[#fafafa] border border-[#ebebeb] rounded-[10px]">
              <label className="flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#1f1f1f]">
                <input
                  type="checkbox"
                  checked={constraints.exclusiveBooking}
                  onChange={() => toggleConstraint('exclusiveBooking')}
                  className="w-4 h-4 rounded text-[#335cff] focus:ring-[#335cff] cursor-pointer"
                />
                <span>Exclusive booking required</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#1f1f1f]">
                <input
                  type="checkbox"
                  checked={constraints.qualifiedOperator}
                  onChange={() => toggleConstraint('qualifiedOperator')}
                  className="w-4 h-4 rounded text-[#335cff] focus:ring-[#335cff] cursor-pointer"
                />
                <span>Qualified operator required</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#1f1f1f]">
                <input
                  type="checkbox"
                  checked={constraints.setupTime}
                  onChange={() => toggleConstraint('setupTime')}
                  className="w-4 h-4 rounded text-[#335cff] focus:ring-[#335cff] cursor-pointer"
                />
                <span>Setup time: 30 minutes</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#1f1f1f]">
                <input
                  type="checkbox"
                  checked={constraints.oneSectionPerSlot}
                  onChange={() => toggleConstraint('oneSectionPerSlot')}
                  className="w-4 h-4 rounded text-[#335cff] focus:ring-[#335cff] cursor-pointer"
                />
                <span>One section per time slot</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#1f1f1f]">
                <input
                  type="checkbox"
                  checked={constraints.accessibleAlternative}
                  onChange={() => toggleConstraint('accessibleAlternative')}
                  className="w-4 h-4 rounded text-[#335cff] focus:ring-[#335cff] cursor-pointer"
                />
                <span>Accessible alternative available</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#1f1f1f]">
                <input
                  type="checkbox"
                  checked={constraints.maintenanceWindow}
                  onChange={() => toggleConstraint('maintenanceWindow')}
                  className="w-4 h-4 rounded text-[#335cff] focus:ring-[#335cff] cursor-pointer"
                />
                <span>Maintenance window enforced</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#1f1f1f]">
                <input
                  type="checkbox"
                  checked={constraints.compatibleVenuesOnly}
                  onChange={() => toggleConstraint('compatibleVenuesOnly')}
                  className="w-4 h-4 rounded text-[#335cff] focus:ring-[#335cff] cursor-pointer"
                />
                <span>Compatible venues only</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#1f1f1f]">
                <input
                  type="checkbox"
                  checked={constraints.conflictValidation}
                  onChange={() => toggleConstraint('conflictValidation')}
                  className="w-4 h-4 rounded text-[#335cff] focus:ring-[#335cff] cursor-pointer"
                />
                <span>Conflict validation required</span>
              </label>
            </div>
          </div>

          {/* Row 4: Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-[#0b0b0b]">
                Available From
              </label>
              <input
                type="date"
                value={availableFrom}
                onChange={(e) => setAvailableFrom(e.target.value)}
                className="w-full px-3 py-2 text-[13px] bg-white border border-[#ebebeb] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#046aff]/20 focus:border-[#046aff]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-[#0b0b0b]">
                Available To
              </label>
              <input
                type="text"
                value={availableTo}
                onChange={(e) => setAvailableTo(e.target.value)}
                placeholder="No expiry"
                className="w-full px-3 py-2 text-[13px] bg-white border border-[#ebebeb] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#046aff]/20 focus:border-[#046aff]"
              />
            </div>
          </div>

          {/* Row 5: Lifecycle Status (Radio Group) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-semibold text-[#0b0b0b]">
              Lifecycle Status
            </label>
            <div className="flex flex-wrap items-center gap-4 text-[13px]">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="radio"
                  name="lifecycleStatus"
                  value="Active"
                  checked={lifecycleStatus === 'Active'}
                  onChange={() => setLifecycleStatus('Active')}
                  className="w-4 h-4 text-[#335cff] focus:ring-[#335cff]"
                />
                <span className="text-[#1f1f1f]">Active</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="radio"
                  name="lifecycleStatus"
                  value="Under Maintenance"
                  checked={lifecycleStatus === 'Under Maintenance'}
                  onChange={() => setLifecycleStatus('Under Maintenance')}
                  className="w-4 h-4 text-[#335cff] focus:ring-[#335cff]"
                />
                <span className="text-[#1f1f1f]">Under Maintenance</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="radio"
                  name="lifecycleStatus"
                  value="Decommissioned"
                  checked={lifecycleStatus === 'Decommissioned'}
                  onChange={() => setLifecycleStatus('Decommissioned')}
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
              Save Resource
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
