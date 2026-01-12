"use client";
import React, { useRef } from "react";
import Confetti from "react-confetti";
import { Calendar, FileSearch, FileText, Rocket } from "lucide-react";
import { motion, useInView } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Calendar className="h-10 w-10 text-slate-900" />,
      title: "Schedule a Call",
      description: "Book a free consultation to discuss your automation needs.",
    },
    {
      icon: <FileSearch className="h-10 w-10 text-slate-900" />,
      title: "We map your processes",
      description: "Our experts analyze your workflows to identify automation opportunities.",
    },
    {
      icon: <FileText className="h-10 w-10 text-slate-900" />,
      title: "You get a proposal",
      description: "We create a custom automation plan tailored to your business.",
    },
    {
      icon: <Rocket className="h-10 w-10 text-slate-900" />,
      title: "We build and launch your automation",
      description: "Our team implements and tests your new AI-powered systems.",
    },
  ]

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 md:py-32 bg-slate-50"
    >
      {/* Confetti on last step */}
      {activeStep === steps.length - 1 && (
        <Confetti
          width={typeof window !== "undefined" ? window.innerWidth : 800}
          height={typeof window !== "undefined" ? window.innerHeight : 600}
          numberOfPieces={200}
          recycle={false}
          className="fade-in-fast absolute inset-0 z-50 pointer-events-none"
        />
      )}

      {/* Static background with subtle texture */}
      <div className="absolute inset-0 z-0 bg-slate-50"></div>
      
      {/* Subtle texture */}
      <div className="absolute inset-0 z-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)',
        backgroundSize: '20px 20px',
      }}></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-in fade-in slide-in-from-top-10 duration-700 ease-out bg-gradient-to-br from-blue-700 via-indigo-600 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">How It Works</h2>
        {/* Progress Indicator */}
        <div className="flex justify-center items-center mb-8">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-center">
              <div className={`w-9 h-9 flex items-center justify-center rounded-full font-bold text-white text-base border-2 border-white shadow transition-all duration-200 ${idx === activeStep ? 'bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-400 scale-110 shadow-xl ring-4 ring-cyan-200 animate-glow' : 'bg-blue-200 scale-100'} ${idx < activeStep ? 'bg-cyan-400' : ''}`}>{idx + 1}</div>
              {idx < steps.length - 1 && <div className={`w-12 h-1 ${idx < activeStep ? 'bg-cyan-300' : 'bg-blue-100'} mx-2 rounded-full transition-all duration-200`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-lg relative min-h-[340px]">
            {/* Animated particle background */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <span className="absolute top-10 left-8 w-16 h-16 bg-cyan-200 opacity-30 blur-2xl rounded-full animate-float-mid" />
              <span className="absolute bottom-10 right-10 w-20 h-20 bg-indigo-200 opacity-20 blur-2xl rounded-full animate-float-slow" />
              <span className="absolute top-1/3 right-1/4 " />
              <span className="absolute bottom-1/4 left-1/3 w-10 h-10 bg-cyan-300 opacity-20 blur-xl rounded-full animate-float-mid" />
              <span className="absolute top-1/2 left-1/2 w-14 h-14 bg-indigo-300 opacity-20 blur-2xl rounded-full animate-float-slow" />
            </div>
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, scale: 1, y: 36 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1, y: 36 }}
              transition={{ type: 'spring', stiffness: 60, damping: 18 }}
              className={`group bg-white/80 glass p-8 rounded-3xl shadow-2xl border-2 border-cyan-200/60 bg-gradient-to-br from-white/90 via-cyan-50/90 to-blue-100/80 backdrop-blur-md transition-all duration-200 border-gradient focus-within:border-blue-300 relative overflow-hidden`}
              style={{ position: 'absolute', width: '100%' }}
            >
              {/* Glass reflection overlay */}
              <div className="absolute left-4 top-4 w-2/3 h-8 bg-gradient-to-r from-white/60 to-transparent opacity-30 rounded-full pointer-events-none blur-md" />
              {/* Animated sparkle */}
              <span className="absolute left-10 top-8 w-4 h-4 bg-cyan-200 rounded-full opacity-70 blur-md animate-float-fast z-10" />
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.17, delayChildren: 0.13 } }
                }}
              >
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ type: 'spring', stiffness: 70, damping: 18 }}
                  className="flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-6 mx-auto shadow-inner transition-all duration-300 group-hover:bg-blue-100 group-hover:scale-110 relative z-10"
                >
                  {steps[activeStep].icon}
                </motion.div>
                <motion.h3
                  variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="text-xl font-semibold text-slate-900 mb-3 text-center transition-all duration-300 group-hover:text-blue-600"
                >
                  Step {activeStep + 1} – {steps[activeStep].title}
                </motion.h3>
                <motion.p
                  variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="text-slate-600 text-center transition-all duration-300 group-hover:text-slate-800"
                >
                  {steps[activeStep].description}
                </motion.p>
              </motion.div>
              <div className="flex justify-center mt-8">
                <div className="flex gap-4">
                  <button
                    onClick={() => setActiveStep(activeStep - 1)}
                    disabled={activeStep === 0}
                    className={`px-8 py-2.5 rounded-full bg-gradient-to-r from-slate-300 via-blue-200 to-cyan-100 text-blue-700 font-semibold shadow hover:shadow-md focus:ring-4 focus:ring-blue-200 transition-all duration-200 ring-2 ring-cyan-200/30 hover:ring-blue-400/40 relative flex items-center gap-2 ${activeStep === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                  >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                    Back
                  </button>
                  {activeStep < steps.length - 1 ? (
                    <button
                      onClick={() => setActiveStep(activeStep + 1)}
                      className="px-8 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 via-blue-600 to-blue-400 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 focus:ring-4 focus:ring-blue-200 transition-all duration-200 ring-2 ring-cyan-200/30 hover:ring-blue-400/40 relative after:content-[''] after:absolute after:inset-0 after:rounded-full after:opacity-0 hover:after:opacity-40 after:transition-opacity after:duration-300 after:bg-cyan-200/30 flex items-center gap-2"
                    >
                      Next
                      <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </button>
                  ) : (
                    <span className="px-6 py-2 rounded-full bg-green-400 text-white font-semibold shadow-md">Done!</span>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
