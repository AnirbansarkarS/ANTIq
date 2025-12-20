import { useState } from "react";
import { supabase } from "../lib/supabaseclient";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Create user profile in database
    if (data.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: data.user.id,
          email: data.user.email,
          name: email.split('@')[0], // Use email prefix as default name
        });

      if (profileError) {
        console.error("Error creating profile:", profileError);
        setError("Account created but profile setup failed. Please contact support.");
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    navigate("/login"); // redirect to login
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
            <h2 className="text-2xl font-serif" style={{ color: 'var(--text-secondary)' }}>Create Account</h2>
            <p className="mt-2" style={{ color: 'var(--text-tertiary)' }}>Join our community of collectors</p>
          </div>

          {error && (
            <div className="mb-8 p-5 border-2 rounded-2xl font-bold text-sm"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--status-error), transparent 90%)',
                borderColor: 'color-mix(in srgb, var(--status-error), transparent 70%)',
                color: 'var(--status-error)'
              }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">
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
                placeholder="Create a password (min. 6 characters)"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="input-field"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p style={{ color: 'var(--text-tertiary)' }}>
              Already have an account?{" "}
              <Link to="/login" className="font-semibold hover:underline" style={{ color: 'var(--text-accent)' }}>
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
