import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.email}</h1>

      <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 max-w-xl">
        <p className="text-lg mb-4">You are logged in to ANTIQ Auctions ✨</p>

        <button
          onClick={() => navigate("/additem")}
          className="w-full bg-amber-600 hover:bg-amber-700 py-2 rounded mb-4 text-lg"
        >
          Add a New Auction Item
        </button>

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 py-2 rounded text-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
