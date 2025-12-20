// src/pages/home.jsx
import HeroSection from "../components/common/HeroSection";
import StatsSection from "../components/common/StatsSection";
import CuratedCategories from "../components/home/CuratedCategories";
import AuctionCard from "../components/common/AuctionCard";
import { motion } from "framer-motion";

const featured = [
  {
    id: 1,
    title: "Victorian Pocket Watch",
    currentBid: 12500,
    image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=800&q=60",
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    bidCount: 15,
    description: "Exquisite gold-plated pocket watch from the Victorian era"
  },
  {
    id: 2,
    title: "Ming Dynasty Vase",
    currentBid: 120000,
    image: "https://images.unsplash.com/photo-1520975918528-6a7a3ba7a9b0?w=800&q=60",
    endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    bidCount: 28,
    description: "Rare Ming Dynasty porcelain vase in pristine condition"
  },
  {
    id: 3,
    title: "Antique Brass Compass",
    currentBid: 3200,
    image: "https://images.unsplash.com/photo-1549399540-8b6b8b9b4f5e?w=800&q=60",
    endTime: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
    bidCount: 8,
    description: "Authentic brass compass from the Age of Exploration"
  },
];

const Home = () => {
  return (
    <div
      className="w-full min-h-screen transition-colors duration-300"
    >
      <HeroSection />

      <CuratedCategories />

      <section className="max-w-7xl mx-auto px-6 py-24 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px opacity-20"
          style={{ background: 'var(--accent-primary)' }} />

        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            💎 <span className="text-gradient">Featured Auctions</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Hand-selected masterpieces currently live on our platform.
            Join the legacy of elite collectors.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {featured.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full max-w-sm"
            >
              <AuctionCard item={item} />
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary px-10 py-4 rounded-xl tracking-widest"
          >
            Browse All 2,400+ Artifacts
          </motion.button>
        </div>
      </section>

      <StatsSection />
    </div>
  );
};

export default Home;


