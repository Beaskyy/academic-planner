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
  LogOut,
  User,
  Users,
  CreditCard,
  FileText,
  Award,
  BarChart3,
  Settings,
  Activity,
  Sliders,
  ClipboardList,
  FileCheck,
  ArrowLeftRight,
  type LucideIcon,
} from 'lucide-react';
import { useAuthSession } from '@/hooks/use-auth';
import { getRoleEntry } from '@/lib/role-router';

export type DashboardCategory = 'academic' | 'student' | 'student-admin' | 'learning' | 'admissions' | 'super';

interface NavItemConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
  badge?: string;
}

interface DashboardNavConfig {
  workspaceTitle: string;
  defaultRole: string;
  accentColor: string;
  accentBg: string;
  accentLight: string;
  items: NavItemConfig[];
}

const DASHBOARD_CONFIGS: Record<DashboardCategory, DashboardNavConfig> = {
  academic: {
    workspaceTitle: 'Academic Planning',
    defaultRole: 'Academic Planning Admin',
    accentColor: '#046aff',
    accentBg: '#f0f8ff',
    accentLight: '#e0f2fe',
    items: [
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
    ],
  },
  student: {
    workspaceTitle: 'Student Portal',
    defaultRole: 'Student',
    accentColor: '#16a34a',
    accentBg: '#f0fdf4',
    accentLight: '#dcfce7',
    items: [
      { id: 'home', label: 'Portal Home', icon: Home, href: '/student' },
      { id: 'courses', label: 'Course Registration', icon: BookOpen, href: '/student#courses' },
      { id: 'grades', label: 'Results & Grades', icon: Award, href: '/student#grades' },
      { id: 'fees', label: 'Fee Payments', icon: CreditCard, href: '/student#fees' },
      { id: 'timetable', label: 'Timetable', icon: Calendar, href: '/student#timetable' },
      { id: 'transcript', label: 'Academic Transcript', icon: FileText, href: '/student#transcript' },
      { id: 'profile', label: 'Student Profile', icon: User, href: '/student#profile' },
    ],
  },
  'student-admin': {
    workspaceTitle: 'Student Administration',
    defaultRole: 'Student Administrator',
    accentColor: '#9333ea',
    accentBg: '#faf5ff',
    accentLight: '#f3e8ff',
    items: [
      { id: 'home', label: 'Admin Overview', icon: Home, href: '/student-admin' },
      { id: 'records', label: 'Student Records', icon: Users, href: '/student-admin#records' },
      { id: 'enrolments', label: 'Enrolments & Deferrals', icon: UserCheck, href: '/student-admin#enrolments' },
      { id: 'finance', label: 'Fee Billing & Finance', icon: CreditCard, href: '/student-admin#finance' },
      { id: 'standing', label: 'Academic Standing', icon: Award, href: '/student-admin#standing' },
      { id: 'graduation', label: 'Clearances & Graduation', icon: GraduationCap, href: '/student-admin#graduation' },
      { id: 'reports', label: 'Institutional Reports', icon: BarChart3, href: '/student-admin#reports' },
    ],
  },
  learning: {
    workspaceTitle: 'Learning Administration',
    defaultRole: 'Learning Administrator',
    accentColor: '#ea580c',
    accentBg: '#fff7ed',
    accentLight: '#ffedd5',
    items: [
      { id: 'home', label: 'Learning Overview', icon: Home, href: '/learning-admin' },
      { id: 'curricula', label: 'Curricula Management', icon: Scale, href: '/learning-admin#curricula' },
      { id: 'content', label: 'Content Library', icon: BookOpen, href: '/learning-admin#content' },
      { id: 'assessments', label: 'Assessment Builder', icon: ClipboardCheck, href: '/learning-admin#assessments' },
      { id: 'outcomes', label: 'Learning Outcomes', icon: Award, href: '/learning-admin#outcomes' },
      { id: 'qa', label: 'Quality Assurance', icon: ShieldCheck, href: '/learning-admin#qa' },
      { id: 'analytics', label: 'Learning Analytics', icon: BarChart3, href: '/learning-admin#analytics' },
    ],
  },
  admissions: {
    workspaceTitle: 'Admissions Admin',
    defaultRole: 'Admissions Officer',
    accentColor: '#ca8a04',
    accentBg: '#fefce8',
    accentLight: '#fef9c3',
    items: [
      { id: 'home', label: 'Admissions Overview', icon: Home, href: '/admissions' },
      { id: 'applications', label: 'Application Review', icon: ClipboardList, href: '/admissions#applications' },
      { id: 'pipeline', label: 'Applicant Pipeline', icon: Users, href: '/admissions#pipeline' },
      { id: 'offers', label: 'Offer Management', icon: FileCheck, href: '/admissions#offers' },
      { id: 'documents', label: 'Document Verification', icon: FileText, href: '/admissions#documents' },
      { id: 'onboarding', label: 'Onboarding Workflows', icon: UserCheck, href: '/admissions#onboarding' },
      { id: 'reports', label: 'Admissions Reports', icon: BarChart3, href: '/admissions#reports' },
    ],
  },
  super: {
    workspaceTitle: 'Super Admin',
    defaultRole: 'System Administrator',
    accentColor: '#e11d48',
    accentBg: '#fff1f2',
    accentLight: '#ffe4e6',
    items: [
      { id: 'home', label: 'System Overview', icon: Home, href: '/super-admin' },
      { id: 'users', label: 'User Management', icon: Users, href: '/super-admin#users' },
      { id: 'roles', label: 'Roles & Permissions', icon: ShieldCheck, href: '/super-admin#roles' },
      { id: 'settings', label: 'Institution Settings', icon: Settings, href: '/super-admin#settings' },
      { id: 'audit', label: 'Security & Audit Logs', icon: Shield, href: '/super-admin#audit' },
      { id: 'health', label: 'System Health & Metrics', icon: Activity, href: '/super-admin#health' },
      { id: 'features', label: 'Feature Flags', icon: Sliders, href: '/super-admin#features' },
    ],
  },
};

