import { DashboardStub } from '@/features/shared/dashboard-stub';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Super Admin – CampusOS',
  description: 'Platform-wide configuration, users, and system settings.',
};

export default function SuperAdminPage() {
  return (
    <DashboardStub
      dashboardName="Super Admin"
      description="Platform-wide configuration, user management, role assignments, system settings, and audit logs."
      icon="super"
      accentColor="#e11d48"
      features={[
        'User Management',
        'Role & Permission Config',
        'Institution Settings',
        'Audit Logs',
        'System Health',
        'Feature Flags',
      ]}
    />
  );
}
