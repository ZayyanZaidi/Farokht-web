import React, { useState } from 'react';
import SectionBackground from './SectionBackground';
import { resolveMediaUrl } from '../utils/api';
import './BlogSection.css';

export default function BlogSection({ blogs = [], backgroundImage }) {
  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <section className="blog-section blog-section--podcast" id="blogs">
      <SectionBackground image={backgroundImage} />
      <div className="container">
        <h2 className="blog-section-title">Latest Stories & Guides</h2>
        
        {blogs.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No stories published yet.</p>
        ) : (
          <div className="blog-cards-grid">
            {blogs.map((blog) => (
              <div className="blog-card" key={blog.id || blog._id}>
                <span className="blog-card-tag">{blog.category || 'GUIDES'}</span>
                <h3>{blog.title}</h3>
                {blog.mediaUrl && (
                  <div className="blog-card-media">
                    {blog.mediaType === 'video' ? (
                      <video src={resolveMediaUrl(blog.mediaUrl)} controls />
                    ) : (
                      <img src={resolveMediaUrl(blog.mediaUrl)} alt={blog.title} />
                    )}
                  </div>
                )}
                <p className="blog-card-summary">{blog.caption}</p>
                <button
                  type="button"
                  className="blog-read-more"
                  onClick={() => setSelectedBlog(blog)}
                >
                  Read More →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedBlog && (
        <div className="blog-modal-overlay" onClick={() => setSelectedBlog(null)}>
          <div className="blog-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="blog-modal-close"
              onClick={() => setSelectedBlog(null)}
              aria-label="Close modal"
            >
              ×
            </button>
            <span className="blog-card-tag">{selectedBlog.category || 'GUIDES'}</span>
            <h2>{selectedBlog.title}</h2>
            {selectedBlog.mediaUrl && (
              <div className="blog-modal-media">
                {selectedBlog.mediaType === 'video' ? (
                  <video src={resolveMediaUrl(selectedBlog.mediaUrl)} controls autoPlay />
                ) : (
                  <img src={resolveMediaUrl(selectedBlog.mediaUrl)} alt={selectedBlog.title} />
                )}
              </div>
            )}
            <p className="blog-modal-caption">{selectedBlog.caption}</p>
            <div className="blog-modal-body">{selectedBlog.content}</div>
          </div>
        </div>
      )}
    </section>
  );
}
