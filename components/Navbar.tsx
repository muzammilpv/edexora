'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Menu, X, ArrowRight, Globe } from 'lucide-react';

interface NavbarProps {
  onOpenPlanner: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPlanner }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Destinations', href: '#destinations' },
    { name: 'Spiritual & Umrah', href: '#spiritual' },
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Experiences', href: '#experiences' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 sm:py-6 transition-all duration-500">
      <div
        className={`max-w-7xl mx-auto rounded-full transition-all duration-500 flex items-center justify-between px-6 py-3 ${
          scrolled
            ? 'glass-panel border-white/10 shadow-2xl backdrop-blur-2xl'
            : 'bg-transparent border-transparent'
        }`}
      >
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] flex items-center justify-center text-[#050505] shadow-lg shadow-[#D4AF37]/20 group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-medium tracking-tight text-white/95 group-hover:text-[#D4AF37] transition-colors">
              Inspire<span className="text-[#D4AF37] font-semibold">GO</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-white/40 font-mono -mt-1">
              LUXURY TRAVEL
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-widest font-medium text-white/70 hover:text-[#D4AF37] transition-colors relative py-1 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 cursor-pointer px-3 py-1.5 rounded-full border border-white/10 transition-colors">
            <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>EN</span>
          </div>

          <button
            onClick={onOpenPlanner}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-[#050505] text-xs uppercase tracking-widest font-semibold hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all duration-300"
          >
            <span>Plan Your Journey</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full text-white/80 hover:text-white glass-panel"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-x-4 top-20 z-40 p-6 glass-panel rounded-3xl border border-white/10 shadow-2xl flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-widest font-medium text-white/80 hover:text-[#D4AF37]"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPlanner();
                }}
                className="w-full py-3 rounded-full bg-[#D4AF37] text-[#050505] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2"
              >
                <span>Plan Your Journey</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
