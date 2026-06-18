import './HeroPolaroids.css';

/** Floating Instagram-style cards from reference hero */
export default function HeroPolaroids() {
  const cards = [
    { rotate: -12, color: '#f5e6d3', label: 'skincare' },
    { rotate: 4, color: '#e8dfd0', label: 'lifestyle' },
    { rotate: 10, color: '#f0e4dc', label: 'food' }
  ];

  return (
    <div className="hero-polaroids" aria-hidden="true">
      {cards.map((card, i) => (
        <div
          key={i}
          className="hero-polaroid"
          style={{ '--rot': `${card.rotate}deg`, '--bg': card.color }}
        >
          <div className="hero-polaroid-inner" />
        </div>
      ))}
    </div>
  );
}
