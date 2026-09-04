export function CoinIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="coinGrad" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#fff6d6" />
          <stop offset="45%" stopColor="#ffd25c" />
          <stop offset="100%" stopColor="#b9781a" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="14" fill="url(#coinGrad)" stroke="#7a4d10" strokeWidth="1.4" />
      <circle cx="16" cy="16" r="10.5" fill="none" stroke="#8a5a1c" strokeWidth="1.1" opacity="0.7" />
      <text
        x="16"
        y="21.5"
        textAnchor="middle"
        fontSize="15"
        fontFamily="Cinzel, serif"
        fontWeight="700"
        fill="#7a4d10"
      >
        $
      </text>
    </svg>
  );
}

export function GemIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="gemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#eafcff" />
          <stop offset="45%" stopColor="#7fe3ea" />
          <stop offset="100%" stopColor="#1c8fa8" />
        </linearGradient>
      </defs>
      <polygon
        points="16,3 27,12 21,29 11,29 5,12"
        fill="url(#gemGrad)"
        stroke="#0c5d70"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <polygon points="16,3 27,12 16,14 5,12" fill="#c8fbff" opacity="0.55" />
      <polygon points="16,14 21,29 11,29" fill="#0f6c82" opacity="0.35" />
    </svg>
  );
}

export function HeartIcon({ className = "", filled = true }: { className?: string; filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 21s-6.6-4.2-9.3-8.2C.9 9.9 1.8 6.4 5 5.1c2-.8 4 0 5 1.8 1-1.8 3-2.6 5-1.8 3.2 1.3 4.1 4.8 2.3 7.7C18.6 16.8 12 21 12 21z"
        fill={filled ? "#e8425a" : "none"}
        stroke={filled ? "#7a0f1f" : "#6b6559"}
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      {filled && <path d="M6 7.4c1-.9 2.6-.9 3.6.2" stroke="#ff9fae" strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.8" />}
    </svg>
  );
}

export function LockIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="5" y="10.5" width="14" height="10" rx="2" fill="#2b271f" stroke="#c9b98a" strokeWidth="1.1" />
      <path
        d="M7.5 10.5V8a4.5 4.5 0 0 1 9 0v2.5"
        fill="none"
        stroke="#c9b98a"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="15" r="1.6" fill="#c9b98a" />
      <rect x="11.3" y="15.6" width="1.4" height="3" fill="#c9b98a" />
    </svg>
  );
}

export function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#f3cf7a" stroke="#7a4d10" strokeWidth="1.2" />
      <path d="M6.5 12.3l3.6 3.6 7.4-8" fill="none" stroke="#4a2a0a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GearIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M12 2.8l1 2.3 2.5-.5 1 2.3-1.9 1.7.4 2.4 2.2 1-.4 2.5-2.5.3-1.2 2.2-2.4-.7-1.7 1.9-2.3-1 .5-2.5-1.9-1.6.7-2.4-1.9-1.7 1-2.3 2.5.3 1.6-1.9 2.4.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
        opacity="0.0"
      />
      <path
        d="M12 4V2.2M12 21.8V20M20 12h1.8M2.2 12H4M17.7 6.3l1.3-1.3M5 19l1.3-1.3M17.7 17.7l1.3 1.3M5 5l1.3 1.3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PlusIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export function ScrollIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="6" y="8" width="20" height="17" rx="1.5" fill="#e9d3a1" stroke="#7a4d10" strokeWidth="1" />
      <rect x="6" y="8" width="20" height="17" rx="1.5" fill="none" stroke="#b9862f" strokeWidth="0.6" transform="translate(0,1)" />
      <circle cx="6" cy="9" r="2.6" fill="#f3cf7a" stroke="#7a4d10" strokeWidth="1" />
      <circle cx="26" cy="24" r="2.6" fill="#f3cf7a" stroke="#7a4d10" strokeWidth="1" />
      <line x1="10" y1="13" x2="22" y2="13" stroke="#7a4d10" strokeWidth="1" opacity="0.6" />
      <line x1="10" y1="17" x2="22" y2="17" stroke="#7a4d10" strokeWidth="1" opacity="0.6" />
      <line x1="10" y1="21" x2="18" y2="21" stroke="#7a4d10" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}
