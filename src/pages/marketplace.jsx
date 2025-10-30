import AuctionCard from "../components/common/AuctionCard";

const Marketplace = () => {
  const auctionItems = [
    {
      id: 1,
      title: "Roman Empire Coin Collection",
      description: "Authentic Roman coins from 1st century AD in excellent condition.",
      currentBid: 2450,
      bidCount: 12,
      timeLeft: "2 days left",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.1.0&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "Victorian Era Pocket Watch",
      description: "Gold-plated pocket watch from 1890s with intricate engravings.",
      currentBid: 1200,
      bidCount: 8,
      timeLeft: "1 day left",
      image: "https://images.unsplash.com/photo-1518131672697-613becd4fab5?ixlib=rb-4.1.0&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "Ancient Greek Amphora",
      description: "Terracotta vessel from 5th century BC with mythological scenes.",
      currentBid: 3500,
      bidCount: 15,
      timeLeft: "3 days left",
      image: "https://images.unsplash.com/photo-1543459176-4426b37223ba?ixlib=rb-4.1.0&auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-amber-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-amber-900 mb-8 text-center font-serif">
          Historical Auctions
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {auctionItems.map(item => (
            <AuctionCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;