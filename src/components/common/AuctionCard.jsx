import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import AuctionTimer from "../auction/AuctionTimer";

const AuctionCard = ({ item }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const auctionItem = item || {
    id: 1,
    title: "Roman Empire Coin Collection",
    description: "Authentic Roman coins from 1st century AD in excellent condition.",
    currentBid: 2450,
    bidCount: 12,
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.1.0&auto=format&fit=crop&w=600&q=80"
  };

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link to={`/auction/${auctionItem.id}`}>
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="card-base relative overflow-hidden rounded-2xl shadow-premium cursor-pointer group"
      >
        {/* Ornate Corner Decorations */}
        <div className="absolute top-0 left-0 w-16 h-16 opacity-30 pointer-events-none z-10">
          <svg viewBox="0 0 100 100" className="w-full h-full" style={{ fill: 'var(--accent-primary)' }}>
            <path d="M0,0 L100,0 L100,20 Q50,40 0,20 Z" />
            <path d="M0,0 L20,0 L20,100 Q40,50 20,0 Z" />
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-16 h-16 opacity-30 pointer-events-none z-10 transform rotate-90">
          <svg viewBox="0 0 100 100" className="w-full h-full" style={{ fill: 'var(--accent-primary)' }}>
            <path d="M0,0 L100,0 L100,20 Q50,40 0,20 Z" />
            <path d="M0,0 L20,0 L20,100 Q40,50 20,0 Z" />
          </svg>
        </div>

        {/* Image Section */}
        <div className="relative overflow-hidden">
          <img
            src={auctionItem.image}
            alt={auctionItem.title}
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.1.0&auto=format&fit=crop&w=600&q=80";
            }}
          />

          {/* Gradient Overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)'
            }}
          />

          {/* Auction Timer Badge */}
          <div className="absolute top-3 right-3 z-20">
            <AuctionTimer endTime={auctionItem.endTime} size="sm" showLabel={false} />
          </div>

          {/* Favorite Button */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleFavorite}
            className="absolute top-3 left-3 z-20 p-2 rounded-full backdrop-blur-md transition-all duration-300"
            style={{
              background: isFavorite ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.3)',
              border: '2px solid var(--border-accent)'
            }}
          >
            <span className="text-xl">
              {isFavorite ? '❤️' : '🤍'}
            </span>
          </motion.button>
        </div>

        {/* Content Section */}
        <div className="p-5 space-y-4">
          {/* Title */}
          <h3
            className="text-xl font-bold font-serif line-clamp-2 min-h-[3.5rem]"
            style={{ color: 'var(--text-primary)' }}
          >
            {auctionItem.title}
          </h3>

          {/* Description */}
          <p
            className="text-sm line-clamp-2 min-h-[2.5rem]"
            style={{ color: 'var(--text-secondary)' }}
          >
            {auctionItem.description}
          </p>

          {/* Bid Info */}
          <div
            className="flex items-center justify-between p-3 rounded-lg"
            style={{
              background: 'var(--bg-hover)',
              border: '1px solid var(--border-primary)'
            }}
          >
            <div>
              <p
                className="text-xs uppercase tracking-wide font-semibold mb-1"
                style={{ color: 'var(--text-tertiary)' }}
              >
                Current Bid
              </p>
              <p
                className="text-2xl font-bold font-serif"
                style={{ color: 'var(--accent-primary)' }}
              >
                ${auctionItem.currentBid.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p
                className="text-xs uppercase tracking-wide font-semibold mb-1"
                style={{ color: 'var(--text-tertiary)' }}
              >
                Bids
              </p>
              <p
                className="text-lg font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                {auctionItem.bidCount || 0}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-3 rounded-lg font-bold text-sm uppercase tracking-wide transition-all duration-300 shadow-md"
              style={{
                background: 'var(--gradient-gold)',
                color: 'var(--bg-primary)'
              }}
            >
              View Details
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Handle quick bid
              }}
              className="px-5 py-3 rounded-lg font-bold text-sm uppercase tracking-wide transition-all duration-300 shadow-md"
              style={{
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                border: '2px solid var(--accent-primary)'
              }}
            >
              💰
            </motion.button>
          </div>
        </div>

        {/* Shimmer Effect on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500">
          <div className="absolute inset-0 animate-shimmer" />
        </div>
      </motion.div>
    </Link>
  );
};

export default AuctionCard;
