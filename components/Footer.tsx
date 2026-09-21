'use client';

import React, { useState } from 'react';
import { Compass, Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter, Linkedin, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-[#050505] text-white pt-24 pb-12 px-6 sm:px-12 border-t border-white/10 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-[#D4AF37]/5 blur-[200px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Newsletter Card */}
        <div className="glass-panel-gold p-8 sm:p-12 rounded-3xl mb-20 flex flex-col lg:flex-row items-center justify-between gap-8 gold-border-glow">
          <div>
            <span className="text-xs uppercase tracking-mega text-[#D4AF37] font-semibold block mb-2">
              EXCLUSIVE EDITORIAL DISPATCHES
            </span>
            <h3 className="text-2xl sm:text-4xl font-light text-white/95">
              JOIN THE <span className="gold-gradient-text font-normal">INSPIREGO PRIVATE CIRCLE.</span>
            </h3>
            <p className="text-xs sm:text-sm text-white/60 font-light mt-2 max-w-xl">
              Receive private travel invitations, VIP Umrah package releases, and luxury Middle Eastern destination guides directly in your inbox.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex items-center gap-2">
            {!subscribed ? (
              <div className="flex items-center w-full max-w-md glass-panel rounded-full p-1.5 border-white/20">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="bg-transparent border-none px-4 py-2 text-xs text-white placeholder-white/40 focus:outline-none flex-1"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#D4AF37] text-[#050505] text-xs uppercase tracking-widest font-semibold flex items-center gap-2 hover:bg-amber-400 transition-colors"
                >
                  Subscribe <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs uppercase tracking-widest font-semibold">
                <Check className="w-4 h-4" /> You are subscribed to private circle updates.
              </div>
            )}
          </form>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] flex items-center justify-center text-[#050505] shadow-lg shadow-[#D4AF37]/20">
                <Compass className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-2xl font-light tracking-tight text-white/95">
                Inspire<span className="text-[#D4AF37] font-semibold">GO</span>
              </span>
            </div>
            <p className="text-xs font-light text-white/50 leading-relaxed mb-6 max-w-sm">
              InspireGO is a premier international travel and tourism agency specializing in bespoke luxury escapes, sacred Umrah pilgrimages, and cultural Middle Eastern journeys.
            </p>
            <div className="flex items-center gap-4 text-white/50">
              <a href="#" className="p-2 rounded-full glass-panel hover:text-[#D4AF37] transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-full glass-panel hover:text-[#D4AF37] transition-colors"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-full glass-panel hover:text-[#D4AF37] transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-full glass-panel hover:text-[#D4AF37] transition-colors"><Linkedin className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Dest links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37] mb-6">
              Featured Journeys
            </h4>
            <ul className="space-y-3 text-xs text-white/60 font-light">
              <li><a href="#destinations" className="hover:text-white transition-colors">VIP Umrah Pilgrimages</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Jordan & Petra Wonders</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Sacred Palestine Heritage</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Dubai & UAE Luxury</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Swiss Alpine Escapes</a></li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37] mb-6">
              The Agency
            </h4>
            <ul className="space-y-3 text-xs text-white/60 font-light">
              <li><a href="#philosophy" className="hover:text-white transition-colors">Our Philosophy</a></li>
              <li><a href="#philosophy" className="hover:text-white transition-colors">VIP Concierge Services</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Traveler Reviews</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Scholar Escorts</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Private Charters</a></li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37] mb-6">
              Private Concierge
            </h4>
            <ul className="space-y-3 text-xs text-white/60 font-light">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Dubai International Financial Centre, UAE</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>+971 (0) 4 800 7800</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>concierge@inspirego.travel</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/40 font-light gap-4">
          <p>&copy; {new Date().getFullYear()} InspireGO International Travel Agency. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Licensing & IATA</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
