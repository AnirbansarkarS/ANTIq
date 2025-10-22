// src/pages/signup.jsx
import { useState } from "react";
import { motion } from "framer-motion";
// import { supabase } from "../lib/supabaseClient";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Replace with supabase.auth.signUp(...) call
      await new Promise((r) => setTimeout(r, 900));
      alert(`Account (simulated) created for ${name}`);
    } catch (err) {
      console.error(err);
      alert("Signup failed");
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
        onSubmit={onSignup}
        className="w-full max-w-lg bg-gradient-to-br from-[#fffaf0] to-[#f3ecd9] border border-amber-300/40 shadow-2xl rounded-xl p-8"
      >
        <h2 className="text-2xl font-serif text-blue-900 mb-2">Create your ANTIQ account</h2>
        <p className="text-sm text-gray-700 mb-6">
          Join the marketplace and start listing antiques or place bids.
        </p>

        <div className="grid grid-cols-1 gap-4">
          <label>
            <span className="text-sm text-blue-900">Full name</span>
            <input
              className="mt-2 w-full rounded-md border border-amber-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-300"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            <span className="text-sm text-blue-900">Email</span>
            <input
              className="mt-2 w-full rounded-md border border-amber-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-300"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>

        <button
          disabled={loading}
          className="w-full mt-6 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold shadow-md"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p className="mt-4 text-center text-gray-700 text-sm">
          Already have an account? <a href="/login" className="text-amber-700 font-semibold">Login</a>
        </p>
      </motion.form>
    </div>
  );
};

export default Signup;
