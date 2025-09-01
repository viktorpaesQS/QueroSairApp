import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Car, QrCode, User, Bell, MessageSquare } from 'lucide-react';

import Toaster from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { getLocationWithAddress } from '@/lib/geo';
import LanguagePicker from '@/components/LanguagePicker';

// Screens em src/
import AuthScreen from '@/AuthScreen';
import Dashboard from '@/Dashboard';
import VehicleManagement from '@/VehicleManagement';
import ChatSystem from '@/ChatSystem';
import QRCodeGenerator from '@/QRCodeGenerator';
import ProfileScreen from '@/ProfileScreen';

// Notificações em src/components/notification/
import NotificationCenter from '@/components/notification/NotificationCenter';

const MobileBottomNav = ({ activeTab, setActiveTab, unreadCount }) => {
  const items = [
    { id: 'dashboard',     icon: LayoutGrid,    label: 'Home' },
    { id: 'vehicles',      icon: Car,           label: 'Vehicles' },
    { id: 'qr',            icon: QrCode,        label: 'Scan' },
    { id: 'notifications', icon: Bell,          label: 'Alerts', badge: unreadCount },
    { id: 'chat',          icon: MessageSquare, label: 'Chat' },
    { id: 'profile',       icon: User,          label: 'Profile' },
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 h-20 border-t border-white/10 bg-black/60 backdrop-blur supports-[backdrop-filter]:bg-black/40 z-50 md:hidden"
    >
      <div className="mx-auto grid h-full max-w-sm grid-cols-6 px-2">
        {items.map((item) => {
          const ActiveBg =
            activeTab === item.id ? (
              <span className="absolute inset-0 rounded-2xl bg-[var(--brand-yellow)]/18 ring-1 ring-[var(--brand-yellow)]/25" />
            ) : null;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="relative mx-1 my-3 rounded-2xl px-2 py-1 text-xs text-text-secondary transition"
            >
              {ActiveBg}
              <div className="relative flex flex-col items-center gap-1">
                <item.icon className={`h-6 w-6 ${activeTab === item.id ? 'text-brand-yellow' : ''}`} />
                {item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-black/60" />
                )}
                <span className={`${activeTab === item.id ? 'text-brand-yellow' : ''}`}>{item.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Veículos
  const [vehicles, setVehicles] = useState([]);

  // Garagens
  const [garages, setGarages] = useState([]);

  // Último local de estacionamento (geo)
  const [lastParking, setLastParking] = useState(null);

  // Notificações / Chat
  const [notifications, setNotifications] = useState([]);
  const [chats, setChats] = useState([]);

  const { toast } = useToast();

  useEffect(() => {
    const savedUser = localStorage.getItem('queroSair_user');
    const savedVehicles = localStorage.getItem('queroSair_vehicles');
    const savedGarages = localStorage.getItem('queroSair_garages');
    const savedNotifications = localStorage.getItem('queroSair_notifications');
    const savedChats = localStorage.getItem('queroSair_chats');
    const savedParking = localStorage.getItem('queroSair_lastParking');

    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    if (savedVehicles) setVehicles(JSON.parse(savedVehicles));
    if (savedGarages) setGarages(JSON.parse(savedGarages));
    if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
    if (savedChats) setChats(JSON.parse(savedChats));
    if (savedParking) setLastParking(JSON.parse(savedParking));
  }, []);

  // Notificações simuladas (inclui endereço salvo)
  useEffect(() => {
    if (!currentUser) return;
    const id = setInterval(() => {
      if (Math.random() > 0.7) {
        const place = lastParking?.address ? ` em ${lastParking.address}` : '';
        const newNotification = {
          id: Date.now(),
          type: ['blocked', 'window_open', 'lights_on', 'collision'][Math.floor(Math.random() * 4)],
          message: `O seu veículo pode estar em risco${place}.`,
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
  }, [currentUser, toast, lastParking]);

  // Auth
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

  // Veículos
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

  // Garagens
  const addGarage = (garage) => {
    const newGarage = { id: Date.now(), ...garage };
    const updated = [newGarage, ...garages];
    setGarages(updated);
    localStorage.setItem('queroSair_garages', JSON.stringify(updated));
    toast({ title: '🏠 Garagem adicionada', description: newGarage.name || newGarage.address });
  };

  const removeGarage = (garageId) => {
    const updated = garages.filter(g => g.id !== garageId);
    setGarages(updated);
    localStorage.setItem('queroSair_garages', JSON.stringify(updated));
    toast({ title: '🗑️ Garagem removida' });
  };

  // GEO – salvar / limpar local de estacionamento
  const handleSaveParking = async () => {
    try {
      const loc = await getLocationWithAddress(); // pede permissão ao usuário
      setLastParking(loc);
      localStorage.setItem('queroSair_lastParking', JSON.stringify(loc));
      toast({
        title: '📍 Local salvo',
        description: loc.address || `${loc.lat.toFixed(5)}, ${loc.lon.toFixed(5)}`,
      });
    } catch (e) {
      toast({
        title: 'Não consegui obter sua localização',
        description: e.message,
        variant: 'destructive',
      });
    }
  };

  const handleClearParking = () => {
    setLastParking(null);
    localStorage.removeItem('queroSair_lastParking');
    toast({ title: '🧹 Local de estacionamento apagado' });
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
        return (
          <Dashboard
            vehicles={vehicles}
            notifications={notifications}
            chats={chats}
            setActiveTab={setActiveTab}
            lastParking={lastParking}
            onSaveParking={handleSaveParking}
            onClearParking={handleClearParking}
          />
        );
      case 'vehicles':
        return (
          <VehicleManagement
            vehicles={vehicles}
            onAddVehicle={addVehicle}
            onRemoveVehicle={removeVehicle}
            garages={garages}
            onAddGarage={addGarage}
            onRemoveGarage={removeGarage}
          />
        );
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
        return (
          <Dashboard
            vehicles={vehicles}
            notifications={notifications}
            chats={chats}
            setActiveTab={setActiveTab}
            lastParking={lastParking}
            onSaveParking={handleSaveParking}
            onClearParking={handleClearParking}
          />
        );
    }
  };

  return (
    <>
      <Helmet>
        <title>QUERO SAIR - Comunicação Urbana Inteligente</title>
        <meta
          name="description"
          content="Use QR codes para evitar transtornos no trânsito. Comunique-se de forma anónima e receba notificações inteligentes sobre o seu veículo."
        />
        <meta property="og:title" content="QUERO SAIR - Comunicação Urbana Inteligente" />
        <meta property="og:description" content="A solução moderna para problemas de estacionamento." />
      </Helmet>

      {/* seletor de idioma visível em todas as telas */}
      <div className="fixed top-3 right-3 z-[60]">
        <LanguagePicker />
      </div>

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
              <MobileBottomNav
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                unreadCount={unreadNotifications}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
