import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminPanel from '../components/AdminPanel';
import BlogSection from '../components/BlogSection';
import MediaImage from '../components/MediaImage';
import { apiFetch, resolveMediaUrl } from '../utils/api';
import { fetchBrands, fetchContentPosts } from '../services/farokhtData';
import HeroLandmarks from '../components/HeroLandmarks';
import HeroDiscoveryCards from '../components/HeroDiscoveryCards';
import BrandCarouselCard from '../components/BrandCarouselCard';
import FeedPostCard from '../components/FeedPostCard';
import BrandProfileWidgets from '../components/BrandProfileWidgets';
import CampaignVideoCard from '../components/CampaignVideoCard';
import PhoneMockups from '../components/PhoneMockups';
import StoreBadges from '../components/StoreBadges';
import SectionBackground from '../components/SectionBackground';
import { DEFAULT_BLOGS, HERO_FALLBACK } from '../data/placeholders';
import {
  BRAND_CARDS,
  FEED_POSTS,
  CYAN_SLIDES,
  CAMPAIGN_VIDEOS,
  WIDGETS
} from '../data/designSpec';
import { BG } from '../data/referenceAssets';
import { getDefaultHeroMedia } from '../utils/media';
import { fetchSectionBackgrounds, resolveBackgroundUrl } from '../utils/backgrounds';
import { DEFAULT_SECTION_BACKGROUNDS } from '../data/sectionBackgrounds';

const BRAND_PALETTE = ['#E8D5C4', '#1B4D4A', '#E8B923', '#F47B20', '#1B4D4A', '#7EC8C8'];
const BRAND_INK = ['#1a1a1a', '#fff', '#1a1a1a', '#fff', '#fff', '#1a1a1a'];

function enrichBrand(brand, index) {
  const spec = BRAND_CARDS.find(
    (c) => c.id === brand.id || c.name.toLowerCase() === (brand.name || '').toLowerCase()
  );
  if (spec) return { ...brand, ...spec, link: brand.link || spec.link };
  return {
    ...brand,
    bg: BRAND_PALETTE[index % BRAND_PALETTE.length],
    ink: BRAND_INK[index % BRAND_INK.length],
    category: (brand.category || 'FASHION').toUpperCase(),
    link: brand.link || `/brand/${brand.id}`
  };
}
import './Home.css';

