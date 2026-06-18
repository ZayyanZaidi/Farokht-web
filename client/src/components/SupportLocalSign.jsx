import './SupportLocalSign.css';

/** SUPPORT LOCAL signpost — CSS/SVG from reference slide */
export default function SupportLocalSign() {
  return (
    <div className="support-local-sign" aria-hidden="true">
      <div className="support-local-skyline" />
      <div className="support-local-signpost">
        <div className="sign-board sign-board--top">
          <span>SUPPORT</span>
          <span className="sign-arrow sign-arrow--right" aria-hidden="true">→</span>
        </div>
        <div className="sign-pole" />
        <div className="sign-board sign-board--bottom">
          <span className="sign-arrow sign-arrow--left" aria-hidden="true">←</span>
          <span>LOCAL</span>
        </div>
      </div>
      <div className="support-local-rickshaw">
        <div className="rickshaw-body" />
        <div className="rickshaw-roof" />
        <div className="rickshaw-wheel rickshaw-wheel--1" />
        <div className="rickshaw-wheel rickshaw-wheel--2" />
      </div>
    </div>
  );
}
