import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSellItem = () => {
    if (user) {
      navigate("/additem");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="relative px-6 py-20 lg:py-32 overflow-hidden transition-colors duration-300">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none transition-opacity duration-1000">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] rounded-full blur-[100px] opacity-20"
          style={{ background: 'var(--accent-primary)' }} />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[50%] rounded-full blur-[100px] opacity-10"
          style={{ background: 'var(--accent-secondary)' }} />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block px-4 py-1 rounded-full mb-6 font-semibold tracking-wider text-sm border uppercase"
            style={{
              background: 'var(--bg-hover)',
              color: 'var(--accent-primary)',
              borderColor: 'var(--border-accent)'
            }}
          >
            🏛️ Curating History Since 1892
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 italic leading-tight"
            style={{ color: 'var(--text-primary)' }}>
            The Art of <br />
            <span className="text-gradient">Time & Legacy</span>
          </h1>

          <p className="text-xl md:text-2xl mb-10 max-w-xl font-light leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}>
            Discover and bid on rare antiques, vintage collectibles, and historical artifacts
            passed through generations of refined taste.
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <Link to="/marketplace">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px var(--accent-primary)" }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary w-full sm:w-auto px-10 py-4 rounded-xl text-lg tracking-wide shadow-xl"
              >
                Explore Collections
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSellItem}
              className="card-base w-full sm:w-auto px-10 py-4 rounded-xl font-bold text-lg uppercase tracking-wide transition-all border-2 flex items-center justify-center"
              style={{
                padding: '1rem 2.5rem',
                color: 'var(--text-primary)',
                borderColor: 'var(--accent-primary)'
              }}
            >
              Sell an Item
            </motion.button>
          </div>

          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-lg"
                  style={{ borderColor: 'var(--bg-primary)' }}>
                  <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <p className="text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>
              <span className="font-bold" style={{ color: 'var(--text-primary)' }}>5.2k+</span> active bidders this hour
            </p>
          </div>
        </motion.div>

        {/* Right Content - Hero Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="hidden lg:block relative"
        >
          {/* Glass Card */}
          <div className="glass rounded-3xl p-8 relative z-20 shadow-2xl overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 opacity-50" 
              style={{ background: 'linear-gradient(90deg, transparent, var(--accent-primary), transparent)' }} />

            <div className="relative mb-6 rounded-2xl overflow-hidden shadow-inner h-80">
              <img
                src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=800&q=80"
                alt="Featured Artifact"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest bg-red-600 text-white animate-pulse">
                Ending Soon
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-2xl font-serif font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                    Victorian Chronometer
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>1875 English Admiralty Edition</p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-tighter" style={{ color: 'var(--text-tertiary)' }}>Highest Bid</p>
                  <p className="text-2xl font-bold font-serif" style={{ color: 'var(--accent-primary)' }}>$12,450</p>
                </div>
              </div>

              <Link to="/marketplace" className="block text-center py-3 rounded-xl font-bold transition-all hover:brightness-110"
                style={{ background: 'var(--gradient-primary)', color: 'white' }}>
                Bid Now
              </Link>
            </div>
          </div>

          {/* Background Decorative Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-dashed rounded-full animate-spin-slow opacity-10 pointer-events-none"
            style={{ borderColor: 'var(--accent-primary)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] border border-dotted rounded-full animate-spin-slow opacity-20 pointer-events-none"
            style={{ borderColor: 'var(--accent-secondary)', animationDirection: 'reverse' }} />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

