'use client';

import React, { useState } from 'react';
import { X, AlertTriangle, User } from 'lucide-react';

export type ResolutionStrategy = 'rebase' | 'save_draft' | 'manual';

export interface ConcurrentEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyResolution?: (strategy: ResolutionStrategy) => void;
  localUser?: {
    name: string;
    editedTime: string;
    fieldLabel: string;
    value: string;
  };
  serverUser?: {
    name: string;
    savedTime: string;
    fieldLabel: string;
    value: string;
  };
}

export function ConcurrentEditModal({
  isOpen,
  onClose,
  onApplyResolution,
  localUser = {
    name: 'Emma Wright',
    editedTime: 'Edited 2 mins ago',
    fieldLabel: 'Modified Fields:',
    value: 'PHY 102 Lab hours: 4 hrs',
  },
  serverUser = {
    name: 'Arthur Taylor',
    savedTime: 'Saved 1 min ago',
    fieldLabel: 'Saved Values:',
    value: 'PHY 102 Lab hours: 3 hrs',
  },
}: ConcurrentEditModalProps) {
  const [selectedStrategy, setSelectedStrategy] = useState<ResolutionStrategy>('rebase');
  const [isApplying, setIsApplying] = useState(false);

  if (!isOpen) return null;

  const handleApply = () => {
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      onApplyResolution?.(selectedStrategy);
      onClose();
    }, 500);
  };

  const strategies = [
    {
      id: 'rebase' as ResolutionStrategy,
      title: 'Rebase my preserved changes onto the latest version',
      description: "Compare your local v4.1 changes with Arthur's latest save, then resolve conflicts before saving.",
    },
    {
      id: 'save_draft' as ResolutionStrategy,
      title: 'Save my work as a separate draft',
      description: "Preserve your local changes as a new draft without changing Arthur's saved version.",
    },
    {
      id: 'manual' as ResolutionStrategy,
      title: 'Review differences and resolve manually',
      description: 'Highlight differences inline and resolve line-by-line.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-[2px] animate-in fade-in duration-200">
      {/* Modal Card */}
      <div
        className="relative w-full max-w-[760px] bg-white rounded-[16px] shadow-[0px_20px_40px_rgba(0,0,0,0.12)] border border-[#ebebeb] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="concurrent-edit-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h2 id="concurrent-edit-title" className="text-[20px] font-bold text-[#0b0b0b] tracking-tight">
            Concurrent Edit Detected
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

        {/* Content Body */}
        <div className="px-6 pb-6 flex flex-col gap-5">
          {/* Warning Banner */}
          <div className="bg-[#fef6ee] border border-[#fbd5c0] rounded-[10px] p-3.5 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-[#ea580c]">
              <AlertTriangle className="w-4 h-4 text-[#ea580c] shrink-0" />
              <span className="text-[13px] font-bold text-[#ea580c]">
                Conflicting changes detected
              </span>
            </div>
            <p className="text-[13px] text-[#9a3412] pl-6 leading-relaxed">
              Another user has modified this artifact while you were editing. Your changes have been preserved.
            </p>
          </div>

          {/* Comparison Columns Panel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Left: Your Changes (Local) */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#808080]">
                Your Changes (Local)
              </span>
              <div className="bg-white border border-[#ebebeb] rounded-[12px] p-3.5 flex flex-col gap-2.5 shadow-xs">
                <div>
                  <div className="text-[14px] font-bold text-[#0b0b0b] leading-tight">
                    {localUser.name}
                  </div>
                  <div className="text-[11px] text-[#808080] mt-0.5">
                    {localUser.editedTime}
                  </div>
                </div>

                <div className="h-px bg-[#f0f0f0] w-full" />

                <div className="flex flex-col gap-1.5">
                  <span className="text-[12px] font-medium text-[#5c5c5c]">
                    {localUser.fieldLabel}
                  </span>
                  <div className="bg-[#fff9db] border border-[#fef08a] rounded-[6px] px-2.5 py-1.5 text-[12px] font-medium text-[#854d0e]">
                    {localUser.value}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Saved Version (Server) */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#808080]">
                Saved Version (Server)
              </span>
              <div className="bg-white border border-[#ebebeb] rounded-[12px] p-3.5 flex flex-col gap-2.5 shadow-xs">
                <div>
                  <div className="text-[14px] font-bold text-[#0b0b0b] leading-tight">
                    {serverUser.name}
                  </div>
                  <div className="text-[11px] text-[#808080] mt-0.5">
                    {serverUser.savedTime}
                  </div>
                </div>

                <div className="h-px bg-[#f0f0f0] w-full" />

                <div className="flex flex-col gap-1.5">
                  <span className="text-[12px] font-medium text-[#5c5c5c]">
                    {serverUser.fieldLabel}
                  </span>
                  <div className="bg-[#f5f5f5] border border-[#ebebeb] rounded-[6px] px-2.5 py-1.5 text-[12px] font-medium text-[#5c5c5c]">
                    {serverUser.value}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Select Resolution Strategy */}
          <div className="flex flex-col gap-2.5 pt-1">
            <span className="text-[13px] font-semibold text-[#0b0b0b]">
              Select Resolution Strategy
            </span>
            <div className="flex flex-col gap-2">
              {strategies.map((strategy) => {
                const isSelected = selectedStrategy === strategy.id;
                return (
                  <label
                    key={strategy.id}
                    onClick={() => setSelectedStrategy(strategy.id)}
                    className={`flex items-start gap-3 p-3 rounded-[10px] border cursor-pointer select-none transition-all ${
                      isSelected
                        ? 'border-[#335cff] bg-[#f0f8ff]'
                        : 'border-[#ebebeb] bg-white hover:bg-[#fafafa]'
                    }`}
                  >
                    <div className="pt-0.5 shrink-0">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? 'border-[#335cff] bg-white'
                            : 'border-[#d1d5db] bg-white'
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-[#335cff]" />
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[13px] font-semibold text-[#0b0b0b] leading-snug">
                        {strategy.title}
                      </span>
                      <span className="text-[12px] text-[#5c5c5c] leading-normal">
                        {strategy.description}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-[#ebebeb] hover:bg-[#f5f5f5] text-[#1f1f1f] text-[14px] font-medium rounded-[10px] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isApplying}
              onClick={handleApply}
              className="px-5 py-2 bg-[#335cff] hover:bg-[#254bdb] text-white text-[14px] font-medium rounded-[10px] transition-colors shadow-xs cursor-pointer"
            >
              {isApplying ? 'Applying...' : 'Apply Resolution'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
