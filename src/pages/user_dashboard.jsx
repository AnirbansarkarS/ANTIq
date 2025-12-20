import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseclient";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getUserStats, getUserItems } from "../lib/database";
import AuctionCard from "../components/common/AuctionCard";

export default function UserDashboard() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [myItems, setMyItems] = useState([]);
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("listings");

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const [items, stats] = await Promise.all([
        getUserItems(user.id, 'active'),
        getUserStats(user.id)
      ]);

      // Transform raw items to satisfy AuctionCard format
      const transformedItems = (items || []).map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        currentBid: item.price || 0,
        bidCount: 0,
        endTime: item.auction_end_time ? new Date(item.auction_end_time) : new Date(Date.now() + 86400000),
        image: item.image_url
      }));

      setMyItems(transformedItems);
      setUserStats(stats);
    } catch (err) {
      console.error("Error fetching user data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen py-16 px-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="card-base mb-12 relative overflow-hidden rounded-[3rem] p-12"
        >
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-80 h-80 opacity-[0.03] pointer-events-none -rotate-12">
            <svg viewBox="0 0 100 100" className="w-full h-full" style={{ fill: 'var(--accent-primary)' }}>
              <path d="M50,0 Q100,0 100,50 Q100,100 50,100 Q0,100 0,50 Q0,0 50,0" />
            </svg>
          </div>

          <div className="flex flex-col lg:row justify-between items-start lg:items-center relative z-10 gap-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 rounded-full border-4 overflow-hidden shadow-xl"
                style={{ borderColor: 'var(--accent-primary)' }}>
                <img src={`https://i.pravatar.cc/150?u=${user?.id}`} alt="profile" className="w-full h-full object-cover" />
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-5xl md:text-6xl font-serif font-black mb-2 tracking-tighter italic" style={{ color: 'var(--text-primary)' }}>
                  Collector Portfolio
                </h1>
                <p className="text-lg font-serif italic opacity-60" style={{ color: 'var(--text-primary)' }}>
                  {user?.email}
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                  <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm"
                    style={{ background: 'var(--bg-hover)', color: 'var(--text-accent)', borderColor: 'var(--border-primary)' }}>
                    Verified Purveyor
                  </span>
                  <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm"
                    style={{ background: 'var(--bg-hover)', color: 'var(--text-primary)', borderColor: 'var(--border-secondary)' }}>
                    Grand Merchant
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-5 w-full lg:w-auto">
              <Link to="/additem" className="flex-1 lg:flex-none">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full text-xs tracking-[0.2em] px-8 py-4 rounded-[1.5rem]"
                >
                  + New Auction
                </motion.button>
              </Link>
              <button
                onClick={handleLogout}
                className="px-8 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] transition-all border shadow-premium flex-1 lg:flex-none card-base"
                style={{
                  color: 'var(--text-primary)',
                  padding: '1rem 2rem'
                }}
              >
                Exit Gallery
              </button>
            </div>
          </div>

          {/* Performance Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 relative z-10">
            {[
              { label: "Active Listings", value: userStats?.active_listings || 0, color: 'var(--accent-primary)' },
              { label: "Current Bids", value: userStats?.active_bids || 0, color: 'var(--accent-secondary)' },
              { label: "Total Revenue", value: `$${(userStats?.total_sales_amount || 0).toLocaleString()}`, color: 'var(--accent-primary)' },
              { label: "Trust Index", value: "99.2%", color: 'var(--text-accent)' }
            ].map((stat, i) => (
              <div key={i} className="card-base p-6 rounded-3xl flex flex-col justify-center items-center text-center">
                <p className="text-[10px] uppercase tracking-widest mb-2 font-black opacity-60" style={{ color: 'var(--text-primary)' }}>{stat.label}</p>
                <p className="text-3xl font-serif font-black tracking-tight" style={{ color: stat.color }}>{stat.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dashboard Content */}
        <div className="space-y-10">
          {/* Tabs */}
          <div className="flex gap-12 border-b" style={{ borderColor: 'var(--border-secondary)' }}>
            {[
              { id: "listings", label: "My Archives", count: myItems.length },
              { id: "bids", label: "Acquisitions", count: 0 },
              { id: "watchlist", label: "Watchlist", count: 0 }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="pb-6 text-xs font-black uppercase tracking-[0.3em] relative transition-all"
                style={{
                  color: activeTab === tab.id ? 'var(--accent-primary)' : 'var(--text-tertiary)'
                }}
              >
                {tab.label} <span className="opacity-40 ml-1">({tab.count})</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 w-full h-1 rounded-full shadow-glow"
                    style={{ background: 'var(--accent-primary)' }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {loading ? (
              <div className="text-center py-24">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
                  style={{ borderColor: 'var(--accent-primary)' }}></div>
              </div>
            ) : myItems.length === 0 ? (
              <div className="card-base text-center py-32 rounded-[3rem] border-dashed shadow-premium">
                <p className="text-2xl font-serif italic mb-8 opacity-40" style={{ color: 'var(--text-primary)' }}>
                  Your personal archives are currently empty.
                </p>
                <Link to="/additem">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="btn-primary px-10 py-4 rounded-[1.5rem] text-sm tracking-[0.2em]"
                  >
                    Curate First Artifact
                  </motion.button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
                {myItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="w-full"
                  >
                    <AuctionCard item={item} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

