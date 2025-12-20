import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AuctionCard from "../components/common/AuctionCard";
import { getActiveItems } from "../lib/database";

const Marketplace = () => {
  const [auctionItems, setAuctionItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getActiveItems();

      // Transform data to match AuctionCard format
      const transformedItems = (data || []).map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description || "",
        currentBid: item.price || 0,
        bidCount: 0, // Will be populated from bids in future
        endTime: item.auction_end_time ? new Date(item.auction_end_time) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        image: item.image_url || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.1.0&auto=format&fit=crop&w=600&q=80",
        owner: item.owner,
      }));

      setAuctionItems(transformedItems);
    } catch (err) {
      console.error("Error fetching items:", err);
      // Fallback to demo data
      setAuctionItems([
        {
          id: 1,
          title: "Roman Empire Coin Collection",
          description: "Authentic Roman coins from 1st century AD in excellent condition.",
          currentBid: 2450,
          bidCount: 12,
          endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.1.0&auto=format&fit=crop&w=600&q=80"
        },
        {
          id: 2,
          title: "Victorian Era Pocket Watch",
          description: "Gold-plated pocket watch from 1890s with intricate engravings.",
          currentBid: 1200,
          bidCount: 8,
          endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
          image: "https://images.unsplash.com/photo-1518131672697-613becd4fab5?ixlib=rb-4.1.0&auto=format&fit=crop&w=600&q=80"
        },
        {
          id: 3,
          title: "Ancient Greek Amphora",
          description: "Terracotta vessel from 5th century BC with mythological scenes.",
          currentBid: 3500,
          bidCount: 15,
          endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          image: "https://images.unsplash.com/photo-1543459176-4426b37223ba?ixlib=rb-4.1.0&auto=format&fit=crop&w=600&q=80"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = auctionItems.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "price-high":
        return b.currentBid - a.currentBid;
      case "price-low":
        return a.currentBid - b.currentBid;
      case "ending-soon":
        return new Date(a.endTime) - new Date(b.endTime);
      case "most-bids":
        return b.bidCount - a.bidCount;
      default: // newest
        return b.id - a.id;
    }
  });

  return (
    <div
      className="min-h-screen py-12 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1
            className="text-5xl font-serif font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            🏛 Historical Auctions
          </h1>
          <p
            className="text-xl max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Discover rare antiques and collectibles from around the world
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 flex flex-col md:flex-row gap-4"
        >
          <div className="flex-1">
            <input
              type="text"
              placeholder="🔍 Search for antiques..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field shadow-lg h-16 text-lg"
              style={{ padding: "1rem 1.25rem" }}
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field shadow-lg h-12 text-base w-full md:w-56 cursor-pointer"
            style={{ padding: "0.6rem 1rem" }}
          >
            <option value="newest" className="bg-[var(--bg-card)] text-[var(--text-primary)]">Newest First</option>
            <option value="ending-soon" className="bg-[var(--bg-card)] text-[var(--text-primary)]">Ending Soon</option>
            <option value="price-high" className="bg-[var(--bg-card)] text-[var(--text-primary)]">Price: High to Low</option>
            <option value="price-low" className="bg-[var(--bg-card)] text-[var(--text-primary)]">Price: Low to High</option>
            <option value="most-bids" className="bg-[var(--bg-card)] text-[var(--text-primary)]">Most Bids</option>
          </select>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4" style={{ borderColor: 'var(--accent-primary)' }}></div>
            <p className="text-xl font-serif mt-4" style={{ color: 'var(--text-primary)' }}>
              Loading treasures...
            </p>
          </div>
        ) : sortedItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl mb-4" style={{ color: 'var(--text-secondary)' }}>
              No items found matching your search.
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="btn-primary"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
          >
            {sortedItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full max-w-sm"
              >
                <AuctionCard item={item} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
