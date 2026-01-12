"use client";

import React from "react";
import { motion } from "framer-motion";

export default function LogoCloud() {
  const partners = [
    "OpenAI",
    "Make.com",
    "n8n",
    "Zapier",
    "Gemini",
    "Slack",
  ];

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <p className="text-center text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-12">
          Core Tools We Use
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          {partners.map((partner) => (
            <motion.div
              key={partner}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl font-black tracking-tighter text-slate-900 cursor-default hover:text-blue-600 transition-colors"
            >
              {partner}
            </motion.div>
          ))}
        </div>
      </div>
      
    </section>
  );
}
