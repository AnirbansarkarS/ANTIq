import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="pt-20 pb-10 transition-colors duration-300 relative z-10"
      style={{
        background: 'var(--gradient-card)',
        borderTop: '1px solid var(--border-primary)',
        color: 'var(--text-secondary)'
      }}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div className="space-y-6">
          <Link to="/" className="text-4xl font-serif font-bold tracking-tighter text-gradient">
            ANTIQ
          </Link>
          <p className="text-sm leading-relaxed max-w-xs">
            The world's premier auction house for historical treasures,
            connecting collectors with legacies of craftsmanship since 1892.
          </p>
          <div className="flex gap-4">
            {['📱', '📸', '🐦', '💼'].map((icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:-translate-y-1"
                style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-secondary)' }}>
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Links Section 1 */}
        <div>
          <h4 className="text-lg font-serif font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Collections
          </h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/marketplace" className="hover:text-[var(--accent-primary)] transition-colors">Ancient Artifacts</Link></li>
            <li><Link to="/marketplace" className="hover:text-[var(--accent-primary)] transition-colors">Victorian Watches</Link></li>
            <li><Link to="/marketplace" className="hover:text-[var(--accent-primary)] transition-colors">Medieval Weaponry</Link></li>
            <li><Link to="/marketplace" className="hover:text-[var(--accent-primary)] transition-colors">Fine Art & Murals</Link></li>
          </ul>
        </div>

        {/* Links Section 2 */}
        <div>
          <h4 className="text-lg font-serif font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Company
          </h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/about" className="hover:text-[var(--accent-primary)] transition-colors">Our History</Link></li>
            <li><Link to="/contact" className="hover:text-[var(--accent-primary)] transition-colors">Expert Appraisal</Link></li>
            <li><Link to="#" className="hover:text-[var(--accent-primary)] transition-colors">Privacy Policy</Link></li>
            <li><Link to="#" className="hover:text-[var(--accent-primary)] transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div>
          <h4 className="text-lg font-serif font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Expertise
          </h4>
          <p className="text-sm mb-4">Join our inner circle for exclusive previews of upcoming royal auctions.</p>
          <div className="space-y-3">
            <input
              type="email"
              placeholder="Your email address"
              className="input-field"
            />
            <button className="btn-primary w-full">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t text-center text-xs"
        style={{ borderColor: 'var(--border-primary)' }}>
<p>
  © {new Date().getFullYear()} ANTIQ Global Auctioneers. Preserving the pulse of history with every bid. 
  <span className="sr-only"> </span> {/* Screen reader only space */}
  <br />
  (It is dedicated to one person I started building this website... ❤️) 
</p>      </div>
    </footer>
  );
};

export default Footer;

