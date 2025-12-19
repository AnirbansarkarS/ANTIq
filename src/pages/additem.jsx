import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AddItem() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("items").insert([
      {
        title,
        description: desc,
        price: parseFloat(price),
        image_url: image || "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=800&q=60",
        owner_id: user.id,
        status: 'active',
        listing_type: 'fixed',
        category: 'Antiques', // Default category
      },
    ]);

    setLoading(false);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Item added successfully! Redirecting...");
      setTimeout(() => {
        navigate("/marketplace");
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-amber-900 to-yellow-700 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border-2 border-amber-300"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif font-bold text-amber-900 mb-2">
              List Your Antique
            </h1>
            <p className="text-gray-600">Share your rare collectible with collectors worldwide</p>
          </div>

          {message && (
            <div
              className={`mb-6 px-4 py-3 rounded-lg ${message.includes("successfully")
                  ? "bg-green-100 border border-green-400 text-green-700"
                  : "bg-red-100 border border-red-400 text-red-700"
                }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleAdd} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-amber-900 mb-2">
                Item Title *
              </label>
              <input
                type="text"
                placeholder="e.g., Victorian Pocket Watch"
                className="w-full p-3 rounded-lg border-2 border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-300 bg-amber-50 text-amber-900 placeholder-gray-400"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-amber-900 mb-2">
                Description
              </label>
              <textarea
                placeholder="Describe your item in detail..."
                rows="5"
                className="w-full p-3 rounded-lg border-2 border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-300 bg-amber-50 text-amber-900 placeholder-gray-400 resize-none"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-amber-900 mb-2">
                Starting Price ($) *
              </label>
              <input
                type="number"
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full p-3 rounded-lg border-2 border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-300 bg-amber-50 text-amber-900 placeholder-gray-400"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-amber-900 mb-2">
                Image URL
              </label>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                className="w-full p-3 rounded-lg border-2 border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-300 bg-amber-50 text-amber-900 placeholder-gray-400"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave empty to use default image
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Adding Item..." : "List Item for Auction"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
