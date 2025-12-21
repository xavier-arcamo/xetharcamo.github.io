import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { sendMessageToOracle } from '../services/geminiService';
import { ChatMessage } from '../types';

const Oracle: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'init', role: 'model', text: "Greetings, traveler. I am the Oracle of Vazheim. What knowledge do you seek?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToOracle(userMsg.text);
      const modelMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText };
      setMessages(prev => [...prev, modelMsg]);
    } catch (e) {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: "The ether is silent.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 p-4 bg-vazheim-gold rounded-full shadow-[0_0_20px_rgba(204,164,59,0.5)] border-2 border-white/20 text-vazheim-dark hover:bg-yellow-400 transition-colors"
          >
            <Sparkles size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-full max-w-sm h-[500px] bg-vazheim-dark/95 backdrop-blur-xl border border-vazheim-gold/30 rounded-lg shadow-2xl flex flex-col overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="p-4 border-b border-vazheim-gold/20 bg-vazheim-gold/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-vazheim-gold" />
                <h3 className="text-vazheim-gold font-serif font-bold">The Oracle</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-lg text-sm ${
                      msg.role === 'user'
                        ? 'bg-vazheim-gold/20 text-white border border-vazheim-gold/20'
                        : 'bg-white/5 text-gray-200 border border-white/10'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-lg flex gap-1">
                    <span className="w-1.5 h-1.5 bg-vazheim-gold rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-vazheim-gold rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-vazheim-gold rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-vazheim-gold/20 bg-black/40 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask of the ancient lore..."
                className="flex-1 bg-transparent border-none text-white focus:ring-0 placeholder-gray-600 text-sm"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="p-2 text-vazheim-gold hover:text-white disabled:opacity-50 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Oracle;