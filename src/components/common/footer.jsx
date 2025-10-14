import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-amber-900 to-yellow-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-amber-300 mb-4 font-serif">ANTIQ</h3>
            <p className="text-amber-200 text-sm leading-relaxed">
              Preserving history through authentic antique auctions. 
              Join our community of collectors and history enthusiasts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-amber-300">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/marketplace" className="text-amber-200 hover:text-amber-300 transition-colors">Marketplace</Link></li>
              <li><Link to="/dashboard" className="text-amber-200 hover:text-amber-300 transition-colors">My Bids</Link></li>
              <li><Link to="/" className="text-amber-200 hover:text-amber-300 transition-colors">Current Auctions</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-amber-300">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-amber-200 hover:text-amber-300 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-amber-200 hover:text-amber-300 transition-colors">Authentication</a></li>
              <li><a href="#" className="text-amber-200 hover:text-amber-300 transition-colors">Shipping Info</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-amber-300">Contact</h4>
            <ul className="space-y-2 text-amber-200">
              <li>contact@antiq.com</li>
              <li>+1 (555) 123-4567</li>
              <li>London, UK</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-amber-700 mt-8 pt-8 text-center text-amber-300">
          <p>&copy; 2024 ANTIQ Auctions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;