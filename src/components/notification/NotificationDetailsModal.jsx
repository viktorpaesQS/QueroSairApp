import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { getNotificationTypeInfo, getPriorityLevel, getPriorityColor } from '@/utils/notificationUtils';

const DetailRow = ({ label, value, valueClassName = "text-white" }) => (
    <div>
        <label className="text-sm text-gray-400">{label}:</label>
        <p className={valueClassName}>{value}</p>
    </div>
);

const NotificationDetailsModal = ({ notification, onClose, onMarkAsRead }) => {
    if (!notification) return null;

    const typeInfo = getNotificationTypeInfo(notification.type);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="traffic-card rounded-xl p-6 max-w-md w-full warning-glow"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-yellow-400">Detalhes da Notificação</h3>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            className="text-gray-400 hover:text-white"
                        >
                            ✕
                        </Button>
                    </div>

                    <div className="space-y-4">
                        <DetailRow label="Tipo" value={typeInfo.label} />
                        <DetailRow label="Mensagem" value={notification.message} />
                        <DetailRow 
                            label="Prioridade" 
                            value={getPriorityLevel(notification.type)} 
                            valueClassName={getPriorityColor(notification.type)} 
                        />
                        <DetailRow 
                            label="Data/Hora" 
                            value={new Date(notification.timestamp).toLocaleString('pt-BR')} 
                        />
                        <DetailRow 
                            label="Status" 
                            value={notification.read ? 'Lida' : 'Não lida'}
                            valueClassName={notification.read ? 'text-green-400' : 'text-yellow-400'}
                        />
                    </div>

                    {!notification.read && (
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-6">
                            <Button
                                onClick={() => {
                                    onMarkAsRead(notification.id);
                                    onClose();
                                }}
                                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                            >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Marcar como Lida
                            </Button>
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default NotificationDetailsModal;