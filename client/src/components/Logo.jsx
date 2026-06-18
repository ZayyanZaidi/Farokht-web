import './Logo.css';

/** Farokht logo — header matches Reference/Header.png (wordmark · pin · Urdu) */
export default function Logo({ variant = 'header', className = '' }) {
  const isHeader = variant === 'header';

  return (
    <div className={`farokht-logo farokht-logo--${variant} ${className}`.trim()} aria-label="Farokht">
      {isHeader ? (
        <>
          <span className="farokht-logo-en-header">Farokht</span>
          <HeaderPinIcon />
          <span className="farokht-logo-urdu-inline">فروخت</span>
        </>
      ) : (
        <>
          <span className="farokht-logo-mark farokht-logo-mark--hero" aria-hidden="true">
            <HeroPinIcon />
          </span>
          <span className="farokht-logo-urdu">فروخت</span>
          <span className="farokht-logo-en-sub">Farokht</span>
        </>
      )}
    </div>
  );
}

/** Header pin: orange teardrop, yellow circle, teal airplane + motion lines */
function HeaderPinIcon() {
  return (
    <svg
      className="farokht-header-pin"
      width="44"
      height="52"
      viewBox="0 0 44 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M22 48C22 48 5 32 5 19.5C5 10.492 11.492 4 20.5 4C29.508 4 36 10.492 36 19.5C36 32 22 48 22 48Z"
        fill="#F47B20"
      />
      <circle cx="22" cy="19" r="10.5" fill="#FFEB3B" />
      <path
        d="M16.5 21.5L26 15.5L24.5 19.5L28.5 20.5L19 26.5L20.5 22.5L16.5 21.5Z"
        fill="#17C3B2"
      />
      <path d="M30 10L32 8M33 12L35.5 11.5M31 7L33 5.5" stroke="#17C3B2" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Hero: gradient pin with cart motif */
function HeroPinIcon() {
  return (
    <svg width="56" height="67" viewBox="0 0 48 58" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M24 54C24 54 6 36 6 22C6 11.506 14.506 3 24 3C33.494 3 42 11.506 42 22C42 36 24 54 24 54Z"
        fill="url(#pinGradHero)"
      />
      <circle cx="24" cy="22" r="11" fill="#fff" />
      <path
        d="M18 24h4v6h-4v-6zm6-2h4c1.1 0 2 .9 2 2v6h-4v-8zm6 2h4v6h-4v-6z"
        fill="#F47B20"
      />
      <defs>
        <linearGradient id="pinGradHero" x1="6" y1="3" x2="42" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F47B20" />
          <stop offset="0.45" stopColor="#FBB03B" />
          <stop offset="1" stopColor="#00A89E" />
        </linearGradient>
      </defs>
    </svg>
  );
}
