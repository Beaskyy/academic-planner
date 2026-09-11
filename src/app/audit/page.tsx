import { PublicationView } from '@/features/publication/publication-view';

export const metadata = {
  title: 'Audit Trail & Logs | Academic Planner',
  description: 'Immutable system audit logs, change history, and governance records.',
};

export default function AuditPage() {
  return <PublicationView initialTab="audit" />;
}
