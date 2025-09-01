// src/utils/time.js
export const formatTimeAgo = (timestamp) => {
  if (!timestamp) return '';
  const now = new Date();
  const time = new Date(timestamp);
  const diffSec = Math.floor((now - time) / 1000);

  if (diffSec < 5) return 'Agora';
  if (diffSec < 60) return `${diffSec}s atrás`;

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}min atrás`;

  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}h atrás`;

  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 7) return `${diffDay}d atrás`;

  return time.toLocaleString('pt-PT');
};

export const getTimeUntilExpiry = (expiresAt) => {
  if (!expiresAt) return '';
  const now = new Date();
  const expiry = new Date(expiresAt);
  const diffHours = Math.floor((expiry - now) / (1000 * 60 * 60));

  if (diffHours <= 0) return 'Expirado';
  if (diffHours < 1) return 'Expira em breve';
  if (diffHours < 24) return `Expira em ${diffHours}h`;

  const diffDays = Math.floor(diffHours / 24);
  return `Expira em ${diffDays}d`;
};
