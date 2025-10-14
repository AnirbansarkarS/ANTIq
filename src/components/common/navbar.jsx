import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-amber-200 to-amber-400 text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-amber-300 font-serif">
          ANTIQ
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link 
            to="/" 
            className="hover:text-amber-300 transition-colors duration-300 font-medium"
          >
            Home
          </Link>
          <Link 
            to="/marketplace" 
            className="hover:text-amber-300 transition-colors duration-300 font-medium"
          >
            Marketplace
          </Link>
          <Link 
            to="/dashboard" 
            className="hover:text-amber-300 transition-colors duration-300 font-medium"
          >
            My Bids
          </Link>
        </div>

        {/* Auth Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link 
            to="/login" 
            className="hover:text-amber-300 transition-colors duration-300"
          >
            Login
          </Link>
          <Link 
            to="/signup" 
            className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-lg transition-colors duration-300 shadow-md"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-amber-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-amber-800 mt-4 py-4 px-6 rounded-lg shadow-lg">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="hover:text-amber-300 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/marketplace" 
              className="hover:text-amber-300 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Marketplace
            </Link>
            <Link 
              to="/dashboard" 
              className="hover:text-amber-300 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              My Bids
            </Link>
            <div className="border-t border-amber-600 pt-4 flex flex-col space-y-3">
              <Link 
                to="/login" 
                className="hover:text-amber-300 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-lg text-center transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;