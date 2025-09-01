import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useChatLogic } from '@/hooks/useChatLogic';
import ChatList from '@/components/chat/ChatList';
import ChatWindow from '@/components/chat/ChatWindow';
import NewChatForm from '@/components/chat/NewChatForm';
import ChatGuidelines from '@/components/chat/ChatGuidelines';

const ChatSystem = ({ chats, setChats }) => {
  const {
    selectedChat,
    setSelectedChat,
    newMessage,
    setNewMessage,
    showNewChatForm,
    setShowNewChatForm,
    newChatCode,
    setNewChatCode,
    handleSendMessage,
    handleStartNewChat,
    handleCloseChat,
    handleReportChat,
    activeChats,
    resolvedChats,
  } = useChatLogic(chats, setChats);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">Sistema de Chat</h1>
          <p className="text-gray-400">Comunicação anônima e temporária</p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => setShowNewChatForm(true)}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold hover:from-yellow-500 hover:to-yellow-600 warning-glow"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Novo Chat
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {showNewChatForm && (
          <NewChatForm
            code={newChatCode}
            onCodeChange={setNewChatCode}
            onSubmit={handleStartNewChat}
            onCancel={() => setShowNewChatForm(false)}
          />
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ChatList
            activeChats={activeChats}
            resolvedChats={resolvedChats}
            selectedChat={selectedChat}
            onSelectChat={setSelectedChat}
          />
        </div>
        <div className="lg:col-span-2">
          <ChatWindow
            chat={selectedChat}
            onSendMessage={handleSendMessage}
            onReport={handleReportChat}
            onClose={handleCloseChat}
            newMessage={newMessage}
            onNewMessageChange={(e) => setNewMessage(e.target.value)}
          />
        </div>
      </div>

      <ChatGuidelines />
    </motion.div>
  );
};

export default ChatSystem;