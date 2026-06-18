import React, { useState } from 'react';
import MediaImage from './MediaImage';
import { DEFAULT_AVATAR } from '../data/referenceAssets';
import './FeedPostCard.css';

export default function FeedPostCard({ post, style }) {
  const [liked, setLiked] = useState(!!post.liked);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <article className="feed-card-ref" style={{ '--tilt': `${post.tilt || 0}deg`, ...style }}>
      <header className="feed-card-ref-header">
        <img
          className="feed-card-ref-avatar"
          src={post.avatar || DEFAULT_AVATAR}
          alt=""
          onError={(e) => {
            e.currentTarget.src = DEFAULT_AVATAR;
          }}
        />
        <div>
          <h4>{post.handle}</h4>
          <time>{post.time}</time>
        </div>
        <button type="button" className="feed-card-ref-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="More">
          •••
        </button>
        {menuOpen && (
          <div className="feed-card-ref-dropdown">
            <button type="button">Save post</button>
            <button type="button">Share</button>
            <button type="button">Report</button>
          </div>
        )}
      </header>
      <div className="feed-card-ref-media">
        {post.isNew && <span className="feed-card-ref-new">New</span>}
        <MediaImage src={post.image} alt={post.handle} fallbackType="post" />
      </div>
      <footer className="feed-card-ref-footer">
        <div className="feed-card-ref-actions">
          <button type="button" className={liked ? 'is-liked' : ''} onClick={() => setLiked(!liked)} aria-label="Like">
            {liked ? '♥' : '♡'}
          </button>
          <button type="button" aria-label="Comment">💬</button>
          <button type="button" aria-label="Share">✈</button>
        </div>
        {post.price && <span className="feed-card-ref-price">{post.price}</span>}
      </footer>
    </article>
  );
}
