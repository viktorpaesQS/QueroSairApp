import React from 'react';
import { Bell, AlertTriangle, Car } from 'lucide-react';
import { motion } from 'framer-motion';

const COLORS = {
  total:     { bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
  unread:    { bg: 'bg-red-500/20',    text: 'text-red-400' },
  blocked:   { bg: 'bg-orange-500/20', text: 'text-orange-400' },
  collision: { bg: 'bg-red-500/20',    text: 'text-red-500' },
};

export default function NotificationStats({ notifications = [], unreadCount = 0 }) {
  const blockedCount = notifications.filter(n => n.type === 'blocked').length;
  const collisionCount = notifications.filter(n => n.type === 'collision').length;

  const stats = [
    { key: 'total',     icon: Bell,          label: 'Total',       value: notifications.length, delay: 0   },
    { key: 'unread',    icon: AlertTriangle, label: 'Não lidas',   value: unreadCount,          delay: 0.1 },
    { key: 'blocked',   icon: Car,           label: 'Bloqueios',   value: blockedCount,         delay: 0.2 },
    { key: 'collision', icon: AlertTriangle, label: 'Colisões',    value: collisionCount,       delay: 0.3 },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map(stat => (
        <motion.div
          key={stat.key}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: stat.delay }}
          className="rounded-2xl border border-light-gray p-3 bg-brand-black"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${COLORS[stat.key].bg}`}>
              <stat.icon className={`w-5 h-5 ${COLORS[stat.key].text}`} />
            </div>
            <div>
              <div className="text-sm text-text-secondary">{stat.label}</div>
              <div className="text-xl font-semibold text-text-primary">{stat.value}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
