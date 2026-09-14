import type { Metadata } from 'next';
import { DashboardStub } from '@/features/shared/dashboard-stub';

export const metadata: Metadata = {
  title: 'Student Portal – CampusOS',
  description: 'View results, pay fees, and register for courses.',
};

export default function StudentPortalPage() {
  return (
    <DashboardStub
      dashboardName="Student Portal"
      description="View your results and grades, pay school fees, register courses, and manage your academic journey."
      icon="student"
      accentColor="#16a34a"
      features={[
        'Course Registration',
        'Results & Grades',
        'Fee Payment',
        'Academic Transcript',
        'Timetable',
        'Notifications',
      ]}
    />
  );
}
