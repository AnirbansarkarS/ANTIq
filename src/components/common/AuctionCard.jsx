import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const AuctionCard = ({ item }) => {
  const auctionItem = item || {
    id: 1,
    title: "Roman Empire Coin Collection",
    description: "Authentic Roman coins from 1st century AD in excellent condition.",
    currentBid: 2450,
    bidCount: 12,
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.1.0&auto=format&fit=crop&w=600&q=80"
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = auctionItem.endTime - new Date();
    if (difference <= 0) return "Auction Ended";

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    
    return `${days}d ${hours}h left`;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const handleBid = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Bidding on item: ${auctionItem.id}`);
    // Add your bid logic here
  };

  return (
    <div className="bg-white w-80 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-amber-200 hover:border-amber-400 cursor-pointer">
      <div className="relative">
        <img
          src={auctionItem.image}
          alt={auctionItem.title}
          className="w-full h-52 object-cover"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.1.0&auto=format&fit=crop&w=600&q=80";
          }}
        />
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
          timeLeft === "Auction Ended" 
            ? "bg-red-600 text-white" 
            : "bg-amber-600 text-white"
        }`}>
          {timeLeft}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-amber-900 mb-2 font-serif">
          {auctionItem.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {auctionItem.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Current Bid</p>
            <p className="text-2xl font-bold text-amber-700">${auctionItem.currentBid.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Bids</p>
            <p className="text-lg font-semibold text-amber-900">{auctionItem.bidCount}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Link 
            to={`/auction/${auctionItem.id}`}
            className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-center py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            View Details
          </Link>
          <button 
            onClick={handleBid}
            disabled={timeLeft === "Auction Ended"}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all duration-300 border ${
              timeLeft === "Auction Ended"
                ? "bg-gray-300 text-gray-500 cursor-not-allowed border-gray-400"
                : "bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300 hover:scale-105"
            }`}
          >
            {timeLeft === "Auction Ended" ? "Ended" : "Bid Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;