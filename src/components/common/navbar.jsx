import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-r from-blue-950 via-blue-900 to-amber-900 text-white shadow-lg px-6 py-4 flex justify-between items-center border-b border-amber-600"
    >
      {/* Logo */}
      <Link
        to="/"
        className="text-3xl font-serif font-bold tracking-wide text-amber-400 hover:text-amber-300 transition"
      >
        ANTIQ
      </Link>

      {/* Nav Links */}
      <ul className="hidden md:flex gap-8 font-medium">
        <li><Link className="hover:text-amber-300 transition" to="/">Home</Link></li>
        <li><Link className="hover:text-amber-300 transition" to="/marketplace">Marketplace</Link></li>
        <li><Link className="hover:text-amber-300 transition" to="/about">About</Link></li>
        <li><Link className="hover:text-amber-300 transition" to="/contact">Contact</Link></li>
      </ul>

      {/* Buttons */}
      <div className="space-x-4 hidden md:flex">
        <Link to="/login">
          <button className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-md rounded-lg transition-all hover:scale-105">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-md rounded-lg transition-all hover:scale-105">
            Sign Up
          </button>
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
