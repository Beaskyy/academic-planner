'use client';

import React from 'react';
import {
  BookOpen,
  GraduationCap,
  Users,
  Brain,
  ClipboardList,
  ShieldCheck,
  ArrowRight,
  CheckCircle,
  LogOut,
} from 'lucide-react';
import { useAuthSession } from '@/hooks/use-auth';

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
  const { user, logout } = useAuthSession();
  const Icon = ICON_MAP[icon] ?? BookOpen;

  const initials = (user?.name ?? user?.email ?? '?')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${accentColor}12 0%, #fafafa 60%)`,
      }}
    >
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-[#ebebeb] z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#335cff] flex items-center justify-center">
            <BookOpen className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-[14px] font-bold text-[#0b0b0b] tracking-tight">CampusOS</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold"
              style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}99)` }}
            >
              {initials}
            </div>
            <span className="text-[13px] text-[#5c5c5c] hidden sm:block truncate max-w-[160px]">
              {user?.email}
            </span>
          </div>
          <button
            onClick={() => logout('/login')}
            className="flex items-center gap-1.5 text-[12px] text-[#808080] hover:text-[#0b0b0b] transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:block">Sign out</span>
          </button>
        </div>
      </div>

      {/* Main card */}
      <div className="w-full max-w-[520px] mt-16">
        {/* Icon badge */}
        <div className="flex justify-center mb-6">
          <div
            className="w-16 h-16 rounded-[18px] flex items-center justify-center shadow-lg"
            style={{ background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}44)`, border: `1.5px solid ${accentColor}33` }}
          >
            <div style={{ color: accentColor }}>
              <Icon className="w-7 h-7" />
            </div>
          </div>
        </div>

        {/* Badge */}
        <div className="flex justify-center mb-3">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide"
            style={{ background: `${accentColor}15`, color: accentColor }}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: accentColor }} />
            Coming Soon
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-[32px] font-bold text-[#0b0b0b] text-center leading-tight tracking-tight mb-3">
          {dashboardName}
        </h1>

        <p className="text-[15px] text-[#5c5c5c] text-center leading-relaxed mb-8 max-w-[400px] mx-auto">
          {description}
        </p>

        {/* Feature grid */}
        <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
          <p className="text-[12px] font-semibold text-[#808080] uppercase tracking-wide mb-4">
            What's included
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-2.5">
                <div style={{ color: accentColor }}>
                  <CheckCircle className="w-4 h-4 shrink-0" />
                </div>
                <span className="text-[13px] font-medium text-[#1f1f1f]">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA note */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[13px] text-[#808080]">
          <ArrowRight className="w-3.5 h-3.5" />
          <span>Full implementation coming soon. Routing is live and ready.</span>
        </div>
      </div>
    </div>
  );
}
