import { Suspense } from 'react';
import type { Metadata } from 'next';
import { CalendarView } from '@/features/calendar/calendar-view';

export const metadata: Metadata = {
  title: 'Academic Calendar – CampusOS Academic Planning',
  description:
    'Academic Sessions and Calendar Manager. Timeline visualizer, period milestones, and change impact previews.',
};

export default function CalendarPage() {
  return (
    <Suspense fallback={null}>
      <CalendarView />
    </Suspense>
  );
}
