const HeroSection = () => {
    return (
      <section className="relative bg-gradient-to-br from-white via-yellow-100 to-yellow-400 text-4xl font-bold text-blue-900 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-serif">
            THE ART OF HISTORY
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-black max-w-3xl mx-auto">
            Own a piece of history through our exclusive antique auctions
          </p>
          <p className="text-lg mb-10 text-black max-w-2xl mx-auto leading-relaxed">
            Every artifact tells a story - from ancient civilizations to modern history, 
            each piece carries the legacy of its time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              Explore Auctions
            </button>
            <button className="border-2 border-amber-400 hover:bg-amber-400 hover:text-amber-900 text-amber-300 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>
    );
  };
  
  export default HeroSection;