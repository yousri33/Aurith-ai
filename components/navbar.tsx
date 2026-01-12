"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getCalApi } from "@calcom/embed-react";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBooking = async () => {
    const cal = await getCalApi({ namespace: "15min" });
    cal("modal", {
      calLink: "amrane-yousri-5mwtat/15min",
      config: { layout: "month_view", theme: "light" },
    });
  };

  const navLinks = [
    { name: "How It Works", href: "#how-it-works" },
    { name: "Automations", href: "#automations" },
    { name: "Capabilities", href: "#capabilities" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? "py-3 bg-white/70 backdrop-blur-2xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border-b border-white/50"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group font-black tracking-tighter text-2xl">
          <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
            Aurith AI
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <button
            onClick={handleBooking}
            className="group flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 text-white text-sm font-black rounded-full shadow-2xl shadow-blue-200 hover:scale-[1.05] active:scale-95 transition-all duration-300"
          >
            Book a Call
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl shadow-sm"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 md:hidden bg-white/95 backdrop-blur-3xl border-b border-slate-200 shadow-2xl overflow-hidden rounded-b-[40px]"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-black text-slate-800 flex items-center justify-between"
                >
                  {link.name}
                  <ArrowUpRight className="w-6 h-6 text-slate-300" />
                </a>
              ))}
              <div className="h-px bg-slate-100 my-2" />
              <button
                onClick={() => {
                  handleBooking();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-5 bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 text-white font-black text-lg rounded-[24px] shadow-2xl shadow-blue-200"
              >
                Book Your Strategy Call
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
