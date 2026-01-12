"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

export default function HeroSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"15min"});
      cal("ui", {"theme": "light", "hideEventTypeDetails": false, "layout": "month_view"});
    })();
  }, [])

  const handleBooking = async () => {
    const cal = await getCalApi({"namespace":"15min"});
    cal("modal", {
      calLink: "amrane-yousri-5mwtat/15min",
      config: {"layout": "month_view", "theme": "light"}
    });
  };

  return (
    <section ref={ref} className="relative overflow-hidden pt-32 pb-40 md:pt-48 md:pb-60 bg-slate-50">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 bg-slate-50"></div>
      <div className="absolute inset-0 z-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)',
        backgroundSize: '20px 20px',
      }}></div>
      
      {/* Glow blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-100/30 blur-[120px] rounded-full -z-10 animate-float-slow" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-100/20 blur-[100px] rounded-full -z-10 animate-float-mid" />

      <div className="container mx-auto px-6 h-full relative z-10">
        <div className="h-full flex flex-col justify-center items-center">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 mb-10 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Next-Gen AI Performance</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95, y: 32 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 100, damping: 30, delay: 0.1 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-[0.85] tracking-tighter bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 bg-clip-text text-transparent"
            >
              AI Automation <br className="hidden md:block" /> That Works <br className="hidden md:block" /> While You Sleep
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-slate-500 mb-14 max-w-2xl mx-auto leading-relaxed font-bold"
            >
              We replace complex bottlenecks with high-performance smart automations. Scalability, simplified.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8"
            >
              <Button
                onClick={handleBooking}
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 hover:scale-105 active:scale-95 text-white rounded-full px-12 py-9 text-xl font-black shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] transition-all duration-300 group"
              >
                Book Strategy Session
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              <a
                href="#how-it-works"
                className="group flex items-center gap-2 text-lg font-black text-slate-400 hover:text-blue-600 transition-all"
              >
                View Process
                <div className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center group-hover:border-blue-200 group-hover:bg-blue-50 transition-all">
                  <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform" />
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
