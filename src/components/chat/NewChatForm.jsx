import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NewChatForm = ({ code, onCodeChange, onSubmit, onCancel }) => (
    <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="traffic-card rounded-xl p-6 warning-glow"
    >
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-yellow-400">Iniciar Novo Chat</h2>
            <Button variant="ghost" size="sm" onClick={onCancel} className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
            </Button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Código QR do Veículo
                </label>
                <input
                    type="text"
                    value={code}
                    onChange={(e) => onCodeChange(e.target.value)}
                    placeholder="Ex: QS-1234567890"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors"
                />
                <p className="text-xs text-gray-400 mt-1">
                    Escaneie o QR code do veículo ou digite o código manualmente
                </p>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                >
                    Iniciar Chat Anônimo
                </Button>
            </motion.div>
        </form>
    </motion.div>
);

export default NewChatForm;