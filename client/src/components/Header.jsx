import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import UserMenu from './UserMenu';
import { fetchCurrentUser, getStoredUser } from '../utils/auth';
import './Header.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(() => getStoredUser());
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const current = await fetchCurrentUser();
      if (!cancelled) setUser(current);
    })();
    return () => {
      cancelled = true;
    };
  }, [location.pathname]);

  const isHome = location.pathname === '/';
  const hideOnAuth = location.pathname === '/auth';

  if (hideOnAuth) return null;

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''} ${isHome && !scrolled ? 'header--home' : ''}`}>
      <div className="container header-container">
        <Link to="/" className="header-logo-link">
          <Logo variant="header" />
        </Link>

        <nav className={`nav-links ${isOpen ? 'active' : ''}`}>
          <Link to="/" className={location.pathname === '/' ? 'active-link' : ''}>
            Home
          </Link>
          <a href="/#about-us">About Us</a>
          <a href="/#blogs">Blogs</a>
          <a href="/#waitlist" className="btn header-cta header-cta--waitlist">
            Join the Waitlist
          </a>
          {user ? (
            <UserMenu user={user} />
          ) : (
            <Link to="/auth" className="header-signin-link">
              Sign in
            </Link>
          )}
          {!user && (
            <Link to="/admin" className="header-admin-link">
              Admin
            </Link>
          )}
        </nav>

        <button
          type="button"
          className={`hamburger ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
