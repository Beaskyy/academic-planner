'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  GraduationCap,
  Users,
  Brain,
  ClipboardList,
  ShieldCheck,
  ArrowRight,
  CheckCircle,
  Menu,
  Sparkles,
} from 'lucide-react';
import { useAuthSession } from '@/hooks/use-auth';
import { SharedSidebar, DashboardCategory } from '@/features/shared/sidebar';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  academic: BookOpen,
  student: GraduationCap,
  'student-admin': Users,
  learning: Brain,
  admissions: ClipboardList,
  super: ShieldCheck,
};

interface DashboardStubProps {
  dashboardName: string;
  description: string;
  icon: string;
  accentColor: string;
  features: string[];
}

export function DashboardStub({
  dashboardName,
  description,
  icon,
  accentColor,
  features,
}: DashboardStubProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuthSession();
  const Icon = ICON_MAP[icon] ?? BookOpen;

  const initials = (user?.name ?? user?.email ?? '?')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="flex h-screen overflow-hidden bg-[#fafafa]">
      {/* Role-specific Sidebar */}
      <SharedSidebar
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        categoryOverride={icon as DashboardCategory}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-[#ebebeb] px-6 flex items-center justify-between shrink-0 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-1.5 rounded-lg text-[#5c5c5c] hover:text-[#1f1f1f] hover:bg-[#f5f5f5] cursor-pointer"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-[13px] font-semibold text-[#808080]">CampusOS</span>
              <span className="text-[13px] text-[#c0c0c0]">/</span>
              <span className="text-[13px] font-semibold text-[#1f1f1f]">{dashboardName}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold shadow-xs"
                style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)` }}
              >
                {initials}
              </div>
              <span className="text-[13px] text-[#5c5c5c] hidden sm:block truncate max-w-[160px]">
                {user?.email}
              </span>
            </div>
          </div>
        </header>

        {/* Main Body */}
        <main
          className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative overflow-y-auto"
          style={{
            background: `radial-gradient(ellipse 90% 70% at 50% 0%, ${accentColor}0f 0%, #fafafa 70%)`,
          }}
        >
          <div className="w-full max-w-[560px] my-auto">
            {/* Icon badge */}
            <div className="flex justify-center mb-6">
              <div
                className="w-20 h-20 rounded-[22px] flex items-center justify-center shadow-lg transition-transform hover:scale-105 duration-300"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}18, ${accentColor}38)`,
                  border: `1.5px solid ${accentColor}33`,
                }}
              >
                <div style={{ color: accentColor }}>
                  <Icon className="w-9 h-9" />
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex justify-center mb-3">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide"
                style={{ background: `${accentColor}15`, color: accentColor }}
              >
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: accentColor }} />
                <span>Dedicated Application Workspace</span>
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-[32px] md:text-[36px] font-bold text-[#0b0b0b] text-center leading-tight tracking-tight mb-3">
              {dashboardName}
            </h1>

            <p className="text-[14px] md:text-[15px] text-[#5c5c5c] text-center leading-relaxed mb-8 max-w-[460px] mx-auto">
              {description}
            </p>

            {/* Features Card */}
            <div className="bg-white border border-[#ebebeb] rounded-[18px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-6">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#f5f5f5]">
                <p className="text-[12px] font-semibold text-[#808080] uppercase tracking-wide">
                  Workspace Modules
                </p>
                <span
                  className="text-[11px] font-semibold flex items-center gap-1"
                  style={{ color: accentColor }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Configured</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2.5 p-2 rounded-[10px] bg-[#fafafa] border border-[#f0f0f0]"
                  >
                    <div style={{ color: accentColor }}>
                      <CheckCircle className="w-4 h-4 shrink-0" />
                    </div>
                    <span className="text-[13px] font-medium text-[#1f1f1f]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Status note */}
            <div className="flex items-center justify-center gap-2 text-[12px] text-[#808080] text-center">
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              <span>
                Separate role-scoped dashboard live. User interface customization in progress.
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
