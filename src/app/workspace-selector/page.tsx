import { Suspense } from 'react';
import type { Metadata } from 'next';
import { WorkspaceSelectorView } from '@/features/auth/workspace-selector-view';

export const metadata: Metadata = {
  title: 'Choose Workspace – CampusOS',
  description: 'Select a workspace to continue to your CampusOS dashboard.',
};

export default function WorkspaceSelectorPage() {
  return (
    <Suspense fallback={null}>
      <WorkspaceSelectorView />
    </Suspense>
  );
}
