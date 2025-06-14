"use client";
import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  const scrollToHero = () => {
    const heroSection = document.querySelector('section:first-of-type');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <footer className="relative bg-gradient-to-b from-white/95 via-indigo-50 via-60% to-white/95 text-slate-800 pt-20 pb-10 px-4 overflow-hidden border-t-0 backdrop-blur-xl -mt-16">
  {/* Section divider for seamless connection */}
  
      {/* Decorative background blobs */}
      
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
        {/* Logo & Brand */}
        <div className="mb-8 flex flex-col items-center">
          <h2 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-400 bg-clip-text text-transparent drop-shadow-xl animate-fadeIn">Aurith AI</h2>
          <p className="mt-4 text-xl text-slate-700 max-w-xl text-center font-medium">Empowering your business with next-gen AI solutions. Join us to accelerate your growth and innovation.</p>
        </div>

        {/* CTA */}
        <div className="mb-10 flex flex-col sm:flex-row items-center gap-4">
          <button 
            onClick={scrollToHero}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-bold text-lg shadow-lg hover:scale-105 hover:shadow-blue-200/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 cursor-pointer"
          >
            Get Started
          </button>
          <a 
            href="mailto:aurithdz@gmail.com?subject=Sales%20Inquiry"
            className="px-8 py-3 rounded-full border-2 border-cyan-300/60 text-cyan-700 font-bold text-lg hover:bg-cyan-50/70 hover:text-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-100"
          >
            Contact Sales
          </a>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap gap-8 mb-12 justify-center">
          <Link href="/about" className="relative group text-base font-semibold text-blue-700 hover:text-cyan-600 px-3 py-1 transition-all">
            About
            <span className="block h-0.5 bg-gradient-to-r from-blue-400 to-pink-400 w-0 group-hover:w-full transition-all duration-300 rounded-full"></span>
          </Link>
          <Link href="/services" className="relative group text-base font-semibold text-blue-700 hover:text-cyan-600 px-3 py-1 transition-all">
            Services
            <span className="block h-0.5 bg-gradient-to-r from-blue-400 to-pink-400 w-0 group-hover:w-full transition-all duration-300 rounded-full"></span>
          </Link>
          <Link href="/how-it-works" className="relative group text-base font-semibold text-blue-700 hover:text-cyan-600 px-3 py-1 transition-all">
            How It Works
            <span className="block h-0.5 bg-gradient-to-r from-blue-400 to-pink-400 w-0 group-hover:w-full transition-all duration-300 rounded-full"></span>
          </Link>
          <Link href="/blog" className="relative group text-base font-semibold text-blue-700 hover:text-cyan-600 px-3 py-1 transition-all">
            Blog
            <span className="block h-0.5 bg-gradient-to-r from-blue-400 to-pink-400 w-0 group-hover:w-full transition-all duration-300 rounded-full"></span>
          </Link>
        </nav>

        {/* Social Icons */}
        <div className="flex space-x-6 mb-8">
          <Link href="#" aria-label="Facebook" className="bg-gradient-to-br from-blue-100 via-cyan-100 to-white p-3 rounded-full shadow-md hover:scale-110 hover:shadow-blue-200/50 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-cyan-200">
            <Facebook className="h-6 w-6 text-blue-500 group-hover:text-cyan-600 group-hover:animate-bounce transition-all duration-200" />
          </Link>
          <Link href="#" aria-label="Twitter" className="bg-gradient-to-br from-blue-100 via-cyan-100 to-white p-3 rounded-full shadow-md hover:scale-110 hover:shadow-cyan-200/50 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-cyan-200">
            <Twitter className="h-6 w-6 text-cyan-600 group-hover:text-blue-500 group-hover:animate-spin transition-all duration-200" />
          </Link>
          <Link href="#" aria-label="Instagram" className="bg-gradient-to-br from-blue-100 via-cyan-100 to-white p-3 rounded-full shadow-md hover:scale-110 hover:shadow-cyan-200/50 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-cyan-200">
            <Instagram className="h-6 w-6 text-blue-400 group-hover:text-cyan-600 group-hover:animate-pulse transition-all duration-200" />
          </Link>
          <Link href="#" aria-label="Linkedin" className="bg-gradient-to-br from-blue-100 via-cyan-100 to-white p-3 rounded-full shadow-md hover:scale-110 hover:shadow-cyan-200/50 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-cyan-200">
            <Linkedin className="h-6 w-6 text-cyan-700 group-hover:text-blue-500 group-hover:animate-bounce transition-all duration-200" />
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-xs text-slate-500 tracking-wide drop-shadow text-center">
          © {new Date().getFullYear()} <span className="font-semibold text-cyan-700">Aurith AI</span>. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
