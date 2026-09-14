'use client';

import React from 'react';
import { useAuthSession, useSelectWorkspace } from '@/hooks/use-auth';
import { getRoleEntry } from '@/lib/role-router';
import { Workspace } from '@/types/auth';
import {
  BookOpen,
  GraduationCap,
  Users,
  Brain,
  ClipboardList,
  ShieldCheck,
  ChevronRight,
  Loader2,
  LogOut,
} from 'lucide-react';

const ROLE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  academic: BookOpen,
  student: GraduationCap,
  'student-admin': Users,
  learning: Brain,
  admissions: ClipboardList,
  super: ShieldCheck,
};

const ROLE_COLORS: Record<string, { bg: string; icon: string; border: string }> = {
  academic: { bg: 'bg-[#eff6ff]', icon: 'text-[#2563eb]', border: 'border-[#bfdbfe]' },
  student: { bg: 'bg-[#f0fdf4]', icon: 'text-[#16a34a]', border: 'border-[#bbf7d0]' },
  'student-admin': { bg: 'bg-[#fdf4ff]', icon: 'text-[#9333ea]', border: 'border-[#e9d5ff]' },
  learning: { bg: 'bg-[#fff7ed]', icon: 'text-[#ea580c]', border: 'border-[#fed7aa]' },
  admissions: { bg: 'bg-[#fefce8]', icon: 'text-[#ca8a04]', border: 'border-[#fde68a]' },
  super: { bg: 'bg-[#fff1f2]', icon: 'text-[#e11d48]', border: 'border-[#fecdd3]' },
};

function WorkspaceCard({
  workspace,
  onSelect,
  isLoading,
}: {
  workspace: Workspace;
  onSelect: (w: Workspace) => void;
  isLoading: boolean;
}) {
  const entry = getRoleEntry(workspace.name);
  const Icon = ROLE_ICONS[entry.icon] ?? BookOpen;
  const colors = ROLE_COLORS[entry.icon] ?? ROLE_COLORS.academic;

  return (
    <button
      onClick={() => onSelect(workspace)}
      disabled={isLoading}
      className="group w-full flex items-center gap-4 p-4 bg-white border border-[#ebebeb] rounded-[14px] hover:border-[#335cff] hover:shadow-[0_0_0_3px_rgba(51,92,255,0.08)] transition-all duration-200 text-left disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
    >
      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-[12px] flex items-center justify-center shrink-0 border ${colors.bg} ${colors.border}`}
      >
        <Icon className={`w-5 h-5 ${colors.icon}`} />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-semibold text-[#0b0b0b] truncate">{entry.label}</p>
        <p className="text-[12px] text-[#808080] mt-0.5 leading-relaxed line-clamp-2">
          {entry.description}
        </p>
      </div>

      {/* Arrow */}
      <ChevronRight className="w-4 h-4 text-[#c0c0c0] group-hover:text-[#335cff] transition-colors shrink-0" />
    </button>
  );
}

export function WorkspaceSelectorView() {
  const { user, availableWorkspaces, logout } = useAuthSession();
  const selectWorkspace = useSelectWorkspace();

  const workspaces: Workspace[] = availableWorkspaces ?? [];
  const initials = (user?.name ?? user?.email ?? '?')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8faff] via-[#f0f4ff] to-[#fafafa] flex items-center justify-center p-4">
      {/* Card */}
      <div className="w-full max-w-[440px] bg-white border border-[#ebebeb] rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] overflow-hidden">

        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-[#f5f5f5]">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#335cff] flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="text-[15px] font-bold text-[#0b0b0b] tracking-tight">CampusOS</span>
          </div>

          {/* User info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#335cff] to-[#6366f1] flex items-center justify-center text-white text-[13px] font-bold shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-[14px] font-semibold text-[#0b0b0b] truncate">
                {user?.name ?? 'Welcome back'}
              </p>
              <p className="text-[12px] text-[#808080] truncate">{user?.email}</p>
            </div>
          </div>

          <div className="mt-5">
            <h1 className="text-[22px] font-bold text-[#0b0b0b] leading-tight tracking-tight">
              Choose a workspace
            </h1>
            <p className="text-[13px] text-[#808080] mt-1">
              You have access to {workspaces.length} workspaces. Select one to continue.
            </p>
          </div>
        </div>

        {/* Workspace list */}
        <div className="px-6 py-5 flex flex-col gap-3">
          {workspaces.length === 0 ? (
            <div className="py-6 text-center text-[13px] text-[#808080]">
              No workspaces found. Contact your administrator.
            </div>
          ) : (
            workspaces.map((ws) => (
              <WorkspaceCard
                key={ws.id}
                workspace={ws}
                onSelect={(w) => selectWorkspace.mutate(w)}
                isLoading={selectWorkspace.isPending}
              />
            ))
          )}

          {selectWorkspace.isPending && (
            <div className="flex items-center justify-center gap-2 py-2 text-[13px] text-[#335cff]">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Loading your workspace…</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button
            onClick={() => logout('/login')}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-[10px] border border-[#ebebeb] text-[13px] font-medium text-[#808080] hover:text-[#0b0b0b] hover:border-[#d0d0d0] hover:bg-[#fafafa] transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
