import React from 'react';
import { motion } from 'framer-motion';
import { Car, Bell, QrCode, ShieldCheck, Plus } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, color, onClick, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    onClick={onClick}
    className={`bg-dark-gray p-6 rounded-2xl border border-light-gray hover:border-brand-yellow cursor-pointer transition-all duration-300 shadow-lg`}
  >
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-xl bg-light-gray`}>
        <Icon className={`w-7 h-7 ${color}`} />
      </div>
      <p className={`text-4xl font-bold ${color}`}>{value}</p>
    </div>
    <h3 className="mt-4 text-lg font-semibold text-text-primary">{title}</h3>
  </motion.div>
);

const QuickActionButton = ({ icon: Icon, label, onClick, delay }) => (
    <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay }}
        onClick={onClick}
        className="flex flex-col items-center justify-center gap-2 bg-dark-gray p-4 rounded-2xl border border-light-gray hover:bg-light-gray hover:border-brand-yellow transition-all duration-300"
    >
        <Icon className="w-7 h-7 text-brand-yellow"/>
        <span className="text-sm font-medium text-text-secondary">{label}</span>
    </motion.button>
);


const Dashboard = ({ vehicles, notifications, setActiveTab }) => {
  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <header>
        <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary">Bem-vindo(a) ao seu painel de controle.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <StatCard 
            icon={Car} 
            title="Meus Veículos" 
            value={vehicles.length} 
            color="text-blue-400" 
            onClick={() => setActiveTab('vehicles')}
            delay={0.1}
        />
        <StatCard 
            icon={Bell} 
            title="Novos Alertas" 
            value={unreadNotifications} 
            color="text-red-400"
            onClick={() => setActiveTab('notifications')}
            delay={0.2}
        />
      </div>

      <div className="bg-dark-gray p-6 rounded-2xl border border-light-gray">
        <h2 className="text-xl font-semibold mb-4 text-text-primary">Acesso Rápido</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <QuickActionButton icon={Plus} label="Novo Veículo" onClick={() => setActiveTab('vehicles')} delay={0.3} />
            <QuickActionButton icon={QrCode} label="Gerar QR" onClick={() => setActiveTab('qr')} delay={0.4} />
            <QuickActionButton icon={Bell} label="Ver Alertas" onClick={() => setActiveTab('notifications')} delay={0.5} />
            <QuickActionButton icon={ShieldCheck} label="Meu Perfil" onClick={() => setActiveTab('profile')} delay={0.6} />
        </div>
      </div>
      
      <div className="bg-dark-gray p-6 rounded-2xl border border-light-gray">
          <h2 className="text-xl font-semibold mb-4 text-text-primary">Últimas Notificações</h2>
          <div className="space-y-4">
              {notifications.slice(0,3).map((n, i) => (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-light-gray rounded-xl"
                  >
                      <div className={`w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center ${n.read ? 'bg-gray-600' : 'bg-brand-yellow yellow-glow'}`}>
                          <Bell className={`w-5 h-5 ${n.read ? 'text-text-secondary' : 'text-brand-black'}`}/>
                      </div>
                      <div>
                          <p className="font-medium text-text-primary">{n.message}</p>
                          <p className="text-sm text-text-secondary">{new Date(n.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                  </motion.div>
              ))}
              {notifications.length === 0 && (
                  <p className="text-center text-text-secondary py-4">Você não tem notificações.</p>
              )}
          </div>
      </div>

    </motion.div>
  );
};

export default Dashboard;