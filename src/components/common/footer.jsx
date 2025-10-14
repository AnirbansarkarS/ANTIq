import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-foreground to-foreground/95 text-primary-foreground py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-3xl font-bold text-secondary mb-4 font-serif">ANTIQ</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Preserving history through authentic antique auctions. 
              Join our community of collectors and history enthusiasts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-secondary font-serif">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/marketplace" className="text-primary-foreground/80 hover:text-secondary transition-colors">Marketplace</Link></li>
              <li><Link to="/dashboard" className="text-primary-foreground/80 hover:text-secondary transition-colors">My Bids</Link></li>
              <li><Link to="/" className="text-primary-foreground/80 hover:text-secondary transition-colors">Current Auctions</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-secondary font-serif">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">Help Center</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">Authentication</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">Shipping Info</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-secondary font-serif">Contact</h4>
            <ul className="space-y-3 text-primary-foreground/80">
              <li>contact@antiq.com</li>
              <li>+1 (555) 123-4567</li>
              <li>London, UK</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-10 pt-8 text-center text-secondary">
          <p>&copy; 2024 ANTIQ Auctions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;