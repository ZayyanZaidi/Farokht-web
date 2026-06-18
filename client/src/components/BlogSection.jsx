import React from 'react';
import SectionBackground from './SectionBackground';
import './BlogSection.css';

export default function BlogSection({ backgroundImage }) {
  return (
    <section className="blog-section blog-section--podcast" id="blogs">
      <SectionBackground image={backgroundImage} />
      <div className="container">
        <img
          className="blog-section-widget-image"
          src="/assets/widgets/blog-section-widgets.png"
          alt="Farokht podcast conversations around commerce"
        />
      </div>
    </section>
  );
}
