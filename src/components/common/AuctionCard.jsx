const AuctionCard = () => {
  return (
    <div className="bg-[#d5dbea] w-72 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300 border border-gold/30 hover:border-gold cursor-pointer">
      <img
        src="https://images.unsplash.com/photo-1725974106186-bcaa7b7b61c5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGlzdG9yaWNhbCUyMGNvbGxlY3Rpb25zfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600"
        alt="Antique Item"
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gold mb-2">
          Vintage Pocket Watch
        </h3>
        <p className="text-gray-300 text-sm mb-3">
          19th century mechanical pocket watch, handcrafted with classic design.
        </p>

        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-white">$450</span>
          <button className="bg-gold hover:bg-yellow-500 text-black px-4 py-2 rounded-lg text-sm font-semibold transition-all">
            Bid Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
