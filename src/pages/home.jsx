// src/pages/home.jsx
import HeroSection from "../components/common/HeroSection";
import StatsSection from "../components/common/StatsSection";
import AuctionCard from "../components/common/AuctionCard";
import { motion } from "framer-motion";

const featured = [
  {
    id: 1,
    title: "Victorian Pocket Watch",
    price: "12,500",
    image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=800&q=60",
    timeLeft: "2d 5h",
  },
  {
    id: 2,
    title: "Ming Dynasty Vase",
    price: "1,20,000",
    image: "https://images.unsplash.com/photo-1520975918528-6a7a3ba7a9b0?w=800&q=60",
    timeLeft: "5d 12h",
  },
  {
    id: 3,
    title: "Antique Brass Compass",
    price: "3,200",
    image: "https://images.unsplash.com/photo-1549399540-8b6b8b9b4f5e?w=800&q=60",
    timeLeft: "12h 30m",
  },
];

const Home = () => {
  return (
    <div className="w-full bg-[#fbf7ed] text-[#0b1220] min-h-screen">
      <HeroSection />

      <section className="max-w-7xl mx-auto px-6 -mt-10">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-serif text-blue-900 font-bold mb-6 text-center"
        >
          Featured Auctions
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-8">
          {featured.map((f) => (
            <div key={f.id} className="w-72">
              <AuctionCard
                title={f.title}
                price={f.price}
                image={f.image}
                timeLeft={f.timeLeft}
              />
            </div>
          ))}
        </div>
      </section>

      <StatsSection />
    </div>
  );
};

export default Home;
