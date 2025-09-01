// src/hooks/useNotificationLogic.js
import { useEffect, useMemo, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { formatTimeAgo } from '@/utils/time';
import {
  notificationTypes,
  filterOptions,
  getNotificationTypeInfo,
  getPriorityLevel,
  getPriorityColor,
} from '@/utils/notificationUtils';

export const useNotificationLogic = (notifications = [], onMarkAsRead) => {
  const { toast } = useToast();

  // Mantém uma cópia interna para permitir delete/markAll sem depender do pai
  const [internal, setInternal] = useState(notifications);
  const [filter, setFilter] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState(null);

  // Sincroniza quando o pai muda
  useEffect(() => { setInternal(notifications); }, [notifications]);

  const unreadCount = useMemo(
    () => internal.filter(n => !n.read).length,
    [internal]
  );

  const filteredNotifications = useMemo(() => {
    if (filter === 'all') return internal;
    if (filter === 'unread') return internal.filter(n => !n.read);
    return internal.filter(n => n.type === filter);
  }, [filter, internal]);

  const handleMarkAsRead = (id) => {
    setInternal(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    onMarkAsRead?.(id);
  };

  const handleMarkAllAsRead = () => {
    setInternal(prev => prev.map(n => ({ ...n, read: true })));
    toast({ title: 'Notificações', description: 'Todas marcadas como lidas.' });
    // opcional: notificar o pai uma a uma
    internal.forEach(n => { if (!n.read) onMarkAsRead?.(n.id); });
  };

  const handleDeleteNotification = (id) => {
    setInternal(prev => prev.filter(n => n.id !== id));
    toast({ title: 'Notificações', description: 'Notificação removida.' });
  };

  return {
    // state
    filter, setFilter,
    selectedNotification, setSelectedNotification,
    filteredNotifications, unreadCount,

    // actions
    handleMarkAsRead,
    handleMarkAllAsRead,
    handleDeleteNotification,

    // helpers/consts p/ componentes
    formatTimeAgo,
    notificationTypes,
    filterOptions,
    getNotificationTypeInfo,
    getPriorityLevel,
    getPriorityColor,
  };
};
