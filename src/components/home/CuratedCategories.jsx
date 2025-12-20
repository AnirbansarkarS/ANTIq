import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
    {
        id: "ancient",
        title: "Ancient Empires",
        description: "Treasures from Rome, Egypt, and Greece.",
        image: "https://images.unsplash.com/photo-1543459176-4426b37223ba?w=800&q=80",
        count: "120+ Items"
    },
    {
        id: "watches",
        title: "Horology",
        description: "Exquisite timepieces from the 18th & 19th centuries.",
        image: "https://images.unsplash.com/photo-1518131672697-613becd4fab5?w=800&q=80",
        count: "85+ Items"
    },
    {
        id: "art",
        title: "Fine Art",
        description: "Classical paintings and renaissance murals.",
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80",
        count: "240+ Items"
    },
    {
        id: "jewelry",
        title: "Royal Jewelry",
        description: "Ornate gemstones and crowns from noble estates.",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
        count: "50+ Items"
    }
];

const CuratedCategories = () => {
    return (
        <section className="py-24 px-6 relative overflow-hidden transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-4xl md:text-5xl font-serif font-bold mb-6"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Curated <span className="text-gradient">Historical Collections</span>
                        </motion.h2>
                        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            Explore our masterfully organized archives of antiquity. Each category
                            represents a distinct era of human achievement and artistry.
                        </p>
                    </div>
                    <Link to="/marketplace">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="card-base px-8 py-3 rounded-xl font-bold border-2 transition-all flex items-center justify-center"
                            style={{
                                borderColor: 'var(--accent-primary)',
                                color: 'var(--text-primary)',
                                padding: '0.75rem 2rem'
                            }}
                        >
                            View All Categories
                        </motion.button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, index) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative h-[450px] rounded-3xl overflow-hidden cursor-pointer shadow-premium"
                        >
                            <img
                                src={cat.image}
                                alt={cat.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                            <div className="absolute inset-0 p-8 flex flex-col justify-end transform group-hover:translate-y-[-10px] transition-transform duration-500">
                                <span className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--accent-primary)' }}>
                                    {cat.count}
                                </span>
                                <h3 className="text-2xl font-serif font-bold mb-2" style={{ color: 'var(--bg-primary)' }}>
                                    {cat.title}
                                </h3>
                                <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2" style={{ color: 'var(--bg-tertiary)' }}>
                                    {cat.description}
                                </p>

                                <div className="mt-6 w-10 h-1 rounded-full group-hover:w-full transition-all duration-700" style={{ background: 'var(--accent-primary)' }} />
                            </div>

                            {/* Decorative Glow */}
                            <div className="absolute -inset-0.5 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity" 
                                style={{ background: 'var(--gradient-gold)' }} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CuratedCategories;
