import { PHONE_MOCKUPS } from '../data/designSpec';
import './PhoneMockups.css';

/** Overlapping phone mockups with real screen images — reference Home 5 */
export default function PhoneMockups({ variant = 'app' }) {
  if (variant === 'verified') {
    const { verified } = PHONE_MOCKUPS;
    return (
      <div className="phone-mockups phone-mockups--verified">
        <div className="phone-frame phone-frame--back">
          <div className="phone-screen phone-screen--profile-rich">
            <div
              className="phone-profile-banner"
              style={{ backgroundImage: `url(${verified.profileBanner})` }}
            />
            <div className="phone-profile-user">
              <img src={verified.avatar} alt="" className="phone-profile-avatar" />
              <div>
                <strong>Maria S.</strong>
                <span>Photographer · Karachi, PK</span>
              </div>
            </div>
          </div>
        </div>
        <div className="phone-frame phone-frame--front">
          <span className="phone-verified-badge">VERIFIED</span>
          <div className="phone-screen phone-screen--catalogue">
            <div
              className="phone-shop-banner"
              style={{ backgroundImage: `url(${verified.banner})` }}
            />
            <div className="phone-shop-tabs">
              <span>POSTS</span>
              <span className="active">CATALOGUE</span>
              <span>ABOUT</span>
            </div>
            <div className="phone-product-list">
              {verified.products.map((p) => (
                <div key={p.name} className="phone-product-row">
                  <img src={p.image} alt={p.name} loading="lazy" />
                  <div>
                    <p>{p.name}</p>
                    <strong>{p.price}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { splash, feedTiles } = PHONE_MOCKUPS;

  return (
    <div className="phone-mockups phone-mockups--app">
      <div className="phone-frame phone-frame--back">
        <div
          className="phone-screen phone-screen--splash"
          style={{ backgroundImage: `url(${splash})` }}
        >
          <div className="phone-splash-logo">
            <span className="phone-splash-urdu">فروخت</span>
            <span>Farokht</span>
          </div>
        </div>
      </div>
      <div className="phone-frame phone-frame--front">
        <div className="phone-screen phone-screen--feed-rich">
          <div className="phone-feed-search">Search brands…</div>
          <div className="phone-feed-promo">
            <span>40–50% OFF</span>
            <button type="button">Shop Now</button>
          </div>
          <div className="phone-feed-grid">
            {feedTiles.map((src) => (
              <div
                key={src}
                className="feed-tile feed-tile--img"
                style={{ backgroundImage: `url(${src})` }}
              >
                <span className="feed-tile-play">▶</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
