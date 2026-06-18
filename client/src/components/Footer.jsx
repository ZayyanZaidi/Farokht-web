import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import FooterContactVisual from './FooterContactVisual';
import SectionBackground from './SectionBackground';
import { fetchSectionBackgrounds, resolveBackgroundUrl } from '../utils/backgrounds';
import './Footer.css';

function ContactIcon({ type }) {
  if (type === 'phone') {
    return (
      <svg className="footer-contact-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6.5 4h3l1.5 4-2 1.2a12 12 0 005.8 5.8L17 13l4 1.5v3a1.5 1.5 0 01-1.6 1.5C9.2 19.1 4.9 14.8 4.5 8.1A1.5 1.5 0 016 6.5z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (type === 'email') {
    return (
      <svg className="footer-contact-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 7l9 7 9-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg className="footer-contact-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-5.2 7-11a7 7 0 10-14 0c0 5.8 7 11 7 11z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function Footer() {
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    fetchSectionBackgrounds().then((data) => {
      setBackgroundImage(resolveBackgroundUrl(data.footer));
    });
  }, []);

  return (
    <footer className="footer" id="faqs">
      <section className="footer-contact-section">
        <SectionBackground image={backgroundImage} />
        <div className="container footer-contact-inner">
          <div className="footer-contact-text">
            <span className="footer-contact-tag">Contact Us</span>
            <h2 className="text-serif">Made in Pakistan, for Pakistan.</h2>
            <p className="footer-contact-lead">
              Share your feedback, your ideas &amp; words with us. Help us build something you will love truly.
            </p>
            <ul className="footer-contact-list">
              <li>
                <ContactIcon type="phone" />
                <a href="tel:+923342454137">+923342454137</a>
              </li>
              <li>
                <ContactIcon type="email" />
                <a href="mailto:teamfarokht@gmail.com">teamfarokht@gmail.com</a>
              </li>
              <li>
                <ContactIcon type="location" />
                <div className="footer-contact-address">
                  <strong>National Incubation Center, Karachi</strong>
                  <span>A-211, Anum Flat, Malir Halt, Malir, Karachi</span>
                </div>
              </li>
            </ul>
          </div>
          <FooterContactVisual />
        </div>
      </section>

      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <Logo variant="header" />
          <p>&copy; {new Date().getFullYear()} Farokht. All rights reserved.</p>
          <div className="socials">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <Link to="/directory">Explore Brands</Link>
            <Link to="/auth">Sign in</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
