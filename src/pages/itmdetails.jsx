import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import { getItemById, closeAuction } from "../lib/database";
import BidPanel from "../components/auction/BidPanel";
import AuctionTimer from "../components/auction/AuctionTimer";
import { useAuction } from "../hooks/useAuction";

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [winner, setWinner] = useState(null);

  const { isEnded } = useAuction(item?.endTime, async () => {
    // This callback runs when the countdown reaches zero
    if (item?.status === 'active') {
      try {
        const { item: updatedItem, highestBid } = await closeAuction(id);
        setItem(prev => ({ ...prev, status: updatedItem.status }));
        if (highestBid) setWinner(highestBid);
      } catch (err) {
        console.error("Error closing auction:", err);
      }
    }
  });

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      const data = await getItemById(id);

      // Transform data to include endTime
      const transformedItem = {
        ...data,
        endTime: data.auction_end_time ? new Date(data.auction_end_time) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      };
      setItem(transformedItem);

      // Check if item already has a winner
      if (data.status === 'sold') {
        const { data: bids } = await supabase
          .from('bids')
          .select('*, bidder:users(id, name, avatar_url)')
          .eq('item_id', id)
          .order('amount', { ascending: false })
          .limit(1)
          .single();
        if (bids) setWinner(bids);
      }
    } catch (err) {
      console.error("Error fetching item:", err);
      // Fallback/Demo data if needed
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 mb-4"
            style={{ borderColor: 'var(--accent-primary)' }}></div>
          <div className="text-xl font-serif" style={{ color: 'var(--text-primary)' }}>Authenticating Artifact...</div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center transition-colors duration-300">
        <div className="text-center p-12 card-base rounded-3xl" style={{ border: '1px solid var(--border-primary)' }}>
          <h2 className="text-4xl font-serif font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Archive Not Found</h2>
          <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>The requested artifact may have been moved or delisted.</p>
          <Link to="/marketplace"
            className="px-8 py-3 rounded-xl font-bold transition-all shadow-lg inline-block btn-primary"
            style={{ color: '#2c1810' }}>
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-8">
        {/* Navigation & Status Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <motion.button
            whileHover={{ x: -8 }}
            onClick={() => navigate(-1)}
            className="text-xs uppercase tracking-[0.3em] font-black flex items-center gap-3 transition-all p-3 rounded-full hover:bg-black/5 dark:hover:bg-white/5"
            style={{ color: 'var(--text-primary)' }}
          >
            <span className="text-lg">←</span> Gallery Archives
          </motion.button>

          <div className="flex flex-wrap gap-4 items-center">
            {isEnded && (
              <span className="px-5 py-2 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-sm"
                style={{
                  backgroundColor: 'var(--status-error)',
                  color: '#fff',
                  opacity: 0.9
                }}>
                Closed Archive
              </span>
            )}
            <span className="px-5 py-2 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-premium"
              style={{ background: 'var(--bg-card)', color: 'var(--accent-primary)', border: '1px solid var(--border-secondary)' }}>
              Artifact NO. {item.id.slice(0, 8).toUpperCase()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column - Visuals and Context */}
          <div className="lg:col-span-7 space-y-12">
            {/* Primary Visual */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative rounded-[3rem] overflow-hidden shadow-xl group border-2"
              style={{ borderColor: 'var(--border-primary)' }}
            >
              <img
                src={item.image_url || "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=800&q=60"}
                alt={item.title}
                className="w-full h-[400px] md:h-[700px] object-cover transition-transform duration-[3s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity" />

              {!isEnded && (
                <div className="absolute top-10 right-10">
                  <AuctionTimer endTime={item.endTime} size="xl" />
                </div>
              )}

              {/* Status Overlay */}
              <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                <div className="px-4 py-2 bg-black/40 backdrop-blur-md rounded-xl border border-white/10">
                  <p className="text-[10px] uppercase tracking-widest text-white/60 font-bold mb-0.5">Category</p>
                  <p className="text-sm font-bold text-white uppercase tracking-wider">{item.category}</p>
                </div>
              </div>
            </motion.div>

            {/* Historical Context */}
            <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card-base p-12 relative overflow-hidden"
          >
              <div className="absolute -top-10 -right-10 w-48 h-48 opacity-[0.03] pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full" style={{ fill: 'var(--accent-primary)' }}>
                  <path d="M50,0 Q100,0 100,50 Q100,100 50,100 Q0,100 0,50 Q0,0 50,0" />
                </svg>
              </div>

              <h1 className="text-5xl md:text-7xl font-serif font-black mb-8 italic tracking-tighter"
                style={{ color: 'var(--text-primary)' }}>
                {item.title}
              </h1>

              {/* Characteristics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {[
                  { icon: "⚜", label: item.condition, sub: "Status" },
                  { icon: "📅", label: item.year, sub: "Period" },
                  { icon: "🌍", label: item.origin, sub: "Origin" },
                  { icon: "📁", label: item.category, sub: "Legacy" }
                ].map((badge, i) => badge.label && (
                  <div key={i} className="p-4 rounded-2xl border transition-all hover:bg-black/5 dark:hover:bg-white/5"
                    style={{ background: 'var(--bg-hover)', borderColor: 'var(--border-secondary)' }}>
                    <p className="text-[9px] uppercase tracking-widest font-black mb-1 opacity-40" style={{ color: 'var(--text-primary)' }}>{badge.sub}</p>
                    <p className="text-xs font-black uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>{badge.icon} {badge.label}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <h3 className="text-[10px] uppercase tracking-[0.4em] font-black whitespace-nowrap" style={{ color: 'var(--accent-primary)' }}>The Provenance</h3>
                  <div className="h-px w-full opacity-20" style={{ background: 'var(--accent-primary)' }} />
                </div>
                <p className="text-2xl leading-[1.8] font-serif italic font-light opacity-80" style={{ color: 'var(--text-primary)' }}>
                  "{item.description}"
                </p>
              </div>
            </motion.div>

            {/* Winner Announcement Section */}
            {winner && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-[2.5rem] p-12 text-center relative overflow-hidden shadow-glow border-2"
                style={{ borderColor: 'var(--accent-primary)', background: 'var(--bg-hover)' }}
              >
                <div className="relative z-10">
                  <h2 className="text-xs uppercase tracking-[0.5em] font-black mb-4" style={{ color: 'var(--accent-primary)' }}>Official Acquisition</h2>
                  <p className="text-2xl md:text-4xl font-serif font-black mb-6" style={{ color: 'var(--text-primary)' }}>
                    Purchased by <span className="underline decoration-amber-500/50">@{winner.bidder?.name || 'Collector'}</span> for
                    <span className="block mt-4 text-6xl md:text-7xl font-black text-gradient-gold">
                      ${winner.amount.toLocaleString()}
                    </span>
                  </p>
                  <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">
                    Ledger ID: {winner.id.toUpperCase()}
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Bidding Infrastructure */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="sticky top-32"
            >
              <BidPanel itemId={id} isEnded={isEnded} />

              {/* Authenticity Guarantee */}
              <div className="mt-12 p-10 rounded-[2.5rem] glass text-center space-y-6 shadow-premium relative overflow-hidden"
                style={{ borderColor: 'var(--border-secondary)' }}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-gold opacity-50" />
                <span className="text-4xl block">🛡️</span>
                <h4 className="text-xs uppercase tracking-[0.3em] font-black" style={{ color: 'var(--text-primary)' }}>ANTIQ Certified</h4>
                <p className="text-sm leading-relaxed font-medium opacity-60" style={{ color: 'var(--text-secondary)' }}>
                  Each artifact in our gallery undergoes rigorous historical appraisal to verify its curation and provenance.
                </p>
                <button className="text-[10px] font-black uppercase tracking-widest border-b border-dotted" style={{ borderColor: 'var(--accent-primary)', color: 'var(--accent-primary)' }}>
                  View Certification Process
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;

