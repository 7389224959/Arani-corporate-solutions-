import React from 'react';

interface AraniLogoProps {
  variant?: 'color' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  headerTagline?: string;
  className?: string;
}

export const AraniLogo: React.FC<AraniLogoProps> = ({
  variant = 'color',
  size = 'md',
  showTagline = true,
  headerTagline,
  className = ''
}) => {
  // Height and font sizing based on size prop
  const heights = {
    sm: 'h-8',
    md: 'h-11',
    lg: 'h-14'
  };

  const isLight = variant === 'light';

  return (
    <div className={`flex flex-col items-start ${className}`}>
      <div className="inline-flex items-center gap-3 select-none">
        {/* SVG Vector Logo Mark matching official Arani geometric typography and rising arrows */}
        <svg
          className={`${heights[size]} w-auto object-contain transition-transform duration-300 hover:scale-[1.02]`}
          viewBox="0 0 320 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Arani Corporate Solutions Logo"
        >
          {/* Rising Bar Chart / Upward Arrow Accent Motif */}
          <g id="ArrowGlyphs">
            <path d="M12 58 L12 28 L20 20 L28 28 L28 58 Z" fill={isLight ? '#2BB6A4' : '#159E8C'} />
            <path d="M32 58 L32 18 L40 10 L48 18 L48 58 Z" fill={isLight ? '#FFFFFF' : '#16263F'} />
            <path d="M52 58 L52 10 L60 2 L68 10 L68 58 Z" fill={isLight ? '#2BB6A4' : '#159E8C'} />
          </g>

          {/* Wordmark "ARANI" - Heavy Geometric Sans */}
          <text
            x="78"
            y="42"
            fill={isLight ? '#FFFFFF' : '#16263F'}
            fontFamily="'Space Grotesk', system-ui, sans-serif"
            fontWeight="800"
            fontSize="36"
            letterSpacing="0.04em"
          >
            ARANI
          </text>

          {/* Teal Rising Swoosh Curve Arrow */}
          <path
            d="M72 48 C 110 52, 160 38, 205 18"
            stroke={isLight ? '#6FD0C2' : '#159E8C'}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <polygon
            points="205,18 194,20 200,27"
            fill={isLight ? '#6FD0C2' : '#159E8C'}
          />

          {/* Sub-line "Corporate Solutions" */}
          <text
            x="78"
            y="59"
            fill={isLight ? '#CDEEE8' : '#284563'}
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fontWeight="700"
            fontSize="12.5"
            letterSpacing="0.1em"
          >
            CORPORATE SOLUTIONS
          </text>

          {/* Tagline "GROW WITH THE OPPORTUNITY" */}
          {showTagline && (
            <text
              x="78"
              y="72"
              fill={isLight ? 'rgba(255,255,255,0.6)' : '#8A9298'}
              fontFamily="'Space Mono', monospace"
              fontWeight="700"
              fontSize="7"
              letterSpacing="0.18em"
            >
              GROW WITH THE OPPORTUNITY
            </text>
          )}
        </svg>
      </div>

      {headerTagline && (
        <span className={`text-[10px] sm:text-[11px] font-mono font-bold tracking-tight mt-0.5 ${
          isLight ? 'text-teal-300' : 'text-teal-700'
        }`}>
          {headerTagline}
        </span>
      )}
    </div>
  );
};
