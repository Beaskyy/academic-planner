import { CapabilitySummary } from '@/features/auth/components/capability-summary';

export const metadata = {
  title: 'Confirm Academic Planning Access | CampusOS',
  description: 'Review active school, timezone, role, and effective capabilities before entering the workspace.',
};

export default function ContextSelectorPage() {
  return <CapabilitySummary />;
}
