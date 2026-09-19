export function BadgeIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100">
      <polygon points="50,4 92,26 92,74 50,96 8,74 8,26"
               fill="#0f2447" stroke="#d4af37" strokeWidth="3" />
      <polygon points="50,16 82,33 82,67 50,84 18,67 18,33"
               fill="none" stroke="#2a6fd6" strokeWidth="2" />
      <path d="M50 30 L56 46 L73 46 L59 56 L64 72 L50 62 L36 72 L41 56 L27 46 L44 46 Z"
            fill="#d4af37" />
    </svg>
  );
}

export function HeroBadge() {
  return (
    <svg className="badge-svg" viewBox="0 0 100 100">
      <polygon points="50,4 92,26 92,74 50,96 8,74 8,26"
               fill="#0a1730" stroke="#d4af37" strokeWidth="2.5" />
      <polygon points="50,12 85,30 85,70 50,88 15,70 15,30"
               fill="none" stroke="#2a6fd6" strokeWidth="1.5" />
      <polygon points="50,20 78,34 78,66 50,80 22,66 22,34"
               fill="none" stroke="#d4af37" strokeWidth="1" opacity="0.6" />
      <path d="M50 28 L57 46 L76 46 L61 57 L67 75 L50 64 L33 75 L39 57 L24 46 L43 46 Z"
            fill="#d4af37" />
      <circle cx="50" cy="50" r="42" fill="none" stroke="#d4af37"
              strokeWidth="0.8" strokeDasharray="3 6" opacity="0.7" />
    </svg>
  );
}
