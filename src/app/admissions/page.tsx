import { DashboardStub } from '@/features/shared/dashboard-stub';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admissions Admin – CampusOS',
  description: 'Process applications, offers, and onboarding workflows.',
};

export default function AdmissionsAdminPage() {
  return (
    <DashboardStub
      dashboardName="Admissions Admin"
      description="Process applications, issue offers, manage onboarding workflows, and track prospective student pipelines."
      icon="admissions"
      accentColor="#ca8a04"
      features={[
        'Application Review',
        'Offer Management',
        'Onboarding Workflows',
        'Applicant Pipeline',
        'Document Verification',
        'Reporting',
      ]}
    />
  );
}
