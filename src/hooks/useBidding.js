import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { placeBid, getItemBids } from '../lib/database';

/**
 * Custom hook for bidding functionality with real-time updates
 */
export const useBidding = (itemId, userId) => {
    const [bids, setBids] = useState([]);
    const [highestBid, setHighestBid] = useState(null);
    const [userHighestBid, setUserHighestBid] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch initial bids
    useEffect(() => {
        if (!itemId) return;
        fetchBids();
    }, [itemId]);

    // Subscribe to real-time bid updates
    useEffect(() => {
        if (!itemId) return;

        const channel = supabase
            .channel(`bids-${itemId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'bids',
                    filter: `item_id=eq.${itemId}`,
                },
                (payload) => {
                    handleNewBid(payload.new);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [itemId]);

    const fetchBids = async () => {
        try {
            setLoading(true);
            const data = await getItemBids(itemId);
            setBids(data || []);
            updateBidStats(data || []);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching bids:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleNewBid = (newBid) => {
        setBids((prev) => [newBid, ...prev]);
        updateBidStats([newBid, ...bids]);
    };

    const updateBidStats = (bidList) => {
        if (bidList.length === 0) {
            setHighestBid(null);
            setUserHighestBid(null);
            return;
        }

        // Find highest bid
        const highest = bidList.reduce((max, bid) =>
            bid.amount > (max?.amount || 0) ? bid : max
            , bidList[0]);
        setHighestBid(highest);

        // Find user's highest bid
        if (userId) {
            const userBids = bidList.filter(bid => bid.bidder_id === userId);
            if (userBids.length > 0) {
                const userHighest = userBids.reduce((max, bid) =>
                    bid.amount > (max?.amount || 0) ? bid : max
                    , userBids[0]);
                setUserHighestBid(userHighest);
            }
        }
    };

    const submitBid = async (amount) => {
        if (!userId) {
            throw new Error('You must be logged in to place a bid');
        }

        if (!amount || amount <= 0) {
            throw new Error('Please enter a valid bid amount');
        }

        if (highestBid && amount <= highestBid.amount) {
            throw new Error(`Bid must be higher than current bid of $${highestBid.amount.toLocaleString()}`);
        }

        try {
            setError(null);
            const newBid = await placeBid(itemId, userId, amount);
            return newBid;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const getMinimumBid = (increment = 50) => {
        if (!highestBid) return increment;
        return highestBid.amount + increment;
    };

    const isUserWinning = () => {
        if (!userId || !highestBid) return false;
        return highestBid.bidder_id === userId;
    };

    return {
        bids,
        highestBid,
        userHighestBid,
        loading,
        error,
        submitBid,
        getMinimumBid,
        isUserWinning,
        bidCount: bids.length,
    };
};
