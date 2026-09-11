import { Suspense } from 'react';
import type { Metadata } from 'next';
import { PlanningHomeView } from '@/features/planning-home/planning-home-view';

export const metadata: Metadata = {
  title: 'Planning Home – CampusOS Academic Planning',
  description:
    'Academic Planning Administrator home view. Manage baselines, course offerings, timetables, and period workflows.',
};

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <PlanningHomeView />
    </Suspense>
  );
}
