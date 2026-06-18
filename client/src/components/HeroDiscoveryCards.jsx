import { useState } from 'react';
import { HERO_DISCOVERY_POSTS } from '../data/designSpec';
import MediaImage from './MediaImage';
import './HeroDiscoveryCards.css';

/** Interactive Instagram-style stack — reference Home 1 left widgets */
export default function HeroDiscoveryCards() {
  const [activeId, setActiveId] = useState(null);

  return (
    <div className="hero-discovery" aria-label="Content discovery preview">
      <div className="hero-discovery-stack">
        {HERO_DISCOVERY_POSTS.map((post) => (
          <button
            key={post.id}
            type="button"
            className={`hero-discovery-card ${activeId === post.id ? 'is-active' : ''}`}
            style={{ '--rot': `${post.rotate}deg`, zIndex: post.z }}
            onClick={() => setActiveId(activeId === post.id ? null : post.id)}
          >
            <div className="hero-discovery-card-header">
              <span className="hero-discovery-dot" />
              <span className="hero-discovery-dot" />
              <span className="hero-discovery-dot" />
            </div>
            <MediaImage src={post.image} alt="" fallbackType="post" className="hero-discovery-img" />
            <div className="hero-discovery-actions">
              <span aria-hidden="true">♥</span>
              <span aria-hidden="true">💬</span>
              <span aria-hidden="true">✈</span>
            </div>
            <p className="hero-discovery-likes">{post.likes} likes</p>
          </button>
        ))}
      </div>
      <span className="hero-discovery-label annotation-label--script">content discovery</span>
      {activeId && (
        <p className="hero-discovery-hint">Tap a card to preview — shop this look in-app</p>
      )}
    </div>
  );
}
