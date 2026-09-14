/**
 * Role-to-Dashboard Route Mapper
 *
 * Maps API role names (from active_role.name or workspace.name)
 * to the corresponding Next.js base route for that dashboard.
 *
 * Covers all 21 QA roles and fallback patterns.
 */

export type DashboardRoute =
  | '/'
  | '/student'
  | '/student-admin'
  | '/learning-admin'
  | '/admissions'
  | '/super-admin';

export interface RoleRouteEntry {
  route: DashboardRoute;
  label: string;
  description: string;
  /** Icon identifier used by the workspace selector UI */
  icon: 'academic' | 'student' | 'student-admin' | 'learning' | 'admissions' | 'super';
}

export const DASHBOARD_METADATA: Record<DashboardRoute, RoleRouteEntry> = {
  '/': {
    route: '/',
    label: 'Academic Planner',
    description: 'Manage course offerings, timetables, and academic periods.',
    icon: 'academic',
  },
  '/student': {
    route: '/student',
    label: 'Student Portal',
    description: 'View results, pay fees, and register for courses.',
    icon: 'student',
  },
  '/student-admin': {
    route: '/student-admin',
    label: 'Student Administration',
    description: 'Manage student records, enrolment, fees, and academic standing.',
    icon: 'student-admin',
  },
  '/learning-admin': {
    route: '/learning-admin',
    label: 'Learning Administrator',
    description: 'Oversee learning content, curricula, and assessments.',
    icon: 'learning',
  },
  '/admissions': {
    route: '/admissions',
    label: 'Admissions Admin',
    description: 'Process applications, offers, and onboarding workflows.',
    icon: 'admissions',
  },
  '/super-admin': {
    route: '/super-admin',
    label: 'Super Admin',
    description: 'Platform-wide configuration, users, and system settings.',
    icon: 'super',
  },
};

/**
 * Exact mapping of canonical QA role names to their primary dashboard route.
 */
const EXACT_ROLE_ROUTE_MAP: Record<string, DashboardRoute> = {
  // Student Portal
  student: '/student',
  'student portal': '/student',
  student_portal: '/student',

  // Admissions
  applicant: '/admissions',
  admissions: '/admissions',
  admissions_admin: '/admissions',
  'admissions admin': '/admissions',
  'admissions-admin': '/admissions',

  // Super Admin
  'it-support': '/super-admin',
  'it-lead': '/super-admin',
  itsupport: '/super-admin',
  itlead: '/super-admin',
  super_admin: '/super-admin',
  'super admin': '/super-admin',
  'super-admin': '/super-admin',
  superadmin: '/super-admin',

  // Student Administration
  registrar: '/student-admin',
  bursar: '/student-admin',
  non_academic_staff: '/student-admin',
  'non-academic-staff': '/student-admin',
  student_admin: '/student-admin',
  'student admin': '/student-admin',
  'student-admin': '/student-admin',
  'student administration': '/student-admin',
  'finance-fee-configurator': '/student-admin',
  'finance-billing-officer': '/student-admin',
  'finance-approver': '/student-admin',
  'finance-payment-operations': '/student-admin',
  'finance-reconciliation-officer': '/student-admin',
  'finance-reconciliation-approver': '/student-admin',
  'finance-settlement-officer': '/student-admin',
  'finance-auditor': '/student-admin',

  // Learning Admin
  learning_admin: '/learning-admin',
  'learning admin': '/learning-admin',
  'learning-admin': '/learning-admin',
  'learning administrator': '/learning-admin',
  learning: '/learning-admin',

  // Academic Planner
  lecturer: '/',
  academic_staff: '/',
  'academic staff': '/',
  'academic-staff': '/',
  hod: '/',
  dvc: '/',
  vc: '/',
  academic_planner: '/',
  'academic planner': '/',
  academic: '/',
  planner: '/',
};

/**
 * Returns the dashboard route and metadata for a given role name.
 */
export function getRoleEntry(roleName: string): RoleRouteEntry {
  const normalised = (roleName ?? '').toLowerCase().trim();

  // 1. Direct exact lookup
  if (EXACT_ROLE_ROUTE_MAP[normalised]) {
    return DASHBOARD_METADATA[EXACT_ROLE_ROUTE_MAP[normalised]];
  }

  // 2. Pattern matching for compound names
  if (normalised.startsWith('finance-') || normalised.includes('finance')) {
    return DASHBOARD_METADATA['/student-admin'];
  }
  if (normalised.includes('student') && (normalised.includes('admin') || normalised.includes('manage'))) {
    return DASHBOARD_METADATA['/student-admin'];
  }
  if (normalised === 'student' || normalised.includes('student')) {
    return DASHBOARD_METADATA['/student'];
  }
  if (normalised.includes('admission') || normalised.includes('applicant')) {
    return DASHBOARD_METADATA['/admissions'];
  }
  if (normalised.includes('super') || normalised.includes('it-')) {
    return DASHBOARD_METADATA['/super-admin'];
  }
  if (normalised.includes('learning')) {
    return DASHBOARD_METADATA['/learning-admin'];
  }

  // Default fallback — Academic Planner
  return DASHBOARD_METADATA['/'];
}

/**
 * Shorthand — returns just the route string.
 */
export function getRoleDashboardRoute(roleName: string): DashboardRoute {
  return getRoleEntry(roleName).route;
}

/**
 * Returns whether a role belongs to the Academic Planner app.
 */
export function isAcademicPlannerRole(roleName: string): boolean {
  return getRoleDashboardRoute(roleName) === '/';
}

/**
 * Academic Planner specific route prefixes that must be guarded from non-planner roles.
 */
export const ACADEMIC_PLANNER_ROUTES = [
  '/courses',
  '/calendar',
  '/offerings',
  '/approvals',
  '/audit',
  '/curricula',
  '/publication',
  '/requirements-completion',
  '/resources',
  '/structures',
  '/timetable',
  '/context-selector',
];

/**
 * Checks if a given role is permitted to access a given URL pathname.
 */
export function isRoleAllowedForRoute(roleName: string, pathname: string): boolean {
  const userDashboard = getRoleDashboardRoute(roleName);

  // If user is trying to access another dashboard root
  if (pathname.startsWith('/student') && pathname !== '/student-admin' && userDashboard !== '/student') {
    return false;
  }
  if (pathname.startsWith('/student-admin') && userDashboard !== '/student-admin') {
    return false;
  }
  if (pathname.startsWith('/learning-admin') && userDashboard !== '/learning-admin') {
    return false;
  }
  if (pathname.startsWith('/admissions') && userDashboard !== '/admissions') {
    return false;
  }
  if (pathname.startsWith('/super-admin') && userDashboard !== '/super-admin') {
    return false;
  }

  // If user is trying to access Academic Planner routes (root or sub-routes)
  const isAcademicRoute =
    pathname === '/' || ACADEMIC_PLANNER_ROUTES.some((prefix) => pathname.startsWith(prefix));

  if (isAcademicRoute && userDashboard !== '/') {
    return false;
  }

  return true;
}

/**
 * Returns all route prefixes that exist (for middleware pattern matching).
 */
export const ALL_DASHBOARD_ROUTES: DashboardRoute[] = [
  '/',
  '/student',
  '/student-admin',
  '/learning-admin',
  '/admissions',
  '/super-admin',
];
