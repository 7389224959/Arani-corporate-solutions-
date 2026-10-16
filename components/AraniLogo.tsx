import React from 'react';

interface AraniLogoProps {
  variant?: 'color' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  headerTagline?: string;
  iconOnly?: boolean;
  className?: string;
}

export const AraniLogo: React.FC<AraniLogoProps> = ({
  variant = 'color',
  size = 'md',
  showTagline = true,
  headerTagline,
  iconOnly = false,
  className = ''
}) => {
  // Height sizing
  const heights = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-11',
    lg: 'h-12 sm:h-14',
    xl: 'h-16 sm:h-20'
  };

  const isLight = variant === 'light';
  const navyColor = isLight ? '#FFFFFF' : '#14274E';
  const tealColor = isLight ? '#2DD4BF' : '#15A090';
  const subtextColor = isLight ? '#F1F5F9' : '#1C3154';
  const tagColor = isLight ? 'rgba(255, 255, 255, 0.75)' : '#7A8694';

  if (iconOnly) {
    return (
      <div className={`inline-flex items-center justify-center select-none shrink-0 ${className}`}>
        <svg
          className={`${heights[size]} w-auto aspect-square object-contain transition-transform duration-200 hover:scale-105`}
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Aranii Logo Icon"
        >
          {/* Circular soft backing for contrast if needed */}
          <rect width="80" height="80" rx="16" fill={isLight ? 'rgba(255,255,255,0.1)' : '#F0FDF4'} />
          {/* Main 'A' */}
          <path
            d="M 40 18 L 18 62 L 32 62 L 37 51 L 53 51 L 58 62 L 72 62 L 50 18 Z M 45 30 L 50 43 L 40 43 Z"
            fill={navyColor}
          />
          {/* Rising Teal Swoosh */}
          <path
            d="M 12 55 C 32 50, 52 38, 68 20"
            stroke={tealColor}
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <polygon points="74,18 62,17 66,25" fill={tealColor} />
        </svg>
      </div>
    );
  }

  return (
    <div className={`inline-flex flex-col items-start shrink-0 ${className}`}>
      <div className="inline-flex items-center select-none">
        {/* SVG Vector Logo Mark accurately matching Aranii Corporate Solutions */}
        <svg
          className={`${heights[size]} w-auto object-contain transition-transform duration-200 hover:scale-[1.02] shrink-0`}
          viewBox={showTagline ? '0 0 280 92' : '0 0 280 80'}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Aranii Corporate Solutions Logo"
        >
          {/* Main Typography Group - ARANII */}
          <g id="ARANII_Typography">
            {/* First 'A' */}
            <path
              d="M 37 26 L 19 62 L 31 62 L 35 53 L 49 53 L 53 62 L 65 62 L 47 26 Z M 42 36 L 46.5 45.5 L 37.5 45.5 Z"
              fill={navyColor}
            />

            {/* 'R' */}
            <path
              d="M 69 26 L 91 26 C 98.5 26 103 30 103 37 C 103 42.5 99 46 93 47.5 L 105 62 L 92 62 L 81.5 48 L 79 48 L 79 62 L 69 62 Z M 79 34 L 79 41 L 89.5 41 C 92.5 41 94 39.5 94 37.5 C 94 35.5 92.5 34 89.5 34 Z"
              fill={navyColor}
            />

            {/* Second 'A' - Left leg Navy */}
            <path
              d="M 121 26 L 103 62 L 115 62 L 119 53 L 126 53 L 123 45 L 121 45 L 121 26 Z M 121 36 L 117.5 43.5 L 121 43.5 Z"
              fill={navyColor}
            />
            {/* Second 'A' - Right leg Vibrant Teal */}
            <path
              d="M 121 26 L 139 62 L 127 62 L 123 53 L 126 53 L 123 45 L 124 43.5 L 121 26 Z"
              fill={tealColor}
            />

            {/* 'N' */}
            <path
              d="M 143 26 L 153.5 26 L 169 49 L 169 26 L 179 26 L 179 62 L 168.5 62 L 153 39 L 153 62 L 143 62 Z"
              fill={navyColor}
            />

            {/* First 'I' Stem (Navy) */}
            <rect x="187" y="36" width="9.5" height="26" rx="0.5" fill={navyColor} />
            {/* First 'I' Teal Upward Arrow */}
            <polygon
              points="191.75,20 184,31 189,31 189,33.5 194.5,33.5 194.5,31 199.5,31"
              fill={tealColor}
            />

            {/* Second 'I' Stem (Navy) */}
            <rect x="204" y="36" width="9.5" height="26" rx="0.5" fill={navyColor} />
            {/* Second 'I' Teal Rising Upward Arrow (Taller/Higher) */}
            <polygon
              points="208.75,10 199.5,23 205.5,23 205.5,33.5 212,33.5 212,23 218,23"
              fill={tealColor}
            />
          </g>

          {/* Teal Rising Swoosh Curve Arrow across ARAN */}
          <path
            d="M 16 57 C 55 53, 105 40, 158 17"
            stroke={tealColor}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          {/* Arrowhead on swoosh pointing up-right */}
          <polygon
            points="167,14 153,13 158,21"
            fill={tealColor}
          />

          {/* Subtext: "Corporate Solutions" */}
          <text
            x="117"
            y="76"
            textAnchor="middle"
            fill={subtextColor}
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Plus Jakarta Sans', sans-serif"
            fontWeight="800"
            fontSize="16"
            letterSpacing="0.01em"
          >
            Corporate Solutions
          </text>

          {/* Tagline: "GROW WITH THE OPPORTUNITY" */}
          {showTagline && (
            <text
              x="117"
              y="88"
              textAnchor="middle"
              fill={tagColor}
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Space Grotesk', sans-serif"
              fontWeight="700"
              fontSize="7"
              letterSpacing="0.16em"
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

// Also export AraniiLogo as alias
export const AraniiLogo = AraniLogo;

