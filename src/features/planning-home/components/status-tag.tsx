import React from 'react';

export type StatusTagVariant =
  | 'published'
  | 'in-review'
  | 'mixed'
  | 'unresolved'
  | 'action-req'
  | 'draft'
  | 'in-progress'
  | 'returned'
  | 'draft-required'
  | 'blocked'
  | 'urgent'
  | 'live'
  | 'ready'
  | 'pending'
  | 'superseded'
  | 'inactive';

interface StatusTagProps {
  label: string;
  variant?: StatusTagVariant;
  className?: string;
}

const variantStyles: Record<StatusTagVariant, { bg: string; text: string }> = {
  published: { bg: '#e0faec', text: '#1fc16b' },
  'in-review': { bg: '#ffd9c0', text: '#71330a' },
  mixed: { bg: '#f0f8ff', text: '#046aff' },
  unresolved: { bg: '#fef0f0', text: '#dc2626' },
  'action-req': { bg: '#ffd9c0', text: '#71330a' },
  draft: { bg: '#f0f8ff', text: '#046aff' },
  'in-progress': { bg: '#ffd9c0', text: '#71330a' },
  returned: { bg: '#fef0f0', text: '#dc2626' },
  'draft-required': { bg: '#f0f8ff', text: '#046aff' },
  blocked: { bg: '#fef0f0', text: '#dc2626' },
  urgent: { bg: '#fef0f0', text: '#dc2626' },
  live: { bg: '#e0faec', text: '#1fc16b' },
  ready: { bg: '#e0faec', text: '#1fc16b' },
  pending: { bg: '#ffd9c0', text: '#71330a' },
  superseded: { bg: '#ebebeb', text: '#5c5c5c' },
  inactive: { bg: '#f5f5f5', text: '#808080' },
};

/**
 * Pixel-accurate Status Tag matching the Figma 2 — Planning Home specifications:
 * 6px border-radius, 8px horizontal / 4px vertical padding, 11px uppercase Inter SemiBold, 0.5px letter spacing.
 */
export function StatusTag({ label, variant = 'published', className = '' }: StatusTagProps) {
  const style = variantStyles[variant] || variantStyles.published;

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-[6px] text-[11px] font-semibold tracking-[0.5px] uppercase whitespace-nowrap select-none shrink-0 ${className}`}
      style={{
        backgroundColor: style.bg,
        color: style.text,
      }}
    >
      {label}
    </span>
  );
}
