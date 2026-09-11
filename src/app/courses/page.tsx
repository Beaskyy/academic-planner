import { Suspense } from 'react';
import type { Metadata } from 'next';
import { CoursesView } from '@/features/courses/courses-view';

export const metadata: Metadata = {
  title: 'Course Catalogue – CampusOS Academic Planning',
  description:
    'Course Catalogue Browser and Editor. Manage courses, credit weights, delivery modes, and syllabus versions.',
};

export default function CoursesPage() {
  return (
    <Suspense fallback={null}>
      <CoursesView />
    </Suspense>
  );
}
