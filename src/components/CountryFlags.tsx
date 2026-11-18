interface FlagProps {
  className?: string;
  label?: string;
}

export function BangladeshFlag({ className = '', label = 'Bangladesh Flag' }: FlagProps) {
  return (
    <svg
      viewBox="0 0 20 14"
      width="20"
      height="14"
      role="img"
      aria-label={label}
      className={`w-[20px] h-[14px] rounded-[2px] border border-white/25 shrink-0 block ${className}`}
    >
      <rect width="20" height="14" fill="#006A4E" />
      <circle cx="9" cy="7" r="4.2" fill="#F42A41" />
    </svg>
  );
}

export function JapanFlag({ className = '', label = 'Japan Flag' }: FlagProps) {
  return (
    <svg
      viewBox="0 0 20 14"
      width="20"
      height="14"
      role="img"
      aria-label={label}
      className={`w-[20px] h-[14px] rounded-[2px] border border-white/25 shrink-0 block ${className}`}
    >
      <rect width="20" height="14" fill="#FFFFFF" />
      <circle cx="10" cy="7" r="4" fill="#BC002D" />
    </svg>
  );
}

export function VietnamFlag({ className = '', label = 'Vietnam Flag' }: FlagProps) {
  return (
    <svg
      viewBox="0 0 20 14"
      width="20"
      height="14"
      role="img"
      aria-label={label}
      className={`w-[20px] h-[14px] rounded-[2px] border border-white/25 shrink-0 block ${className}`}
    >
      <rect width="20" height="14" fill="#DA251D" />
      <polygon
        fill="#FFFE00"
        points="10,2.6 11.18,6.22 14.98,6.22 11.9,8.46 13.08,12.08 10,9.84 6.92,12.08 8.1,8.46 5.02,6.22 8.82,6.22"
      />
    </svg>
  );
}
