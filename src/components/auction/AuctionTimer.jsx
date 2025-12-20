import { useAuction, formatTimeLeft } from '../../hooks/useAuction';
import { motion } from 'framer-motion';

const AuctionTimer = ({ endTime, showLabel = true, size = 'md' }) => {
    const { timeLeft, isEnded, isEndingSoon } = useAuction(endTime);

    if (!endTime) return null;

    const sizeClasses = {
        sm: 'text-xs px-2 py-1',
        md: 'text-sm px-3 py-1.5',
        lg: 'text-base px-4 py-2',
        xl: 'text-lg px-5 py-3'
    };

    const getStatusColor = () => {
        if (isEnded) return 'status-badge status-error';
        if (isEndingSoon) return 'status-badge status-warning animate-pulse';
        return 'status-badge status-success';
    };

    const getStatusIcon = () => {
        if (isEnded) return '⏹';
        if (isEndingSoon) return '⚡';
        return '⏱';
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`inline-flex items-center gap-2 ${sizeClasses[size]} ${getStatusColor()} font-semibold rounded-full border-2 shadow-lg transition-all duration-300`}
        >
            <span className="text-lg">{getStatusIcon()}</span>
            <div className="flex flex-col">
                {showLabel && size !== 'sm' && (
                    <span className="text-[0.65em] opacity-80 uppercase tracking-wide">
                        {isEnded ? 'Ended' : isEndingSoon ? 'Ending Soon' : 'Time Left'}
                    </span>
                )}
                <span className="font-bold">
                    {formatTimeLeft(timeLeft)}
                </span>
            </div>
        </motion.div>
    );
};

export default AuctionTimer;
