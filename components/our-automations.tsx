"use client";
import { Cog } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function OurAutomations() {
  const automations = [
    "Client Onboarding",
    "Sales Pipeline",
    "CRM",
    "Proposal Creation",
    "Payment & Contracts",
    "Project Management",
    "Employee Onboarding",
    "Client Communications",
    "Client Reporting",
    "Operations",
    "And more...",
  ]

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 md:py-32 bg-slate-50"
    >
      {/* Static background with subtle texture */}
      <div className="absolute inset-0 z-0 bg-slate-50"></div>
      
      {/* Subtle texture */}
      <div className="absolute inset-0 z-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)',
        backgroundSize: '20px 20px',
      }}></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 animate-in fade-in slide-in-from-top-10 duration-700 ease-out bg-gradient-to-br from-blue-700 via-indigo-600 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">Our Automations</h2>

        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {automations.map((automation, idx) => (
            <div
              key={automation}
              className={`relative flex items-center gap-2 px-7 py-3.5 rounded-full shadow-lg border border-blue-100/60 bg-gradient-to-r from-white/80 via-cyan-50/80 to-blue-100/70 backdrop-blur-md text-slate-800 font-semibold transition-all duration-400 hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-cyan-300/60 focus-within:ring-2 focus-within:ring-cyan-300/60 hover:border-cyan-300/60 hover:bg-cyan-50/60 group before:content-[''] before:absolute before:inset-0 before:rounded-full before:shadow-[inset_0_2px_8px_0_rgba(0,40,100,0.08)]`}
              tabIndex={0}
              aria-label={automation}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ type: "spring", stiffness: 330, damping: 18, delay: 0.18 + idx * 0.09 }}
                className="flex items-center gap-2 w-full"
              >
                <Cog className="h-5 w-5 text-blue-400 opacity-80 mr-1 group-hover:animate-pulse" aria-hidden="true" />
                <span className="transition-colors duration-200 group-hover:font-bold group-hover:text-blue-700">{automation}</span>
                {/* Badges */}
                {idx === 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 text-white font-semibold shadow animate-bounce-in">New</span>
                )}
                {idx === 1 && (
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gradient-to-r from-indigo-400 to-blue-400 text-white font-semibold shadow animate-bounce-in">Popular</span>
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
