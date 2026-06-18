import './HeroLandmarks.css';

/** Stylized Pakistan landmarks row — CSS/SVG recreation from reference */
export default function HeroLandmarks() {
  return (
    <div className="hero-landmarks" aria-hidden="true">
      <div className="hero-landmarks-tear" />
      <svg className="hero-landmarks-svg" viewBox="0 0 1200 120" preserveAspectRatio="xMidYMax meet">
        <g className="landmark-sketch" fill="none" stroke="#2a2a2a" strokeWidth="1.2">
          <path d="M40 95 L55 40 L70 95 Z M48 70 L62 70" />
          <path d="M120 95 L135 35 L165 35 L180 95 Z M145 50 L160 75" />
          <path d="M220 95 L240 45 L280 45 L300 95 Z M250 55 h40" />
          <path d="M340 95 C340 60 380 50 400 70 C420 50 460 60 460 95" />
          <path d="M500 95 L520 30 L560 30 L580 95 M530 50 L550 75" />
          <path d="M620 95 L640 25 L700 25 L720 95 M660 45 L680 70" />
          <path d="M760 95 L780 50 L820 50 L840 95 M795 65 h30" />
        </g>
        <g className="landmark-glow" stroke="#e8a4b8" strokeWidth="2" fill="none" opacity="0.7">
          <path d="M40 95 L55 40 L70 95" />
          <path d="M120 95 L150 35 L180 95" />
          <path d="M500 95 L550 30 L580 95" />
          <path d="M620 95 L670 25 L720 95" />
        </g>
        <rect x="798" y="72" width="14" height="10" fill="#fff" stroke="#2a2a2a" strokeWidth="0.5" />
        <rect x="798" y="72" width="14" height="3.5" fill="#01411C" />
      </svg>
    </div>
  );
}
