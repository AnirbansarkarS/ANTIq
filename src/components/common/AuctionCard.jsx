import { motion } from "framer-motion";

const AuctionCard = ({ title, price, image, timeLeft }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white border border-amber-600 shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-amber-400 transition"
    >
      <img src={image} alt={title} className="w-full h-56 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-blue-900 font-serif">{title}</h3>
        <p className="text-amber-700 font-medium mt-2">Base Price: ₹{price}</p>
        <p className="text-sm text-gray-600 mt-2">{timeLeft} left</p>
        <button className="mt-4 w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded transition shadow-md">
          Place Bid
        </button>
      </div>
      <img src={image} alt={title} className="w-full h-56 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-blue-900 font-serif">{title}</h3>
        <p className="text-amber-700 font-medium mt-2">Base Price: ₹{price}</p>
        <p className="text-sm text-gray-600 mt-2">{timeLeft} left</p>
        <button className="mt-4 w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded transition shadow-md">
          Place Bid
        </button>
      </div>
    </motion.div>
  );
};

export default AuctionCard;
