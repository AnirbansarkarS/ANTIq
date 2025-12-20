import { motion } from "framer-motion";

const stats = [
  { number: "12k+", label: "Artifacts Sold", icon: "🏛️" },
  { number: "4.8k+", label: "Registered Sellers", icon: "💎" },
  { number: "65+", label: "Nations Connected", icon: "🌍" },
  { number: "2.5M+", label: "Monthly Visits", icon: "✨" },
];

const StatsSection = () => {
  return (
    <section className="py-20 px-6 relative overflow-hidden transition-colors duration-300">
      {/* Decorative center divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 opacity-20"
        style={{ background: 'var(--accent-primary)' }} />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card-base group p-8 rounded-2xl relative transition-all duration-300 hover:-translate-y-2 flex flex-col items-center justify-center"
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-8 h-8 opacity-10 pointer-events-none transition-opacity group-hover:opacity-40">
                <svg viewBox="0 0 100 100" className="w-full h-full" style={{ fill: 'var(--accent-primary)' }}>
                  <path d="M100,0 L0,0 L100,100 Z" />
                </svg>
              </div>

              <div className="flex flex-col items-center text-center space-y-3">
                <span className="text-4xl mb-2 grayscale group-hover:grayscale-0 transition-all duration-500">
                  {stat.icon}
                </span>
                <h2 className="text-4xl font-serif font-bold text-gradient">
                  {stat.number}
                </h2>
                <p className="text-sm uppercase tracking-widest font-semibold"
                  style={{ color: 'var(--text-tertiary)' }}>
                  {stat.label}
                </p>
              </div>

              {/* Bottom bar animation on hover */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 rounded-full transition-all duration-500 group-hover:w-1/2"
                style={{ background: 'var(--accent-primary)' }} />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-20 opacity-20"
        style={{ background: 'var(--accent-primary)' }} />
    </section>
  );
};

export default StatsSection;

