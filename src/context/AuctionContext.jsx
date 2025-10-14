import React, { createContext, useContext, useState } from 'react';

const AuctionContext = createContext();

export const useAuction = () => {
  const context = useContext(AuctionContext);
  if (!context) {
    throw new Error('useAuction must be used within an AuctionProvider');
  }
  return context;
};

export const AuctionProvider = ({ children }) => {
  const [auctions, setAuctions] = useState([
    {
      id: 1,
      title: "Roman Empire Coin Collection",
      description: "Authentic Roman coins from 1st century AD",
      image: "/api/placeholder/300/200",
      currentBid: 2450,
      bidCount: 12,
      timeLeft: "2 days"
    },
    {
      id: 2,
      title: "Victorian Era Pocket Watch",
      description: "Gold-plated pocket watch from 1890s",
      image: "/api/placeholder/300/200",
      currentBid: 1200,
      bidCount: 8,
      timeLeft: "1 day"
    }
  ]);

  const [userBids, setUserBids] = useState([]);

  const placeBid = (auctionId, bidAmount) => {
    // Implement bid placement logic
    console.log(`Placing bid of ${bidAmount} on auction ${auctionId}`);
  };

  const value = {
    auctions,
    userBids,
    placeBid,
    setAuctions
  };

  return (
    <AuctionContext.Provider value={value}>
      {children}
    </AuctionContext.Provider>
  );
};