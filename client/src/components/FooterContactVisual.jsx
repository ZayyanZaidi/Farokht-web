import './FooterContactVisual.css';

const WOMAN_IMG = '/assets/widgets/footer-woman.png';

/** Right column — single illustration asset (shape + figure), contained in its grid cell */
export default function FooterContactVisual() {
  return (
    <div className="footer-visual-col">
      <img src={WOMAN_IMG} alt="" className="footer-visual-img" width={363} height={260} />
    </div>
  );
}
