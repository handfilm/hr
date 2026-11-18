interface CyberOverlayProps {
  enabled: boolean;
}

export function CyberOverlay({ enabled }: CyberOverlayProps) {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Subtle SVG Film-Grain Noise Texture across #0a0a0a */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.045]">
        <filter id="brutal-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#brutal-grain)" />
      </svg>

      {enabled && (
        <>
          {/* Dark Perspective Industrial Grid */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,85,0,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,85,0,0.16) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
              maskImage:
                'radial-gradient(ellipse 85% 75% at 50% 35%, #000 40%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 85% 75% at 50% 35%, #000 40%, transparent 100%)',
            }}
          />

          {/* Animated Radar Scanline */}
          <div className="animate-radar-scan absolute inset-x-0 h-28 bg-gradient-to-b from-transparent via-[#FF5500]/10 to-transparent border-b border-[#FF5500]/25" />

          {/* Tri-National Connection Nodes: Dhaka (BD) <-> Hung Yen (VN) <-> Tokyo (JP) */}
          <svg
            viewBox="0 0 1200 600"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 w-full h-full opacity-35"
          >
            <path
              d="M 220 340 Q 480 180 650 320 T 1010 210"
              fill="none"
              stroke="#FF5500"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />
            <path
              d="M 220 340 Q 620 430 1010 210"
              fill="none"
              stroke="#10b981"
              strokeWidth="1"
              strokeDasharray="4 8"
              opacity="0.7"
            />

            {/* Dhaka (BD) Node */}
            <g transform="translate(220, 340)">
              <circle r="14" fill="#FF5500" opacity="0.18" className="animate-node-pulse" />
              <circle r="4.5" fill="#FF5500" />
              <text
                x="12"
                y="4"
                fill="#A1A1AA"
                fontSize="11"
                fontFamily="Space Mono, monospace"
              >
                DHAKA [BD]
              </text>
            </g>

            {/* Hung Yen (VN) Node */}
            <g transform="translate(650, 320)">
              <circle r="14" fill="#10b981" opacity="0.2" className="animate-node-pulse" />
              <circle r="4.5" fill="#10b981" />
              <text
                x="12"
                y="4"
                fill="#A1A1AA"
                fontSize="11"
                fontFamily="Space Mono, monospace"
              >
                HUNG YEN [VN]
              </text>
            </g>

            {/* Tokyo (JP) Node */}
            <g transform="translate(1010, 210)">
              <circle r="14" fill="#f59e0b" opacity="0.2" className="animate-node-pulse" />
              <circle r="4.5" fill="#f59e0b" />
              <text
                x="-95"
                y="-12"
                fill="#A1A1AA"
                fontSize="11"
                fontFamily="Space Mono, monospace"
              >
                TOKYO [JP]
              </text>
            </g>
          </svg>
        </>
      )}
    </div>
  );
}
