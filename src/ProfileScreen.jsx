import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Volume2, Power, Shield, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SettingsItem = ({ icon: Icon, title, description, children, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="flex items-center justify-between"
    >
        <div className="flex items-center gap-4">
            <div className="bg-dark-gray p-3 rounded-full">
                <Icon className="w-5 h-5 text-text-secondary" />
            </div>
            <div>
                <h4 className="font-semibold text-text-primary">{title}</h4>
                <p className="text-sm text-text-secondary">{description}</p>
            </div>
        </div>
        <div>
            {children}
        </div>
    </motion.div>
);

const ProfileScreen = ({ user, onLogout }) => {
    const [notifications, setNotifications] = useState({
        push: true,
        sound: false,
        vibration: true,
    });

    const handleNotificationChange = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };
    
    const userInitial = user.name ? user.name.charAt(0).toUpperCase() : '?';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
        >
            <header className="flex flex-col items-center text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: 'spring' }}>
                    <Avatar className="w-24 h-24 mb-4 border-4 border-brand-yellow shadow-lg yellow-glow">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} />
                        <AvatarFallback className="bg-dark-gray text-brand-yellow text-3xl font-bold">{userInitial}</AvatarFallback>
                    </Avatar>
                </motion.div>
                <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-2xl font-bold text-text-primary">{user.name}</motion.h1>
                <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-text-secondary">{user.email}</motion.p>
            </header>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-dark-gray p-6 rounded-2xl border border-light-gray space-y-6"
            >
                <h3 className="text-lg font-semibold text-text-primary">Notificações</h3>
                <SettingsItem icon={Bell} title="Notificações Push" description="Receber alertas em tempo real" delay={0.5}>
                    <Switch
                        checked={notifications.push}
                        onCheckedChange={() => handleNotificationChange('push')}
                        aria-readonly
                    />
                </SettingsItem>
                <SettingsItem icon={Volume2} title="Sons de Alerta" description="Ativar sons para notificações" delay={0.6}>
                    <Switch
                        checked={notifications.sound}
                        onCheckedChange={() => handleNotificationChange('sound')}
                        aria-readonly
                    />
                </SettingsItem>
                <SettingsItem icon={Power} title="Vibração" description="Vibrar ao receber alertas" delay={0.7}>
                    <Switch
                        checked={notifications.vibration}
                        onCheckedChange={() => handleNotificationChange('vibration')}
                        aria-readonly
                    />
                </SettingsItem>
            </motion.div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-dark-gray p-6 rounded-2xl border border-light-gray space-y-4"
            >
                 <h3 className="text-lg font-semibold text-text-primary">Conta</h3>
                 <div className="flex items-center gap-4 text-text-primary cursor-pointer hover:text-brand-yellow transition-colors">
                     <Shield className="w-5 h-5"/>
                     <span>Termos de Serviço e Privacidade</span>
                 </div>
                 <div onClick={onLogout} className="flex items-center gap-4 text-red-400 cursor-pointer hover:text-red-500 transition-colors">
                     <LogOut className="w-5 h-5"/>
                     <span>Sair da conta</span>
                 </div>
            </motion.div>
        </motion.div>
    );
};

export default ProfileScreen;