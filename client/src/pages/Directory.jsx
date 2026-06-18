import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { sampleBrands } from '../data/sampleData';
import './Directory.css';

export default function Directory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [filteredBrands, setFilteredBrands] = useState(sampleBrands);

  const categories = ["All", "Fashion", "Beauty", "Food", "Home Decor"];

  useEffect(() => {
    let result = sampleBrands;

    // Filter by category
    if (activeCategory !== 'All') {
      result = result.filter(brand => brand.category === activeCategory);
    }

    // Filter by search query
    if (search.trim() !== '') {
      const query = search.toLowerCase();
      result = result.filter(brand => 
        brand.name.toLowerCase().includes(query) ||
        brand.handle.toLowerCase().includes(query) ||
        brand.description.toLowerCase().includes(query)
      );
    }

    setFilteredBrands(result);
  }, [search, activeCategory]);

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    setSearchParams(category === 'All' ? {} : { category });
  };

  return (
    <div className="directory-page container">
      <div className="directory-header">
        <h1 className="text-gold">Brand Directory</h1>
        <p>Browse verified Pakistani creative entrepreneurs and join their community hubs directly.</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="directory-controls glass">
        <div className="search-box">
          <svg className="search-icon" viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <input 
            type="text" 
            placeholder="Search brands by name, handles, keywords..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="category-pills">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => handleCategorySelect(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results grid */}
      {filteredBrands.length > 0 ? (
        <div className="directory-grid">
          {filteredBrands.map(brand => (
            <Link to={`/brand/${brand.handle}`} key={brand.id} className="directory-card glass">
              <div className="dir-card-banner" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url(${brand.cover})` }}>
                <span className="dir-card-cat">{brand.category}</span>
              </div>
              <div className="dir-card-content">
                <div className="dir-card-header">
                  <img src={brand.logo} alt={brand.name} className="dir-card-logo" />
                  <div className="dir-card-title">
                    <h3>
                      {brand.name}
                      {brand.isVerified && <span className="verified-badge" style={{ padding: '1px 5px', fontSize: '0.6rem', marginLeft: '6px' }}>✓ Verified</span>}
                    </h3>
                    <p>@{brand.handle}</p>
                  </div>
                </div>
                <p className="dir-card-desc">{brand.description}</p>
                <div className="dir-card-footer">
                  <span className="products-count">{brand.products.length} Products</span>
                  <span className="view-profile-link text-gold">View Profile &rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="no-results glass">
          <h3>No brands found</h3>
          <p>We couldn't find any brands matching your criteria. Try adjusting your filter tags or search text.</p>
        </div>
      )}
    </div>
  );
}
