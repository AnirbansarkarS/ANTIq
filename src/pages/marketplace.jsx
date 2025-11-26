import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AuctionCard from "../components/common/AuctionCard";
import { supabase } from "../lib/supabaseClient";

const Marketplace = () => {
  const [auctionItems, setAuctionItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from("items")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Transform data to match AuctionCard format
      const transformedItems = (data || []).map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description || "",
        currentBid: item.price || 0,
        bidCount: 0, // You can fetch this from bids table if needed
        endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        image: item.image || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.1.0&auto=format&fit=crop&w=600&q=80",
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

  return (
    <div className="min-h-screen bg-[#fbf7ed] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-serif font-bold text-amber-900 mb-4">
            Historical Auctions
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Discover rare antiques and collectibles from around the world
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search for antiques..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-300 bg-white text-amber-900 placeholder-gray-400 shadow-lg"
            />
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-amber-900 text-xl font-serif">Loading treasures...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-xl mb-4">No items found matching your search.</p>
            <button
              onClick={() => setSearchTerm("")}
              className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
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
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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