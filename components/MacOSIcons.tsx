"use client";

// Squircle clip path matching macOS Big Sur icon shape
const SQUIRCLE = "M 27,0 L 73,0 C 95,0 100,5 100,27 L 100,73 C 100,95 95,100 73,100 L 27,100 C 5,100 0,95 0,73 L 0,27 C 0,5 5,0 27,0 Z";

interface IconProps { size?: number }

// ── FINDER (About) ─ two-tone face, exactly like real macOS Finder ──
export function FinderIcon({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <clipPath id="squircle-finder"><path d={SQUIRCLE} /></clipPath>
        <linearGradient id="finderBg" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6EC6F5" />
          <stop offset="100%" stopColor="#2B7FD4" />
        </linearGradient>
      </defs>
      <g clipPath="url(#squircle-finder)">
        {/* Background */}
        <rect width="100" height="100" fill="url(#finderBg)" />
        {/* Right darker half */}
        <rect x="50" width="50" height="100" fill="#1E60B8" opacity="0.6" />
        {/* Center divider line */}
        <rect x="49" width="2" height="100" fill="white" opacity="0.15" />

        {/* LEFT FACE */}
        {/* Head oval */}
        <ellipse cx="27" cy="50" rx="21" ry="26" fill="#3A90E8" />
        {/* Left eye (rect) */}
        <rect x="16" y="38" width="9" height="7" rx="3.5" fill="#1450A0" />
        {/* Right eye (rect) */}
        <rect x="29" y="38" width="9" height="7" rx="3.5" fill="#1450A0" />
        {/* Smile */}
        <path d="M17 57 Q27 66 37 57" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* RIGHT FACE */}
        {/* Head oval */}
        <ellipse cx="73" cy="50" rx="21" ry="26" fill="#1A5AAA" />
        {/* Left eye */}
        <rect x="62" y="38" width="9" height="7" rx="3.5" fill="#6EC6F5" />
        {/* Right eye */}
        <rect x="75" y="38" width="9" height="7" rx="3.5" fill="#6EC6F5" />
        {/* Smile */}
        <path d="M63 57 Q73 66 83 57" stroke="rgba(255,255,255,0.65)" strokeWidth="3" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

// ── BRIEFCASE (Experience) ─ orange, like Keynote/work app ──
export function BriefcaseIcon({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <clipPath id="squircle-brief"><path d={SQUIRCLE} /></clipPath>
        <linearGradient id="briefBg" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFBC42" />
          <stop offset="100%" stopColor="#E06B00" />
        </linearGradient>
      </defs>
      <g clipPath="url(#squircle-brief)">
        <rect width="100" height="100" fill="url(#briefBg)" />
        {/* Bag body */}
        <rect x="12" y="40" width="76" height="50" rx="9" fill="white" opacity="0.95" />
        {/* Handle arch */}
        <path d="M36 40 L36 29 Q36 18 50 18 Q64 18 64 29 L64 40"
          stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Latch */}
        <rect x="38" y="62" width="24" height="9" rx="4.5" fill="#E06B00" opacity="0.7" />
        {/* Horizontal seam */}
        <rect x="12" y="64" width="76" height="2" rx="1" fill="rgba(0,0,0,0.08)" />
      </g>
    </svg>
  );
}

// ── PHOTOS (Portfolio) ─ white bg, colorful 8-petal flower, exactly like macOS Photos ──
export function PhotosIcon({ size = 48 }: IconProps) {
  const petals = [
    { color: "#FF3B30", angle: 0 },
    { color: "#FF9500", angle: 45 },
    { color: "#FFCC00", angle: 90 },
    { color: "#34C759", angle: 135 },
    { color: "#5AC8FA", angle: 180 },
    { color: "#007AFF", angle: 225 },
    { color: "#5856D6", angle: 270 },
    { color: "#FF2D55", angle: 315 },
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <clipPath id="squircle-photos"><path d={SQUIRCLE} /></clipPath>
      </defs>
      <g clipPath="url(#squircle-photos)">
        <rect width="100" height="100" fill="white" />
        {petals.map((p) => (
          <ellipse
            key={p.angle}
            cx="50" cy="28" rx="11" ry="22"
            fill={p.color}
            transform={`rotate(${p.angle} 50 50)`}
            opacity="0.92"
          />
        ))}
        {/* Center white circle */}
        <circle cx="50" cy="50" r="13" fill="white" />
      </g>
    </svg>
  );
}

