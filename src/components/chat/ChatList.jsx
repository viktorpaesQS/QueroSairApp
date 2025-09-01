import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, CheckCircle } from 'lucide-react';
import { formatTimeAgo, getTimeUntilExpiry } from '@/utils/time';

const ChatListItem = ({ chat, selectedChat, onSelectChat }) => (
    <motion.button
        key={chat.id}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelectChat(chat)}
        className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
            selectedChat?.id === chat.id
                ? 'border-yellow-400 bg-yellow-400/10'
                : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
        }`}
    >
        <div className="flex items-center justify-between mb-2">
            <p className="font-medium text-white">{chat.vehicleInfo}</p>
            <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-xs text-green-400">Ativo</span>
            </div>
        </div>
        <p className="text-xs text-gray-400 mb-1">
            {chat.messages.length} mensagens
        </p>
        <p className="text-xs text-yellow-400">
            {getTimeUntilExpiry(chat.expiresAt)}
        </p>
    </motion.button>
);

const ResolvedChatListItem = ({ chat }) => (
    <div key={chat.id} className="p-3 bg-gray-800/30 rounded-lg">
        <div className="flex items-center justify-between">
            <p className="text-sm text-gray-300">{chat.vehicleInfo}</p>
            <CheckCircle className="w-4 h-4 text-green-400" />
        </div>
        <p className="text-xs text-gray-500">
            {formatTimeAgo(chat.lastActivity)}
        </p>
    </div>
);

const ChatList = ({ activeChats, resolvedChats, selectedChat, onSelectChat }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="traffic-card rounded-xl p-6 warning-glow"
        >
            <h2 className="text-xl font-semibold text-yellow-400 mb-4">
                Chats Ativos ({activeChats.length})
            </h2>

            <div className="space-y-3 max-h-96 overflow-y-auto">
                {activeChats.length > 0 ? (
                    activeChats.map((chat) => (
                        <ChatListItem
                            key={chat.id}
                            chat={chat}
                            selectedChat={selectedChat}
                            onSelectChat={onSelectChat}
                        />
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-400">
                        <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>Nenhum chat ativo</p>
                    </div>
                )}
            </div>

            {resolvedChats.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-700">
                    <h3 className="text-sm font-medium text-gray-400 mb-3">
                        Chats Resolvidos ({resolvedChats.length})
                    </h3>
                    <div className="space-y-2">
                        {resolvedChats.slice(0, 3).map((chat) => (
                           <ResolvedChatListItem key={chat.id} chat={chat} />
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default ChatList;