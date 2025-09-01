import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNotificationLogic } from '@/hooks/useNotificationLogic';
import NotificationList from '@/components/notification/NotificationList';
import NotificationFilters from '@/components/notification/NotificationFilters';
import NotificationDetailsModal from '@/components/notification/NotificationDetailsModal';
import NotificationStats from '@/components/notification/NotificationStats';

const NotificationCenter = ({ notifications, onMarkAsRead }) => {
    const {
        filter,
        setFilter,
        selectedNotification,
        setSelectedNotification,
        filteredNotifications,
        unreadCount,
        handleMarkAsRead,
        handleMarkAllAsRead,
        handleDeleteNotification,
        filterOptions,
    } = useNotificationLogic(notifications, onMarkAsRead);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-yellow-400 mb-2">Central de Notificações</h1>
                    <p className="text-gray-400">
                        {unreadCount > 0 ? `${unreadCount} notificações não lidas` : 'Todas as notificações foram lidas'}
                    </p>
                </div>
                {unreadCount > 0 && (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            onClick={handleMarkAllAsRead}
                            className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                        >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Marcar Todas como Lidas
                        </Button>
                    </motion.div>
                )}
            </div>

            <NotificationStats notifications={notifications} />

            <NotificationFilters
                filter={filter}
                setFilter={setFilter}
                filterOptions={filterOptions}
                unreadCount={unreadCount}
            />

            <NotificationList
                notifications={filteredNotifications}
                onMarkAsRead={handleMarkAsRead}
                onSelect={setSelectedNotification}
                onDelete={handleDeleteNotification}
                filter={filter}
                filterOptions={filterOptions}
            />

            <NotificationDetailsModal
                notification={selectedNotification}
                onClose={() => setSelectedNotification(null)}
                onMarkAsRead={handleMarkAsRead}
            />
        </motion.div>
    );
};

export default NotificationCenter;