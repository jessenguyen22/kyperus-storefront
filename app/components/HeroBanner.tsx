import {Link} from 'react-router';
import '../styles/HeroBanner.css';

export function HeroBanner() {
  return (
    <section 
      className="hero-banner"
      style={{
        backgroundImage: 'url(/images/hero.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-grid">
        <div className="hero-column">
          <Link to="/collections/traditional" className="hero-image-container">
            <img 
              src="/images/left_image.png" 
              alt="Traditional Cues" 
              className="hero-image"
            />
            <div className="hero-content">
              <h2>Traditional</h2>
              <p>Classic pool cues with timeless design</p>
            </div>
          </Link>
        </div>
        <div className="hero-column">
          <Link to="/collections/modern" className="hero-image-container">
            <img 
              src="/images/middle_image.png" 
              alt="Modern Cues" 
              className="hero-image"
            />
            <div className="hero-content">
              <h2>Modern</h2>
              <p>Contemporary cues with innovative features</p>
            </div>
          </Link>
        </div>
        <div className="hero-column">
          <Link to="/collections/hybrid" className="hero-image-container">
            <img 
              src="/images/right_image.png" 
              alt="Hybrid Cues" 
              className="hero-image"
            />
            <div className="hero-content">
              <h2>Hybrid</h2>
              <p>The perfect blend of tradition and innovation</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
} 