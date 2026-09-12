'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export interface SignOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSignOut?: () => void;
  userName?: string;
  userEmail?: string;
  sessionDuration?: string;
  timezone?: string;
}

export function SignOutModal({
  isOpen,
  onClose,
  onConfirmSignOut,
  userName = 'Laura Hills',
  userEmail = 'laura.hills@odeluniversity.edu.ng',
  sessionDuration = '2h 45m',
  timezone = 'Africa/Lagos (GMT+1)',
}: SignOutModalProps) {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  if (!isOpen) return null;

  const handleSignOut = () => {
    setIsSigningOut(true);
    setTimeout(() => {
      setIsSigningOut(false);
      onConfirmSignOut?.();
      onClose();
      // Navigate to login if available
      router.push('/login');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-[2px] animate-in fade-in duration-200">
      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-[480px] bg-white rounded-[24px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.18)] border border-[#f0f0f0] p-8 flex flex-col items-center text-center animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sign-out-title"
      >
        {/* User Identity Section */}
        <div className="flex flex-col items-center">
          <h3 className="text-[18px] font-bold text-[#0b0b0b] leading-tight">
            {userName}
          </h3>
          <span className="text-[13px] text-[#808080] mt-1 font-normal">
            {userEmail}
          </span>
        </div>

        {/* Heading & Description */}
        <div className="flex flex-col items-center mt-6">
          <h2 id="sign-out-title" className="text-[22px] font-bold text-[#0b0b0b] tracking-tight leading-tight">
            Sign Out of CampusOS
          </h2>
          <p className="text-[13px] text-[#5c5c5c] leading-relaxed mt-2.5 max-w-[390px]">
            Your active admin session will end and you will be returned to the sign-in portal. Any unsaved drafts will follow your editor draft-recovery policy.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-2.5 mt-7">
          <button
            type="button"
            disabled={isSigningOut}
            onClick={handleSignOut}
            className="w-full py-2.5 px-4 bg-[#fb3748] hover:bg-[#e02839] text-white text-[14px] font-medium rounded-[10px] transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            <span>‹</span>
            <span>{isSigningOut ? 'Signing out...' : 'Sign Out'}</span>
            <span>›</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-white border border-[#ebebeb] hover:bg-[#fafafa] text-[#1f1f1f] text-[14px] font-medium rounded-[10px] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>‹</span>
            <span>Cancel</span>
            <span>›</span>
          </button>
        </div>

        {/* Subtle Divider */}
        <div className="w-full h-px bg-[#ebebeb] my-5" />

        {/* Switch Links */}
        <div className="flex items-center justify-center gap-3 text-[13px] font-medium text-[#046aff]">
          <button
            type="button"
            onClick={() => alert('Switch School action triggered')}
            className="hover:underline cursor-pointer"
          >
            Switch School
          </button>
          <span className="w-1 h-1 rounded-full bg-[#808080] inline-block" />
          <button
            type="button"
            onClick={() => alert('Switch Workspace action triggered')}
            className="hover:underline cursor-pointer"
          >
            Switch Workspace
          </button>
        </div>

        {/* Session Metadata Info */}
        <div className="flex flex-col items-center gap-0.5 mt-4 text-[11px] text-[#808080]">
          <span>Current Session Time: {sessionDuration}</span>
          <span>Local Timezone: {timezone}</span>
        </div>
      </div>
    </div>
  );
}
