import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Flag, CheckCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatTimeAgo, getTimeUntilExpiry } from '@/utils/time';

const MessageBubble = ({ message }) => (
    <motion.div
        key={message.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
    >
        <div
            className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                message.sender === 'me'
                    ? 'bg-yellow-400 text-black chat-bubble'
                    : 'bg-gray-700 text-white'
            }`}
        >
            <p className="text-sm">{message.text}</p>
            <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-black/70' : 'text-gray-400'}`}>
                {formatTimeAgo(message.timestamp)}
            </p>
        </div>
    </motion.div>
);

const ChatWindow = ({ chat, onSendMessage, onReport, onClose, newMessage, onNewMessageChange }) => {
    if (!chat) {
        return (
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="traffic-card rounded-xl p-6 warning-glow h-[600px] flex flex-col items-center justify-center"
            >
                <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">
                    Selecione um chat
                </h3>
                <p className="text-gray-500">
                    Escolha um chat da lista ou inicie uma nova conversa
                </p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="traffic-card rounded-xl p-6 warning-glow h-[600px] flex flex-col"
        >
            <div className="flex items-center justify-between pb-4 border-b border-gray-700">
                <div>
                    <h3 className="font-semibold text-white">{chat.vehicleInfo}</h3>
                    <p className="text-sm text-gray-400">
                        Chat anônimo • {getTimeUntilExpiry(chat.expiresAt)}
                    </p>
                </div>
                <div className="flex space-x-2">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onReport(chat.id)}
                        className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                    >
                        <Flag className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onClose(chat.id)}
                        className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                    >
                        <CheckCircle className="w-4 h-4" />
                    </motion.button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
                <AnimatePresence>
                    {chat.messages.length > 0 ? (
                        chat.messages.map((message) => <MessageBubble key={message.id} message={message} />)
                    ) : (
                        <div className="text-center py-8 text-gray-400">
                            <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p>Nenhuma mensagem ainda</p>
                            <p className="text-xs mt-1">Inicie a conversa!</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            <form onSubmit={onSendMessage} className="pt-4 border-t border-gray-700">
                <div className="flex space-x-3">
                    <div className="flex-1">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={onNewMessageChange}
                            placeholder="Digite sua mensagem (máx. 250 caracteres)..."
                            maxLength={250}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                            {newMessage.length}/250 caracteres
                        </p>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            type="submit"
                            disabled={!newMessage.trim()}
                            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 disabled:opacity-50"
                        >
                            <Send className="w-4 h-4" />
                        </Button>
                    </motion.div>
                </div>
            </form>
        </motion.div>
    );
};

export default ChatWindow;