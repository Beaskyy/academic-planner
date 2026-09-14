import { DashboardStub } from '@/features/shared/dashboard-stub';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Learning Administrator – CampusOS',
  description: 'Oversee learning content, curricula, and assessments.',
};

export default function LearningAdminPage() {
  return (
    <DashboardStub
      dashboardName="Learning Administrator"
      description="Oversee learning content, curricula design, assessment frameworks, and course delivery quality."
      icon="learning"
      accentColor="#ea580c"
      features={[
        'Curricula Management',
        'Content Library',
        'Assessment Builder',
        'Learning Outcomes',
        'Quality Assurance',
        'Analytics',
      ]}
    />
  );
}
