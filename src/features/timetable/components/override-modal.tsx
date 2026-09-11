'use client';

import React, { useState } from 'react';
import {
  X,
  AlertTriangle,
  User,
  ShieldCheck,
  Clock,
  CheckCircle2,
  FileText,
  History,
} from 'lucide-react';

interface OverrideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OverrideModal({ isOpen, onClose }: OverrideModalProps) {
  const [justification, setJustification] = useState(
    'Dr. Okafor is covering CSC 312 graphics module during Dr. Johnson sabbatical leave. Additional Graduate Teaching Assistants (GTA-2 and GTA-4) have been allocated for laboratory supervision.'
  );
  const [approver, setApprover] = useState('Prof. Alabi - Dean of Science');
  const [overrideType, setOverrideType] = useState('Instructor Workload Exceeded');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Request Administrative Override</h2>
              <p className="text-xs text-gray-500">Constraint violation policy exemption</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Warning Banner */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1.5">
            <div className="font-bold flex items-center gap-2 text-amber-800">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>High Instructor Load Warning: Dr. Okafor</span>
            </div>
            <p className="leading-relaxed">
              Dr. Okafor is currently assigned to <strong>6 course sections (22 contact hours/week)</strong>, exceeding the Senate maximum teaching threshold of 18 hours/week.
            </p>
          </div>

          {/* Violation Category */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Violation Type
            </label>
            <select
              value={overrideType}
              onChange={(e) => setOverrideType(e.target.value)}
              className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg p-2.5 font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#046aff]/30"
            >
              <option value="Instructor Workload Exceeded">Instructor Workload Exceeded (&gt;18 hours/week)</option>
              <option value="Venue Capacity Deficit">Venue Capacity Deficit (&gt;10% overflow)</option>
              <option value="Direct Room Double-Booking">Direct Room Double-Booking (Simultaneous use)</option>
            </select>
          </div>

          {/* Justification Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                Formal Academic Justification
              </label>
              <span className="text-[11px] text-gray-400">{justification.length}/500 chars</span>
            </div>
            <textarea
              rows={4}
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              maxLength={500}
              className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg p-3 font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#046aff]/30"
              placeholder="Detail reasons, mitigation measures, and TA assistance..."
            />
          </div>

          {/* Approving Authority */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Authorizing Dean / Approver
            </label>
            <select
              value={approver}
              onChange={(e) => setApprover(e.target.value)}
              className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg p-2.5 font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#046aff]/30"
            >
              <option value="Prof. Alabi - Dean of Science">Prof. Alabi (Dean of Science & Computing)</option>
              <option value="Prof. Bello - HOD Computer Science">Prof. Bello (Head of Department)</option>
              <option value="Senate Academic Planning Board">Senate Academic Planning Board</option>
            </select>
          </div>

          {/* Prior History Audit Card */}
          <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
            <div className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-gray-500" /> Previous Approved Overrides (Dr. Okafor)
            </div>
            <div className="text-[11px] text-gray-600 flex items-center justify-between bg-white p-2 rounded border border-gray-200">
              <div>
                <span className="font-semibold text-gray-800">2025/26 Sem 2: 20 Contact Hours</span>
                <span className="text-gray-400 ml-2">(Sabbatical cover)</span>
              </div>
              <span className="text-[#21bf2b] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#21bf2b]" /> Approved by Dean
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-3 sticky bottom-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-sm font-bold bg-[#335cff] hover:bg-[#1a45e8] text-white rounded-lg transition-all shadow-sm flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" /> Submit Override Request
          </button>
        </div>
      </div>
    </div>
  );
}