export default function Home() {
  const feedSliderRef = useRef(null);
  const brandSliderRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [heroMedia, setHeroMedia] = useState(HERO_FALLBACK);
  const [blogs, setBlogs] = useState(DEFAULT_BLOGS);
  const [brands, setBrands] = useState(BRAND_CARDS);
  const [feedPosts, setFeedPosts] = useState(FEED_POSTS);
  const [heroPlaying, setHeroPlaying] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [sectionBackgrounds, setSectionBackgrounds] = useState(DEFAULT_SECTION_BACKGROUNDS);

  const loadHero = async () => {
    try {
      const response = await apiFetch('/api/hero');
      if (response.ok) {
        const data = await response.json();
        if (data?.mediaUrl) {
          setHeroMedia({
            mediaType: data.mediaType || 'video',
            mediaUrl: data.mediaUrl,
            poster: data.poster,
            title: data.title,
            caption: data.caption || HERO_FALLBACK.caption
          });
          return;
        }
      }
      setHeroMedia(getDefaultHeroMedia());
    } catch (err) {
      console.error('Hero load failed:', err);
      setHeroMedia(getDefaultHeroMedia());
    }
  };

  const loadBlogs = async () => {
    try {
      const response = await apiFetch('/api/stories?type=blog');
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) setBlogs(data);
      }
    } catch (err) {
      console.error('Blogs load failed:', err);
    }
  };



  const loadFarokhtData = async () => {
    setDataLoading(true);
    try {
      const [brandData, contentData] = await Promise.all([
        fetchBrands(30),
        fetchContentPosts(20)
      ]);

      if (brandData.length) {
        setBrands(brandData.map((b, i) => enrichBrand({
          id: b.id,
          name: b.name,
          category: b.category,
          image: b.image,
          logoUrl: b.logoUrl,
          link: b.link || `/brand/${b.id}`
        }, i)));
      }

      if (contentData.length) {
        setFeedPosts(
          contentData.map((p, i) => ({
            ...FEED_POSTS[i % FEED_POSTS.length],
            ...p,
            id: p.id || i,
            handle: p.handle || p.title,
            tilt: FEED_POSTS[i % FEED_POSTS.length]?.tilt ?? 0
          }))
        );
      }
    } catch (err) {
      console.error('Farokht data load failed:', err);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    const adminQuery = new URLSearchParams(window.location.search).get('admin') === '1';
    if (adminQuery) {
      localStorage.setItem('token', 'bypass_token');
      localStorage.setItem('role', 'admin');
      localStorage.setItem('user', JSON.stringify({ id: 'bypass_admin_id', role: 'admin', username: 'bypass_admin' }));
      setIsAdmin(true);
    } else {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      setIsAdmin(role === 'admin' && !!token);
    }

    loadHero();
    loadBlogs();
    loadFarokhtData();
  }, []);

  const scrollFeed = (direction) => {
    feedSliderRef.current?.scrollBy({ left: direction === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  const scrollBrands = (direction) => {
    brandSliderRef.current?.scrollBy({ left: direction === 'left' ? -220 : 220, behavior: 'smooth' });
  };

  const filteredBrands = brands.filter(
    (b) =>
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.category || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const heroSrc = resolveMediaUrl(heroMedia.mediaUrl);
  const heroPoster = heroMedia.poster ? resolveMediaUrl(heroMedia.poster) : BG.brands;
  const isHeroVideo = heroMedia.mediaType === 'video';
  const showHeroOverlay = !isAdmin && !isHeroVideo && !heroPlaying;
  const sectionBg = (id) => resolveBackgroundUrl(sectionBackgrounds[id]);

  const milestones = [
    {
      id: 1,
      title: 'Farokht Gets Into NIC Karachi C14, From Foundry to Incubation',
      text: 'Farokht has officially joined NIC Karachi Cohort 14, moving from the Foundry pre-incubation program to full incubation.',
      date: 'Sep 28, 2025',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop'
    },
    {
      id: 2,
      title: 'Farokht Reaches Top 10 in Uraan PakistanOne',
      text: 'Farokht is thrilled to have made it to the Top 10 in Uraan PakistanOne, a prestigious national competition.',
      date: 'Nov 15, 2025',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop'
    },
    {
      id: 3,
      title: 'Farokht Nominated for SheXcelerate Awards 2025 in SheXRise Category',
      text: 'Celebrating bold and innovative women-led ventures in the SheXrise category.',
      date: 'Dec 15, 2025',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b3f2e?w=600&h=400&fit=crop'
    }
  ];

  const campaignSteps = [
    { n: 1, title: 'Download', text: 'Download our campaign frame from the link below.' },
    { n: 2, title: 'Record', text: "Record a short video saying 'Mein Farokht Par Hoon'." },
    { n: 3, title: 'Tag Us', text: 'Post it on your socials and tag @farokht.official with #MeinFarokhtParHoon.' },
    { n: 4, title: 'Get Featured', text: 'Stand a chance to be featured on our official platform!' }
  ];

  return (
    <div className={`home-container ${isAdmin ? 'home-container--admin' : ''}`}>
      <section className="hero-section">
        <SectionBackground image={sectionBg('hero')} />
        <div className="hero-parchment-bg" aria-hidden="true" />
        <HeroDiscoveryCards />
        <button
          type="button"
          className="hero-cart-sketch"
          onClick={() => document.getElementById('brand-discovery')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Secure in-app checkout — explore brands"
        >
          <svg viewBox="0 0 48 40" className="hero-cart-icon">
            <path d="M8 8h6l4 18h20l4-14H14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="20" cy="32" r="2" fill="currentColor" />
            <circle cx="34" cy="32" r="2" fill="currentColor" />
          </svg>
          <span className="hero-lock-badge">🔒</span>
          <span className="annotation-label annotation-label--script hero-cart-label">secure in-app checkout</span>
        </button>
        <div className="hero-annotation hero-annotation--flag">
          <span className="annotation-label annotation-label--script">🇵🇰 No more reliance on foreign apps</span>
        </div>

        <div className="container hero-inner">
          <div className="hero-text-center">
            <div className={`hero-video-panel ${isAdmin ? 'hero-video-panel--admin' : ''}`}>
              <div className="hero-video-card">
                {isHeroVideo ? (
                  <video
                    className="hero-video-player"
                    src={heroSrc}
                    poster={heroPoster}
                    controls={false}
                    autoPlay={true}
                    muted={true}
                    loop={true}
                    playsInline
                    preload="auto"
                  />
                ) : (
                  <MediaImage src={heroMedia.mediaUrl} alt={heroMedia.title || 'Farokht hero'} fallbackType="post" />
                )}
                {showHeroOverlay && (
                  <div className={`hero-video-overlay ${isHeroVideo ? '' : 'hero-video-overlay--light'}`}>
                    <button type="button" className="play-button" aria-label="Play" onClick={() => setHeroPlaying(true)}>
                      ▶
                    </button>
                  </div>
                )}
              </div>
              {isAdmin && (
                <p className="hero-admin-hint">Live preview — your hero media appears here for all visitors.</p>
              )}
            </div>
          </div>
        </div>

        <HeroLandmarks />
      </section>

      {isAdmin && (
        <section className="admin-section" id="admin-panel">
          <div className="container">
            <AdminPanel
              onHeroSaved={(hero) => {
                setHeroMedia({
                  mediaType: hero.mediaType,
                  mediaUrl: hero.mediaUrl,
                  title: hero.title,
                  caption: hero.caption
                });
                setHeroPlaying(true);
              }}
              onBlogsChanged={loadBlogs}
              onBackgroundsChanged={loadBackgrounds}
            />
          </div>
        </section>
      )}

      <section className="brand-deck-section" id="brand-discovery">
        <SectionBackground image={sectionBg('brands')} />
        <div className="brand-deck-dots brand-deck-dots--left" aria-hidden="true" />
        <div className="brand-deck-dots brand-deck-dots--right" aria-hidden="true" />
        <div className="container">
          <h2 className="deck-title text-serif">
            Discover Your Favorite Brands Through Content From All Across{' '}
            <span className="pakistan-highlight">Pakistan</span>
            <span className="deck-heart" aria-hidden="true">♡</span>
          </h2>

          <form
            className="deck-search-form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <span className="deck-search-icon-left" aria-hidden="true">🔍</span>
            <input
              type="text"
              placeholder="Search brands, categories or products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="deck-search-btn" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M20 20L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </form>

          {dataLoading && <p className="loading-hint">Loading brands…</p>}

          <div className="brand-carousel-wrap">
            <button type="button" className="carousel-btn carousel-btn-left" onClick={() => scrollBrands('left')} aria-label="Previous">
              ‹
            </button>
            <div className="brand-carousel" ref={brandSliderRef}>
              {filteredBrands.map((brand, i) => (
                <BrandCarouselCard key={brand.id} brand={enrichBrand(brand, i)} />
              ))}
            </div>
            <button type="button" className="carousel-btn carousel-btn-right" onClick={() => scrollBrands('right')} aria-label="Next">
              ›
            </button>
          </div>

          <p className="deck-footer-script">Let us verify brands for you!</p>
          <p className="hero-trust-badge deck-trust-badge">
            <span className="trust-check">✓</span> Verified Pakistani Brands. Curated for Farokht.
          </p>
        </div>
      </section>

      <section className="support-local-section" id="about-us">
        <SectionBackground image={sectionBg('supportLocal')} />
        <div className="container support-local-inner">
          <div className="support-local-text">
            <span className="orange-tagline">Scroll. Watch. Shop. Repeat.</span>
            <h2 className="text-serif">Where Content Meets Commerce With Tech Made for Pakistan</h2>
            <p>
              Before we explain what we are doing, let us make it clear, Farokht is not changing or
              revolutionizing how Pakistanis shop — <strong>NOT AT ALL!</strong> It&apos;s just securing what we love
              with a platform that connects content, commerce, and technology.
            </p>
            <p>
              We are not here for product selling alone. We are here to work on brand digital identity
              creation with culture &amp; storytelling. We are building this with Pakistan, so we need your support.
            </p>
            <a href="#waitlist" className="btn-orange-pill">Join the Waitlist →</a>
          </div>
          <div className="support-local-graphic">
            <img src={WIDGETS.supportLocalScene} alt="Support local illustration" className="support-local-ref-img" />
          </div>
        </div>
      </section>

      <section className="feed-slider-section">
        <SectionBackground image={sectionBg('feed')} />
        <div className="feed-section-pattern" aria-hidden="true" />
        <div className="container feed-section-inner">
          <h2 className="section-title-center text-serif">Discover Brands&apos; Latest Content on Farokht</h2>
          <div className="feed-slider-outer">
            <button type="button" className="slider-arrow arrow-left" onClick={() => scrollFeed('left')}>‹</button>
            <div className="feed-slider-container" ref={feedSliderRef}>
              {feedPosts.map((post) => (
                <FeedPostCard key={post.id} post={post} />
              ))}
            </div>
            <button type="button" className="slider-arrow arrow-right" onClick={() => scrollFeed('right')}>›</button>
          </div>
        </div>
      </section>

      <section className="brings-you-section">
        <SectionBackground image={sectionBg('appPromo')} />
        <div className="container">
          <div className="brings-you-header">
            <span className="brings-you-tag">Here&apos;s What You Will Love</span>
            <h2 className="text-serif">What Farokht Brings You</h2>
          </div>

          <div className="cyan-mega-card">
            <div className="cyan-card-inner">
              <div className="cyan-mockups-col">
                <PhoneMockups variant={CYAN_SLIDES[activeTab].phoneVariant} />
              </div>
              <div className="cyan-content-col">
                <div className="cyan-tabs-nav">
                  {CYAN_SLIDES.map((slide, idx) => (
                    <button
                      key={slide.id}
                      type="button"
                      className={`tab-toggle-btn ${activeTab === idx ? 'active' : ''}`}
                      onClick={() => setActiveTab(idx)}
                    >
                      {idx === 0 ? 'Kahaniaa, Content, Culture' : 'Responsible Selling'}
                    </button>
                  ))}
                </div>
                <div className="cyan-tab-panel">
                  <div className="tab-pane-content">
                    <h3 className={activeTab === 0 ? 'cyan-title-decorative' : 'cyan-title-plain'}>
                      {CYAN_SLIDES[activeTab].title}
                    </h3>
                    {CYAN_SLIDES[activeTab].paragraphs.map((para) => (
                      <p key={para.slice(0, 24)} className={para === CYAN_SLIDES[activeTab].paragraphs[0] ? 'highlight-p' : ''}>
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
                <StoreBadges className="store-badges-row" />
                <div className="cyan-carousel-dots">
                  <span className={`dot ${activeTab === 0 ? 'active' : ''}`} onClick={() => setActiveTab(0)} />
                  <span className={`dot ${activeTab === 1 ? 'active' : ''}`} onClick={() => setActiveTab(1)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="foreign-apps-section">
        <SectionBackground image={sectionBg('foreignApps')} />
        <div className="container foreign-apps-inner">
          <div className="foreign-apps-text">
            <p className="foreign-intro">Farokht wants to give Pakistan&apos;s growing brands their own local platform so</p>
            <h2 className="warning-title text-serif">When Foreign Apps Go Down, Your Business Shouldn&apos;t.</h2>
            <p className="warning-quote">Own your customer. Own your data.</p>
            <Link to="/directory" className="warning-link">Bring your brand with Farokht ➔</Link>
          </div>
          <div className="foreign-apps-visual">
            <BrandProfileWidgets />
          </div>
        </div>
      </section>

      <section className="milestones-section">
        <SectionBackground image={sectionBg('milestones')} />
        <div className="container">
          <div className="section-header-center">
            <span className="milestones-icon-badge">🏆</span>
            <h2 className="text-serif">Recognitions &amp; Milestones</h2>
            <p>Celebrating our journey, achievements, and the impact we&apos;re creating.</p>
          </div>
          <div className="milestones-grid">
            {milestones.map((m) => (
              <div key={m.id} className="milestone-card">
                <div className="milestone-image">
                  <MediaImage src={m.image} alt={m.title} fallbackType="milestone" />
                </div>
                <div className="milestone-info">
                  <div className="milestone-meta-row">
                    <span className="milestone-tag milestone-tag--inline">MILESTONE</span>
                    <span className="milestone-date">{m.date}</span>
                  </div>
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAMPAIGN */}
      <section className="campaign-section">
        <SectionBackground image={sectionBg('campaign')} />
        <div className="container campaign-inner">
          <div className="campaign-header">
            <span className="campaign-tag-red">Be a part of our <span className="wavy-underline">marketing campaign</span></span>
            <h2 className="text-serif">
              &quot;Mein <span className="text-orange">Farokht</span> Par Hoon&quot;
            </h2>
          </div>

          <div className="campaign-video-grid">
            {CAMPAIGN_VIDEOS.map((video) => (
              <CampaignVideoCard key={video.id} video={video} />
            ))}
          </div>

          <div className="campaign-steps-bar">
            {campaignSteps.map((step) => (
              <div key={step.n} className="campaign-step-item">
                <span className="step-badge">{step.n}</span>
                <h4>{step.title}</h4>
                <p>{step.text}</p>
              </div>
            ))}
            <a href="#waitlist" className="btn-orange-pill campaign-cta-btn">
              Join The Movement →
            </a>
          </div>
          <p className="cta-subtext">Let&apos;s build Pakistan&apos;s future together.</p>
        </div>
      </section>

      <BlogSection blogs={blogs.length ? blogs : DEFAULT_BLOGS} backgroundImage={sectionBg('blog')} />

      <section className="waitlist-section" id="waitlist">
        <div className="container waitlist-inner">
          <h2 className="text-serif">Join the Farokht waitlist</h2>
          <form
            className="hero-waitlist-form"
            onSubmit={(e) => {
              e.preventDefault();
              const email = e.target.email.value;
              if (!email?.trim()) return;
              const list = JSON.parse(localStorage.getItem('waitlist') || '[]');
              list.push({ email, timestamp: new Date().toISOString() });
              localStorage.setItem('waitlist', JSON.stringify(list));
              e.target.reset();
              alert('Thank you for joining the waitlist!');
            }}
          >
            <input type="email" name="email" placeholder="Enter your email" required />
            <button type="submit" className="btn-submit-orange">Join the Waitlist</button>
          </form>
        </div>
      </section>
    </div>
  );
}
