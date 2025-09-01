// src/utils/notificationUtils.js
import { Car, AlertTriangle, Lightbulb, DoorOpen } from 'lucide-react';

export const notificationTypes = [
  { value: 'blocked',     label: 'Bloqueio',       icon: Car },
  { value: 'window_open', label: 'Vidro Aberto',   icon: DoorOpen },
  { value: 'lights_on',   label: 'Luzes Acesas',   icon: Lightbulb },
  { value: 'collision',   label: 'Colisão',        icon: AlertTriangle },
];

export const filterOptions = [
  { value: 'all',     label: 'Todas' },
  { value: 'unread',  label: 'Não lidas' },
  ...notificationTypes.map(t => ({ value: t.value, label: t.label }))
];

export const getNotificationTypeInfo = (type) => {
  const found = notificationTypes.find(t => t.value === type);
  return found || { value: type || 'unknown', label: 'Outros', icon: AlertTriangle };
};

export const getPriorityLevel = (type) => {
  switch (type) {
    case 'collision': return 'alta';
    case 'blocked':   return 'alta';
    case 'window_open':
    case 'lights_on': return 'média';
    default:          return 'baixa';
  }
};

export const getPriorityColor = (type) => {
  switch (getPriorityLevel(type)) {
    case 'alta':  return 'text-red-400';
    case 'média': return 'text-orange-400';
    default:      return 'text-yellow-400';
  }
};
