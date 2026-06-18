import React, { useState } from 'react';
import { BRAND_PROFILE } from '../data/designSpec';
import MediaImage from './MediaImage';
import './BrandProfileWidgets.css';

const TABS = [
  { id: 'catalogue', label: 'Catalogue' },
  { id: 'posts', label: 'Posts' },
  { id: 'about', label: 'About Us' }
];

const ANNOTATIONS = {
  catalogue: 'Your catalogue',
  posts: 'Content',
  about: 'More about your brand!'
};

/** Interactive brand profile phone — reference Home 6 */
export default function BrandProfileWidgets() {
  const [activeTab, setActiveTab] = useState('posts');
  const brand = BRAND_PROFILE;

  return (
    <div className="brand-profile-widgets">
      <span className="brand-phone-annotation brand-phone-annotation--tl">{ANNOTATIONS.catalogue}</span>
      <span className="brand-phone-annotation brand-phone-annotation--tr">{ANNOTATIONS.posts}</span>
      <span className="brand-phone-annotation brand-phone-annotation--br">{ANNOTATIONS.about}</span>

      <div className="brand-phone-frame">
        <div className="brand-phone-banner" style={{ backgroundImage: `url(${brand.banner})` }} />
        <div className="brand-phone-profile">
          <img src={brand.logo} alt="" className="brand-phone-logo" />
          <div>
            <strong>
              {brand.name} <span className="brand-phone-verified">✓</span>
            </strong>
            <p>{brand.tagline}</p>
          </div>
        </div>
        <nav className="brand-phone-tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={activeTab === t.id ? 'active' : ''}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>
        <div className="brand-phone-body">
          {activeTab === 'catalogue' && (
            <div className="brand-phone-catalogue">
              {brand.catalogue.map((item) => (
                <div key={item.name} className="brand-phone-product">
                  <MediaImage src={item.image} alt={item.name} fallbackType="product" />
                  <div>
                    <h5>{item.name}</h5>
                    <p>Rs. {item.price.toLocaleString('en-PK')}</p>
                    <span>★ {item.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'posts' && (
            <div className="brand-phone-grid">
              {brand.posts.map((src, idx) => (
                <MediaImage key={idx} src={src} alt="" fallbackType="post" />
              ))}
            </div>
          )}
          {activeTab === 'about' && (
            <div className="brand-phone-about">
              <h5>🕐 Working Hours</h5>
              {brand.hours.map((row) => (
                <p key={row.day}>
                  <span>{row.day}</span>
                  <span>{row.time}</span>
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
