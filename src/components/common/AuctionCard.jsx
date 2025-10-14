import { Link } from "react-router-dom";

const AuctionCard = ({ item }) => {
  const timeRemaining = "2 days left";
  const currentBid = "£2,450";

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-amber-200">
      <div className="relative">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {timeRemaining}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-amber-900 mb-2 font-serif">{item.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-500">Current Bid</p>
            <p className="text-2xl font-bold text-amber-700">{currentBid}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Bids</p>
            <p className="text-lg font-semibold text-amber-900">{item.bidCount}</p>
          </div>
        </div>
        
        <Link 
          to={`/auction/${item.id}`}
          className="block w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-center py-3 rounded-lg font-semibold transition-all duration-300"
        >
          Place Bid
        </Link>
      </div>
    </div>
  );
};

export default AuctionCard;