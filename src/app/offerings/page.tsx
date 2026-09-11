import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { OfferingsView } from '@/features/offerings/offerings-view';

export const metadata: Metadata = {
  title: 'Course Offerings & Assignments | Academic Planning | ODEL University',
  description: 'Manage section course offerings, faculty teaching assignments, delivery modes, and capacity.',
};

export default function OfferingsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fafafa] flex items-center justify-center text-[#808080] text-sm">
          Loading Offerings &amp; Assignments...
        </div>
      }
    >
      <OfferingsView />
    </Suspense>
  );
}
