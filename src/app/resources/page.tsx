import { ResourcesView } from '@/features/resources/resources-view';

export const metadata = {
  title: 'Resources & Venues | Academic Planner',
  description: 'Manage physical lecture halls, virtual rooms, and laboratory equipment.',
};

export default function ResourcesPage() {
  return <ResourcesView />;
}
