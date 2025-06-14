"use client";
import { Building2, ShoppingBag, Truck, Users, X, Play } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import FormModal from "./form-modal";

const VideoModal = ({ isOpen, onClose, videoSrc }: { isOpen: boolean; onClose: () => void; videoSrc: string }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.98, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.98, opacity: 0, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 400 }}
          className="relative w-full max-w-2xl bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-2xl overflow-hidden border border-gray-100"
          onClick={(e) => e.stopPropagation()}
          style={{ maxHeight: '90vh' }}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-white/10 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">AI Recruiting Demo</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/90 hover:text-white"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="overflow-y-auto custom-scrollbar" style={{ maxHeight: 'calc(90vh - 64px)' }}>
            {/* Video Section */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none rounded-b-lg" />
              <video
                src={videoSrc}
                controls
                autoPlay
                className="w-full bg-gray-900"
                style={{ aspectRatio: '16/9' }}
                onPlay={(e) => {
                  const video = e.target as HTMLVideoElement;
                  video.playbackRate = 1.5;
                }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
            
            {/* Content */}
            <div className="p-6 space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100"
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1.5">Transform Your Hiring Process</h4>
                    <p className="text-sm text-blue-800/90">
                      Discover how our AI streamlines technical recruitment by analyzing thousands of CVs in seconds, extracting key data points, and delivering instant candidate rankings.
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: '⚡', title: 'Lightning Fast', desc: 'Process thousands of CVs in minutes' },
                  { icon: '🎯', title: 'Precise Matching', desc: 'AI-powered candidate scoring' },
                  { icon: '🔍', title: 'Deep Analysis', desc: 'Extracts skills, experience & education' },
                  { icon: '📊', title: 'Actionable Insights', desc: 'Data-driven hiring decisions' }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + (i * 0.05) }}
                    className="bg-white p-3.5 rounded-lg border border-gray-100 shadow-sm hover:shadow transition-shadow"
                  >
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <h4 className="font-medium text-gray-900 text-sm">{item.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                  <span className="text-xs font-medium text-gray-400 px-2">HOW IT WORKS</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                </div>
                
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-100 via-indigo-200 to-purple-100" />
                  <ol className="space-y-4">
                    {[
                      'Upload CVs in any format (PDF, DOCX, etc.)',
                      'AI extracts and analyzes key candidate information',
                      'Automated scoring based on job requirements',
                      'Receive ranked candidates with detailed insights'
                    ].map((step, i) => (
                      <li key={i} className="relative pl-10">
                        <div className="absolute left-0 flex items-center justify-center w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full text-white text-xs font-bold">
                          {i + 1}
                        </div>
                        <span className="text-sm text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-2"
              >
                <button 
                  onClick={openForm}
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Schedule a Demo
                </button>
                <FormModal isOpen={isFormOpen} onClose={closeForm} />
                <p className="text-xs text-center text-gray-500 mt-3">
                  Ready to transform your hiring process? Let's talk.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function WhoWeHelp() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoSrc = "/DEMO.mp4";
  const industries = [
    {
      icon: <Building2 className="h-10 w-10 text-slate-900" />,
      title: "Service Businesses",
      examples: "Agencies, Consultants, Law Firms",
      useCases: [
        "Automate proposals with AI-generated templates",
        "Onboard clients with dynamic forms + CRM sync",
        "Auto-send reports with insights pulled from live data",
      ],
      caseStudy: "We used GPT-powered workflows to help a law firm generate contracts 80% faster.",
    },
    {
      icon: <ShoppingBag className="h-10 w-10 text-slate-900" />,
      title: "eCommerce & Retail",
      examples: "Online Stores, Product Brands",
      useCases: [
        "Auto-reply to support questions with AI chatbots",
        "Predict inventory demand using sales data and seasonality",
        "Create product descriptions using AI content tools",
      ],
      caseStudy: "For a fashion brand, we built a chatbot that handled 70% of support, reducing tickets by half.",
    },
    {
      icon: <Truck className="h-10 w-10 text-slate-900" />,
      title: "Logistics & Ops",
      examples: "Delivery Companies, Warehouse Ops",
      useCases: [
        "Automate scheduling with AI-driven shift logic",
        "Predict route demand with historical + real-time data",
        "Auto-generate invoices and client updates",
      ],
      caseStudy: "We helped a local logistics firm cut down dispatch errors using predictive analytics + Make.com.",
    },
    {
      icon: <Users className="h-10 w-10 text-slate-900" />,
      title: "HR & Recruiting",
      examples: "Agencies, Startups, HR Teams",
      useCases: [
        "AI-powered forms to screen candidates automatically",
        "Schedule interviews with calendar syncing",
        "Auto-onboard new hires with task flows and email triggers",
      ],
      caseStudy: "A hiring agency saved 20+ hours/week by automating resume filtering with GPT + Google Sheets.",
    },
  ]

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative overflow-hidden py-24 md:py-32 bg-slate-50">
      {/* Static background with subtle texture */}
      <div className="absolute inset-0 z-0 bg-slate-50"></div>
      
      {/* Subtle texture */}
      <div className="absolute inset-0 z-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)',
        backgroundSize: '20px 20px',
      }}></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Top section divider */}
        <div className="absolute left-0 right-0 top-0 h-32 bg-gradient-to-b from-slate-50 to-transparent pointer-events-none -translate-y-full" />
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-in fade-in slide-in-from-top-10 duration-700 ease-out bg-gradient-to-br from-blue-700 via-indigo-600 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">Who We Help</h2>
        <p className="text-xl text-center text-slate-700 mb-16 max-w-2xl mx-auto animate-in fade-in slide-in-from-top-10 duration-700 ease-out delay-100">With Real AI Use Cases</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="group bg-white/70 glass p-8 rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 border border-transparent hover:border-blue-200 focus-within:border-blue-300"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ type: "spring", stiffness: 330, damping: 18, delay: 0.18 + index * 0.11 }}
              >
                <div className="flex items-center mb-8">
                  <div className="flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mr-5 shadow-inner transition-all duration-300 group-hover:bg-blue-100 group-hover:scale-110">
                    {industry.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">{industry.title}</h3>
                    <div className="text-slate-600 text-base font-medium mb-1">{industry.examples}</div>
                  </div>
                </div>
                <ul className="mb-4 space-y-2">
                  {industry.useCases.map((useCase, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700 text-sm"><span className="mt-1 w-2 h-2 rounded-full bg-cyan-400 inline-block"></span>{useCase}</li>
                  ))}
                </ul>
                <div className="text-xs italic text-slate-500 border-l-4 border-cyan-200 pl-3 mb-4">{industry.caseStudy}</div>
                {industry.title === "HR & Recruiting" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsVideoOpen(true);
                    }}
                    className="mt-2 flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors group"
                  >
                    <span className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                      <Play className="h-4 w-4" />
                    </span>
                    Watch Recruiting Workflow Demo
                  </button>
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      {/* Section divider */}
      <div className="absolute left-0 right-0 bottom-0 h-32 bg-gradient-to-b from-transparent via-white to-white pointer-events-none" />
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} videoSrc={videoSrc} />
    </section>
  )
}
