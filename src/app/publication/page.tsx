import { PublicationView } from '@/features/publication/publication-view';

export const metadata = {
  title: 'Publication & Version History | Academic Planner',
  description: 'Version history, downstream event delivery status, and release tracking.',
};

export default function PublicationPage() {
  return <PublicationView initialTab="versions" />;
}
