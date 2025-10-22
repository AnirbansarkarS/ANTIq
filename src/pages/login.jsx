// src/pages/login.jsx
import { useState } from "react";
import { motion } from "framer-motion";
// If you integrated supabase: import { supabase } from "../lib/supabaseClient";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Replace with supabase auth call:
      // const { error } = await supabase.auth.signInWithPassword({ email, password })
      // handle error
      await new Promise((r) => setTimeout(r, 800));
      alert(`Magic (simulated) login link sent to ${email}`);
    } catch (err) {
      console.error(err);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fbf7ed] p-6">
      <motion.form
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onSubmit={onLogin}
        className="w-full max-w-md bg-gradient-to-br from-[#fffaf0] to-[#f3ecd9] border border-amber-300/40 shadow-xl rounded-xl p-8"
      >
        <h2 className="text-2xl font-serif text-blue-900 mb-2">Welcome Back</h2>
        <p className="text-sm text-gray-700 mb-6">
          Sign in to manage your listings, bids and profile.
        </p>

        <label className="block mb-3">
          <span className="text-sm text-blue-900">Email</span>
          <input
            className="mt-2 w-full rounded-md border border-amber-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-300"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <button
          disabled={loading}
          className="w-full mt-4 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold shadow-md"
        >
          {loading ? "Sending..." : "Send Login Link"}
        </button>

        <p className="mt-4 text-center text-gray-700 text-sm">
          New here? <a href="/signup" className="text-amber-700 font-semibold">Create an account</a>
        </p>
      </motion.form>
    </div>
  );
};

export default Login;
