import './StoreBadges.css';

export default function StoreBadges({ className = '' }) {
  return (
    <div className={`store-badges ${className}`.trim()}>
      <a href="#playstore" className="store-badge store-badge--google" aria-label="Get it on Google Play">
        <svg className="store-badge-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#EA4335" d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.61 3 21.09 3 20.5Z" />
          <path fill="#FBBC04" d="M16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12Z" />
          <path fill="#34A853" d="M20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.53 12.9 20.18 13.18L16.81 15.12L14.54 12.85L16.81 10.58L20.16 10.81Z" />
          <path fill="#4285F4" d="M6.05 2.66L16.81 8.88L14.54 11.15L3.84 2.15C4.34 1.91 4.86 2.05 6.05 2.66Z" />
        </svg>
        <span className="store-badge-text">
          <span className="store-badge-line-sm">GET IT ON</span>
          <span className="store-badge-line-lg">Google Play</span>
        </span>
      </a>
      <a href="#appstore" className="store-badge store-badge--apple" aria-label="Download on the App Store">
        <svg className="store-badge-icon store-badge-icon--apple" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
        <span className="store-badge-text">
          <span className="store-badge-line-sm">Download on the</span>
          <span className="store-badge-line-lg">App Store</span>
        </span>
      </a>
    </div>
  );
}
