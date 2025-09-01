import React from 'react';
import { motion } from 'framer-motion';

const guidelines = {
    allowed: [
        "Avisos sobre veículos bloqueados",
        "Notificações sobre problemas",
        "Comunicação respeitosa",
        "Agradecimentos"
    ],
    prohibited: [
        "Linguagem ofensiva",
        "Spam ou mensagens repetitivas",
        "Compartilhamento de dados pessoais",
        "Uso comercial"
    ]
};

const GuidelineSection = ({ title, items, symbol }) => (
    <div className="space-y-2">
        <h3 className="font-medium text-white">{symbol} {title}:</h3>
        <ul className="text-sm text-gray-300 space-y-1">
            {items.map(item => <li key={item}>• {item}</li>)}
        </ul>
    </div>
);

const ChatGuidelines = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="traffic-card rounded-xl p-6 warning-glow"
        >
            <h2 className="text-xl font-semibold text-yellow-400 mb-4">
                📋 Diretrizes do Chat
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <GuidelineSection title="Permitido" items={guidelines.allowed} symbol="✅" />
                <GuidelineSection title="Proibido" items={guidelines.prohibited} symbol="❌" />
            </div>
        </motion.div>
    );
};

export default ChatGuidelines;