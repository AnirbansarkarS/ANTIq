const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-950 via-blue-900 to-amber-900 py-10 text-white mt-10 border-t border-amber-600">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-6">

        <div>
          <h2 className="text-3xl font-serif font-bold text-amber-400">ANTIQ</h2>
          <p className="text-gray-300 mt-3">
            The premium marketplace for rare historical artifacts.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-amber-300">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li><a href="/" className="hover:text-amber-400">Home</a></li>
            <li><a href="/marketplace" className="hover:text-amber-400">Marketplace</a></li>
            <li><a href="/about" className="hover:text-amber-400">About</a></li>
            <li><a href="/contact" className="hover:text-amber-400">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-amber-300">Support</h3>
          <ul className="mt-3 space-y-2">
            <li>Help Center</li>
            <li>Terms & Policy</li>
            <li>Privacy</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-amber-300">Connect</h3>
          <p className="mt-3">Email: support@antiq.com</p>
        </div>
      </div>

      <div className="text-center text-gray-400 mt-6 border-t border-amber-700 pt-4">
        © {new Date().getFullYear()} ANTIQ Auctions. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
