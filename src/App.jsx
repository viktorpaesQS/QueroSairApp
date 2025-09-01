import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Car, QrCode, User, Bell, MessageSquare } from 'lucide-react';

import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';

// Screens vivem diretamente em src/
import AuthScreen from '@/AuthScreen';
import Dashboard from '@/Dashboard';
import VehicleManagement from '@/VehicleManagement';
import ChatSystem from '@/ChatSystem';
import QRCodeGenerator from '@/QRCodeGenerator';
import ProfileScreen from '@/ProfileScreen';

// Notificações vivem em src/components/notification/
import NotificationCenter from '@/components/notification/NotificationCenter';

const MobileBottomNav = ({ activeTab, setActiveTab, unreadCount }) => (
  <motion.div
    initial={{ y: 100 }}
    animate={{ y: 0 }}
    exit={{ y: 100 }}
    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    className="fixed bottom-0 left-0 right-0 h-20 bg-dark-gray border-t border-light-gray flex justify-around items-center z-50 md:hidden"
  >
    {[
      { id: 'dashboard',     icon: LayoutGrid,    label: 'Início' },
      { id: 'vehicles',      icon: Car,           label: 'Veículos' },
      { id: 'qr',            icon: QrCode,        label: 'QR' },
      { id: 'notifications', icon: Bell,          label: 'Avisos', badge: unreadCount },
      { id: 'chat',          icon: MessageSquare, label: 'Chat' },
      { id: 'profile',       icon: User,          label: 'Perfil' },
    ].map(item => (
      <button
        key={item.id}
        onClick={() => setActiveTab(item.id)}
        className="relative flex flex-col items-center gap-1 text-text-secondary transition-colors hover:text-brand-yellow"
      >
        <item.icon className={`w-6 h-6 ${activeTab === item.id ? 'text-brand-yellow' : ''}`} />
        {item.badge > 0 && (
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-dark-gray" />
        )}
        <span className={`text-xs ${activeTab === item.id ? 'text-brand-yellow' : ''}`}>{item.label}</span>
      </button>
    ))}
  </motion.div>
);

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [vehicles, setVehicles] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [chats, setChats] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedUser = localStorage.getItem('queroSair_user');
    const savedVehicles = localStorage.getItem('queroSair_vehicles');
    const savedNotifications = localStorage.getItem('queroSair_notifications');
    const savedChats = localStorage.getItem('queroSair_chats');

    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    if (savedVehicles) setVehicles(JSON.parse(savedVehicles));
    if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
    if (savedChats) setChats(JSON.parse(savedChats));
  }, []);

  // Simulador de novas notificações (demo)
  useEffect(() => {
    if (!currentUser) return;
    const id = setInterval(() => {
      if (Math.random() > 0.7) {
        const newNotification = {
          id: Date.now(),
          type: ['blocked', 'window_open', 'lights_on', 'collision'][Math.floor(Math.random() * 4)],
          message: 'O seu veículo pode estar em risco.',
          timestamp: new Date().toISOString(),
          read: false,
        };
        setNotifications(prev => {
          const updated = [newNotification, ...prev].slice(0, 20);
          localStorage.setItem('queroSair_notifications', JSON.stringify(updated));
          return updated;
        });
        toast({ title: '🚨 Nova Notificação', description: newNotification.message, duration: 5000 });
      }
    }, 20000);
    return () => clearInterval(id);
  }, [currentUser, toast]);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('queroSair_user', JSON.stringify(userData));
    toast({ title: '🎉 Bem-vindo(a)!', description: 'Login realizado com sucesso.' });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.clear();
    setActiveTab('dashboard');
    toast({ title: '👋 Até logo!', description: 'Sessão terminada com segurança.' });
  };

  const addVehicle = (vehicleData) => {
    const newVehicle = { id: Date.now(), ...vehicleData, qrCode: `QS-${Date.now()}` };
    const updated = [...vehicles, newVehicle];
    setVehicles(updated);
    localStorage.setItem('queroSair_vehicles', JSON.stringify(updated));
    toast({ title: '🚗 Veículo adicionado!', description: `${vehicleData.brand} ${vehicleData.model}` });
  };

  const removeVehicle = (vehicleId) => {
    const updated = vehicles.filter(v => v.id !== vehicleId);
    setVehicles(updated);
    localStorage.setItem('queroSair_vehicles', JSON.stringify(updated));
    toast({ title: '🗑️ Veículo removido', description: 'Remoção concluída.' });
  };

  const markNotificationAsRead = (notificationId) => {
    const updated = notifications.map(n => (n.id === notificationId ? { ...n, read: true } : n));
    setNotifications(updated);
    localStorage.setItem('queroSair_notifications', JSON.stringify(updated));
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard vehicles={vehicles} notifications={notifications} chats={chats} setActiveTab={setActiveTab} />;
      case 'vehicles':
        return <VehicleManagement vehicles={vehicles} onAddVehicle={addVehicle} onRemoveVehicle={removeVehicle} />;
      case 'qr':
        return <QRCodeGenerator vehicles={vehicles} />;
      case 'chat':
        return <ChatSystem chats={chats} setChats={setChats} />;
      case 'notifications':
        return (
          <NotificationCenter
            notifications={notifications}
            onMarkAsRead={markNotificationAsRead}
          />
        );
      case 'profile':
        return <ProfileScreen user={currentUser} onLogout={handleLogout} />;
      default:
        return <Dashboard vehicles={vehicles} notifications={notifications} chats={chats} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <>
      <Helmet>
        <title>QUERO SAIR - Comunicação Urbana Inteligente</title>
        <meta name="description" content="Use QR codes para evitar transtornos no trânsito. Comunique-se de forma anónima e receba notificações inteligentes sobre o seu veículo." />
        <meta property="og:title" content="QUERO SAIR - Comunicação Urbana Inteligente" />
        <meta property="og:description" content="A solução moderna para problemas de estacionamento." />
      </Helmet>

      <Toaster />

      <div className="min-h-screen w-full bg-brand-black road-lines-pattern">
        <AnimatePresence mode="wait">
          {!currentUser ? (
            <motion.div key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <AuthScreen onLogin={handleLogin} />
            </motion.div>
          ) : (
            <motion.div key="app" className="pb-20 md:pb-0">
              <div className="p-4 sm:p-6 lg:p-8">{renderContent()}</div>
              <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} unreadCount={unreadNotifications} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
