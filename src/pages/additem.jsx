import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createItem } from "../lib/database";

export default function AddItem() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image_url: "",
    auction_end_time: "",
    category: "Artifacts",
    condition: "Exquisite",
    year: "",
    origin: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return setError("Login required to list artifacts.");
    setLoading(true);
    setError("");

    try {
      const newItem = await createItem({
        ...formData,
        seller_id: user.id,
        price: parseFloat(formData.price) || 0,
        auction_end_time: formData.auction_end_time ? new Date(formData.auction_end_time).toISOString() : null
      });

      if (newItem) {
        navigate(`/auction/${newItem.id}`);
      }
    } catch (err) {
      console.error("Error creating item:", err);
      setError("Failed to seal the listing. Please verify your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-16 transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-8">
        <motion.button
          whileHover={{ x: -8 }}
          onClick={() => navigate(-1)}
          className="text-xs uppercase tracking-[0.3em] font-black flex items-center gap-3 mb-10 opacity-60 hover:opacity-100 transition-all"
          style={{ color: 'var(--text-primary)' }}
        >
          ← Return to Marketplace
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-base p-12 relative overflow-hidden"
        >
          {/* Ornate corner decoration */}
          <div className="absolute top-0 right-0 w-48 h-48 opacity-[0.03] pointer-events-none rotate-12">
            <svg viewBox="0 0 100 100" className="w-full h-full" style={{ fill: 'var(--accent-primary)' }}>
              <path d="M50,0 Q100,0 100,50 Q100,100 50,100 Q0,100 0,50 Q0,0 50,0" />
            </svg>
          </div>

          <div className="relative z-10 mb-12">
            <h1 className="text-5xl md:text-7xl font-serif font-black mb-4 italic tracking-tighter" style={{ color: 'var(--text-primary)' }}>
              Catalog New Artifact
            </h1>
            <p className="text-xl font-serif italic opacity-60" style={{ color: 'var(--text-primary)' }}>
              Document the provenance and details of your historic treasure.
            </p>
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

          <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Title */}
              <div className="md:col-span-2 space-y-3">
                <label className="text-[10px] uppercase tracking-[0.4em] font-black opacity-40 ml-1" style={{ color: 'var(--text-primary)' }}>
                  Artifact Title *
                </label>
                <input
                  name="title"
                  required
                  placeholder="e.g., 18th Century Nautical Compass"
                  value={formData.title}
                  onChange={handleChange}
                  className="input-field text-xl font-medium placeholder:opacity-30"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2 space-y-3">
                <label className="text-[10px] uppercase tracking-[0.4em] font-black opacity-40 ml-1" style={{ color: 'var(--text-primary)' }}>
                  Description & Provenance
                </label>
                <textarea
                  name="description"
                  placeholder="Detailed history and features..."
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="input-field text-lg font-medium placeholder:opacity-30 resize-none"
                />
              </div>

              {/* Price */}
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.4em] font-black opacity-40 ml-1" style={{ color: 'var(--text-primary)' }}>
                  Opening Valuation ($)
                </label>
                <input
                  name="price"
                  type="number"
                  required
                  placeholder="500"
                  value={formData.price}
                  onChange={handleChange}
                  className="input-field text-xl font-black font-serif"
                />
              </div>

              {/* Category */}
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.4em] font-black opacity-40 ml-1" style={{ color: 'var(--text-primary)' }}>
                  Collection Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input-field text-lg font-bold appearance-none"
                >
                  <option value="Artifacts">Artifacts</option>
                  <option value="Documents">Documents</option>
                  <option value="ArtPieces">Art Pieces</option>
                  <option value="Jewelry">Jewelry</option>
                  <option value="Furniture">Furniture</option>
                </select>
              </div>

              {/* Meta Info */}
              <div className="grid grid-cols-2 gap-6 md:col-span-2">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.4em] font-black opacity-40 ml-1" style={{ color: 'var(--text-primary)' }}>
                    Period/Year
                  </label>
                  <input
                    name="year"
                    placeholder="e.g. 1750s"
                    value={formData.year}
                    onChange={handleChange}
                    className="input-field text-lg font-medium placeholder:opacity-30"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.4em] font-black opacity-40 ml-1" style={{ color: 'var(--text-primary)' }}>
                    Origin
                  </label>
                  <input
                    name="origin"
                    placeholder="e.g. France"
                    value={formData.origin}
                    onChange={handleChange}
                    className="input-field text-lg font-medium placeholder:opacity-30"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="md:col-span-2 space-y-3">
                <label className="text-[10px] uppercase tracking-[0.4em] font-black opacity-40 ml-1" style={{ color: 'var(--text-primary)' }}>
                  Provenance Visualization (Image URL)
                </label>
                <input
                  name="image_url"
                  type="url"
                  placeholder="https://..."
                  value={formData.image_url}
                  onChange={handleChange}
                  className="input-field text-sm font-medium placeholder:opacity-30"
                />
              </div>

              {/* End Time */}
              <div className="md:col-span-2 space-y-3">
                <label className="text-[10px] uppercase tracking-[0.4em] font-black opacity-40 ml-1" style={{ color: 'var(--text-primary)' }}>
                  Acquisition Finalization Range (End Date)
                </label>
                <input
                  name="auction_end_time"
                  type="datetime-local"
                  value={formData.auction_end_time}
                  onChange={handleChange}
                  className="input-field text-lg font-bold"
                />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">
                  Leave empty for 7-day standard duration
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="btn-primary w-full py-6 rounded-[1.5rem] font-bold text-2xl uppercase tracking-[0.3em] shadow-xl transition-all disabled:opacity-50 group relative overflow-hidden"
            >
              <span className="relative z-10">{loading ? "SEALING RECORDS..." : "SEAL LISTING 📜"}</span>
              <div className="absolute inset-x-0 h-full w-32 bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-[500%] transition-transform duration-1000" />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
