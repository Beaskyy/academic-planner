'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Globe,
  Home,
  Network,
  Calendar,
  BookOpen,
  Scale,
  UserCheck,
  Building2,
  Grid3X3,
  ClipboardCheck,
  CloudUpload,
  Shield,
  X,
} from 'lucide-react';

interface SharedSidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  minimalContext?: boolean;
  activeItem?: string;
}

const navItems = [
  { id: 'home', label: 'Planning Home', icon: Home, href: '/' },
  { id: 'structures', label: 'Academic Structures', icon: Network, href: '/structures' },
  { id: 'calendar', label: 'Academic Calendar', icon: Calendar, href: '/calendar' },
  { id: 'courses', label: 'Course Catalogue', icon: BookOpen, href: '/courses' },
  { id: 'curricula', label: 'Curricula & Rules', icon: Scale, href: '/curricula' },
  { id: 'offerings', label: 'Offerings & Assignments', icon: UserCheck, href: '/offerings' },
  { id: 'resources', label: 'Resources & Venues', icon: Building2, href: '/resources' },
  { id: 'timetable', label: 'Timetable', icon: Grid3X3, href: '/timetable' },
  { id: 'approvals', label: 'Approvals', icon: ClipboardCheck, href: '/approvals' },
  { id: 'publication', label: 'Publication', icon: CloudUpload, href: '/publication' },
  { id: 'audit', label: 'Audit Log', icon: Shield, href: '/audit' },
];

export function SharedSidebar({
  mobileOpen = false,
  onCloseMobile,
  minimalContext = false,
  activeItem,
}: SharedSidebarProps) {
  const pathname = usePathname();

  const isItemActive = (item: (typeof navItems)[number]) => {
    if (activeItem) {
      return activeItem === item.id;
    }
    if (item.href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(item.href.split('?')[0]);
  };

  const sidebarContent = (
    <div className="flex flex-col gap-6 p-4 w-[280px] h-full overflow-y-auto select-none">
      {/* Mobile close button header */}
      <div className="flex items-center justify-between lg:hidden pb-2 border-b border-[#f5f5f5]">
        <span className="font-semibold text-sm text-[#1f1f1f]">Navigation Menu</span>
        <button
          onClick={onCloseMobile}
          className="p-1 rounded-md text-[#808080] hover:text-[#1f1f1f] hover:bg-[#f5f5f5] transition-colors"
          aria-label="Close navigation"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Resolved Context Card */}
      <div className="bg-[#fafafa] border border-[#f0f0f0] rounded-[16px] p-4 flex flex-col gap-3 shrink-0">
        {/* Row 1: School */}
        <div className="flex items-center gap-2.5 w-full">
          <div className="w-4 h-4 flex items-center justify-center shrink-0 text-[#046aff]">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div className="flex flex-col gap-[2px] min-w-0 flex-1">
            <span className="text-[11px] font-medium text-[#808080] uppercase tracking-wide">
              School
            </span>
            <span className="text-[13px] font-semibold text-[#1f1f1f] truncate">
              ODEL University – Lagos
            </span>
          </div>
        </div>

        {/* Row 2: Workspace */}
        <div className="flex items-center gap-2.5 w-full">
          <div className="w-4 h-4 flex items-center justify-center shrink-0 text-[#046aff]">
            <Briefcase className="w-4 h-4" />
          </div>
          <div className="flex flex-col gap-[2px] min-w-0 flex-1">
            <span className="text-[11px] font-medium text-[#808080] uppercase tracking-wide">
              Workspace
            </span>
            <span className="text-[13px] font-semibold text-[#1f1f1f] truncate">
              Academic Planning
            </span>
          </div>
        </div>

        {!minimalContext && (
          <>
            {/* Row 3: Role */}
            <div className="flex items-center gap-2.5 w-full">
              <div className="w-4 h-4 flex items-center justify-center shrink-0 text-[#046aff]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="flex flex-col gap-[2px] min-w-0 flex-1">
                <span className="text-[11px] font-medium text-[#808080] uppercase tracking-wide">
                  Role
                </span>
                <span className="text-[13px] font-semibold text-[#1f1f1f] truncate">
                  Academic Planning Admin
                </span>
              </div>
            </div>

            {/* Row 4: Timezone */}
            <div className="flex items-center gap-2.5 w-full">
              <div className="w-4 h-4 flex items-center justify-center shrink-0 text-[#046aff]">
                <Globe className="w-4 h-4" />
              </div>
              <div className="flex flex-col gap-[2px] min-w-0 flex-1">
                <span className="text-[11px] font-medium text-[#808080] uppercase tracking-wide">
                  Timezone
                </span>
                <span className="text-[13px] font-semibold text-[#1f1f1f] truncate">
                  Africa/Lagos
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-1 w-full" aria-label="Main Navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isItemActive(item);

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-[13px] transition-colors ${
                active
                  ? 'bg-[#f0f8ff] text-[#046aff] font-semibold'
                  : 'text-[#1f1f1f] font-medium hover:bg-[#f5f5f5]'
              }`}
            >
              <Icon
                className={`w-[18px] h-[18px] shrink-0 ${
                  active ? 'text-[#046aff]' : 'text-[#5c5c5c]'
                }`}
              />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex w-[280px] shrink-0 bg-white border-r border-[#ebebeb] sticky top-0 h-screen flex-col">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <div className="relative bg-white w-[280px] max-w-[85vw] h-full shadow-2xl z-10 flex flex-col">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}

export { SharedSidebar as Sidebar };

