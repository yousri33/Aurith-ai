"use client";
import { ArrowUp, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-slate-50 border-t border-blue-100/50 py-20 overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-100/30 blur-[100px] rounded-full -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-20">
          <div className="max-w-md">
            <h2 className="text-3xl font-black mb-6 bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">Aurith AI</h2>
            <p className="text-slate-500 text-lg leading-relaxed font-medium mb-8">
              We specialize in creating advanced AI systems and intelligent automations that give your business the competitive edge it deserves.
            </p>
            <div className="flex gap-4">
              {[Linkedin, Twitter, Instagram, Facebook].map((Icon, idx) => (
                <a key={idx} href="#" className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white shadow-lg border border-blue-50 text-slate-400 hover:text-blue-600 hover:scale-110 transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 md:gap-20">
            <div>
              <h3 className="text-slate-900 font-bold mb-6 text-lg">Services</h3>
              <ul className="space-y-4">
                {['Smart Chatbots', 'Data Automation', 'RAG Search', 'Predictive AI'].map(item => (
                  <li key={item}><a href="#" className="text-slate-500 hover:text-blue-600 transition-colors font-medium">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-slate-900 font-bold mb-6 text-lg">Company</h3>
              <ul className="space-y-4">
                {['About Us', 'Our Process', 'Who We Help', 'Contact'].map(item => (
                  <li key={item}><a href="#" className="text-slate-500 hover:text-blue-600 transition-colors font-medium">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-blue-100/50 gap-6">
          <p className="text-slate-400 font-medium">© 2024 Aurith AI. All rights reserved.</p>
          <div className="flex gap-10">
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors text-sm font-bold uppercase tracking-widest">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors text-sm font-bold uppercase tracking-widest">Terms of Service</a>
          </div>
          <button 
            onClick={scrollToTop}
            className="group w-14 h-14 bg-white shadow-2xl rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-500 hover:scale-110 border border-blue-100"
          >
            <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
