import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { supabase } from "../../lib/supabaseclient";

const Navbar = () => {
  const { user, setUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = ["Home", "Marketplace", "About", "Contact"];

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    closeMenu();
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        background: "var(--gradient-primary)",
        borderBottom: "2px solid var(--border-accent)",
      }}
      className="shadow-xl px-4 sm:px-6 lg:px-10 py-4 lg:py-5 flex flex-col lg:flex-row lg:justify-between lg:items-center sticky top-0 z-50 backdrop-blur-md"
    >
      <div className="w-full flex items-center justify-between">
        <Link
          to="/"
          className="text-3xl font-serif font-bold tracking-widest hover:opacity-80 transition-opacity flex items-center gap-2"
          style={{ color: "var(--accent-primary)" }}
          onClick={closeMenu}
        >
          <span className="text-4xl">⚜</span> ANTIQ
        </Link>

        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border shadow-glow"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              color: "var(--accent-primary)",
              borderColor: "var(--border-primary)",
            }}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              color: "var(--accent-primary)",
              borderColor: "var(--border-primary)",
            }}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span className="flex flex-col gap-1">
              <span
                className="block w-4 h-0.5 rounded-full"
                style={{ background: "var(--accent-primary)" }}
              />
              <span
                className="block w-4 h-0.5 rounded-full"
                style={{ background: "var(--accent-primary)" }}
              />
              <span
                className="block w-4 h-0.5 rounded-full"
                style={{ background: "var(--accent-primary)" }}
              />
            </span>
          </button>
        </div>
      </div>

      <ul className="hidden lg:flex gap-10 font-medium items-center">
        {navItems.map((item) => (
          <li key={item}>
            <Link
              className="text-sm uppercase tracking-[0.2em] transition-colors duration-300 font-bold text-[var(--nav-link)] hover:text-[var(--nav-link-hover)]"
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>

      <div className="hidden lg:flex items-center gap-5">
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border shadow-glow"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            color: "var(--accent-primary)",
            borderColor: "var(--border-primary)",
          }}
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        <div className="h-6 w-px bg-white/20 hidden md:block" />

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/profile">
                <button
                  className="card-base px-6 py-2.5 font-bold text-xs uppercase tracking-widest rounded-full transition-all hover:scale-105 border shadow-md flex items-center"
                  style={{
                    padding: "0.75rem 1.5rem",
                    color: "var(--text-primary)",
                  }}
                >
                  Portfolio
                </button>
              </Link>
              <Link to="/additem">
                <button className="btn-primary px-6 py-2.5 font-bold text-xs uppercase tracking-widest rounded-full shadow-glow">
                  Sell
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors"
              >
                Exit
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button
                  className="px-6 py-2.5 font-bold text-xs uppercase tracking-widest rounded-full transition-all hover:text-yellow-400"
                  style={{ color: "white" }}
                >
                  Sign In
                </button>
              </Link>
              <Link to="/signup">
                <button className="btn-primary px-8 py-2.5 font-bold text-xs uppercase tracking-widest rounded-full shadow-glow">
                  Join Guild
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{
          maxHeight: isMenuOpen ? 520 : 0,
          opacity: isMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{ overflow: "hidden" }}
        className="lg:hidden w-full"
      >
        <div
          className="mt-4 w-full rounded-2xl border shadow-md backdrop-blur-md"
          style={{
            background: "var(--gradient-card)",
            borderColor: "var(--border-primary)",
            padding: "1rem",
          }}
        >
          <ul className="flex flex-col gap-3 font-medium">
            {navItems.map((item) => (
              <li key={item}>
                <Link
                  className="block text-sm uppercase tracking-[0.2em] transition-colors duration-300 font-bold text-[var(--nav-link)] hover:text-[var(--nav-link-hover)]"
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  onClick={closeMenu}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 pt-4 border-t" style={{ borderColor: "var(--border-secondary)" }}>
            {user ? (
              <div className="flex flex-col gap-3">
                <Link to="/profile" onClick={closeMenu}>
                  <button className="btn-secondary w-full text-xs uppercase tracking-widest rounded-full">
                    Portfolio
                  </button>
                </Link>
                <Link to="/additem" onClick={closeMenu}>
                  <button className="btn-primary w-full text-xs uppercase tracking-widest rounded-full shadow-glow">
                    Sell
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors text-left"
                >
                  Exit
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link to="/login" onClick={closeMenu}>
                  <button className="btn-secondary w-full text-xs uppercase tracking-widest rounded-full">
                    Sign In
                  </button>
                </Link>
                <Link to="/signup" onClick={closeMenu}>
                  <button className="btn-primary w-full text-xs uppercase tracking-widest rounded-full shadow-glow">
                    Join Guild
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;

