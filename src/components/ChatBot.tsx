import React, { useState, useRef, useEffect } from 'react';
import { GlassCard } from './GlassCard';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const WEBHOOK_URL = 'https://mjke.app.n8n.cloud/webhook-test/26a61c54-3e28-4311-b75b-d22d4985188d';

export const ChatBot = React.memo(() => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || data.message || JSON.stringify(data),
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <GlassCard delay={0.6}>
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="p-2 bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 rounded-lg"
        >
          <Bot className="text-cyan-400" size={24} />
        </motion.div>
        <div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
            AI Assistant
          </h3>
          <p className="text-xs text-gray-400">Connected to webhook</p>
        </div>
      </div>

      <div className="space-y-4 mb-4 h-[400px] overflow-y-auto pr-2">
        <AnimatePresence>
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-400 py-12"
            >
              <Bot className="mx-auto mb-3 text-cyan-400" size={48} />
              <p>Start a conversation...</p>
            </motion.div>
          )}

          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'bot' && (
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-cyan-500/30 to-fuchsia-500/30 rounded-lg flex items-center justify-center">
                  <Bot size={16} className="text-cyan-400" />
                </div>
              )}
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white'
                    : 'bg-white/10 text-gray-200 border border-cyan-500/20'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
                <p className="text-xs mt-1 opacity-60">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              {message.sender === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-fuchsia-500/30 to-cyan-500/30 rounded-lg flex items-center justify-center">
                  <User size={16} className="text-fuchsia-400" />
                </div>
              )}
            </motion.div>
          ))}

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3 justify-start"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-cyan-500/30 to-fuchsia-500/30 rounded-lg flex items-center justify-center">
                <Bot size={16} className="text-cyan-400" />
              </div>
              <div className="bg-white/10 border border-cyan-500/20 px-4 py-3 rounded-2xl">
                <Loader2 className="animate-spin text-cyan-400" size={20} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2 mt-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={loading}
          className="flex-1 px-4 py-3 bg-white/5 border border-cyan-500/30 rounded-xl text-white placeholder-gray-400
            focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all
            disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={sendMessage}
          disabled={!input.trim() || loading}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-xl text-white font-semibold
            hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center gap-2"
        >
          <Send size={18} />
        </motion.button>
      </div>
    </GlassCard>
  );
});
