import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      navigate("/login"); // redirect to login
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black to-gray-900">
      <form
        onSubmit={handleSignup}
        className="p-6 bg-gray-800 text-white rounded-xl shadow-xl w-80 border border-gray-700"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Create Account</h2>

        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 rounded bg-gray-700 focus:ring focus:ring-cyan-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 rounded bg-gray-700 focus:ring focus:ring-cyan-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded transition"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
