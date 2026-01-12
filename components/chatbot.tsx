"use client"

import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { Button } from './ui/button';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { motion, AnimatePresence } from 'framer-motion';
import 'highlight.js/styles/atom-one-dark.css';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
  reasoning_details?: any; // To store thinking process
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const SYSTEM_PROMPT = `You are Aurith AI, a friendly and expert automation consultant for businesses. You help users discover how to automate, optimize, and scale their business using modern AI solutions.

Aurith AI specializes in:
- Smart Chatbots & Virtual Assistants
- RAG AI Search & Knowledge Retrieval
- Predictive Analytics & Insights
- Smart CRMs & Recruiting Forms
- Data Automation & Integration
- Image, Voice, and Text AI Processing
- Staff Augmentation & Customer Service Bots

Always provide clear, helpful, and inspiring advice about how these solutions can save time, increase efficiency, and grow a business.

Greet users warmly, answer questions in detail, and encourage them to ask about any business process they want to automate. You are available 24/7 and up-to-date with the latest in AI and automation. Never mention that you are a Xiaomi model or use the name MIMO. Your name is Aurith AI.
dont say "I'm Aurith, an AI assistant developed by Xiaomi." say "I'm Aurith AI, a friendly and expert automation consultant for businesses made by Amrane Yousri And Boularak Moncef"
---
**Made by Yousri Amrane and Boularak Moncef and our incubator Professor Gahlam who helped us a lot .**`;

  const FIRST_ASSISTANT_GREETING = `👋 **Hello! I'm your Aurith AI assistant.**

How can I help automate or optimize your business today?`;

  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'assistant', content: FIRST_ASSISTANT_GREETING },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      
      let assistantContent =
        data.choices?.[0]?.message?.content ||
        'Sorry, I could not understand the response.';
      
      const assistantMessage: Message = { 
        role: 'assistant', 
        content: assistantContent,
        reasoning_details: data.choices?.[0]?.message?.reasoning_details
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' } as Message,
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="button"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="w-16 h-16 bg-slate-900 hover:bg-black text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ring-4 ring-white/50"
            >
              <MessageSquare className="w-8 h-8" />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[92vw] sm:w-[400px] bg-white/95 backdrop-blur-2xl rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-black text-lg leading-none">Aurith AI</h3>
                  <p className="text-[10px] text-blue-200 mt-1 uppercase tracking-widest font-bold">Always Available</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="h-[450px] overflow-y-auto p-6 space-y-6 scroll-smooth custom-scrollbar bg-slate-50/50">
              {messages.filter(m => m.role !== 'system').map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-5 py-4 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-200'
                        : 'bg-white text-slate-800 rounded-tl-none border border-slate-200/50 shadow-sm'
                    }`}
                  >
                    <div className="text-sm leading-relaxed">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                        components={{
                          a: ({ ...props }) => (
                            <a {...props} className="text-inherit underline" target="_blank" rel="noopener noreferrer" />
                          ),
                          p: ({ ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                          strong: ({ ...props }) => <strong className="font-black" {...props} />,
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white px-5 py-4 rounded-2xl rounded-tl-none border border-slate-200/50 shadow-sm flex items-center gap-3">
                    <motion.span 
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="text-xs font-bold text-slate-400 uppercase tracking-widest"
                    >
                      Thinking
                    </motion.span>
                    <div className="flex gap-1.5">
                      <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 1.4, delay: 0 }}
                        className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                      />
                      <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 1.4, delay: 0.2 }}
                        className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                      />
                      <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 1.4, delay: 0.4 }}
                        className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 bg-white border-t border-slate-100">
              <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center transition-all disabled:opacity-50 disabled:hover:bg-blue-600 shadow-lg shadow-blue-200"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
