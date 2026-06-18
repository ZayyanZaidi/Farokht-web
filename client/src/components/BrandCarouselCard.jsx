import { Link } from 'react-router-dom';
import MediaImage from './MediaImage';
import './BrandCarouselCard.css';

export default function BrandCarouselCard({ brand }) {
  const bg = brand.bg || '#E8D5C4';
  const ink = brand.ink || '#1a1a1a';

  /* NewContent images are full designed cards — show them full-bleed */
  const isShowcaseCard = brand.showcase === true ||
    (typeof brand.image === 'string' && brand.image.includes('/assets/brands/')) ||
    (typeof brand.image !== 'string' && brand.image);

  if (isShowcaseCard) {
    return (
      <Link
        to={brand.link || `/brand/${brand.id}`}
        className="brand-card-ref brand-card-ref--showcase"
      >
        <MediaImage src={brand.image} alt={brand.name} fallbackType="brand" />
      </Link>
    );
  }

  return (
    <Link
      to={brand.link || `/brand/${brand.id}`}
      className="brand-card-ref"
      style={{ '--card-bg': bg, '--card-ink': ink }}
    >
      <span className="brand-card-ref-verified" aria-label="Verified">✓</span>
      <div className="brand-card-ref-header">
        <span className="brand-card-ref-name">{brand.name}</span>
        <span className="brand-card-ref-cat">{brand.category}</span>
      </div>
      <div className="brand-card-ref-image">
        <MediaImage src={brand.image} alt={brand.name} fallbackType="brand" />
      </div>
    </Link>
  );
}
