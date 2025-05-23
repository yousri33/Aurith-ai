"use client"

import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { Button } from './ui/button';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css'; // Changed theme for better contrast

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
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

Greet users warmly, answer questions in detail, and encourage them to ask about any business process they want to automate. You are available 24/7 and up-to-date with the latest in AI and automation.

---
**Made by Yousri Amrane and Boularak Moncef and our incubator Professor Gahlam who helped us a lot .**`;

  const FIRST_ASSISTANT_GREETING = `👋 **Hello! I am Aurith AI Assistant.**

How can I help automate or optimize your business today?

*Ask me anything about AI solutions, automation, or our services!*`;

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
    scrollToBottom()
  }, [messages])

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
      // OpenRouter returns choices[0].message.content, but your API just returns data.choices
      let assistantContent =
        data.choices?.[0]?.message?.content ||
        data.choices?.[0]?.content ||
        data.message ||
        data.content ||
        data.result ||
        'Sorry, I could not understand the response.';
      const assistantMessage: Message = { role: 'assistant', content: assistantContent };
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
    <div className="fixed bottom-6 right-6 z-50 font-inter chatbot-mobile slide-in-from-right drop-shadow-2xl transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)]">
  {/* Pro: smoother transition, cubic-bezier for natural feel */}
  {/* Enhanced: extra drop-shadow, slightly larger offset for more modern floating look */}
      {!isOpen ? (
        <Button
    onClick={() => setIsOpen(true)}
    className="bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500 hover:from-indigo-800 hover:via-blue-700 hover:to-cyan-600 text-white rounded-full p-5 sm:p-6 shadow-2xl hover:shadow-[0_20px_60px_0_rgba(31,38,135,0.18)] transition-all duration-300 border-2 border-white/80 backdrop-blur-xl glass ripple transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-cyan-300/60 focus:ring-offset-2 focus:ring-offset-white animate-pro-bounce"
    style={{ boxShadow: '0 18px 38px -8px rgba(66, 153, 225, 0.38), 0 12px 24px -12px rgba(66, 153, 225, 0.18)' }}
    aria-label="Open chatbot"
  >
    <MessageSquare className="h-10 w-10 sm:h-12 sm:w-12 drop-shadow-xl transition-transform duration-200 group-hover:scale-110" />
  </Button>
      ) : (
        <div className="glass border border-white/50 rounded-[2.5rem] sm:rounded-[3rem] shadow-2xl w-full max-w-[95vw] sm:max-w-[460px] backdrop-blur-[32px] animate-fade-in chatbot-mobile rainbow-border-pro overflow-hidden ring-2 ring-indigo-200/50 transition-all duration-500"
  style={{ background: 'rgba(245, 247, 255, 0.98)', boxShadow: '0 22px 60px 0 rgba(31, 38, 135, 0.23), 0 4px 16px 0 rgba(80,110,200,0.08)' }}
>
  {/* Enhanced: slightly more rounded, softer glass, stronger border, subtle ring */}
          <div className="flex items-center justify-between p-4 border-b border-white/40 bg-gradient-to-r from-indigo-900 via-blue-800 to-cyan-700 shadow-lg">
  {/* Pro: deeper border, richer gradient, bigger shadow */}
  <h3 className="font-extrabold text-white tracking-tight text-lg sm:text-xl drop-shadow-2xl ml-2 select-none flex items-center gap-2">
  {/* Pro: even bolder font, larger size, flex for alignment */}
    <span className="inline-block align-middle mr-2">
      <MessageSquare className="inline w-6 h-6 text-cyan-200 opacity-90 drop-shadow-md" />
    </span>
    Chat with <span className="text-cyan-200">Aurith AI</span>
  </h3>
  <Button
    variant="ghost"
    size="icon"
    onClick={() => setIsOpen(false)}
    className="hover:bg-cyan-100/30 rounded-full text-white transition-colors duration-150 mr-1 focus:outline-none focus:ring-2 focus:ring-cyan-200/70 focus:ring-offset-2 focus:ring-offset-blue-900 shadow-md"
    aria-label="Close chatbot"
  >
    <X className="h-7 w-7" />
  </Button>
</div>
          <div className="h-[350px] sm:h-[450px] overflow-y-auto p-5 space-y-5 bg-white/95 scrollbar-thin scrollbar-thumb-cyan-300/80 scrollbar-track-white/30 transition-all duration-300 animate-fade-in-fast rounded-b-[2.5rem] custom-scrollbar-pro shadow-inner"
  style={{scrollbarWidth:'thin', scrollbarColor:'#67e8f9 #f1f5fd'}}>
  {/* Pro: more padding, more rounded, inner shadow, custom scrollbar class for pro look */}
            {messages.slice(1).map((message, index) => {
                let bubbleClass = '';
                let markdownClass = '';
                if (message.role === 'user') {
  bubbleClass = 'bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500 text-white self-end rounded-t-3xl rounded-bl-3xl shadow-xl border border-indigo-400/30 animate-bubble-in glass backdrop-blur-lg transition-all duration-200';
  markdownClass = 'text-base sm:text-lg leading-relaxed font-medium';
} else if (message.role === 'assistant') {
  bubbleClass = index === 0
    ? 'bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 text-indigo-900 border border-cyan-200/80 shadow-xl animate-bubble-in rounded-t-3xl rounded-br-3xl glass backdrop-blur-lg transition-all duration-200'
    : 'bg-white/98 text-gray-800 shadow border border-gray-200/80 animate-bubble-in rounded-t-3xl rounded-br-3xl glass backdrop-blur-lg transition-all duration-200';
  markdownClass = 'text-base sm:text-lg leading-relaxed prose-p:text-gray-800 prose-strong:text-indigo-700 prose-a:text-cyan-600 hover:prose-a:text-cyan-700';
} else if (message.role === 'system') {
  bubbleClass = 'bg-gray-100/90 text-gray-500 text-xs italic border border-gray-200 animate-bubble-in rounded-2xl';
  markdownClass = 'text-xs';
}
                return (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  >
                    <div
  className={`max-w-[88%] p-4 sm:p-5 mb-3 ${bubbleClass} transition-all duration-300 prose prose-indigo backdrop-blur-md ring-1 ring-cyan-100/40 hover:ring-cyan-300/70 focus-within:ring-cyan-400/80 shadow-lg animate-pro-bubble`}
  style={{ fontFamily: 'Inter, Segoe UI, Arial, Helvetica, sans-serif', fontFeatureSettings: '"ss01","cv01"' }}
>
  {/* Pro: more padding, larger ring, hover/focus ring, premium shadow, pro animation */}
                      <div className={markdownClass}>
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeHighlight]}
                          components={{
                            a: (props) => (
                              <a {...props} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-700 transition-colors">
                                {props.children}
                              </a>
                            ),
                            code({ node, className, children, inline, ...props }: React.HTMLAttributes<HTMLElement> & { node?: any; inline?: boolean }) {
                              const match = /language-(\w+)/.exec(className || '');
                              return !inline ? (
                                <pre className="bg-gray-900/95 text-white p-4 rounded-2xl my-3 overflow-x-auto text-sm sm:text-base shadow-inner border border-cyan-700/20 animate-fade-in-pro">
  <code className={className} {...props}>
    {children}
  </code>
</pre>
                              ) : (
                                <code className="bg-cyan-100/90 text-indigo-800 px-2 py-1 rounded font-mono border border-cyan-200/60 text-xs sm:text-sm animate-fade-in-pro" {...props}>
  {children}
</code>
                              );
                            },
                            p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                            ul: ({ node, ...props }) => <ul className="list-disc list-inside pl-2 mb-2 space-y-1" {...props} />,
                            ol: ({ node, ...props }) => <ol className="list-decimal list-inside pl-2 mb-2 space-y-1" {...props} />,
                            strong: ({ node, ...props }) => <strong className="font-semibold text-indigo-700" {...props} />,
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                );
              })}
            {isLoading && (
              <div className="flex justify-start animate-fade-in">
  <div className="max-w-[82%] p-4 sm:p-5 mb-3 bg-white/98 text-indigo-900 shadow-lg border border-cyan-200/60 rounded-full flex items-center gap-3 animate-bubble-in backdrop-blur-lg animate-pro-bubble">
    <span className="font-semibold text-indigo-500 mr-2 text-sm sm:text-base">Aurith AI is typing</span>
    <span className="flex gap-1">
      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
    </span>
  </div>
</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t border-cyan-200/70 p-4 sm:p-5 bg-white/98 backdrop-blur-md shadow-inner rounded-b-[2.5rem] transition-all duration-300">
  <div className="flex space-x-2 items-center">
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Ask about AI automation..."
      className="flex-1 min-w-0 rounded-full border border-cyan-300 bg-white/95 px-5 py-3 sm:py-3.5 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-200 shadow-lg text-base sm:text-lg placeholder-cyan-400 text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed font-medium animate-input-pro"
      disabled={isLoading}
      style={{ fontFamily: 'Inter, Segoe UI, Arial, Helvetica, sans-serif' }}
      aria-label="Type your message"
      autoComplete="off"
    />
    <Button
      type="submit"
      disabled={isLoading || !input.trim()}
      className="bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-700 hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-800 text-white rounded-full p-3 sm:p-3.5 shadow-xl hover:shadow-2xl transition-all duration-200 border border-cyan-200/70 glass ripple transform hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 animate-pro-bounce"
      style={{ boxShadow: '0 8px 28px 0 rgba(31, 38, 135, 0.16)' }}
      aria-label="Send message"
    >
      <Send className="h-6 w-6 sm:h-7 sm:w-7" />
    </Button>
  </div>
</form>
        </div>
      )}
    </div>
  )
}