// ── ACTIVITY MONITOR (Analytics) ─ dark bg with green ECG-style line ──
export function NumbersIcon({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <clipPath id="squircle-num"><path d={SQUIRCLE} /></clipPath>
        <linearGradient id="numBg" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2A2A2E" />
          <stop offset="100%" stopColor="#111114" />
        </linearGradient>
      </defs>
      <g clipPath="url(#squircle-num)">
        <rect width="100" height="100" fill="url(#numBg)" />
        {/* Screen glow */}
        <rect x="10" y="10" width="80" height="80" rx="8" fill="#0A2A0A" opacity="0.7" />
        {/* ECG-style activity line */}
        <path
          d="M8 55 L22 55 L26 42 L30 68 L34 55 L40 55 L44 38 L48 72 L52 55 L58 55 L62 45 L66 65 L70 55 L92 55"
          stroke="#34C759" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
        />
        {/* Faint grid lines */}
        <line x1="10" y1="40" x2="90" y2="40" stroke="#34C759" strokeWidth="0.5" opacity="0.15" />
        <line x1="10" y1="70" x2="90" y2="70" stroke="#34C759" strokeWidth="0.5" opacity="0.15" />
        <line x1="35" y1="10" x2="35" y2="90" stroke="#34C759" strokeWidth="0.5" opacity="0.15" />
        <line x1="65" y1="10" x2="65" y2="90" stroke="#34C759" strokeWidth="0.5" opacity="0.15" />
      </g>
    </svg>
  );
}

// ── TERMINAL (Skills) ─ dark, green prompt ──
export function TerminalIcon({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <clipPath id="squircle-term"><path d={SQUIRCLE} /></clipPath>
        <linearGradient id="termBg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E1E20" />
          <stop offset="100%" stopColor="#080808" />
        </linearGradient>
      </defs>
      <g clipPath="url(#squircle-term)">
        <rect width="100" height="100" fill="url(#termBg)" />
        {/* Title bar strip */}
        <rect width="100" height="18" fill="rgba(255,255,255,0.05)" />
        <circle cx="14" cy="9" r="4" fill="#FF5F57" />
        <circle cx="26" cy="9" r="4" fill="#FEBC2E" />
        <circle cx="38" cy="9" r="4" fill="#28C840" />
        {/* > arrow */}
        <path d="M14 42 L26 52 L14 62"
          stroke="#34C759" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* _ cursor */}
        <rect x="33" y="62" width="22" height="5.5" rx="2" fill="#34C759" />
        {/* Faint second line */}
        <rect x="14" y="74" width="40" height="3" rx="1.5" fill="rgba(52,199,89,0.25)" />
      </g>
    </svg>
  );
}

// ── MAIL (Contact) ─ blue gradient, white envelope ──
export function MailIcon({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <clipPath id="squircle-mail"><path d={SQUIRCLE} /></clipPath>
        <linearGradient id="mailBg" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5AC8FA" />
          <stop offset="100%" stopColor="#007AFF" />
        </linearGradient>
      </defs>
      <g clipPath="url(#squircle-mail)">
        <rect width="100" height="100" fill="url(#mailBg)" />
        {/* Envelope shadow */}
        <rect x="12" y="31" width="76" height="50" rx="7" fill="rgba(0,0,0,0.12)" transform="translate(0,3)" />
        {/* Envelope body */}
        <rect x="12" y="28" width="76" height="50" rx="7" fill="white" />
        {/* Flap V */}
        <path d="M14 32 L50 59 L86 32" stroke="#007AFF" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </svg>
  );
}
