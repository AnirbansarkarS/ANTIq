import { useState, useEffect } from 'react';

/**
 * Custom hook for auction countdown and status management
 */
export const useAuction = (endTime, onEnd = null) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endTime));
    const [status, setStatus] = useState(getAuctionStatus(endTime));

    useEffect(() => {
        if (!endTime) return;

        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft(endTime);
            const newStatus = getAuctionStatus(endTime);

            setTimeLeft(newTimeLeft);
            setStatus(newStatus);

            // Trigger onEnd if the auction just ended
            if (newStatus === 'ended' && status !== 'ended' && onEnd) {
                onEnd();
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [endTime, status, onEnd]);

    return { timeLeft, status, isEnded: status === 'ended', isEndingSoon: status === 'ending-soon' };
};

function calculateTimeLeft(endTime) {
    if (!endTime) return null;

    const end = new Date(endTime);
    const now = new Date();
    const difference = end - now;

    if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    }

    return {
        total: difference,
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    };
}

function getAuctionStatus(endTime) {
    if (!endTime) return 'active';

    const end = new Date(endTime);
    const now = new Date();
    const difference = end - now;

    if (difference <= 0) return 'ended';
    if (difference <= 24 * 60 * 60 * 1000) return 'ending-soon'; // Less than 24 hours
    return 'active';
}

export const formatTimeLeft = (timeLeft) => {
    if (!timeLeft || timeLeft.total <= 0) return 'Auction Ended';

    const { days, hours, minutes, seconds } = timeLeft;

    if (days > 0) {
        return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
        return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
        return `${minutes}m ${seconds}s`;
    } else {
        return `${seconds}s`;
    }
};