function formatRoleLabel(raw: string): string {
  if (!raw) return 'Authenticated User';
  return raw
    .replace(/[_-]/g, ' ')
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

function resolveDashboardCategory(pathname: string, roleName?: string): DashboardCategory {
  if (pathname.startsWith('/student') && !pathname.startsWith('/student-admin')) return 'student';
  if (pathname.startsWith('/student-admin')) return 'student-admin';
  if (pathname.startsWith('/learning-admin')) return 'learning';
  if (pathname.startsWith('/admissions')) return 'admissions';
  if (pathname.startsWith('/super-admin')) return 'super';

  const entry = getRoleEntry(roleName || '');
  return entry.icon;
}

interface SharedSidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  minimalContext?: boolean;
  activeItem?: string;
  categoryOverride?: DashboardCategory;
}

export function SharedSidebar({
  mobileOpen = false,
  onCloseMobile,
  minimalContext = false,
  activeItem,
  categoryOverride,
}: SharedSidebarProps) {
  const pathname = usePathname();
  const { user, activeRole, availableWorkspaces, logout } = useAuthSession();

  const roleRaw = activeRole?.name || '';
  const currentCategory = categoryOverride || resolveDashboardCategory(pathname, roleRaw);
  const config = DASHBOARD_CONFIGS[currentCategory] || DASHBOARD_CONFIGS.academic;

  const roleFormatted = roleRaw ? formatRoleLabel(roleRaw) : config.defaultRole;
  const hasMultipleWorkspaces = (availableWorkspaces?.length ?? 0) > 1;

  const isItemActive = (item: NavItemConfig) => {
    if (activeItem) {
      return activeItem === item.id;
    }
    if (item.href === '/' || item.href === '/student' || item.href === '/student-admin' || item.href === '/learning-admin' || item.href === '/admissions' || item.href === '/super-admin') {
      return pathname === item.href;
    }
    const cleanHref = item.href.split('#')[0];
    return pathname.startsWith(cleanHref);
  };

  const sidebarContent = (
    <div className="flex flex-col gap-6 p-4 w-[280px] h-full overflow-y-auto select-none justify-between">
      <div className="flex flex-col gap-6">
        {/* Mobile close button header */}
        <div className="flex items-center justify-between lg:hidden pb-2 border-b border-[#f5f5f5]">
          <span className="font-semibold text-sm text-[#1f1f1f]">Navigation Menu</span>
          <button
            onClick={onCloseMobile}
            className="p-1 rounded-md text-[#808080] hover:text-[#1f1f1f] hover:bg-[#f5f5f5] transition-colors cursor-pointer"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Resolved Context Card */}
        <div className="bg-[#fafafa] border border-[#f0f0f0] rounded-[16px] p-4 flex flex-col gap-3 shrink-0">
          {/* Row 1: School */}
          <div className="flex items-center gap-2.5 w-full">
            <div
              className="w-4 h-4 flex items-center justify-center shrink-0"
              style={{ color: config.accentColor }}
            >
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
            <div
              className="w-4 h-4 flex items-center justify-center shrink-0"
              style={{ color: config.accentColor }}
            >
              <Briefcase className="w-4 h-4" />
            </div>
            <div className="flex flex-col gap-[2px] min-w-0 flex-1">
              <span className="text-[11px] font-medium text-[#808080] uppercase tracking-wide">
                Workspace
              </span>
              <span className="text-[13px] font-semibold text-[#1f1f1f] truncate">
                {config.workspaceTitle}
              </span>
            </div>
          </div>

          {!minimalContext && (
            <>
              {/* Row 3: Role */}
              <div className="flex items-center gap-2.5 w-full">
                <div
                  className="w-4 h-4 flex items-center justify-center shrink-0"
                  style={{ color: config.accentColor }}
                >
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="flex flex-col gap-[2px] min-w-0 flex-1">
                  <span className="text-[11px] font-medium text-[#808080] uppercase tracking-wide">
                    Role
                  </span>
                  <span className="text-[13px] font-semibold text-[#1f1f1f] truncate">
                    {roleFormatted}
                  </span>
                </div>
              </div>

              {/* Row 4: Timezone */}
              <div className="flex items-center gap-2.5 w-full">
                <div
                  className="w-4 h-4 flex items-center justify-center shrink-0"
                  style={{ color: config.accentColor }}
                >
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

          {/* Multi-role Workspace Switcher Link */}
          {hasMultipleWorkspaces && (
            <Link
              href="/workspace-selector"
              className="mt-1 pt-2 border-t border-[#f0f0f0] flex items-center gap-1.5 text-[11px] font-semibold transition-colors hover:underline"
              style={{ color: config.accentColor }}
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span>Switch Workspace</span>
            </Link>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1 w-full" aria-label="Main Navigation">
          {config.items.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item);

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={onCloseMobile}
                style={
                  active
                    ? {
                        backgroundColor: config.accentBg,
                        color: config.accentColor,
                      }
                    : undefined
                }
                className={`flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-[13px] transition-colors ${
                  active
                    ? 'font-semibold'
                    : 'text-[#1f1f1f] font-medium hover:bg-[#f5f5f5]'
                }`}
              >
                <Icon
                  className="w-[18px] h-[18px] shrink-0"
                  style={active ? { color: config.accentColor } : { color: '#5c5c5c' }}
                />
                <span className="truncate flex-1">{item.label}</span>
                {item.badge && (
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: config.accentLight, color: config.accentColor }}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User profile & Logout footer */}
      <div className="pt-4 border-t border-[#f0f0f0] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs"
            style={{ backgroundColor: config.accentLight, color: config.accentColor }}
          >
            {user?.name ? user.name[0].toUpperCase() : <User className="w-4 h-4" />}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-[13px] font-semibold text-[#1f1f1f] truncate">
              {user?.name || user?.email?.split('@')[0] || 'Authenticated User'}
            </span>
            <span className="text-[11px] text-[#808080] truncate">
              {user?.email || 'Logged in'}
            </span>
          </div>
        </div>
        <button
          onClick={() => logout('/login')}
          className="p-1.5 rounded-lg text-[#808080] hover:text-[#ef4444] hover:bg-[#fef2f2] transition-colors cursor-pointer shrink-0"
          title="Sign out"
          aria-label="Sign out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
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
