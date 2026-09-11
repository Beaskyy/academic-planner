import { Suspense } from 'react';
import type { Metadata } from 'next';
import { StructuresView } from '@/features/structures/structures-view';

export const metadata: Metadata = {
  title: 'Academic Structures – CampusOS Academic Planning',
  description:
    'Academic Structures Browser and Editor. Manage faculty, department, and programme hierarchies.',
};

export default function StructuresPage() {
  return (
    <Suspense fallback={null}>
      <StructuresView />
    </Suspense>
  );
}
