import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function UserDashboard() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [myItems, setMyItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchMyItems();
    }
  }, [user]);

  const fetchMyItems = async () => {
    try {
      const { data, error } = await supabase
        .from("items")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMyItems(data || []);
    } catch (err) {
      console.error("Error fetching items:", err);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-amber-900 to-yellow-700 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border-2 border-amber-300 mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-4xl font-serif font-bold text-amber-900 mb-2">
                Welcome Back!
              </h1>
              <p className="text-gray-600 text-lg">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="mt-4 md:mt-0 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-amber-100 to-amber-200 p-6 rounded-xl border border-amber-300">
              <h3 className="text-2xl font-bold text-amber-900">{myItems.length}</h3>
              <p className="text-amber-800 font-semibold">Items Listed</p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-xl border border-blue-300">
              <h3 className="text-2xl font-bold text-blue-900">0</h3>
              <p className="text-blue-800 font-semibold">Active Bids</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-6 rounded-xl border border-yellow-300">
              <h3 className="text-2xl font-bold text-yellow-900">0</h3>
              <p className="text-yellow-800 font-semibold">Total Sales</p>
            </div>
          </div>

          <Link to="/additem">
            <button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg mb-6">
              + Add New Auction Item
            </button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border-2 border-amber-300"
        >
          <h2 className="text-3xl font-serif font-bold text-amber-900 mb-6">
            My Listed Items
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-amber-900 text-lg">Loading...</p>
            </div>
          ) : myItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">You haven't listed any items yet.</p>
              <Link to="/additem">
                <button className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                  List Your First Item
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myItems.map((item) => (
                <Link
                  key={item.id}
                  to={`/auction/${item.id}`}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-amber-200 hover:border-amber-400 transition-all duration-300 transform hover:scale-105"
                >
                  <img
                    src={item.image || "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=800&q=60"}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-serif font-bold text-amber-900 mb-2 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    <p className="text-2xl font-bold text-amber-700">
                      ${(item.price || 0).toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
