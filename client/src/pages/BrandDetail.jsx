import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { sampleBrands } from '../data/sampleData';
import './BrandDetail.css';

export default function BrandDetail() {
  const { handle } = useParams();
  const brand = sampleBrands.find(b => b.handle.toLowerCase() === handle.toLowerCase());
  
  const [activeTab, setActiveTab] = useState('products');
  const [activeStory, setActiveStory] = useState(null);

  if (!brand) {
    return (
      <div className="brand-not-found container">
        <h2>Brand Not Found</h2>
        <p>Sorry, the brand you are looking for does not exist on Farokht.</p>
        <Link to="/directory" className="btn btn-primary">Back to Directory</Link>
      </div>
    );
  }

  return (
    <div className="brand-detail-page">
      {/* Cover Banner */}
      <div className="brand-banner" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.85)), url(${brand.cover})` }}>
        <div className="container banner-container">
          <div className="brand-profile-header">
            <img src={brand.logo} alt={brand.name} className="brand-profile-logo" />
            <div className="brand-profile-meta">
              <span className="brand-profile-cat">{brand.category}</span>
              <h1>
                {brand.name}
                {brand.isVerified && <span className="verified-badge" style={{ marginLeft: '12px' }}>✓ Verified Brand</span>}
              </h1>
              <p className="brand-profile-handle">@{brand.handle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Info */}
      <div className="container brand-content-grid">
        <div className="brand-main">
          {/* Brand Bio */}
          <div className="brand-bio glass">
            <h2>About {brand.name}</h2>
            <p>{brand.description}</p>
            
            {/* Stats */}
            <div className="brand-stats">
              <div className="stat">
                <span className="num">{brand.products.length}</span>
                <span className="lbl">Products</span>
              </div>
              <div className="stat">
                <span className="num">{brand.stories.length}</span>
                <span className="lbl">Stories</span>
              </div>
              <div className="stat">
                <span className="num">Active</span>
                <span className="lbl">Status</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="tabs-container">
            <button 
              className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              Catalogue ({brand.products.length})
            </button>
            <button 
              className={`tab-btn ${activeTab === 'stories' ? 'active' : ''}`}
              onClick={() => setActiveTab('stories')}
            >
              Kahaniaa & Stories ({brand.stories.length})
            </button>
          </div>

          {/* Catalogue/Products Tab */}
          {activeTab === 'products' && (
            <div className="products-grid">
              {brand.products.map(prod => (
                <div key={prod.id} className="product-card glass">
                  <div className="product-img-wrapper">
                    <img src={prod.image} alt={prod.name} className="product-img" />
                  </div>
                  <div className="product-info">
                    <h3>{prod.name}</h3>
                    <p className="product-price">Rs. {prod.price.toLocaleString()}</p>
                    <a href={brand.whatsappGroupUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp product-buy-btn">
                      Order via WhatsApp Group
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stories/Kahaniaa Tab */}
          {activeTab === 'stories' && (
            <div className="stories-sec">
              <p className="stories-intro">Click on a story bubble to view highlights, sneak peeks, and lookbooks.</p>
              
              <div className="stories-reel">
                {brand.stories.map(story => (
                  <button 
                    key={story.id} 
                    className="story-circle-btn"
                    onClick={() => setActiveStory(story)}
                  >
                    <div className="story-ring">
                      <img src={story.media} alt={story.title} className="story-thumb" />
                    </div>
                    <span>{story.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="brand-sidebar">
          <div className="sidebar-card glass whatsapp-cta-card">
            <h3>Farokht WhatsApp Hub</h3>
            <p>Join the official WhatsApp community of <strong>{brand.name}</strong> to stay updated on catalog releases, size availability, and exclusive drops directly from the creator.</p>
            
            <a href={brand.whatsappGroupUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp w-full">
              Join WhatsApp Community
            </a>
          </div>

          <div className="sidebar-card glass policy-card">
            <h3>Ordering Information</h3>
            <p>Farokht supports independent local commerce. All payments and delivery are coordinated directly inside the WhatsApp group. Standard COD delivery takes 3-5 days across Pakistan.</p>
          </div>
        </div>
      </div>

      {/* Story Lightbox Modal */}
      {activeStory && (
        <div className="story-modal" onClick={() => setActiveStory(null)}>
          <div className="story-modal-content glass" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setActiveStory(null)}>&times;</button>
            <img src={activeStory.media} alt={activeStory.title} className="story-modal-img" />
            <div className="story-modal-caption">
              <h3>{activeStory.title}</h3>
              <p>Exclusive look from @{brand.handle}</p>
              <a href={brand.whatsappGroupUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp modal-buy-btn">
                Ask in WhatsApp Group
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
