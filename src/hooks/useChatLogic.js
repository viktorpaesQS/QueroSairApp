// src/hooks/useChatLogic.js
import { useEffect, useMemo, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

const randomReply = () => {
  const msgs = [
    'Ok, já estou a mover. 👍',
    'Obrigado pelo aviso!',
    'Desculpa o transtorno, indo já.',
    'Pode aguardar 2 min?'
  ];
  return msgs[Math.floor(Math.random() * msgs.length)];
};

export const useChatLogic = (initialChats = [], setChats) => {
  const { toast } = useToast();

  // UI state
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [showNewChatForm, setShowNewChatForm] = useState(false);
  const [newChatCode, setNewChatCode] = useState('');

  // normaliza lista e mantém cópia local
  const normalize = (list) =>
    (list || []).map(c => ({
      id: c.id ?? Date.now(),
      code: c.code ?? '',
      status: c.status ?? 'active', // 'active' | 'resolved'
      createdAt: c.createdAt ?? new Date().toISOString(),
      messages: Array.isArray(c.messages) ? c.messages : [],
      reported: !!c.reported,
    }));

  const [localChats, setLocalChats] = useState(() => normalize(initialChats));

  useEffect(() => { setLocalChats(normalize(initialChats)); }, [initialChats]);
  useEffect(() => {
    setChats?.(localChats);
    localStorage.setItem('queroSair_chats', JSON.stringify(localChats));
  }, [localChats, setChats]);

  const activeChats = useMemo(() => localChats.filter(c => c.status === 'active'), [localChats]);
  const resolvedChats = useMemo(() => localChats.filter(c => c.status === 'resolved'), [localChats]);

  const updateChat = (id, updater) => {
    setLocalChats(prev => prev.map(c => (c.id === id ? { ...c, ...updater(c) } : c)));
  };

  const handleStartNewChat = () => {
    const code = newChatCode.trim() || Math.random().toString(36).slice(2, 8).toUpperCase();
    const newChat = {
      id: Date.now(),
      code,
      status: 'active',
      createdAt: new Date().toISOString(),
      messages: [
        {
          id: Date.now() - 1,
          sender: 'system',
          text: `Chat iniciado com o código ${code}.`,
          timestamp: new Date().toISOString(),
        },
      ],
      reported: false,
    };
    setLocalChats(prev => [newChat, ...prev]);
    setSelectedChat(newChat);
    setShowNewChatForm(false);
    setNewChatCode('');
    toast({ title: 'Novo chat', description: `Chat iniciado (${code}).` });
  };

  const handleSendMessage = () => {
    if (!selectedChat || !newMessage.trim()) return;
    const text = newMessage.trim();
    const msg = {
      id: Date.now(),
      sender: 'me',
      text,
      timestamp: new Date().toISOString(),
    };
    updateChat(selectedChat.id, () => ({
      messages: [...(selectedChat.messages || []), msg],
    }));
    setNewMessage('');

    // resposta simulada
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        sender: 'peer',
        text: randomReply(),
        timestamp: new Date().toISOString(),
      };
      updateChat(selectedChat.id, (c) => ({
        messages: [...(c.messages || []), reply],
      }));
    }, 900);
  };

  const handleCloseChat = () => {
    if (!selectedChat) return;
    updateChat(selectedChat.id, () => ({ status: 'resolved' }));
    setSelectedChat(null);
    toast({ title: 'Chat encerrado', description: 'Movido para resolvidos.' });
  };

  const handleReportChat = () => {
    if (!selectedChat) return;
    updateChat(selectedChat.id, () => ({ reported: true }));
    toast({ title: 'Utilizador reportado', description: 'A sua denúncia foi registada.' });
  };

  return {
    // state
    selectedChat, setSelectedChat,
    newMessage, setNewMessage,
    showNewChatForm, setShowNewChatForm,
    newChatCode, setNewChatCode,

    // derivados
    activeChats, resolvedChats,

    // actions
    handleStartNewChat,
    handleSendMessage,
    handleCloseChat,
    handleReportChat,
  };
};
