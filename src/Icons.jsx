// Icons.jsx - All SVG Icons Component

export const CatIcon = ({ className = "w-14 h-14 text-pink-500" }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M16 24 L8 12 L20 18"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M48 24 L56 12 L44 18"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="32" cy="36" r="18" stroke="currentColor" strokeWidth="3" />
    <circle cx="26" cy="34" r="2" fill="currentColor" />
    <circle cx="38" cy="34" r="2" fill="currentColor" />
    <path
      d="M32 38 C30 40 28 40 26 38"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M32 38 C34 40 36 40 38 38"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const FlowerIcon = ({ className = "w-12 h-12 text-pink-400" }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="32" cy="16" r="8" fill="currentColor" />
    <circle cx="32" cy="48" r="8" fill="currentColor" />
    <circle cx="16" cy="32" r="8" fill="currentColor" />
    <circle cx="48" cy="32" r="8" fill="currentColor" />
    <circle cx="22" cy="22" r="8" fill="currentColor" />
    <circle cx="42" cy="22" r="8" fill="currentColor" />
    <circle cx="22" cy="42" r="8" fill="currentColor" />
    <circle cx="42" cy="42" r="8" fill="currentColor" />
    <circle cx="32" cy="32" r="6" fill="#FFD700" />
  </svg>
);

export const MonkeyIcon = ({ className = "w-14 h-14 text-yellow-600" }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Ears */}
    <circle cx="18" cy="20" r="8" fill="currentColor" />
    <circle cx="46" cy="20" r="8" fill="currentColor" />
    <circle cx="18" cy="20" r="5" fill="#FFE4C4" />
    <circle cx="46" cy="20" r="5" fill="#FFE4C4" />
    {/* Head */}
    <circle cx="32" cy="32" r="18" fill="currentColor" />
    {/* Face */}
    <ellipse cx="32" cy="38" rx="12" ry="10" fill="#FFE4C4" />
    {/* Eyes */}
    <circle cx="26" cy="28" r="2" fill="#000" />
    <circle cx="38" cy="28" r="2" fill="#000" />
    {/* Nose */}
    <ellipse cx="32" cy="36" rx="3" ry="2" fill="#8B4513" />
    {/* Mouth */}
    <path
      d="M28 40 Q32 43 36 40"
      stroke="#8B4513"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export const ChatIcon = ({ className = "w-12 h-12 text-pink-500" }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      x="8"
      y="12"
      width="48"
      height="32"
      rx="4"
      stroke="currentColor"
      strokeWidth="3"
      fill="white"
    />
    <path d="M24 44 L32 52 L32 44" fill="currentColor" />
    <line
      x1="18"
      y1="22"
      x2="46"
      y2="22"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="18"
      y1="30"
      x2="38"
      y2="30"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export const WalkIcon = ({ className = "w-12 h-12 text-green-500" }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Head */}
    <circle cx="32" cy="14" r="6" fill="currentColor" />
    {/* Body */}
    <line
      x1="32"
      y1="20"
      x2="32"
      y2="38"
      stroke="currentColor"
      strokeWidth="3"
    />
    {/* Arms */}
    <line
      x1="32"
      y1="26"
      x2="22"
      y2="32"
      stroke="currentColor"
      strokeWidth="3"
    />
    <line
      x1="32"
      y1="26"
      x2="42"
      y2="20"
      stroke="currentColor"
      strokeWidth="3"
    />
    {/* Legs */}
    <line
      x1="32"
      y1="38"
      x2="24"
      y2="52"
      stroke="currentColor"
      strokeWidth="3"
    />
    <line
      x1="32"
      y1="38"
      x2="40"
      y2="52"
      stroke="currentColor"
      strokeWidth="3"
    />
  </svg>
);

export const SpinIcon = ({ className = "w-12 h-12 text-pink-400" }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="3" />
    <path d="M32 8 L38 18 L26 18 Z" fill="currentColor" />
    <path d="M32 56 L38 46 L26 46 Z" fill="currentColor" />
    <path d="M8 32 L18 26 L18 38 Z" fill="currentColor" />
    <path d="M56 32 L46 26 L46 38 Z" fill="currentColor" />
  </svg>
);
