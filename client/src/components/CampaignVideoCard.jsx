import React, { useState } from 'react';
import MediaImage from './MediaImage';
import './CampaignVideoCard.css';

export default function CampaignVideoCard({ video }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="campaign-card-ref" style={{ '--tilt': `${video.tilt}deg` }}>
      <button type="button" className="campaign-card-ref-inner" onClick={() => setPlaying(!playing)}>
        <div className="campaign-card-ref-video">
          {playing ? (
            <video
              src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
              autoPlay
              muted
              playsInline
              loop
            />
          ) : (
            <MediaImage src={video.thumb} alt={video.handle} fallbackType="campaign" />
          )}
          <span className="campaign-card-ref-duration">{video.duration}</span>
          <span className="campaign-card-ref-play" aria-hidden="true">
            {playing ? '❚❚' : '▶'}
          </span>
        </div>
        <div className="campaign-card-ref-meta">
          <span className="campaign-card-ref-handle">
            {video.handle} <span className="verified">✓</span>
          </span>
          <span className="campaign-card-ref-stats">
            ♥ {video.likes} · 💬 {video.comments}
          </span>
        </div>
      </button>
    </div>
  );
}
