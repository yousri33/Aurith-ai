"use client";

import React from "react";
import { motion } from "framer-motion";

export default function GlowDivider() {
  return (
    <div className="relative w-full h-24 overflow-hidden pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-50" />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[100px] bg-blue-100/20 blur-[60px] rounded-[100%] z-0"
      />
    </div>
  );
}
