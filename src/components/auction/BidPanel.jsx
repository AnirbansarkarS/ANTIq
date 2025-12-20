import { useState } from 'react';
import { motion } from 'framer-motion';
import { useBidding } from '../../hooks/useBidding';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const BidPanel = ({ itemId, isEnded }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { bids, highestBid, submitBid, getMinimumBid, isUserWinning, bidCount, loading } = useBidding(itemId, user?.id);

    const [bidAmount, setBidAmount] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const minimumBid = getMinimumBid();

    const handleQuickBid = (amount) => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (isEnded) return;
        setBidAmount(amount.toString());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }
        if (isEnded) return;

        try {
            setError('');
            setSuccess(false);
            await submitBid(parseFloat(bidAmount));
            setSuccess(true);
            setBidAmount('');
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div
            className="card-base p-10 relative overflow-hidden transition-all duration-500 hover:shadow-glow"
        >
            {/* Ornate corner decoration */}
            <div className="absolute top-0 right-0 w-24 h-24 opacity-5 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full" style={{ fill: 'var(--accent-primary)' }}>
                    <path d="M100,0 L100,100 L0,0 Z" />
                </svg>
            </div>

            <h3
                className="text-sm uppercase tracking-[0.3em] font-bold mb-8 flex items-center gap-3"
                style={{ color: 'var(--accent-primary)' }}
            >
                {isEnded ? (
                    <span className="flex items-center gap-2">
                        <span className="text-xl">🏁</span> Final Appraisal
                    </span>
                ) : (
                    <span className="flex items-center gap-2">
                        <span className="animate-pulse">●</span> Live Acquisition
                    </span>
                )}
            </h3>

            {/* Current Bid Display */}
            <div
                className="p-8 rounded-3xl mb-10 relative group transition-all duration-500"
                style={{
                    background: 'var(--bg-hover)',
                    border: isEnded ? '2px solid var(--accent-primary)' : '1px solid var(--border-primary)'
                }}
            >
                <p
                    className="text-[10px] uppercase tracking-[0.2em] font-bold mb-3 opacity-60"
                    style={{ color: 'var(--text-primary)' }}
                >
                    {isEnded ? 'Final Realized Price' : 'Current Highest Bid'}
                </p>
                <div className="flex items-baseline gap-3">
                    <motion.p
                        key={highestBid?.amount}
                        initial={{ scale: 1.1, y: 10, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        className="text-6xl font-black font-serif tracking-tighter"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        ${(highestBid?.amount || 0).toLocaleString()}
                    </motion.p>
                    <span className="text-lg font-serif opacity-40">USD</span>
                </div>

                <div className="flex justify-between items-center mt-6 pt-6 border-t border-black/5 dark:border-white/5">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--status-success)' }} />
                        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>
                            {bidCount} {bidCount === 1 ? 'Bid' : 'Bids'}
                        </span>
                    </div>
                    {isEnded && (
                        <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-lg" 
                              style={{ 
                                  backgroundColor: 'rgba(212, 175, 55, 0.1)',
                                  color: 'var(--accent-primary)' 
                              }}>
                            Hammer Dropped 🔨
                        </span>
                    )}
                </div>
            </div>

            {/* User Status / Winner Celebration */}
            {isEnded ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-8 rounded-3xl mb-8 text-center shadow-xl border-2 border-dashed"
                    style={{
                        background: isUserWinning() ? 'var(--gradient-gold)' : 'var(--bg-card)',
                        borderColor: 'var(--accent-primary)',
                        color: isUserWinning() ? 'var(--bg-primary)' : 'var(--text-primary)'
                    }}
                >
                    {isUserWinning() ? (
                        <>
                            <h4 className="text-2xl font-black mb-2 uppercase tracking-tighter">Artifact Secured 🏆</h4>
                            <p className="text-sm font-medium opacity-80 italic">The provenance of this treasure is now yours.</p>
                        </>
                    ) : (
                        <>
                            <h4 className="text-2xl font-serif font-bold mb-2">Acquisition Final</h4>
                            <p className="text-sm font-medium opacity-60">This artifact has a new steward.</p>
                        </>
                    )}
                </motion.div>
            ) : (
                user && isUserWinning() && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-5 rounded-2xl mb-8 text-center font-bold border-2"
                        style={{
                            backgroundColor: 'color-mix(in srgb, var(--status-success), transparent 90%)',
                            borderColor: 'color-mix(in srgb, var(--status-success), transparent 70%)',
                            color: 'var(--status-success)'
                        }}
                    >
                        ✨ Lead Purveyor
                    </motion.div>
                )
            )}

            {/* Bid Form or Ended Message */}
            {!isEnded ? (
                user ? (
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="p-4 rounded-xl text-sm font-bold border-2 bg-red-500/10 border-red-500/30 text-red-500"
                            >
                                ⚠️ {error}
                            </motion.div>
                        )}

                        {success && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-4 rounded-xl text-sm font-bold border-2 bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
                            >
                                ✅ Record updated.
                            </motion.div>
                        )}

                        <div className="space-y-4">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[10px] uppercase tracking-widest font-bold opacity-60" style={{ color: 'var(--text-primary)' }}>
                                    Your Custom Bid
                                </label>
                                <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest">
                                    Min: ${minimumBid.toLocaleString()}
                                </span>
                            </div>
                            <div className="relative">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-serif text-amber-500/50">$</span>
                                <input
                                    type="number"
                                    value={bidAmount}
                                    onChange={(e) => setBidAmount(e.target.value)}
                                    min={minimumBid}
                                    step="100"
                                    placeholder={minimumBid.toString()}
                                    className="input-field w-full pl-12 pr-6 py-5 rounded-2xl text-3xl font-serif font-black focus:outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Quick Bid Group */}
                        <div className="grid grid-cols-3 gap-3">
                            {[100, 500, 1000].map((increment) => (
                                <button
                                    key={increment}
                                    type="button"
                                    onClick={() => handleQuickBid((highestBid?.amount || 0) + increment)}
                                    className="py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:brightness-110 active:scale-95"
                                    style={{
                                        background: 'var(--bg-hover)',
                                        color: 'var(--text-primary)',
                                        border: '1px solid var(--border-primary)'
                                    }}
                                >
                                    +${increment}
                                </button>
                            ))}
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full py-6 rounded-[1.5rem] font-bold text-xl uppercase tracking-[0.2em] shadow-premium transition-all disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                        >
                            <span className="relative z-10">{loading ? 'Sealing Records...' : 'Seal Official Bid'}</span>
                            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12" />
                        </motion.button>

                        <p className="text-center text-[10px] uppercase tracking-[0.2em] opacity-40 font-bold italic">
                            Commitment is irreversible.
                        </p>
                    </form>
                ) : (
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        onClick={() => navigate('/login')}
                        className="w-full py-6 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.3em] shadow-premium transition-all border-2"
                        style={{
                            background: 'transparent',
                            color: 'var(--accent-primary)',
                            borderColor: 'var(--accent-primary)'
                        }}
                    >
                        Login to Participate
                    </motion.button>
                )
            ) : (
                <div className="space-y-4">
                    <Link to="/marketplace" className="block w-full">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            className="w-full py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:brightness-110"
                            style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-secondary)' }}>
                            Gallery Archives
                        </motion.button>
                    </Link>
                </div>
            )}

            {/* History Link */}
            {bids.length > 0 && (
                <div className="mt-12 pt-8 border-t border-black/5 dark:border-white/5">
                    <div className="flex justify-between items-center mb-6 px-1">
                        <h4 className="text-[10px] uppercase tracking-[0.3em] font-black opacity-40" style={{ color: 'var(--text-primary)' }}>
                            Provenance
                        </h4>
                        <div className="flex items-center gap-1.5 animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--status-error)' }} />
                            <span className="text-[9px] font-black tracking-widest uppercase" style={{ color: 'var(--status-error)' }}>Live Records</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {bids.slice(0, 3).map((bid, index) => (
                            <motion.div
                                key={bid.id || index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex justify-between items-center p-4 rounded-2xl glass text-xs"
                                style={{ border: '1px solid var(--border-primary)' }}
                            >
                                <span className="font-serif font-black text-lg" style={{ color: 'var(--text-primary)' }}>
                                    ${bid.amount.toLocaleString()}
                                </span>
                                <span className="opacity-40 font-bold uppercase tracking-widest text-[9px]">
                                    {new Date(bid.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BidPanel;
