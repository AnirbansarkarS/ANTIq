import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState("");
  const [bids, setBids] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchItem();
    fetchBids();
  }, [id]);

  const fetchItem = async () => {
    try {
      const { data, error } = await supabase
        .from("items")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setItem(data);
    } catch (err) {
      console.error("Error fetching item:", err);
      // Fallback to demo data
      setItem({
        id: id,
        title: "Victorian Pocket Watch",
        description: "A stunning gold-plated pocket watch from the Victorian era, featuring intricate engravings and a working mechanism. This rare piece dates back to 1890s and has been carefully preserved.",
        price: 12500,
        image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=800&q=60",
        created_at: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchBids = async () => {
    try {
      const { data, error } = await supabase
        .from("bids")
        .select("*")
        .eq("item_id", id)
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;
      setBids(data || []);
    } catch (err) {
      console.error("Error fetching bids:", err);
    }
  };

  const handleBid = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }

    if (!bidAmount || parseFloat(bidAmount) <= 0) {
      setError("Please enter a valid bid amount");
      return;
    }

    try {
      const { error } = await supabase.from("bids").insert([
        {
          item_id: id,
          user_id: user.id,
          amount: parseFloat(bidAmount),
        },
      ]);

      if (error) throw error;

      setBidAmount("");
      setError("");
      fetchBids();
      fetchItem();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbf7ed] flex items-center justify-center">
        <div className="text-amber-900 text-xl font-serif">Loading...</div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-[#fbf7ed] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-amber-900 mb-4">Item not found</h2>
          <Link to="/marketplace" className="text-amber-700 hover:text-amber-900">
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbf7ed] py-8">
      <div className="max-w-7xl mx-auto px-6">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate(-1)}
          className="mb-6 text-amber-900 hover:text-amber-700 font-semibold flex items-center gap-2"
        >
          ← Back
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-amber-200"
          >
            <img
              src={item.image || "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=800&q=60"}
              alt={item.title}
              className="w-full h-96 object-cover"
            />
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
              <h1 className="text-4xl font-serif font-bold text-amber-900 mb-4">
                {item.title}
              </h1>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {item.description}
              </p>

              <div className="border-t border-amber-200 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600 uppercase tracking-wide text-sm">Current Bid</span>
                  <span className="text-4xl font-bold text-amber-700">
                    ${(item.price || 0).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-600 mb-6">
                  <span>Total Bids: {bids.length}</span>
                  <span>Item ID: #{item.id}</span>
                </div>

                {user ? (
                  <form onSubmit={handleBid} className="space-y-4">
                    {error && (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-semibold text-amber-900 mb-2">
                        Place Your Bid
                      </label>
                      <input
                        type="number"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        placeholder="Enter bid amount"
                        min={item.price + 1}
                        className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Place Bid
                    </button>
                  </form>
                ) : (
                  <Link to="/login">
                    <button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                      Login to Place Bid
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bids History */}
        {bids.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-amber-200"
          >
            <h2 className="text-2xl font-serif font-bold text-amber-900 mb-4">
              Recent Bids
            </h2>
            <div className="space-y-3">
              {bids.map((bid, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 bg-amber-50 rounded-lg border border-amber-200"
                >
                  <div>
                    <span className="text-amber-900 font-semibold">
                      ${bid.amount.toLocaleString()}
                    </span>
                    <span className="text-gray-600 text-sm ml-2">
                      {new Date(bid.created_at).toLocaleString()}
                    </span>
                  </div>
                  <span className="text-amber-700 text-sm">Bid #{bids.length - index}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ItemDetails;

