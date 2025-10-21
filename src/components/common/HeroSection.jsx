import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-950 via-amber-900 to-yellow-700 text-white py-28 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6 font-serif text-amber-300"
        >
          THE ART OF HISTORY
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-light"
        >
          Discover rare antiques, vintage collectibles and historical artifacts
          passed through generations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <button className="bg-amber-600 hover:bg-amber-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
            Explore Auctions
          </button>
          <button className="bg-blue-900 hover:bg-blue-800 border border-amber-500 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105">
            Sell an Item
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
