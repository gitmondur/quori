interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 40, className = '' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Quori logo"
    >
      {/* Q — the ring */}
      <circle
        cx="43"
        cy="42"
        r="25"
        fill="none"
        stroke="#6366f1"
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/*
        Q tail — a rotated SQL code-badge.
        Overlaps the lower-right of the ring, extends down-right,
        mimicking the diagonal stroke of the letter Q.
      */}
      <g transform="translate(72, 66) rotate(-35)">
        {/* badge background */}
        <rect x="-18" y="-7" width="36" height="14" rx="4" fill="#3730a3" />
        {/* left accent bar — looks like a code-gutter line */}
        <rect x="-18" y="-7" width="4" height="14" rx="2" fill="#6366f1" />
        {/* SQL text */}
        <text
          x="2"
          y="1"
          fontFamily="'Courier New', Courier, monospace"
          fontSize="7"
          fontWeight="bold"
          fill="#c7d2fe"
          textAnchor="middle"
          dominantBaseline="middle"
          letterSpacing="0.8"
        >
          SQL
        </text>
      </g>
    </svg>
  );
}
