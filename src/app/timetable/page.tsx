import { TimetableView } from '@/features/timetable/timetable-view';

export const metadata = {
  title: 'Teaching Timetable & Schedule | Academic Planner',
  description: 'Manage master timetable schedules, conflict resolution, dated exceptions, and impact assessments.',
};

export default function TimetablePage() {
  return <TimetableView />;
}
