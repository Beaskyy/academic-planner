import type { Metadata } from 'next';
import { DashboardStub } from '@/features/shared/dashboard-stub';

export const metadata: Metadata = {
  title: 'Student Administration – CampusOS',
  description: 'Manage student records, enrolment, and academic standing.',
};

export default function StudentAdminPage() {
  return (
    <DashboardStub
      dashboardName="Student Administration"
      description="Manage student records, enrolment workflows, academic standing, and institutional reporting."
      icon="student-admin"
      accentColor="#9333ea"
      features={[
        'Student Records',
        'Enrolment Management',
        'Academic Standing',
        'Deferrals & Withdrawals',
        'Reporting',
        'Communications',
      ]}
    />
  );
}
