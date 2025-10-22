import AuctionCard from "../components/common/AuctionCard";

const Marketplace = () => {
  return (
    <div className="bg-[#0B0E14] min-h-screen py-16 px-6">
      <h2 className="text-center text-3xl font-bold text-gold mb-10">
        Featured Auctions
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        {/* Example cards – later we will map from Supabase data */}
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
      </div>
    </div>
  );
};

export default Marketplace;

  