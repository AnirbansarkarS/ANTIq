import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-[#fbf7ed] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-serif font-bold text-amber-900 mb-4">
            About ANTIQ
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Preserving history, one auction at a time
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8 border border-amber-200"
          >
            <h2 className="text-3xl font-serif font-bold text-amber-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              ANTIQ is dedicated to connecting collectors, historians, and enthusiasts with rare
              antiques and historical artifacts. We believe every piece tells a story, and we're
              here to help preserve these treasures for future generations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-8 border border-amber-200"
          >
            <h2 className="text-3xl font-serif font-bold text-amber-900 mb-4">
              Our Story
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Founded in 2024, ANTIQ emerged from a passion for preserving historical artifacts.
              What started as a small community of collectors has grown into a trusted marketplace
              where authenticity meets passion.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl shadow-lg p-8 border-2 border-amber-300 mb-16"
        >
          <h2 className="text-3xl font-serif font-bold text-amber-900 mb-6 text-center">
            Why Choose ANTIQ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">Authenticity</h3>
              <p className="text-gray-700">
                Every item is carefully verified by our expert team
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🌍</div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">Global Reach</h3>
              <p className="text-gray-700">
                Connect with collectors from around the world
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🛡️</div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">Secure Transactions</h3>
              <p className="text-gray-700">
                Safe and secure payment processing for all auctions
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-8 border border-amber-200"
        >
          <h2 className="text-3xl font-serif font-bold text-amber-900 mb-6 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="text-3xl">✨</div>
              <div>
                <h3 className="text-xl font-bold text-amber-900 mb-2">Excellence</h3>
                <p className="text-gray-700">
                  We strive for excellence in every aspect of our service
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-3xl">🤝</div>
              <div>
                <h3 className="text-xl font-bold text-amber-900 mb-2">Trust</h3>
                <p className="text-gray-700">
                  Building trust through transparency and integrity
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-3xl">📚</div>
              <div>
                <h3 className="text-xl font-bold text-amber-900 mb-2">Education</h3>
                <p className="text-gray-700">
                  Sharing knowledge about historical artifacts
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-3xl">❤️</div>
              <div>
                <h3 className="text-xl font-bold text-amber-900 mb-2">Passion</h3>
                <p className="text-gray-700">
                  Driven by our love for history and collectibles
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;

