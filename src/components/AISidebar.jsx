import React, { useState } from 'react';
import { X, Send, Bot, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AISidebar = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([
        { role: 'ai', content: 'Hello! I am your AI coding assistant. How can I help you with your algorithm problems today?' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input };
        setMessages([...messages, userMsg]);
        setInput('');

        // Mock AI response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: 'ai',
                content: `I see you're asking about "${userMsg.content}". Here's a hint: Try breaking the problem down into smaller sub-problems. Would you like a code snippet?`
            }]);
        }, 1000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed top-0 right-0 h-full w-80 bg-black/40 backdrop-blur-xl border-l border-white/10 shadow-2xl z-50 flex flex-col"
                >
                    <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                        <div className="flex items-center space-x-2">
                            <Bot className="text-primary" size={20} />
                            <h3 className="font-bold text-lg">AI Assistant</h3>
                        </div>
                        <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user'
                                            ? 'bg-primary text-primary-foreground rounded-tr-none'
                                            : 'bg-white/10 text-gray-200 rounded-tl-none'
                                        }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 border-t border-white/10 bg-white/5">
                        <div className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask for help..."
                                className="w-full bg-black/20 border border-white/10 rounded-full pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
                            />
                            <button
                                onClick={handleSend}
                                className="absolute right-1.5 top-1.5 p-1.5 bg-primary rounded-full text-white hover:bg-blue-600 transition-colors"
                            >
                                <Send size={14} />
                            </button>
                        </div>
                        <div className="mt-2 flex justify-center">
                            <button className="text-[10px] text-gray-400 flex items-center space-x-1 hover:text-white transition-colors">
                                <Sparkles size={10} />
                                <span>Generate Hint</span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AISidebar;
