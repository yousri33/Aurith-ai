"use client";
import { motion } from "framer-motion";

const team = [
  {
    name: "Amrane Yousri",
    role: "Automation Specialist & Cofounder",
    image: "/ChatGPT Image Mar 28, 2025 at 07_03_58 AM.png",
    bio: "Co-founder of Aurith AI, specializing in creating intelligent automation solutions that drive business growth and efficiency.",
    linkedin: "https://www.linkedin.com/in/yousri-amrane-52b63a2a7/"
  },
  {
    name: "Boularak Moncef",
    role: "Cofounder & Project Manager",
    image: "/moncef.jpg",
    bio: "Co-founder of Aurith AI, ensuring projects are delivered on time and exceed client expectations with innovative solutions.",
    linkedin: "https://www.linkedin.com/in/mounsef-boularak-0a4b181a0/"
  }
];

export default function TeamSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-slate-50">
      {/* Static background with subtle texture */}
      <div className="absolute inset-0 z-0 bg-slate-50"></div>
      
      {/* Subtle texture */}
      <div className="absolute inset-0 z-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)',
        backgroundSize: '30px 30px',
      }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-br from-blue-700 via-indigo-600 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
          Meet Our Team
        </h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch max-w-6xl mx-auto">
          {team.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * idx, duration: 0.7, type: "spring" }}
              viewport={{ once: true }}
              className="bg-white/80 border border-blue-100/60 rounded-3xl shadow-xl p-8 flex-1 flex flex-col items-center text-center hover:scale-105 hover:shadow-2xl transition-all duration-300 min-w-0 w-full"
            >
              <img src={member.image} alt={member.name} className="w-20 h-20 rounded-full mb-4 shadow-md object-cover" />
              <div className="font-semibold text-blue-700 text-lg mb-1">{member.name}</div>
              <div className="text-slate-500 mb-2">{member.role}</div>
              <p className="text-slate-600 text-sm mb-3">{member.bio}</p>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm">LinkedIn</a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
