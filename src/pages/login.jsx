import { useState } from "react";
import { supabase } from "../lib/supabaseclient";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Ensure user profile exists in database
    if (data.user) {
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('id')
        .eq('id', data.user.id)
        .single();

      // If profile doesn't exist, create it
      if (profileError || !profile) {
        const { error: insertError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email: data.user.email,
            name: data.user.email.split('@')[0],
          });

        if (insertError) {
          console.error("Error creating profile:", insertError);
        }
      }

      setUser(data.user);
      navigate("/profile");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="card-base p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif font-bold mb-2" style={{ color: 'var(--text-primary)' }}>ANTIQ</h1>
            <h2 className="text-2xl font-serif" style={{ color: 'var(--text-secondary)' }}>Welcome Back</h2>
            <p className="mt-2" style={{ color: 'var(--text-tertiary)' }}>Sign in to continue your journey</p>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg border"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--status-error), transparent 90%)',
                borderColor: 'color-mix(in srgb, var(--status-error), transparent 70%)',
                color: 'var(--status-error)'
              }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="your.email@example.com"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p style={{ color: 'var(--text-tertiary)' }}>
              Don't have an account?{" "}
              <Link to="/signup" className="font-semibold hover:underline" style={{ color: 'var(--text-accent)' }}>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
