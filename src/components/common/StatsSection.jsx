import { motion } from "framer-motion";

const stats = [
  { number: "10,000+", label: "Artifacts Sold" },
  { number: "2,500+", label: "Registered Sellers" },
  { number: "50+", label: "Countries Connected" },
  { number: "1M+", label: "Monthly Auction Visits" },
];

const StatsSection = () => {
  return (
    <section className="bg-[#f9f4e7] py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="p-6 border border-amber-600 rounded-lg shadow-lg bg-white"
          >
            <h2 className="text-3xl font-bold text-amber-700">{stat.number}</h2>
            <p className="text-gray-700 font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
