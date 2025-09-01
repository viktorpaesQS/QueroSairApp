import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Eye, Trash2 } from 'lucide-react';
import { getNotificationTypeInfo, getPriorityLevel, getPriorityColor } from '@/utils/notificationUtils';
import { formatTimeAgo } from '@/utils/time';

const NotificationItem = ({ notification, onMarkAsRead, onSelect, onDelete }) => {
    const typeInfo = getNotificationTypeInfo(notification.type);
    const IconComponent = typeInfo.icon;

    return (
        <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.2 }}
            className={`traffic-card rounded-xl p-6 border-l-4 ${typeInfo.borderColor} ${
                !notification.read ? 'warning-glow' : ''
            }`}
        >
            <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                    <div className={`p-3 rounded-lg ${typeInfo.bgColor}`}>
                        <IconComponent className={`w-6 h-6 ${typeInfo.color}`} />
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-white">{typeInfo.label}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(notification.type)} bg-gray-800`}>
                                {getPriorityLevel(notification.type)}
                            </span>
                            {!notification.read && (
                                <div className="w-2 h-2 bg-yellow-400 rounded-full notification-pulse"></div>
                            )}
                        </div>

                        <p className="text-gray-300 mb-3">{notification.message}</p>

                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <div className="flex items-center space-x-1">
                                <Bell className="w-4 h-4" />
                                <span>{formatTimeAgo(notification.timestamp)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex space-x-2 ml-4">
                    {!notification.read && (
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onMarkAsRead(notification.id)}
                            className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                            title="Marcar como lida"
                        >
                            <Eye className="w-4 h-4" />
                        </motion.button>
                    )}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onSelect(notification)}
                        className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                        title="Ver detalhes"
                    >
                        <Eye className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onDelete(notification.id)}
                        className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                        title="Excluir"
                    >
                        <Trash2 className="w-4 h-4" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

const NotificationList = ({ notifications, onMarkAsRead, onSelect, onDelete, filter, filterOptions }) => {
    return (
        <div className="space-y-4">
            <AnimatePresence>
                {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                        <NotificationItem
                            key={notification.id}
                            notification={notification}
                            onMarkAsRead={onMarkAsRead}
                            onSelect={onSelect}
                            onDelete={onDelete}
                        />
                    ))
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Bell className="w-12 h-12 text-gray-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-400 mb-2">
                            {filter === 'all' ? 'Nenhuma notificação' : `Nenhuma notificação para o filtro selecionado`}
                        </h3>
                        <p className="text-gray-500">
                            {filter === 'all'
                                ? 'Você receberá notificações aqui quando houver atividade'
                                : 'Tente alterar o filtro para ver outras notificações'
                            }
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NotificationList;