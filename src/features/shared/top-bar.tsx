'use client';

import React from 'react';
import { Search, Bell, HelpCircle, User, Menu, Sparkles } from 'lucide-react';

interface TopBarProps {
  onOpenMobileMenu?: () => void;
}

export function TopBar({ onOpenMobileMenu }: TopBarProps) {
  return (
    <header className="h-16 bg-white border-b border-[#ebebeb] px-4 sm:px-6 flex items-center justify-between gap-4 shrink-0 z-10">
      <div className="flex items-center gap-3">
        {onOpenMobileMenu && (
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Open mobile navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center gap-2">
          <span className="font-black tracking-tight text-gray-900 text-base">
            ODEL <span className="text-[#046aff] font-medium">Academic Planner</span>
          </span>
          <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-gray-100 text-gray-700 border border-gray-200">
            2026/2027 Academic Year
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Global search (Ctrl + K)..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#046aff]/20 focus:border-[#046aff]"
          />
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#046aff] rounded-full ring-2 ring-white" />
          </button>

          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Help & Guides"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>

        <div className="h-6 w-px bg-gray-200" />

        <div className="flex items-center gap-2.5 pl-1">
          <div className="w-8 h-8 rounded-full bg-[#046aff] text-white flex items-center justify-center font-bold text-xs shadow-sm ring-2 ring-[#046aff]/20">
            DA
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-bold text-gray-900 leading-none">Dean Alabi</div>
            <div className="text-[10px] text-gray-500 mt-0.5 leading-none">Academic Planning Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
}
