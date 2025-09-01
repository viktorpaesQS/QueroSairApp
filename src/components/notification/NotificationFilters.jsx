import React from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';

const NotificationFilters = ({ filter, setFilter, filterOptions, unreadCount }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="traffic-card rounded-xl p-6 warning-glow"
        >
            <div className="flex items-center space-x-4 mb-4">
                <Filter className="w-5 h-5 text-yellow-400" />
                <h2 className="text-lg font-semibold text-yellow-400">Filtros</h2>
            </div>
            <div className="flex flex-wrap gap-2">
                {filterOptions.map((option) => (
                    <motion.button
                        key={option.value}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFilter(option.value)}
                        className={`px-4 py-2 rounded-lg transition-all ${
                            filter === option.value
                                ? 'bg-yellow-400 text-black font-semibold'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                    >
                        {option.label}
                        {option.value === 'unread' && unreadCount > 0 && (
                            <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                {unreadCount}
                            </span>
                        )}
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
};

export default NotificationFilters;