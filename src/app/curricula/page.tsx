import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { CurriculaView } from '@/features/curricula/curricula-view';

export const metadata: Metadata = {
  title: 'Curricula & Rules | Academic Planning | ODEL University',
  description: 'Manage programme curricula versions, course mappings, cohort migration, and academic rules.',
};

export default function CurriculaPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fafafa] flex items-center justify-center text-[#808080] text-sm">
          Loading Curricula &amp; Rules...
        </div>
      }
    >
      <CurriculaView />
    </Suspense>
  );
}
