import { GraduationCap } from 'lucide-react';

/**
 * Purple rounded-square icon displayed in the centre of the default sign-in card.
 * Matches the 48×48 LogoCircle node in Figma (aps-sign-in → LoginCard → LogoHeader).
 */
export function CampusAppIcon() {
  return (
    <div
      className="w-12 h-12 flex items-center justify-center shadow-sm"
      style={{
        background: 'linear-gradient(145deg, #9B6FF8 0%, #7C3AED 100%)',
        borderRadius: '14px',
      }}
      aria-hidden="true"
    >
      <GraduationCap className="w-6 h-6 text-white" strokeWidth={1.5} />
    </div>
  );
}

/**
 * Top-left CampusOS nav logo shown in error / expired / no-access states.
 * Matches the 139×32 Logo frame in Figma (aps-sign-in-error → Frame → Logo).
 * Icon is a stylised snowflake brand mark; wordmark is "CampusOS".
 */
export function CampusNavLogo() {
  return (
    <a
      href="/login"
      className="inline-flex items-center gap-2.5 no-underline select-none"
      aria-label="CampusOS — return to sign-in"
    >
      {/* 32×32 brand mark */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Vertical arm */}
        <line x1="16" y1="3" x2="16" y2="29" stroke="#1E40AF" strokeWidth="2.5" strokeLinecap="round" />
        {/* 60° arm (top-right → bottom-left) */}
        <line x1="28" y1="9.5" x2="4" y2="22.5" stroke="#1E40AF" strokeWidth="2.5" strokeLinecap="round" />
        {/* 120° arm (top-left → bottom-right) */}
        <line x1="4" y1="9.5" x2="28" y2="22.5" stroke="#1E40AF" strokeWidth="2.5" strokeLinecap="round" />
        {/* Branches — top */}
        <line x1="16" y1="7" x2="12.5" y2="10.5" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="7" x2="19.5" y2="10.5" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round" />
        {/* Branches — bottom */}
        <line x1="16" y1="25" x2="12.5" y2="21.5" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="25" x2="19.5" y2="21.5" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round" />
        {/* Branches — top-right */}
        <line x1="25" y1="11.5" x2="22" y2="13" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round" />
        <line x1="25" y1="11.5" x2="24" y2="14.5" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round" />
        {/* Branches — bottom-right */}
        <line x1="25" y1="20.5" x2="22" y2="19" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round" />
        <line x1="25" y1="20.5" x2="24" y2="17.5" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round" />
        {/* Branches — top-left */}
        <line x1="7" y1="11.5" x2="10" y2="13" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round" />
        <line x1="7" y1="11.5" x2="8" y2="14.5" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round" />
        {/* Branches — bottom-left */}
        <line x1="7" y1="20.5" x2="10" y2="19" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round" />
        <line x1="7" y1="20.5" x2="8" y2="17.5" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round" />
      </svg>

      {/* Wordmark */}
      <span className="text-[#0F172A] font-bold text-[22px] leading-none tracking-[-0.4px]">
        CampusOS
      </span>
    </a>
  );
}
